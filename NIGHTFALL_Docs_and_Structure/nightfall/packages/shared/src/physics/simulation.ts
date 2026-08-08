import type { MovementConfig } from "@nightfall/protocol";
import { computeFinalSpeed, computeJumpVelocity, playerHeight } from "../movement";
import {
  aabbOverlap,
  addVec3,
  clamp,
  cloneVec3,
  normalizeVec3,
  playerAabb,
  scaleVec3,
  vec3,
} from "./geometry";
import type { MovementContext, MovementInput, PlayerPhysicsState, Vec3, WorldGeometry } from "./types";

/**
 * Deterministic kinematic player movement for one fixed timestep.
 *
 * Movement conventions (docs/03-game-design/05-movement/01-movement-mechanics.md):
 * - No acceleration ramp or air control beyond the initial jump velocity.
 * - Sprinting disables firing; ADS is not allowed while sprinting (enforced here
 *   AND validated server-side in validation.ts).
 * - Jump is a fixed height, boosted slightly while sprinting.
 * - Position is integrated at exactly `dt` so behavior is identical at any FPS.
 *
 * This function is the single source of truth for both client prediction and the
 * authoritative server simulation.
 */
export function stepPlayerMovement(
  state: PlayerPhysicsState,
  input: MovementInput,
  config: MovementConfig,
  world: WorldGeometry,
  ctx: MovementContext,
  dt: number,
): PlayerPhysicsState {
  const sprinting = input.sprint && !input.firing;
  const adsActive = input.ads && !sprinting;

  const finalSpeed = computeFinalSpeed(config, {
    classSpeedMultiplier: ctx.classSpeedMultiplier,
    sprinting,
    crouching: input.crouch,
    weaponMovementPenalty: ctx.weaponMovementPenalty,
    adsActive,
    weaponAdsSpeedMultiplier: ctx.weaponAdsSpeedMultiplier,
  });

  const next: PlayerPhysicsState = {
    position: cloneVec3(state.position),
    velocity: cloneVec3(state.velocity),
    grounded: state.grounded,
    crouching: input.crouch,
  };

  if (state.grounded) {
    // Horizontal velocity is set directly from input direction at finalSpeed
    // (no acceleration ramp — accessible, predictable movement per design).
    const wish = wishDirection(input);
    next.velocity.x = wish.x * finalSpeed;
    next.velocity.z = wish.z * finalSpeed;

    if (input.jump) {
      next.velocity.y = computeJumpVelocity(config, sprinting);
      next.grounded = false;
    } else {
      next.velocity.y = 0;
    }
  } else {
    // Airborne: no air control, horizontal velocity preserved, gravity applies.
    next.velocity.y = Math.max(
      next.velocity.y - config.gravity * dt,
      -config.maxFallSpeed,
    );
  }

  // Integrate position on the fixed timestep.
  next.position = addVec3(next.position, scaleVec3(next.velocity, dt));

  resolveCollisions(next, state.position, state.crouching, config, world);

  return next;
}

/** Camera-relative wish direction (W/A/S/D) projected onto the horizontal plane. */
export function wishDirection(input: MovementInput): Vec3 {
  const forward = vec3(-Math.sin(input.yaw), 0, -Math.cos(input.yaw));
  const right = vec3(Math.cos(input.yaw), 0, -Math.sin(input.yaw));

  let dx = 0;
  let dz = 0;
  if (input.forward) {
    dx += forward.x;
    dz += forward.z;
  }
  if (input.backward) {
    dx -= forward.x;
    dz -= forward.z;
  }
  if (input.right) {
    dx += right.x;
    dz += right.z;
  }
  if (input.left) {
    dx -= right.x;
    dz -= right.z;
  }

  const wish = normalizeVec3(vec3(dx, 0, dz));
  return wish;
}

/**
 * Axis-separated AABB collision resolution.
 *
 * Order matters for correctness:
 * 1. Y (landing/ceiling) — a rising player whose feet are already above an
 *    obstacle's top clears it; a descending player lands on it. Uses the
 *    previous tick's height to disambiguate landing vs ceiling hits.
 * 2. X, then Z — each horizontal pass tests overlap against the *previous*
 *    tick's other coordinates, so only movement along this axis can trigger a
 *    push. This is what lets a player walk past a wall's corner (movement was
 *    along Z) without being shoved sideways out of it, while still stopping
 *    dead against a wall they run into head-on.
 */
function resolveCollisions(
  next: PlayerPhysicsState,
  prev: Vec3,
  prevCrouching: boolean,
  config: MovementConfig,
  world: WorldGeometry,
): void {
  const radius = config.playerRadius;

  // Block uncrouching when there isn't headroom: if the standing footprint
  // overlaps a collider that the crouched footprint doesn't, stay crouched.
  // Prevents the player's head from being embedded in a low ceiling.
  if (!next.crouching && prevCrouching) {
    const standing = playerAabb(next.position, radius, config.standHeight);
    const crouched = playerAabb(
      next.position,
      radius,
      config.standHeight * config.crouchHeightScale,
    );
    const blocked = world.colliders.some(
      (c) => aabbOverlap(standing, c) && !aabbOverlap(crouched, c),
    );
    if (blocked) {
      next.crouching = true;
    }
  }

  const height = playerHeight(config, next.crouching);

  // --- Y axis (gravity + jump + landing) ---
  const floorHit = resolveYAxis(next, prev, radius, height, world);
  next.grounded = floorHit;
  if (floorHit) {
    next.velocity.y = 0;
  }

  // --- X axis (candidate uses previous y/z so Z motion doesn't trigger X) ---
  next.position.x = resolveAxisX(
    next.position.x,
    prev.y,
    prev.z,
    prev.x,
    radius,
    height,
    world,
  );

  // --- Z axis (candidate uses resolved x and previous y) ---
  next.position.z = resolveAxisZ(
    next.position.z,
    next.position.x,
    prev.y,
    prev.z,
    radius,
    height,
    world,
  );
}

/**
 * Resolves X-axis penetration. `xNew` is the integrated X; the overlap test
 * uses the previous tick's y/z so horizontal motion on other axes never
 * triggers an X push. The push side comes from the previous X (entry side).
 */
function resolveAxisX(
  xNew: number,
  y: number,
  z: number,
  prevX: number,
  radius: number,
  height: number,
  world: WorldGeometry,
): number {
  let result = xNew;
  for (const collider of world.colliders) {
    const aabb = playerAabb({ x: result, y, z }, radius, height);
    if (!aabbOverlap(aabb, collider)) {
      continue;
    }
    if (prevX < collider.min.x) {
      result = collider.min.x - radius;
    } else if (prevX > collider.max.x) {
      result = collider.max.x + radius;
    } else {
      const leftPen = result - collider.min.x;
      const rightPen = collider.max.x - result;
      result = leftPen < rightPen ? collider.min.x - radius : collider.max.x + radius;
    }
  }
  return result;
}

/**
 * Resolves Z-axis penetration. `zNew` is the integrated Z; the overlap test
 * uses the resolved X and the previous tick's y. The push side comes from the
 * previous Z (entry side).
 */
function resolveAxisZ(
  zNew: number,
  x: number,
  y: number,
  prevZ: number,
  radius: number,
  height: number,
  world: WorldGeometry,
): number {
  let result = zNew;
  for (const collider of world.colliders) {
    const aabb = playerAabb({ x, y, z: result }, radius, height);
    if (!aabbOverlap(aabb, collider)) {
      continue;
    }
    if (prevZ < collider.min.z) {
      result = collider.min.z - radius;
    } else if (prevZ > collider.max.z) {
      result = collider.max.z + radius;
    } else {
      const nearPen = result - collider.min.z;
      const farPen = collider.max.z - result;
      result = nearPen < farPen ? collider.min.z - radius : collider.max.z + radius;
    }
  }
  return result;
}

/**
 * Resolves vertical penetration using the previous tick's position and the
 * current vertical velocity so landing vs ceiling hits are unambiguous:
 * - falling (vy <= 0) with feet previously above a surface top -> land on top
 * - rising (vy > 0) with head previously below a surface bottom -> ceiling hit
 *
 * Returns true when the player is grounded.
 */
function resolveYAxis(
  next: PlayerPhysicsState,
  prev: Vec3,
  radius: number,
  height: number,
  world: WorldGeometry,
): boolean {
  let grounded = false;
  const vy = next.velocity.y;

  for (const collider of world.colliders) {
    const horizontallyInside =
      next.position.x + radius > collider.min.x &&
      next.position.x - radius < collider.max.x &&
      next.position.z + radius > collider.min.z &&
      next.position.z - radius < collider.max.z;
    if (!horizontallyInside) {
      continue;
    }

    const prevFeet = prev.y;
    const prevHead = prev.y + height;

    // Landing: falling onto a surface whose top the player was above last tick.
    if (vy <= 0 && prevFeet >= collider.max.y) {
      next.position.y = collider.max.y;
      grounded = true;
      continue;
    }
    // Ceiling: rising (vy > 0) into a surface whose bottom the head was at or
    // below last tick. A stationary player under a low ceiling is not pushed
    // (that case is handled by the uncrouch headroom block above). Kill upward
    // velocity so the player doesn't jitter against the ceiling.
    if (vy > 0 && prevHead <= collider.min.y) {
      next.position.y = collider.min.y - height;
      next.velocity.y = 0;
    }
  }

  // World bounds floor.
  if (next.position.y <= world.bounds.min.y) {
    next.position.y = world.bounds.min.y;
    grounded = true;
  }
  // World bounds ceiling (if any).
  const ceiling = world.bounds.max.y;
  if (next.position.y + height > ceiling) {
    next.position.y = ceiling - height;
  }

  // Clamp horizontal position inside the world bounds.
  next.position.x = clamp(
    next.position.x,
    world.bounds.min.x + radius,
    world.bounds.max.x - radius,
  );
  next.position.z = clamp(
    next.position.z,
    world.bounds.min.z + radius,
    world.bounds.max.z - radius,
  );

  return grounded;
}

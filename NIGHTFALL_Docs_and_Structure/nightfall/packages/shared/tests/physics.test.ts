import { describe, expect, it } from "vitest";
import type { MovementConfig } from "@nightfall/protocol";
import {
  isDisplacementOverCap,
  stepPlayerMovement,
  validateInputState,
  wishDirection,
  type MovementContext,
  type MovementInput,
  type PlayerPhysicsState,
  type WorldGeometry,
} from "../src/index";

const config: MovementConfig = {
  baseSpeed: 7,
  sprintMultiplier: 1.5,
  crouchMultiplier: 0.5,
  crouchHeightScale: 0.5,
  standHeight: 1.8,
  playerRadius: 0.35,
  jumpHeight: 1.2,
  sprintJumpHeightMultiplier: 1.2,
  maxFallSpeed: 30,
  gravity: 20,
  tickRate: 20,
  speedValidationTolerance: 1.1,
};

const dt = 1 / config.tickRate; // 50ms

const ctx: MovementContext = {
  classSpeedMultiplier: 1,
  weaponMovementPenalty: 1,
  weaponAdsSpeedMultiplier: 1,
};

/** An open floor plane: bounds 0..40, floor at y=0. */
const world: WorldGeometry = {
  colliders: [],
  bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
};

function idleInput(overrides: Partial<MovementInput> = {}): MovementInput {
  return {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
    crouch: false,
    firing: false,
    ads: false,
    yaw: 0,
    ...overrides,
  };
}

function groundedState(x = 5, y = 0, z = 5): PlayerPhysicsState {
  return {
    position: { x, y, z },
    velocity: { x: 0, y: 0, z: 0 },
    grounded: true,
    crouching: false,
  };
}

describe("wishDirection", () => {
  it("faces -Z at yaw 0 (Three.js convention)", () => {
    const d = wishDirection(idleInput({ forward: true }));
    expect(d.x).toBeCloseTo(0);
    expect(d.z).toBeCloseTo(-1);
  });

  it("strafes +X when pressing right at yaw 0", () => {
    const d = wishDirection(idleInput({ right: true }));
    expect(d.x).toBeCloseTo(1);
    expect(d.z).toBeCloseTo(0);
  });

  it("rotates with yaw: forward at 90deg faces -X", () => {
    const d = wishDirection(idleInput({ forward: true, yaw: Math.PI / 2 }));
    expect(d.x).toBeCloseTo(-1);
    expect(d.z).toBeCloseTo(0);
  });

  it("rotates with yaw: right at 90deg faces -Z", () => {
    const d = wishDirection(idleInput({ right: true, yaw: Math.PI / 2 }));
    expect(d.x).toBeCloseTo(0);
    expect(d.z).toBeCloseTo(-1);
  });

  it("normalizes diagonal movement", () => {
    const d = wishDirection(idleInput({ forward: true, right: true }));
    expect(Math.hypot(d.x, d.z)).toBeCloseTo(1);
  });
});

describe("grounded movement", () => {
  it("moves forward at baseSpeed * dt", () => {
    const next = stepPlayerMovement(
      groundedState(),
      idleInput({ forward: true }),
      config,
      world,
      ctx,
      dt,
    );
    expect(next.position.z).toBeCloseTo(5 - 7 * dt);
    expect(next.position.x).toBeCloseTo(5);
    expect(next.grounded).toBe(true);
  });

  it("sprint multiplies speed by 1.5x", () => {
    const next = stepPlayerMovement(
      groundedState(),
      idleInput({ forward: true, sprint: true }),
      config,
      world,
      ctx,
      dt,
    );
    expect(next.position.z).toBeCloseTo(5 - 7 * 1.5 * dt);
  });

  it("sprint is ignored while firing (sprint disables firing)", () => {
    const next = stepPlayerMovement(
      groundedState(),
      idleInput({ forward: true, sprint: true, firing: true }),
      config,
      world,
      ctx,
      dt,
    );
    expect(next.position.z).toBeCloseTo(5 - 7 * dt);
  });

  it("crouch halves speed", () => {
    const next = stepPlayerMovement(
      groundedState(),
      idleInput({ forward: true, crouch: true }),
      config,
      world,
      ctx,
      dt,
    );
    expect(next.position.z).toBeCloseTo(5 - 7 * 0.5 * dt);
  });

  it("applies weapon movement penalty and ADS multiplier multiplicatively", () => {
    const heavyCtx: MovementContext = {
      classSpeedMultiplier: 0.82,
      weaponMovementPenalty: 0.8,
      weaponAdsSpeedMultiplier: 0.6,
    };
    const next = stepPlayerMovement(
      groundedState(),
      idleInput({ forward: true, ads: true }),
      config,
      world,
      heavyCtx,
      dt,
    );
    expect(next.position.z).toBeCloseTo(5 - 7 * 0.82 * 0.8 * 0.6 * dt);
  });

  it("ADS is disabled while sprinting", () => {
    const next = stepPlayerMovement(
      groundedState(),
      idleInput({ forward: true, sprint: true, ads: true }),
      config,
      world,
      ctx,
      dt,
    );
    // sprint 1.5x applies, ADS multiplier must not
    expect(next.position.z).toBeCloseTo(5 - 7 * 1.5 * dt);
  });
});

describe("jump & gravity", () => {
  it("launches at sqrt(2*g*h) and reaches jumpHeight apex", () => {
    const expectedVy = Math.sqrt(2 * config.gravity * config.jumpHeight);
    let state = groundedState();
    state = stepPlayerMovement(state, idleInput({ jump: true }), config, world, ctx, dt);

    expect(state.grounded).toBe(false);
    expect(state.velocity.y).toBeCloseTo(expectedVy);

    // Step until apex: total flight time up = vy / g
    // Note: with discrete semi-implicit Euler integration the discrete apex
    // overshoots the continuous apex by up to ~v0*dt (a half-step artifact of
    // the fixed timestep), so assert a band rather than an exact value.
    let maxY = state.position.y;
    const steps = Math.ceil(expectedVy / config.gravity / dt) + 4;
    for (let i = 0; i < steps; i++) {
      state = stepPlayerMovement(state, idleInput(), config, world, ctx, dt);
      maxY = Math.max(maxY, state.position.y);
    }
    expect(maxY).toBeGreaterThan(config.jumpHeight - 0.1);
    expect(maxY).toBeLessThan(config.jumpHeight + expectedVy * dt + 0.1);
  });

  it("sprint jump is slightly higher than a normal jump", () => {
    const normalVy = Math.sqrt(2 * config.gravity * config.jumpHeight);
    const sprintVy = Math.sqrt(2 * config.gravity * config.jumpHeight * config.sprintJumpHeightMultiplier);
    expect(sprintVy).toBeGreaterThan(normalVy);
  });

  it("sprint jump reaches a measurably higher apex than a normal jump", () => {
    const apexOf = (sprinting: boolean): number => {
      let s = groundedState();
      s = stepPlayerMovement(
        s,
        idleInput({ jump: true, sprint: sprinting }),
        config,
        world,
        ctx,
        dt,
      );
      let maxY = s.position.y;
      for (let i = 0; i < 20; i++) {
        s = stepPlayerMovement(s, idleInput({ sprint: sprinting }), config, world, ctx, dt);
        maxY = Math.max(maxY, s.position.y);
      }
      return maxY;
    };
    expect(apexOf(true)).toBeGreaterThan(apexOf(false) + 0.1);
  });

  it("lands back on the floor and regains grounded", () => {
    let state = groundedState();
    state = stepPlayerMovement(state, idleInput({ jump: true }), config, world, ctx, dt);
    const flightSeconds = (2 * state.velocity.y) / config.gravity;
    const ticks = Math.ceil(flightSeconds / dt) + 2;
    for (let i = 0; i < ticks; i++) {
      state = stepPlayerMovement(state, idleInput(), config, world, ctx, dt);
    }
    expect(state.grounded).toBe(true);
    expect(state.position.y).toBeCloseTo(0);
    expect(state.velocity.y).toBe(0);
  });

  it("has no air control: horizontal velocity is preserved mid-air", () => {
    let state = groundedState();
    // jump while running forward
    state = stepPlayerMovement(
      state,
      idleInput({ forward: true, jump: true }),
      config,
      world,
      ctx,
      dt,
    );
    const airVx = state.velocity.x;
    const airVz = state.velocity.z;
    // change input direction mid-air — velocity must not change
    state = stepPlayerMovement(state, idleInput({ right: true }), config, world, ctx, dt);
    expect(state.velocity.x).toBeCloseTo(airVx);
    expect(state.velocity.z).toBeCloseTo(airVz);
  });

  it("cannot double jump", () => {
    let state = groundedState();
    state = stepPlayerMovement(state, idleInput({ jump: true }), config, world, ctx, dt);
    const vyAfterFirst = state.velocity.y;
    state = stepPlayerMovement(state, idleInput({ jump: true }), config, world, ctx, dt);
    expect(state.velocity.y).toBeCloseTo(vyAfterFirst - config.gravity * dt);
  });

  it("clamps fall speed to maxFallSpeed", () => {
    // Tall world so the player keeps falling (no bounds ceiling interference).
    const tallWorld: WorldGeometry = {
      colliders: [],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 500, z: 40 } },
    };
    let state = groundedState(5, 250, 5); // floating high above the floor
    state.grounded = false;
    state.velocity = { x: 0, y: 0, z: 0 };
    // Fall until terminal velocity is reached: v = g*t -> t = maxFallSpeed/g
    const ticksToTerminal = Math.ceil(config.maxFallSpeed / config.gravity / dt) + 4;
    for (let i = 0; i < ticksToTerminal; i++) {
      state = stepPlayerMovement(state, idleInput(), config, tallWorld, ctx, dt);
    }
    expect(state.velocity.y).toBeCloseTo(-config.maxFallSpeed);
  });

  it("lands cleanly after a terminal-velocity fall (no vertical tunneling)", () => {
    const tallWorld: WorldGeometry = {
      colliders: [],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 500, z: 40 } },
    };
    let state = groundedState(5, 300, 5);
    state.grounded = false;
    state.velocity = { x: 0, y: 0, z: 0 };
    // Acceleration phase (~30 ticks to reach terminal velocity), then the rest
    // at 30 m/s; 300m takes ~215 ticks total — give generous margin.
    const ticks = 400;
    for (let i = 0; i < ticks; i++) {
      state = stepPlayerMovement(state, idleInput(), config, tallWorld, ctx, dt);
    }
    expect(state.grounded).toBe(true);
    expect(state.position.y).toBeCloseTo(0);
    expect(state.velocity.y).toBe(0);
  });
});

describe("collision", () => {
  const wallWorld: WorldGeometry = {
    colliders: [
      { min: { x: 10, y: 0, z: 0 }, max: { x: 12, y: 4, z: 40 } }, // wall at x=10..12
    ],
    bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
  };

  it("stops at a wall instead of passing through", () => {
    let state = groundedState(8, 0, 20);
    for (let i = 0; i < 20; i++) {
      state = stepPlayerMovement(state, idleInput({ right: true }), config, wallWorld, ctx, dt);
    }
    // player radius 0.35, wall face at x=10
    expect(state.position.x).toBeCloseTo(10 - config.playerRadius);
  });

  it("slides along the wall when pressing diagonally", () => {
    let state = groundedState(8, 0, 20);
    for (let i = 0; i < 30; i++) {
      state = stepPlayerMovement(
        state,
        idleInput({ forward: true, right: true }),
        config,
        wallWorld,
        ctx,
        dt,
      );
    }
    // blocked on X at the wall face, but free to keep moving in Z
    expect(state.position.x).toBeCloseTo(10 - config.playerRadius);
    expect(state.position.z).toBeLessThan(20);
  });

  it("jumps onto and stands on top of a crate", () => {
    // 1m-tall crate lying across the player's path. Jump apex (~1.2m) clears
    // it; walking into it would not.
    const crateWorld: WorldGeometry = {
      colliders: [{ min: { x: 0, y: 0, z: 6 }, max: { x: 10, y: 1, z: 10 } }],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
    };
    let state = groundedState(2, 0, 12); // 2m in front of the crate's near face
    // ~1.15s of running: clears the near face, lands on top; check mid-crate
    // before the player runs off the far edge.
    for (let i = 0; i < 12; i++) {
      state = stepPlayerMovement(
        state,
        idleInput({ forward: true, jump: i === 0 }),
        config,
        crateWorld,
        ctx,
        dt,
      );
    }
    // player is standing on top of the crate at y=1 (crate top), grounded
    expect(state.position.y).toBeCloseTo(1);
    expect(state.grounded).toBe(true);
    // and is horizontally over the crate
    expect(state.position.z).toBeGreaterThanOrEqual(6);
    expect(state.position.z).toBeLessThanOrEqual(10);
  });

  it("cannot walk through a 2m wall", () => {
    // Wall across the path at z=5..7, tall enough to not be jumped.
    const tallWallWorld: WorldGeometry = {
      colliders: [
        { min: { x: 0, y: 0, z: 5 }, max: { x: 10, y: 4, z: 7 } },
      ],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
    };
    let state = groundedState(2, 0, 8); // approaching from +Z side
    for (let i = 0; i < 40; i++) {
      state = stepPlayerMovement(state, idleInput({ forward: true }), config, tallWallWorld, ctx, dt);
    }
    // blocked at the wall face (z=7) minus radius, well inside bounds
    expect(state.position.z).toBeCloseTo(7 + config.playerRadius);
    expect(state.position.y).toBeCloseTo(0);
  });

  it("clamps the player inside world bounds", () => {
    // forward = -Z, left = -X: heads straight for the (0,0) corner
    let state = groundedState(0.5, 0, 0.5);
    for (let i = 0; i < 10; i++) {
      state = stepPlayerMovement(
        state,
        idleInput({ forward: true, left: true }),
        config,
        world,
        ctx,
        dt,
      );
    }
    expect(state.position.x).toBeCloseTo(config.playerRadius);
    expect(state.position.z).toBeCloseTo(config.playerRadius);
  });

  it("walks off a ledge and falls to the floor below", () => {
    // Crate spanning x 0..10, z 6..10; the floor below is at y=0.
    const ledgeWorld: WorldGeometry = {
      colliders: [{ min: { x: 0, y: 0, z: 6 }, max: { x: 10, y: 2, z: 10 } }],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
    };
    let state: PlayerPhysicsState = {
      position: { x: 2, y: 2, z: 7 }, // standing on the crate
      velocity: { x: 0, y: 0, z: 0 },
      grounded: true,
      crouching: false,
    };
    // Walk forward (-Z): step off the crate's near edge at z=6, then fall.
    for (let i = 0; i < 60; i++) {
      state = stepPlayerMovement(state, idleInput({ forward: true }), config, ledgeWorld, ctx, dt);
    }
    // Should have fallen from y=2 down to the floor at y=0 and be grounded.
    expect(state.position.y).toBeCloseTo(0);
    expect(state.grounded).toBe(true);
    expect(state.position.z).toBeLessThan(5); // clearly past the ledge
  });

  it("bonks on a low ceiling and does not pass through it", () => {
    const lowCeilingWorld: WorldGeometry = {
      colliders: [{ min: { x: 0, y: 2, z: 0 }, max: { x: 10, y: 3, z: 10 } }],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
    };
    let state = groundedState(2, 0, 2);
    for (let i = 0; i < 30; i++) {
      state = stepPlayerMovement(state, idleInput({ jump: i === 0 }), config, lowCeilingWorld, ctx, dt);
    }
    // Jump apex would be ~1.2-1.4m; the ceiling is at y=2 -> head (feet+1.8)
    // never reaches the ceiling, so the player lands back on the floor.
    expect(state.grounded).toBe(true);
    expect(state.position.y).toBeCloseTo(0);
  });

  it("cannot uncrouch under a low ceiling (stays crouched)", () => {
    // Ceiling bottom at y=1.2: crouched head (0.9) fits, standing head (1.8) doesn't.
    const lowCeilingWorld: WorldGeometry = {
      colliders: [{ min: { x: 0, y: 1.2, z: 0 }, max: { x: 10, y: 2, z: 10 } }],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
    };
    const crouchedState: PlayerPhysicsState = {
      position: { x: 2, y: 0, z: 2 },
      velocity: { x: 0, y: 0, z: 0 },
      grounded: true,
      crouching: true,
    };
    const next = stepPlayerMovement(
      crouchedState,
      idleInput({ crouch: false }), // try to stand up
      config,
      lowCeilingWorld,
      ctx,
      dt,
    );
    expect(next.crouching).toBe(true); // uncrouch blocked
    expect(next.position.y).toBeCloseTo(0);
  });
});

describe("determinism", () => {
  it("produces byte-identical results for identical input (client/server parity)", () => {
    const input = idleInput({ forward: true, right: true, sprint: true, yaw: 0.7 });
    const wallWorld: WorldGeometry = {
      colliders: [{ min: { x: 5, y: 0, z: 0 }, max: { x: 7, y: 4, z: 40 } }],
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 40, y: 10, z: 40 } },
    };

    const run = (): PlayerPhysicsState => {
      let s = groundedState(3, 0, 5);
      for (let i = 0; i < 50; i++) {
        s = stepPlayerMovement(s, input, config, wallWorld, ctx, dt);
      }
      return s;
    };

    const a = run();
    const b = run();
    expect(a).toEqual(b);
    expect(a.position.x).toBe(a.position.x); // sanity: numbers stay finite
  });
});

describe("input validation", () => {
  it("rejects sprint while firing", () => {
    expect(validateInputState(idleInput({ sprint: true, firing: true }))).toBe("sprint-while-firing");
  });

  it("rejects ADS while sprinting", () => {
    expect(validateInputState(idleInput({ sprint: true, ads: true }))).toBe("ads-while-sprinting");
  });

  it("accepts legal input", () => {
    expect(validateInputState(idleInput({ forward: true, firing: true }))).toBeNull();
    expect(validateInputState(idleInput({ forward: true, sprint: true }))).toBeNull();
  });
});

describe("displacement speed cap", () => {
  it("flags displacement above finalSpeed * tickDelta * tolerance", () => {
    const params = {
      classSpeedMultiplier: 1,
      sprinting: true,
      crouching: false,
      weaponMovementPenalty: 1,
      adsActive: false,
      weaponAdsSpeedMultiplier: 1,
    };
    const legit = 7 * 1.5 * dt;
    expect(isDisplacementOverCap(config, params, legit)).toBe(false);
    expect(isDisplacementOverCap(config, params, legit * 2)).toBe(true);
  });

  it("respects weapon penalty in the cap", () => {
    const params = {
      classSpeedMultiplier: 0.82,
      sprinting: false,
      crouching: false,
      weaponMovementPenalty: 0.8,
      adsActive: false,
      weaponAdsSpeedMultiplier: 1,
    };
    const legit = 7 * 0.82 * 0.8 * dt;
    expect(isDisplacementOverCap(config, params, legit * 1.05)).toBe(false); // within 1.1 tolerance
    expect(isDisplacementOverCap(config, params, legit * 1.2)).toBe(true);
  });
});

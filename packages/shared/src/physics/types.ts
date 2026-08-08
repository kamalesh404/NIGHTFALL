/**
 * Core physics types shared verbatim between client prediction and the
 * authoritative server simulation. See docs/02-tech-stack/06-physics-integration.md.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Axis-aligned bounding box, used for player footprint and world colliders. */
export interface Aabb {
  min: Vec3;
  max: Vec3;
}

/**
 * Static world collision: an axis-aligned box list plus the outer playable
 * boundary. Phase 1 maps are built from modular boxes (containers, walls,
 * pillars), so AABB collision is exact for them.
 */
export interface WorldGeometry {
  colliders: Aabb[];
  bounds: Aabb;
}

/** A single player's physics state (feet position, capsule = AABB footprint). */
export interface PlayerPhysicsState {
  /** Feet position (bottom center of the collision footprint). */
  position: Vec3;
  /** Velocity in m/s. */
  velocity: Vec3;
  /** True when standing on a floor surface or the world bounds floor. */
  grounded: boolean;
  /** Current crouch state (drives footprint height and speed multiplier). */
  crouching: boolean;
}

/** Raw client movement input for one tick. */
export interface MovementInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  sprint: boolean;
  crouch: boolean;
  firing: boolean;
  ads: boolean;
  /** Camera yaw in radians (0 = facing -Z). */
  yaw: number;
}

/** Per-player simulation context derived from class + equipped weapon config. */
export interface MovementContext {
  classSpeedMultiplier: number;
  weaponMovementPenalty: number;
  weaponAdsSpeedMultiplier: number;
}

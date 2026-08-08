import type { MovementConfig } from "@nightfall/protocol";

/**
 * Movement math shared verbatim between client prediction and the authoritative
 * server simulation so both sides run identical logic.
 * See docs/03-game-design/05-movement/02-movement-values.md.
 */

export interface MovementModifiers {
  classSpeedMultiplier: number;
  sprinting: boolean;
  crouching: boolean;
  weaponMovementPenalty: number;
  adsActive: boolean;
  weaponAdsSpeedMultiplier: number;
}

/**
 * finalSpeed = baseSpeed
 *            * classSpeedMultiplier
 *            * (sprinting ? sprintMultiplier : 1.0)
 *            * (crouching ? crouchMultiplier : 1.0)
 *            * weaponMovementPenalty
 *            * (adsActive ? weaponAdsSpeedMultiplier : 1.0)
 *
 * All modifiers multiply; never add them.
 */
export function computeFinalSpeed(
  config: MovementConfig,
  modifiers: MovementModifiers,
): number {
  return (
    config.baseSpeed *
    modifiers.classSpeedMultiplier *
    (modifiers.sprinting ? config.sprintMultiplier : 1) *
    (modifiers.crouching ? config.crouchMultiplier : 1) *
    modifiers.weaponMovementPenalty *
    (modifiers.adsActive ? modifiers.weaponAdsSpeedMultiplier : 1)
  );
}

/** Player capsule height given crouch state. */
export function playerHeight(config: MovementConfig, crouching: boolean): number {
  return crouching ? config.standHeight * config.crouchHeightScale : config.standHeight;
}

/**
 * Upward launch velocity (m/s) needed to reach `height` under gravity:
 * v = sqrt(2 * g * h). Jumping while sprinting uses a boosted height.
 */
export function computeJumpVelocity(config: MovementConfig, sprinting: boolean): number {
  const height = sprinting ? config.jumpHeight * config.sprintJumpHeightMultiplier : config.jumpHeight;
  return Math.sqrt(2 * config.gravity * height);
}

/** Fixed simulation timestep in seconds for the configured tick rate. */
export function tickDeltaSeconds(config: MovementConfig): number {
  return 1 / config.tickRate;
}

/**
 * Maximum allowed horizontal displacement per tick for server-side speed
 * validation (docs/03-game-design/05-movement/03-movement-validation.md):
 * finalSpeed * tickDelta, plus a small tolerance for network jitter.
 */
export function maxDisplacementPerTick(
  config: MovementConfig,
  modifiers: MovementModifiers,
): number {
  return computeFinalSpeed(config, modifiers) * tickDeltaSeconds(config) * config.speedValidationTolerance;
}

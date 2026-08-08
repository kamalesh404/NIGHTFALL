import { z } from "zod";

/**
 * Schema for packages/config/movement.json
 * Global movement constants shared between client prediction and the
 * authoritative server simulation (identical values on both sides).
 * See docs/03-game-design/05-movement/ and docs/02-tech-stack/06-physics-integration.md
 */
export const MovementConfigSchema = z.object({
  /** Base movement speed in m/s */
  baseSpeed: z.number().positive(),
  /** Sprint multiplier (flat 1.5x) */
  sprintMultiplier: z.number().positive(),
  /** Crouch movement multiplier (0.5x) */
  crouchMultiplier: z.number().positive(),
  /** Crouch height reduction factor (0.5 = 50% height) */
  crouchHeightScale: z.number().min(0.1).max(1),
  /** Standing character height in meters */
  standHeight: z.number().positive(),
  /** Character capsule/AABB radius in meters (collision footprint) */
  playerRadius: z.number().positive(),
  /** Fixed jump height in meters (no air control) */
  jumpHeight: z.number().positive(),
  /** Terminal fall speed in m/s, clamps gravity to prevent tunneling */
  maxFallSpeed: z.number().positive(),
  /** Boost applied to jump height when jumping while sprinting */
  sprintJumpHeightMultiplier: z.number().min(1),
  /** Gravity in m/s^2 */
  gravity: z.number().positive(),
  /** Simulation tick rate in Hz (server: 20Hz) */
  tickRate: z.number().int().positive(),
  /** Speed validation tolerance multiplier for network jitter */
  speedValidationTolerance: z.number().positive(),
});

export type MovementConfig = z.infer<typeof MovementConfigSchema>;

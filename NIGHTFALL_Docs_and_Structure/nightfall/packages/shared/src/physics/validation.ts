import type { MovementConfig } from "@nightfall/protocol";
import { maxDisplacementPerTick } from "../movement";
import type { MovementInput } from "./types";

/**
 * Server-side input validation (docs/03-game-design/05-movement/03-movement-validation.md).
 * The server never trusts a client-reported position — these checks reject illegal
 * input states before any simulation happens, and the displacement cap is used to
 * verify movement deltas against the authoritative physics step.
 */

export type InputViolation =
  | "sprint-while-firing"
  | "ads-while-sprinting";

/**
 * State legality: sprint while firing, and ADS while sprinting, are rejected
 * server-side even if the client UI should have prevented them.
 * Returns null when the input is legal.
 */
export function validateInputState(input: MovementInput): InputViolation | null {
  if (input.sprint && input.firing) {
    return "sprint-while-firing";
  }
  if (input.ads && input.sprint) {
    return "ads-while-sprinting";
  }
  return null;
}

export interface SpeedValidationParams {
  classSpeedMultiplier: number;
  sprinting: boolean;
  crouching: boolean;
  weaponMovementPenalty: number;
  adsActive: boolean;
  weaponAdsSpeedMultiplier: number;
}

/**
 * True when a reported horizontal displacement (meters moved since the last
 * validated tick) exceeds the allowed maximum: finalSpeed * tickDelta, plus a
 * small tolerance for network jitter. Used to reject speed-hacking deltas.
 */
export function isDisplacementOverCap(
  config: MovementConfig,
  params: SpeedValidationParams,
  displacement: number,
): boolean {
  const cap = maxDisplacementPerTick(config, params);
  return displacement > cap;
}

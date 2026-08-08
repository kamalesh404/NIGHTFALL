import type { WeaponConfig } from "@nightfall/protocol";

/**
 * Damage math shared between client (prediction/feedback) and the authoritative
 * server (hit resolution). Server is the source of truth for outcomes.
 * See docs/03-game-design/06-combat/02-damage-calculation.md.
 */

/**
 * Returns 1.0 within weapon.range, then linearly decreases beyond it down to
 * weapon.falloffMin at weapon.falloffEndRange. Exact curve is config-driven
 * per weapon (range, falloffEndRange, falloffMin in weapons.json), never
 * hardcoded in combat code.
 */
export function rangeFalloffFactor(
  weapon: WeaponConfig,
  distance: number,
): number {
  if (distance <= weapon.range) {
    return 1;
  }
  if (distance >= weapon.falloffEndRange) {
    return weapon.falloffMin;
  }
  const t = (distance - weapon.range) / (weapon.falloffEndRange - weapon.range);
  return 1 - (1 - weapon.falloffMin) * t;
}

/**
 * finalDamage = baseDamage
 *             * (isHeadshot ? weapon.headshotMultiplier : 1.0)
 *             * rangeFalloffFactor(distance, weapon.range)
 *
 * There is no armor system; HP is the only damage-absorption mechanic.
 */
export function calculateDamage(
  weapon: WeaponConfig,
  distance: number,
  isHeadshot: boolean,
): number {
  const headshotMult = isHeadshot ? weapon.headshotMultiplier : 1;
  return weapon.damage * headshotMult * rangeFalloffFactor(weapon, distance);
}

/**
 * Total damage of one shotgun pull: per-pellet damage x pellet count,
 * each pellet resolved separately against the target's distance.
 */
export function calculateShotgunDamage(
  weapon: WeaponConfig,
  distance: number,
  isHeadshot: boolean,
): number {
  return calculateDamage(weapon, distance, isHeadshot) * weapon.pellets;
}

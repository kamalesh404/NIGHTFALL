import { describe, expect, it } from "vitest";
import { calculateDamage, computeFinalSpeed, rangeFalloffFactor } from "@nightfall/shared";
import { loadConfig } from "../src/index";

/**
 * Integration tests: the real shipped config drives the shared math.
 * These prevent silent drift between packages/config JSON and the formulas
 * in packages/shared (e.g. a bad sprintMultiplier would fail here).
 */
const config = loadConfig();

describe("movement math against real config", () => {
  it("Sentinel sprint speed = 7 * 0.98 * 1.5", () => {
    const sentinel = config.classes["sentinel"]!;
    const speed = computeFinalSpeed(config.movement, {
      classSpeedMultiplier: sentinel.speedMultiplier,
      sprinting: true,
      crouching: false,
      weaponMovementPenalty: config.weapons[sentinel.primaryWeapon]!.movementPenalty,
      adsActive: false,
      weaponAdsSpeedMultiplier: 1,
    });
    expect(speed).toBeCloseTo(7 * 0.98 * 1.5 * 0.96);
  });

  it("Reaper is the fastest class at base speed", () => {
    const reaper = config.classes["reaper"]!;
    const titan = config.classes["titan"]!;
    const speedReaper = computeFinalSpeed(config.movement, {
      classSpeedMultiplier: reaper.speedMultiplier,
      sprinting: false,
      crouching: false,
      weaponMovementPenalty: config.weapons[reaper.primaryWeapon]!.movementPenalty,
      adsActive: false,
      weaponAdsSpeedMultiplier: 1,
    });
    const speedTitan = computeFinalSpeed(config.movement, {
      classSpeedMultiplier: titan.speedMultiplier,
      sprinting: false,
      crouching: false,
      weaponMovementPenalty: config.weapons[titan.primaryWeapon]!.movementPenalty,
      adsActive: false,
      weaponAdsSpeedMultiplier: 1,
    });
    expect(speedReaper).toBeGreaterThan(speedTitan);
  });

  it("crouch halves the Sentinel's sprint speed", () => {
    const sentinel = config.classes["sentinel"]!;
    const base = computeFinalSpeed(config.movement, {
      classSpeedMultiplier: sentinel.speedMultiplier,
      sprinting: true,
      crouching: false,
      weaponMovementPenalty: 1,
      adsActive: false,
      weaponAdsSpeedMultiplier: 1,
    });
    const crouched = computeFinalSpeed(config.movement, {
      classSpeedMultiplier: sentinel.speedMultiplier,
      sprinting: true,
      crouching: true,
      weaponMovementPenalty: 1,
      adsActive: false,
      weaponAdsSpeedMultiplier: 1,
    });
    expect(crouched).toBeCloseTo(base * config.movement.crouchMultiplier);
  });
});

describe("damage math against real config", () => {
  it("Assault Rifle: 24 dmg body / 48 dmg head within range", () => {
    const ar = config.weapons["assault-rifle"]!;
    expect(calculateDamage(ar, 20, false)).toBeCloseTo(24);
    expect(calculateDamage(ar, 20, true)).toBeCloseTo(48);
  });

  it("Sniper Rifle: 95 dmg body / 237.5 dmg head at close range", () => {
    const sniper = config.weapons["sniper-rifle"]!;
    expect(calculateDamage(sniper, 50, false)).toBeCloseTo(95);
    expect(calculateDamage(sniper, 50, true)).toBeCloseTo(95 * 2.5);
  });

  it("Shotgun: full pellet spread at close range exceeds rifle damage", () => {
    const shotgun = config.weapons["shotgun"]!;
    const ar = config.weapons["assault-rifle"]!;
    expect(rangeFalloffFactor(shotgun, 5)).toBe(1);
    expect(calculateDamage(shotgun, 5, false) * shotgun.pellets).toBe(64);
    expect(calculateDamage(shotgun, 5, false) * shotgun.pellets).toBeGreaterThan(calculateDamage(ar, 5, false));
  });

  it("Shotgun damage drops off steeply past 15m", () => {
    const shotgun = config.weapons["shotgun"]!;
    const close = calculateDamage(shotgun, 5, false);
    const far = calculateDamage(shotgun, 25, false);
    expect(far).toBeLessThan(close * 0.5);
  });
});

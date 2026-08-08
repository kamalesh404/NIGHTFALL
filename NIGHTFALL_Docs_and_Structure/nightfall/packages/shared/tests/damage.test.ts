import { describe, expect, it } from "vitest";
import type { WeaponConfig } from "@nightfall/protocol";
import { calculateDamage, calculateShotgunDamage, rangeFalloffFactor } from "../src/index";

const rifle: WeaponConfig = {
  id: "test-rifle",
  name: "Test Rifle",
  slot: "primary",
  hitModel: "hitscan",
  fireMode: "auto",
  damage: 24,
  pellets: 1,
  fireRate: 8.5,
  burstCount: 1,
  burstDelaySec: 0,
  reloadTimeSec: 2.2,
  magazineCapacity: 30,
  magazineCount: 1,
  reserveAmmo: 90,
  accuracyDeg: 1.4,
  range: 45,
  falloffEndRange: 90,
  falloffMin: 0.3,
  headshotMultiplier: 2.0,
  recoilPattern: [{ v: 0.7, h: 0.2 }],
  recoilRecoverySec: 0.5,
  movementPenalty: 0.96,
  adsSpeedMultiplier: 0.7,
  adsSpeedMs: 180,
  scopeZoom: null,
  instantKill: false,
};

const shotgun: WeaponConfig = {
  ...rifle,
  id: "test-shotgun",
  damage: 8,
  pellets: 8,
  range: 15,
  falloffEndRange: 25,
  falloffMin: 0.2,
  headshotMultiplier: 1.5,
};

describe("rangeFalloffFactor", () => {
  it("returns 1.0 within effective range", () => {
    expect(rangeFalloffFactor(rifle, 45)).toBeCloseTo(1);
    expect(rangeFalloffFactor(rifle, 10)).toBeCloseTo(1);
  });

  it("linearly decreases beyond range", () => {
    // midpoint between range (45) and falloff end (90) is factor 0.65 for min 0.3
    expect(rangeFalloffFactor(rifle, 67.5)).toBeCloseTo(0.65);
  });

  it("honors the config-driven falloff end range", () => {
    expect(rangeFalloffFactor(rifle, 89)).toBeGreaterThan(0.3);
    expect(rangeFalloffFactor(rifle, 90)).toBeCloseTo(0.3);
  });

  it("clamps at falloffMin far beyond range", () => {
    expect(rangeFalloffFactor(rifle, 500)).toBeCloseTo(0.3);
  });
});

describe("calculateDamage", () => {
  it("applies base damage within range with no headshot", () => {
    expect(calculateDamage(rifle, 20, false)).toBeCloseTo(24);
  });

  it("applies headshot multiplier", () => {
    expect(calculateDamage(rifle, 20, true)).toBeCloseTo(48);
  });

  it("applies falloff beyond range", () => {
    // at 90m+ factor is 0.3
    expect(calculateDamage(rifle, 90, false)).toBeCloseTo(24 * 0.3);
  });

  it("multiplies headshot and falloff together", () => {
    expect(calculateDamage(rifle, 90, true)).toBeCloseTo(24 * 2.0 * 0.3);
  });
});

describe("calculateShotgunDamage", () => {
  it("scales by pellet count within range", () => {
    expect(calculateShotgunDamage(shotgun, 5, false)).toBeCloseTo(8 * 8);
  });

  it("applies headshot multiplier per pellet", () => {
    expect(calculateShotgunDamage(shotgun, 5, true)).toBeCloseTo(8 * 8 * 1.5);
  });

  it("falls off steeply beyond the shotgun's 15m range", () => {
    const atMid = calculateShotgunDamage(shotgun, 20, false);
    // midpoint of config falloffEndRange (15..25) with min 0.2 -> factor 0.6
    expect(atMid).toBeCloseTo(8 * 8 * 0.6);
  });
});

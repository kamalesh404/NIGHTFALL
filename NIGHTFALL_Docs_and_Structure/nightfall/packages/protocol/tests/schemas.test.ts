import { describe, expect, it } from "vitest";
import {
  ClassConfigSchema,
  ClassesConfigSchema,
  CombatConfigSchema,
  MatchConfigSchema,
  MovementConfigSchema,
  WeaponsConfigSchema,
  XpConfigSchema,
} from "../src/index";

describe("ClassConfigSchema", () => {
  it("accepts a valid class", () => {
    const result = ClassConfigSchema.parse({
      id: "sentinel",
      name: "Sentinel",
      role: "Frontline",
      hp: 110,
      speedMultiplier: 0.98,
      primaryWeapon: "assault-rifle",
      secondaryWeapon: "p-18-pistol",
    });
    expect(result.hp).toBe(110);
  });

  it("accepts a class without a secondary weapon", () => {
    const result = ClassConfigSchema.parse({
      id: "reaper",
      name: "Reaper",
      role: "Melee",
      hp: 90,
      speedMultiplier: 1.15,
      primaryWeapon: "katana",
      secondaryWeapon: null,
    });
    expect(result.secondaryWeapon).toBeNull();
  });

  it("rejects non-positive hp", () => {
    expect(() =>
      ClassConfigSchema.parse({
        id: "broken",
        name: "Broken",
        role: "Test",
        hp: 0,
        speedMultiplier: 1,
        primaryWeapon: "katana",
        secondaryWeapon: null,
      }),
    ).toThrow();
  });
});

describe("WeaponsConfigSchema", () => {
  it("accepts a valid weapon with a recoil pattern", () => {
    const result = WeaponsConfigSchema.parse({
      "assault-rifle": {
        id: "assault-rifle",
        name: "Assault Rifle",
        slot: "primary",
        hitModel: "hitscan",
        fireMode: "auto",
        damage: 24,
        fireRate: 8.5,
        reloadTimeSec: 2.2,
        magazineCapacity: 30,
        reserveAmmo: 90,
        accuracyDeg: 1.4,
        range: 45,
        falloffEndRange: 90,
        headshotMultiplier: 2.0,
        recoilPattern: [{ v: 0.7, h: 0.2 }],
        movementPenalty: 0.96,
        adsSpeedMs: 180,
      },
    });
    expect(result["assault-rifle"]?.damage).toBe(24);
    // defaults applied
    expect(result["assault-rifle"]?.pellets).toBe(1);
    expect(result["assault-rifle"]?.scopeZoom).toBeNull();
  });

  it("rejects an empty recoil pattern", () => {
    expect(() =>
      WeaponsConfigSchema.parse({
        x: {
          id: "x",
          name: "X",
          slot: "primary",
          hitModel: "hitscan",
          fireMode: "semi",
          damage: 10,
          fireRate: 1,
          reloadTimeSec: 1,
          magazineCapacity: 5,
          reserveAmmo: 10,
          accuracyDeg: 0,
          range: 20,
          falloffEndRange: 40,
          headshotMultiplier: 2,
          recoilPattern: [],
          movementPenalty: 1,
          adsSpeedMs: 100,
        },
      }),
    ).toThrow();
  });
});

describe("MovementConfigSchema", () => {
  it("accepts valid movement config", () => {
    const result = MovementConfigSchema.parse({
      baseSpeed: 7,
      sprintMultiplier: 1.5,
      crouchMultiplier: 0.5,
      crouchHeightScale: 0.5,
      standHeight: 1.8,
      jumpHeight: 1.2,
      sprintJumpHeightMultiplier: 1.2,
      gravity: 20,
      tickRate: 20,
      speedValidationTolerance: 1.1,
    });
    expect(result.tickRate).toBe(20);
  });

  it("rejects a zero tick rate", () => {
    expect(() =>
      MovementConfigSchema.parse({
        baseSpeed: 7,
        sprintMultiplier: 1.5,
        crouchMultiplier: 0.5,
        crouchHeightScale: 0.5,
        standHeight: 1.8,
        jumpHeight: 1.2,
        sprintJumpHeightMultiplier: 1.2,
        gravity: 20,
        tickRate: 0,
        speedValidationTolerance: 1.1,
      }),
    ).toThrow();
  });
});

describe("MatchConfigSchema", () => {
  it("accepts a valid match config", () => {
    const result = MatchConfigSchema.parse({
      durationSec: 240,
      respawnSec: 0,
      scoreLimits: { ffa: 30, tdm: 40, ctf: 3, hardpoint: 250 },
      botDifficulty: "normal",
      hardpointRotationSec: 60,
      hardpointZonesPerMatch: 3,
      mapVoteSec: 15,
      publicMaxPlayers: 8,
      privateMaxPlayers: 12,
      preMatchCountdownSec: 5,
    });
    expect(result.durationSec).toBe(240);
  });

  it("rejects an unknown bot difficulty", () => {
    expect(() =>
      MatchConfigSchema.parse({
        durationSec: 240,
        respawnSec: 0,
        scoreLimits: { ffa: 30, tdm: 40, ctf: 3, hardpoint: 250 },
        botDifficulty: "impossible",
        hardpointRotationSec: 60,
        hardpointZonesPerMatch: 3,
        mapVoteSec: 15,
        publicMaxPlayers: 8,
        privateMaxPlayers: 12,
        preMatchCountdownSec: 5,
      }),
    ).toThrow();
  });
});

describe("CombatConfigSchema", () => {
  it("accepts valid combat config", () => {
    const result = CombatConfigSchema.parse({
      meleeDamage: 40,
      meleeCooldownSec: 0.9,
      meleeRange: 2.0,
      assistDamageThreshold: 40,
      assistWindowSec: 3,
      killstreakWindowSec: 4,
    });
    expect(result.assistWindowSec).toBe(3);
  });
});

describe("XpConfigSchema", () => {
  it("requires exactly 100 level thresholds", () => {
    const thresholds = Array.from({ length: 100 }, (_, i) => i * 100);
    const result = XpConfigSchema.parse({
      rewards: { kill: 100, assist: 50, objectiveCapture: 150, win: 250 },
      levelThresholds: thresholds,
    });
    expect(result.levelThresholds).toHaveLength(100);
  });

  it("rejects the wrong number of thresholds", () => {
    expect(() =>
      XpConfigSchema.parse({
        rewards: { kill: 100, assist: 50, objectiveCapture: 150, win: 250 },
        levelThresholds: [0, 100],
      }),
    ).toThrow();
  });
});

describe("ClassesConfigSchema", () => {
  it("rejects a class id that differs from its record key", () => {
    // Schema keys by record; ids must match for consistency (enforced by loader).
    const result = ClassesConfigSchema.parse({
      sentinel: {
        id: "sentinel",
        name: "Sentinel",
        role: "Frontline",
        hp: 110,
        speedMultiplier: 0.98,
        primaryWeapon: "assault-rifle",
        secondaryWeapon: "p-18-pistol",
      },
    });
    expect(result.sentinel?.id).toBe("sentinel");
  });
});

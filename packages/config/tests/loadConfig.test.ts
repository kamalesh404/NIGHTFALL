import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/index";

describe("loadConfig", () => {
  it("loads and validates every shipped config file", () => {
    const config = loadConfig();
    expect(Object.keys(config.classes)).toHaveLength(10);
    expect(Object.keys(config.weapons)).toHaveLength(11);
  });

  it("every class primary/secondary weapon id exists in weapons config", () => {
    const { classes, weapons } = loadConfig();
    for (const cls of Object.values(classes)) {
      expect(weapons[cls.primaryWeapon]).toBeDefined();
      if (cls.secondaryWeapon !== null) {
        expect(weapons[cls.secondaryWeapon]).toBeDefined();
      }
    }
  });

  it("class ids match their config keys", () => {
    const { classes } = loadConfig();
    for (const [key, cls] of Object.entries(classes)) {
      expect(cls.id).toBe(key);
    }
  });

  it("weapon ids match their config keys", () => {
    const { weapons } = loadConfig();
    for (const [key, weapon] of Object.entries(weapons)) {
      expect(weapon.id).toBe(key);
    }
  });

  it("every class hp and speed multiplier is positive", () => {
    const { classes } = loadConfig();
    for (const cls of Object.values(classes)) {
      expect(cls.hp).toBeGreaterThan(0);
      expect(cls.speedMultiplier).toBeGreaterThan(0);
    }
  });

  it("shotgun fires 8 pellets and is hitscan", () => {
    const { weapons } = loadConfig();
    const shotgun = weapons["shotgun"];
    expect(shotgun?.pellets).toBe(8);
    expect(shotgun?.hitModel).toBe("hitscan");
    expect(shotgun?.range).toBe(15);
  });

  it("reaper katana is an instant-kill melee with 2.5m range", () => {
    const { weapons } = loadConfig();
    const katana = weapons["katana"];
    expect(katana?.hitModel).toBe("melee");
    expect(katana?.instantKill).toBe(true);
    expect(katana?.range).toBe(2.5);
  });

  it("rocket launcher has splash damage", () => {
    const { weapons } = loadConfig();
    const rl = weapons["rocket-launcher"];
    expect(rl?.splash?.damage).toBe(70);
    expect(rl?.splash?.radius).toBeGreaterThan(0);
  });

  it("xp thresholds cover levels 1-100 in strictly increasing order", () => {
    const { xp } = loadConfig();
    expect(xp.levelThresholds).toHaveLength(100);
    expect(xp.levelThresholds[0]).toBe(0);
    for (let i = 1; i < xp.levelThresholds.length; i++) {
      expect(xp.levelThresholds[i]!).toBeGreaterThan(xp.levelThresholds[i - 1]!);
    }
  });

  it("match config reflects 4-minute matches with instant respawn", () => {
    const { match } = loadConfig();
    expect(match.durationSec).toBe(240);
    expect(match.respawnSec).toBe(0);
    expect(match.mapVoteSec).toBe(15);
  });
});

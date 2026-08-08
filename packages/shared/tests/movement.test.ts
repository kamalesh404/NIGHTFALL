import { describe, expect, it } from "vitest";
import type { MovementConfig } from "@nightfall/protocol";
import {
  computeFinalSpeed,
  computeJumpVelocity,
  maxDisplacementPerTick,
  playerHeight,
  tickDeltaSeconds,
  type MovementModifiers,
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

function mods(overrides: Partial<MovementModifiers>): MovementModifiers {
  return {
    classSpeedMultiplier: 1,
    sprinting: false,
    crouching: false,
    weaponMovementPenalty: 1,
    adsActive: false,
    weaponAdsSpeedMultiplier: 1,
    ...overrides,
  };
}

describe("computeFinalSpeed", () => {
  it("returns baseSpeed with no modifiers", () => {
    expect(computeFinalSpeed(config, mods({}))).toBeCloseTo(7);
  });

  it("applies class speed multiplier", () => {
    expect(computeFinalSpeed(config, mods({ classSpeedMultiplier: 1.08 }))).toBeCloseTo(7.56);
  });

  it("applies sprint multiplier (1.5x) multiplicatively", () => {
    expect(computeFinalSpeed(config, mods({ sprinting: true }))).toBeCloseTo(10.5);
  });

  it("applies crouch multiplier (0.5x) multiplicatively", () => {
    expect(computeFinalSpeed(config, mods({ crouching: true }))).toBeCloseTo(3.5);
  });

  it("applies weapon movement penalty", () => {
    expect(computeFinalSpeed(config, mods({ weaponMovementPenalty: 0.96 }))).toBeCloseTo(6.72);
  });

  it("applies ADS speed multiplier", () => {
    expect(computeFinalSpeed(config, mods({ adsActive: true, weaponAdsSpeedMultiplier: 0.7 }))).toBeCloseTo(4.9);
  });

  it("multiplies sprint + crouch + weapon + ADS together (not additively)", () => {
    const speed = computeFinalSpeed(
      config,
      mods({
        classSpeedMultiplier: 0.98,
        sprinting: true,
        crouching: true,
        weaponMovementPenalty: 0.96,
        adsActive: true,
        weaponAdsSpeedMultiplier: 0.7,
      }),
    );
    const expected = 7 * 0.98 * 1.5 * 0.5 * 0.96 * 0.7;
    expect(speed).toBeCloseTo(expected);
  });
});

describe("playerHeight", () => {
  it("returns stand height when upright", () => {
    expect(playerHeight(config, false)).toBeCloseTo(1.8);
  });

  it("reduces height by 50% when crouching", () => {
    expect(playerHeight(config, true)).toBeCloseTo(0.9);
  });
});

describe("computeJumpVelocity", () => {
  it("v = sqrt(2*g*h) for a normal jump", () => {
    expect(computeJumpVelocity(config, false)).toBeCloseTo(Math.sqrt(2 * 20 * 1.2));
  });

  it("sprint jump uses the boosted height", () => {
    expect(computeJumpVelocity(config, true)).toBeCloseTo(Math.sqrt(2 * 20 * 1.2 * 1.2));
  });
});

describe("tickDeltaSeconds & maxDisplacementPerTick", () => {
  it("computes 50ms tick at 20Hz", () => {
    expect(tickDeltaSeconds(config)).toBeCloseTo(0.05);
  });

  it("caps displacement at finalSpeed * delta * tolerance", () => {
    const cap = maxDisplacementPerTick(config, mods({ classSpeedMultiplier: 1.08 }));
    expect(cap).toBeCloseTo(7 * 1.08 * 0.05 * 1.1);
  });
});

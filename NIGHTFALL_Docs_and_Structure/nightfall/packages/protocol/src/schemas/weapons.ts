import { z } from "zod";

/**
 * Schema for packages/config/weapons.json
 * Defines, per weapon: damage, fire rate, reload time, magazine capacity,
 * accuracy, range, headshot multiplier, recoil pattern, movement penalty,
 * ADS speed. See docs/10-configuration/03-weapon-config.md.
 */
export const RecoilStepSchema = z.object({
  /** Vertical kick in degrees (positive = camera pitches up) */
  v: z.number(),
  /** Horizontal kick in degrees (positive = camera yaws right) */
  h: z.number(),
});

/** How a shot is resolved server-side. See docs/03-game-design/06-combat/01-hit-detection.md */
export const HitModelSchema = z.enum(["hitscan", "projectile", "melee"]);

/** Weapon fire behavior */
export const FireModeSchema = z.enum(["auto", "semi", "burst"]);

/** Rocket launcher splash damage definition */
export const SplashSchema = z
  .object({
    /** Damage applied to players within radius (excluding direct hit) */
    damage: z.number().nonnegative(),
    /** Radius in meters */
    radius: z.number().positive(),
  })
  .optional();

export const WeaponConfigSchema = z.object({
  /** Unique machine id, e.g. "assault-rifle" */
  id: z.string().min(1),
  /** Display name, e.g. "Assault Rifle" */
  name: z.string().min(1),
  /** Slot: primary or secondary */
  slot: z.enum(["primary", "secondary"]),
  /** Hit resolution model */
  hitModel: HitModelSchema,
  /** Fire behavior */
  fireMode: FireModeSchema,
  /** Base damage per shot (per pellet for shotguns) */
  damage: z.number().nonnegative(),
  /** Number of pellets fired per shot (shotgun = 8, others = 1) */
  pellets: z.number().int().positive().default(1),
  /** Rounds per second (burst rifle: rounds per second within a burst) */
  fireRate: z.number().positive(),
  /** Burst size for fireMode === "burst" */
  burstCount: z.number().int().positive().default(1),
  /** Time between bursts, seconds */
  burstDelaySec: z.number().nonnegative().default(0),
  /** Reload time from empty to full, seconds */
  reloadTimeSec: z.number().nonnegative(),
  /** Magazine capacity (per pistol for dual-pistols) */
  magazineCapacity: z.number().int().positive(),
  /** Number of magazines (dual-pistols = 2) */
  magazineCount: z.number().int().positive().default(1),
  /** Starting reserve ammo */
  reserveAmmo: z.number().int().nonnegative(),
  /** Spread cone angle in degrees, lower = tighter */
  accuracyDeg: z.number().nonnegative(),
  /** Effective range in meters before falloff begins */
  range: z.number().positive(),
  /** Distance in meters where falloff reaches its minimum floor */
  falloffEndRange: z.number().positive(),
  /** Minimum falloff multiplier reached far beyond range (0..1) */
  falloffMin: z.number().min(0).max(1).default(0.3),
  /** Headshot multiplier applied to base damage */
  headshotMultiplier: z.number().positive(),
  /** Fixed-order per-shot recoil pattern, resets after recovery delay */
  recoilPattern: z.array(RecoilStepSchema).min(1),
  /** Seconds of no fire before the recoil pattern index resets */
  recoilRecoverySec: z.number().nonnegative().default(0.5),
  /** Movement speed multiplier while this weapon is equipped */
  movementPenalty: z.number().positive(),
  /** Movement speed multiplier while ADS is active */
  adsSpeedMultiplier: z.number().positive().default(1),
  /** Milliseconds to transition into and out of ADS */
  adsSpeedMs: z.number().int().nonnegative(),
  /** Scope zoom for sniper rifle only (null otherwise) */
  scopeZoom: z.number().positive().nullable().default(null),
  /** Rocket launcher splash params */
  splash: SplashSchema,
  /** Katana: hit is an instant kill */
  instantKill: z.boolean().default(false),
});

/** All weapons keyed by weapon id. */
export const WeaponsConfigSchema = z.record(WeaponConfigSchema);

export type WeaponConfig = z.infer<typeof WeaponConfigSchema>;
export type WeaponsConfig = z.infer<typeof WeaponsConfigSchema>;
export type RecoilStep = z.infer<typeof RecoilStepSchema>;

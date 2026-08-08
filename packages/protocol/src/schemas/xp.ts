import { z } from "zod";

/**
 * Schema for packages/config/xp.json
 * XP rewards and the level 1-100 threshold curve.
 * See docs/10-configuration/05-xp-config.md and docs/03-game-design/07-progression/.
 */
export const XpRewardsSchema = z.object({
  kill: z.number().int().nonnegative(),
  assist: z.number().int().nonnegative(),
  objectiveCapture: z.number().int().nonnegative(),
  win: z.number().int().nonnegative(),
});

export const XpConfigSchema = z.object({
  /** XP granted per event type */
  rewards: XpRewardsSchema,
  /**
   * Cumulative XP required to reach each level.
   * Index 0 = level 1 (0 XP), so thresholds.length must equal 100.
   */
  levelThresholds: z.array(z.number().int().nonnegative()).length(100),
});

export type XpConfig = z.infer<typeof XpConfigSchema>;
export type XpRewards = z.infer<typeof XpRewardsSchema>;

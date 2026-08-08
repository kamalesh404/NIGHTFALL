import { z } from "zod";

/**
 * Schema for packages/config/match.json
 * Defines match duration, respawn time, score limits per mode, and bot
 * difficulty defaults. See docs/10-configuration/06-match-config.md.
 */
export const GameModeSchema = z.enum(["ffa", "tdm", "ctf", "hardpoint"]);

export const ScoreLimitSchema = z.object({
  ffa: z.number().int().positive(),
  tdm: z.number().int().positive(),
  ctf: z.number().int().positive(),
  hardpoint: z.number().int().positive(),
});

export const BotDifficultySchema = z.enum(["easy", "normal", "hard"]);

export const MatchConfigSchema = z.object({
  /** Match duration in seconds (4 minutes) */
  durationSec: z.number().int().positive(),
  /** Respawn time in seconds (0 = instant respawn) */
  respawnSec: z.number().int().nonnegative(),
  /** Score limit per game mode (whichever comes first with the timer) */
  scoreLimits: ScoreLimitSchema,
  /** Default bot difficulty */
  botDifficulty: BotDifficultySchema,
  /** Hardpoint zone rotation interval in seconds (60s) */
  hardpointRotationSec: z.number().int().positive(),
  /** Hardpoint zones per match */
  hardpointZonesPerMatch: z.number().int().positive(),
  /** Map vote duration in seconds after a match ends (15s) */
  mapVoteSec: z.number().int().positive(),
  /** Max players for public rooms */
  publicMaxPlayers: z.number().int().positive(),
  /** Max players for private rooms */
  privateMaxPlayers: z.number().int().positive(),
  /** Time in seconds before a match starts after enough players join */
  preMatchCountdownSec: z.number().int().positive(),
});

export type MatchConfig = z.infer<typeof MatchConfigSchema>;
export type GameMode = z.infer<typeof GameModeSchema>;
export type BotDifficulty = z.infer<typeof BotDifficultySchema>;

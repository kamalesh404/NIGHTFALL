import { z } from "zod";
import { GameModeSchema } from "../schemas/match";

/**
 * State snapshot (server -> client), broadcast once per 20Hz tick.
 * See docs/04-networking/02-message-protocol.md.
 */

export const TeamSchema = z.enum(["red", "blue"]).nullable();

/** One player's authoritative state inside a snapshot. */
export const SnapshotPlayerSchema = z.object({
  id: z.string().min(1),
  /** True for AI bot players. */
  isBot: z.boolean(),
  classId: z.string().min(1),
  team: TeamSchema,
  position: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  velocity: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  yaw: z.number(),
  pitch: z.number(),
  health: z.number().int().nonnegative(),
  ammoMag: z.number().int().nonnegative(),
  ammoReserve: z.number().int().nonnegative(),
  /** Whether the player is currently alive (0 = instant respawn so usually true). */
  alive: z.boolean(),
  /** Input sequence number the server processed for this player (reconciliation). */
  lastProcessedInputSeq: z.number().int().nonnegative(),
  score: z.number().int(),
  kills: z.number().int().nonnegative(),
  deaths: z.number().int().nonnegative(),
  assists: z.number().int().nonnegative(),
  headshots: z.number().int().nonnegative(),
});

/** Team scores or FFA standings header. */
export const ScoreBoardSchema = z.object({
  red: z.number().int().nonnegative(),
  blue: z.number().int().nonnegative(),
});

/** Hardpoint zone status. */
export const HardpointZoneSchema = z.object({
  index: z.number().int().nonnegative(),
  position: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  radius: z.number().positive(),
  /** Which team currently controls the zone, or null when contested. */
  controllingTeam: z.enum(["red", "blue"]).nullable(),
  captureProgress: z.number().min(0).max(1),
});

/** Capture-the-flag carrier state. */
export const FlagStateSchema = z.object({
  redCarrierId: z.string().min(1).nullable(),
  blueCarrierId: z.string().min(1).nullable(),
  redAtHome: z.boolean(),
  blueAtHome: z.boolean(),
});

/** Match status inside a snapshot. */
export const MatchStatusSchema = z.enum(["pregame", "live", "postgame"]);

export const SnapshotMessageSchema = z.object({
  tick: z.number().int().nonnegative(),
  /** Server time remaining in seconds. */
  timeRemainingSec: z.number().int().nonnegative(),
  mode: GameModeSchema,
  status: MatchStatusSchema,
  scoreboard: ScoreBoardSchema,
  players: z.array(SnapshotPlayerSchema),
  hardpointZones: z.array(HardpointZoneSchema),
  flags: FlagStateSchema.nullable(),
});

export type SnapshotMessage = z.infer<typeof SnapshotMessageSchema>;
export type SnapshotPlayer = z.infer<typeof SnapshotPlayerSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type MatchStatus = z.infer<typeof MatchStatusSchema>;

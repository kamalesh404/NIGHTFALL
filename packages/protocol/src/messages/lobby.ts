import { z } from "zod";
import { BotDifficultySchema, GameModeSchema } from "../schemas/match";

/**
 * Lobby messages (bidirectional) — room lifecycle, match start countdown,
 * map voting. See docs/04-networking/02-message-protocol.md.
 */

export const CreateRoomRequestSchema = z.object({
  name: z.string().min(1).max(32),
  mode: GameModeSchema,
  mapId: z.string().min(1),
  /** Private rooms support up to 12 players; public up to 8. */
  isPrivate: z.boolean(),
  botDifficulty: BotDifficultySchema.optional(),
});

export const CreateRoomResponseSchema = z.object({
  roomId: z.string().min(1),
  /** Join code for private rooms (4-6 chars). */
  code: z.string().min(4).max(6).nullable(),
  maxPlayers: z.number().int().positive(),
});

export const JoinRoomRequestSchema = z.object({
  roomId: z.string().min(1).nullable(),
  /** For private rooms: the join code instead of roomId. */
  code: z.string().min(4).max(6).nullable(),
});

export const PlayerInfoSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1).max(24),
  isHost: z.boolean(),
  isBot: z.boolean(),
  classId: z.string().min(1),
  team: z.enum(["red", "blue"]).nullable(),
  ready: z.boolean(),
});

export const RoomStateSchema = z.object({
  roomId: z.string().min(1),
  name: z.string(),
  mode: GameModeSchema,
  mapId: z.string().min(1),
  isPrivate: z.boolean(),
  maxPlayers: z.number().int().positive(),
  players: z.array(PlayerInfoSchema),
  /** Seconds until match start, or null when waiting for players. */
  countdownSec: z.number().int().nonnegative().nullable(),
});

export const LeaveRoomSchema = z.object({
  playerId: z.string().min(1),
  reason: z.enum(["host-left", "kicked", "disconnected", "match-ended"]),
});

export const MatchStartCountdownSchema = z.object({
  roomId: z.string().min(1),
  seconds: z.number().int().nonnegative(),
});

export const MapVoteSchema = z.object({
  roomId: z.string().min(1),
  mapId: z.enum(["rustpoint", "fallen-sanctuary", "emerald-park"]),
});

export const MapVoteResultSchema = z.object({
  roomId: z.string().min(1),
  counts: z.record(z.enum(["rustpoint", "fallen-sanctuary", "emerald-park"]), z.number().int().nonnegative()),
  winner: z.enum(["rustpoint", "fallen-sanctuary", "emerald-park"]),
});

export const LobbyMessageSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("create-room"), payload: CreateRoomRequestSchema }),
  z.object({ kind: z.literal("room-created"), payload: CreateRoomResponseSchema }),
  z.object({ kind: z.literal("join-room"), payload: JoinRoomRequestSchema }),
  z.object({ kind: z.literal("room-state"), payload: RoomStateSchema }),
  z.object({ kind: z.literal("leave-room"), payload: LeaveRoomSchema }),
  z.object({ kind: z.literal("match-countdown"), payload: MatchStartCountdownSchema }),
  z.object({ kind: z.literal("map-vote"), payload: MapVoteSchema }),
  z.object({ kind: z.literal("map-vote-result"), payload: MapVoteResultSchema }),
]);

export type LobbyMessage = z.infer<typeof LobbyMessageSchema>;
export type RoomState = z.infer<typeof RoomStateSchema>;
export type PlayerInfo = z.infer<typeof PlayerInfoSchema>;
export type MapVote = z.infer<typeof MapVoteSchema>;
export type LobbyKind = LobbyMessage["kind"];

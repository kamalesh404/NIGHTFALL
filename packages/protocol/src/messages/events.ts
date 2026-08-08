import { z } from "zod";

/**
 * Event messages (server -> client), sent immediately on occurrence — never
 * batched into the next snapshot. See docs/04-networking/02-message-protocol.md.
 */

/** Damage dealt to a player (drives damage indicators + hitmarker). */
export const DamageEventSchema = z.object({
  targetId: z.string().min(1),
  attackerId: z.string().min(1).nullable(),
  damage: z.number().nonnegative(),
  isHeadshot: z.boolean(),
  distance: z.number().nonnegative(),
});

/** A kill — also carries the assist chain that fed it. */
export const KillEventSchema = z.object({
  killerId: z.string().min(1).nullable(), // null = environmental/fall
  victimId: z.string().min(1),
  weaponId: z.string().min(1),
  isHeadshot: z.boolean(),
  isFirstBlood: z.boolean(),
  /** Medal awarded for the killstreak, if any (defaults to none). */
  medal: z
    .enum(["double-kill", "triple-kill", "rampage", "dominating"])
    .nullable()
    .default(null),
  /** True when the victim was the enemy flag carrier (CTF). */
  flagCarrierKill: z.boolean().default(false),
});

/** A death, from the victim's perspective (drives death cam / spectator UI). */
export const DeathEventSchema = z.object({
  victimId: z.string().min(1),
  killerId: z.string().min(1).nullable(),
  weaponId: z.string().min(1),
  /** Victim position at death, for death cam. */
  position: z.object({ x: z.number(), y: z.number(), z: z.number() }),
  isHeadshot: z.boolean(),
});

export const AssistEventSchema = z.object({
  assistantId: z.string().min(1),
  killerId: z.string().min(1),
  victimId: z.string().min(1),
});

export const MedalEventSchema = z.object({
  playerId: z.string().min(1),
  medal: z.enum([
    "double-kill",
    "triple-kill",
    "rampage",
    "dominating",
    "headshot",
    "first-blood",
  ]),
});

export const ObjectiveEventSchema = z.object({
  playerId: z.string().min(1).nullable(),
  type: z.enum(["flag-capture", "flag-touch", "flag-return", "hardpoint-secure"]),
});

export const EventMessageSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("damage"), payload: DamageEventSchema }),
  z.object({ kind: z.literal("kill"), payload: KillEventSchema }),
  z.object({ kind: z.literal("death"), payload: DeathEventSchema }),
  z.object({ kind: z.literal("assist"), payload: AssistEventSchema }),
  z.object({ kind: z.literal("medal"), payload: MedalEventSchema }),
  z.object({ kind: z.literal("objective"), payload: ObjectiveEventSchema }),
]);

export type EventMessage = z.infer<typeof EventMessageSchema>;
export type KillEvent = z.infer<typeof KillEventSchema>;
export type DeathEvent = z.infer<typeof DeathEventSchema>;
export type DamageEvent = z.infer<typeof DamageEventSchema>;
export type AssistEvent = z.infer<typeof AssistEventSchema>;
export type MedalEvent = z.infer<typeof MedalEventSchema>;
export type ObjectiveEvent = z.infer<typeof ObjectiveEventSchema>;
export type EventKind = EventMessage["kind"];

import { z } from "zod";

/**
 * Input message (client -> server), sent every client frame.
 * See docs/04-networking/02-message-protocol.md.
 * The server re-derives all authoritative state from these fields; it never
 * trusts a client-reported position or outcome.
 */

/** Movement + action keys for one frame. */
export const InputKeysSchema = z.object({
  forward: z.boolean(),
  backward: z.boolean(),
  left: z.boolean(),
  right: z.boolean(),
  jump: z.boolean(),
  sprint: z.boolean(),
  crouch: z.boolean(),
  /** Fire is held (auto weapons) or a single press (semi/burst). */
  firing: z.boolean(),
  /** Aim-down-sights held. */
  ads: z.boolean(),
  /** Reload request edge-triggered by the client. */
  reload: z.boolean(),
  /** Weapon slot to switch to: 0 primary, 1 secondary. */
  weaponSwitch: z.number().int().min(0).max(1).nullable(),
  /** Melee slash request (contextual or Katana). */
  melee: z.boolean(),
  /** Ability use (currently a placeholder; classes have no active abilities in Phase 1). */
  ability: z.boolean(),
});

/** Mouse look delta for one frame, radians. */
export const LookDeltaSchema = z.object({
  yaw: z.number(),
  pitch: z.number(),
});

export const InputMessageSchema = z.object({
  /** Client-side sequence number for prediction/reconciliation. */
  seq: z.number().int().nonnegative(),
  /** Client timestamp (ms) used for basic lag compensation. */
  timestampMs: z.number().int().nonnegative(),
  keys: InputKeysSchema,
  look: LookDeltaSchema,
});

export type InputMessage = z.infer<typeof InputMessageSchema>;
export type InputKeys = z.infer<typeof InputKeysSchema>;
export type LookDelta = z.infer<typeof LookDeltaSchema>;

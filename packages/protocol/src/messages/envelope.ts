import { z } from "zod";
import { InputMessageSchema, type InputMessage } from "./input";
import { SnapshotMessageSchema, type SnapshotMessage } from "./snapshot";
import { EventMessageSchema, type EventMessage, type EventKind } from "./events";
import { LobbyMessageSchema, type LobbyMessage, type LobbyKind } from "./lobby";

/**
 * Every message over the wire is `{ type, payload }` where the payload schema
 * is selected by `type`. One envelope schema for the whole protocol:
 * a single `dispatch(type, payload)` routes to the correct handler on both ends
 * — no ad-hoc `socket.on('customEvent', ...)` handlers scattered through code.
 *
 * See docs/04-networking/02-message-protocol.md.
 */

export const MessageTypeSchema = z.enum(["input", "snapshot", "event", "lobby"]);

export type MessageType = z.infer<typeof MessageTypeSchema>;

/** Payload keyed by message type (input, snapshot, event, lobby). */
export type MessagePayload = InputMessage | SnapshotMessage | EventMessage | LobbyMessage;

export interface Envelope<T extends MessagePayload = MessagePayload> {
  type: MessageType;
  payload: T;
}

/** Generic wire envelope validator: `{ type, payload }` shape. */
export const EnvelopeSchema = z
  .object({
    type: MessageTypeSchema,
    // z.unknown() alone would accept a missing key (parsed as undefined), so
    // refine to require the payload key to exist on the wire.
    payload: z.unknown(),
  })
  .refine((env) => "payload" in env, {
    message: "payload key is required",
  });

export type MessageHandlerMap = {
  input: (payload: InputMessage) => void;
  snapshot: (payload: SnapshotMessage) => void;
  event: (payload: EventMessage) => void;
  lobby: (payload: LobbyMessage) => void;
};

/**
 * Returns a type-safe `dispatch(envelope)` that validates the payload with its
 * schema and routes it to the matching handler. A failed parse logs and drops
 * the message — it never throws into the tick loop (see
 * docs/02-tech-stack/05-networking-protocol.md).
 */
export function createDispatcher(handlers: MessageHandlerMap) {
  return function dispatch(envelope: unknown): void {
    const parsedEnvelope = EnvelopeSchema.safeParse(envelope);
    if (!parsedEnvelope.success) {
      console.warn("[protocol] dropped message: invalid envelope", envelope);
      return;
    }
    const { type, payload } = parsedEnvelope.data;

    switch (type) {
      case "input": {
        const parsed = InputMessageSchema.safeParse(payload);
        if (!parsed.success) {
          console.warn("[protocol] dropped input message: invalid payload", parsed.error.issues);
          return;
        }
        handlers.input(parsed.data);
        return;
      }
      case "snapshot": {
        const parsed = SnapshotMessageSchema.safeParse(payload);
        if (!parsed.success) {
          console.warn("[protocol] dropped snapshot message: invalid payload", parsed.error.issues);
          return;
        }
        handlers.snapshot(parsed.data);
        return;
      }
      case "event": {
        const parsed = EventMessageSchema.safeParse(payload);
        if (!parsed.success) {
          console.warn("[protocol] dropped event message: invalid payload", parsed.error.issues);
          return;
        }
        handlers.event(parsed.data);
        return;
      }
      case "lobby": {
        const parsed = LobbyMessageSchema.safeParse(payload);
        if (!parsed.success) {
          console.warn("[protocol] dropped lobby message: invalid payload", parsed.error.issues);
          return;
        }
        handlers.lobby(parsed.data);
        return;
      }
    }
  };
}

export { EventKind, EventMessage };
export type { LobbyKind, LobbyMessage };

# Networking Protocol
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

See 04-networking/02-message-protocol.md for the full message catalog. This doc covers the
transport-level contract.

All messages travel over Socket.IO as JSON in Phase 1. Every message type has a matching Zod schema
in `packages/protocol/schemas/` and a TypeScript type derived via `z.infer<>` — the type is never
hand-written separately from the schema, to prevent drift.

**Four message families:**
1. **Input** (client → server): movement keys, mouse delta, fire state, reload, weapon switch,
   ability use. Sent every client frame, rate-limited server-side to prevent flooding.
2. **State snapshot** (server → client): all player positions, health, ammo, scores, objective
   status. Broadcast once per 50ms tick.
3. **Events** (server → client): kills, deaths, assists, objective captures, medal awards. Sent
   immediately on occurrence, not batched into the next snapshot.
4. **Lobby** (bidirectional): room creation, joining, leaving, match start countdown, map voting.

Every inbound message is parsed with `schema.safeParse()` before use; a failed parse drops the
message and logs a warning — it never throws into the tick loop.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Parsing with .parse() instead of .safeParse() on the hot path** — A malformed client message must not throw and crash a MatchRoom; always safeParse and drop-with-log on failure.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

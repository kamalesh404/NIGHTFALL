# Movement Validation
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

The server never trusts a client-reported position. Each input message is checked against:

1. **Speed cap** — displacement since the last validated tick must not exceed
   `finalSpeed * tickDeltaSeconds` (see 02-movement-values.md) plus a small tolerance for network
   jitter.
2. **Collision boundaries** — resulting position must not penetrate world geometry or leave the
   map's collision boundary (Rapier world, shared client/server config).
3. **State legality** — sprint input while firing, or ADS input while sprinting, is rejected
   server-side even if the client UI should have prevented it.

A failed validation snaps the player's server-authoritative position and sends a correction in the
next snapshot; it does not disconnect the player (see 04-networking/04-server-reconciliation.md).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Trusting client position deltas** — Never integrate a client-reported position directly into authoritative state — always re-derive from validated input against the server's own physics step.
- **Silently dropping violating input instead of correcting** — A validation failure must still produce a corrected state broadcast so the client can reconcile smoothly, not just discard the tick.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

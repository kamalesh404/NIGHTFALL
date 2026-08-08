# Server Reconciliation
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Each state snapshot includes the last input sequence number the server processed for that player.
On receipt, the client: (1) discards acknowledged inputs from its buffer, (2) snaps to the
server-authoritative position for that sequence, (3) replays any remaining unacknowledged buffered
inputs on top of it. Done correctly this produces a smooth correction rather than a visible
teleport, as long as prediction and the server simulation use identical movement logic.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Movement logic drifting between client and server** — Prediction and reconciliation only work if both sides run byte-for-byte the same movement function from packages/shared — any divergence (even a rounding difference) causes constant micro-corrections.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

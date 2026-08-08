# Network Architecture
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


The authoritative Node.js server runs each active match as a `MatchRoom` ticking at 20Hz (50ms)
over Socket.IO. The server is the single source of truth for positions, health, ammo, scores, and
objective status. Clients: predict their own movement locally, interpolate other players between
received snapshots, and reconcile when server state diverges from the local prediction (see
03-client-prediction.md and 04-server-reconciliation.md).

There is intentionally no rollback system, no replay recording, no delta compression, and no
advanced lag compensation beyond interpolation — Phase 1–3 scope stops at "good enough" netcode for
a casual arena shooter, not competitive-FPS-grade netcode.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding rollback or delta compression by default** — These are explicitly out of scope for Phase 1–3. MessagePack (Phase 2) is the only netcode optimization greenlit, and only if profiling justifies it.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

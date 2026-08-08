# Client Prediction
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


On each local input, the client immediately applies its own movement using the same fixed-timestep
simulation logic as the server (shared via `packages/shared`), and renders the result without
waiting for a server round-trip. The client buffers recent applied inputs tagged with a sequence
number so it can replay unacknowledged inputs on top of a corrected server state (see
04-server-reconciliation.md).

Only the local player's own movement is predicted — other players are interpolated, not
predicted, since the client has no early knowledge of their inputs.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Predicting other players' movement** — Only the local player is predicted; remote players must use interpolation (05-entity-interpolation.md) — predicting them guesses at inputs the client can't know and produces visible rubber-banding.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

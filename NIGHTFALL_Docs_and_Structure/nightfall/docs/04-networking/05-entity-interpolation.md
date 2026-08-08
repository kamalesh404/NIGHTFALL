# Entity Interpolation
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Remote players are rendered at a small fixed delay (roughly 1–2 snapshot intervals, ~100ms) behind
the latest received state, interpolating position/rotation between the two most recent snapshots
that bracket the render timestamp. This trades a small amount of added visual latency for smooth
motion instead of choppy teleports between the 20Hz snapshots.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Snapping remote players directly to each new snapshot** — Without an interpolation buffer, remote players visibly teleport at 20Hz — always interpolate between two buffered snapshots, never render the latest snapshot immediately on arrival.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

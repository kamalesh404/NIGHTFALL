# Scaling Strategy
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Phase 1–2: single backend process hosting all active `MatchRoom`s in-memory. Phase 3+ horizontal
scaling (multiple server processes, a shared room registry / routing layer directing players to the
process hosting their room) is a documented future direction, not implemented until player volume
actually requires it — see 15-roadmap/03-phase-3-polish.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Building multi-process room routing prematurely** — Don't add this complexity in Phase 1–2; single-process is the explicit target until load data says otherwise.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

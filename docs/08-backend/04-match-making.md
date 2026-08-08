# Matchmaking
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Basic queue-based matchmaking (Phase 1–2): incoming players are placed into the next public
`MatchRoom` with an open slot, or a new room is created if none has space. Skill-based balancing is
basic-only (e.g., alternating team assignment in TDM/CTF to avoid one-sided stacking) — no MMR/ELO
system, consistent with "no ranked mode" in 07-progression/01-xp-system.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Building an MMR/ELO system** — Explicitly out of scope — matchmaking balances by simple alternation/heuristics only, not a rating algorithm.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

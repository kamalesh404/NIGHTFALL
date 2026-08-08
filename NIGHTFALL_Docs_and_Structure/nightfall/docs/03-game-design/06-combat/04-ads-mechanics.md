# ADS Mechanics
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Aim-down-sights transitions over `weapon.adsSpeedMs` (see 02-weapons/) and while active: applies
`weapon.movementPenalty`-adjusted ADS speed multiplier, tightens the accuracy/spread cone, and (for
Sniper Rifle specifically) applies scope zoom via camera FOV reduction. There is no per-weapon zoom
level table beyond the Sniper Rifle's scope — other weapons get a modest FOV nudge for aim clarity
only.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Allowing ADS while sprinting** — Sprint disables firing per 05-movement/01, and by extension disables entering ADS — this must be enforced both client-side (UX) and server-side (validation).
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

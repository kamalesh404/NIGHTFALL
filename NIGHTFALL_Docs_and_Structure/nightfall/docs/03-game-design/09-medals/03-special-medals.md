# Special Medals
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

**Headshot** fires on any kill where the fatal hit was resolved against the head hitbox (see
06-combat/01-hit-detection.md) — independent of and stackable with a killstreak medal on the same
kill.

**First Blood** fires once per match, on the very first kill event recorded by the match's mode
instance. Tracked as a boolean flag on the `MatchRoom`, checked and set atomically when the first
kill event is processed.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Racing on First Blood eligibility** — Two near-simultaneous kills at match start must resolve deterministically to exactly one First Blood, decided by tick-processing order, not by whichever event message happens to arrive at the client first.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

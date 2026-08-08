# Map Voting
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Post-match 15-second countdown UI showing the three maps (current excluded or included per final
design — Rustpoint/Fallen Sanctuary/Emerald Park) with live vote tallies updating from server
events. Majority wins; a tie is broken by random selection server-side, and the UI reflects the
server's decision rather than computing its own tiebreak.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Computing the tiebreak client-side** — Tie resolution must be server-authoritative (like all scoring) — the client only displays the outcome.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

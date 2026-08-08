# Killstreak Medals
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Double Kill (2 kills / 4s), Triple Kill (3 kills / 4s), Rampage (4 kills / 4s), and Dominating (5+
kills / 4s) all use the same rolling-window kill-timestamp check per player, server-side: on each
kill, look back 4 seconds in that player's kill timestamp log and classify the streak tier. Only
the highest qualifying tier for a given kill fires (a 3rd kill in the window fires Triple Kill, not
Double Kill *and* Triple Kill).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Firing multiple overlapping streak medals for one kill** — Only the single highest-tier medal fires per qualifying kill — implement as a priority check (Dominating > Rampage > Triple > Double), not independent triggers.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

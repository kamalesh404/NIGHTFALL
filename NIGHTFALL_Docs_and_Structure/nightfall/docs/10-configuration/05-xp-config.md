# XP Config
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Defines kill/assist/objective-capture/win XP rewards and the level 1–100 threshold curve. Source of truth for 03-game-design/07-progression/.

Every field here is Zod-validated at server (and, for client-relevant subsets, client) boot — see
01-config-system-overview.md. This doc describes the *shape and purpose* of the config file; the
file itself, not this page, is authoritative for exact current values.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Restating exact numeric values here and letting them drift from the JSON file** — Describe structure/purpose in this doc; point to the config file for current values rather than duplicating a table that will go stale.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

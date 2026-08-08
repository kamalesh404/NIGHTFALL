# Level Rewards
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Cosmetic unlocks occur at specific level milestones defined in `packages/config/cosmetics.json`
(unlock level per item, see 10-configuration/07-cosmetic-config.md and 08-cosmetics/). This doc is
a pointer, not a duplicate data source — level → item mapping is authored once, in config.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Duplicating the unlock table in this doc and in config** — Keep exactly one source of truth (the config file); this doc should describe the *system*, not restate numbers that will drift out of sync.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

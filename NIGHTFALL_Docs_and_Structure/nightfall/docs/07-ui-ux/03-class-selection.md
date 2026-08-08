# Class Selection
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Stat cards per class show HP, speed multiplier, secondary availability, primary weapon, and that
weapon's full stat block (pulled live from `packages/config/weapons.json`, not restated as static
UI copy) — so a balance-config change is instantly reflected in this screen without a UI code
change.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Hardcoding weapon stats into the stat-card UI** — Stat cards must read from the same config source as gameplay, or a balance patch will silently desync the UI from actual behavior.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

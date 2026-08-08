# Milestones
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


| Phase | Deliverable | Acceptance criteria |
|---|---|---|
| 1 | Playable MVP | 4-player FFA match completes start-to-finish on Rustpoint at 60 FPS mid-range hardware, with working respawn, scoring, and bot fill |
| 2 | Feature-complete | All 10 classes/11 weapons/3 maps/4 modes selectable and functional; progression and cosmetics persist correctly for registered accounts |
| 3 | Ship-ready | Performance budgets met at Low on integrated graphics; monitoring/alerting live in production; no open Sev-1 bugs |

## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.
- **Hardcoded balance values** — Damage, speed, HP, timers, and thresholds belong in packages/config JSON/YAML, validated by the matching Zod schema — never inlined as magic numbers in gameplay or UI code.
- **Skipping the schema** — New config fields or network messages must update the corresponding Zod schema in the same change. Code that reads a field the schema doesn't define is a defect, not a shortcut.
- **Untyped network payloads** — All Socket.IO events must use the shared types in packages/protocol. Never emit or handle a raw untyped object literal.

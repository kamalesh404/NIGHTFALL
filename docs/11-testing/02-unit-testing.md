# Unit Testing
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Vitest covers pure functions: damage/falloff calculation, XP threshold lookup, recoil pattern
indexing, movement speed formula (05-movement/02-movement-values.md), config schema validation.
Coverage target: all packages/shared and packages/config-consuming logic should have unit tests
before being relied on by simulation code. Mocking is limited to I/O boundaries (DB, network) — pure
game-logic functions should be testable without mocks.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.
- **Hardcoded balance values** — Damage, speed, HP, timers, and thresholds belong in packages/config JSON/YAML, validated by the matching Zod schema — never inlined as magic numbers in gameplay or UI code.
- **Skipping the schema** — New config fields or network messages must update the corresponding Zod schema in the same change. Code that reads a field the schema doesn't define is a defect, not a shortcut.
- **Untyped network payloads** — All Socket.IO events must use the shared types in packages/protocol. Never emit or handle a raw untyped object literal.

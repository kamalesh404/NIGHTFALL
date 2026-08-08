# Phase 2: Feature Expansion (Months 4-6)
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Expands to all 10 classes, all 11 weapons, all 3 maps, all 4 modes, server browser with ping,
post-match map voting, killstreak medals, assist tracking, full cosmetics system, level progression
1–100, private rooms with codes, bot difficulty settings, and the full settings menu. Rendering
adds bloom, improved shadows, LOD switching. Target: 60 FPS with all features active.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.
- **Hardcoded balance values** — Damage, speed, HP, timers, and thresholds belong in packages/config JSON/YAML, validated by the matching Zod schema — never inlined as magic numbers in gameplay or UI code.
- **Skipping the schema** — New config fields or network messages must update the corresponding Zod schema in the same change. Code that reads a field the schema doesn't define is a defect, not a shortcut.
- **Untyped network payloads** — All Socket.IO events must use the shared types in packages/protocol. Never emit or handle a raw untyped object literal.

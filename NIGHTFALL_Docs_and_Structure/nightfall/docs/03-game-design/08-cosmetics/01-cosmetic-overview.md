# Cosmetic Overview
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Exactly 5 items per category, no exceptions: no back items, no sprays, no reticle customization
beyond color, no animated/particle-heavy cosmetics. All cosmetics are purely visual — zero stat
impact — and unlock at level milestones (see 07-progression/02-level-rewards.md).

| Category | Items |
|---|---|
| Head | Tactical helmet, hood, bandana, beanie, crown |
| Body dye | Olive drab, crimson red, midnight blue, desert tan, jet black |
| Weapon skin (per weapon) | Default, gold, carbon fiber, digital camo, neon glow |
| Melee skin (Katana only) | Default, obsidian, gold, frost, plasma |
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding a 6th item to any category** — The 5-per-category cap is a locked scope decision — do not add items without an explicit roadmap change (15-roadmap/06-post-launch.md).
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

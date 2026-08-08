# Procedural Weapons
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Weapons combine primitive geometries (box, cylinder, capsule) into recognizable per-weapon
silhouettes with material color coding for at-a-glance identification, per 03-game-design/02-weapons/.
Weapon skins (05-cosmetics) swap material color/texture on the same base geometry, not separate
geometry per skin.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Generating a new mesh per skin** — Skins are material/texture swaps applied to one shared weapon geometry, not five duplicated meshes per weapon.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

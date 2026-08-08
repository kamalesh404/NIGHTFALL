# Navigation Grid
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Each map bakes a grid-based navigation mesh (walkable/blocked cells) at build/config time, stored
in `packages/config/maps/<map>.json`. Bots run A* over this grid to path to objectives, enemies, or
random waypoints. Grid resolution is tuned per map to balance path quality against bake time and
memory.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Computing pathfinding over raw map geometry at runtime** — Bots must path over the pre-baked grid, not run expensive geometry queries per bot per tick — this is required to keep 8+ bots inside the server tick budget.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

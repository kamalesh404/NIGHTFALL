# Lighting and Shadows
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Primary light is a single `DirectionalLight` per map (sun/sky direction matching the map's theme),
with shadow map resolution scaling by quality preset: Low disables shadows entirely; Medium 1024;
High 2048; Ultra 4096. Cascade shadow maps with distance-based resolution keep shadow quality high
near the camera without paying full-resolution cost at range.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Using per-object shadow-casting lights** — One directional light drives shadows for the whole map; do not add per-object point lights with shadow casting enabled — this destroys the frame budget.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

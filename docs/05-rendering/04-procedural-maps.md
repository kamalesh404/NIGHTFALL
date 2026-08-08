# Procedural Maps
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Maps use modular building blocks (containers, walls, pillars, foliage, etc.) with instanced
rendering for repeated elements — required to stay inside the draw-call budget
(02-tech-stack/10-performance-budgets.md). Map layout, collision, spawn points, and objective zones
are authored as data in `packages/config/maps/*.json` (10-configuration/04-map-config.md) and
assembled into the scene at load time, not hardcoded per-map in rendering code.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Not instancing repeated map elements** — Any element that repeats more than a handful of times (containers, pillars, foliage) must use THREE.InstancedMesh, not individual meshes, or the draw-call budget will be blown on Rustpoint/Emerald Park.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Rendering Pipeline
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Standard Three.js pipeline: scene graph updated per frame from game state → camera update from
local player look/position → renderer.render(scene, camera). Four quality presets (Low/Medium/
High/Ultra) control shadow map resolution, draw distance, fog, and material quality — see
11-graphics-presets.md. Target: 60 FPS on GTX 1650-class hardware at Medium.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Mutating the scene graph outside the frame update phase** — Adding/removing meshes should happen in a defined update phase, not scattered across event handlers, to avoid mid-frame scene graph churn and GC pressure.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

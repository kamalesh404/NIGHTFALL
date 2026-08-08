# Procedural Textures
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Textures are generated via the HTML Canvas API (noise patterns, color fills, simple detail
drawing) at load time and uploaded as `THREE.CanvasTexture`. No image files are fetched or bundled
for gameplay geometry. Generated textures are cached (generate once per unique texture key, reuse
across instances) rather than regenerated per mesh instance.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Regenerating a canvas texture per instance** — Cache generated textures by a deterministic key (e.g. 'container-rust-01') and reuse the THREE.CanvasTexture object across all instances that need it.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

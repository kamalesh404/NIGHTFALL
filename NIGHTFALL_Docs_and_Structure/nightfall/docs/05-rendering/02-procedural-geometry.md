# Procedural Geometry (Characters)
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Characters are built from BoxGeometry (torso, limbs), SphereGeometry (head), CylinderGeometry
(weapon barrels), and CapsuleGeometry (joint connections), with class-specific additions (hoods,
armor plates, capes, visors) per 03-game-design/01-hero-classes/. No external model files are
loaded — geometry is constructed and merged (BufferGeometryUtils.mergeGeometries where possible) at
startup, not rebuilt every frame.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Rebuilding character geometry every frame** — Construct each class's geometry once at load/cosmetic-change time and reuse the resulting mesh/skeleton; per-frame geometry construction is a severe performance regression.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

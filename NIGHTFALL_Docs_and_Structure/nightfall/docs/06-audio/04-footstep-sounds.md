# Footstep Sounds
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Footstep sound varies by surface type (concrete, metal, grass, wood), determined by a raycast down
from the player's feet against tagged map geometry (each collision surface carries a `surfaceType`
property in map config). Footstep cadence scales with current movement speed.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Hardcoding surface type per map instead of tagging geometry** — Surface type must be a property on map geometry/config so the same footstep logic works across all three maps without per-map special-casing in audio code.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

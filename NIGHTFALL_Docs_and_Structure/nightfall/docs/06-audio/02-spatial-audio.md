# Spatial Audio
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Gunshots, footsteps, and explosions use `PannerNode` with HRTF panning model for 3D positioning and
distance-based attenuation (inverse or exponential rolloff, tuned per sound category). Panner
position updates each frame from the emitting entity's world position relative to the listener
(camera).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Using equalpower panning for weapon/footstep audio** — HRTF panning is required for convincing directional audio (important for gameplay — hearing where a shot/footstep came from); equalpower is a lower-fidelity fallback only, not the default.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

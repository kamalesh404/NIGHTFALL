# Particle Effects
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Muzzle flash, shell ejection, bullet impacts, and explosions use `BufferGeometry` point clouds
(not individual sprite meshes) for performance. Particle systems are pooled and reused rather than
created/destroyed per effect instance, to avoid GC churn during high-kill-rate combat.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Allocating a new particle system per effect trigger** — Use an object pool of reusable particle buffers; allocating fresh BufferGeometry per muzzle flash/impact at high fire rates (e.g. the HMG at 11 rounds/sec across 8 players) will thrash the garbage collector.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

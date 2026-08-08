# Physics Integration
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Rapier.js (WASM build) provides collision detection and resolution on both client (for prediction)
and server (authoritative). Both run the **same** Rapier world configuration loaded from
`packages/shared` to avoid client/server divergence.

**Collision layers:**
| Layer | Collides with |
|---|---|
| Player | World geometry, other players (soft push), projectiles |
| World geometry | Everything |
| Projectile (rocket) | World geometry, players (not the firer for a grace window) |
| Trigger volume (objective zones) | Players only, no physical response |

Player movement uses a kinematic character controller (capsule shape) rather than full rigid-body
dynamics, to keep movement deterministic and directly tunable via the class speed multipliers in
`packages/config/classes.json`.

Server physics steps run inside the 20Hz tick; client physics steps run per render frame for
smooth local prediction, then get reconciled against the next authoritative snapshot (see
04-networking/03-client-prediction.md).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Diverging world configs** — If client and server ever load different collision margins, gravity, or timestep values for Rapier, prediction error will grow unbounded. Both must import the same constants from packages/shared.
- **Using full rigid-body dynamics for players** — Player movement must use a kinematic character controller — ragdoll-style rigid body movement is not part of this design and will not match the speed/HP tuning in class config.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

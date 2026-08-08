# Movement Mechanics
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Standard, accessible FPS movement — no advanced tech (see 01-overview/02-game-design-philosophy.md).

| Input | Effect |
|---|---|
| W / A / S / D | Forward / strafe left / backward / strafe right |
| Space | Jump — fixed height, no air control beyond initial velocity |
| Shift | Sprint — flat 1.5x speed multiplier, disables weapon firing |
| Ctrl | Crouch — 50% height reduction, 50% speed reduction, reduced weapon spread |
| Mouse | Camera look — raw input, no acceleration |

Jumping while sprinting gives a slightly boosted jump height. ADS applies a weapon-specific speed
multiplier on top of the base/crouch/sprint state. Weapon switching is instant (no animation
delay). Melee triggers a quick slash with the equipped weapon or the Katana.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding bunny-hop / slide / momentum stacking** — Explicitly excluded by design — see 01-overview/02-game-design-philosophy.md. Do not add air-strafe acceleration or speed-preserving jump chains.
- **Making jump height/velocity frame-rate dependent** — Movement must be computed on the fixed simulation timestep so behavior is identical at 30 FPS and 240 FPS.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

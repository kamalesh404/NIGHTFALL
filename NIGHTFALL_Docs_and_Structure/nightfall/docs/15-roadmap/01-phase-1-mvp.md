# Phase 1: Playable MVP (Months 1-3)
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Delivers a complete playable multiplayer experience: 4-player FFA on a single map (Rustpoint,
basic procedural geometry), 3 classes (Sentinel, Phantom, Vanguard), 3 weapons (Assault Rifle,
Sniper Rifle, Shotgun), basic hitscan shooting, health/death with instant respawn, basic HUD
(health, ammo, kill feed), scoreboard and victory screen, client-side prediction/interpolation, and
basic bot filling. Rendering: directional lighting, shadow maps, fog, frustum culling, instancing.
Target: 60 FPS on mid-range hardware. This is the scope ceiling for Phase 1 — do not pull Phase 2
items (e.g., additional classes/maps) forward without an explicit scope change.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Pulling Phase 2/3 scope into Phase 1 work** — If a Phase 1 task naturally suggests adding a 4th class or 2nd map 'while you're in there,' don't — flag it as a Phase 2 item instead of expanding current scope.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

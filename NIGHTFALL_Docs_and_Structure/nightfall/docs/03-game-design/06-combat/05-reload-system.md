# Reload System
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Reload consumes `weapon.reloadTimeSec`, refilling the magazine from reserve ammo up to
`weapon.magazineCapacity` (Dual Pistols reload each pistol independently per its own timer, per
their weapon doc). Switching weapons cancels an in-progress reload without penalty — no partial
reload waste mechanic, keeping the system simple per the Accessible pillar.

Reserve ammo pools and starting values are defined per weapon in
`packages/config/weapons.json` — this doc does not hardcode numbers that belong there.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Blocking weapon switch during reload** — Reload-cancel-by-switch is an explicit design decision — do not lock input during reload.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

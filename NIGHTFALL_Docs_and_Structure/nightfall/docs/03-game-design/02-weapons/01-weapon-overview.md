# Weapon Overview
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Every weapon is fully data-driven from `packages/config/weapons.json`, enabling balance tuning
without a code change or recompile.

| Weapon | Class | Slot |
|---|---|---|
| Assault Rifle | Sentinel | primary |
| Sniper Rifle | Phantom | primary |
| Shotgun | Vanguard | primary |
| Heavy Machine Gun | Titan | primary |
| Tactical Rifle | Nomad | primary |
| Silenced SMG | Specter | primary |
| Burst Rifle | Falcon | primary |
| Rocket Launcher | Wrecker | primary |
| Dual Pistols | Rogue | primary |
| Katana | Reaper | primary |
| P-18 Pistol | Shared secondary | secondary |

**Shared stat fields** (see 10-configuration/03-weapon-config.md for the full schema): damage, fire
rate (rounds/sec), reload time (sec), magazine capacity, accuracy (spread cone in degrees, lower =
tighter), effective range (meters before falloff), headshot multiplier, recoil pattern (array of
per-shot vertical/horizontal kick), movement penalty (speed multiplier while equipped), and ADS
speed (ms to enter/exit aim-down-sights).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Computing damage without config lookup** — Every damage calculation must resolve through the weapon config + Zod schema, including falloff and headshot multiplier — never a literal number in the hit-resolution code path.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Hero Class Overview
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

NIGHTFALL ships exactly 10 classes. Every class is procedural (no external models) and has a fixed
primary weapon — players do not freely mix weapons and classes, which keeps balance surface area
small (see 01-overview/04-competitive-analysis.md).

| Class | Role | HP | Speed | Secondary | Primary |
|---|---|---|---|---|---|
| Sentinel | Frontline | 110 | 0.98x | P-18 Pistol | Assault Rifle |
| Phantom | Sniper | 80 | 1.08x | P-18 Pistol | Sniper Rifle |
| Vanguard | Breacher | 125 | 0.95x | P-18 Pistol | Shotgun |
| Titan | Heavy | 160 | 0.82x | P-18 Pistol | Heavy Machine Gun |
| Nomad | Flex | 100 | 1.02x | P-18 Pistol | Tactical Rifle |
| Specter | Assassin | 90 | 1.1x | None | Silenced SMG |
| Falcon | Precision | 90 | 1.08x | P-18 Pistol | Burst Rifle |
| Wrecker | Demolition | 130 | 0.92x | P-18 Pistol | Rocket Launcher |
| Rogue | Duelist | 95 | 1.08x | None | Dual Pistols |
| Reaper | Melee | 90 | 1.15x | None | Katana |

Full stats, config keys, and Zod-validated source of truth live in
`packages/config/classes.json` (see 10-configuration/02-class-config.md) — the table above is
descriptive documentation, not the authoritative data source.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Letting players change a class's weapon** — Weapon assignment is fixed per class by design. A loadout-customization feature is out of scope unless a new design doc says otherwise.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

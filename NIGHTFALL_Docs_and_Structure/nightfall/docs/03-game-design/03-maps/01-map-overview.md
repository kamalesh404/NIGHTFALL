# Map Overview
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

NIGHTFALL ships exactly three maps, each built from modular procedural building blocks with baked
collision, spawn points, and objective zones.

| Map | Theme |
|---|---|
| Rustpoint | Desert industrial |
| Fallen Sanctuary | Ancient temple ruins |
| Emerald Park | Zoo / wildlife park |

Every map defines, per game mode: spawn points, Hardpoint zone locations, CTF flag positions, and
collision boundaries preventing out-of-bounds play. See 10-configuration/04-map-config.md for the
JSON schema these are authored in.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding a fourth map** — Scope is locked at three maps for Phase 1–3. A new map is a roadmap/post-launch discussion (15-roadmap/06-post-launch.md), not a default addition.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

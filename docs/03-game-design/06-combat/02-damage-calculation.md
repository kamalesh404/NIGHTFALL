# Damage Calculation
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

```
finalDamage = baseDamage
            * (isHeadshot ? weapon.headshotMultiplier : 1.0)
            * rangeFalloffFactor(distance, weapon.range)
```

`rangeFalloffFactor` returns 1.0 within `weapon.range`, then linearly decreases beyond it (steepest
for the Shotgun, per its 15m effective range) down to a configured minimum floor — exact curve
lives in `packages/config/weapons.json` per weapon, not hardcoded per-weapon in combat code.

There is no armor system and no damage resistance stat outside of class HP itself — HP is the only
damage-absorption mechanic in NIGHTFALL.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding an armor/shield layer** — Not part of the design — HP is the only defensive stat. Don't introduce a second damage-absorption resource without a design doc update.
- **Hardcoding falloff per weapon in code** — Falloff curve parameters belong in weapon config, read generically by one damage-calculation function shared across all hitscan weapons.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

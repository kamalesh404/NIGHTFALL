# XP System
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Levels run 1–100 with no ranks, no currency, no marketplace, no trading, no battle pass, no
challenge modes. XP sources and values are defined in `packages/config/xp.json`
(see 10-configuration/05-xp-config.md): kill reward, assist reward, objective capture reward, and
win reward. Level thresholds follow a smooth curve defined in the same config file — this doc
intentionally does not hardcode the curve, since it's tuning data, not design-locked content.

Leveling unlocks nothing functional — it is purely a display of playtime/skill. There is no ranked
competitive mode.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Making a level unlock a stat/power advantage** — All unlocks are cosmetic only (see 08-cosmetics/). A level-gated weapon or stat boost would break competitive fairness between new and veteran players and is explicitly out of scope.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Movement Values
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Base movement speed and jump parameters are global constants in `packages/config/movement.json`;
per-class speed is that base multiplied by the class's speed multiplier (see
01-hero-classes/01-class-overview.md). Sprint (1.5x), crouch (0.5x), and per-weapon movement
penalty (see 02-weapons/) all multiply together — order of operations:

```
finalSpeed = baseSpeed
           * classSpeedMultiplier
           * (sprinting ? 1.5 : 1.0)
           * (crouching ? 0.5 : 1.0)
           * weaponMovementPenalty
           * (adsActive ? weaponAdsSpeedMultiplier : 1.0)
```
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Applying modifiers additively instead of multiplicatively** — Sprint + crouch + ADS + weapon penalty must multiply, per the formula above — additive stacking produces different (and unbalanced) results than the config was tuned for.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

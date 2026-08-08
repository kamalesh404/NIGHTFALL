# Silenced SMG
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

**Used by:** Specter  **Slot:** primary

## Summary

Fast fire rate, low per-shot damage, tight hipfire accuracy, suppressed audio signature.

## Stats

| Stat | Value |
|---|---|
| Damage | 16 |
| Fire Rate | 13.0 |
| Reload | 1.8 |
| Magazine | 35 |
| Accuracy | 1.6 |
| Range | 25 |
| Headshot Mult | 2.0 |
| Movement Penalty | 1.0 |
| Ads Ms | 120 |

Values above are documentation snapshots of `packages/config/weapons.json["silenced-smg"]` — treat
the JSON file as authoritative if they ever disagree, and update this table to match.

## Implementation Notes

Hit resolution: server-authoritative hitscan raycast (see 06-combat/01-hit-detection.md).
Recoil pattern is an ordered array consumed per shot and reset on a cooldown timer after fire stops
— see 06-combat/03-recoil-system.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Client-side damage application** — The Silenced SMG's damage must be computed and applied server-side from a validated hit; the client only plays feedback (hitmarker, sound) in response to a server event.
- **Ignoring movement penalty** — Movement penalty while this weapon is equipped/ADS must feed into the same speed calculation as class speed multiplier and crouch/sprint modifiers — it is multiplicative, not a separate override.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

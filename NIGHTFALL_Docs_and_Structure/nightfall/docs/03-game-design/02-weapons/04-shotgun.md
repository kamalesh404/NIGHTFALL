# Shotgun
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

**Used by:** Vanguard  **Slot:** primary

## Summary

Multiple pellets per shot, high close-range damage that drops sharply beyond 15 meters.

## Stats

| Stat | Value |
|---|---|
| Damage | 8x8 pellets |
| Fire Rate | 1.2 |
| Reload | 3.5 |
| Magazine | 8 |
| Accuracy | 6.0 |
| Range | 15 |
| Headshot Mult | 1.5 |
| Movement Penalty | 0.94 |
| Ads Ms | 140 |

Values above are documentation snapshots of `packages/config/weapons.json["shotgun"]` — treat
the JSON file as authoritative if they ever disagree, and update this table to match.

## Implementation Notes

Hit resolution: server-authoritative hitscan raycast (see 06-combat/01-hit-detection.md).
Recoil pattern is an ordered array consumed per shot and reset on a cooldown timer after fire stops
— see 06-combat/03-recoil-system.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Client-side damage application** — The Shotgun's damage must be computed and applied server-side from a validated hit; the client only plays feedback (hitmarker, sound) in response to a server event.
- **Ignoring movement penalty** — Movement penalty while this weapon is equipped/ADS must feed into the same speed calculation as class speed multiplier and crouch/sprint modifiers — it is multiplicative, not a separate override.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

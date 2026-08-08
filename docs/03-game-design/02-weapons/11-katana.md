# Katana
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

**Used by:** Reaper  **Slot:** primary

## Summary

Instant melee kills with lunge distance, no ammunition requirement, highest movement speed bonus.

## Stats

| Stat | Value |
|---|---|
| Damage | instant kill |
| Fire Rate | N/A |
| Reload | N/A |
| Magazine | N/A |
| Accuracy | N/A |
| Range | 2.5 |
| Headshot Mult | N/A |
| Movement Penalty | 1.1 |
| Ads Ms | 0 |

Values above are documentation snapshots of `packages/config/weapons.json["katana"]` — treat
the JSON file as authoritative if they ever disagree, and update this table to match.

## Implementation Notes

Hit resolution: melee lunge + instant-kill hit test.
Recoil pattern is an ordered array consumed per shot and reset on a cooldown timer after fire stops
— see 06-combat/03-recoil-system.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Client-side damage application** — The Katana's damage must be computed and applied server-side from a validated hit; the client only plays feedback (hitmarker, sound) in response to a server event.
- **Ignoring movement penalty** — Movement penalty while this weapon is equipped/ADS must feed into the same speed calculation as class speed multiplier and crouch/sprint modifiers — it is multiplicative, not a separate override.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

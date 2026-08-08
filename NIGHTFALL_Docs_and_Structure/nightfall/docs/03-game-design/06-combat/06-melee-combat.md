# Melee Combat
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

The Katana (Reaper's primary) is the only true melee weapon: instant kill on a successful hit
within lunge range, no ammunition. Every other class can also throw a quick contextual melee slash
with their equipped weapon as a panic-button option, but this does **not** instant-kill — it deals
a fixed moderate damage value from `packages/config/combat.json` and has a cooldown.

Hit resolution for melee is a short capsule sweep in front of the attacking player at the moment of
input, validated server-side identically to hitscan/projectile combat.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Giving every class an instant-kill melee** — Only the Katana instant-kills. Other classes' contextual melee slash is damage-based, not a kill guarantee — conflating the two breaks Reaper's identity as the dedicated melee class.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

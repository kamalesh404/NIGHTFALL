# Latency Handling
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Ping is measured via a periodic lightweight ping/pong message and displayed in the HUD (see
07-ui-ux/06-in-game-hud.md). Basic jitter compensation is handled entirely by the interpolation
buffer (05-entity-interpolation.md) — there is no separate jitter buffer algorithm. Hit detection
optionally applies simple lag compensation (rewinding hitboxes to the shooter's observed time, see
06-combat/01-hit-detection.md) but this is bounded to a small maximum rewind window to prevent
abuse.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Unbounded hitbox rewind for lag compensation** — Cap the rewind window (e.g. ~200ms) so a high-ping client can't get an unreasonable hit-registration advantage over a low-ping one.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

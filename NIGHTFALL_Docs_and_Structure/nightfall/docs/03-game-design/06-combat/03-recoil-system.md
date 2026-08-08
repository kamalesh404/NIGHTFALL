# Recoil System
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Each weapon defines a fixed-order array of per-shot vertical/horizontal kick values in its config
(`recoilPattern: [{v, h}, ...]`). On each shot, the client applies `recoilPattern[shotIndexInBurst]`
to camera pitch/yaw (with the server independently validating the resulting aim direction is
physically plausible for anti-cheat purposes — see 13-security/05-cheat-prevention.md). The pattern
index resets to 0 after a per-weapon recovery delay of no continuous fire.

Crouching reduces effective weapon spread (accuracy stat) but does not change the recoil pattern
itself.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Randomizing recoil per shot** — Recoil is a fixed, learnable pattern per weapon — not randomized — by design, matching the Accessible pillar (predictable, masterable spray control).
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

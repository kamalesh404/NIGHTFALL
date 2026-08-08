# Competitive Analysis
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

NIGHTFALL's closest genre peers are browser/lightweight arena shooters such as Krunker, Venge.io,
and Deadshot.io. This doc captures what each contributes to NIGHTFALL's design, at a level useful
for implementation decisions — it is not a market-research document.

**From Krunker:** fast time-to-kill, blocky low-poly aesthetic achievable without a modeling
pipeline, and instant-match browser flow. NIGHTFALL adopts the low-poly procedural aesthetic
directly (see 05-rendering/02-procedural-geometry.md) as a technical strategy, not just a style
choice.

**From Venge.io:** class-based loadouts with fixed (not freely customizable) weapon assignments,
which keeps balance surface area small — directly informs NIGHTFALL's one-primary-per-class
design (03-game-design/01-hero-classes/).

**From Deadshot.io:** minimal, low-latency-feeling UI and aggressive respawn pacing, which informs
NIGHTFALL's instant-respawn and 4-minute match length decisions.

**Where NIGHTFALL diverges:** no in-game currency or cosmetic purchases (pure level-gated unlocks),
and a stricter three-map, four-mode, ten-class scope ceiling to keep Phase 1–3 achievable for a
small team.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Treating this as license to copy competitor systems wholesale** — Use this doc only to understand *why* a NIGHTFALL system is shaped the way it is — implement against the actual NIGHTFALL spec docs, not against memory of a competitor's game.

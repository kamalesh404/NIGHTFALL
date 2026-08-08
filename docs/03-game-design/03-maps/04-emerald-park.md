# Emerald Park — Zoo / wildlife park
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

## Layout

Animal enclosure structures providing cover, observation towers offering elevated sightlines, gift shops and food stands creating tight indoor spaces, varied foliage and decorative elements, and open pathways connecting distinct zones.

## Zones & Objectives

Defined in `packages/config/maps/emerald-park.json`: FFA/TDM spawn point sets, CTF flag base
positions (one per team), 3–5 Hardpoint zone locations rotated every 60 seconds, and the
navigation grid used by AI bots (see 09-ai-bots/02-navigation-grid.md).

## Implementation Notes

Geometry is assembled from the modular block system (see 05-rendering/04-procedural-maps.md) —
instanced rendering is required for repeated elements (containers, pillars, foliage) to stay inside
the draw-call budget in 02-tech-stack/10-performance-budgets.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Placing spawn points without cover from active lines of sight** — Emerald Park's spawn points must be validated against the nav grid and existing sightlines before shipping — spawn-killing lines of sight are a design defect, not an acceptable tradeoff.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Wrecker — Demolition
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

**Role:** Demolition
**HP:** 130
**Speed multiplier:** 0.92x base movement speed
**Secondary weapon:** P-18 Pistol
**Primary weapon:** Rocket Launcher (see 02-weapons/rocket-launcher.md)

## Summary

A specialist in heavy explosives and area control. Strong versus grouped enemies and static objective holders; risky in tight self-damage range.

## Visual Design

Built entirely from primitive Three.js geometry per 05-rendering/02-procedural-geometry.md: a
BoxGeometry torso and limbs, SphereGeometry head, and class-distinctive attachments (hood, armor
plate, cape, visor, or holding pose) that make the Wrecker silhouette-readable at a glance in
an 8-player match. Exact primitive composition and material color coding are implemented in
`apps/client/src/procedural/characters/wrecker.ts`.

## Config Source

Authoritative values live in `packages/config/classes.json` under the key `"wrecker"`, validated
by the Zod schema in `packages/protocol/schemas/class.schema.ts`. This doc is documentation, not
the source of truth — a balance change updates the config file, not this page's numbers (then this
page is updated to match).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Hardcoding this class's stats in gameplay code** — HP, speed, and weapon assignment for Wrecker must be read from packages/config/classes.json at runtime, never inlined as literals in simulation or rendering code.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

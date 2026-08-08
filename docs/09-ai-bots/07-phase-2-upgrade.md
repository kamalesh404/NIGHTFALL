# Phase 2 Upgrade — Recast Navigation
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


If Phase 1 grid-based A* proves insufficient (unnatural movement around obstacles, poor
verticality handling — see 03-roadmap/03-phase-3-polish.md decision criteria), the upgrade path is
Recast Navigation for mesh-based pathfinding. This is conditional, not committed — do not begin a
Recast integration without first confirming grid-based A* actually fails a specific documented
case.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Starting a Recast migration preemptively** — This is a conditional Phase 2 item gated on observed A* shortcomings, not a default upgrade to implement alongside Phase 1 work.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Glossary
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

| Term | Definition |
|---|---|
| Tick | One authoritative server simulation step, running at 20Hz (50ms) |
| Hitscan | Instant-resolution weapon fire (ray test), as opposed to a simulated projectile |
| ADS | Aim Down Sights |
| TTK | Time To Kill |
| FFA / TDM / CTF / HP | Free For All / Team Deathmatch / Capture The Flag / Hardpoint |
| Hardpoint zone | A rotating capture area scored while a team occupies it uncontested |
| Killstreak medal | A UI/audio reward for consecutive kills within a time window (see 09-medals) |
| Class | A hero archetype with fixed HP, speed, and weapon loadout |
| Reconciliation | Server correcting a client's predicted state when they diverge |
| Interpolation | Smoothing remote players' rendered positions between snapshots |
| Bot | AI-controlled player filling unfilled lobby slots |
| Nav grid | Baked per-map grid used for A* bot pathfinding |
| Monorepo | Single repository containing apps/client, apps/server, and shared packages |
| Room code | Short alphanumeric code identifying a private match lobby |
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Redefining terms locally** — Use these terms consistently across code (variable/type names), comments, and docs. Do not invent synonyms (e.g. 'frame' for 'tick') that fragment the shared vocabulary between client and server code.

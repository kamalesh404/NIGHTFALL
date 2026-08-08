# Executive Summary
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

NIGHTFALL is a browser-based multiplayer first-person shooter featuring 10 hero classes, three
procedurally-built arena maps, four competitive game modes, and a full progression/cosmetics
system. It runs entirely on procedural Three.js geometry — no external 3D model downloads — on top
of an authoritative Node.js server.

**Target audience:** casual FPS players who want Krunker/Venge-style pick-up-and-play arena combat
directly in a browser tab, with friend groups as the primary retention loop (private rooms, room
codes, no install).

**What "done" looks like (Success Criteria):**
- Click to play within 5 seconds
- Sustained 60 FPS during 8-player matches
- Sub-100ms effective latency on same-continent servers
- Matchmaking and server browser both functional
- All 4 modes playable across all 3 maps
- Cosmetic unlocks through level progression (no economy, no purchases)
- Friend invites via room codes

**What NIGHTFALL explicitly is NOT:** it has no battle pass, no marketplace, no ranked mode, no
in-game currency, no external 3D/audio asset pipeline, and no advanced netcode (rollback, delta
compression, lag compensation beyond interpolation). Scope discipline is a design pillar, not an
afterthought — see 02-game-design-philosophy.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Reading this doc as a full spec** — It is a summary. Before implementing any system, read the corresponding detailed doc in 03-game-design/ through 13-security/ — do not infer behavior from this page alone.
- **Adding scope not listed here** — Ranked modes, currencies, marketplaces, and rollback netcode are explicitly out of scope. An agent proposing these should be treated as having misread the brief.

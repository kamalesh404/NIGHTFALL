# Backend Architecture
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

The server is a Node.js + Express + Socket.IO app under `apps/server`, authoritative for all game
state.

```
apps/server/src/
├── index.ts                # Express + Socket.IO bootstrap
├── rooms/                  # Match/lobby lifecycle, one instance per active match
│   ├── MatchRoom.ts         # Tick loop, state broadcast, mode rules dispatch
│   └── LobbyManager.ts      # Matchmaking queue, private room codes, server browser listing
├── simulation/              # Authoritative movement, hit detection, damage resolution
├── modes/                   # FFA/TDM/CTF/Hardpoint rule implementations (shared interface)
├── bots/                    # Bot controller, pathfinding, combat behavior (see 09-ai-bots)
├── api/                     # REST routes (auth, profile, leaderboard, match history)
├── db/                      # Prisma client, repository-style query modules
├── middleware/               # Auth guard, rate limiting, error handling
└── config/                  # Loads/validates packages/config at boot
```

**Tick loop contract:** each `MatchRoom` runs its own 20Hz (50ms) tick: (1) apply queued validated
inputs, (2) step physics/simulation, (3) resolve mode-specific scoring, (4) broadcast a state
snapshot. A mode implements a small interface (`onTick`, `onPlayerJoin`, `onScoreEvent`,
`checkWinCondition`) so FFA/TDM/CTF/Hardpoint stay isolated from each other and from the core loop.

**One process per match (Phase 1–2):** rooms run in-process; horizontal scaling (multiple server
processes with a shared match registry) is a Phase 3 concern — see 12-deployment/09-scaling-strategy.md.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Trusting client-reported state** — Position, health, ammo, and score must always be server-computed from validated inputs — never accepted verbatim from a client message.
- **Blocking the tick loop** — No synchronous DB calls, heavy JSON parsing, or unbounded loops inside the per-tick hot path; anything not needed every 50ms (stats writes, leaderboard updates) goes through an async queue outside the tick.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

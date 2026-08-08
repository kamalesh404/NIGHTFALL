# Bot Filling
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


When a `MatchRoom` starts warmup with fewer than its target player count, the `LobbyManager` spawns
bot-controlled players (see 09-ai-bots/) up to the target, tagged visibly as bots in the scoreboard
and kill feed. If a real player joins mid-match and slots are full of bots, a bot is removed to make
room (lowest-score bot removed first) rather than rejecting the human join.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Rejecting a human joiner because bots are occupying slots** — Bots must be evictable to make room for a real player joining an in-progress match — never let bot occupancy block human matchmaking.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

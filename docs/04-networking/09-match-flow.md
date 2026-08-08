# Match Flow
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


`Lobby (matchmaking or server browser or room code) → Warmup (short countdown once minimum players
present) → Match (4 minutes, mode rules active) → Post-match summary/scoreboard → 15s map vote →
next Lobby (same room, new map/mode)`. If insufficient real players join before match start,
remaining slots are filled with AI bots (see 10-bot-filling.md) so a match always starts on time.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Blocking match start indefinitely waiting for a full lobby** — A match must start once the warmup countdown elapses, filling remaining slots with bots — never wait indefinitely for human players.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

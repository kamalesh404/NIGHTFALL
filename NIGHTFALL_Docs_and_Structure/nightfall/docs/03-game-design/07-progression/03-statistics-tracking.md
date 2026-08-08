# Statistics Tracking
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Lifetime stats (kills, deaths, assists, headshots, matches played, matches won, playtime) are
tracked per registered account in `PlayerStats` (see 02-tech-stack/04-database-schema.md). Guest
players' stats are tracked client-side only (localStorage) and are lost if the browser storage is
cleared — this is an accepted tradeoff of guest mode, not a bug.

Match history is paginated per `MatchParticipant` rows; leaderboards sort by level or kills via a
dedicated indexed query (see 08-backend/06-database-operations.md) rather than scanning the full
`PlayerStats` table.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Persisting guest stats server-side** — Guest mode is explicitly local-only per 01-overview/03-target-audience.md — do not silently create server-side Player rows for unauthenticated sessions.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

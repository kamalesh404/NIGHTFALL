# Database Operations
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


All access goes through Prisma repository-style modules in `apps/server/src/db/` — no raw SQL
scattered through route handlers. Writes that aren't tick-critical (stats updates, match history
inserts, XP application) are queued and processed asynchronously outside the 20Hz tick loop (see
02-tech-stack/03-backend-architecture.md) to avoid blocking gameplay on database latency.
Leaderboard queries use a dedicated index on `(level, xp)` / `(kills)` rather than full scans.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Awaiting a DB write inside the tick loop** — Any Prisma call triggered by tick processing must be fire-and-forget/queued, never awaited synchronously inside the per-50ms tick path.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

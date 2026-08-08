# Caching Strategy
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Redis is optional and used for two things if introduced: session/rate-limit counters, and
leaderboard read caching (short TTL, invalidated on relevant write) to reduce Postgres load under
higher traffic. Redis is never the source of truth for anything — Postgres always is.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Making Redis authoritative for any data** — Redis is a cache, not a database — any data that must survive a Redis flush belongs in Postgres.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# API Reference
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


REST endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`,
`GET /api/players/:id/profile` (stats + level), `GET /api/leaderboard?sortBy=level|kills`,
`GET /api/players/:id/matches?page=` (paginated match history), `GET /api/players/:id/cosmetics`
(unlocked inventory). All request/response bodies are Zod-validated against schemas shared with
`packages/protocol` where the shape overlaps game data (e.g., cosmetic IDs).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Returning unvalidated response payloads** — Response shapes should be validated in development/test via the same Zod schemas used for requests, to catch drift between API code and documented contract.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

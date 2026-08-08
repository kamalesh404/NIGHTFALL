# Server Structure
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Express handles REST (`/api/*`) routes; Socket.IO handles real-time game traffic in per-match
rooms. Middleware order: request logging (Pino) → CORS → rate limiting → auth guard (where
required) → route handler → centralized error handler. See 02-tech-stack/03-backend-architecture.md
for the full directory layout.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Mixing REST and realtime state** — Match state lives only in the in-memory MatchRoom / Socket.IO layer; REST endpoints (profile, leaderboard, history) read from Postgres, not from live match memory.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

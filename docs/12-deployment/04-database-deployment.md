# Database Deployment
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Neon PostgreSQL for production, with connection pooling (Neon's built-in pooler or Prisma's) sized
to the backend host's concurrency. Migrations run via `prisma migrate deploy` as an explicit CI/CD
step before the new server version starts serving traffic, never on-the-fly at boot in production.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Running prisma migrate dev against production** — Production uses migrate deploy against committed migration files only — never the interactive dev migration command.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

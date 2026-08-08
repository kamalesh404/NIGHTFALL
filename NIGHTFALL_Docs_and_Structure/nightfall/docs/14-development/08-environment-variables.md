# Environment Variables
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string |
| `JWT_SECRET` | Yes | JWT signing secret |
| `REDIS_URL` | No | Redis connection string, if caching enabled |
| `SENTRY_DSN` | No | Error reporting, recommended in staging/production |
| `NODE_ENV` | Yes | `development` \| `staging` \| `production` |
| `CORS_ORIGIN` | Yes (prod) | Allowed frontend origin(s), comma-separated |

`.env.example` in the repo root documents these with placeholder values — `.env` itself is
git-ignored and never committed.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Committing a real .env file** — Only .env.example (placeholders) is committed; actual secrets stay out of version control entirely.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

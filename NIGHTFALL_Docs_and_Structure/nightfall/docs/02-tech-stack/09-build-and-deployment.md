# Build and Deployment
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

See 12-deployment/ for the full operational runbook. Summary of the build chain:

`pnpm install` → Vite dev server (client, HMR) in parallel with `tsx watch` (server) →
`pnpm build` produces `apps/client/dist` (static assets for Vercel/Cloudflare Pages) and
`apps/server/dist` (Node bundle for Render/Railway/Koyeb/Fly.io) → GitHub Actions runs lint,
typecheck, unit tests, and both builds on every PR → merge to `main` auto-deploys to staging →
manual promotion to production.

Docker Compose (`docker/docker-compose.yml`) runs Postgres + Redis + client + server locally so a
new contributor can be running in one command (see 14-development/01-setup-guide.md).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Deploying without the CI gate** — Nothing reaches `main` without passing lint, typecheck, unit tests, and both builds in GitHub Actions — do not add a bypass path.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

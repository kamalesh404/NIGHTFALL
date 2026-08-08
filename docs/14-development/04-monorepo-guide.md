# Monorepo Guide
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


pnpm workspaces link `apps/client`, `apps/server`, and `packages/{shared,config,protocol}` locally
— no publishing to a registry needed for internal packages. Import boundary rule: `apps/client` and
`apps/server` may depend on any `packages/*`, but `packages/*` must never depend on `apps/*` (no
circular imports back into an app from a shared package).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Importing an app-level module from a shared package** — packages/shared, packages/config, and packages/protocol must stay app-agnostic — if a shared package needs something app-specific, that's a sign the code belongs in the app, not the shared package.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

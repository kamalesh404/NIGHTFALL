# CI/CD Testing
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


GitHub Actions runs, on every PR: lint (ESLint), typecheck (tsc --noEmit), unit tests, integration
tests, and both client/server builds. All must pass before merge — no bypass path. Successful main-
branch builds trigger automatic staging deployment; production requires manual promotion after
staging verification (see 09-build-and-deployment.md).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Merging with a red CI check** — No PR merges to main with a failing lint/typecheck/test/build step — this is a hard gate, not a suggestion.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Coding Standards
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


TypeScript strict mode everywhere (`strict: true` in every package's tsconfig — no exceptions).
File naming: PascalCase for classes/components, camelCase for functions/variables, kebab-case for
non-TS asset/config files. One exported concern per file where reasonable. No `any` without an
inline comment justifying it — prefer `unknown` + narrowing or a proper Zod-inferred type.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Reaching for `any` to silence a type error** — Use unknown + type narrowing, or fix the underlying schema/type — `any` defeats the entire point of the shared-type architecture this project depends on for client/server/config consistency.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

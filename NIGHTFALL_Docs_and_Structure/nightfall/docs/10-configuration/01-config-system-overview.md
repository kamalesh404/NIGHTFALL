# Config System Overview
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


All game balance values live in `packages/config/*.json` (and `.yaml` where more readable for
nested structures). Every config file has a matching Zod schema in `packages/protocol/schemas/`
and is validated at load time — a config that fails validation prevents server boot (fail loudly,
not silently). Development mode supports hot-reload on config file change; production caches the
validated, parsed config in memory (no per-request re-parse).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Loading config without schema validation** — Every config file load must go through its Zod schema's parse — an unvalidated JSON.parse() of a balance file is a bug waiting to ship a malformed value into production.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

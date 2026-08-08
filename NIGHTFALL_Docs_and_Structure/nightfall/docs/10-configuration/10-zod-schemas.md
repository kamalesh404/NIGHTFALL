# Zod Schemas
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Every config file and every network message type has exactly one Zod schema in
`packages/protocol/schemas/`, and every TypeScript type used for that data is derived via
`z.infer<typeof schema>` — types are never hand-declared separately from their schema. This is the
single mechanism preventing client/server/config drift across the whole project.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Hand-writing a TS interface alongside a Zod schema** — Always derive the type from the schema with z.infer — a hand-written parallel interface will silently drift from the actual runtime validation.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

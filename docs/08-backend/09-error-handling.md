# Error Handling
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


REST routes use a centralized Express error-handling middleware that maps known error types to
appropriate HTTP status codes and a safe (non-leaky) error message, while logging full details via
Pino/Sentry. Socket.IO handlers wrap risky logic (input parsing, mode rule execution) in try/catch
so one bad message can't crash a `MatchRoom` and disconnect every player in it.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Letting an unhandled exception crash a MatchRoom** — A single malformed input or edge-case bug must not take down the whole room's tick loop — isolate per-tick work in try/catch with logging, and continue ticking.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

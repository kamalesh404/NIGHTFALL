# Bot Architecture
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Each bot runs a simple per-tick state machine: `Idle → Navigate → Engage → (Reload/Retreat) →
Navigate`. The bot controller consumes the same input-message interface a human player's client
would send — bots produce validated "input" messages internally rather than bypassing input
validation, so bot movement/combat is checked by the exact same server logic as a human player's.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Giving bots a privileged code path that skips validation** — Bots must be constrained by the same speed caps, fire-rate checks, and collision rules as human players — a separate unvalidated bot movement path is both a maintenance hazard and a fairness bug.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

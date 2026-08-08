# Authentication
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


JWT issued on successful login (bcrypt-verified password), stored in an HTTP-only, Secure,
SameSite cookie — never in localStorage or a JS-readable location. Guest mode issues a lightweight
session identifier (not a full JWT/account) allowing matchmaking without registration; guest
progress is not persisted server-side (see 07-progression/03-statistics-tracking.md). Token refresh
happens automatically shortly before expiry via a silent refresh endpoint.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Storing the JWT in localStorage** — JWTs must live in an HTTP-only cookie to avoid XSS token theft — a localStorage token is a direct security regression.
- **Blocking guest play behind a token** — Guest mode must not require any JWT issuance step that adds friction to instant play.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Player Accounts
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Registration: username, email, password (bcrypt-hashed, never stored/logged in plaintext). Login
returns the auth cookie described above. Password reset flow (if implemented) uses a
short-lived, single-use token emailed to the account, never a password reminder or plaintext
recovery.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Logging raw passwords or password hashes** — Never log request bodies containing password fields — configure the logger (Pino) to redact them explicitly.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Input Validation
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Every REST body and every Socket.IO message is parsed through its Zod schema before use — this is
the same rule as 10-configuration/10-zod-schemas.md applied to untrusted network input rather than
trusted config files. Failed validation on a socket message drops it with a log entry; on a REST
request it returns 400 with a generic validation error (no internal detail leakage).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Trusting a message shape because the client 'should' send it correctly** — Every inbound payload is untrusted regardless of what the official client would send — validate unconditionally.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

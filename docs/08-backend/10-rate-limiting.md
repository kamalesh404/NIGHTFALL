# Rate Limiting
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


REST auth endpoints (login, register) are rate-limited per IP to slow credential stuffing/brute
force. Socket.IO input messages are rate-limited per connection to a sane cap above legitimate
client frame rate, to prevent a modified client from flooding the server with excess input
messages.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Rate-limiting only REST, not socket input** — Unbounded Socket.IO input message rate is an abuse vector too — cap it server-side independent of any REST rate limiter.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

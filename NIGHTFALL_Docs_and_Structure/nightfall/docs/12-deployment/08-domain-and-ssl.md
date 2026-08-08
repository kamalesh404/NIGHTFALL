# Domain and SSL
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Custom domain pointed at the frontend host (Vercel/Cloudflare Pages), which provides automatic
HTTPS. Backend host's default HTTPS endpoint is used for the Socket.IO/API origin unless a custom
API subdomain is configured; CORS is locked to the known frontend origin(s), not a wildcard.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Using a wildcard CORS origin in production** — CORS must be restricted to the known frontend domain(s) in production — a wildcard is a security regression.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Contact and Support
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Team contact and support channel details to be filled in by the project owner (e.g., a GitHub
Issues link for bug reports, a Discord for community support). This doc is intentionally a
placeholder — do not invent contact details.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Inventing placeholder contact info** — Leave this as an explicit placeholder rather than fabricating an email address, Discord link, or support URL that doesn't exist.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

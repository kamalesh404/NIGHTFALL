# Private Rooms
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Private rooms use a short generated room code (uppercase alphanumeric, ambiguous characters like
`0/O` and `1/I` excluded for readability) for friends to join directly, bypassing the server
browser. Public rooms support up to 8 players; private rooms up to 12. Room codes are generated
server-side and are not guessable in practice (sufficient entropy given the small number of
concurrently active rooms), but are not treated as a security boundary — a private room is
"unlisted," not access-controlled beyond the code itself.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Treating the room code as an auth secret** — Don't log room codes in a way that leaks them, but also don't build features assuming the code provides strong access control — it's obscurity for casual friend-invite use, not a security mechanism.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

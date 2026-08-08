# Server Browser
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Lists all active public `MatchRoom`s with server name, current/max player count, map, mode, and
ping. Supports client-side filtering by map/mode and sorting by ping or player count; join is a
direct request to the chosen room's join endpoint, rejected if the room filled between listing and
join (client shows a "room full, rejoin?" fallback rather than erroring silently).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Assuming the listed room is still joinable** — Always handle the race where a room fills between the browser snapshot and the join request — never treat a stale listing as a guarantee of a slot.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

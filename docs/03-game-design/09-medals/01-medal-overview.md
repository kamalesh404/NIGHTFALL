# Medal Overview
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Killstreak medals display as UI announcements with distinct icons and audio cues, tracked
server-side per player per match.

| Medal | Trigger |
|---|---|
| Double Kill | Two kills within 4 seconds |
| Triple Kill | Three kills within 4 seconds |
| Rampage | Four kills within 4 seconds |
| Dominating | Five or more kills within 4 seconds |
| Headshot | Any kill achieved via headshot hit detection |
| First Blood | The first kill of the match |

Medal events are emitted as immediate event messages (see 02-tech-stack/05-networking-protocol.md),
never inferred client-side from the kill feed.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Inferring medals from the client-side kill feed** — Medal eligibility depends on precise server-tracked timing windows; the client must receive an explicit medal event, not derive one by pattern-matching its local kill feed.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Free For All (FFA)
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

## Rules

Every player is an individual competitor. Highest kill count at match end wins. No teams, no objectives, pure combat focus.

## Win Condition

Highest score at the 4-minute mark, or first to the configured score limit (see
10-configuration/06-match-config.md) — whichever comes first.

## Server Implementation

Implemented as `apps/server/src/modes/freeforall.ts`, conforming to the shared
mode interface. Score events (kill, assist, objective) are emitted as immediate event messages per
02-tech-stack/05-networking-protocol.md, not batched into the next snapshot.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Resolving score client-side** — Free For All scoring must be computed and broadcast by the server mode implementation; the client only renders the scoreboard from received state.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Capture The Flag (CTF)
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

## Rules

Each team defends a base flag that opponents must steal and return to score. Flag carrier visibility, flag drop on death, return timer.

## Win Condition

Highest score at the 4-minute mark, or first to the configured score limit (see
10-configuration/06-match-config.md) — whichever comes first.

## Server Implementation

Implemented as `apps/server/src/modes/capturetheflag.ts`, conforming to the shared
mode interface. Score events (kill, assist, objective) are emitted as immediate event messages per
02-tech-stack/05-networking-protocol.md, not batched into the next snapshot.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Resolving score client-side** — Capture The Flag scoring must be computed and broadcast by the server mode implementation; the client only renders the scoreboard from received state.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Game Mode Overview
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Four modes, each a 4-minute match with instant respawn. Every mode implements a shared server-side
interface (`onTick`, `onPlayerJoin`, `onScoreEvent`, `checkWinCondition`) so mode logic stays
isolated — see 02-tech-stack/03-backend-architecture.md.

| Abbr | Mode |
|---|---|
| FFA | Free For All |
| TDM | Team Deathmatch |
| CTF | Capture The Flag |
| HP | Hardpoint |

After each match, a 15-second map vote (Rustpoint / Fallen Sanctuary / Emerald Park) selects the
next map; majority wins, ties broken randomly.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Sharing mutable state between mode instances** — Each MatchRoom owns one mode instance; modes must not read or write another room's state — no module-level mutable globals for score or zone state.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

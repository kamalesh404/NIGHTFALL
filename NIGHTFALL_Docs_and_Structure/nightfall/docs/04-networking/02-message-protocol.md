# Message Protocol
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Four message families, each with a Zod schema in `packages/protocol/schemas/`:

- **Input** (client→server, per client frame): movement keys, mouse look delta, fire state,
  reload request, weapon switch, ability use.
- **State snapshot** (server→client, per tick): all player positions, health, ammo, scores,
  objective status.
- **Events** (server→client, immediate): kills, deaths, assists, objective captures, medal awards.
- **Lobby** (bidirectional): room creation, joining, leaving, match start countdown, map voting.

Every message is `{ type: string, payload: T }` where `T` is the Zod-inferred type for `type`. A
single `dispatch(type, payload)` function on both ends routes to the correct handler — no ad-hoc
`socket.on('customEvent', ...)` handlers scattered through the codebase.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding a new socket event without a schema** — Every new message type requires a Zod schema and shared TS type in packages/protocol before either side can send/receive it.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

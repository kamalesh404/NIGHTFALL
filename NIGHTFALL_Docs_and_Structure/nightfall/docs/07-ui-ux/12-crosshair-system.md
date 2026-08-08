# Crosshair System
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Player-selectable crosshair color (Settings menu). Crosshair dynamically reflects current weapon
spread state (widens under movement/fire, tightens on ADS/crouch) as a direct visualization of the
accuracy stat driving actual hit resolution — it must never show a spread state that doesn't match
what the server will actually resolve.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Desyncing crosshair visuals from actual accuracy** — The crosshair spread animation must derive from the same accuracy calculation used for hit resolution, not an independent cosmetic animation — otherwise players learn to trust a visual lie.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

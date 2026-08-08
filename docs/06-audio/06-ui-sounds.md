# UI Sounds
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Menu clicks, transitions, and notification alerts use Howler.js (the one sanctioned use of Howler
in the locked stack) for simplicity, routed through the UI `GainNode` category. This is separate
from — and simpler than — the raw Web Audio spatial pipeline used for gameplay sounds.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Using Howler for gameplay/spatial sounds** — Reserved for UI-only per the locked stack; gameplay audio (weapons, footsteps, ambient, medals) uses raw Web Audio API.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

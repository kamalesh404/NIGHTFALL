# Audio Engine
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

The Web Audio API is used directly for all gameplay-critical audio (spatial 3D sound, procedural
synthesis, mixing); Howler.js is scoped strictly to UI/menu sounds where its simplicity is a net
win and spatialization isn't needed. See 06-audio/ for the full breakdown.

Core graph: `AudioContext` → per-source `PannerNode` (HRTF, positional) → category `GainNode`
(weapons / footsteps / ambient / UI) → master `GainNode` → `AudioContext.destination`. Category
gain nodes are what the Settings menu's per-channel volume sliders control.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Using Howler for spatial gameplay audio** — Gunshots, footsteps, and explosions must use raw Web Audio PannerNode for 3D positioning — Howler is UI-sounds-only per the locked stack.
- **Creating a new AudioContext per sound** — One AudioContext for the whole app, resumed on first user gesture (browser autoplay policy); sources are created and connected per sound-play, not the context itself.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

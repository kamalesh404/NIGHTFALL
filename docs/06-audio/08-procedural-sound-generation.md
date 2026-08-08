# Procedural Sound Generation
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Distinct weapon and UI audio signatures are synthesized using Web Audio oscillators, noise buffers,
and envelope (ADSR-style) shaping rather than licensed sample libraries — consistent with the
project's zero-external-asset design pillar. Generated buffers can be cached after first synthesis
if reused frequently (e.g., a weapon's gunshot) to avoid resynthesizing every shot.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Resynthesizing a sound from scratch on every trigger** — Cache the synthesized AudioBuffer after first generation and replay it via new BufferSourceNode instances — don't rebuild the oscillator graph per gunshot at high fire rates.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

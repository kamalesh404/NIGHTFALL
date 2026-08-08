# Cheat Prevention
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


The core defense is server authority: the server independently computes movement, hit detection,
and damage from validated inputs and never trusts a client-reported outcome (position, hit, kill,
score). Basic anomaly detection (implausible input rate, impossible aim-angle deltas) can flag
accounts for review, but there is no kernel-level anti-cheat — that's incompatible with the
browser-native pillar (01-overview/02-game-design-philosophy.md) and out of scope.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Reaching for client-side anti-cheat obfuscation** — Obfuscating client code is not a substitute for server authority and creates a false sense of security — every gameplay-affecting value must be independently verified server-side regardless of what client-side protections exist.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

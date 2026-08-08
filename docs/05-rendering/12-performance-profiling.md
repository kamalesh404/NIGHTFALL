# Performance Profiling
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Use Chrome DevTools Performance tab and the Three.js inspector (see
14-development/06-profiler-guide.md) to identify actual bottlenecks (script time vs. GPU time vs.
draw calls) before optimizing — see 02-tech-stack/10-performance-budgets.md for the specific
budgets a change must respect.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Guessing at the bottleneck** — Never add LOD/instancing/culling complexity speculatively — profile first, confirm the specific budget being missed, then target the fix at that measured cause.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

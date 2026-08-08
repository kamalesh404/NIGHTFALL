# Performance Budgets
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Hard targets, not aspirations — features that blow these budgets must be optimized or cut before
merge.

| Metric | Budget |
|---|---|
| Frame rate | 60 FPS sustained on GTX 1650-class hardware at Medium settings, 8-player match |
| Frame time | ≤ 16.6ms average, ≤ 33ms worst-case spike |
| Memory (client) | < 2 GB heap + GPU memory combined |
| Draw calls | < 500 per frame at Medium (instancing required for repeated geometry) |
| Server tick | 50ms budget per tick; simulation + broadcast must complete comfortably inside it |
| Network payload | State snapshot < 4 KB per player per tick before any Phase 2 compression |
| Effective latency | < 100ms same-continent |

Any PR that regresses a budget by more than 10% needs either a fix or an explicit, documented
exception before merge — see 11-testing/05-performance-testing.md for how this is measured.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Optimizing without measuring** — Use Chrome DevTools / the Three.js inspector to confirm a budget is actually being exceeded before adding complexity (LOD, instancing, culling tweaks) to fix it — see 14-development/06-profiler-guide.md.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

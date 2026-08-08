# Risks and Mitigations
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


| Risk | Mitigation |
|---|---|
| Procedural geometry looks cheap/unpolished | Early visual review checkpoints per class/map; iterate before Phase 2 content multiplies the surface area |
| Netcode feels laggy at real-world latency | Validate prediction/reconciliation against 04-networking/06-latency-handling.md targets early, not just at Phase 3 |
| Solo/small-team scope creep | Hold the line on the locked feature list per phase — this doc set exists specifically to prevent silent scope growth |
| Bot behavior feels obviously robotic | Budget explicit tuning passes in Phase 2/3, not a one-shot implementation |

## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Treating this table as exhaustive** — New risks discovered during implementation should be added here, not silently absorbed without a mitigation plan.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

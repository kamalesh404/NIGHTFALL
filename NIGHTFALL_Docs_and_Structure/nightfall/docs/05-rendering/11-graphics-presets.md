# Graphics Presets
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


| Setting | Low | Medium | High | Ultra |
|---|---|---|---|---|
| Shadows | Off | 1024 map | 2048 map | 4096 map |
| Draw distance | 50m | 100m | 200m | 400m |
| Fog | Off | Linear | Exponential | Volumetric-style |
| Materials | Simple | Standard | PBR where applicable | Highest quality |

Preset values live in `packages/config/graphics.json` (10-configuration/08-graphics-config.md), not
hardcoded switch statements in rendering code.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Hardcoding preset thresholds in rendering code** — Read preset values from config so tuning a budget doesn't require a rendering-code change.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

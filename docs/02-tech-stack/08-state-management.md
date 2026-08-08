# State Management
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Zustand stores on the client, one per concern:

| Store | Holds |
|---|---|
| `useMatchStore` | Current snapshot mirror: players, scores, objective state, timer |
| `usePlayerStore` | Local player's health, ammo, class, cosmetics |
| `useUIStore` | Active menu screen, modal state, HUD toggles (scoreboard visible, etc.) |
| `useSettingsStore` | Graphics preset, volumes, sensitivity, FOV, keybinds — persisted to localStorage |

Stores are updated by the network layer (`net/`) when a snapshot or event arrives — game logic
never mutates store state directly from inside the Three.js render loop; it goes through store
setters so React-free UI overlays (plain DOM + store subscriptions) re-render correctly.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Storing Three.js objects in Zustand** — Meshes, cameras, and other Object3D instances belong in the scene graph, not in a store — stores hold plain serializable data used to drive UI.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

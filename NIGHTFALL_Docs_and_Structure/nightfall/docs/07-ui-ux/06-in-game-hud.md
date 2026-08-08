# In-Game HUD
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Health bar (current/max), ammo counter (magazine/reserve), kill feed (recent eliminations with
weapon icons and medal announcements), Tab-toggleable scoreboard (kills/deaths/assists/headshots,
sorted per 03-game-design/06-combat scoring rules), minimap (player position dots, objective
indicators), 4-minute match timer, ping (ms), FPS counter, current class icon/name, current weapon
icon. Directional damage indicators flash on taking damage; hitmarkers flash briefly on a confirmed
hit.

All HUD elements are plain DOM (HTML/CSS) positioned over the WebGL canvas, driven by Zustand store
subscriptions (02-tech-stack/08-state-management.md), not drawn into the Three.js scene.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Drawing HUD elements as sprites in the 3D scene** — HUD is DOM/CSS, not scene geometry — see 02-tech-stack/02-frontend-architecture.md.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

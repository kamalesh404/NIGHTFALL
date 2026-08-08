# Frontend Architecture
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

The client is a Vite-built TypeScript app under `apps/client`. Its structure separates the render
loop, game state, and network layer cleanly so an agent can locate the right file for a change.

```
apps/client/src/
├── main.ts                # Entry point, boots the game loop
├── core/
│   ├── GameLoop.ts         # requestAnimationFrame driver, fixed-timestep update
│   ├── SceneManager.ts     # Three.js scene/camera/renderer lifecycle
│   └── InputManager.ts     # Keyboard/mouse capture, pointer lock
├── entities/               # Player, Bot, Projectile, Pickup classes
├── procedural/             # Geometry/texture/particle generators (see 05-rendering)
├── net/                    # Socket.IO client wrapper, prediction, reconciliation
├── state/                  # Zustand stores (match, player, settings, ui)
├── ui/                     # HTML/CSS overlays (HUD, menus) — NOT React/Three.js scene objects
└── audio/                  # Web Audio graph setup and sound triggers
```

**Render loop contract:** the game loop runs a fixed-timestep update (matching the server's 20Hz
tick for physics/prediction) decoupled from the variable-rate render/draw call. UI overlays are
plain DOM (HTML/CSS) layered over the WebGL canvas via CSS positioning, not drawn into the 3D scene
— this keeps text crisp and avoids reinventing DOM layout in WebGL.

**State ownership:** Zustand stores hold client-authoritative UI state (menu screen, settings) and
mirrored server state (match snapshot, scoreboard). Game entities themselves (Three.js
Object3D/meshes) are NOT stored in Zustand — Zustand triggers UI re-renders, not scene mutations.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Mixing DOM UI into the Three.js scene graph** — HUD/menu elements are HTML/CSS overlays, not sprites or CSS3DRenderer objects, unless a specific doc says otherwise — this keeps text rendering sharp and layout tooling normal.
- **Coupling render rate to simulation rate** — Physics/prediction must step at a fixed timestep independent of monitor refresh rate; driving gameplay logic directly off requestAnimationFrame's variable delta causes speed to vary with FPS.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

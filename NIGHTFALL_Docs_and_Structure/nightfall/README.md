# NIGHTFALL

Browser-based multiplayer FPS. 10 hero classes, 3 maps, 4 game modes.
Built with TypeScript, Three.js, Node.js, Socket.IO.

Monorepo (pnpm workspaces):

```
apps/client      # Three.js + Vite frontend (not yet implemented)
apps/server      # Node.js + Express + Socket.IO authoritative server (not yet implemented)
packages/config  # Authoritative game balance JSON (classes, weapons, movement, match, combat, xp)
packages/protocol# Zod schemas for every config file + inferred TS types (z.infer only)
packages/shared  # Movement & damage math shared by client prediction and server simulation
docs/            # Full locked specification
```

## Setup

```bash
pnpm install
pnpm typecheck   # strict TS across all packages
pnpm test        # Vitest unit + integration tests
```

## Status

- [x] Monorepo scaffold (pnpm, strict TS, Vitest)
- [x] `packages/config` — all balance data, Zod-validated at load (fail loudly)
- [x] `packages/protocol` — Zod schemas for classes, weapons, movement, match, combat, xp
- [x] `packages/shared` — `computeFinalSpeed` (multiplicative formula), jump physics,
      damage calc with config-driven falloff + headshot multiplier
- [x] Movement physics engine — fixed-timestep kinematic step (WASD, sprint/crouch/ADS,
      jump w/ no air control, gravity, terminal velocity), AABB world collision
      (walls, crates, ceiling, bounds), server-side input validation + displacement cap
- [ ] Combat resolution (hitscan / projectile / melee, server-authoritative)
- [ ] Networking protocol + message schemas
- [ ] Server game core (20Hz MatchRoom, FFA mode)
- [ ] Client (Three.js rendering, HUD)

Full spec: `docs/00-index.md` and `../NIGHTFALL_Complete_Project_Plan.md`.

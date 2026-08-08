# Locked Tech Stack
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

This stack is **locked** for the duration of Phase 1–3. Swapping any entry requires an explicit
decision recorded in 16-appendix/01-changelog.md — an AI agent should never silently substitute a
library because it's more familiar with a different one.

| Category | Technology | Why |
|---|---|---|
| Language | TypeScript (strict mode) | Type safety across client/server boundary via packages/shared |
| Frontend | HTML5 + CSS3 | No framework overhead for a game-loop-driven UI |
| Build Tool | Vite | Fast HMR, native TS/ESM support |
| Package Manager | pnpm | Efficient monorepo workspace linking |
| 3D Engine | Three.js | Mature, well-documented, procedural-geometry friendly |
| Physics | Rapier.js (WASM) | Deterministic-enough collision at acceptable performance |
| Networking | Socket.IO | Reliable WebSocket abstraction with room support |
| Serialization | JSON (Phase 1) → MessagePack (Phase 2 if profiling justifies) | Start simple, optimize only with evidence |
| Backend | Node.js + Express.js | Single-language stack with the client |
| Database | PostgreSQL via Prisma | Type-safe queries, mature migrations |
| Cache | Redis (optional) | Session/rate-limit store if load requires it |
| Auth | JWT + bcrypt | Standard, well-understood pattern |
| Validation | Zod | Shared schema source of truth for config and network messages |
| Logging | Pino | Low-overhead structured logging |
| Audio | Web Audio API (+ Howler.js for UI only) | Native spatial audio without a licensed engine |
| State | Zustand | Minimal client state management |
| Testing | Vitest (unit/integration), Playwright (menus/auth E2E, optional) | Fast, TS-native |
| CI/CD | GitHub Actions → Vercel (client) + Render/Railway/Koyeb/Fly.io (server) | Free-tier-friendly |

Full detail on each row lives in the corresponding doc in this directory.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Substituting an unlisted library** — Do not introduce Redux, Colyseus, WebRTC data channels, a different ORM, or any package not in this table without flagging it as an explicit change request first.
- **Skipping MessagePack rationale** — MessagePack is Phase 2 *conditional on profiling data*. Do not adopt it in Phase 1 as a default optimization.

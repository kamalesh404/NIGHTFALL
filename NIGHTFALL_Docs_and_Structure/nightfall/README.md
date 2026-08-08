# NIGHTFALL

A browser-based multiplayer first-person shooter — 10 hero classes, 3 procedural arena maps, 4
game modes, full progression and cosmetics, built entirely on procedural Three.js geometry with an
authoritative Node.js server.

## Quick Start

```bash
pnpm install
cp .env.example .env
docker compose up -d
pnpm --filter server prisma migrate dev
pnpm dev
```

Client: http://localhost:5173 · Server: http://localhost:3000

## Documentation

Full documentation lives in [`docs/00-index.md`](docs/00-index.md) — start there. It covers game
design, tech stack, networking, rendering, audio, UI/UX, backend, AI bots, configuration, testing,
deployment, security, development workflow, roadmap, and appendix material across ~150 focused
documents, each ending with an **AI Agent Failure Modes** section for anyone (human or AI) writing
code against this project.

## Project Structure

```
nightfall/
├── apps/
│   ├── client/           # Three.js frontend, Vite build
│   └── server/           # Node.js + Express + Socket.IO
├── packages/
│   ├── shared/           # Types, constants, utilities shared across client/server
│   ├── config/            # Game balance JSON/YAML files
│   └── protocol/          # Network message types, Zod schemas, serialization
├── docs/                  # This documentation set
├── docker/                # Dockerfiles, docker-compose.yml
├── scripts/                # Setup, deployment, database migration scripts
└── .github/                # GitHub Actions workflows
```

See [`docs/02-tech-stack/01-locked-tech-stack.md`](docs/02-tech-stack/01-locked-tech-stack.md) for
the full locked technology stack, and [`docs/15-roadmap/`](docs/15-roadmap/01-phase-1-mvp.md) for
the phased development plan.

# NIGHTFALL — Documentation Index

Master navigation for the full NIGHTFALL doc set. Every doc follows the same structure: a status
block, the content itself, and an **AI Agent Failure Modes & Implementation Guardrails** section
listing the specific mistakes to avoid when implementing that area.

**Start here if you're new:** 01-overview/01-executive-summary.md → 02-tech-stack/01-locked-tech-stack.md
→ 15-roadmap/01-phase-1-mvp.md.

**Start here if you're implementing a specific system:** jump directly to the numbered section
below — each doc is self-contained enough to work from without reading the whole tree, but links
back to related docs where relevant.

| # | Section | Covers |
|---|---|---|
| 01 | [Overview](01-overview/01-executive-summary.md) | What NIGHTFALL is, design philosophy, audience, glossary |
| 02 | [Tech Stack](02-tech-stack/01-locked-tech-stack.md) | Locked technology choices and architecture |
| 03 | [Game Design](03-game-design/01-hero-classes/01-class-overview.md) | Classes, weapons, maps, modes, movement, combat, progression, cosmetics, medals |
| 04 | [Networking](04-networking/01-network-architecture.md) | Server authority, prediction, reconciliation, lobbies |
| 05 | [Rendering](05-rendering/01-rendering-pipeline.md) | Procedural geometry/textures, lighting, performance |
| 06 | [Audio](06-audio/01-audio-architecture.md) | Web Audio spatial/procedural sound system |
| 07 | [UI/UX](07-ui-ux/01-ui-design-system.md) | Menus, HUD, spectator, settings |
| 08 | [Backend](08-backend/01-server-structure.md) | Express/Socket.IO server, auth, DB, API |
| 09 | [AI Bots](09-ai-bots/01-bot-architecture.md) | Bot pathfinding, combat, difficulty |
| 10 | [Configuration](10-configuration/01-config-system-overview.md) | Data-driven balance config + Zod schemas |
| 11 | [Testing](11-testing/01-testing-strategy.md) | Unit, integration, manual, performance, network, CI |
| 12 | [Deployment](12-deployment/01-local-development.md) | Docker Compose, hosting, scaling, DR |
| 13 | [Security](13-security/01-security-overview.md) | Auth security, input validation, cheat prevention |
| 14 | [Development](14-development/01-setup-guide.md) | Setup, standards, git workflow, debugging |
| 15 | [Roadmap](15-roadmap/01-phase-1-mvp.md) | Phase 1–3 scope, milestones, risks |
| 16 | [Appendix](16-appendix/01-changelog.md) | Changelog, contributing, licenses |

## Reading This Doc Set as an AI Coding Agent

1. Never implement a system from memory of "how other FPS games do it" — find and read the specific
   doc for that system first. This doc set is the spec.
2. Config files (`packages/config/*.json`) are the authoritative source for all balance numbers;
   docs describe structure and intent, not a number to copy-paste into code.
3. Every network message and config file has a Zod schema — if you're adding a new field, the
   schema change and the doc update happen together, not as an afterthought.
4. The server is authoritative for everything gameplay-affecting. If you're about to write logic
   that trusts a client-reported outcome, stop and re-read 04-networking/01-network-architecture.md
   and 13-security/05-cheat-prevention.md.
5. Scope is locked per phase (15-roadmap/). Don't pull forward future-phase features "while you're
   in there."
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Treating any single doc as complete in isolation on a cross-cutting change** — A change that touches config, network messages, and rendering (e.g. a new weapon) needs the matching docs updated together — 03-game-design/02-weapons/, 10-configuration/03-weapon-config.md, and 04-networking/02-message-protocol.md (if the message shape changes) all move together.

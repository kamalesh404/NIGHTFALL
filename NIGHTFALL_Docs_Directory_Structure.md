nightfall/
│
├── docs/
│   │
│   ├── 00-index.md                          # Master navigation and quick links
│   │
│   ├── 01-overview/
│   │   ├── 01-executive-summary.md            # What NIGHTFALL is, target audience, success criteria
│   │   ├── 02-game-design-philosophy.md       # Core pillars: accessible, fast, procedural, browser-native
│   │   ├── 03-target-audience.md             # Casual FPS players, browser gamers, friend groups
│   │   ├── 04-competitive-analysis.md         # Krunker, Venge.io, Deadshot — what we learn from each
│   │   └── 05-glossary.md                    # All game terms, acronyms, domain language
│   │
│   ├── 02-tech-stack/
│   │   ├── 01-locked-tech-stack.md            # Final approved stack with justification per choice
│   │   ├── 02-frontend-architecture.md        # Three.js pipeline, rendering loop, scene graph
│   │   ├── 03-backend-architecture.md         # Node.js + Express + Socket.IO server design
│   │   ├── 04-database-schema.md             # Prisma schema, entity relationships, migrations
│   │   ├── 05-networking-protocol.md          # Message types, packet structure, serialization
│   │   ├── 06-physics-integration.md           # Rapier.js WASM integration, collision layers
│   │   ├── 07-audio-engine.md                # Web Audio API architecture, spatial audio, mixing
│   │   ├── 08-state-management.md            # Zustand stores, client game state flow
│   │   ├── 09-build-and-deployment.md         # Vite config, Docker, CI/CD pipeline
│   │   └── 10-performance-budgets.md          # FPS targets, memory limits, draw call budgets
│   │
│   ├── 03-game-design/
│   │   ├── 01-hero-classes/
│   │   │   ├── 01-class-overview.md          # All 10 classes summary table
│   │   │   ├── 02-sentinel.md              # Frontline: stats, abilities, visual design
│   │   │   ├── 03-phantom.md               # Sniper: stats, abilities, visual design
│   │   │   ├── 04-vanguard.md              # Breacher: stats, abilities, visual design
│   │   │   ├── 05-titan.md                 # Heavy: stats, abilities, visual design
│   │   │   ├── 06-nomad.md                 # Flex: stats, abilities, visual design
│   │   │   ├── 07-specter.md               # Assassin: stats, abilities, visual design
│   │   │   ├── 08-falcon.md                # Precision: stats, abilities, visual design
│   │   │   ├── 09-wrecker.md               # Demolition: stats, abilities, visual design
│   │   │   ├── 10-rogue.md                 # Duelist: stats, abilities, visual design
│   │   │   └── 11-reaper.md                # Melee: stats, abilities, visual design
│   │   │
│   │   ├── 02-weapons/
│   │   │   ├── 01-weapon-overview.md        # All 10 weapons summary table
│   │   │   ├── 02-assault-rifle.md           # Sentinel primary
│   │   │   ├── 03-sniper-rifle.md            # Phantom primary
│   │   │   ├── 04-shotgun.md                 # Vanguard primary
│   │   │   ├── 05-heavy-machine-gun.md        # Titan primary
│   │   │   ├── 06-tactical-rifle.md          # Nomad primary
│   │   │   ├── 07-silenced-smg.md            # Specter primary
│   │   │   ├── 08-burst-rifle.md             # Falcon primary
│   │   │   ├── 09-rocket-launcher.md         # Wrecker primary
│   │   │   ├── 10-dual-pistols.md            # Rogue primary
│   │   │   ├── 11-katana.md                  # Reaper primary
│   │   │   └── 12-p-18-pistol.md             # Secondary weapon
│   │   │
│   │   ├── 03-maps/
│   │   │   ├── 01-map-overview.md            # All 3 maps summary
│   │   │   ├── 02-rustpoint.md               # Desert industrial — layout, zones, sightlines
│   │   │   ├── 03-fallen-sanctuary.md        # Temple ruins — layout, zones, verticality
│   │   │   └── 04-emerald-park.md            # Zoo/wildlife — layout, zones, enclosures
│   │   │
│   │   ├── 04-game-modes/
│   │   │   ├── 01-mode-overview.md           # All 4 modes summary
│   │   │   ├── 02-free-for-all.md            # FFA rules, scoring, win conditions
│   │   │   ├── 03-team-deathmatch.md         # TDM rules, team balancing, scoring
│   │   │   ├── 04-capture-the-flag.md        # CTF rules, flag mechanics, scoring
│   │   │   └── 05-hardpoint.md               # Hardpoint rules, zone rotation, scoring
│   │   │
│   │   ├── 05-movement/
│   │   │   ├── 01-movement-mechanics.md      # WASD, jump, sprint, crouch, ADS
│   │   │   ├── 02-movement-values.md         # Speeds, heights, penalties per class
│   │   │   └── 03-movement-validation.md     # Server-side speed checks, boundary checks
│   │   │
│   │   ├── 06-combat/
│   │   │   ├── 01-hit-detection.md           # Hitscan vs projectile, hitboxes, head detection
│   │   │   ├── 02-damage-calculation.md      # Base damage, falloff, headshot multiplier, armor
│   │   │   ├── 03-recoil-system.md           # Pattern definition, spray control, recovery
│   │   │   ├── 04-ads-mechanics.md           # Zoom levels, speed penalty, accuracy boost
│   │   │   ├── 05-reload-system.md           # Magazine, reserve, cancel-by-switch, timing
│   │   │   └── 06-melee-combat.md            # Katana lunge, range, instant kill logic
│   │   │
│   │   ├── 07-progression/
│   │   │   ├── 01-xp-system.md               # XP sources, values, level thresholds 1-100
│   │   │   ├── 02-level-rewards.md           # Cosmetic unlocks per level milestone
│   │   │   └── 03-statistics-tracking.md     # Lifetime stats, match history, leaderboards
│   │   │
│   │   ├── 08-cosmetics/
│   │   │   ├── 01-cosmetic-overview.md       # All categories, unlock conditions
│   │   │   ├── 02-head-cosmetics.md          # Helmet, hood, bandana, beanie, crown
│   │   │   ├── 03-body-dyes.md               # Olive, crimson, midnight, desert, jet
│   │   │   ├── 04-weapon-skins.md            # Default, gold, carbon, digital, neon per class
│   │   │   └── 05-melee-skins.md             # Katana: default, obsidian, gold, frost, plasma
│   │   │
│   │   └── 09-medals/
│   │       ├── 01-medal-overview.md          # All medals, trigger conditions, UI display
│   │       ├── 02-killstreak-medals.md       # Double, Triple, Rampage, Dominating
│   │       └── 03-special-medals.md          # Headshot, First Blood
│   │
│   ├── 04-networking/
│   │   ├── 01-network-architecture.md         # 20Hz tick, authoritative server, client roles
│   │   ├── 02-message-protocol.md             # All message types, payloads, Zod schemas
│   │   ├── 03-client-prediction.md            # Input prediction, movement smoothing
│   │   ├── 04-server-reconciliation.md       # Position validation, correction handling
│   │   ├── 05-entity-interpolation.md         # Other player smoothing, snapshot buffering
│   │   ├── 06-latency-handling.md             # Ping display, jitter compensation basics
│   │   ├── 07-server-browser.md               # Server listing, filtering, sorting, joining
│   │   ├── 08-private-rooms.md                # Room creation, code generation, friend joining
│   │   ├── 09-match-flow.md                   # Lobby → warmup → match → voting → next
│   │   └── 10-bot-filling.md                  # Bot spawning, difficulty, replacement logic
│   │
│   ├── 05-rendering/
│   │   ├── 01-rendering-pipeline.md           # Frame loop, scene graph, render order
│   │   ├── 02-procedural-geometry.md           # Character construction from primitives
│   │   ├── 03-procedural-weapons.md            # Weapon mesh generation per class
│   │   ├── 04-procedural-maps.md              # Modular block system, map assembly
│   │   ├── 05-procedural-textures.md          # Canvas API texture generation
│   │   ├── 06-lighting-and-shadows.md         # Directional light, shadow maps, quality tiers
│   │   ├── 07-fog-and-atmosphere.md           # Distance fog, color grading per map
│   │   ├── 08-particle-effects.md             # Muzzle flash, shells, impacts, explosions
│   │   ├── 09-instancing-and-lod.md           # GPU instancing, LOD switching distances
│   │   ├── 10-frustum-culling.md              # Visibility testing, occlusion basics
│   │   ├── 11-graphics-presets.md             # Low/Medium/High/Ultra settings matrix
│   │   └── 12-performance-profiling.md        # FPS monitoring, bottleneck identification
│   │
│   ├── 06-audio/
│   │   ├── 01-audio-architecture.md           # Web Audio API graph, nodes, routing
│   │   ├── 02-spatial-audio.md                # 3D positioning, distance attenuation, panning
│   │   ├── 03-weapon-sounds.md                # Per-weapon gunshot design, layering
│   │   ├── 04-footstep-sounds.md              # Surface types, material detection
│   │   ├── 05-ambient-sounds.md               # Map atmosphere, wind, machinery
│   │   ├── 06-ui-sounds.md                    # Menu clicks, notifications, medal announcements
│   │   ├── 07-mixing-and-ducking.md           # Priority layers, dynamic range compression
│   │   └── 08-procedural-sound-generation.md  # Synthesis for unique audio signatures
│   │
│   ├── 07-ui-ux/
│   │   ├── 01-ui-design-system.md             # Colors, typography, spacing, components
│   │   ├── 02-main-menu.md                    # Layout, navigation, transitions
│   │   ├── 03-class-selection.md              # Stat cards, previews, weapon stats display
│   │   ├── 04-server-browser-ui.md            # Columns, filters, sorting, join buttons
│   │   ├── 05-private-room-ui.md              # Create, join, code display, player list
│   │   ├── 06-in-game-hud.md                  # Health, ammo, minimap, kill feed, timer
│   │   ├── 07-scoreboard.md                   # Tab overlay, columns, sorting, medals
│   │   ├── 08-map-voting.md                   # Post-match voting UI, countdown, results
│   │   ├── 09-spectator-ui.md                 # Camera controls, player info, mode indicators
│   │   ├── 10-settings-menu.md                # Graphics, audio, controls, keybinds
│   │   ├── 11-damage-indicators.md            # Directional flash, hit confirmation
│   │   ├── 12-crosshair-system.md             # Customization, color, size, dynamic feedback
│   │   └── 13-loading-screens.md              # Tips, progress, map info
│   │
│   ├── 08-backend/
│   │   ├── 01-server-structure.md             # Express routes, middleware, Socket.IO rooms
│   │   ├── 02-authentication.md               # JWT flow, bcrypt, guest mode, token refresh
│   │   ├── 03-player-accounts.md              # Registration, login, profile, password reset
│   │   ├── 04-match-making.md                 # Queue system, skill balancing (basic)
│   │   ├── 05-game-server-management.md       # Room lifecycle, player slots, bot filling
│   │   ├── 06-database-operations.md            # Prisma queries, transactions, indexing
│   │   ├── 07-caching-strategy.md             # Redis use cases, session store, rate limiting
│   │   ├── 08-logging-and-monitoring.md       # Pino structured logs, metrics collection
│   │   ├── 09-error-handling.md               # Try-catch patterns, Sentry integration
│   │   ├── 10-rate-limiting.md                # Request throttling, abuse prevention
│   │   └── 11-api-reference.md                # All REST endpoints, methods, payloads
│   │
│   ├── 09-ai-bots/
│   │   ├── 01-bot-architecture.md             # Bot controller, state machine, decision loop
│   │   ├── 02-navigation-grid.md              # A* implementation, grid generation per map
│   │   ├── 03-target-acquisition.md             # Vision cones, line of sight, priority scoring
│   │   ├── 04-combat-behavior.md              # Aiming accuracy, fire decisions, strafing
│   │   ├── 05-difficulty-levels.md            # Easy, Normal, Hard stat multipliers
│   │   ├── 06-bot-visuals.md                  # Bot tag display, simplified geometry
│   │   └── 07-phase-2-upgrade.md              # Recast Navigation migration plan
│   │
│   ├── 10-configuration/
│   │   ├── 01-config-system-overview.md         # JSON/YAML structure, hot-reload, validation
│   │   ├── 02-class-config.md                 # HP, speed, secondary, weapon per class
│   │   ├── 03-weapon-config.md                # All 10 weapon stat tables
│   │   ├── 04-map-config.md                   # Spawn points, zones, boundaries per map
│   │   ├── 05-xp-config.md                    # Rewards, thresholds, level curve
│   │   ├── 06-match-config.md                 # Duration, respawn, score limits, bot settings
│   │   ├── 07-cosmetic-config.md              # Unlock levels, categories, items
│   │   ├── 08-graphics-config.md              # Preset definitions, quality tiers
│   │   ├── 09-audio-config.md                 # Volume defaults, distance curves
│   │   └── 10-zod-schemas.md                  # Validation schemas for all config files
│   │
│   ├── 11-testing/
│   │   ├── 01-testing-strategy.md             # Unit, integration, manual test plans
│   │   ├── 02-unit-testing.md                 # Vitest setup, coverage targets, mocking
│   │   ├── 03-integration-testing.md            # API tests, database tests, socket tests
│   │   ├── 04-manual-testing.md               # Gameplay test cases, bug reporting template
│   │   ├── 05-performance-testing.md          # FPS benchmarks, memory profiling, load tests
│   │   ├── 06-network-testing.md              # Latency simulation, packet loss, reconnection
│   │   └── 07-ci-cd-testing.md                # GitHub Actions workflows, deployment checks
│   │
│   ├── 12-deployment/
│   │   ├── 01-local-development.md            # Docker Compose setup, environment variables
│   │   ├── 02-frontend-deployment.md            # Vercel config, environment, domains
│   │   ├── 03-backend-deployment.md             # Render/Railway config, scaling, logs
│   │   ├── 04-database-deployment.md            # Neon setup, connection pooling, backups
│   │   ├── 05-redis-deployment.md             # Upstash config, usage patterns
│   │   ├── 06-monitoring-setup.md             # Better Stack, Prometheus, Grafana configs
│   │   ├── 07-sentry-setup.md                 # Error tracking, release tracking
│   │   ├── 08-domain-and-ssl.md               # Custom domain, HTTPS, CDN
│   │   ├── 09-scaling-strategy.md             # Horizontal scaling, load balancing, costs
│   │   └── 10-disaster-recovery.md            # Backups, rollback procedures, incident response
│   │
│   ├── 13-security/
│   │   ├── 01-security-overview.md            # Threat model, attack surfaces
│   │   ├── 02-authentication-security.md        # JWT best practices, bcrypt parameters
│   │   ├── 03-input-validation.md             # Zod schemas, sanitization, injection prevention
│   │   ├── 04-network-security.md             # WSS, CORS, rate limiting, DDoS basics
│   │   ├── 05-cheat-prevention.md             # Server authority, validation, basic detection
│   │   ├── 06-data-privacy.md                 # GDPR basics, data retention, deletion
│   │   └── 07-incident-response.md            # Security breach procedures, communication
│   │
│   ├── 14-development/
│   │   ├── 01-setup-guide.md                  # Clone, install, configure, run locally
│   │   ├── 02-coding-standards.md             # TypeScript strict, naming, file organization
│   │   ├── 03-git-workflow.md                 # Branching, commits, PRs, reviews
│   │   ├── 04-monorepo-guide.md               # pnpm workspaces, package boundaries, imports
│   │   ├── 05-debugging-guide.md              # VS Code launch configs, browser devtools
│   │   ├── 06-profiler-guide.md               # Chrome DevTools, Three.js inspector, memory
│   │   ├── 07-database-guide.md             # Prisma Studio, migrations, seeding
│   │   ├── 08-environment-variables.md          # .env template, required vs optional
│   │   └── 09-troubleshooting.md              # Common issues, solutions, FAQ
│   │
│   ├── 15-roadmap/
│   │   ├── 01-phase-1-mvp.md                  # Months 1-3: 4-player FFA, 3 classes, 1 map
│   │   ├── 02-phase-2-expansion.md            # Months 4-6: 10 classes, 3 maps, 4 modes
│   │   ├── 03-phase-3-polish.md               # Months 7-9: Optimization, mobile, community
│   │   ├── 04-milestones.md                   # Deliverables per phase, acceptance criteria
│   │   ├── 05-risks-and-mitigations.md        # Technical risks, scope risks, contingency plans
│   │   └── 06-post-launch.md                  # Content updates, feature requests, maintenance
│   │
│   └── 16-appendix/
│       ├── 01-changelog.md                    # Document version history
│       ├── 02-contributing.md                 # How to contribute, code of conduct
│       ├── 03-license.md                      # Project license
│       ├── 04-third-party-licenses.md         # Dependencies and their licenses
│       ├── 05-assets-and-attribution.md       # Any external resources used
│       └── 06-contact-and-support.md          # Team contacts, support channels
│
└── README.md                                  # Project overview, quick start, badges

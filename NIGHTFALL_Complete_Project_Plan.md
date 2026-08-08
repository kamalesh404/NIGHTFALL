# NIGHTFALL — Complete Project Plan

## Executive Summary

NIGHTFALL is a browser-based multiplayer first-person shooter featuring 10 distinct hero classes, three meticulously designed arena maps, four competitive game modes, and a complete progression system. Built entirely with procedural 3D geometry using Three.js and backed by a authoritative Node.js server architecture, NIGHTFALL delivers fast-paced arena combat directly in modern web browsers without requiring any external 3D asset downloads. The project follows a disciplined phased development approach optimized for a solo developer or small team, prioritizing technical feasibility, clean architecture, and incremental feature delivery over scope bloat.

---

## Final Locked Tech Stack

| Category | Technology |
|----------|-----------|
| Language | TypeScript |
| Frontend | HTML5 + CSS3 |
| Build Tool | Vite |
| Package Manager | pnpm |
| 3D Engine | Three.js |
| Physics Engine | Rapier.js (WASM) |
| Rendering | WebGL 2.0 |
| Networking | Socket.IO (WebSockets) |
| Serialization | JSON (Phase 1), MessagePack (Phase 2 if profiling justifies it) |
| Backend Runtime | Node.js |
| Web Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache (Optional) | Redis (Upstash or self-hosted) |
| Authentication | JWT + bcrypt |
| Validation | Zod |
| Logging | Pino |
| Monitoring | Better Stack (Logs) + Prometheus + Grafana |
| Audio Engine | Web Audio API (3D Spatial Audio, Procedural Audio, Mixing) |
| UI Sound Helpers (Optional) | Howler.js (UI/Menu sounds only) |
| State Management | Zustand |
| Animation | Three.js Animation System + AnimationMixer |
| Shader Support | GLSL + vite-plugin-glsl |
| Procedural Texture Generation | HTML Canvas API |
| Fonts | Self-hosted Google Fonts |
| Configuration | JSON + YAML |
| Map Format | JSON + Zod Schema Validation |
| Bot Navigation | Grid-based A* (Phase 1), Recast Navigation (Phase 2) |
| Version Control | Git |
| Repository Hosting | GitHub |
| IDE | Visual Studio Code |
| Documentation | Markdown |
| Unit Testing | Vitest |
| Integration Testing | Vitest |
| End-to-End Testing | Playwright (Menus/Auth only, optional) |
| Code Formatting | Prettier |
| Linting | ESLint |
| Containerization | Docker |
| Local Orchestration | Docker Compose |
| CI/CD | GitHub Actions |
| Frontend Hosting | Vercel (Recommended) or Cloudflare Pages |
| Backend Hosting | Render, Railway, Koyeb, or Fly.io |
| Database Hosting | Neon PostgreSQL |
| Redis Hosting | Upstash Redis |
| Asset Storage (Future) | Cloudflare R2 |
| Crash Reporting | Sentry |
| API Testing | Bruno or Thunder Client |
| Design | Figma (Concepts), HTML/CSS (Final UI) |
| Browser Target | Chrome, Edge, Firefox (WebGL 2.0) |
| Target Performance | 60 FPS @ GTX 1650-class hardware |
| Project Architecture | Monorepo (apps/client, apps/server, packages/shared, packages/config, packages/protocol, docs, docker) |

---

## Project Structure

```
nightfall/
│
├── apps/
│   ├── client/           # Three.js frontend, Vite build
│   └── server/           # Node.js + Express + Socket.IO
│
├── packages/
│   ├── shared/           # Types, constants, utilities shared across client/server
│   ├── config/           # Game balance JSON/YAML files
│   └── protocol/         # Network message types, Zod schemas, serialization
│
├── docs/                 # Architecture docs, API reference, deployment guides
├── docker/               # Dockerfiles, docker-compose.yml
├── scripts/              # Setup, deployment, database migration scripts
├── .github/              # GitHub Actions workflows
└── README.md             # Quick start, architecture overview
```

---

## Development Workflow

```
VS Code
   ↓
pnpm install
   ↓
Vite (dev server + HMR)
   ↓
Three.js + Rapier.js + Zustand (client game loop)
   ↓
Socket.IO (real-time networking)
   ↓
Node.js + Express (REST API + WebSocket server)
   ↓
Prisma (database access)
   ↓
PostgreSQL (persistent data)
   ↓
Docker (local environment)
   ↓
Git + GitHub (version control)
   ↓
GitHub Actions (CI/CD pipeline)
   ↓
Vercel (Frontend deployment)
   ↓
Render / Railway / Koyeb / Fly.io (Backend deployment)
   ↓
Neon PostgreSQL (Production database)
```

---

## Core Game Design

### Hero Classes

NIGHTFALL features 10 hero classes, each with distinct visual identity, movement characteristics, and combat role. Every class is built entirely from procedural Three.js geometry with no external 3D models. Characters are blocky stylized humanoids with class-distinctive visual elements including hoods, armor plates, capes, visors, and weapon-specific holding poses. Each class has a fixed primary weapon, a secondary weapon availability flag, a base health pool, and a movement speed multiplier. The Sentinel serves as the Frontline role with 110 HP, 0.98x speed, a P-18 Pistol secondary, and an Assault Rifle primary, presenting as a balanced frontliner with solid all-around capabilities. The Phantom operates as the Sniper role with 80 HP, 1.08x speed, a P-18 Pistol secondary, and a Sniper Rifle primary, excelling at long-range takedowns with high mobility. The Vanguard fills the Breacher role with 125 HP, 0.95x speed, a P-18 Pistol secondary, and a Shotgun primary, built tough for close-range domination. The Titan anchors the Heavy role with 160 HP, 0.82x speed, a P-18 Pistol secondary, and a Heavy Machine Gun primary, serving as a heavily armored powerhouse with suppression dominance. The Nomad covers the Flex role with 100 HP, 1.02x speed, a P-18 Pistol secondary, and a Tactical Rifle primary, effective in medium to long range engagements. The Specter embodies the Assassin role with 90 HP, 1.10x speed, no secondary weapon, and a Silenced SMG primary, fast and silent for flanking and hit-and-run tactics. The Falcon represents the Precision role with 90 HP, 1.08x speed, a P-18 Pistol secondary, and a Burst Rifle primary, an accurate mid-range fighter with controlled burst damage. The Wrecker commands the Demolition role with 130 HP, 0.92x speed, a P-18 Pistol secondary, and a Rocket Launcher primary, a specialist in heavy explosives and area control. The Rogue takes the Duelist role with 95 HP, 1.08x speed, no secondary weapon, and Dual Pistols primary, a dual-wielding fighter with high mobility and quick takedowns. The Reaper defines the Melee role with 90 HP, 1.15x speed, no secondary weapon, and a Katana primary, a swift melee warrior thriving in close combat.

### Weapon Statistics

Every weapon in NIGHTFALL operates with complete data-driven statistics loaded from external JSON configuration files, enabling balance tuning without recompiling the game. Each weapon defines Damage as base hit points per shot, Fire Rate measured in rounds per second, Reload time in seconds from empty to full, Magazine capacity as maximum rounds before reload, Accuracy represented as the spread cone angle in degrees where lower values indicate tighter grouping, effective Range in meters before damage falloff begins, Headshot Multiplier as a decimal multiplier applied on head hits, Recoil pattern defined as an array of per-shot vertical and horizontal kick values, Movement Penalty as a speed multiplier when the weapon is currently equipped, and ADS Speed as the time in milliseconds to transition into and out of aim-down-sights. The Assault Rifle serves as the balanced mid-range option with moderate damage, moderate fire rate, and controllable recoil. The Sniper Rifle delivers high damage per shot with bolt-action or semi-auto behavior, significant scope zoom, and severe movement penalty while scoped. The Shotgun fires multiple pellets per shot with high close-range damage that drops sharply beyond 15 meters, requiring tight grouping for effectiveness. The Heavy Machine Gun offers sustained suppressive fire with large magazine capacity, significant recoil buildup, and the heaviest movement penalty. The Tactical Rifle bridges assault and sniper with burst or semi-auto fire, better accuracy than the Assault Rifle but lower fire rate. The Silenced SMG provides fast fire rate, low per-shot damage, tight hipfire accuracy, and suppressed audio signature for stealth approaches. The Burst Rifle fires three-round bursts with high accuracy and moderate recoil, rewarding trigger discipline. The Rocket Launcher fires slow-moving projectiles with area-of-effect damage, self-damage on close-range use, and significant reload time. The Dual Pistols offer akimbo fire with high combined fire rate, individual reload per pistol, and strong close-to-mid range performance. The Katana delivers instant melee kills with lunge distance, no ammunition requirement, and the highest movement speed bonus of any weapon.

### Maps

NIGHTFALL ships with exactly three maps, each constructed from modular procedural building blocks with baked collision geometry, spawn points, and objective zones. Rustpoint presents a desert industrial environment featuring long corridors between shipping containers, warehouse structures with multiple entry points, open engagement zones under harsh directional sunlight, elevated catwalks for sniper positions, and tight corners for close-quarters combat. Fallen Sanctuary depicts ancient temple ruins with towering stone pillars providing vertical gameplay, crumbling walls offering partial cover, underground passages creating flanking routes, elevated sniper positions on broken archways, and a central courtyard serving as the primary conflict zone. Emerald Park transforms a zoo and wildlife park into an arena with animal enclosure structures providing cover, observation towers offering elevated sightlines, gift shops and food stands creating tight indoor spaces, varied foliage and decorative elements for visual interest, and open pathways connecting distinct zones. Each map includes designated spawn points for all game modes, Hardpoint zone locations, flag positions for Capture The Flag, and collision boundaries preventing out-of-bounds play.

### Movement System

Movement in NIGHTFALL follows standard first-person shooter conventions designed for accessibility and predictability. The W key moves forward, A and D strafe left and right, S moves backward, Space triggers a jump with fixed height and no air control beyond initial velocity, Shift enables sprint with a flat 1.5x speed multiplier that disables weapon firing, Ctrl activates crouch reducing player height by 50 percent and movement speed by 50 percent, and mouse movement controls camera look with raw input and no acceleration. There are no advanced movement techniques like slidehopping, bunnyhopping, momentum preservation, or frame-rate-dependent movement tricks. Jumping while sprinting provides a slightly boosted jump height. Crouching while moving reduces weapon spread. ADS slows movement by a weapon-specific multiplier. Weapon switching is instant with no animation delay. Melee attacks trigger a quick slash with the equipped weapon or Katana.

### Game Modes

NIGHTFALL supports exactly four game modes with four-minute match durations and instant respawn. Free For All places every player as an individual competitor where the player with the highest kill count at match end wins, with no teams, no objectives, and pure combat focus. Team Deathmatch divides players into two teams competing for the highest combined kill count, with team-colored player indicators, team spawn zones, and no friendly fire. Capture The Flag assigns each team a base flag that opponents must steal and return to their own base to score, with flag carrier visibility, flag drop on death, and return timer. Hardpoint rotates an active capture zone across three to five predetermined map locations every 60 seconds, awarding points to the team controlling the zone, with visible zone boundaries, capture progress bars, and contested state when both teams occupy the zone. After each match concludes, all players participate in a 15-second map vote selecting the next match location from Rustpoint, Fallen Sanctuary, or Emerald Park, with the majority choice determining the next map and random selection breaking ties.

### Scoring and Medals

The scoring system tracks kills as eliminations of enemy players, deaths as times eliminated by enemies, assists as dealing 40 or more damage to an enemy who dies within 3 seconds to another player, and headshots as kills achieved through head hit detection. Killstreak medals display as satisfying UI announcements with distinct icons and audio cues: Double Kill for two kills within 4 seconds, Triple Kill for three kills within 4 seconds, Rampage for four kills within 4 seconds, Dominating for five or more kills within 4 seconds, Headshot for any kill with a headshot, and First Blood for the first kill of the match. The scoreboard displays all statistics in a tab-toggleable overlay sorted by kills then assists then lowest deaths.

### Progression System

The progression system is a simple level system ranging from 1 to 100 with no ranks, no in-game currency, no marketplace, no trading, no battle pass, and no challenge modes. Players earn XP from kills, assists, objective captures, and match wins. Leveling unlocks nothing functional and serves purely as a display of playtime and skill. There is no ranked competitive mode. Cosmetic unlocks occur at specific level milestones.

### Cosmetics

Cosmetics are limited to exactly 5 items per category with no back items, no sprays, no reticle customization beyond color, and no animated or particle-heavy cosmetics. Head cosmetics include a tactical helmet, a hood, a bandana, a beanie, and a crown. Body dyes include olive drab, crimson red, midnight blue, desert tan, and jet black. Weapon skins include default, gold, carbon fiber, digital camo, and neon glow, applied per weapon class. Melee skins for the Katana include default, obsidian, gold, frost, and plasma. All cosmetics are purely visual with no stat changes and unlock at specific level milestones.

---

## Networking Architecture

### Server Architecture

The authoritative Node.js server operates at 20Hz tick rate using Socket.IO for real-time bidirectional communication. The server maintains the single source of truth for all game state including player positions, health, ammo, scores, and objective status. Clients perform prediction for their own movement, interpolation for other player positions, and reconciliation when server state diverges from predicted state. The server validates all inputs including movement speed against class maximums, fire rate against weapon configuration, ammo counts against magazine and reserve limits, and position against map collision boundaries. There is no rollback system, no replay recording, no delta compression, and no advanced lag compensation beyond basic interpolation.

### Match Flow

Players join through random matchmaking placing them into the next available public lobby or through a server browser displaying all active public servers with server name, current player count, maximum capacity, map name, game mode, and ping in milliseconds. The server browser supports filtering by map and mode, sorting by ping or player count, and direct join on available slots. Private rooms use generated room codes for friends to join directly, bypassing the server browser. Public rooms support up to 8 players, private rooms up to 12. If insufficient real players join before match start, remaining slots fill with AI bots using simple waypoint navigation, random target selection, basic shooting with configurable difficulty, and visible bot tags.

### Message Protocol

All network messages use JSON serialization in Phase 1 with a defined protocol in the shared package. Message types include player input snapshots containing movement keys, mouse look, fire state, reload request, weapon switch, and ability use; server state snapshots containing all player positions, health, ammo, scores, and objective status; event messages for kills, deaths, assists, objective captures, and medal awards; and lobby management messages for room creation, joining, leaving, and match start countdown.

---

## Rendering Pipeline

### Graphics Settings

The rendering pipeline uses standard Three.js with four quality presets. Low disables shadows, reduces draw distance to 50 meters, disables fog, and uses simple materials. Medium enables shadow maps with 1024 resolution, sets draw distance to 100 meters, enables distance fog, and uses standard materials. High enables shadow maps with 2048 resolution, sets draw distance to 200 meters, enables exponential fog, and uses physically-based materials where applicable. Ultra enables shadow maps with 4096 resolution, sets draw distance to 400 meters, enables volumetric-style fog approximation, and uses the highest material quality. Target performance is 60 FPS on GTX 1650-class hardware at Medium settings.

### Procedural Generation

All visual assets are generated procedurally at runtime. Characters use BoxGeometry for torso and limbs, SphereGeometry for heads, CylinderGeometry for weapon barrels, and CapsuleGeometry for joint connections, with class-specific geometry additions like hoods, armor plates, and capes. Weapons combine primitive geometries into recognizable silhouettes with material color coding for differentiation. Maps use modular building blocks with instanced rendering for repeated elements like containers, pillars, and foliage. Textures are generated via HTML Canvas API with noise patterns, color fills, and simple detail drawing. Particles use BufferGeometry point clouds for muzzle flash, shell ejection, bullet impacts, and explosion effects.

### Optimization

Frustum culling prevents rendering objects outside the camera view. GPU instancing renders repeated objects like trees, rocks, and containers in single draw calls. Level of detail switches lower-polygon versions of distant objects. Shadow optimization uses cascade shadow maps with distance-based resolution. The target is stable 60 FPS on mid-range hardware with memory usage below 2 GB.

---

## Audio System

The audio engine uses the Web Audio API directly for all spatial 3D audio, procedural sound generation, and dynamic mixing. Howler.js is optionally used for UI and menu sounds only. Positional audio places gunshots, footsteps, and explosions in 3D space with distance attenuation and directional panning. Each weapon class has a unique gunshot sound with distinct timbre, length, and decay. Footsteps vary by surface type including concrete, metal, grass, and wood. Reload sounds are unique per weapon class. Hitmarker sounds confirm successful hits. Kill confirmation sounds accompany eliminations. Medal announcement sounds play for Double Kill, Triple Kill, Rampage, Dominating, Headshot, and First Blood. Ambient map atmosphere includes wind, distant machinery, and environmental tones. UI interaction sounds cover button clicks, menu transitions, and notification alerts.

---

## User Interface

### Main Menu

The main menu presents instant play for random matchmaking, server browser for browsing and joining public servers, private room creation with generated room code, private room joining via code entry, class selection with stat cards showing HP, speed, weapon loadout, and complete weapon statistics, settings access, and exit. The design is clean and minimal with dark theme, accent colors per class, and smooth transitions.

### In-Game HUD

The heads-up display shows health bar as a horizontal bar with current and maximum values, ammo counter with current magazine and reserve counts, kill feed scrolling recent eliminations with weapon icons and medal announcements, scoreboard toggleable with Tab showing kills, deaths, assists, and headshot count for all players sorted by performance, minimap with player position dots and objective indicators, match timer counting down from 4 minutes, ping display in milliseconds, FPS counter, class icon and name, and current weapon icon. Damage indicators flash directional red overlays when taking damage. Hitmarkers display as brief crosshair confirmation on successful hits.

### Spectator Mode

After death, players enter spectator mode with free camera movement, player following cycling through alive teammates, objective camera focusing on Hardpoint zones or flag carriers, and first-person view of followed players. Spectator controls include previous player, next player, objective camera, free camera, first-person toggle, and minimap toggle.

### Settings

Settings include graphics quality preset selection from Low to Ultra, audio master volume and individual channel volumes, mouse sensitivity with separate horizontal and vertical multipliers, FOV slider from 70 to 110 degrees, fully rebindable keys for all actions, and crosshair color selection.

---

## Backend Systems

### Authentication

Authentication uses JWT tokens with bcrypt password hashing. Players register with username, email, and password. Login returns a JWT stored in HTTP-only cookies. Guest mode allows play without account creation with progress saved locally only. Token refresh occurs automatically before expiration.

### Database Schema

PostgreSQL stores player accounts with username, email, password hash, creation date, and last login; player statistics with total kills, deaths, assists, headshots, matches played, matches won, and playtime; level progression with current level, current XP, and unlock status per cosmetic; and match history with match ID, map, mode, duration, score, and placement. Prisma ORM handles all database access with type-safe queries.

### API Endpoints

REST API endpoints include player registration and login, player profile retrieval with statistics and level, leaderboard retrieval sorted by level or kills, match history pagination, and cosmetic inventory listing.

### Logging and Monitoring

Pino handles structured logging for all server events. Better Stack aggregates logs for search and alerting. Prometheus collects metrics on player count, match duration, server CPU, memory usage, and request latency. Grafana dashboards visualize metrics in real-time. Sentry captures and reports client and server errors with stack traces and context.

---

## Configuration System

All game balance values live in external JSON and YAML files within the packages/config directory. Class configuration defines HP, speed, secondary availability, and primary weapon assignment per class. Weapon configuration defines damage, fire rate, reload time, magazine capacity, accuracy, range, headshot multiplier, recoil pattern, movement penalty, and ADS speed per weapon. XP configuration defines kill reward, assist reward, objective capture reward, win reward, and level thresholds. Match configuration defines duration, respawn time, score limits, and bot difficulty. Map configuration defines spawn points, objective zones, collision boundaries, and navigation grid per map. All configuration files are validated against Zod schemas at load time, with hot-reload capability in development and cached compiled versions in production.

---

## AI Bot System

### Phase 1: Grid-Based A*

Bots navigate using a grid-based A* pathfinding system baked per map. Each map defines a navigation grid with walkable and blocked cells. Bots calculate paths to objectives, enemies, or random waypoints. Combat behavior includes target acquisition within line of sight, basic aiming with configurable accuracy, firing when target is visible, and strafing while shooting. Difficulty settings adjust aim accuracy, reaction time, movement predictability, and target prioritization.

### Phase 2: Recast Navigation

If Phase 1 performance or behavior proves insufficient, upgrade to Recast Navigation for mesh-based pathfinding with more natural movement around obstacles and better handling of verticality.

---

## Phased Development Plan

### Phase 1: Playable MVP (Months 1-3)

Phase 1 delivers a complete playable multiplayer experience with 4-player FFA on a single map. Required systems include player registration and login, lobby creation and joining, 20Hz authoritative server, single map Rustpoint with basic procedural geometry, 3 classes Sentinel Phantom and Vanguard, 3 weapons Assault Rifle Sniper Rifle and Shotgun, basic shooting with hitscan detection, health and death with instant respawn, basic HUD with health ammo and kill feed, scoreboard and victory screen, client-side prediction and interpolation, and basic bot filling. Rendering includes directional lighting, shadow maps, fog, frustum culling, and instancing. Performance target is 60 FPS on mid-range hardware.

### Phase 2: Feature Expansion (Months 4-6)

Phase 2 expands to all 10 classes, all 10 weapons, all 3 maps, all 4 game modes, server browser with ping display, map voting after matches, killstreak medals, assist tracking, complete cosmetics system, level progression 1-100, private rooms with codes, bot difficulty settings, and settings menu with graphics audio and controls. Rendering adds bloom, improved shadows, and LOD switching. Performance target remains 60 FPS with all features active.

### Phase 3: Polish and Scale (Months 7-9)

Phase 3 focuses on optimization, stability, and community features. Work includes performance profiling and optimization, mobile browser compatibility research, additional cosmetics if community demands, tournament mode framework, replay system research, advanced bot behavior, and marketing website. Performance target expands to stable 60 FPS on integrated graphics at Low settings.

---

## Quality Standards

Every feature must satisfy maintainability through clean code and documentation, performance meeting or exceeding FPS targets, scalability handling maximum player counts, readability with consistent formatting and naming, documentation with inline comments and external docs, and testing with unit tests for critical systems. No duplicated systems, no unnecessary abstractions, and no premature optimization.

---

## Deployment

Local development uses Docker Compose with PostgreSQL, Redis, client dev server, and game server. Production deploys the frontend to Vercel with automatic builds on push, the backend to Render Railway Koyeb or Fly.io with environment variable configuration, the database to Neon PostgreSQL with connection pooling, and Redis to Upstash for session caching if needed. GitHub Actions runs linting, type checking, unit tests, and builds on every pull request. Successful builds on main branch trigger automatic deployment to staging. Manual promotion to production after staging verification.

---

## Success Criteria

NIGHTFALL succeeds when players can click to play within 5 seconds, maintain 60 FPS during 8-player matches, experience sub-100ms effective latency on same-continent servers, join matches through matchmaking or server browser, play all four game modes across all three maps, unlock cosmetics through level progression, and invite friends via room codes. The project ships as a fully playable browser FPS with clean architecture, comprehensive documentation, and a foundation for future expansion.

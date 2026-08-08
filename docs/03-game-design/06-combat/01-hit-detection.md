# Hit Detection
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Two resolution models, chosen per weapon (see 02-weapons/):

- **Hitscan** (Assault Rifle, Sniper Rifle, Shotgun, HMG, Tactical Rifle, SMG, Burst Rifle, Dual
  Pistols, Pistol): server casts a ray from the firing player's validated camera position/direction
  at the moment of fire, against player hitboxes and world geometry, and takes the first hit.
- **Projectile** (Rocket Launcher): server simulates a physical projectile via Rapier, resolving
  splash damage on impact against all players within radius.
- **Melee** (Katana): server performs a short-range lunge + capsule hit test in front of the
  attacking player.

**Hitboxes:** each player has a head hitbox (sphere, upper torso region) and a body hitbox
(capsule, full character extent). Head hits apply the weapon's headshot multiplier.

All hit resolution happens server-side during tick processing; the client only requests fire via
input messages and renders feedback (muzzle flash, hitmarker, sound) once the server confirms a hit
via an event message.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Resolving hits on the client and reporting the result** — The client must never say 'I hit player X' — it sends fire intent (aim direction, timestamp), and the server determines the outcome. This is the single most important cheat-prevention rule in the project (see 13-security/05-cheat-prevention.md).
- **Ignoring network latency in hit resolution** — Consider basic lag compensation (rewind hitboxes to the shooter's observed time) per 04-networking/06-latency-handling.md — naive 'resolve against current server state' hit detection feels unfair at real-world ping.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Game Design Philosophy
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Four pillars govern every design decision in NIGHTFALL. When a feature request conflicts with a
pillar, the pillar wins.

**Accessible** — Standard WASD + mouse controls, no advanced movement tech (no bunny-hopping,
slide-hopping, or momentum tricks), instant weapon switching, and a maximum 12-player lobby size.
A new player should be fully competent within one match.

**Fast** — 4-minute matches, instant respawin, and low time-to-kill weapons keep the pace high.
Menus prioritize "click to play" over configuration. Loading screens are short because there are no
external assets to download.

**Procedural** — Every visual (characters, weapons, maps, textures, particles) is generated from
primitive Three.js geometry and Canvas API textures at runtime. This is not a stylistic accident —
it is what allows a solo developer / small team to ship 10 classes, 11 weapons, and 3 maps without
a 3D art pipeline, licensing, or asset budget.

**Browser-native** — No installer, no launcher, no plugin. WebGL 2.0 and modern browser APIs only.
Anything that would require a native binary (e.g., anti-cheat kernel drivers) is out of scope by
definition.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding movement tech for 'game feel'** — Bunny-hopping, air-strafing, or momentum stacking contradicts the Accessible pillar even if it's common in genre peers. Do not add it without an explicit design doc change.
- **Reaching for a downloaded asset** — If a task seems to need a texture, model, or sound file, the correct implementation is procedural generation (Canvas API / primitive geometry / Web Audio synthesis), not a fetched or bundled asset file.

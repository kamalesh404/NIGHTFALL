# UI Design System
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Dark theme base with a per-class accent color used in class-selection stat cards and HUD class
icon. Typography: self-hosted Google Fonts (no CDN fetch at runtime, consistent with the no-external-
asset-dependency philosophy for anything gameplay-critical). Spacing and component patterns are
shared across all HTML/CSS overlay screens (menus, HUD, settings) via a shared CSS variable set,
not duplicated per screen.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Duplicating color/spacing values per screen** — Use shared CSS custom properties (design tokens) for color, spacing, and typography so a theme change is a single edit.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Melee Skins
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

Default, obsidian, gold, frost, and plasma — Katana-exclusive, since it's the only true melee weapon in the roster.

Unlock levels and item IDs are authoritative in `packages/config/cosmetics.json`, validated by the
Zod schema in `packages/protocol/schemas/cosmetic.schema.ts`. Ownership per player lives in
`PlayerProgression.unlocks` (JSON map), never a separate purchasable-inventory table — there is no
economy in NIGHTFALL.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Applying a cosmetic without an unlock check** — Selecting a cosmetic in the class selection / settings UI must verify the item exists in the player's unlocked set before equipping — client-side UI gating alone is not sufficient; the server must also validate on cosmetic-selection messages.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

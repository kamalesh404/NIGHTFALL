# Difficulty Levels
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Easy / Normal / Hard multipliers (defined in `packages/config/bots.json`) adjust: aim accuracy
(error cone size), reaction time (delay before engaging a newly-visible target), movement
predictability (how often the bot varies its strafe pattern), and target prioritization
sophistication. Difficulty is set per lobby/room, not globally.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Hardcoding difficulty multipliers in bot logic** — Same rule as everywhere else — difficulty tuning belongs in config, read generically by one bot controller.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

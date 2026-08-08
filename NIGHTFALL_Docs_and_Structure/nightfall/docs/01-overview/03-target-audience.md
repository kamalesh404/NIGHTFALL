# Target Audience
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

NIGHTFALL is designed for three overlapping groups:

1. **Casual FPS players** who want short, low-commitment sessions without downloading a client.
2. **Browser gamers** already familiar with the io-game / Krunker-adjacent genre, who expect
   instant matchmaking and simple progression.
3. **Friend groups** who want to jump into a private lobby together via a shareable room code
   without account friction (guest mode is a first-class path, not an afterthought).

Implications for implementation: the "instant play" button must be the most prominent menu action,
guest accounts must work end-to-end (matchmaking, stats tracked locally, no forced sign-up wall),
and private room codes must be short, shareable, and typo-tolerant (see 04-networking/08-private-rooms.md).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Gating play behind account creation** — Guest mode must reach a live match with zero account setup. Any flow that blocks matchmaking on registration is a regression against this audience.

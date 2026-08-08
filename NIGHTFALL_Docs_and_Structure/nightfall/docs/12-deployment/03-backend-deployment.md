# Backend Deployment
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Server deploys to Render, Railway, Koyeb, or Fly.io (any one, chosen per cost/availability at
deploy time) as a long-running Node process (Socket.IO requires persistent connections, ruling out
pure serverless functions for the game server). Environment variables configured per platform;
health-check endpoint required for the platform's uptime monitor.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Deploying the Socket.IO server as a serverless function** — Serverless platforms that recycle instances per-request are incompatible with persistent Socket.IO connections and in-memory MatchRoom state — the game server must be a long-running process.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

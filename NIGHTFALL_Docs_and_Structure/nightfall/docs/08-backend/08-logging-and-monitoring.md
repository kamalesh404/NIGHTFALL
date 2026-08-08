# Logging and Monitoring
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1


Pino provides structured JSON logs for all server events, shipped to Better Stack for search/
alerting. Prometheus scrapes metrics (player count, match duration, CPU, memory, request latency);
Grafana dashboards visualize them. Sentry captures client and server errors with stack traces and
context (redacting sensitive fields per 13-security/06-data-privacy.md).
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Logging PII or secrets** — Never log passwords, full JWTs, or email addresses in plaintext at info/debug level — redact or hash before logging.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

# Database Schema
> **Status:** Locked  
> **Owner:** Solo dev / small team  
> **Relevant phase:** Phase 1

PostgreSQL via Prisma. Four core models, kept intentionally small per the "no economy" design
pillar.

```prisma
model Player {
  id           String   @id @default(uuid())
  username     String   @unique
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  lastLoginAt  DateTime?
  stats        PlayerStats?
  progression  PlayerProgression?
  matches      MatchParticipant[]
}

model PlayerStats {
  playerId      String @id
  player        Player @relation(fields: [playerId], references: [id])
  kills         Int    @default(0)
  deaths        Int    @default(0)
  assists       Int    @default(0)
  headshots     Int    @default(0)
  matchesPlayed Int    @default(0)
  matchesWon    Int    @default(0)
  playtimeSec   Int    @default(0)
}

model PlayerProgression {
  playerId   String @id
  player     Player @relation(fields: [playerId], references: [id])
  level      Int    @default(1)
  xp         Int    @default(0)
  unlocks    Json   // { headId: string[], dyeId: string[], skinId: string[], meleeSkinId: string[] }
}

model Match {
  id           String   @id @default(uuid())
  map          String
  mode         String
  startedAt    DateTime @default(now())
  durationSec  Int
  participants MatchParticipant[]
}

model MatchParticipant {
  id        String  @id @default(uuid())
  matchId   String
  playerId  String?
  match     Match   @relation(fields: [matchId], references: [id])
  player    Player? @relation(fields: [playerId], references: [id])
  classId   String
  kills     Int
  deaths    Int
  assists   Int
  placement Int
}
```

Guest players never get a `Player` row — their stats live client-side only (localStorage), per
03-target-audience.md. `MatchParticipant.playerId` is nullable specifically to allow bots and
guests to appear in match history rows without a foreign account.
## AI Agent Failure Modes & Implementation Guardrails

Common mistakes AI coding agents make on this file's subject area, and the guardrail to enforce instead:

- **Adding currency/inventory tables** — There is no economy. Cosmetic ownership is a JSON unlock map keyed by level milestone, not a purchasable inventory system — don't model it as one.
- **Making playerId non-nullable on MatchParticipant** — This breaks bot and guest match history rows; keep it nullable.
- **Silent scope creep** — The agent adds fields, endpoints, or systems not specified in this doc 'for completeness.' Only implement what is written here or in packages/config; flag gaps as questions instead of inventing scope.
- **Client-trusting logic** — Any rule that affects score, health, or economy must be enforced server-side. If an agent finds itself writing validation only in client code, that is a bug.

import { z } from "zod";

/**
 * Schema for packages/config/combat.json
 * Cross-weapon combat constants not tied to a single weapon entry.
 * See docs/03-game-design/06-combat/06-melee-combat.md.
 */
export const CombatConfigSchema = z.object({
  /** Damage dealt by the contextual melee slash (non-Katana classes) */
  meleeDamage: z.number().nonnegative(),
  /** Cooldown in seconds between contextual melee slashes */
  meleeCooldownSec: z.number().nonnegative(),
  /** Reach in meters of the melee hit test (except Katana, uses its own range) */
  meleeRange: z.number().positive(),
  /** Assist threshold: damage dealt to a victim who dies within assistWindowSec */
  assistDamageThreshold: z.number().nonnegative(),
  /** Time window in seconds for an assist to count */
  assistWindowSec: z.number().positive(),
  /** Killstreak medal window: kills within this many seconds chain */
  killstreakWindowSec: z.number().positive(),
});

export type CombatConfig = z.infer<typeof CombatConfigSchema>;

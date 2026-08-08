import {
  ClassesConfigSchema,
  CombatConfigSchema,
  MatchConfigSchema,
  MovementConfigSchema,
  WeaponsConfigSchema,
  XpConfigSchema,
  type ClassesConfig,
  type ClassConfig,
  type CombatConfig,
  type MatchConfig,
  type MovementConfig,
  type WeaponsConfig,
  type XpConfig,
} from "@nightfall/protocol";

import classesData from "../data/classes.json";
import weaponsData from "../data/weapons.json";
import movementData from "../data/movement.json";
import matchData from "../data/match.json";
import combatData from "../data/combat.json";
import xpData from "../data/xp.json";

export interface NightfallConfig {
  classes: ClassesConfig;
  weapons: WeaponsConfig;
  movement: MovementConfig;
  match: MatchConfig;
  combat: CombatConfig;
  xp: XpConfig;
}

/**
 * Loads and validates every config file against its Zod schema.
 * A config that fails validation throws and prevents server boot
 * (fail loudly, not silently — docs/10-configuration/01-config-system-overview.md).
 */
export function loadConfig(): NightfallConfig {
  const config: NightfallConfig = {
    classes: ClassesConfigSchema.parse(classesData),
    weapons: WeaponsConfigSchema.parse(weaponsData),
    movement: MovementConfigSchema.parse(movementData),
    match: MatchConfigSchema.parse(matchData),
    combat: CombatConfigSchema.parse(combatData),
    xp: XpConfigSchema.parse(xpData),
  };
  validateCrossReferences(config);
  return config;
}

/**
 * Cross-file integrity checks that individual Zod parses cannot express.
 * A config that fails here also prevents server boot (fail loudly).
 */
function validateCrossReferences(config: NightfallConfig): void {
  // Record keys must match each entry's own id.
  for (const [key, cls] of Object.entries(config.classes)) {
    assertIdMatchesKey("class", key, cls.id);
  }
  for (const [key, weapon] of Object.entries(config.weapons)) {
    assertIdMatchesKey("weapon", key, weapon.id);
  }

  // Every class primary/secondary weapon must exist in the weapons config.
  for (const cls of Object.values(config.classes)) {
    assertWeaponExists(config, cls, cls.primaryWeapon, "primary");
    if (cls.secondaryWeapon !== null) {
      assertWeaponExists(config, cls, cls.secondaryWeapon, "secondary");
    }
  }
}

function assertIdMatchesKey(kind: string, key: string, id: string): void {
  if (key !== id) {
    throw new Error(
      `Config integrity error: ${kind} record key "${key}" does not match its id "${id}".`,
    );
  }
}

function assertWeaponExists(
  config: NightfallConfig,
  cls: ClassConfig,
  weaponId: string,
  slot: string,
): void {
  const weapon = config.weapons[weaponId];
  if (!weapon) {
    throw new Error(
      `Config integrity error: class "${cls.id}" references missing ${slot} weapon "${weaponId}".`,
    );
  }
  if (weapon.slot !== slot) {
    throw new Error(
      `Config integrity error: class "${cls.id}" ${slot} weapon "${weaponId}" has slot "${weapon.slot}".`,
    );
  }
}

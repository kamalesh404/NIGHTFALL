import { z } from "zod";

/**
 * Schema for packages/config/classes.json
 * Defines, per class: HP, speed multiplier, secondary weapon availability,
 * and primary weapon assignment. See docs/10-configuration/02-class-config.md.
 */
export const ClassConfigSchema = z.object({
  /** Unique machine id, e.g. "sentinel" */
  id: z.string().min(1),
  /** Display name, e.g. "Sentinel" */
  name: z.string().min(1),
  /** Combat role label, e.g. "Frontline" */
  role: z.string().min(1),
  /** Base health pool */
  hp: z.number().int().positive(),
  /** Movement speed multiplier applied on top of base speed */
  speedMultiplier: z.number().positive(),
  /** Primary weapon id (see weapons.json). Fixed per class by design. */
  primaryWeapon: z.string().min(1),
  /** Secondary weapon id, or null when the class has no secondary */
  secondaryWeapon: z.string().min(1).nullable(),
});

/** All classes keyed by class id. */
export const ClassesConfigSchema = z.record(ClassConfigSchema);

export type ClassConfig = z.infer<typeof ClassConfigSchema>;
export type ClassesConfig = z.infer<typeof ClassesConfigSchema>;

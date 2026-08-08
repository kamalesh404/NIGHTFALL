import type { Aabb, Vec3 } from "./types";

/** Small, allocation-light vector/AABB helpers. All pure and deterministic. */

export function vec3(x: number, y: number, z: number): Vec3 {
  return { x, y, z };
}

export function cloneVec3(v: Vec3): Vec3 {
  return { x: v.x, y: v.y, z: v.z };
}

export function addVec3(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function scaleVec3(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

export function lengthVec3(v: Vec3): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

/** Normalized copy, or a zero vector when the input is (near) zero. */
export function normalizeVec3(v: Vec3): Vec3 {
  const len = lengthVec3(v);
  if (len === 0) {
    return vec3(0, 0, 0);
  }
  return scaleVec3(v, 1 / len);
}

export function aabbOverlap(a: Aabb, b: Aabb): boolean {
  return (
    a.min.x < b.max.x &&
    a.max.x > b.min.x &&
    a.min.y < b.max.y &&
    a.max.y > b.min.y &&
    a.min.z < b.max.z &&
    a.max.z > b.min.z
  );
}

/**
 * Player footprint as an AABB centered horizontally on `position` (feet at
 * position.y, standing `height` tall).
 */
export function playerAabb(position: Vec3, radius: number, height: number): Aabb {
  return {
    min: vec3(position.x - radius, position.y, position.z - radius),
    max: vec3(position.x + radius, position.y + height, position.z + radius),
  };
}

/** Clamp a value into [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

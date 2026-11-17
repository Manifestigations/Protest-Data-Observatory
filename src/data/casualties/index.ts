/* Barrel for the casualty domain. `assertCasualties()` runs on import so the
 * bundle cannot ship a broken reconciliation. */

import { assertCasualties } from "./checks.ts";

assertCasualties();

export * from "./cases.ts";
export * from "./estimate.ts";
export * from "./inputs.ts";
export * from "./levels.ts";
export * from "./types.ts";
export * from "./universe.ts";
export * from "./vocabulary.ts";

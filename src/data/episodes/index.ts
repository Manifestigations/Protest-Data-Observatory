/* ── Episode registry ────────────────────────────────────────────────────────
   Order is display order: it fixes the panel order in section C, the RAMP
   colour index in the companion trellis, and the x-axis of section E. Do not
   reorder, and never sort by date. */

import type { Episode } from "../../model/index.ts";
import { MAY68 } from "./mai68.ts";
import { CPE } from "./cpe.ts";
import { GILETS } from "./gilets-jaunes.ts";
import { NAHEL } from "./nahel.ts";
import { PENSIONS } from "./retraites.ts";
import { BLOQUONS } from "./bloquons.ts";
import { STUDENTS } from "./students.ts";
export { GILETS, GJ_ACTS, GJ_EXTRA } from "./gilets-jaunes.ts";
export { NAHEL } from "./nahel.ts";
export { PENSIONS } from "./retraites.ts";
export { BLOQUONS } from "./bloquons.ts";
export { STUDENTS } from "./students.ts";

export const EPISODES: readonly Episode[] = [
  MAY68,
  CPE,
  GILETS,
  NAHEL,
  PENSIONS,
  BLOQUONS,
  STUDENTS,
];

/** The cap for the companion trellis is the largest week INDEX at which any
 *  episode carries an arrest or injury figure — not the latest date. That is
 *  w11 (6 Apr 2023, pensions: 111 arrests, 154 police injured). The 2026
 *  episode runs its enforcement from w2 (28 Sep) to w8 (9 Nov). */
export const ENFORCEMENT_LAST = EPISODES.reduce(
  (last, ep) =>
    ep.weeks.reduce(
      (l, r) =>
        r.a !== undefined || r.f !== undefined || r.i !== undefined
          ? Math.max(l, r.w)
          : l,
      last,
    ),
  0,
);

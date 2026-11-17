/* ── src/data/casualties/levels.ts — severity rows ──────────────────────────
   Sections A and B. The 1,167 / 1,233 split is the only published light share
   in the dataset.

   The movement-wide row is the decomposition from estimate.ts and the only row
   whose cells are bands rather than counts. Its three cells partition the
   1,580 because they are derived from one another, which is not the same as
   being a distribution: no value inside a band is more likely than another.
 */

import { NOT_LIGHT, NOT_LIGHT_MOVEMENT, SERIOUS_MOVEMENT } from "./estimate.ts";
import { FORCES } from "./inputs.ts";
import type { SevRow } from "./types.ts";

export const SEVERITY_LEVELS: readonly SevRow[] = [
  {
    /* 1,167 / 1,233 = 94.65% → the 94.6% the file itself states. Serious is
       bounded 0–66 because serious ⊆ not-light and the file has no class of
       its own: that is a structural bound, not a count. */
    id: "crsOctober",
    population: "forces",
    total: { s: "n", v: 1_233 },
    serious: { s: "r", lo: 0, hi: NOT_LIGHT, d: true },
    light: { s: "n", v: 1_167 },
    other: { s: "n", v: NOT_LIGHT, d: true },
    sources: ["mediapart-crs-blesses-1311"],
  },
  {
    /* Published level at the peak: 7 serious out of 1,144. */
    id: "forcesPeak",
    population: "forces",
    total: { s: "n", v: FORCES.stock17Oct },
    serious: { s: "n", v: FORCES.serious17Oct },
    light: { s: "x", why: "notPublished" },
    other: { s: "x", why: "notPublished" },
    sources: ["bfmtv-bilan-17oct"],
  },
  {
    /* The movement total, decomposed in estimate.ts (E3, E4, E6). */
    id: "forcesMovement",
    population: "forces",
    total: { s: "n", v: FORCES.movement },
    serious: {
      s: "r",
      lo: SERIOUS_MOVEMENT.lo,
      hi: SERIOUS_MOVEMENT.hi,
      d: true,
    },
    light: {
      s: "r",
      lo: FORCES.movement - NOT_LIGHT_MOVEMENT.hi,
      hi: FORCES.movement - NOT_LIGHT_MOVEMENT.lo,
      d: true,
    },
    other: {
      s: "r",
      lo: NOT_LIGHT_MOVEMENT.lo - SERIOUS_MOVEMENT.hi,
      hi: NOT_LIGHT_MOVEMENT.hi - SERIOUS_MOVEMENT.lo,
      d: true,
    },
    sources: ["bfmtv-bilan-17oct", "mediapart-crs-blesses-1311"],
  },
  {
    /* A register, not a rate: no total has ever been published, so no share can
       exist on this row. The serious cell is a documented floor. */
    id: "protesters",
    population: "protesters",
    participation: "participating",
    total: { s: "x", why: "noDenominator" },
    serious: { s: "f", v: THINES_FLOOR() },
    light: { s: "x", why: "noDenominator" },
    other: { s: "x", why: "registerOnly" },
    sources: ["lemonde-blessures-0511"],
  },
];

/* A literal, not THINES.seriousTo5Nov + THINES.deathsTo5Nov: the sum is
   asserted in checks.ts, so an input edited without this line fails the build.
   That check runs at import, not at compile time. */
function THINES_FLOOR(): number {
  return 79; // 78 serious + 1 death, register to 5 Nov
}

export const SEVERITY_WEEKS: readonly SevRow[] = [
  {
    id: "week12oct",
    population: "forces",
    total: { s: "n", v: 207, d: true },
    serious: { s: "n", v: 7 },
    light: { s: "x", why: "notPublished" },
    other: { s: "x", why: "notPublished" },
    sources: ["bfmtv-bilan-17oct"],
  },
  {
    id: "week19oct",
    population: "forces",
    total: { s: "n", v: 267, d: true },
    serious: { s: "x", why: "notPublished" },
    light: { s: "x", why: "notPublished" },
    other: { s: "x", why: "notPublished" },
    sources: ["bfmtv-bilan-17oct"],
  },
  {
    id: "week26oct",
    population: "forces",
    total: { s: "n", v: 116, d: true },
    serious: { s: "x", why: "notPublished" },
    light: { s: "x", why: "notPublished" },
    other: { s: "x", why: "notPublished" },
    sources: ["bfmtv-bilan-17oct"],
  },
  {
    id: "week2nov",
    population: "forces",
    total: { s: "n", v: 53 },
    serious: { s: "x", why: "notPublished" },
    light: { s: "x", why: "notPublished" },
    other: { s: "x", why: "notPublished" },
    sources: ["bfmtv-bilan-17oct"],
  },
  {
    id: "crsOctober",
    population: "forces",
    total: { s: "n", v: 1_233 },
    serious: { s: "r", lo: 0, hi: NOT_LIGHT, d: true },
    light: { s: "n", v: 1_167 },
    other: { s: "n", v: NOT_LIGHT, d: true },
    sources: ["mediapart-crs-blesses-1311"],
  },
];

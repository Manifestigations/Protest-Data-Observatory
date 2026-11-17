/* ── src/data/casualties/estimate.ts — the estimators ────────────────────────
   Each one derives from inputs.ts and carries its own arithmetic, its edge
   types and its assumptions, so the renderer can print the derivation
   rather than the answer alone.

   Capture–recapture is deliberately absent: the lists (Thines, education
   ministry, street medics) are not independent — the register is itself
   built from press and IGPN referrals — and exactly one overlap case is
   identifiable. The mix is therefore solved by constraint: nesting, subset
   relations and one donor rate. */

import {
  CIVILIANS_24OCT,
  CRS_OCTOBER,
  FORCES,
  THINES,
  TOULOUSE,
} from "./inputs.ts";
import type { Estimate, MixBand, SensitivityRow } from "./types.ts";

const round = Math.round;
const n = (x: number) => x.toLocaleString("en-GB");

/* ── Primitives ────────────────────────────────────────────────────────────── */

/** 1,233 − 1,167 = 66 */
export const NOT_LIGHT = CRS_OCTOBER.declared - CRS_OCTOBER.light;

/** 1,580 − 1,144 = 436 injuries after the peak consolidation. */
export const POST_PEAK = FORCES.movement - FORCES.stock17Oct;

/** 66 ÷ 1,233 = 5.35 % */
export const NOT_LIGHT_SHARE = NOT_LIGHT / CRS_OCTOBER.declared;

/** 7 ÷ 1,144 = 0.61 % */
export const SERIOUS_SHARE_17 = FORCES.serious17Oct / FORCES.stock17Oct;

/** All-forces injuries in October = 31 Oct stock − 30 Sep stock. */
export const OCTOBER_ALL_FORCES = {
  lo: FORCES.stock31Oct.lo - FORCES.stock30Sep,
  hi: FORCES.stock31Oct.hi - FORCES.stock30Sep,
} as const;

/* ── E3, E4: movement-wide decomposition ───────────────────────────────────── */

export const SERIOUS_MOVEMENT = {
  /* Published: 7 serious at the 17 Oct consolidation. A count, not a rate. */
  lo: FORCES.serious17Oct,
  /* Rate transfer: 1,580 × (7 / 1,144) = 9.67 → 10. Assumes the 0.61 %
     severity measured at the peak held all movement. Whether it did cannot be
     checked: the ministry published a severity split once, at the peak. */
  central: round(FORCES.movement * SERIOUS_SHARE_17),
  /* Ceiling: 7 + 436 × (66 / 1,233) = 7 + 23 = 30. Applies the not-light rate
     to the injuries after the peak as though every one could have been
     serious. It is the largest number the data does not exclude, not a
     plausible one: a ceiling, not an estimate. */
  hi: FORCES.serious17Oct + round(POST_PEAK * NOT_LIGHT_SHARE),
} as const;

export const NOT_LIGHT_MOVEMENT = {
  /** 66 is the CRS October actual, a subset of the movement total. */
  lo: NOT_LIGHT,
  /** Rate transfer: 1,580 × 5.35 % = 84.6 → 85. */
  central: round(FORCES.movement * NOT_LIGHT_SHARE),
  hi: round(FORCES.movement * NOT_LIGHT_SHARE),
} as const;

/* ── The mix of the 1,580 — three exclusive bands ─────────────────────────── */

/**
 * Three bands that cannot overlap: light, residual (not light, not serious),
 * serious. They partition the 1,580, so their centrals add up to it by
 * construction — light central is the remainder, not an estimate.
 *
 * These are bands, not point estimates. Interval arithmetic gives the worst
 * case in each direction: the smallest possible light count comes from the
 * largest possible non-light count, which is why lo and hi are built from
 * opposite ends of the same input. Vaguer inputs therefore widen a band
 * instead of nudging a number.
 *
 * Nothing inside a band is more likely than anything else — the band is two
 * published counts, not a distribution — so these are not shares of a
 * population and the centrals must not be averaged with anything.
 */
export const MIX: readonly MixBand[] = [
  {
    id: "light",
    lo: FORCES.movement - NOT_LIGHT_MOVEMENT.hi, // 1,495
    hi: FORCES.movement - NOT_LIGHT_MOVEMENT.lo, // 1,514
    central: FORCES.movement - NOT_LIGHT_MOVEMENT.hi, // 1,495
  },
  {
    id: "residual",
    lo: NOT_LIGHT_MOVEMENT.lo - SERIOUS_MOVEMENT.hi, // 36
    hi: NOT_LIGHT_MOVEMENT.hi - SERIOUS_MOVEMENT.lo, // 78
    central: NOT_LIGHT_MOVEMENT.hi - SERIOUS_MOVEMENT.central, // 75
  },
  {
    id: "serious",
    lo: SERIOUS_MOVEMENT.lo, // 7
    hi: SERIOUS_MOVEMENT.hi, // 30
    central: SERIOUS_MOVEMENT.central, // 10
  },
];

/** 1,495 ÷ 1,580 = 94.62 % — reproduces the CRS file's own 94.6 %. */
export const LIGHT_CENTRAL_SHARE = MIX[0].central / FORCES.movement;

/* ── E8, E10: treated-per-serious sensitivity ──────────────────────────────── */

/**
 * r = people treated per serious case.
 *
 * `mid` mixes two sources: Toulouse treated (130) ÷ Thines serious cases at
 * 17 Oct (54) = 2.41 → 2. That is BELOW `lo` (5), so `mid` falls outside the
 * band it belongs to — an inconsistency in the literature input, not a
 * rounding effect. Nothing asserts lo ≤ mid ≤ hi, and E8 reads only the
 * bounds, so the band is what gets published. Do not cite `mid` as a central
 * estimate until the anchor is resolved.
 *
 * E8 is the reciprocal 1 / r, which is why its band is written with the ends
 * swapped: { lo: 1 / hi, hi: 1 / lo }. One divided by a number in [5, 30] is a
 * share in [3.3 %, 20 %], and the ends flip because 1 / x falls as x rises.
 * A swap in the wrong direction yields a band that looks plausible and is
 * exactly inverted.
 */
export const RATIO = {
  lo: 5,
  mid: round(TOULOUSE.treated / THINES.seriousAt17Oct),
  hi: 30,
} as const;

/**
 * Scenario table, one row per candidate r: how many people would have to have
 * been treated for the register's counts to hold.
 *
 * A sensitivity sweep is neither an interval nor a distribution. Nothing says
 * which r is right, the five rows are five what-ifs, and averaging them or
 * quoting the middle one would invent a weighting the data does not have. The
 * page prints all five and lets the reader choose.
 */
export const SENSITIVITY: readonly SensitivityRow[] = [5, 10, 13, 20, 30].map(
  (ratio) => ({
    ratio,
    at17Oct: THINES.seriousAt17Oct * ratio,
    movement: THINES.seriousTo5Nov * ratio,
  }),
);

/* ── The estimators ────────────────────────────────────────────────────────── */

export const ESTIMATES: readonly Estimate[] = [
  {
    id: "E1",
    key: "crsSeriousShare",
    population: "forces",
    unit: "share",
    value: { lo: 0, hi: NOT_LIGHT_SHARE },
    loEdge: "bound",
    hiEdge: "ceiling",
    arithmetic: `0 ÷ ${n(CRS_OCTOBER.declared)} = 0%; ${n(NOT_LIGHT)} ÷ ${n(CRS_OCTOBER.declared)} = 5.35%`,
    assumptions: ["seriousSubsetOfNotLight"],
    sources: ["mediapart-crs-blesses-1311"],
    status: "publishable",
    flag: "e",
  },
  {
    id: "E2",
    key: "forcesSeriousShare17",
    population: "forces",
    unit: "share",
    value: { lo: SERIOUS_SHARE_17, hi: SERIOUS_SHARE_17 },
    loEdge: "published",
    hiEdge: "published",
    arithmetic: `${n(FORCES.serious17Oct)} ÷ ${n(FORCES.stock17Oct)} = 0.61%`,
    assumptions: [],
    sources: ["bfmtv-bilan-17oct"],
    status: "publishable",
    flag: "n",
  },
  {
    id: "E3",
    key: "forcesSeriousCount",
    population: "forces",
    unit: "count",
    value: SERIOUS_MOVEMENT,
    loEdge: "published",
    hiEdge: "ceiling",
    arithmetic: `${n(FORCES.serious17Oct)}; ${n(FORCES.movement)} × (7 ÷ ${n(FORCES.stock17Oct)}) = ${SERIOUS_MOVEMENT.central}; 7 + ${n(POST_PEAK)} × (${n(NOT_LIGHT)} ÷ ${n(CRS_OCTOBER.declared)}) = ${SERIOUS_MOVEMENT.hi}`,
    assumptions: ["rateTransfer", "seriousSubsetOfNotLight"],
    sources: ["bfmtv-bilan-17oct", "mediapart-crs-blesses-1311"],
    status: "publishable",
    flag: "e",
  },
  {
    id: "E4",
    key: "forcesNotLightCount",
    population: "forces",
    unit: "count",
    value: NOT_LIGHT_MOVEMENT,
    loEdge: "bound",
    hiEdge: "transfer",
    arithmetic: `${n(NOT_LIGHT)}; ${n(FORCES.movement)} × (${n(NOT_LIGHT)} ÷ ${n(CRS_OCTOBER.declared)}) = ${NOT_LIGHT_MOVEMENT.hi}`,
    assumptions: ["rateTransfer", "crsDominatesOctober"],
    sources: ["mediapart-crs-blesses-1311"],
    status: "publishable",
    flag: "e",
  },
  {
    id: "E5",
    key: "crsShareOfForces",
    population: "forces",
    unit: "share",
    value: {
      lo: CRS_OCTOBER.declared / OCTOBER_ALL_FORCES.hi,
      hi: CRS_OCTOBER.declared / OCTOBER_ALL_FORCES.lo,
    },
    loEdge: "bound",
    hiEdge: "bound",
    arithmetic: `${n(CRS_OCTOBER.declared)} ÷ ${n(OCTOBER_ALL_FORCES.hi)} … ${n(CRS_OCTOBER.declared)} ÷ ${n(OCTOBER_ALL_FORCES.lo)}`,
    assumptions: ["crsDominatesOctober", "declarationsNotPersons"],
    sources: ["mediapart-crs-blesses-1311"],
    status: "note",
    flag: "e",
  },
  {
    id: "E6",
    key: "seriousShareMovement",
    population: "all",
    unit: "share",
    value: {
      lo: SERIOUS_MOVEMENT.lo / FORCES.movement,
      hi: SERIOUS_MOVEMENT.hi / FORCES.movement,
      central: SERIOUS_MOVEMENT.central / FORCES.movement,
    },
    loEdge: "published",
    hiEdge: "ceiling",
    arithmetic: `7 ÷ ${n(FORCES.movement)} = 0.44%; 30 ÷ ${n(FORCES.movement)} = 1.90%`,
    assumptions: ["rateTransfer", "seriousSubsetOfNotLight"],
    sources: ["bfmtv-bilan-17oct", "mediapart-crs-blesses-1311"],
    status: "publishable",
    flag: "e",
  },
  {
    /* A register count with no denominator: 79 documented cases is a floor.
       The band is [79, 79] only because the renderer has no infinity, and
       hiEdge "unbounded" is what says the top is unknown. These two numbers
       are not a range and must never be printed as "79 to 79". */
    id: "E7",
    key: "protestersSeriousFloor",
    population: "protesters",
    unit: "count",
    value: {
      lo: THINES.seriousTo5Nov + THINES.deathsTo5Nov,
      hi: THINES.seriousTo5Nov + THINES.deathsTo5Nov,
    },
    loEdge: "floor",
    hiEdge: "unbounded",
    arithmetic: `${n(THINES.seriousTo5Nov)} + ${n(THINES.deathsTo5Nov)} = ${n(THINES.seriousTo5Nov + THINES.deathsTo5Nov)}`,
    assumptions: ["registerSelection"],
    sources: ["lemonde-blessures-0511"],
    status: "publishable",
    flag: "f",
  },
  {
    id: "E8",
    key: "protestersSeriousShare",
    population: "protesters",
    unit: "share",
    value: { lo: 1 / RATIO.hi, hi: 1 / RATIO.lo },
    loEdge: "bound",
    hiEdge: "bound",
    arithmetic: `1 ÷ ${RATIO.hi} = 3.3%; 1 ÷ ${RATIO.lo} = 20% (r ∈ [${RATIO.lo}, ${RATIO.hi}])`,
    assumptions: ["treatedPerSerious", "registerSelection"],
    sources: ["lemonde-blessures-0511", "mediacites-toulouse-17oct"],
    status: "note",
    flag: "e",
  },
  {
    id: "E9",
    key: "bystandersSerious",
    population: "bystanders",
    unit: "count",
    why: "notEstimable",
    loEdge: "unbounded",
    hiEdge: "unbounded",
    arithmetic:
      "no count exists: the register tracks protesters only, and the ministry counts carry no severity tag",
    assumptions: ["registerSelection"],
    sources: [],
    status: "gap",
  },
];

/**
 * Single-day civilian proxy: serious ÷ injured in the Interior Ministry's
 * release, 3 / 150 = 2.0 %. One day, no register, no denominator beyond the
 * injured count — compare with E8's register share, which has neither.
 */
export const CIVILIAN_PROXY_SHARE =
  CIVILIANS_24OCT.serious / CIVILIANS_24OCT.injured; // 3 / 150 = 2.0 %

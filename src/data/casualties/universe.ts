/* The universe layer. Every injury number the site holds is tagged with the
 * population it counts and how that population was selected.
 *
 * The rule applied here (from the brief):
 *   · injured WHILE protesting            → protesters
 *   · injured BY protesters or police
 *     while not participating              → bystanders
 *   · education-ministry counts            → educationDeclared, participation
 *                                            unknown, because the ministry's own
 *                                            wording splits them between
 *                                            accidental, caused by "troublemakers"
 *                                            and caused by police
 *   · one-day all-cause civilian counts    → mixed, participation unknown
 */

import {
  CIVILIANS_24OCT,
  EDUCATION,
  FORCES,
  THINES,
  TOULOUSE,
} from "./inputs.ts";
import type { InjuryObs, Population } from "./types.ts";

export const POPULATION_ORDER: readonly Population[] = [
  "forces",
  "protesters",
  "bystanders",
  "educationDeclared",
  "mixed",
];

export const OBSERVATIONS: readonly InjuryObs[] = [
  {
    id: "edu29",
    date: "2026-09-29",
    population: "educationDeclared",
    participation: "unknown",
    selection: "official",
    window: "day",
    count: { s: "n", v: EDUCATION.d29 },
    sources: [],
  },
  {
    id: "edu30",
    date: "2026-09-30",
    population: "educationDeclared",
    participation: "unknown",
    selection: "official",
    window: "movement",
    count: { s: "n", v: EDUCATION.d30, d: true },
    sources: [],
  },
  {
    id: "edu01",
    date: "2026-10-01",
    population: "educationDeclared",
    participation: "unknown",
    selection: "official",
    window: "movement",
    count: { s: "n", v: EDUCATION.d01, d: true },
    sources: [],
  },
  {
    id: "edu05",
    date: "2026-10-05",
    population: "educationDeclared",
    participation: "unknown",
    selection: "official",
    window: "movement",
    count: { s: "n", v: EDUCATION.d05 },
    sources: [],
  },
  {
    /* 1 proviseur, 1 parent d'élève, 1 agent de la Région — the repo's own
       comment says these are "not protesters". Moved out of protesterInjured. */
    id: "reg12",
    date: "2026-10-12",
    population: "bystanders",
    participation: "non-participating",
    selection: "regional",
    window: "day",
    count: { s: "n", v: 3, regional: true },
    sources: [],
  },
  {
    /* 54 serious + 1 death; register only, so no denominator exists. */
    id: "thines17",
    date: "2026-10-17",
    population: "protesters",
    participation: "participating",
    selection: "register",
    window: "movement",
    count: { s: "f", v: THINES.seriousAt17Oct + THINES.deathsTo5Nov },
    sources: THINES.sources,
  },
  {
    id: "toulouse17",
    date: TOULOUSE.date,
    population: "protesters",
    participation: "participating",
    selection: "treated",
    window: "day",
    count: { s: "n", v: TOULOUSE.treated },
    sources: TOULOUSE.sources,
  },
  {
    id: "civ24",
    date: "2026-10-24",
    population: "mixed",
    participation: "unknown",
    selection: "official",
    window: "day",
    count: { s: "n", v: CIVILIANS_24OCT.injured },
    sources: CIVILIANS_24OCT.sources,
  },
  {
    id: "thines05",
    date: "2026-11-05",
    population: "protesters",
    participation: "participating",
    selection: "register",
    window: "movement",
    count: { s: "f", v: THINES.seriousTo5Nov + THINES.deathsTo5Nov },
    sources: THINES.sources,
  },
  {
    id: "legal05",
    date: "2026-11-05",
    population: "protesters",
    participation: "participating",
    selection: "legal",
    window: "movement",
    count: { s: "f", v: 18 },
    sources: [],
  },
];

/** Bystanders: the 12 Oct cell is the only count that exists, it is regional,
 *  and nothing counts the national total or a severity split. */
export const BYSTANDER_CELLS = {
  documented: { s: "n", v: 3, regional: true } as const,
  serious: { s: "x", why: "notEstimable" } as const,
  national: { s: "x", why: "notPublished" } as const,
};

/** Force totals used by the estimator, kept next to the observations so the
 *  population table and the estimands cannot drift apart. */
export const FORCE_CARRIER = {
  total: FORCES.movement,
  declared: FORCES.stock17Oct,
  serious: FORCES.serious17Oct,
} as const;

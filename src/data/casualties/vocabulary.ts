/* The severity ladder: an editorial mapping of published labels onto an ordinal
 * scale aligned with MAIS, because MAIS 3+ is the threshold Eurostat and ONISR
 * already use for "serious".
 *
 * This is NOT clinical coding and NOT an injury score. No record in this dataset
 * has an injury description, a vital sign or an ICD code, so ISS/NISS/TRISS are
 * not computable and must not be implied.
 *
 * Two rules, both enforced below:
 *   1. a rung is a RANGE of ordinals, never a point;
 *   2. "not classed light" is a RESIDUAL, not "serious". The CRS file's 66
 *      unresolved cases against the ministry's 7 serious cases in the same month
 *      is the proof that the two are different categories.
 */

export type LadderId =
  | "light"
  | "residual"
  | "serious"
  | "vision"
  | "destruction"
  | "fatal";

export interface NativeLabel {
  /** The label the source uses, transcribed. */
  readonly text: string;
  readonly count?: number;
  readonly sources: readonly string[];
}

export interface LadderRung {
  readonly id: LadderId;
  readonly mais: string;
  /** Mapped ordinal range, inclusive. Never collapsed to a single value. */
  readonly lo: number;
  readonly hi: number;
  /** The labels this rung can be populated from, and cannot. */
  readonly native: readonly NativeLabel[];
  /** No published label resolves to this rung on its own. */
  readonly unresolved?: true;
}

export const LADDER: readonly LadderRung[] = [
  {
    id: "light",
    mais: "MAIS 1–2",
    lo: 1,
    hi: 2,
    native: [
      {
        text: "légèrement blessé",
        count: 1_167,
        sources: ["mediapart-crs-blesses-1311"],
      },
    ],
  },
  {
    id: "residual",
    mais: "MAIS 2–3, unresolved",
    lo: 2,
    hi: 3,
    unresolved: true,
    native: [
      {
        text: "not classed light (complement of 1,167 in 1,233)",
        count: 66,
        sources: ["mediapart-crs-blesses-1311"],
      },
    ],
  },
  {
    id: "serious",
    mais: "MAIS 3+",
    lo: 3,
    hi: 3,
    native: [
      {
        text: "7 blessés graves (all forces, 17 Oct)",
        count: 7,
        sources: ["bfmtv-bilan-17oct"],
      },
      {
        text: "3 blessés graves sur 150 civils (24 Oct)",
        count: 3,
        sources: [],
      },
      {
        text: "« autres blessures graves » (register)",
        count: 52,
        sources: ["lemonde-blessures-0511"],
      },
    ],
  },
  {
    id: "vision",
    mais: "MAIS 4",
    lo: 4,
    hi: 4,
    native: [
      { text: "10 éborgnés", count: 10, sources: ["lemonde-blessures-0511"] },
    ],
  },
  {
    id: "destruction",
    mais: "MAIS 5",
    lo: 5,
    hi: 5,
    native: [
      { text: "7 amputations", count: 7, sources: ["lemonde-blessures-0511"] },
      {
        text: "9 traumatismes crânio-faciaux",
        count: 9,
        sources: ["lemonde-blessures-0511"],
      },
    ],
  },
  {
    id: "fatal",
    mais: "MAIS 6",
    lo: 6,
    hi: 6,
    native: [
      {
        text: "Christophe M., 59, Paris, 17 Oct",
        count: 1,
        sources: ["lemonde-blessures-0511"],
      },
    ],
  },
];

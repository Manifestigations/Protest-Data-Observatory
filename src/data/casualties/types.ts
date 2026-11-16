/* Casualty domain types.
 *
 * The chart model (src/model/index.ts) is untouched: a casualty cell is a
 * published figure, a derived bound, a documented floor, a count of named
 * cases, or an absence with a named reason.
 *
 * Nothing here is a severity score. The ladder in vocabulary.ts is an editorial
 * mapping of the labels the sources publish, not clinical coding.
 */

import type { Flag } from "../../model/index.ts";

/** Why a cell carries no number. The first five are the 2026 baseline; the rest
 *  are severity-specific and each has a row in the resolution table. */
export type Why =
  | "notPublished"
  | "noDenominator"
  | "binaryFile"
  | "noTally"
  | "noneDocumented"
  | "universeMismatch"
  | "noSeverityClass"
  | "registerOnly"
  | "causeUnknown"
  | "notEstimable";

/** A figure, a published or derived range, a documented floor, a count of named
 *  cases, or an absence. `d` marks arithmetic; `regional` marks a sub-national
 *  scope. A floor is never rendered like an estimate. */
export type Cell =
  | {
      readonly s: "n";
      readonly v: number;
      readonly d?: true;
      readonly regional?: true;
    }
  | {
      readonly s: "r";
      readonly lo: number;
      readonly hi: number;
      readonly d?: true;
      readonly regional?: true;
    }
  | { readonly s: "f"; readonly v: number }
  | { readonly s: "c"; readonly n: number }
  | { readonly s: "x"; readonly why: Why };

export type Population =
  | "forces"
  | "protesters"
  | "bystanders"
  | "educationDeclared"
  | "mixed";

export type Participation = "participating" | "non-participating" | "unknown";

/** How the population was selected — the property that decides whether a count
 *  can ever have a denominator. A register and a declaration are not the same
 *  statistic even when their numbers look alike. */
export type Selection =
  | "official"
  | "declared"
  | "register"
  | "treated"
  | "legal"
  | "regional";

export interface SevRow {
  /** Key in casualties.scope. */
  readonly id: string;
  readonly total: Cell;
  readonly serious: Cell;
  readonly light: Cell;
  /** Not light, not broken down further — the file's second category. */
  readonly other: Cell;
  readonly population: Population;
  readonly participation?: Participation;
  readonly sources: readonly string[];
}

export interface CaseRow {
  readonly id: string;
  readonly side: "forces" | "protesters";
  readonly kind: "accidental" | "conflictual";
  readonly count: Cell;
  /** Keys in casualties.cases, in the order they should read. */
  readonly cases: readonly string[];
  /** Era marker: this row is not 2026 data. */
  readonly reference?: true;
}

/** A tagged injury observation. Every number the casualty section shows passes
 *  through here, so no cell can be plotted without stating which population it
 *  belongs to. */
export interface InjuryObs {
  /** Key in casualties.observations. */
  readonly id: string;
  readonly date: string;
  readonly population: Population;
  readonly participation: Participation;
  readonly selection: Selection;
  readonly window: "day" | "month" | "movement";
  readonly count: Cell;
  /** Empty when the publisher is named in copy but no source id is registered. */
  readonly sources: readonly string[];
  readonly reference?: true;
}

/** What each edge of a band rests on. The two edges of one band routinely rest
 *  on different kinds of evidence, and the table says so. */
export type EdgeKind =
  | "published"
  | "floor"
  | "ceiling"
  | "transfer"
  | "residual"
  | "bound"
  | "unbounded";

export type AssumptionKey =
  | "seriousSubsetOfNotLight"
  | "rateTransfer"
  | "crsDominatesOctober"
  | "declarationsNotPersons"
  | "registerSelection"
  | "treatedPerSerious"
  | "singleDayProxy"
  | "listsNotIndependent";

export interface Estimate {
  /** "E1" … "E9". */
  readonly id: string;
  /** Key in casualties.estimates. */
  readonly key: string;
  readonly population: Population | "all";
  readonly unit: "count" | "share";
  readonly value?: {
    readonly lo: number;
    readonly hi: number;
    readonly central?: number;
  };
  /** Present when there is no value at all. */
  readonly why?: Why;
  readonly loEdge: EdgeKind;
  readonly hiEdge: EdgeKind;
  /** Numbers only, so it renders identically in both locales. */
  readonly arithmetic: string;
  readonly assumptions: readonly AssumptionKey[];
  readonly sources: readonly string[];
  readonly status: "publishable" | "note" | "gap";
  /** Reuses the site's existing flag semantics for the table: e derived, f floor. */
  readonly flag?: Flag;
}

/** One of the three mutually exclusive bands of the movement-wide mix. */
export interface MixBand {
  readonly id: "light" | "residual" | "serious";
  readonly lo: number;
  readonly hi: number;
  readonly central: number;
}

/** One row of the treated-per-serious sensitivity table. */
export interface SensitivityRow {
  readonly ratio: number;
  readonly at17Oct: number;
  readonly movement: number;
}

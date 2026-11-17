/* Pure types and the definitions of "band" and "detached". Imports nothing. */

export const METRICS = ["p", "a", "f", "i"] as const;
export type Metric = (typeof METRICS)[number];

/** n = published point · r = regional only · p = partial · f = floor
 *  e = derived/modelled · c = stock or actions-total · w = weekly aggregate
 *  "x" = a wider measure than the metric's definition (perturbés, closed). */
export type Flag = "n" | "r" | "p" | "f" | "e" | "c" | "w" | "x";

/**
 * A single published figure, or a published range [low, high].
 *
 * Storage never collapses a range: no midpoint, and never an average of two
 * publishers. `low` is the figure its source stands behind, `high` the widest
 * count any source supports, and both travel to the renderer so a caption can
 * print the range a chart can only hint at.
 *
 * `midOf()` below does collapse, for plotting. The rule is about storage:
 * anything that quotes a number rather than drawing one must read the band.
 */
export type Band = number | [number, number];

/* A superset of the four short metrics. METRICS/METRIC_OF stay four-measure
   because the trellis grids and the data table are built on them; add a key
   here when a page needs a measure those four do not cover. */

export type MetricKey =
  | "turnout"
  | "strikers"
  | "arrests"
  | "forcesInjured"
  | "forcesInjuredStock"
  | "protesterInjured"
  | "damagesCost"
  | "policingCost"
  | "heliCost"
  | "blockades";

/** Short code used by sections B/C → long key used by the dashboards. */
export const METRIC_OF: Readonly<Record<Metric, MetricKey>> = {
  p: "turnout",
  a: "arrests",
  f: "forcesInjured",
  i: "protesterInjured",
};

/** The single definition of "must not be joined to the national line". */
const DETACHED: ReadonlySet<Flag> = new Set<Flag>(["r", "p", "e", "c"]);

export const isDetached = (q: Flag | null | undefined): boolean =>
  q != null && q !== "n" && DETACHED.has(q);

/** `[low, high]` for a scalar band, the band itself otherwise: the one place
 *  that flattens the two shapes, so no caller has to test which it holds. */
export const bandOf = (b: Band): [number, number] =>
  typeof b === "number" ? [b, b] : b;

/**
 * The plotting value of a band: the arithmetic middle, (low + high) / 2.
 *
 * This is a drawing convention, not an estimate. Nothing is known about where
 * inside [low, high] the truth sits — a band is two published counts, not a
 * distribution over outcomes — so the midpoint carries no probability and is
 * not the most likely value. It exists because the line has to go somewhere.
 *
 * So never average midpoints to get a "typical" figure: that turns a drawing
 * convention into an estimate nobody published.
 */
export const midOf = (b: Band): number => {
  const [lo, hi] = bandOf(b);
  return (lo + hi) / 2;
};

/** Structured weekly-aggregate note — rendered per locale by notes.ts. */
export interface WeekNoteParts {
  days: number;
  kind: "national" | "regional";
  peak?: string; // ISO date of the peak day
  noNational?: boolean;
  excluded?: number;
  floored?: boolean;
  clipped?: boolean;
  /** The week overlaps the Toussaint holiday — the metric did not exist. */
  vacation?: boolean;
}

/** A note is a reference to copy, never the copy itself. */
export type NoteRef =
  | { k: "obs"; date: string; metric: MetricKey }
  | { k: "policing"; low: number; high: number; date: string }
  | { k: "heli"; hoursLow: number; hoursHigh: number; date: string }
  | { k: "cumulative"; days: number; added: boolean }
  | { k: "week"; p: WeekNoteParts };

export type EpisodeId =
  "may68" | "cpe" | "gj" | "nahel" | "pensions" | "bt" | "students26";

/**
 * One week of one episode. `w` is the row index and must run sequentially from
 * 0; `from`/`to` are ISO dates that bracket it. A missing metric means "no
 * published figure" — never zero.
 */
export interface Row {
  w: number;
  from: string;
  to: string;
  act?: number;
  partial?: boolean;
  p?: Band;
  a?: Band;
  f?: Band;
  i?: Band;
  flag?: Partial<Record<Metric, Flag>>;
  noteRef?: Partial<Record<Metric, NoteRef>>;
}

export interface Episode {
  id: EpisodeId;
  start: string;
  end: string;
  weeks: Row[];
}

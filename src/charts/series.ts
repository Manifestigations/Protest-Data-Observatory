/* ── Section A/B — one row per plotted series ────────────────────────────────
   The five build*Config() bodies that differed only in their arguments are one
   table (DEF). Split out of chart.ts so datasets, axes and plugins can read the
   table without importing the chart shell. */

import type { PointStyle } from "chart.js";
import { DAILY, DATES, WEEKLY, type Series } from "../data/data.ts";

export type Unit = "count" | "eurM";

/** The two y scales, named: every dataset and plugin repeats them. */
export const AXIS_LEFT = "y";
export const AXIS_RIGHT = "y1";

/** The €1,000M damages total is the span ring's right-hand anchor: keep the
 *  datum (tooltip, band, axis max) and hide only its marker. */
const DAMAGES_ANCHOR = "2026-10-24";

const damagesRadius = (r: number): number[] =>
  DATES.map((d) => (d === DAMAGES_ANCHOR ? 0 : r));

export interface SeriesDef {
  readonly data: Series;
  readonly color: string;
  readonly unit: Unit;
  readonly radius: number;
  /** Per-index override of `radius`; a 0 hides the marker, not the point. */
  readonly pointRadius?: readonly number[];
  readonly width: number;
  readonly style?: PointStyle;
  readonly axis?: string;
  readonly bandFill?: string;
  readonly log?: boolean;
  readonly shadeOnly?: boolean;
}

/**
 * `satisfies` rather than `Record<SeriesId, SeriesDef>`: the key set is
 * inferred from the object, so `keyof typeof DEF` is a literal union and a
 * misspelled key becomes a compile error instead of a runtime undefined.
 */
export const DEF = {
  protestersDaily: {
    data: DAILY.turnout,
    color: "#1d4ed8",
    unit: "count",
    radius: 4,
    width: 2,
  },
  blockadesDaily: {
    data: DAILY.blockades,
    color: "#8C564B",
    unit: "count",
    radius: 3,
    width: 1.75,
    axis: AXIS_RIGHT,
    log: true,
  },
  strikersDaily: {
    data: DAILY.strikers,
    color: "#0f766e",
    unit: "count",
    radius: 4.5,
    width: 2,
    style: "star",
  },
  strikersWeekly: {
    data: WEEKLY.strikers,
    color: "#0f766e",
    unit: "count",
    radius: 5,
    width: 2,
    style: "star",
  },
  arrestsDaily: {
    data: DAILY.arrests,
    color: "#b91c1c",
    unit: "count",
    radius: 3.5,
    width: 1.5,
  },
  forcesDaily: {
    data: DAILY.forcesInjured,
    color: "#047857",
    unit: "count",
    radius: 4,
    width: 1.5,
    style: "rectRot",
  },
  forcesInjuredStock: {
    data: DAILY.forcesInjuredStock,
    color: "#065f46",
    unit: "count",
    radius: 3,
    width: 2,
    /* A running total's band is a corridor, not an error bar on an
       observation, so it is drawn as policingCumulative's is: one filled
       polygon between the low and high levels, no per-point whisker caps.
       `shadeOnly` sets noWhiskers and leaves the band to the tooltip. */
    bandFill: "rgba(6,95,70,0.14)",
    shadeOnly: true,
  },
  protestersInjuredDaily: {
    data: DAILY.protesterInjured,
    color: "#b45309",
    unit: "count",
    radius: 5,
    width: 1.5,
    style: "triangle",
  },
  damagesDaily: {
    data: DAILY.damagesCost,
    color: "#7c3aed",
    unit: "eurM",
    radius: 5,
    pointRadius: damagesRadius(5),
    width: 2,
  },
  policingDaily: {
    data: DAILY.policing,
    color: "#0e7490",
    unit: "eurM",
    radius: 4,
    width: 2,
    style: "rect",
  },
  policingCumulative: {
    data: DAILY.policingCumulative,
    color: "#0369a1",
    unit: "eurM",
    radius: 0,
    width: 2,
    bandFill: "rgba(3,105,161,0.12)",
    shadeOnly: true,
  },
  protestersWeekly: {
    data: WEEKLY.turnout,
    color: "#1d4ed8",
    unit: "count",
    radius: 5,
    width: 2,
  },
  blockadesWeekly: {
    data: WEEKLY.blockades,
    color: "#8C564B",
    unit: "count",
    radius: 3,
    width: 1.75,
    axis: AXIS_RIGHT,
    log: true,
  },
  arrestsWeekly: {
    data: WEEKLY.arrests,
    color: "#b91c1c",
    unit: "count",
    radius: 4,
    width: 2,
  },
  forcesWeekly: {
    data: WEEKLY.forcesInjured,
    color: "#047857",
    unit: "count",
    radius: 4,
    width: 1.5,
    style: "rectRot",
  },
  protestersInjuredWeekly: {
    data: WEEKLY.protesterInjured,
    color: "#b45309",
    unit: "count",
    radius: 5,
    width: 1.5,
    style: "triangle",
  },
} satisfies Record<string, SeriesDef>;

/** Literal union of the keys actually defined — a typo is now a type error. */
export type SeriesId = keyof typeof DEF;

/** The points a series actually draws, as index/value pairs.
 *
 * A marker with radius 0 is an aggregate that is not a daily value — the
 * €1,000M damages total of 24 Oct, kept as the span ring's right-hand anchor
 * but drawn without a marker. The KPIs take the chart's own mask, so a figure
 * the reader cannot see as a marker is neither a "largest day" nor an item in
 * a mean. Delete the two mask lines below to count it like any other point.
 * The id names the series, so no daily/weekly switch and no DEF scan. */
export function visiblePoints(id: SeriesId): { i: number; v: number }[] {
  const def = DEF[id];
  if (!def?.data) return [];

  const mask = def.pointRadius;
  const out: { i: number; v: number }[] = [];
  def.data.forEach((p, i) => {
    if (p.v === null) return;
    if (mask?.[i] === 0) return;
    out.push({ i, v: p.v });
  });
  return out;
}

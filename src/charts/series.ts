/* ── src/charts/series.ts — the series table ─────────────────────────────────
   DEF resolves its colours from tones, never literals. One entry per series:
   what it plots, its tone, its axis, how it is drawn. No value is computed
   here; the data is already in data.ts. */

import type { PointStyle } from "chart.js";
import { tones, type Tone } from "../core/colors.ts";
import { DAILY, DATES, WEEKLY, type Series } from "../../vendor/dataset/src/data/data.ts";

export type Unit = "count" | "eurM";

/** The two y scales, named: every dataset and plugin repeats them. */
export const AXIS_LEFT = "y";
export const AXIS_RIGHT = "y1";

const DAMAGES_ANCHOR = "2026-10-24";

const damagesRadius = (r: number): number[] =>
  DATES.map((d) => (d === DAMAGES_ANCHOR ? 0 : r));

export interface SeriesDef {
  readonly data: Series;
  /** Semantic identity — the only input to the colour. */
  readonly tone: Tone;
  /** Resolved from `tone` on read (see `def()`), never stored. */
  readonly color: string;
  readonly unit: Unit;
  readonly radius: number;
  readonly pointRadius?: readonly number[];
  readonly width: number;
  readonly style?: PointStyle;
  readonly axis?: string;
  /** The tone's wash, for cumulative/stock bands. */
  readonly bandFill?: string;
  readonly log?: boolean;
  readonly shadeOnly?: boolean;
}

/** A table entry before its colours exist. `band` = give it a bandFill. */
type Spec = Omit<SeriesDef, "color" | "bandFill"> & { band?: boolean };

/**
 * Getters, not values: `tones` reads computed style and its cache is cleared by
 * resetColours(), so a literal-free table has to resolve when it is read.
 * Written by hand because `{...spread}` would invoke the getter once and freeze
 * whichever theme happened to be active at import time.
 */
function def(spec: Spec): SeriesDef {
  const { band, ...rest } = spec;
  const d = rest as SeriesDef;

  Object.defineProperty(d, "color", {
    get: () => tones[spec.tone].fill,
    enumerable: true,
  });

  if (band)
    Object.defineProperty(d, "bandFill", {
      get: () => tones[spec.tone].wash,
      enumerable: true,
    });

  return d;
}

export const DEF = {
  protestersDaily: def({
    data: DAILY.turnout,
    tone: "turnout",
    unit: "count",
    radius: 4,
    width: 2,
  }),
  blockadesDaily: def({
    data: DAILY.blockades,
    tone: "protest",
    unit: "count",
    radius: 3,
    width: 1.75,
    axis: AXIS_RIGHT,
    log: true,
    style: "rect",
  }),
  strikersDaily: def({
    data: DAILY.strikers,
    tone: "turnout",
    unit: "count",
    radius: 4.5,
    width: 2,
    style: "star",
  }),
  strikersWeekly: def({
    data: WEEKLY.strikers,
    tone: "turnout",
    unit: "count",
    radius: 5,
    width: 2,
    style: "star",
  }),
  arrestsDaily: def({
    data: DAILY.arrests,
    tone: "arrest",
    unit: "count",
    radius: 3.5,
    width: 1.5,
  }),
  forcesDaily: def({
    data: DAILY.forcesInjured,
    tone: "police",
    unit: "count",
    radius: 4,
    width: 1.5,
    style: "rectRot",
  }),
  forcesInjuredStock: def({
    data: DAILY.forcesInjuredStock,
    tone: "police",
    unit: "count",
    radius: 3,
    width: 2,
    /* A running total's band is a corridor, not an error bar on an
       observation, so it is drawn as policingCumulative's is: one filled
       polygon between the low and high levels, no per-point whisker caps.
       `shadeOnly` sets noWhiskers and leaves the band to the tooltip. */
    band: true,
    shadeOnly: true,
  }),
  protestersInjuredDaily: def({
    data: DAILY.protesterInjured,
    tone: "protest",
    unit: "count",
    radius: 5,
    width: 1.5,
    style: "triangle",
  }),
  damagesDaily: def({
    data: DAILY.damagesCost,
    tone: "cost",
    unit: "eurM",
    radius: 5,
    pointRadius: damagesRadius(5),
    width: 2,
  }),
  policingDaily: def({
    data: DAILY.policing,
    tone: "policeCost",
    unit: "eurM",
    radius: 4,
    width: 2,
    style: "rect",
  }),
  policingCumulative: def({
    data: DAILY.policingCumulative,
    tone: "policeCost",
    unit: "eurM",
    radius: 0,
    width: 2,
    band: true,
    shadeOnly: true,
  }),
  protestersWeekly: def({
    data: WEEKLY.turnout,
    tone: "turnout",
    unit: "count",
    radius: 5,
    width: 2,
  }),
  blockadesWeekly: def({
    data: WEEKLY.blockades,
    tone: "protest",
    unit: "count",
    radius: 3,
    width: 1.75,
    axis: AXIS_RIGHT,
    log: true,
  }),
  arrestsWeekly: def({
    data: WEEKLY.arrests,
    tone: "arrest",
    unit: "count",
    radius: 4,
    width: 2,
  }),
  forcesWeekly: def({
    data: WEEKLY.forcesInjured,
    tone: "police",
    unit: "count",
    radius: 4,
    width: 1.5,
    style: "rectRot",
  }),
  protestersInjuredWeekly: def({
    data: WEEKLY.protesterInjured,
    tone: "protest",
    unit: "count",
    radius: 5,
    width: 1.5,
    style: "triangle",
  }),
} satisfies Record<string, SeriesDef>;

/** Literal union of the keys actually defined — a typo is now a type error. */
export type SeriesId = keyof typeof DEF;

/** The points a series actually draws, as index/value pairs. Unchanged. */
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

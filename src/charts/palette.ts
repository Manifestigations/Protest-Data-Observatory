/* ==========================================================================
   src/charts/palette.ts — the only place a series becomes a colour.
   (Replaces the old position-indexed palette: a metric keeps its meaning in
   every chart, so a red bar is always arrests.)
   ========================================================================== */

import { tones, type Tone } from "../core/colors.ts";
import type { MetricKey } from "../model/index.ts";

export const TONE_OF: Readonly<Record<MetricKey, Tone>> = {
  turnout: "turnout",
  strikers: "turnout",
  arrests: "arrest",
  forcesInjured: "police",
  forcesInjuredStock: "police",
  protesterInjured: "protest",
  damagesCost: "cost",
  blockades: "protest",
  policingCost: "policeCost",
  heliCost: "policeCost",
};

export interface SeriesStyle {
  borderColor: string;
  backgroundColor: string;
  pointBorderColor: string;
  pointBackgroundColor: string;
  pointBorderWidth: number;
}

/** Area charts get the wash; everything else the solid tone. */
export function seriesStyle(
  key: MetricKey,
  opts: { area?: boolean } = {},
): SeriesStyle {
  const c = tones[TONE_OF[key]];
  const white = TONE_OF[key] === "bystander";
  return {
    borderColor: c.fill,
    backgroundColor: opts.area ? c.wash : c.fill,
    pointBorderColor: white ? c.edge : c.fill,
    pointBackgroundColor: white ? c.fill : c.fill,
    pointBorderWidth: white ? 1.5 : 0,
  };
}

/** Blue bars, yellow hatching — used for every policing-cost series. */
export const policeCost = (): { base: string; hatch: string } => {
  const c = tones.policeCost;
  return { base: c.fill, hatch: c.hatch ?? c.fill };
};

/** Two-tone pair for dual-axis charts (costs vs damage). */
export const COST_PAIR = (): {
  policing: SeriesStyle;
  damage: SeriesStyle;
} => ({
  policing: {
    borderColor: tones.policeCost.fill,
    backgroundColor: tones.policeCost.fill,
    pointBorderColor: tones.policeCost.fill,
    pointBackgroundColor: tones.policeCost.fill,
    pointBorderWidth: 0,
  },
  damage: seriesStyle("damagesCost"),
});

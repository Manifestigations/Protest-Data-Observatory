/* ── src/charts/trellis/palette.ts — trellis series styles ───────────────────
   Maps the four short metrics onto semantic tones, and re-exports DIM so
   the legend has one import for emphasis constants. Every colour is
   resolved per mount, because Chart.js bakes colours into a dataset at
   create time. */

import { METRICS, METRIC_OF, type Metric } from "@manifestigations/dataset";
import { DIM, hollow, ramp, tones, type Tone } from "../../core/colors.ts";
import { TONE_OF } from "../palette.ts";

export { DIM };

export interface TrellisSeries {
  readonly key: Metric;
  readonly tone: Tone;
  /** Line, marker stroke and tooltip swatch. */
  readonly color: string;
  /** Hollow-marker interior: the card, so it flips with the theme. */
  readonly hole: string;
}

/**
 * Resolved per mount, never at module load: `tones` reads computed style, and
 * CSS variables cannot be baked into a Chart.js dataset at import time.
 * Order follows METRICS (p, a, f, i) so panel legends keep their sequence.
 */
export function seriesStyles(): TrellisSeries[] {
  const hole = hollow();
  return METRICS.map((key) => {
    const tone = TONE_OF[METRIC_OF[key]];
    return { key, tone, color: tones[tone].fill, hole };
  });
}

/** Seven movements, earliest → latest. Same call per mount, same reason. */
export const movementRamp = (): string[] => ramp();

/**
 * Low-alpha twin of a resolved colour. Tokens come back as `rgb(r g b)` or
 * `rgb(r, g, b)`, which alpha() in canvas-registry cannot parse — it accepts
 * #rrggbb only. Hex is kept as a fallback so a stray literal dims instead of
 * vanishing.
 */
const RGB = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/;

export function fade(color: string, a: number): string {
  const m = RGB.exec(color);
  if (m) return `rgb(${m[1]} ${m[2]} ${m[3]} / ${a})`;
  const h = color.replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(h))
    return `rgb(${parseInt(h.slice(0, 2), 16)} ${parseInt(h.slice(2, 4), 16)} ${parseInt(h.slice(4, 6), 16)} / ${a})`;
  return color; // wide-gamut `color(srgb …)`: leave it, never break the chart
}

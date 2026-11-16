/* ==========================================================================
   src/charts/trellis/palette.ts — full replacement.
   The four series colours become tone references, the ramp becomes tokens,
   and DIM is re-exported so legend.ts keeps importing it from here.
   ========================================================================== */

import { DIM, hollow, ramp, tones, type Tone } from "../../core/colors.ts";
import { METRICS, METRIC_OF, type Metric } from "../../model/index.ts";
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
 * `rgb(r, g, b)`, so the old hex-only helper in canvas-registry is not enough
 * here; hex is kept as a fallback so a stray literal dims instead of vanishing.
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

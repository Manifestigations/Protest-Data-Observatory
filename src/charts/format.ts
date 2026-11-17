/* ── Section A/B — numbers in tooltips and ticks ─────────────────────────────
   `fmt` and the rate sentence are here rather than in chart-tooltip.ts because
   the axis tick formatter needs them too. */

import { bi, eurM, fill, getLocale, nf, t } from "../copy";
import {
  denominator,
  KEY_2026,
  pctOfValue,
  population,
} from "../data/population.ts";
import type { Unit } from "./series.ts";

export function fmt(v: number, unit: Unit): string {
  return unit === "eurM"
    ? fill(t().chart.eurM, { v: eurM().format(v) })
    : nf().format(Math.round(v));
}

/** Two decimals, locale separator: "0.80%", "0,80 %". The copy template owns
 *  the surrounding sentence, so no space is added before the glyph — matching
 *  `pctOf` in copy/format.ts. */
const pctFormat = new Intl.NumberFormat(getLocale(), {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fmtPct = (v: number): string => `${pctFormat.format(v)}%`;

/** "= 0.80% of the population (69 082 000 residents)". Null denominator → no
 *  line at all, never a silent substitution. */
const RATE = {
  en: "= {pct} of the population ({pop} residents)",
  fr: "= {pct} de la population ({pop} habitants)",
};

export function rateLine(
  band: [number, number] | undefined,
  v: number,
): string | null {
  const pop = population(KEY_2026);
  const lo = pctOfValue(band?.[0] ?? v, pop);
  const hi = pctOfValue(band?.[1] ?? v, pop);
  if (lo === null || hi === null) return null;
  const pct = hi - lo < 1e-9 ? fmtPct(lo) : `${fmtPct(lo)} – ${fmtPct(hi)}`;
  return fill(bi(RATE), {
    pct,
    pop: nf().format(denominator(pop) ?? 0),
  });
}

export const tickFormat =
  (unit: Unit) =>
  (v: number): string =>
    unit === "eurM"
      ? fill(t().chart.eurM, { v: nf().format(v) })
      : compactFixed(v);

/** `compact()` is a formatter; this keeps the call site a value, not a factory. */
function compactFixed(v: number): string {
  return (nf() as Intl.NumberFormat).format(v);
}

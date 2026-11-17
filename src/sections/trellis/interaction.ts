/* ── Trellis pointer geometry ────────────────────────────────────────────────
   Weeks are the x unit and there is no x scale of values, so hit-testing is
   arithmetic on the plot area rather than a Chart.js scale lookup. */

import type { ActiveElement, Chart, ChartEvent } from "chart.js";

export interface Pt {
  x: number;
  y: number;
}

/** Event position in CSS pixels, relative to the canvas, or null off-plot. */
export function posOf(
  chart: Chart<"line">,
  e: ChartEvent,
): { x: number; y: number } | null {
  const { left, right, top, bottom } = chart.chartArea;
  const native = e.native as MouseEvent | undefined;
  const rect = chart.canvas.getBoundingClientRect();
  if (!native || rect.width === 0) return null;

  const x = native.clientX - rect.left;
  const y = native.clientY - rect.top;
  if (x < left || x > right || y < top || y > bottom) return null;
  return { x, y };
}

/** Week index under the pointer. Bands are half a category wide, so the week
 *  under the cursor is the one whose band contains it, not the nearest point. */
export function weekAt(chart: Chart<"line">, e: ChartEvent): number | null {
  const p = posOf(chart, e);
  if (!p) return null;

  const scale = chart.scales.x;
  if (!scale) return null;

  const raw = scale.getValueForPixel(p.x);
  if (raw === undefined || !Number.isFinite(raw)) return null;

  const week = Math.round(raw);
  return week >= scale.min && week <= scale.max ? week : null;
}

/** The dataset whose point sits closest to the pointer vertically. Every
 *  consumer wants "which line is the reader pointing at", never "which point
 *  did Chart.js pick", because points are 2.75px wide and hit radius is 12. */
export function nearestByY(
  chart: Chart<"line">,
  elements: ActiveElement[],
  e: ChartEvent,
): ActiveElement | undefined {
  const p = posOf(chart, e);
  if (!p || elements.length === 0) return elements[0];

  let best: ActiveElement | undefined;
  let bestDy = Number.POSITIVE_INFINITY;

  for (const el of elements) {
    const meta = chart.getDatasetMeta(el.datasetIndex);
    const pt = meta.data[el.index] as
      { y?: number; skip?: boolean } | undefined;
    if (!pt || pt.skip || pt.y === undefined) continue;
    const dy = Math.abs(pt.y - p.y);
    if (dy < bestDy) {
      bestDy = dy;
      best = el;
    }
  }
  return best ?? elements[0];
}

/** Registered interaction mode: resolves to every series at the hovered week,
 *  which is what both the tooltip and the emphasis pass need. */
export const WEEK_MODE = "trellisWeek" as const;

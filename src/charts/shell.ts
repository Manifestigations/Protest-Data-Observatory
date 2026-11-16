/* ── Section A/B — chart shell and the one builder ───────────────────────── */

import type { ChartData, ChartOptions, LegendItem } from "chart.js";
import { t } from "../copy";
import { THEME } from "../core/canvas-registry.ts";
import {
  contextBands,
  daySpans,
  weekSpans,
} from "../sections/context/context.ts";
import { WEEKS } from "../data/data.ts";
import { scalesFor } from "./axes.ts";
import { tooltipCallbacks } from "./chart-tooltip.ts";
import { datasetsFor, type ProtestDataset } from "./datasets.ts";
import { SPAN_MARKS } from "./plugins/span-mark.ts";
import type { ChartSpec } from "./specs.ts";
import { view, type View } from "./view.ts";

const shell = (
  v: View,
  subtitle: string,
  title: string,
  extra?: Record<string, unknown>,
) => ({
  responsive: true,
  maintainAspectRatio: false,
  resizeDelay: 0,
  devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
  interaction: { mode: "index" as const, intersect: false },
  layout: { padding: { top: 4, right: 16, bottom: 0, left: 4 } },
  plugins: {
    legend: {
      position: "top" as const,
      align: "end" as const,
      labels: {
        color: THEME.label, // was Chart.js default #666: invisible on dark
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        padding: 14,
        font: { size: 11 },
        filter: (item: LegendItem, data: ChartData<"line">) =>
          !(
            data.datasets[item.datasetIndex ?? -1] as ProtestDataset | undefined
          )?.detachedOnly,
      },
    },
    subtitle: {
      display: true,
      text: subtitle,
      color: THEME.muted,
      font: { size: 12 },
      padding: { top: 0, bottom: 8 },
    },
    title: {
      display: true,
      text: title,
      color: THEME.ink,
      font: { size: 16, weight: "bold" as const },
      padding: { top: 0, bottom: 2 },
    },
    tooltip: {
      backgroundColor: THEME.tooltipBg,
      titleColor: THEME.tooltipInk,
      bodyColor: THEME.tooltipInk,
      borderColor: THEME.grid,
      borderWidth: 1,
      callbacks: tooltipCallbacks(v),
    },
    ...extra,
  },
});

export type Cfg = {
  data: { labels: string[]; datasets: ProtestDataset[] };
} & ChartOptions<"line">;

/** One builder for all charts. */
export function buildChart(spec: ChartSpec): Cfg {
  const card = t().chart.charts[spec.copy];
  const v = view(spec.weekly);

  /* Context spans are resolved here, not in mount(): `spec.weekly` only exists
     in this function. weekSpans() takes each week's own `w`, `from` and `to`,
     so a span resolves against the panel's real dates rather than its array
     position — WEEKS is contiguous today, but the two must not be conflated. */
  const spans = spec.weekly
    ? weekSpans(WEEKS.map((w, i) => ({ w: i, from: w.key, to: w.end })))
    : daySpans();

  return {
    data: {
      labels: v.labels,
      datasets: spec.series.flatMap((id) => datasetsFor(id, spec.weekly)),
    },
    ...shell(v, card.subtitle, card.title, {
      ...(spec.id === "chart-costs" ? { spanMark: { spans: SPAN_MARKS } } : {}),
      /* Always present — `shell()` already builds a `plugins` object, so the
         `if (options.plugins)` guard from my earlier draft is dead weight. An
         empty array no-ops inside the plugin. */
      contextBands: { spans },
    }),
    scales: scalesFor(v, card, spec.series),
  };
}

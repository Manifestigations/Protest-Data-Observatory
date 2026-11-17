/* ── Section E — mean vs median per series ───────────────────────────────────
   One panel per measure, log y, one column per episode. Each column carries
   three layers: a min–max bar for the spread of published values, a dot at the
   median for the typical week, a triangle at the peak for the largest one. A
   column whose dot sits near the bottom of its bar is the signature of a few
   huge weeks — where a mean would mislead and the median does not.

   No mean is drawn. statsOf() computes one, but beside the median it reads as
   an error bar, and the two differ by skew, not by uncertainty. */

import {
  Chart,
  type ChartData,
  type Plugin,
  type Point,
  type TooltipItem,
} from "chart.js";
import { clipToArea } from "../charts/plugins/clip.ts";
import { wrapTooltipLines } from "../charts/tooltip.ts";
import {
  datasetsOf,
  decades,
  seriesData,
  statsOf,
  type PanelDataset,
  type Pt,
} from "../charts/trellis/engine.ts";
import { legend } from "../charts/trellis/legend.ts";
import { DIM, seriesStyles } from "../charts/trellis/palette.ts";
import { columns, panelFigure } from "../charts/trellis/panel.ts";
import { compact, fill, nf, t } from "../copy";
import { alpha, THEME, track } from "../core/canvas-registry.ts";
import { EPISODES } from "../data/episodes/index.ts";
import type { Episode, Metric } from "../model/index.ts";

/* ── Types ─────────────────────────────────────────────────────────────────── */

type Stat = "range" | "median" | "peak";

interface StatDataset extends PanelDataset {
  readonly __stat: Stat;
}

/** The band carrier: invisible points that give the plugin an x per episode. */
interface BandDataset extends StatDataset {
  readonly __bands: readonly (readonly [number, number])[];
}

/**
 * One episode's figures for one measure, reduced to what the panel needs.
 *
 * `n` is how many weeks published a figure, not a sample size. It says how
 * much of the episode the median stands on, which is why the peak marker is
 * dropped when n < 2: with one figure, "highest" and "middle" are the same
 * number and the triangle would sit on the dot.
 */
interface Cell {
  x: number;
  t: string;
  /** Published figures behind these statistics. Not a sample size. */
  n: number;
  min: number;
  median: number;
  max: number;
}

/** A plotted statistic, carrying the whole cell so the tooltip can show it. */
interface StatPt extends Pt {
  n: number;
  min: number;
  median: number;
  max: number;
}

/* ── Constants ─────────────────────────────────────────────────────────────── */

const MEDIAN_COLOR = "#334155";
const PEAK_COLOR = "#b45309";
const RANGE_COLOR = "#64748b";

const summaryPanels: Chart<"line">[] = [];
let activeStat: Stat | null = null;

/* ── Cells ─────────────────────────────────────────────────────────────────── */

function cellOf(ep: Episode, i: number, key: Metric): Cell | null {
  const pts = seriesData(ep, key);
  if (!pts) return null;
  const st = statsOf(pts);
  if (!st) return null;

  /* A log axis cannot show a zero or a negative; such a series is left out
     rather than clamped, so the panel never misstates it. */
  if (!(st.low > 0)) return null;

  return {
    x: i,
    t: t().episodes[ep.id].short,
    n: st.count,
    min: st.low,
    median: st.median,
    max: st.high,
  };
}

function statPt(c: Cell, which: "median" | "peak"): StatPt {
  const y = which === "median" ? c.median : c.max;
  return {
    x: c.x,
    y,
    low: c.min,
    high: c.max,
    flag: "n",
    base: c.median,
    t: c.t,
    n: c.n,
    min: c.min,
    median: c.median,
    max: c.max,
  };
}

/* ── Datasets ──────────────────────────────────────────────────────────────── */

function medianDataset(
  key: Metric,
  label: string,
  cells: readonly Cell[],
): StatDataset {
  return {
    type: "line",
    label,
    data: cells.map((c) => statPt(c, "median")),
    showLine: false,
    borderColor: MEDIAN_COLOR,
    backgroundColor: MEDIAN_COLOR,
    pointBackgroundColor: MEDIAN_COLOR,
    pointBorderColor: MEDIAN_COLOR,
    pointBorderWidth: 1.5,
    pointRadius: 5,
    pointHoverRadius: 7,
    pointHitRadius: 12,
    pointStyle: "circle",
    __item: key,
    __ep: -1,
    __color: MEDIAN_COLOR,
    __stat: "median",
  } as StatDataset;
}

function peakDataset(
  key: Metric,
  label: string,
  cells: readonly Cell[],
): StatDataset {
  /* One published figure means the peak and the median are the same number, so
     the marker is dropped rather than drawn on top of the median. */
  return {
    type: "line",
    label,
    data: cells.map((c) => statPt(c, "peak")),
    showLine: false,
    borderColor: PEAK_COLOR,
    backgroundColor: PEAK_COLOR,
    pointBackgroundColor: PEAK_COLOR,
    pointBorderColor: PEAK_COLOR,
    pointBorderWidth: 1.5,
    pointRadius: cells.map((c) => (c.n < 2 ? 0 : 6)),
    pointHoverRadius: cells.map((c) => (c.n < 2 ? 0 : 8)),
    pointHitRadius: cells.map((c) => (c.n < 2 ? 0 : 12)),
    pointStyle: "triangle",
    __item: key,
    __ep: -1,
    __color: PEAK_COLOR,
    __stat: "peak",
  } as StatDataset;
}

/** Carries the min–max span. Its own points are invisible and only exist to give
 *  the plugin one x position per episode. */
function rangeDataset(
  key: Metric,
  label: string,
  cells: readonly Cell[],
): BandDataset {
  return {
    type: "line",
    label,
    data: cells.map((c) => statPt(c, "median")),
    showLine: false,
    borderColor: RANGE_COLOR,
    backgroundColor: alpha(RANGE_COLOR, 0.2),
    pointRadius: 0,
    pointHoverRadius: 0,
    pointHitRadius: 0,
    __item: key,
    __ep: -1,
    __color: RANGE_COLOR,
    __stat: "range",
    __bands: cells.map((c) => [c.min, c.max] as const),
  } as BandDataset;
}

/** The min–max span behind each episode's markers: one vertical bar per episode,
 *  drawn before the datasets so the markers stay on top of it. */
const rangeBand: Plugin<"line"> = {
  id: "rangeBand",
  beforeDatasetsDraw(chart) {
    const idx = chart.data.datasets.findIndex(
      (d) => (d as Partial<BandDataset>).__bands !== undefined,
    );
    if (idx < 0) return;

    const ds = chart.data.datasets[idx] as BandDataset;
    const meta = chart.getDatasetMeta(idx);
    if (meta.hidden) return;

    const scale = chart.scales.y;
    if (!scale) return;

    const { ctx, chartArea } = chart;
    const pts = meta.data as { x: number; skip?: boolean }[];
    const width = 9;

    ctx.save();
    clipToArea(ctx, chartArea);
    ctx.fillStyle = ds.backgroundColor as string;

    for (let j = 0; j < pts.length; j++) {
      const band = ds.__bands[j];
      const p = pts[j];
      if (!band || p.skip) continue;
      const yHi = scale.getPixelForValue(band[1]);
      const yLo = scale.getPixelForValue(band[0]);
      ctx.fillRect(p.x - width / 2, yHi, width, Math.max(yLo - yHi, 2));
    }
    ctx.restore();
  },
};

/* ── Emphasis ───────────────────────────────────────────────────────────── */

/** `force` lets the legend re-apply a state the chart already set, so hovering a
 *  legend entry always has a visible effect. */
function emphasiseStat(stat: Stat | null, force = false): void {
  if (!force && stat === activeStat) return;
  activeStat = stat;

  for (const chart of summaryPanels) {
    for (const d of datasetsOf(chart) as StatDataset[]) {
      const s = d.__stat;
      if (!s) continue;
      const on = stat === null || s === stat;

      if (s === "range") {
        /* the band is a fill, so it dims by alpha rather than by colour */
        d.backgroundColor = alpha(d.__color, on ? 0.2 : 0.05);
      } else {
        const c = on ? d.__color : alpha(d.__color, DIM);
        d.borderColor = c;
        d.pointBorderColor = c;
        d.backgroundColor = c;
        d.pointBackgroundColor = c;
      }
    }
    chart.update("none");
  }
}

/** Which layers the reader has filtered out of section E. Survives a re-mount. */
const statHidden = new Map<Stat, boolean>();

function applyStatVisibility(): void {
  for (const chart of summaryPanels) {
    datasetsOf(chart).forEach((d, i) => {
      const s = (d as StatDataset).__stat;
      chart.setDatasetVisibility(i, !(s && statHidden.get(s)));
    });
    chart.update("none");
  }
}

function setStatHidden(stat: Stat, hidden: boolean): void {
  statHidden.set(stat, hidden);
  applyStatVisibility();
}

/* ── Mount ─────────────────────────────────────────────────────────────────── */

export function mountSummary(): void {
  const host = document.getElementById("summary");
  const legendHost = document.getElementById("legend-summary");
  if (!host || !legendHost) return;

  const styles = seriesStyles(); // ← ordered, resolved per mount

  summaryPanels.length = 0;
  activeStat = null;
  host.replaceChildren();
  legendHost.replaceChildren();

  const m = t();
  const cols = columns(host);
  host.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  for (const [panelIndex, series] of styles.entries()) {
    /* One cell per episode that published something for this measure. Every
       dataset gets the same cells in the same order, so the markers line up by
       index. */
    const cells: Cell[] = [];
    EPISODES.forEach((ep, i) => {
      const c = cellOf(ep, i, series.key);
      if (c) cells.push(c);
    });
    if (!cells.length) continue;

    const lo = Math.min(...cells.map((c) => c.min)) * 0.8;
    const hi = Math.max(...cells.map((c) => c.max)) * 1.3;

    const { figure, canvas } = panelFigure(
      m.items[series.key].short,
      fill(m.panels.summaryMeta, { n: cells.length }),
    );
    host.append(figure);

    const datasets: PanelDataset[] = [
      rangeDataset(series.key, m.panels.range, cells),
      medianDataset(series.key, m.panels.median, cells),
      peakDataset(series.key, m.panels.peak, cells),
    ];

    const chart = track(
      new Chart<"line">(canvas, {
        type: "line",
        data: { datasets } as unknown as ChartData<"line">,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: { mode: "nearest", intersect: true, axis: "x" },
          layout: { padding: { top: 6, right: 12, bottom: 0, left: 0 } },
          scales: {
            x: {
              type: "linear",
              min: -0.45,
              max: EPISODES.length - 0.55,
              grid: { display: false },
              ticks: {
                autoSkip: false,
                maxRotation: 60,
                minRotation: 60,
                font: { size: 10 },
                callback: (v: string | number) => {
                  const n = Number(v);
                  const i = Math.round(n);
                  return Math.abs(n - i) < 1e-6 && EPISODES[i]
                    ? m.episodes[EPISODES[i].id].short
                    : "";
                },
              },
              afterBuildTicks: (axis: { ticks: { value: number }[] }) => {
                axis.ticks = EPISODES.map((_, i) => ({ value: i }));
              },
            },
            y: {
              type: "logarithmic",
              min: lo,
              max: hi,
              title: {
                display: panelIndex % cols === 0,
                text: m.items[series.key].label,
                color: THEME.label,
                font: { size: 11 },
              },
              grid: { color: THEME.axisGrid, drawTicks: false },
              ticks: {
                autoSkip: false,
                maxTicksLimit: 5,
                padding: 6,
                font: { size: 10 },
                callback: (v: string | number) => {
                  const n = Number(v);
                  const dec =
                    Math.abs(Math.log10(n) - Math.round(Math.log10(n))) < 1e-9;
                  return dec ? compact().format(n) : "";
                },
              },
              afterBuildTicks: (axis: { ticks: { value: number }[] }) => {
                axis.ticks = decades(lo, hi).map((value) => ({ value }));
              },
            },
          },
          plugins: {
            legend: { display: false },
            title: { display: false },
            subtitle: { display: false },
            tooltip: {
              displayColors: true,
              boxWidth: 8,
              boxHeight: 8,
              boxPadding: 4,
              callbacks: {
                title: (items: TooltipItem<"line">[]) => {
                  const p = items[0]?.raw as StatPt | undefined;
                  return p ? wrapTooltipLines(p.t, items[0], "title") : [];
                },
                label: (item: TooltipItem<"line">) => {
                  const p = item.raw as StatPt;
                  const name = item.dataset.label ?? "";
                  const value = nf().format(Math.round(p.y));
                  return wrapTooltipLines(
                    name ? `${name}: ${value}` : value,
                    item,
                    "body",
                  );
                },
                afterBody: (items: TooltipItem<"line">[]) => {
                  const first = items[0];
                  if (!first) return [];
                  const p = first.raw as StatPt;
                  const hovered = (first.dataset as StatDataset).__stat;
                  const lines: string[] = [];

                  /* the statistic that was not hovered */
                  if (hovered !== "median" && p.n > 1)
                    lines.push(
                      `${m.panels.median}: ${nf().format(Math.round(p.median))}`,
                    );
                  if (hovered !== "peak" && p.n > 1)
                    lines.push(
                      `${m.panels.peak}: ${nf().format(Math.round(p.max))}`,
                    );
                  lines.push(
                    `${m.panels.range}: ${nf().format(Math.round(p.min))}–${nf().format(Math.round(p.max))}`,
                  );
                  lines.push(
                    p.n > 1
                      ? fill(m.panels.figureCount, { n: p.n })
                      : m.panels.singleFigure,
                  );
                  return lines.flatMap((l) =>
                    wrapTooltipLines(l, first, "body"),
                  );
                },
              },
            },
          },
          onHover: (_e, els, chart) => {
            const i = els[0]?.datasetIndex;
            const d =
              i === undefined
                ? undefined
                : (chart.data.datasets[i] as StatDataset | undefined);
            emphasiseStat(d?.__stat ?? null);
          },
        },
        plugins: [rangeBand],
      }),
    );
    summaryPanels.push(chart as Chart<"line", (number | Point | null)[]>);
  }

  legend(legendHost, "stats", [
    {
      text: m.panels.range,
      color: alpha(RANGE_COLOR, 0.45),
      on: () => emphasiseStat("range", true),
      off: () => emphasiseStat(null, true),
      hide: (hidden) => setStatHidden("range", hidden),
    },
    {
      text: m.panels.median,
      color: MEDIAN_COLOR,
      on: () => emphasiseStat("median", true),
      off: () => emphasiseStat(null, true),
      hide: (hidden) => setStatHidden("median", hidden),
    },
    {
      text: m.panels.peak,
      color: PEAK_COLOR,
      on: () => emphasiseStat("peak", true),
      off: () => emphasiseStat(null, true),
      hide: (hidden) => setStatHidden("peak", hidden),
    },
  ]);
}

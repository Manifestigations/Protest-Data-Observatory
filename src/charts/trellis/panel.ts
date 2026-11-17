/* ── Trellis panel furniture ─────────────────────────────────────────────────
   Scales, the figure/canvas factory, the options factory and the per-panel
   a11y table. Shared by section C (one panel per episode) and section C′
   (one panel per metric); none of it holds state. */

import {
  Chart,
  type ActiveElement,
  type ChartEvent,
  type ChartOptions,
  type InteractionMode,
  type TooltipItem,
} from "chart.js";
import { a11y, compact, fill, nf, pctOf, t } from "../../copy/index.ts";
import { fromChart, keyboardChart } from "../../core/a11y.ts";
import { THEME } from "../../core/canvas-registry.ts";
import { el } from "../../core/dom.ts";
import { EPISODES } from "../../data/episodes/index.ts";
import { METRICS, type Episode } from "../../model/index.ts";
import { wrapTooltipLines } from "../tooltip.ts";
import { statsOf, type PanelDataset, type Pt } from "./engine.ts";
import { resolvedColumns } from "./index.ts";
import { WEEK_MODE } from "./interaction.ts";

/** Hover callback shared by panelOptions and every panel call site. */
export type PanelHover = (
  event: ChartEvent,
  elements: ActiveElement[],
  chart: Chart<"line">,
) => void;

export type TrellisKind = "episode" | "item";

/* ── Scales ────────────────────────────────────────────────────────────────── */

export function xScale(maxW: number) {
  const step = maxW <= 8 ? 1 : maxW <= 12 ? 2 : maxW <= 24 ? 4 : 8;
  return {
    type: "linear" as const,
    min: -0.5,
    max: maxW + 0.5,
    grid: { display: false },
    border: { display: false },
    ticks: {
      autoSkip: false,
      maxRotation: 0,
      font: { size: 9 },
      color: THEME.muted,
      padding: 4,
      callback: (v: string | number) => String(Number(v)),
    },
    afterBuildTicks: (axis: { ticks: { value: number }[] }) => {
      const out: { value: number }[] = [];
      for (let v = 0; v <= maxW + 0.001; v += step) out.push({ value: v });
      axis.ticks = out;
    },
    afterFit: (s: { height: number }) => {
      s.height = 20;
    },
  };
}

/** 1-per-decade for wide ranges, 1-and-3 for medium, 1-2-5 for narrow. */
function logTicks(min: number, max: number): number[] {
  const l = Math.log10(min);
  const span = Math.log10(max) - l;
  const mantissas = span > 4.5 ? [1] : span > 1.5 ? [1, 3] : [1, 2, 5];
  const out: number[] = [];
  for (let e = Math.floor(l); e <= Math.ceil(Math.log10(max)); e++) {
    for (const m of mantissas) {
      const v = Number((m * 10 ** e).toPrecision(12));
      if (v > min * 1.01 && v < max / 1.01) out.push(v);
    }
  }
  return out;
}

export function yScale(min: number, max: number, showLabels: boolean) {
  const ticks = logTicks(min, max);
  return {
    type: "logarithmic" as const,
    min,
    max,
    grid: { color: THEME.grid, drawTicks: false, lineWidth: 1 },
    border: { display: false },
    ticks: {
      display: showLabels,
      font: { size: 9 },
      color: THEME.muted,
      padding: 6,
      callback: (v: string | number) => compact().format(Number(v)),
    },
    afterBuildTicks: (axis: { ticks: { value: number }[] }) => {
      axis.ticks = ticks.map((value) => ({ value }));
    },
    afterFit: (s: { width: number }) => {
      s.width = 46;
    },
  };
}

/* ── Tooltip ───────────────────────────────────────────────────────────────── */

/** Share of a figure against the four reference points, in one sentence. */
function shareLine(p: Pt, dataset: PanelDataset): string | null {
  if (!(p.base > 0)) return null;
  const stats = statsOf(dataset.data);
  if (!stats) return null;

  const m = t().tooltip;
  const part = (label: string, n: number): string =>
    `${pctOf(p.y, n)} (${label})`;
  const parts = [
    part(m.cmpHighest, stats.high),
    part(m.cmpMean, stats.mean),
    part(m.cmpMedian, stats.median),
    part(m.cmpFirst, p.base),
  ];

  const last = parts.pop()!;
  return fill(m.shareComparisons, {
    list: `${parts.join(", ")}${m.listAnd}${last}`,
  });
}

export function tooltipSpec(kind: TrellisKind) {
  const m = t();
  return {
    /* C: the swatch is the series. C′: every dataset is labelled with the
       metric name, so the swatch is the only thing tying a line to its episode. */
    displayColors: true,
    boxWidth: 8,
    boxHeight: 8,
    boxPadding: 4,
    callbacks: {
      title: (items: TooltipItem<"line">[]) => {
        const p = items[0].raw as Pt;
        /* C′ datasets are different episodes on different week grids, so no
           single episode's date label can title the tooltip. The x axis is
           labelled with week indices, so the title uses the same number. */
        const text = kind === "episode" ? p.t : `${a11y().weekHeader}${p.x}`;
        return wrapTooltipLines(text, items[0], "title");
      },
      label: (item: TooltipItem<"line">) => {
        const p = item.raw as Pt;
        const value =
          p.low === p.high
            ? nf().format(Math.round(p.low))
            : `${nf().format(Math.round(p.low))} – ${nf().format(Math.round(p.high))}`;
        const flag = m.flags[p.flag];
        const line = flag
          ? fill(m.tooltip.lineWithFlag, { value, flag })
          : fill(m.tooltip.linePlain, { value });
        /* C′: several episodes share the tooltip and all carry the metric as
           their label, so each line names its own episode. */
        const name =
          kind === "item"
            ? m.episodes[EPISODES[(item.dataset as PanelDataset).__ep].id].short
            : "";
        return wrapTooltipLines(name ? `${name}: ${line}` : line, item, "body");
      },
      afterLabel: (item: TooltipItem<"line">) => {
        const p = item.raw as Pt;
        const lines: string[] = [];
        /* A footer can only describe one dataset. In C′ that made the share
           compare an episode's value with another episode's baseline, so the
           share of the first figure moves onto each episode's own line, using
           that line's own `base` (seriesData() computes it per series). */
        if (kind === "item") {
          const n = nf().format(Math.round(p.base));
          const text =
            Math.abs(p.y - p.base) / p.base < 1e-9
              ? fill(m.tooltip.firstFigure, { n })
              : shareLine(p, item.dataset as PanelDataset);
          if (text) lines.push(...wrapTooltipLines(text, item, "body"));
        }
        if (p.note) lines.push(...wrapTooltipLines(p.note, item, "body"));
        return lines;
      },
      footer: (items: TooltipItem<"line">[]) => {
        if (kind !== "episode") return [];
        const p = items[0].raw as Pt;
        const n = nf().format(Math.round(p.base));
        const text =
          Math.abs(p.y - p.base) / p.base < 1e-9
            ? fill(m.tooltip.firstFigure, { n })
            : shareLine(p, items[0].dataset as PanelDataset);
        return text ? wrapTooltipLines(text, items[0], "footer") : [];
      },
    },
  };
}

/* ── Figure, options, table ────────────────────────────────────────────────── */

/**
 * Observation count per metric for one episode, as one localised string
 * ("p 12 · a 9 · f 8 · i 9"). Counts weeks where the metric is defined, not
 * weeks with a value, and both separators come from copy, not literals.
 */
export function observations(ep: Episode): string {
  const m = t();
  const counts = METRICS.map((k) => {
    const n = ep.weeks.filter((r) => r[k] !== undefined).length;
    return `${m.items[k].short} ${n}`;
  }).join(m.panels.obsSep);
  return fill(m.panels.obs, { counts });
}

export function panelFigure(strip: string, meta: string, note?: string) {
  const figure = el("figure", "trellis-panel");
  const caption = el("figcaption");
  const title = el("span", "strip", strip);
  title.id = `strip-${crypto.randomUUID().slice(0, 8)}`;
  caption.append(title, el("span", "strip-meta", meta));
  if (note) caption.append(el("p", "strip-note", note));

  const box = el("div", "panel-canvas");
  const canvas = el("canvas");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-labelledby", title.id); // panel name = series name
  box.append(canvas);
  figure.append(caption, box);
  return { figure, canvas };
}

/** One options factory for both trellises. */
export const panelOptions = (
  kind: TrellisKind,
  x: object,
  y: object,
  onHover?: PanelHover,
): ChartOptions<"line"> => {
  const interaction = { mode: WEEK_MODE as InteractionMode, intersect: false };
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction,
    hover: interaction,
    layout: { padding: { top: 6, right: 10, bottom: 0, left: 0 } },
    scales: { x, y } as ChartOptions<"line">["scales"],
    plugins: {
      legend: { display: false },
      title: { display: false },
      subtitle: { display: false },
      tooltip: tooltipSpec(kind),
    },
    /* chart.js types onHover's third parameter as bare `Chart`, so a
       `(…, chart: Chart<"line">) => void` is not directly assignable to it
       (Chart is invariant in TType). Every chart that reaches this callback
       is a line chart; the cast only bridges the declaration gap. */
    onHover: onHover as unknown as ChartOptions<"line">["onHover"],
  };
};

const panelPoints = (ds: unknown): (Pt | null)[] =>
  (ds as { data?: (Pt | null)[] }).data ?? [];

/**
 * Data table + keyboard navigation for one trellis panel. Shared by both
 * grids: the row index is `Pt.t`, the point's display label — the same string
 * the tooltip shows as its title (a week span, an action line, or the
 * partial-week wording). It is not a week number, so do not parse it as one.
 */
export function decoratePanel(
  chart: Chart,
  figure: HTMLElement,
  title: string,
): void {
  const datasets = chart.data.datasets;
  figure.querySelector(".data-table")?.remove();
  figure.append(
    fromChart(chart, {
      caption: fill(a11y().tableCaption, { title }),
      indexHeader: a11y().weekHeader,
      indexOf: (ds, i) => String(panelPoints(ds)[i]?.t ?? "—"),
    }),
  );
  keyboardChart(chart, {
    hint: a11y().chartHint,
    roledescription: a11y().chartRole,
    readout: (i) => {
      const week = panelPoints(datasets[0])[i]?.t ?? String(i + 1);
      const rows = datasets.map((d) => {
        const p = panelPoints(d)[i];
        return p
          ? `${d.label}: ${p.low === p.high ? p.low : `${p.low}–${p.high}`}`
          : `${d.label}: —`;
      });
      return `${week}. ${rows.join(". ")}`;
    },
  });
}

// panel.ts — shared with summary.ts; host widths are CSS-driven, so a
// rebuild of the children can't retrigger it.
const _colWatch = new WeakSet<HTMLElement>();
export function watchColumnCount(host: HTMLElement, remount: () => void): void {
  if (typeof ResizeObserver === "undefined" || _colWatch.has(host)) return;
  _colWatch.add(host);
  let n = resolvedColumns(host);
  new ResizeObserver(() => {
    const c = resolvedColumns(host);
    if (c === n) return;
    n = c;
    remount();
  }).observe(host);
}

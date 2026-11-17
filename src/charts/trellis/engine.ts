/* ── Section C/D/E — derivation layer ────────────────────────────────────────
   Rows → points → datasets → extents. No DOM, no Chart instances, no listeners.

   Convention, unchanged: p = protesters at the PEAK DAY of the week;
   a/f/i = weekly totals. Bands are authority (low) → organiser (high) where an
   organiser count exists; otherwise a point value. */

import type { Chart, ChartDataset } from "chart.js";
import { fill, fmtWeek, t } from "../../copy/index.ts";
import { gapSegment, THEME } from "../../core/canvas-registry.ts";
import { noteText } from "../../data/notes.ts";
import {
  bandOf,
  isDetached,
  midOf,
  type Episode,
  type EpisodeId,
  type Flag,
  type Metric,
  type Row,
} from "../../model/index.ts";

export interface Pt {
  x: number;
  y: number; // plotted value: midpoint of the published range, never a bound
  low: number;
  high: number;
  flag: Flag;
  note?: string;
  base: number;
  t: string;
}

export interface PanelDataset extends ChartDataset<"line", Pt[]> {
  __item: Metric;
  __ep: number;
  __color: string;
}

/** Datasets carry the trellis bookkeeping; every consumer wants the cast. */
export const datasetsOf = (chart: Chart<"line">): PanelDataset[] =>
  chart.data.datasets as PanelDataset[];

/**
 * Row label, used as the tooltip title and the data-table index: the week
 * span, prefixed by the action number when the week has one ("Act 1"), then
 * suffixed by that action's name when the episode names one. students26 uses
 * the partial-week wording instead.
 */
function rowTitle(ep: Episode, r: Row): string {
  const m = t();
  if (ep.id === "students26") {
    const base = fmtWeek(r.from, r.to);
    return r.partial ? fill(m.panels.partialWeek, { label: base }) : base;
  }
  const when =
    r.act !== undefined
      ? fill(m.panels.act, { n: r.act })
      : fmtWeek(r.from, r.to);
  const action = m.episodes[ep.id].weeks[r.w]?.action;
  return action ? fill(m.panels.withAction, { when, action }) : when;
}

function noteFor(id: EpisodeId, r: Row, m: Metric): string | undefined {
  /* Both branches verbatim from episodes.ts. The students branch falls back to
     the episode-level note when the cell carries no noteRef. */
  if (id === "students26") {
    return (
      noteText(r.noteRef?.[m]) || t().episodes.students26.fallbackNote?.[m]
    );
  }
  return t().episodes[id].weeks[r.w]?.note?.[m];
}

/* Memoised: rawExtent() used to rebuild every series ~33× per render, each pass
   re-running t(), fmtWeek() and noteText(). Titles are locale-bound, so it is
   cleared per mount rather than keyed by locale. */
const seriesCache = new Map<string, Pt[] | null>();

export function resetSeriesCache(): void {
  seriesCache.clear();
}

export function seriesData(ep: Episode, key: Metric): Pt[] | null {
  const id = `${ep.id}:${key}`;
  const hit = seriesCache.get(id);
  if (hit !== undefined) return hit;

  const rows = ep.weeks
    .filter((r) => r[key] !== undefined)
    .sort((a, b) => a.w - b.w);
  if (rows.length === 0) {
    seriesCache.set(id, null);
    return null;
  }

  const flagOf = (r: Row): Flag => r.flag?.[key] ?? "n";
  /* The baseline skips cumulative cells ("c") only — an actions-total must
     not become the denominator for every other week. Other detached flags
     (r/p/e) are legitimate baselines. */
  const baseRow = rows.find((r) => flagOf(r) !== "c") ?? rows[0];
  const base = midOf(baseRow[key]!);

  const out = rows.map((r) => {
    const [low, high] = bandOf(r[key]!);
    return {
      x: r.w,
      y: (low + high) / 2,
      low,
      high,
      flag: flagOf(r),
      note: noteFor(ep.id, r, key),
      base,
      t: rowTitle(ep, r),
    };
  });

  seriesCache.set(id, out);
  return out;
}

export function buildDataset(
  ep: Episode,
  epIndex: number,
  key: Metric,
  color: string,
  maxX: number,
): PanelDataset | null {
  const all = seriesData(ep, key);
  if (!all) return null;

  const points = all.filter((p) => p.x <= maxX);
  if (!points.length) return null;

  return {
    label: t().items[key].label,
    data: points,
    borderColor: color,
    backgroundColor: color,
    borderWidth: 1.75,
    pointRadius: points.map((p) => (p.flag === "c" ? 3 : 2.75)),
    pointBackgroundColor: points.map((p) =>
      isDetached(p.flag) ? THEME.hollow : color,
    ),
    pointBorderWidth: 1.5,
    pointHoverRadius: 4.5,
    pointHitRadius: 12,
    tension: 0,
    spanGaps: true,
    /* TODO(draw): with spanGaps set, a pair-level segment test cannot see the
       connector that is actually stroked; canvas-registry.ts's docstring
       points at spanSegment() for this case. Kept as found. */
    segment: gapSegment(1, [5, 4]),
    __item: key,
    __ep: epIndex,
    __color: color,
  };
}

export function rawExtent(
  eps: readonly Episode[],
  keys: readonly Metric[],
  maxX: number,
): [number, number] {
  let lo = Number.POSITIVE_INFINITY;
  let hi = Number.NEGATIVE_INFINITY;

  for (const ep of eps) {
    for (const k of keys) {
      const pts = seriesData(ep, k);
      if (!pts) continue;
      for (const p of pts) {
        if (p.x > maxX) continue;
        if (p.low > 0) lo = Math.min(lo, p.low);
        hi = Math.max(hi, p.high);
      }
    }
  }

  if (!Number.isFinite(lo) || !Number.isFinite(hi) || lo <= 0 || hi <= lo)
    return [1, 1e6];
  return [lo, hi];
}

/** Padding in log space keeps every marker off the frame without inventing round bounds. */
export function logBounds(lo: number, hi: number): [number, number] {
  const l = Math.log10(Math.max(lo, 1e-6));
  const h = Math.log10(Math.max(hi, l + 0.1));
  const pad = Math.max(0.06, (h - l) * 0.05);
  return [10 ** (l - pad), 10 ** (h + pad)];
}

/** Decade ticks only; Chart.js would otherwise label every generated minor. */
export function decades(lo: number, hi: number): number[] {
  const out: number[] = [];
  const from = Math.floor(Math.log10(Math.max(lo, 1e-6)));
  const to = Math.ceil(Math.log10(Math.max(hi, 1)));
  for (let e = from; e <= to; e++) {
    const v = 10 ** e;
    if (v >= lo * 1.0001 && v <= hi * 0.9999) out.push(v);
  }
  return out;
}

export interface SeriesStats {
  readonly low: number;
  readonly high: number;
  readonly mean: number;
  readonly median: number;
  /** How many published figures the statistics are computed from. */
  readonly count: number;
}

/** Datasets are rebuilt on every mount, so a WeakMap needs no invalidation. */
const statsCache = new WeakMap<readonly Pt[], SeriesStats>();

/** One pass per dataset, not per mousemove: the tooltip re-renders constantly. */
export function statsOf(points: readonly Pt[]): SeriesStats | null {
  const cached = statsCache.get(points);
  if (cached) return cached;

  const vs: number[] = [];
  for (const p of points) if (Number.isFinite(p.y)) vs.push(p.y);
  if (vs.length === 0) return null;

  const sorted = [...vs].sort((a, b) => a - b);
  const n = sorted.length;
  const mid = n >> 1;
  const median =
    n % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  let sum = 0;
  for (const v of vs) sum += v;

  const stats: SeriesStats = {
    low: sorted[0],
    high: sorted[n - 1],
    mean: sum / n,
    median,
    count: n,
  };
  statsCache.set(points, stats);
  return stats;
}

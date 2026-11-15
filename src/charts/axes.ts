/* ── Section A/B — scales ──────────────────────────────────────────────────── */

import type { ChartOptions } from "chart.js";
import type { ChartCardCopy } from "../copy";
import { THEME } from "../core/canvas-registry.ts";
import type { Series } from "../data/data.ts";
import { tickFormat } from "./format.ts";
import {
  AXIS_LEFT,
  AXIS_RIGHT,
  DEF,
  type SeriesId,
  type Unit,
} from "./series.ts";
import type { View } from "./view.ts";

/** 1 / 1.5 / 2 / 2.5 / 3 / 4 / 5 / 6 / 8 / 10 × 10^n — keeps bands inside the frame. */
function niceCeil(v: number): number {
  if (!Number.isFinite(v) || v <= 0) return 10;
  const base = 10 ** Math.floor(Math.log10(v));
  const n = v / base;
  const step =
    [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => n <= s + 1e-9) ?? 10;
  return step * base;
}

/** Upper bound from the values AND bands actually present on this axis. */
function axisMax(list: readonly Series[], headroom = 1.08): number {
  let max = 0;
  for (const series of list) {
    for (const p of series) {
      if (p.v !== null && p.v > max) max = p.v;
      if (p.band && p.band[1] > max) max = p.band[1];
    }
  }
  return max > 0 ? niceCeil(max * headroom) : 10;
}

const Y_TICKS = {
  maxTicksLimit: 6,
  autoSkip: false,
  font: { size: 10 },
  padding: 6,
} as const;

/** 1 / 10 / 100 / 1k / 2k. Eleven minor log ticks is what made the axis
 *  unreadable; Chart.js will not thin them itself once autoSkip is false. */
function logTicks(min: number, max: number): number[] {
  const out: number[] = [];
  const from = Math.floor(Math.log10(Math.max(min, 1e-6)));
  const to = Math.ceil(Math.log10(Math.max(max, 1)));
  for (let e = from; e <= to; e++) {
    const v = 10 ** e;
    if (v >= min * 1.0001 && v <= max * 0.9999) out.push(v);
  }
  if (max > 1) out.push(max);
  return out;
}

/** Lower bound for a log axis: the smallest positive value present. */
function axisMin(list: readonly Series[]): number {
  let min = Infinity;
  for (const series of list) {
    for (const p of series) {
      if (p.v !== null && p.v > 0 && p.v < min) min = p.v;
      if (p.band && p.band[0] > 0 && p.band[0] < min) min = p.band[0];
    }
  }
  return Number.isFinite(min) ? min : 1;
}

/** The tick formatter follows the unit, so call sites stop re-passing it. */
function yAxis(
  title: string,
  list: readonly Series[],
  unit: Unit,
  position: "left" | "right",
  log = false,
) {
  const max = axisMax(list);
  const floor = axisMin(list) * 0.9;

  // generateTicks emits 1/2/3/4/5/6/8/10/12/15/20… and buildTicks never calls
  // ticks.callback, so the minors have to be blanked here.
  const tick = (n: number): string => {
    if (!log) return tickFormat(unit)(n);
    const l = Math.log10(n);
    const decade = Math.abs(l - Math.round(l)) < 1e-9;
    return decade || Math.abs(n - max) < 1e-9 ? tickFormat(unit)(n) : "";
  };

  const base = {
    position,
    max,
    title: {
      display: true,
      text: title,
      color: THEME.label,
      font: { size: 11 },
      padding: { bottom: 6 },
    },
    ticks: {
      ...Y_TICKS,
      callback: (v: string | number) => tick(Number(v)),
    },
    grid: { color: THEME.axisGrid, drawTicks: false },
  };

  if (!log) return { type: "linear" as const, beginAtZero: true, ...base };

  return {
    type: "logarithmic" as const,
    min: floor,
    ...base,
    ticks: { ...base.ticks, autoSkip: false },
    afterBuildTicks: (axis: { ticks: { value: number }[] }) => {
      axis.ticks = logTicks(floor, max).map((value) => ({ value }));
    },
  };
}

export type Scales = NonNullable<ChartOptions<"line">["scales"]>;

function baseScales(v: View): Scales {
  return {
    x: {
      title: {
        display: true,
        text: v.xTitle,
        color: THEME.label,
        font: { size: 11 },
        padding: { top: 4 },
      },
      grid: { display: false },
      ticks: {
        maxRotation: v.maxRotation,
        autoSkip: true,
        maxTicksLimit: v.maxTicksLimit,
        font: { size: 12 },
        color: THEME.muted,
        padding: 4,
      },
    },
  };
}

export function scalesFor(
  v: View,
  card: ChartCardCopy,
  ids: readonly SeriesId[],
): Scales {
  const defs = ids.map((id) => DEF[id]);
  const left = defs.filter((d) => (d.axis ?? AXIS_LEFT) === AXIS_LEFT);
  const right = defs.filter((d) => d.axis === AXIS_RIGHT);

  // A spec with only a right-axis series must still get an `y` scale: the
  // datasets reference yAxisID "y", and a missing scale throws inside mount().
  const leftList = (left.length ? left : defs).map((d) => d.data);
  const leftUnit: Unit = left[0]?.unit ?? defs[0]?.unit ?? "count";

  const scales: Scales = {
    ...baseScales(v),
    [AXIS_LEFT]: yAxis(card.y ?? card.yLeft ?? "", leftList, leftUnit, "left"),
  };
  if (right.length) {
    scales[AXIS_RIGHT] = {
      ...yAxis(
        card.yRight ?? "",
        right.map((d) => d.data),
        right[0].unit,
        "right",
        right.some((d) => d.log),
      ),
      grid: {
        color: THEME.axisGrid,
        drawTicks: false,
        drawOnChartArea: false,
      },
    };
  }
  return scales;
}

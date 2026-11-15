/* ── Section A/B — datasets ────────────────────────────────────────────────── */

import type { ChartDataset } from "chart.js";
import { t } from "../copy";
import { THEME } from "../core/canvas-registry.ts";
import type { Pt, Series } from "../data/data.ts";
import type { Band, Flag, NoteRef } from "../model/index.ts";
import { AXIS_LEFT, DEF, type SeriesId, type Unit } from "./series.ts";

export interface ProtestDataset extends ChartDataset<
  "line",
  (number | null)[]
> {
  errorBars?: (Band | null)[];
  errorBarColor?: string;
  bandFill?: boolean;
  bandFillColor?: string;
  /** Suppress the whisker pass; the band array is still used for fill + tooltip. */
  noWhiskers?: boolean;
  quality?: (Flag | null)[];
  notes?: (NoteRef | null)[];
  unit?: Unit;
  /** Print the rate under the count: turnout series only. */
  perCapita?: boolean;
  /** hidden from the legend — the points-only twin of a line series */
  detachedOnly?: boolean;
  connectors?: ConnectorSpec;
  /** Indexical, like Chart.js's own point options. */
  pointRadius?: number | number[];
  pointHoverRadius?: number | number[];
}

/** A dashed connector means "reporting paused here", so the policy is a
 *  property of the SERIES, not of a point pair. `segment` cannot express it:
 *  it is resolved per adjacent index pair and its runs are snapped onto
 *  visible points, so a long dashed gap bleeds into the next short one. */
export interface ConnectorSpec {
  readonly series: Series;
  /** Dash a connector that skips more than this many x-slots. */
  readonly slots: number;
  /** Dotted instead, when the connector bridges the Toussaint holiday. */
  readonly holiday?: (a: number, b: number) => boolean;
}

/** A reporting break starts at 8 days. */
const DAILY_GAP = 7;
/** One empty week. */
const WEEKLY_GAP = 1;

/** A line plus, when the series contains any detached point, a hollow twin. */
export function datasetsFor(id: SeriesId, weekly: boolean): ProtestDataset[] {
  const def = DEF[id];
  if (!def) throw new Error(`datasets.ts: no DEF entry for series "${id}"`);
  if (!def.data) throw new Error(`datasets.ts: series "${id}" has no data`);

  // The mask is indexed like DEF.data, so a length mismatch would silently
  // shift every marker one slot left.
  if (def.pointRadius && def.pointRadius.length !== def.data.length) {
    throw new Error(
      `datasets.ts: "${id}" pointRadius has ${def.pointRadius.length} entries, ` +
        `expected ${def.data.length}`,
    );
  }

  const radiusAt = (i: number, bump = 0): number => {
    const r = def.pointRadius?.[i] ?? def.radius;
    return r === 0 ? 0 : r + bump;
  };

  const copy = t().chart.series[id];
  const axis = def.axis ?? AXIS_LEFT;
  const plot = (keep: (p: Pt) => boolean) =>
    def.data.map((p) => (keep(p) ? p.v : null));
  const bands = (keep: (p: Pt) => boolean) =>
    def.data.map((p) => (keep(p) ? p.band : null));

  const line: ProtestDataset = {
    label: copy.label,
    data: plot((p) => !p.detach),
    yAxisID: axis,
    unit: def.unit,
    perCapita: id === "protestersDaily" || id === "protestersWeekly",
    errorBars: bands((p) => !p.detach),
    errorBarColor: def.color,
    bandFill: Boolean(def.bandFill),
    bandFillColor: def.bandFill,
    noWhiskers: Boolean(def.shadeOnly),
    quality: def.data.map((p) => p.q),
    notes: def.data.map((p) => p.note),
    borderColor: def.color,
    backgroundColor: def.color,
    borderWidth: def.width,
    pointStyle: def.style,
    pointRadius: def.data.map((_, i) => radiusAt(i)),
    pointHoverRadius: def.data.map((_, i) => radiusAt(i, 2)),
    pointHitRadius: 14,
    tension: 0,
    // Chart.js must connect nothing across a hole: the connectors plugin
    // draws every bridge itself, so solid/dashed/dotted is decided once.
    spanGaps: false,
    connectors: {
      series: def.data,
      slots: weekly ? WEEKLY_GAP : DAILY_GAP,
    },
  };

  if (!def.data.some((p) => p.detach)) return [line];

  return [
    line,
    {
      label: copy.detached,
      data: plot((p) => p.detach),
      yAxisID: axis,
      unit: def.unit,
      perCapita: id === "protestersDaily" || id === "protestersWeekly",
      showLine: false,
      detachedOnly: true,
      errorBars: bands((p) => p.detach),
      errorBarColor: def.color,
      noWhiskers: Boolean(def.shadeOnly),
      quality: line.quality,
      notes: line.notes,
      borderWidth: 0,
      pointStyle: def.style ?? "circle",
      pointBackgroundColor: THEME.hollow,
      pointBorderColor: def.color,
      pointBorderWidth: 2,
      pointRadius: def.data.map((_, i) => radiusAt(i, 1)),
      pointHoverRadius: def.data.map((_, i) => radiusAt(i, 3)),
      pointHoverBorderWidth: 3,
      pointHitRadius: 14,
      spanGaps: false,
    },
  ];
}

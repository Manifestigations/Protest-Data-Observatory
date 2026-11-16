/* ── Section A/B — datasets ─────────────────────────────────────────────── */

import type { ChartDataset } from "chart.js";

import { t } from "../copy";
import { THEME } from "../core/canvas-registry.ts";
import type { Pt, Series } from "../data/data.ts";
import type { Band, Flag, NoteRef } from "../model/index.ts";
import { AXIS_LEFT, DEF, type SeriesId, type Unit } from "./series.ts";
import { tones, type Tone, type ToneColours } from "../core/colors.ts";

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
  /** Diagonal second colour, painted by charts/plugins/hatch.ts on bars. */
  hatch?: string;
}

/** A dashed connector means "reporting paused here", so the policy is a
 * property of the SERIES, not of a point pair. `segment` cannot express it:
 * it is resolved per adjacent index pair and its runs are snapped onto
 * visible points, so a long dashed gap bleeds into the next short one. */
export interface ConnectorSpec {
  readonly series: Series;
  /** Dash a connector that skips more than this many x-slots. */
  readonly slots: number;
  /** Dotted instead, when the connector bridges the Toussaint holiday. */
  readonly holiday?: (a: number, b: number) => boolean;
}

/* ── The palette: one series, one meaning, one tone ─────────────────────── */

/**
 * Position-independent and theme-independent. A red line is always arrests,
 * a blue line is always the police, whatever slot it occupies in a chart.
 *
 * `protestersDaily/Weekly` are turnout counts, so they take the turnout tone;
 * the *protester-injured* series are about protesters, so they take protest.
 */
const SERIES_TONE: Readonly<Record<SeriesId, Tone>> = {
  protestersDaily: "protest",
  protestersWeekly: "protest",
  strikersDaily: "protestSoft",
  strikersWeekly: "protestSoft",

  arrestsDaily: "arrest",
  arrestsWeekly: "arrest",

  forcesDaily: "police",
  forcesWeekly: "police",
  forcesInjuredStock: "police",

  protestersInjuredDaily: "protest",
  protestersInjuredWeekly: "protest",
  blockadesDaily: "blockade",
  blockadesWeekly: "blockade",

  damagesDaily: "cost",
  policingDaily: "policeCost",
  policingCumulative: "policeCost",
};

/** The tone for a series; blue is the safe default for a new id. */
export const toneOf = (id: SeriesId): Tone => SERIES_TONE[id] ?? "police";

/** Resolved colours for a series. `tones` caches the CSS probe itself. */
export const styleOf = (id: SeriesId): ToneColours => tones[toneOf(id)];

/** Yellow second colour for the policing-cost bars; undefined otherwise. */
export const hatchOf = (id: SeriesId): string | undefined => {
  const c = styleOf(id);
  return c.hatch;
};

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

  const c = styleOf(id);
  const copy = t().chart.series[id];
  const axis = def.axis ?? AXIS_LEFT;
  const perCapita = id === "protestersDaily" || id === "protestersWeekly";
  const shaded = Boolean(def.bandFill);
  const n = def.data.length;

  // One pass. Every parallel array is index-aligned with def.data by
  // construction, because they are written in the same loop that reads it.
  const solid: (number | null)[] = Array.from({ length: n }, () => null);
  const detached: (number | null)[] = Array.from({ length: n }, () => null);
  const solidBand: (Band | null)[] = Array.from({ length: n }, () => null);
  const detachedBand: (Band | null)[] = Array.from({ length: n }, () => null);
  const quality: (Flag | null)[] = new Array(n);
  const notes: (NoteRef | null)[] = new Array(n);
  const radius: number[] = new Array(n);
  const hoverRadius: number[] = new Array(n);
  const twinRadius: number[] = new Array(n);
  const twinHoverRadius: number[] = new Array(n);

  let anyDetached = false;

  for (let i = 0; i < n; i++) {
    const p: Pt = def.data[i]!;
    const r = def.pointRadius?.[i] ?? def.radius;
    const base = r === 0 ? 0 : r;

    quality[i] = p.q;
    notes[i] = p.note;
    radius[i] = base;
    hoverRadius[i] = base === 0 ? 0 : base + 2;
    twinRadius[i] = base === 0 ? 0 : base + 1;
    twinHoverRadius[i] = base === 0 ? 0 : base + 3;

    if (p.detach) {
      anyDetached = true;
      detached[i] = p.v;
      detachedBand[i] = p.band;
    } else {
      solid[i] = p.v;
      solidBand[i] = p.band;
    }
  }

  const line: ProtestDataset = {
    label: copy.label,
    data: solid,
    yAxisID: axis,
    unit: def.unit,
    perCapita,
    errorBars: solidBand,
    errorBarColor: c.fill,
    bandFill: shaded,
    bandFillColor: shaded ? c.wash : undefined,
    noWhiskers: Boolean(def.shadeOnly),
    quality,
    notes,
    borderColor: c.fill,
    backgroundColor: shaded ? c.wash : c.fill,
    borderWidth: def.width,
    pointStyle: def.style,
    pointRadius: radius,
    pointHoverRadius: hoverRadius,
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

  if (!anyDetached) return [line];

  return [
    line,
    {
      label: copy.detached,
      data: detached,
      yAxisID: axis,
      unit: def.unit,
      perCapita,
      showLine: false,
      detachedOnly: true,
      errorBars: detachedBand,
      errorBarColor: c.fill,
      noWhiskers: Boolean(def.shadeOnly),
      quality,
      notes,
      borderWidth: 0,
      pointStyle: def.style ?? "circle",
      // Hollow: page-coloured fill, toned rim. `edge` keeps a white tone
      // (bystanders) visible against a white sheet.
      pointBackgroundColor: THEME.hollow,
      pointBorderColor: c.edge,
      pointBorderWidth: 2,
      pointRadius: twinRadius,
      pointHoverRadius: twinHoverRadius,
      pointHoverBorderWidth: 3,
      pointHitRadius: 14,
      spanGaps: false,
    },
  ];
}

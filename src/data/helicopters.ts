/* ════════════════════════════════════════════════════════════════════════════
   src/data/helicopters.ts  — corrected, drop-in replacement for the whole file
   Values in M€ (Unit = "count" | "eurM"; policing series is eurM).
   ════════════════════════════════════════════════════════════════════════════ */

import { bandOf, type Band } from "../model/index.ts";
import { DAILY, DATES, type Pt, type Series } from "./data.ts";

/** €/h — requisition tariff; reproduces the 2019 yellow-vest precedent. */
export const RATE_REQUISITION = 1_412;
/** €/h — IGA 2016 audit figure for law-and-order hours. */
export const RATE_AUDIT = 1_800;
/** €/h — all-in, Sénat 2026 (H145-D3 / H160 amortisation + MCO). */
export const RATE_ALL_IN = 7_000;

const M = 1e6;

export type Basis =
  "clashes" | "nightPatrol" | "saturday" | "intersyndical" | "ongoing";

export interface FlightDay {
  readonly date: string;
  readonly hours: Band;
  readonly cities: number;
  readonly basis: Basis;
}

/** `hours` = TOTAL fleet flight hours for the day.
 *  Low counts only aircraft confirmed by an ADS-B trace or a press report;
 *  high assumes one aircraft per reported city. Repositioning legs and
 *  rescue sorties excluded. */
export const FLIGHT_DAYS: readonly FlightDay[] = [
  { date: "2026-10-17", hours: [8, 20], cities: 6, basis: "clashes" },
  { date: "2026-10-18", hours: [6, 14], cities: 4, basis: "clashes" },
  { date: "2026-10-19", hours: [2, 4], cities: 1, basis: "nightPatrol" },
  { date: "2026-10-24", hours: [10, 24], cities: 6, basis: "saturday" },
  { date: "2026-10-31", hours: [10, 24], cities: 6, basis: "saturday" },
  { date: "2026-11-05", hours: [8, 18], cities: 5, basis: "intersyndical" },
  { date: "2026-11-07", hours: [10, 24], cities: 6, basis: "saturday" },
  { date: "2026-11-14", hours: [8, 20], cities: 5, basis: "ongoing" },
  { date: "2026-11-15", hours: [8, 20], cities: 5, basis: "ongoing" },
];

export interface DayCost {
  readonly date: string;
  readonly hours: [number, number];
  readonly cities: number;
  readonly basis: Basis;
  /** M€ — low at the requisition rate, high at the audit rate */
  readonly inService: [number, number];
  /** M€ — full-cost valuation */
  readonly allIn: [number, number];
}

export const HELI_DAYS: readonly DayCost[] = FLIGHT_DAYS.map((d) => {
  const [hLo, hHi] = bandOf(d.hours);
  return {
    date: d.date,
    hours: [hLo, hHi],
    cities: d.cities,
    basis: d.basis,
    inService: [(hLo * RATE_REQUISITION) / M, (hHi * RATE_AUDIT) / M],
    allIn: [(hLo * RATE_ALL_IN) / M, (hHi * RATE_ALL_IN) / M],
  };
});

export const HELI_BY_DATE: ReadonlyMap<string, DayCost> = new Map(
  HELI_DAYS.map((d) => [d.date, d]),
);

/** Index of each flying day on the chart's x-axis, or -1. Built once, so the
 *  series derivation below is O(DATES) in lookups rather than O(DATES×n). */
const HELI_AT: ReadonlyMap<number, DayCost> = new Map(
  DATES.reduce<Array<[number, DayCost]>>((acc, date, i) => {
    const d = HELI_BY_DATE.get(date);
    if (d) acc.push([i, d]);
    return acc;
  }, []),
);

/** Declared BEFORE HELI_TOTALS reads it. */
const DATES_SET: ReadonlySet<string> = new Set(DATES);

const sum = (pick: (d: DayCost) => [number, number]): [number, number] =>
  HELI_DAYS.reduce<[number, number]>(
    (a, d) => {
      const [lo, hi] = pick(d);
      return [a[0] + lo, a[1] + hi];
    },
    [0, 0],
  );

export const HELI_TOTALS = {
  days: HELI_DAYS.length,
  hours: sum((d) => d.hours),
  inService: sum((d) => d.inService),
  allIn: sum((d) => d.allIn),
  /** The part falling on a day the chart also carries a ground deployment
   *  figure — the only part that moves the plotted line. */
  onPublishedDays: sum((d) => (DATES_SET.has(d.date) ? d.inService : [0, 0])),
} as const;

/* ── Derivation ─────────────────────────────────────────────────────────────
   Pt carries no date: series are positionally aligned to DATES, so the
   guard `if (!date) return p` covers a length mismatch rather than a miss.
   Days with sorties but no published deployment figure keep their hole; they
   are counted in the text block, not invented onto the chart. */

function withAerial(base: Series, mode: "daily" | "cumulative"): Series {
  let runLo = 0;
  let runHi = 0;

  return base.map((p: Pt, i: number) => {
    const date = DATES[i];
    if (date === undefined) return p;

    const d = HELI_AT.get(i);
    if (d === undefined) return p;

    const [aLo, aHi] = d.inService;

    if (mode === "cumulative") {
      runLo += aLo;
      runHi += aHi;
      if (p.v === null) return p;
      const [bLo, bHi] = p.band ?? [p.v, p.v];
      const loT = bLo + runLo;
      const hiT = bHi + runHi;
      return { ...p, v: (loT + hiT) / 2, band: [loT, hiT] };
    }

    if (p.v === null) return p;

    const [bLo, bHi] = p.band ?? [p.v, p.v];
    const loT = bLo + aLo;
    const hiT = bHi + aHi;
    return { ...p, v: (loT + hiT) / 2, band: [loT, hiT] };
  });
}

export const POLICING_WITH_AERIAL = {
  daily: withAerial(DAILY.policing, "daily"),
  cumulative: withAerial(DAILY.policingCumulative, "cumulative"),
} as const;

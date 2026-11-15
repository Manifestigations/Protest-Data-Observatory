/* ── Palette ─────────────────────────────────────────────────────────────────
   The colour values are load-bearing: they must stay in step with the print
   palette and the CSS custom properties. Copied verbatim from episodes.ts —
   retyping them silently recolours four charts. */

import type { Metric } from "../../model";

/** One dim factor for the whole app: emphasis, legend hover, host opacity. */
export const DIM = 0.18;

export interface SeriesDef {
  readonly key: Metric;
  readonly color: string;
}

/** Colour only — labels come from t().items. */
export const SERIES: readonly SeriesDef[] = [
  { key: "p", color: "#1d4ed8" },
  { key: "a", color: "#b91c1c" },
  { key: "f", color: "#047857" },
  { key: "i", color: "#b45309" },
];

/** Sequential ramp, light → dark, identical in every companion panel. */
export const RAMP: readonly string[] = [
  "#D6E6F2",
  "#B0CFE6",
  "#86B4D7",
  "#5C97C5",
  "#357AB0",
  "#1B5C92",
  "#0A3A63",
] as const;

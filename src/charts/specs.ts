/* ── Section A/B — the five canvases ─────────────────────────────────────────
   Declared once: main.ts no longer keeps a parallel list, and boot() validates
   its REQUIRED ids from CHARTS. */

import type { ChartCopy } from "../copy";
import type { SeriesId } from "./series.ts";

export interface ChartSpec {
  readonly id: string;
  readonly copy: keyof ChartCopy["charts"];
  readonly weekly: boolean;
  readonly series: readonly SeriesId[];
}

export const CHARTS: readonly ChartSpec[] = [
  {
    id: "chart-protesters",
    copy: "protestersDaily",
    weekly: false,
    series: ["protestersDaily", "strikersDaily", "blockadesDaily"],
  },
  {
    id: "chart-enforcement",
    copy: "enforcementDaily",
    weekly: false,
    series: [
      "arrestsDaily",
      "forcesDaily",
      "forcesInjuredStock",
      "protestersInjuredDaily",
    ],
  },
  {
    id: "chart-costs",
    copy: "cost",
    weekly: false,
    series: ["damagesDaily", "policingDaily", "policingCumulative"],
  },
  {
    id: "chart-protesters-weekly",
    copy: "protestersWeekly",
    weekly: true,
    series: ["protestersWeekly", "strikersWeekly", "blockadesWeekly"],
  },
  {
    id: "chart-enforcement-weekly",
    copy: "enforcementWeekly",
    weekly: true,
    series: ["arrestsWeekly", "forcesWeekly", "protestersInjuredWeekly"],
  },
];

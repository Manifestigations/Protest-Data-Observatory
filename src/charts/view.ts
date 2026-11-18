/* ── Section A/B — axis view ─────────────────────────────────────────────────
   One object carries everything that differs between the daily and weekly
   charts, so the shell and the tooltip never re-test `weekly`. */

import { DATES, WEEKS } from "@manifestigations/dataset";
import { fill, fmtDate, fmtDayMonth, fmtWeek, t } from "../copy";

export interface View {
  labels: string[];
  titles: string[];
  footers: (string | null)[];
  xTitle: string;
  maxRotation: number;
  maxTicksLimit: number;
}

export function view(weekly: boolean): View {
  const c = t().chart;
  return weekly
    ? {
        labels: WEEKS.map(
          (w) => fmtWeek(w.key, w.end) + (w.touchesEdge ? c.edgeMark : ""),
        ),
        titles: WEEKS.map((w) =>
          fill(w.touchesEdge ? c.weekOfPartial : c.weekOf, {
            date: fmtDayMonth(w.key),
          }),
        ),
        footers: WEEKS.map(() => null),
        xTitle: c.axisWeek,
        maxRotation: 0,
        maxTicksLimit: 12,
      }
    : {
        labels: DATES.map(fmtDayMonth),
        titles: DATES.map(fmtDate),
        footers: DATES.map((d) => c.dayNotes[d] ?? null),
        xTitle: c.axisDate,
        maxRotation: 90,
        maxTicksLimit: 25,
      };
}

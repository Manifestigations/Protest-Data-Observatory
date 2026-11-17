/* The 2026 window: days, weeks and the Toussaint school holidays. */

export const START = "2026-09-15";
export const END = "2026-11-11";

const utc = (s: string): Date => new Date(`${s}T00:00:00Z`);
export const iso = (d: Date): string => d.toISOString().slice(0, 10);

export const addDays = (isoDate: string, n: number): string => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** ISO date of the Monday on or before `isoDate`. */
export const mondayOf = (isoDate: string): string => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); // Mon→0 … Sun→6
  return d.toISOString().slice(0, 10);
};

function eachDay(start: string, end: string): string[] {
  const out: string[] = [];
  const stop = utc(end);
  for (const d = utc(start); d <= stop; d.setUTCDate(d.getUTCDate() + 1))
    out.push(iso(d));
  return out;
}

export const DATES: readonly string[] = eachDay(START, END);

export interface Week {
  key: string; // ISO Monday — the aggregator key
  end: string; // ISO Sunday
  dates: string[];
  touchesEdge: boolean; // the week is cut by the window on either side
}

export const WEEKS: readonly Week[] = (() => {
  const byKey = new Map<string, string[]>();
  for (const d of DATES) {
    const k = mondayOf(d);
    const list = byKey.get(k);
    if (list) list.push(d);
    else byKey.set(k, [d]);
  }
  return [...byKey]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, dates]) => {
      const end = addDays(key, 6);
      return { key, end, dates, touchesEdge: key < START || end > END };
    });
})();

/* ── School holidays (vacances scolaires) ──────────────────────────────────
   Toussaint 2026: classes end Saturday 17 October and resume Monday
   2 November — the same dates in zones A, B and C, so no zone logic.
   The band opens on 18 October, not on the 17th: 17 October was a school
   day and carries the peak of the movement, so shading it would read as a
   holiday effect on the largest crowd of the episode.
   Source: education.gouv.fr, calendrier scolaire 2026-2027. */
export const HOLIDAY_START = "2026-10-18";
export const HOLIDAY_END = "2026-11-01";

/** The week overlaps the holiday. */
export const weekTouchesHoliday = (weekStart: string): boolean =>
  weekStart <= HOLIDAY_END && addDays(weekStart, 6) >= HOLIDAY_START;

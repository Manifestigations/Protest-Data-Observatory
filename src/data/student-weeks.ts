/* Section C's weekly table: one row per week, p/a/f/i bands with flags. */

import {
  METRICS,
  METRIC_OF,
  type Flag,
  type Metric,
  type NoteRef,
} from "../model/index.ts";
import { WEEKLY } from "./aggregate.ts";
import { WEEKS } from "./calendar.ts";

export interface StudentWeek {
  key: string; // ISO Monday — also the row's `from`
  end: string; // ISO Sunday
  touchesEdge: boolean;
  p: [number, number] | null;
  a: [number, number] | null;
  f: [number, number] | null;
  i: [number, number] | null;
  flags: Partial<Record<Metric, Flag>>;
  notes: Partial<Record<Metric, NoteRef>>;
}

export const STUDENT_WEEKS: readonly StudentWeek[] = WEEKS.map((week, idx) => {
  const out: StudentWeek = {
    key: week.key,
    end: week.end,
    touchesEdge: week.touchesEdge,
    p: null,
    a: null,
    f: null,
    i: null,
    flags: {},
    notes: {},
  };

  for (const m of METRICS) {
    const pt = WEEKLY[METRIC_OF[m]][idx];
    if (pt.band) out[m] = pt.band;
    // A flag is only meaningful where there is a band: an empty week must
    // not inherit an override and sprout a phantom marker.
    if (pt.band && pt.q && pt.q !== "n") out.flags[m] = pt.q;
    if (pt.note) out.notes[m] = pt.note;
  }
  return out;
});

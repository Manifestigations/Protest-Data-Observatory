/* -------------------------------------------------------------- 2026 rows */

import { METRICS, type Episode, type Row } from "../../model";
import { END, STUDENT_WEEKS, type StudentWeek } from "../data";

/** STUDENT_WEEKS already carries bands, flags and note refs; this is a copy, not
 *  a recalculation — the fallback table and the index patch are gone.
 *  The window now opens on the week of 14 Sep 2026, so the episode runs nine
 *  weekly rows instead of seven:
 *    w0 14–20 Sep — no published figure for any metric (EMPTY)
 *    w1 21–27 Sep — 21 interpellations (Paris only, "r")
 *    w2 28 Sep–4 Oct — Act I (29 Sep) and Acte II (1 Oct); the week's injury
 *        figure is the cumulative level of 235 reached on 1 Oct ("c")
 *    w3 5–11 Oct — Acte III (6 Oct)
 *    w4 12–18 Oct — 17 Oct
 *    w5 19–25 Oct — 24 Oct
 *    w6 26 Oct–1 Nov — 31 Oct
 *    w7 2–8 Nov — 5 and 7 Nov
 *    w8 9–15 Nov — 9 Nov, clipped by the window
 *  Week 0's injury cell is empty, and the first injury figure is the floor
 *  of 1 on 28 Sep; 17 Oct (flag "e") anchors the injury series. */
export const STUDENTS: Episode = {
  id: "students26",
  start: STUDENT_WEEKS[0].key,
  end: END, // the window's last day, not the Sunday of the final week
  weeks: STUDENT_WEEKS.map((wk: StudentWeek, w) => {
    const row: Row = { w, from: wk.key, to: wk.end, partial: wk.touchesEdge };
    for (const m of METRICS) {
      const band = wk[m];
      if (band) row[m] = band;
      const flag = wk.flags[m];
      if (flag && flag !== "n") (row.flag ??= {})[m] = flag;
      const ref = wk.notes[m];
      if (ref) (row.noteRef ??= {})[m] = ref;
    }
    return row;
  }),
};

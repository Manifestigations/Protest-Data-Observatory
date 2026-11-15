import type { Episode } from "../../model";

/* ── CPE 2006 ───────────────────────────────────────────────────────────────
   The worst-documented episode for enforcement: the CAJ total (4,500 arrests,
   1,950 in garde à vue, 635 prosecutions) is movement-wide, not a per-day
   series, and it counts arrests rather than custody. The Paris-only figures
   for 18 March are the most reliable single-day numbers in the episode.
   OPEN GAP (closed as "no such figure exists"): 15 Feb, 25 Feb, 4 Mar and
   11 Mar action days carry no crowd figure in either encyclopaedic source;
   the only series published is 7 Feb, 16 Mar, 28 Mar and 4 Apr. One addition
   was made: 14 Mar 2006 = 41,000 (police source), a second action day
   inside the week of 16 Mar.                                         */
export const CPE: Episode = {
  id: "cpe",
  start: "2006-02-06",
  end: "2006-04-16",
  weeks: [
    /* 7 Feb: first national action day, 187 demonstrations. */
    { w: 0, from: "2006-02-06", to: "2006-02-12", p: [200_000, 400_000] },
    /* 7 Mar: ">1 million" claimed; ~38 universities on strike by 9 Mar. */
    { w: 4, from: "2006-03-06", to: "2006-03-12", p: [400_000, 1_000_000] },
    {
      /* 16 Mar: 250,000 (Le Monde) / 447,500 (police) — the ministry's
         247,500 is the same police count rounded differently.
         18 Mar: 500,000 ministry / 1.5M organisers; Paris 80,000–350,000.
         Enforcement, Paris only: 156 (ministry) / 167 (organisers) arrests;
         34 forces injured.
         Protesters injured 70 = 18 (16 Mar) + 52 (18 Mar), Paris only —
         flagged "e" because it is a two-day Paris sum inside a weekly row.
         14 Mar (same week, second action day): 41,000 (police source). */
      w: 5,
      from: "2006-03-13",
      to: "2006-03-19",
      p: [500_000, 1_500_000],
      a: [156, 167],
      f: 34,
      i: 70,
      flag: { i: "e" },
    },
    {
      /* 23 Mar: 21 universities fully blocked, 67 striking or blocked.
         630 arrests, 90 forces injured. */
      w: 6,
      from: "2006-03-20",
      to: "2006-03-26",
      p: [220_000, 450_000],
      a: 630,
      f: 90,
    },
    /* 28 Mar: 4th national action day, 600 arrests. */
    {
      w: 7,
      from: "2006-03-27",
      to: "2006-04-02",
      p: [1_055_000, 2_710_000],
      a: 600,
    },
    /* 4 Apr: peak day of the episode. */
    { w: 8, from: "2006-04-03", to: "2006-04-09", p: [1_000_000, 3_100_000] },
    /* CPE scrapped 10 Apr; the movement splits, Easter follows. */
    { w: 9, from: "2006-04-10", to: "2006-04-16" },
  ],
};

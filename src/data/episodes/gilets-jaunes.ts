import type { Episode, Flag, Row } from "../../model";

/* ── Gilets jaunes ──────────────────────────────────────────────────────────
   One Ministry count per Saturday act, so no range is plotted: the episode is
   deliberately a ministry series. Acts 34–43 were published as "NC" (not
   communicated) and Acts 45–52 were never quantified — absence of a figure,
   not absence of people.
   Act I's 287,700 counts ALL actions including road blockades, so it is an
   actions-total rather than a march count: flagged "c", hollow, and excluded
   from the index baseline.
   Act II was initially published as 106,301 and revised up 8 days later. 
   
   Gilets jaunes organiser / union counter-counts. Published alongside the
   ministry figure, never plotted: that episode is deliberately a ministry
   series. Recorded so a band version (comparable with the other episodes,
   which use authority–organiser ranges) can be switched on without re-research.
   Source: FR-Wikipedia "Déroulement du mouvement des Gilets jaunes";
   Ouest-France running count.

     Act I   ~750,000  France Police union (as quoted for Act II)
     Act VII  123,400  (5 Jan 2019)
     Act VIII 159,200  (12 Jan 2019)
     Act IX   147,400  (19 Jan 2019)
     Act X    123,200  (26 Jan 2019)
     Act XI   116,000  (2 Feb 2019)
     Act XIII 104,100  (16 Feb 2019)
   ─────────────────────────────────────────────────────────────────────── */
export const GJ_ACTS: readonly [number, string, number][] = [
  [0, "2018-11-17", 287_700],
  [1, "2018-11-24", 166_000],
  [2, "2018-12-01", 136_000],
  [3, "2018-12-08", 136_000],
  [4, "2018-12-15", 66_000],
  [5, "2018-12-22", 38_600],
  [6, "2018-12-29", 32_000],
  [7, "2019-01-05", 50_000],
  [8, "2019-01-12", 84_000],
  [9, "2019-01-19", 84_000],
  [10, "2019-01-26", 69_000],
  [11, "2019-02-02", 58_600],
  [12, "2019-02-09", 51_400],
  [13, "2019-02-16", 41_500],
  [14, "2019-02-23", 46_600],
  [15, "2019-03-02", 39_300],
  [16, "2019-03-09", 28_600],
  [17, "2019-03-16", 32_300],
  [18, "2019-03-23", 40_500],
  [19, "2019-03-30", 33_700],
  [20, "2019-04-06", 22_300],
  [21, "2019-04-13", 31_000],
  [22, "2019-04-20", 27_900],
  [23, "2019-04-27", 23_600],
  [24, "2019-05-04", 18_900],
  [25, "2019-05-11", 18_600],
  [26, "2019-05-18", 15_500],
  [27, "2019-05-25", 12_500],
  [28, "2019-06-01", 9_500],
  [29, "2019-06-08", 10_300],
  [30, "2019-06-15", 7_000],
  [31, "2019-06-22", 11_800],
  [32, "2019-06-29", 5_800],
  [43, "2019-09-07", 7_000],
];

/** Enforcement figures exist only for Acts I–IV; later acts were not published
 *  as a series.
 *  Act I: ministry communiqué — peak 287,710 at 17:00, 3,000 sites occupied,
 *    1 death, 409 injured, 117 interpellations of which 73 GàV. The 409 is
 *    all sides and is NOT split, so no f/i pair is plotted.
 *  Act II: 24 injured including 5 police; 101 arrestations (ministry) or
 *    103 interpellations (Le JDD) for the same day. The 19 protester
 *    injuries are DERIVED (24 − 5), hence "e".
 *  Act III: Arc de Triomphe vandalism; no per-act totals published.
 *  Act IV: 1,385 interpellations and 974 GàV; ~89,000 agents mobilised —
 *    the largest enforcement operation of the episode. */
export const GJ_EXTRA: Readonly<
  Record<number, Pick<Row, "a" | "f" | "i" | "flag">>
> = {
  0: { a: [117, 73], flag: { a: "f" } },
  1: { a: [101, 103], f: 5, i: 19, flag: { i: "e" } },
  2: {},
  3: { a: 1_385 },
};

export const GILETS: Episode = {
  id: "gj",
  start: "2018-11-12",
  end: "2019-09-09",
  weeks: GJ_ACTS.map(([w, date, n]) => ({
    w,
    from: date,
    to: date,
    act: w + 1,
    p: n,
    ...(GJ_EXTRA[w] ?? {}),
    flag: {
      ...(w === 0 ? { p: "c" as Flag } : {}),
      ...(GJ_EXTRA[w]?.flag ?? {}),
    },
  })),
};

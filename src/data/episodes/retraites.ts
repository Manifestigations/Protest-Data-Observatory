import type { Episode } from "../../model";

/* ── Retirement reform 2023 ─────────────────────────────────────────────────
   Crowds only: no national weekly arrest or injury series was published for
   this movement. Two action days in one week (7 and 11 Feb) means the
   "peak day" convention understates it — the real unit is the action-day
   sequence. The union total runs about 2.8× the ministry total, the widest
   organiser/authority gap of any episode in this file.
   14 March was the CALL; the action day was 15 March (480,000 ministry /
   1.78M CGT), already in w8. The missing enforcement data belongs to
   23 Mar (457 arrests, 441 forces injured) and 6 Apr (111 arrests, 154
   police injured). Both are now plotted — they are the only enforcement
   data points this episode has.
   OPEN GAP: the w7 band (1.28M–3.5M) has an unsourced high; the sourced
   figures for that week are 11 Mar ≈368,000 and "early March" 1.1–1.4M.   */
export const PENSIONS: Episode = {
  id: "pensions",
  start: "2023-01-19",
  end: "2023-06-08",
  weeks: [
    { w: 0, from: "2023-01-16", to: "2023-01-22", p: [1_120_000, 2_000_000] },
    { w: 2, from: "2023-01-30", to: "2023-02-05", p: [1_270_000, 2_800_000] },
    { w: 3, from: "2023-02-06", to: "2023-02-12", p: [963_000, 2_500_000] },
    { w: 4, from: "2023-02-13", to: "2023-02-19", p: [440_000, 1_300_000] },
    { w: 7, from: "2023-03-06", to: "2023-03-12", p: [1_280_000, 3_500_000] },
    { w: 8, from: "2023-03-13", to: "2023-03-19", p: [480_000, 1_700_000] },
    {
      /* 23 Mar: the flashpoint — 49.3 passed, two failed no-confidence votes.
         Ministry: up to 1.08M nationwide / 119,000 Paris; CGT 3.5M / 800,000.
         Darmanin's consolidated day: 457 arrests, 441 security forces injured.
         An earlier evening statement had given 80+ arrests / 123 police hurt,
         so 457/441 is the final figure and the only one plotted. */
      w: 9,
      from: "2023-03-20",
      to: "2023-03-26",
      p: [1_089_000, 3_500_000],
      a: 457,
      f: 441,
    },
    {
      /* 27 Mar: the eleventh day of mobilisation, after the 5 April talks
         failed. Expected 600,000–800,000 nationwide (60,000–90,000 Paris).
         Interior Ministry: 111 arrests, 154 police officers injured. */
      w: 11,
      from: "2023-04-03",
      to: "2023-04-09",
      p: [570_000, 2_000_000],
      a: 111,
      f: 154,
    },
    { w: 10, from: "2023-03-27", to: "2023-04-02", p: [740_000, 2_000_000] },
    { w: 12, from: "2023-04-10", to: "2023-04-16", p: [380_000, 1_500_000] },
    { w: 16, from: "2023-05-01", to: "2023-05-07", p: [782_000, 2_300_000] },
    { w: 20, from: "2023-06-05", to: "2023-06-08", p: [281_000, 900_000] },
  ],
};

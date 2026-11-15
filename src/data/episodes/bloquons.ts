import type { Episode } from "../../model";

/* ── Bloquons tout 2025 ─────────────────────────────────────────────────────
   The label first appears on social media in May 2025; the first national
   action was 10 September 2025 against the Bayrou budget.
   10 Sep: the ministry's figure counts PARTICIPANTS IN ACTIONS, not cortèges —
   the same methodological trap as Gilets jaunes Act I — so it is flagged "c".
     It was also revised up from an early-evening count of ~29,000 to
     175,000–197,000; CGT ~250,000. 596 rallies, 253 blockages, 540 arrests
     (211 in Paris).
   18 Sep: an intersyndicale strike day — a different mobilisation from the
     movement's own actions. 309 arrests nationwide (103 in Paris, 89 GàV),
     26 forces injured, 11 protesters injured including 1 journalist.
   2 Oct: weakest mobilisation since 1 May 2025.
   w2 (22–28 Sep) is deliberately EMPTY: the movement ran three actions only
   — 10 Sep, 18 Sep and 2 Oct — and no 21 Sep march appears in any source.
   OUTCOME: Bayrou's government dissolved; the 2023 pension reform put on hold. */
export const BLOQUONS: Episode = {
  id: "bt",
  start: "2025-09-10",
  end: "2025-10-05",
  weeks: [
    {
      w: 0,
      from: "2025-09-08",
      to: "2025-09-14",
      p: [175_000, 250_000],
      a: 540,
      flag: { p: "c" },
    },
    {
      w: 1,
      from: "2025-09-15",
      to: "2025-09-21",
      p: [500_000, 1_000_000],
      a: 309,
      f: 26,
      i: 11,
    },
    { w: 3, from: "2025-09-29", to: "2025-10-05", p: [195_000, 600_000] },
  ],
};

import type { Episode } from "../../model";

/* ── Nahel 2023 ─────────────────────────────────────────────────────────────
   Under-counted by march numbers: most gatherings were banned, and the crowd
   figure that exists describes the tribute march, not the riot. The riot's
   scale is carried by arrests, burnt vehicles and the Senate's ~50,000
   "émeutiers" estimate for the whole episode.
   Week 0 = 27 Jun – 2 Jul: 3,354 arrests, 722 officers injured, 2 deaths
   (Brahim Bouarram 27 Jun; a young man 1 Jul), 5,662 vehicles burnt, 1,029
   buildings damaged.
   Week 1 = 3–9 Jul: 108 arrests (72 + 16 + 20 over 3–5 Jul), 1 officer hurt.
   Note the two totals differ between sources: the English-Wikipedia infobox
   (5,662 vehicles, 3,300+ arrests, 808 officers injured, €650M) and the
   French-Wikipedia day table (5,954 vehicles, 3,462 arrests, 723 officers
   injured) do not match; the figures used here are the day-table ones.
   The p band is an EPISODE-LEVEL rioter estimate: NO crowd count exists for
   any riot night, and the Place de la République demonstration in the
   sources was called for 8 July. Darmanin 8,000–12,000; Senate committee
   ~50,000; Brochand 100,000–200,000 — the band uses the Senate figure as
   its high, so the high is conservative. Flagged "e". */
export const NAHEL: Episode = {
  id: "nahel",
  start: "2023-06-27",
  end: "2023-07-09",
  weeks: [
    {
      w: 0,
      from: "2023-06-26",
      to: "2023-07-02",
      p: [8_000, 50_000],
      a: 3_354,
      f: 722,
      flag: { p: "e" },
    },
    { w: 1, from: "2023-07-03", to: "2023-07-09", a: 108, f: 1 },
  ],
};

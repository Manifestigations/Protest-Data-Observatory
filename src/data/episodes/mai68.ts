import type { Episode } from "../../model";

/* ── May 1968 ───────────────────────────────────────────────────────────────
   The street crowd was measured ad hoc: prefecture counts, "surface occupée"
   estimates and union claims. Only 1, 6, 10 and 13 May carry a crowd figure.
   The general strike (up to ~10M workers on 25 May) is a DIFFERENT population
   from the march and is deliberately excluded from the p series.
   The 30 May counter-demonstration (300,000 prefecture / 1M Gaullists) is a
   pro-government rally and is likewise excluded from p.                   */
export const MAY68: Episode = {
  id: "may68",
  start: "1968-04-29",
  end: "1968-06-30",
  weeks: [
    /* 1 May, République → Bastille: 25,000 (police) vs 100,000 (CGT). */
    { w: 0, from: "1968-04-29", to: "1968-05-05", p: [25_000, 100_000] },
    {
      /* 6 May: >20,000 to the Sorbonne; 10 May: 20,000 (12,000 police).
         Night of 10–11 May: 6,255 police, 125 cars damaged / 63 burnt,
         469 arrests. The 891 high adds 422 early-May arrests.
         Forces: 300+ on 6 May, 247 on 10–11 May.
         Protesters injured: ≥100 — no national count was published. */
      w: 1,
      from: "1968-05-06",
      to: "1968-05-12",
      p: 20_000,
      a: [469, 891],
      f: [247, 300],
      i: 100,
      flag: { i: "f" },
    },
    /* 13 May, Paris — peak of the episode: prefecture 230,000 · ORTF 171,000
       · surface-area estimate 500,000 · unions 1,000,000. */
    { w: 2, from: "1968-05-13", to: "1968-05-19", p: [230_000, 1_000_000] },
    {
      /* 25 May: 1,000+ arrests (floor), ~9M strikers, ORTF walkout.
         887 injured — from the English-Wikipedia infobox, attributed to 25 May
         only. Weak provenance, flagged "e". */
      w: 3,
      from: "1968-05-20",
      to: "1968-05-26",
      a: 1_000,
      i: 887,
      flag: { a: "f", i: "e" },
    },
    /* 27 May Grenelle protocol · Charléty meeting. */
    { w: 4, from: "1968-05-27", to: "1968-06-02" },
    /* 4 Jun partial return to work · 7 Jun Renault Flins clashes. */
    { w: 5, from: "1968-06-03", to: "1968-06-09" },
    /* 10 Jun: Tautin killed · 11 Jun: 2 killed at Sochaux · 12 Jun:
       demonstrations banned nationwide. */
    { w: 6, from: "1968-06-10", to: "1968-06-16" },
    /* 23 Jun legislative elections. */
    { w: 7, from: "1968-06-17", to: "1968-06-23" },
    /* Crisis closes 30 Jun. */
    { w: 8, from: "1968-06-24", to: "1968-06-30" },
  ],
};

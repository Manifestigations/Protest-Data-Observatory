/* Every figure and every projection. Sections A/B (chart.ts) and C (episodes.ts)
   both read these, which is why section C no longer needs a fallback table, an
   index patch applied to derived values, or its own recalculation of flags.

   ── Verification pass, 12 Nov 2026 ─────────────────────────────────────────
   Every cell below is carried from the research threads "French Protest Charts"
   Parts I and II, where each figure is cited to the Interior Ministry day-by-day
   bilans, IFRAP, prefecture bulletins or the press. Three corrections were
   applied in the first pass; each is marked FIX at its cell.

   ── Second pass, 12 Nov 2026: the window now opens on 15 September 2026 ───
   The 2026 lycée/student movement is traced back to its origins: the first
   mainland blockades were Le Rheu (7 Sep), Villeneuve-d'Ascq (14 Sep) and Caen
   (15 Sep); the national movement crystallised at Créteil on 18–19 Sep and
   went national on 28 Sep. Four corrections follow from that:

   FIX 5: 1 Oct arrests are a DAILY figure (1,949, "ce jeudi"), not a stock.
          The only published stock is 6,059 "since 28 September" (5 Oct). The
          daily series now runs 164 / 440 / 625 / 1,949 / 1,747 / [weekend
          150, derived] / 984 / 488 and sums to 6,547 through 6 Oct, which
          reproduces the ministry's own 6,059 + 488 exactly.
   FIX 6: the 1 Oct injury figures were two vintages of ONE cumulative series:
          119 (30 Sep: 85 students + 34 staff) and 235 (1 Oct: 170 students +
          65 staff). They are now separate stock cells on their own dates.
   FIX 7: the 1 Oct forces-injured band 84–305 mixed a Wednesday cumulative
          level (83) with a Thursday daily flow (~300). Kept as one band,
          re-flagged "e", and the 83 is no longer added a second time.
   FIX 8: 5 and 6 Oct carry their own daily enforcement figures (984 and 65;
          488 and 43), which raise the movement's forces-injured total from
          1,557–2,027 to 1,664–2,130.

   Arithmetic cross-checks:
     · arrest flows sum to 6,547 through 6 Oct = ministry stock 6,059 (5 Oct)
       + 488 (6 Oct) ✓;
     · forces injured: the ministry's running total is 1,580 (5 Nov); the
       published daily increments sum to 1,091–1,198, the difference being
       injuries on days with no published daily figure;
     · policing cost = DEPLOYMENT × RATE = €49.2M–€484.9M (cumulative high
       ≈ €485M) — unchanged.

   Flag vocabulary: n national · r regional only · p partial · f floor ·
   e derived · c cumulative stock / subset of a larger published total ·
   w weekly aggregate.      

   ── Third pass, 12 Nov 2026: the catalogue catches up with the window ───
   FIX 9:  the policing-cost total was mis-stated in the second pass. The
           September and 2/5 October deployment estimates and the missing
           18 October curfew day move the movement total from
           €49.2M–€484.9M to €54.3M–€629.9M. The old figure was the
           pre-September total and is withdrawn.
   FIX 10: 18 October had a curfew and published Paris arrests but no
           deployment cell, so the cost series silently skipped the day.
           Added at 2,000–8,000 agents (Paris scale, flagged "e").
   FIX 11: the 18 October arrest cell is Paris-only, so it is "r" like the
           other regional cells. "p" now means partial coverage everywhere,
           matching the flag vocabulary.
   FIX 12: the weekly aggregator is rewritten. A week whose last cell is a
           cumulative level takes that level as its figure; a "c" cell that
           is a subset of a larger published total is excluded from sums; a
           week containing a derived component is explained by that
           component's own note. This is what stops the 6 and 8 October
           damage cells (the same €6M increment) being added twice.

   Arithmetic cross-checks:
     · arrest flows sum to 6,547 through 6 Oct = ministry stock 6,059 (5 Oct)
       + 488 (6 Oct) ✓;
     · weekly arrests: 21 · 5,075 · 1,472 · 2,397–2,628 · 1,314–1,435 ·
       565–779 · 798–1,002 · 17 ✓;
     · weekly forces injured: 300–305 · 108 · 247 · 267 · 116–159 · 53–112 ✓;
     · forces injured, movement total = 1,664–2,130;
     · policing cost = DEPLOYMENT × RATE = €54.3M–€629.9M.

   ── Fourth pass, 14 Nov 2026: people on strike ────────────────────────────
   New metric, strikers, for chart 1 of sections A and B only. No authority
   published a national HEADCOUNT of strikers: the two national action days
   published participation RATES by fonction publique. The series is therefore
   derived ("e") and the tooltip states the arithmetic.

   The rates are rates on the FONCTION PUBLIQUE D'ÉTAT (2,500,000 agents).
   Education staff are state civil servants and sit INSIDE that base, so the
   education rate is carried as the largest COMPONENT, never added to it:
     29 Sep: 10% x 2.5M = 250,000   (education 11.47% x 1M = 114,700, subset)
     5 Nov:  9.89%-11% x 2.5M = 247,250-275,000
             (education 12.77% x 1M = 127,700, subset)
   Adding 114,700 to 250,000 would count the same teachers twice.

   NOT INCLUDED: local authorities 4.60% and public hospitals 3.93% (5 Nov) —
   no published workforce size; the CGT's "nearly 1.6M on strike AND in the
   demonstrations" — two populations in one figure, and the same 1.6M already
   bounds the turnout band for 5 Nov; SNES-FSU 52%, 1st-degree 17.54%, 15.81%
   of teachers — sub-scopes of the education figure already counted.

   Weekly figure is a PEAK, never a sum: a person on strike three days is one
   person.
*/

/* The record above is implemented by the modules re-exported below:
   calendar.ts (window, weeks, holidays) · types.ts (Obs/Pt/Series)
   facts.ts (daily cells) · policing.ts (deployments, forces stock, cost rate)
   projections.ts (daily series) · aggregate.ts (weekly series)
   student-weeks.ts (section C's table) · casualties/ (re-exported).
   Import from this file — the public surface is unchanged. */

export * from "./aggregate.ts";
export * from "./calendar.ts";
export * from "./facts.ts";
export * from "./policing.ts";
export * from "./projections.ts";
export * from "./student-weeks.ts";
export * from "./types.ts";

/* Casualty data now lives in ./casualties — the cells, the observations, the
   estimators and the invariants they must satisfy. Re-exported here so the
   charts, the KPI layer and the renderer keep their existing import paths. */
export {
  CASES,
  SEVERITY_LEVELS,
  SEVERITY_WEEKS,
  type CaseRow,
  type Cell,
  type SevRow,
  type Why,
} from "./casualties/index.ts";

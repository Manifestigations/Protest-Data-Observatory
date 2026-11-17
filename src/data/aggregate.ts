/* Weekly series: the aggregation rules and their implementations. */

import {
  isDetached,
  type Flag,
  type MetricKey,
  type NoteRef,
  type WeekNoteParts,
} from "../model/index.ts";
import { WEEKS, weekTouchesHoliday } from "./calendar.ts";
import { FACTS } from "./facts.ts";
import { NIL, round2, type Obs, type Pt, type Series } from "./types.ts";

/* ── Aggregation rules (third pass, 12 Nov 2026) ─────────────────────────
   1. A "c" cell is a cumulative level, or a subset of a larger published
      total. It is never added to a flow.
   2. If the week's LAST cell for the metric is a cumulative level, and
      nothing else in the week is larger, that level IS the week's figure —
      a level is a stronger statement than a partial sum, and summing flows
      into it would double-count. The week is flagged "c" and detached, and
      it borrows the cell's own observation note, because "N days counted"
      would be the wrong caption for a stock.
   3. Otherwise a "c" cell that is a subset of a bigger figure in the same
      week is excluded from the sum and counted in the note. This is what
      keeps the 6 and 8 October damage cells (one €6M increment, published
      twice) from being added to €12M.
   4. Regional-only ("r") cells are excluded whenever a national-scope cell
      exists for the same week.
   5. A week containing a derived ("e") component is explained by that
      component's own note, so the tooltip says what makes the figure
      uncertain.
   6. The weekly figure is a weekly aggregate ("w") unless the week is
      regional only ("r"), includes a floor ("f") or is partial ("p").     */
function aggregate(key: MetricKey, op: "sum" | "max"): Series {
  return WEEKS.map((week) => {
    const cells: { date: string; obs: Obs; q: Flag }[] = [];
    for (const d of week.dates) {
      const obs = FACTS[d]?.[key];
      if (!obs) continue;
      cells.push({ date: d, obs, q: obs.q ?? "n" });
    }
    if (!cells.length) return NIL;

    const last = cells[cells.length - 1];
    const othersHigh = Math.max(
      ...cells.filter((c) => c !== last).map((c) => c.obs.high),
      Number.NEGATIVE_INFINITY,
    );

    /* Rule 2 — the week's last cell is a cumulative level and nothing in
       the week is larger: the level IS the week's figure. */
    if (last.q === "c" && last.obs.high >= othersHigh) {
      return {
        v: round2((last.obs.low + last.obs.high) / 2),
        band: [round2(last.obs.low), round2(last.obs.high)] as [number, number],
        q: "c",
        note: { k: "obs", date: last.date, metric: key } as NoteRef,
        detach: isDetached("c"),
      };
    }

    /* Rules 3–4 — split the cells. */
    const regional = cells.filter((c) => c.q === "r");
    const subsets = cells.filter((c) => c.q === "c");
    const flows = cells.filter((c) => c.q !== "c" && c.q !== "r");
    const regionalOnly = flows.length === 0 && regional.length > 0;
    let pool = regionalOnly ? regional : flows;

    /* Nothing but subsets in the week: take the largest published stock. */
    if (!pool.length) {
      if (!subsets.length) return NIL;
      pool = [
        subsets.reduce((best, x) => (x.obs.high > best.obs.high ? x : best)),
      ];
    }

    let low: number;
    let high: number;
    let value: number;
    let peak: string | undefined;

    if (op === "sum") {
      low = pool.reduce((a, x) => a + x.obs.low, 0);
      high = pool.reduce((a, x) => a + x.obs.high, 0);
      value = (low + high) / 2;
    } else {
      low = Math.max(...pool.map((x) => x.obs.low));
      high = Math.max(...pool.map((x) => x.obs.high));
      const top = pool.reduce((best, x) =>
        (x.obs.low + x.obs.high) / 2 > (best.obs.low + best.obs.high) / 2
          ? x
          : best,
      );
      value = (top.obs.low + top.obs.high) / 2;
      peak = top.date;
    }

    /* Rule 5 — a derived component explains the week better than the
       generic note. */
    const derived = pool
      .filter((x) => x.q === "e")
      .sort((a, b) => b.obs.high - a.obs.high)[0];

    const excluded = cells.length - pool.length;
    const partial = pool.some((x) => x.q === "p");
    const parts: WeekNoteParts = {
      days: new Set(pool.map((x) => x.date)).size,
      kind: regionalOnly ? "regional" : "national",
      peak,
      noNational: regionalOnly || undefined,
      excluded: excluded > 0 ? excluded : undefined,
      floored: pool.some((x) => x.q === "f") || undefined,
      clipped: week.touchesEdge || undefined,
    };

    return {
      v: round2(value),
      band: [round2(low), round2(high)] as [number, number],
      q: regionalOnly ? "r" : parts.floored ? "f" : partial ? "p" : "w",
      note: derived
        ? ({ k: "obs", date: derived.date, metric: key } as NoteRef)
        : ({ k: "week", p: parts } as NoteRef),
      detach: regionalOnly,
    };
  });
}

/* ── Weekly PEAK, never a sum ──────────────────────────────────────────────
   The same lycée is blocked on several consecutive days; a weekly total
   would count one school many times over. So the weekly figure is the
   peak day of the week, exactly as for turnout.

   Regional days are excluded when a national figure exists in the same
   week; a week that is wholly inside the holiday is empty, because the
   metric did not exist. A week whose peak comes from a wider measure
   ("x") inherits that flag and borrows the cell's own note.            */
function aggregateBlockades(): Series {
  return WEEKS.map((week) => {
    const cells: { date: string; obs: Obs; q: Flag }[] = [];
    for (const date of week.dates) {
      const obs = FACTS[date]?.blockades;
      if (!obs) continue;
      cells.push({ date, obs, q: obs.q ?? "n" });
    }
    if (!cells.length) return NIL;

    const national = cells.filter((c) => c.q !== "r");
    const pool = national.length ? national : cells;
    const regionalOnly = national.length === 0;

    const top = pool.reduce((best, c) => {
      const mid = (c.obs.low + c.obs.high) / 2;
      const bestMid = (best.obs.low + best.obs.high) / 2;
      if (c.q === "c" && best.q !== "c") return c;
      if (best.q === "c" && c.q !== "c") return best;
      return mid > bestMid ? c : best;
    });

    const wide = top.q === "x";
    const parts: WeekNoteParts = {
      days: new Set(pool.map((c) => c.date)).size,
      kind: regionalOnly ? "regional" : "national",
      peak: top.date,
      noNational: regionalOnly || undefined,
      excluded: cells.length - pool.length || undefined,
      floored: pool.some((c) => c.q === "f") || undefined,
      clipped: week.touchesEdge || undefined,
      vacation: weekTouchesHoliday(week.key) || undefined,
    };

    return {
      v: round2((top.obs.low + top.obs.high) / 2),
      band: [round2(top.obs.low), round2(top.obs.high)] as [number, number],
      q: regionalOnly ? "r" : wide ? "x" : top.q === "f" ? "f" : "w",
      note: wide
        ? ({ k: "obs", date: top.date, metric: "blockades" } as NoteRef)
        : ({ k: "week", p: parts } as NoteRef),
      detach: regionalOnly,
    };
  });
}

/* A strike is a level, so the weekly figure is the week's peak — never a sum.
   The "w" flag is remapped to "e" so the weekly tooltip still says "modelled";
   `detach` is left alone so the point stays solid. */
export const WEEKLY: Readonly<Record<string, Series>> = {
  turnout: aggregate("turnout", "max"),
  strikers: aggregate("strikers", "max").map((p): Pt =>
    p.q === "w" ? { ...p, q: "e" } : p,
  ),
  arrests: aggregate("arrests", "sum"),
  forcesInjured: aggregate("forcesInjured", "sum"),
  protesterInjured: aggregate("protesterInjured", "sum"),
  blockades: aggregateBlockades(),
};

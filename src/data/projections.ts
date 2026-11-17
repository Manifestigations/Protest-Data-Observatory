/* Daily series: published cells → chart-ready points. */

import { isDetached, type MetricKey, type NoteRef } from "../model/index.ts";
import { DATES } from "./calendar.ts";
import { FACTS } from "./facts.ts";
import {
  costBand,
  DEPLOYMENT,
  FORCES_STOCK,
  FORCES_STOCK_DERIVED,
} from "./policing.ts";
import { NIL, round2, type Pt, type Series } from "./types.ts";

function projectDaily(key: MetricKey): Series {
  return DATES.map((date) => {
    const obs = FACTS[date]?.[key];
    if (!obs) return NIL;
    const q = obs.q ?? "n";
    return {
      v: round2((obs.low + obs.high) / 2),
      band: [obs.low, obs.high] as [number, number],
      q,
      note: { k: "obs", date, metric: key } as NoteRef,
      detach: isDetached(q),
    };
  });
}

/* Every strike point is a published RATE turned into a head count, so the
   stock projector would hollow all of them (isDetached("e") is true) and
   split the series into a line plus an empty points-only twin. Striking is a
   different population from marching, not a doubt about the figure: one
   solid line, with the "modelled" suffix in the tooltip. */
const strikers = projectDaily("strikers").map((p): Pt => ({
  ...p,
  detach: false,
}));

function projectPolicingDaily(): Series {
  return DATES.map((date) => {
    const dep = DEPLOYMENT[date];
    if (!dep) return NIL;
    const [lo, hi] = costBand(dep);
    const q = dep.q ?? "n";
    return {
      v: round2((lo + hi) / 2),
      band: [round2(lo), round2(hi)] as [number, number],
      q,
      note: { k: "policing", low: dep.low, high: dep.high, date } as NoteRef,
      detach: isDetached(q),
    };
  });
}

/** Running total; carries forward on days with no deployment — a total does not fall. */
function projectPolicingCumulative(): Series {
  let lo = 0;
  let hi = 0;
  let days = 0;
  let started = false;

  return DATES.map((date) => {
    const dep = DEPLOYMENT[date];
    if (dep) {
      const [a, b] = costBand(dep);
      lo += a;
      hi += b;
      days++;
      started = true;
    }
    if (!started) return NIL;
    return {
      v: round2((lo + hi) / 2),
      band: [round2(lo), round2(hi)] as [number, number],
      q: "e",
      note: { k: "cumulative", days, added: Boolean(dep) } as NoteRef,
      detach: false, // always a line; its band is shaded, not barred
    };
  });
}

/* The running total, as published and as derived.
 *
 * `detach: false` is deliberate and is the one place this file overrides the
 * convention: "c" here means "this is a level", not "this must not be joined
 * to the national line". The levels ARE the national line — a running total
 * that rises. The tooltip suffix still reads "· stock", because the flag is
 * what the suffix looks at. */
function projectForcesStock(): Series {
  return DATES.map((date) => {
    const pub = FORCES_STOCK[date];
    if (pub) {
      return {
        v: round2((pub.low + pub.high) / 2),
        band: [pub.low, pub.high] as [number, number],
        q: "c",
        note: { k: "obs", date, metric: "forcesInjuredStock" } as NoteRef,
        detach: false,
      };
    }
    const der = FORCES_STOCK_DERIVED[date];
    if (der) {
      return {
        v: round2((der.low + der.high) / 2),
        band: [der.low, der.high] as [number, number],
        q: "e",
        note: { k: "obs", date, metric: "forcesInjuredStock" } as NoteRef,
        detach: false,
      };
    }
    return NIL;
  });
}

export const DAILY: Readonly<Record<string, Series>> = {
  turnout: projectDaily("turnout"),
  strikers,
  arrests: projectDaily("arrests"),
  forcesInjured: projectDaily("forcesInjured"),
  forcesInjuredStock: projectForcesStock(),
  protesterInjured: projectDaily("protesterInjured"),
  damagesCost: projectDaily("damagesCost"),
  blockades: projectDaily("blockades"),
  policing: projectPolicingDaily(),
  policingCumulative: projectPolicingCumulative(),
};

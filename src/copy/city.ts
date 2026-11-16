import { getLocale } from "./state.ts";
import type { CityCount, BreakdownKey } from "../data/casualties/medics.ts";

const STR = {
  en: {
    breakdown: {
      lbd: "beanbag rounds",
      baton: "baton strikes",
      grenade: "stun grenades",
      gas: "tear gas",
      cranialTraumaSuspected: "suspected head injuries",
    } as Record<BreakdownKey, string>,
    head: "{city} — {n} injured by law enforcement",
    tail: "{parts} · {teams} teams · {collector} · provisional, one city, not in the national series",
  },
  fr: {
    breakdown: {
      lbd: "tirs de LBD",
      baton: "coups de matraque",
      grenade: "grenades de désencerclement",
      gas: "gaz lacrymogène",
      cranialTraumaSuspected: "suspicions de trauma crânien",
    } as Record<BreakdownKey, string>,
    head: "{city} — {n} blessés par les forces de l’ordre",
    tail: "{parts} · {teams} équipes · {collector} · provisoire, une seule ville, hors série nationale",
  },
} as const;

export const cityTooltip = (c: CityCount): string => {
  const s = STR[getLocale()];
  const parts = (Object.entries(c.breakdown) as [BreakdownKey, number][])
    .map(([k, v]) => `${s.breakdown[k]} ${v}`)
    .join(" · ");
  const fill = (tpl: string, m: Record<string, string>): string =>
    tpl.replace(/\{(\w+)\}/g, (_, k: string) => m[k] ?? "");
  return [
    fill(s.head, { city: c.city, n: String(c.injured) }),
    fill(s.tail, {
      parts,
      teams: String(c.teams),
      collector: c.collector,
    }),
  ].join("\n");
};

/** 166 sources across 14 groups. Totals are the parse output of the split from
 *  sources.ts, whose own header comment ("158 sources, 13 groups") was stale on
 *  both counts. Bump these only alongside the array they describe. */

import { BLOCKADES_SOURCES } from "./blockades";
import { BLOQUONS_SOURCES } from "./bloquons";
import { COST_SOURCES } from "./cost";
import { CPE_SOURCES } from "./cpe";
import { GJ_SOURCES } from "./gj";
import { MAI68_SOURCES } from "./mai68";
import { MEDIA_SOURCES } from "./media";
import { NAHEL_SOURCES } from "./nahel";
import { OFFICIAL_SOURCES } from "./official";
import { OVERSEAS_SOURCES } from "./overseas";
import { PRESS_SOURCES } from "./press";
import { REF2026_SOURCES } from "./ref2026";
import { RETRAITES_SOURCES } from "./retraites";
import { RN2024_SOURCES } from "./rn2024";
import { STRIKES_SOURCES } from "./strikes";
import type { GroupId, Source } from "./types";

export const SOURCES: readonly Source[] = [
  ...BLOCKADES_SOURCES,
  ...BLOQUONS_SOURCES,
  ...COST_SOURCES,
  ...CPE_SOURCES,
  ...GJ_SOURCES,
  ...MAI68_SOURCES,
  ...NAHEL_SOURCES,
  ...OFFICIAL_SOURCES,
  ...OVERSEAS_SOURCES,
  ...PRESS_SOURCES,
  ...REF2026_SOURCES,
  ...RETRAITES_SOURCES,
  ...RN2024_SOURCES,
  ...STRIKES_SOURCES,
  ...MEDIA_SOURCES,
];

/* duplicate ids are a build error, not a runtime surprise */
{
  const seen = new Set<string>();
  for (const s of SOURCES) {
    if (seen.has(s.id))
      throw new Error(`sources.ts: duplicate source id "${s.id}"`);
    seen.add(s.id);
  }
}

/* ----- render */

/** ISO strings compare lexicographically; undated sources sort last, stably. */
function byPublicationDate(a: Source, b: Source): number {
  if (!a.date || !b.date) {
    if (a.date !== b.date) return a.date ? -1 : 1;
    return a.id.localeCompare(b.id);
  }
  return a.date !== b.date
    ? a.date < b.date
      ? -1
      : 1
    : (a.dateEnd ?? "").localeCompare(b.dateEnd ?? "") ||
        a.id.localeCompare(b.id);
}

/** Bucketed and sorted once: renderSources() re-runs on every locale change. */
export const SOURCES_BY_GROUP: ReadonlyMap<GroupId, readonly Source[]> =
  (() => {
    const buckets = new Map<GroupId, Source[]>();
    for (const s of SOURCES) {
      const bucket = buckets.get(s.group);
      if (bucket) bucket.push(s);
      else buckets.set(s.group, [s]);
    }
    for (const bucket of buckets.values()) bucket.sort(byPublicationDate);
    return buckets;
  })();

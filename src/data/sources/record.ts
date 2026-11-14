import type { Bi } from "../../copy/index.ts";
import type { GroupId, Source } from "./types.ts";

/** The `{ en, fr }` pair every entry's `what` is built from. */
export const both = (en: string, fr: string): Bi => ({ en, fr });

/** One entry per URL. Optional args are omitted, not set to undefined. */
export function src(
  id: string,
  group: GroupId,
  label: string,
  url: string,
  what: Bi,
  date?: string,
  dateEnd?: string,
): Source {
  const s: Source = { id, group, label, url, what };
  if (date) s.date = date;
  if (dateEnd) s.dateEnd = dateEnd;
  return s;
}

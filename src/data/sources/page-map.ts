/* Which source groups each page shows, so the turnout page is not handed the
   1968 sources and the landing page carries nothing but the two images it
   displays. Declared group→pages rather than page→groups: TypeScript then
   fails the build if a new group is never placed on any page. */

import type { GroupId } from "@manifestigations/dataset";
import type { PageId } from "../../site/routes.ts";

const HISTORIC: readonly PageId[] = ["historic/movements", "historic/series"];

const PAGES_BY_GROUP: Readonly<Record<GroupId, readonly PageId[]>> = {
  /* 2026: state reports and press underpin every 2026 figure. */
  official: ["2026/turnout", "2026/violence", "2026/costs"],
  press: ["2026/turnout", "2026/violence", "2026/costs"],
  strikes: ["2026/turnout"],
  blockades: ["2026/turnout"],
  overseas: ["2026/turnout", "2026/violence"],
  ref2026: ["2026/turnout", "2026/violence"],
  /* costs: the only page that plots money. */
  cost: ["2026/costs"],
  /* historic: both trellises carry all seven movements. */
  mai68: HISTORIC,
  cpe: HISTORIC,
  gj: HISTORIC,
  nahel: HISTORIC,
  retraites: HISTORIC,
  rn2024: HISTORIC,
  bloquons: HISTORIC,
  /* media: only where a hero image is actually rendered. */
  media: ["home", "2026", "historic"],
};

/* The media group is filtered item by item: each hero belongs to the page
   whose card displays it, not to the whole site. */
const MEDIA_BY_PAGE: Readonly<Partial<Record<PageId, readonly string[]>>> = {
  home: ["media-2026-demo", "media-historic"],
  "2026": ["media-turnout", "media-violence", "media-costs"],
  historic: ["media-movements", "media-series"],
};

const PAGE_GROUPS = new Map<PageId, GroupId[]>();
for (const [id, pages] of Object.entries(PAGES_BY_GROUP) as Array<
  [GroupId, readonly PageId[]]
>) {
  for (const page of pages) {
    const list = PAGE_GROUPS.get(page) ?? [];
    list.push(id);
    PAGE_GROUPS.set(page, list);
  }
}

export function groupsForPage(page: PageId): readonly GroupId[] {
  return PAGE_GROUPS.get(page) ?? [];
}

export function mediaForPage(page: PageId): readonly string[] {
  return MEDIA_BY_PAGE[page] ?? [];
}

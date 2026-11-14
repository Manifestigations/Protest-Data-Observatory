import { bi, fmtDate, fmtDayMonth } from "../../copy";
import { MARKERS } from "../../copy/markers";
import { el } from "../../core/dom";
import { SOURCES_BY_GROUP } from "../../data/sources";
import { GROUPS } from "../../data/sources/groups";
import { MENTIONS } from "../../data/sources/mentions";
import type { Source } from "../../data/sources/types";
import { BOX_TITLE, FOOT, INTRO, MENTIONS_BLURB, MENTIONS_TITLE } from "./copy";

function dateLabel(s: Source): string | null {
  if (!s.date) return null;
  return s.dateEnd
    ? `${fmtDayMonth(s.date)}–${fmtDate(s.dateEnd)}`
    : fmtDate(s.date);
}

function sourceItem(s: Source): HTMLLIElement {
  const li = el("li");
  li.dataset.sourceId = s.id;

  const a = el("a", undefined, s.label);
  a.href = s.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  li.append(a);

  const when = dateLabel(s);
  if (when) {
    li.append(document.createTextNode(" "));
    const time = el("time", "date", when);
    time.dateTime = s.date!;
    li.append(time);
  }

  li.append(document.createTextNode(" — "));
  li.append(el("span", "what", bi(s.what)));
  return li;
}

/** Collapsible group; `open` comes from the pre-render DOM so locale changes don't reset it. */
function sourceGroup(
  id: string,
  summary: Node[],
  body: Node[],
): HTMLDetailsElement {
  const details = el("details", "source-group");
  details.dataset.group = id;

  const head = el("summary", "group-summary");
  head.append(...summary);
  details.append(head, ...body);
  return details;
}

/** Idempotent. Keeps the static <h1> that index.html owns, replaces everything after it. */
export function renderSources(
  host: HTMLElement | null = document.getElementById("sources"),
): void {
  if (!host) return; // boot() guarantees it; no silent re-append to <body>

  const kept = [...host.children].filter((n): n is HTMLElement =>
    /^H[1-6]$/.test(n.tagName),
  );
  // The page-level heading is static in index.html and therefore French-only;
  // give it the localised title so the box is right in both languages.
  if (kept[0]) kept[0].textContent = bi(BOX_TITLE);

  const box = el("div", "sources-box");
  box.append(el("p", "intro", bi(INTRO)));

  for (const group of GROUPS) {
    const items = SOURCES_BY_GROUP.get(group.id);
    if (!items || items.length === 0) continue;

    // count is derived, never typed into the blurb
    const title = el("h3", undefined, bi(group.title));
    title.append(" ", el("span", "count", String(items.length)));

    const list = el("ul");
    for (const s of items) list.append(sourceItem(s));

    box.append(
      sourceGroup(group.id, [title], [el("p", "blurb", bi(group.blurb)), list]),
    );
  }

  const dl = el("dl", "mention-list");
  for (const { name, note } of MENTIONS) {
    dl.append(el("dt", undefined, name), el("dd", undefined, bi(note)));
  }
  box.append(
    sourceGroup(
      "mentions",
      [el("h3", undefined, bi(MENTIONS_TITLE))],
      [el("p", "blurb", bi(MENTIONS_BLURB)), dl],
    ),
  );

  const key = el("dl", "marker-list");
  for (const { key: marker, text } of MARKERS) {
    key.append(el("dt", undefined, marker), el("dd", undefined, bi(text)));
  }
  box.append(key, el("p", "foot", bi(FOOT)));

  host.replaceChildren(...kept, box);
}

import type { Source } from "@manifestigations/dataset";
import {
  fmtDate,
  fmtDayMonth,
  GROUPS,
  SOURCES_BY_GROUP,
} from "@manifestigations/dataset";
import { bi } from "../../copy";
import { html } from "../../core/html";
import { groupsForPage, mediaForPage } from "../../data/sources/page-map";
import type { PageId } from "../../site/routes";
import { BOX_TITLE, INTRO } from "./copy";

function dateLabel(s: Source): string | null {
  if (!s.date) return null;
  return s.dateEnd
    ? `${fmtDayMonth(s.date)}–${fmtDate(s.dateEnd)}`
    : fmtDate(s.date);
}

function sourceItem(s: Source): Node {
  const when = dateLabel(s);
  return html`<li data-source-id="${s.id}">
    <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.label}</a
    >${when ? html`${" "}<time class="date" datetime="${s.date}">${when}</time>` : null}${" — "}<span
      class="what"
      >${bi(s.what)}</span
    >
  </li>`;
}

/** Collapsible group; `open` comes from the pre-render DOM so locale changes
 *  don't reset it. */
function sourceGroup(
  id: string,
  summary: Node[],
  body: Node[],
): HTMLDetailsElement {
  return html`<details class="source-group" data-group="${id}">
    <summary class="group-summary">${summary}</summary>
    ${body}
  </details>` as HTMLDetailsElement;
}

/** Idempotent. Keeps the static heading that the page owns, replaces the rest. */
export function renderSources(
  page: PageId = "home",
  host: HTMLElement | null = document.getElementById("sources"),
): void {
  if (!host) return;
  const kept = [...host.children].filter((n): n is HTMLElement =>
    /^H[1-6]$/.test(n.tagName),
  );
  if (kept[0]) kept[0].textContent = bi(BOX_TITLE);

  const allowed = new Set(groupsForPage(page));
  const groups: Node[] = [];

  for (const group of GROUPS) {
    if (!allowed.has(group.id)) continue;
    let items = SOURCES_BY_GROUP.get(group.id);
    if (!items || items.length === 0) continue;
    if (group.id === "media") {
      const keep = new Set(mediaForPage(page));
      items = items.filter((s) => keep.has(s.id));
      if (items.length === 0) continue;
    }

    const title = html`<h3>
      ${bi(group.title)}${" "}<span class="count">${items.length}</span>
    </h3>`;

    groups.push(
      sourceGroup(
        group.id,
        [title],
        [
          html`<p class="blurb">${bi(group.blurb)}</p>`,
          html`<ul>
            ${items.map(sourceItem)}
          </ul>`,
        ],
      ),
    );
  }

  host.replaceChildren(
    ...kept,
    html`<div class="sources-box">
      <p class="intro">${bi(INTRO)}</p>
      ${groups}
    </div>`,
  );
}

/* Boot: locale, chrome, then whatever this page actually hosts. Every mount is
   guarded, so one bundle serves every page in PAGES (site/routes.ts).
   `data-page` on <html> selects the page table entry; an unknown value falls
   back to the landing page. */

import { mountCharts } from "../charts/mount.ts";
import { mountCrossEpisode } from "../charts/trellis/index.ts";
import {
  applyStaticCopy,
  bi,
  fill,
  getLocale,
  localeMeta,
  onLocaleChange,
  syncLangSwitch,
  t,
} from "../copy";
import { announce } from "../core/a11y.ts";
import { destroyAll } from "../core/canvas-registry.ts";
import { byId, el } from "../core/dom.ts";
import { applyUrlLang, mountLangSwitch } from "../core/lang.ts";
import { initTheme } from "../core/theme.ts";
import { mountCards } from "../sections/cards/index.ts";
import { mountCasualties } from "../sections/casualties/index.ts";
import { currentPage, renderChrome } from "../sections/chrome.ts";
import { mountContext } from "../sections/context/context.ts";
import { mountContribute } from "../sections/contribute/index.ts";
import { initDisclosure } from "../sections/disclosure.ts";
import { mountKpiPresets, mountKpis } from "../sections/kpis.ts";
import { mountPerCapita } from "../sections/percapita/percapita.ts";
import { renderSources } from "../sections/sources/index.ts";
import { mountSummary } from "../sections/summary.ts";
import {
  CRUMB_LABEL,
  PAGES,
  SITE_NAME,
  pageById,
  pageHref,
  pageKey,
  type PageId,
  type PageSpec
} from "../site/routes.ts";

/* Static anchors carry a plausible href for no-JS readers; this makes it
   correct for the page's depth (2026/turnout.html → ../contribute.html). */
function fixPageLinks(page: PageSpec): void {
  for (const a of document.querySelectorAll<HTMLAnchorElement>(
    "[data-page-link]",
  )) {
    const id = a.dataset.pageLink as PageId | undefined;
    if (id && PAGES[id]) a.href = pageHref(page.path, id);
  }
}

function header(
  host: HTMLElement,
  level: 2 | 3,
  title: string,
  blurb: string,
): void {
  const h = el(level === 2 ? "h2" : "h3", "sec-title", title);
  h.id = `${host.id}-title`;
  host.replaceChildren(h, el("p", "sec-blurb", blurb));
}

function crumbs(page: PageSpec): void {
  const host = byId("crumbs");
  if (!host) return;
  host.setAttribute("aria-label", bi(CRUMB_LABEL));

  const trail: PageSpec[] = [];
  for (let p: PageSpec | null = page; p; p = p.parent ? PAGES[p.parent] : null)
    trail.unshift(p);

  const list = el("ol");
  trail.forEach((p, i) => {
    const li = el("li");
    if (i === trail.length - 1) {
      const span = el("span", undefined, bi(p.title));
      span.setAttribute("aria-current", "page");
      li.append(span);
    } else {
      const a = el("a", undefined, bi(p.title));
      a.href = pageHref(
        page.path,
        p === PAGES.home
          ? "home"
          : ((Object.keys(PAGES) as Array<keyof typeof PAGES>).find(
              (k) => PAGES[k] === p,
            ) ?? "home"),
      );
      li.append(a);
    }
    list.append(li);
  });
  host.replaceChildren(list);
}

function mountPage(page: PageSpec): void {
  const hdr = byId("hdr-page");
  if (hdr) header(hdr, 2, bi(page.title), bi(page.blurb));
  crumbs(page);
  mountCards(page.path, page.cards);
}

const page2 = currentPage();
/**
 * Full repaint in dependency order: destroy charts, chrome, sources, page
 * shell (header, crumbs, cards), guarded section mounts, then disclosure
 * last. Safe to call repeatedly — each mount replaces its own children.
 */
export function render(): void {
  destroyAll();
  const page =
    pageById(document.documentElement.dataset.page ?? "") ?? PAGES.home;
  const id = pageKey(page);

  renderChrome(page2);
  renderSources(id);
  mountPage(page);
  fixPageLinks(page);
  document.title = `${bi(page.title)} — ${bi(SITE_NAME)}`;

  applyStaticCopy();
  syncLangSwitch();

  for (const mount of [
    mountCharts,
    mountKpis,
    mountKpiPresets,
    mountCasualties,
    mountPerCapita,
    mountContext,
    mountCrossEpisode,
    mountSummary,
    mountContribute,
  ]) {
    try {
      mount();
    } catch (err) {
      console.error(`[${mount.name}]`, err);
    }
  }

  /* Sections are enhanced last: the <header> nodes that chrome.ts and
     mountPage() create must exist before they move into <summary>, and the
     canvases must exist before a reveal can need resizing. Idempotent:
     already-wrapped sections are skipped and the old toolbar is replaced, so
     its labels follow the locale. */
  initDisclosure({
    onReveal: (card) => {
      // Chart.js is responsive and observes the canvas parent; one frame after
      // the reveal is enough for a chart that measured 0×0 while collapsed.
      if (card.querySelector("canvas")) {
        requestAnimationFrame(() => dispatchEvent(new Event("resize")));
      }
    },
  });
}

let frame = 0;

export function scheduleRender(): void {
  if (frame) return;
  frame = window.requestAnimationFrame(() => {
    frame = 0;
    try {
      render();
    } catch (err) {
      console.error("[render]", err);
    }
  });
}

function boot(): void {
  applyUrlLang();
  if (document.documentElement.dataset.lang !== getLocale())
    console.error("[lang] DOM attribute out of sync with locale state");
  mountLangSwitch();
  initTheme();
  onLocaleChange(() => {
    scheduleRender();
    const { switched } = t().a11y as { switched: string };
    announce(fill(switched, { lang: localeMeta().label }));
  });
  render();
  window.addEventListener("pagehide", destroyAll, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

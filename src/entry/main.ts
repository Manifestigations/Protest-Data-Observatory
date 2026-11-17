/* ── src/entry/main.ts — boot and render ───────────────────────────────────
   Boot: locale, chrome, then whatever this page actually hosts. Every mount is
   guarded, so one bundle serves every page in PAGES (site/routes.ts).

   Page identity is resolved once per render, inside render(), by currentPage()
   in chrome.ts: file name first, then `data-page` on <html>/<body>, then the
   landing page. The file name has to win — four copied <head>s still carry the
   wrong data-page — so do not derive the page here, and do not cache it. */

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
import { mountContribute } from "../sections/contribute/index.ts";
import { flushPending, initDisclosure } from "../sections/disclosure.ts";
import { mountKpiPresets, mountKpis } from "../sections/kpis.ts";
import { mountPerCapita } from "../sections/percapita/percapita.ts";
import { renderSources } from "../sections/sources/index.ts";
import { mountSummary } from "../sections/summary.ts";
import {
  CRUMB_LABEL,
  PAGES,
  SITE_NAME,
  pageHref,
  pageKey,
  type PageId,
  type PageSpec,
} from "../site/routes.ts";

/* Static anchors carry a plausible href for no-JS readers; this makes it
   correct for the page's depth (2026/turnout.html → ../contribute.html).
   Unrecognised ids are ignored rather than rewritten to "#": the markup is
   authored by hand, so a typo should leave the authored href visible. */
function fixPageLinks(page: PageSpec): void {
  for (const a of document.querySelectorAll<HTMLAnchorElement>(
    "[data-page-link]",
  )) {
    const id = a.dataset.pageLink as PageId | undefined;
    if (id && PAGES[id]) a.href = pageHref(page.path, id);
  }
}

/* The id `<host>-title` is a cross-file contract: chrome.ts writes the same id
   for the sections it owns, and each section's aria-labelledby points at it. */
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

/* Trail is built by walking `parent` upwards and unshifting, so it ends up
   root-first — the same order the <ol> is read aloud in. The last entry is the
   current page and gets aria-current instead of a link; the rest point at the
   current page's own depth, not at their own. */
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
      a.href = pageHref(page.path, pageKey(p));
      li.append(a);
    }
    list.append(li);
  });
  host.replaceChildren(list);
}

/* The page shell: h2 + blurb, breadcrumb, cards. Runs before any section
   mount, so section headers land inside an element that already exists. */
function mountPage(page: PageSpec): void {
  const hdr = byId("hdr-page");
  if (hdr) header(hdr, 2, bi(page.title), bi(page.blurb));
  crumbs(page);
  mountCards(page.path, page.cards);
}

/**
 * Full repaint, in the one order that works:
 *
 *    1. destroyAll() — live charts point at DOM about to be replaced.
 *    2. currentPage() — resolved once here and threaded down as an id; every
 *       step below must agree on which page this is.
 *    3. chrome — section headers and axis notes, keyed by that id.
 *    4. sources, then the page shell (h2, crumbs, cards).
 *    5. links and <title> — the cards step 4 created are the targets.
 *    6. static copy and the language switch.
 *    7. section mounts, each in its own try/catch: one failing section must
 *       not blank the rest of the page.
 *    8. disclosure last — it moves the headers and canvases created above into
 *       <summary>, and a chart measured while collapsed needs a resize only
 *       once it can be revealed.
 *
 * Idempotent: every step replaces what it owns. Prefer scheduleRender(), which
 * coalesces calls into one frame.
 */
export function render(): void {
  destroyAll();
  const id = currentPage();
  const page = PAGES[id];

  renderChrome(id);
  renderSources(id);
  mountPage(page);
  fixPageLinks(page);
  document.title = `${bi(page.title)} — ${bi(SITE_NAME)}`;

  applyStaticCopy();
  syncLangSwitch();

  // Non-chart mounts first — they don't depend on the cards.
  for (const mount of [
    mountKpis,
    mountKpiPresets,
    mountCasualties,
    mountContribute,
  ]) {
    try {
      mount();
    } catch (err) {
      console.error(`[${mount.name}]`, err);
    }
  }

  initDisclosure({
    onReveal: (card) => {
      flushPending(card); // deferred charts build here, on first reveal
      if (card.querySelector("canvas")) {
        requestAnimationFrame(() => dispatchEvent(new Event("resize")));
      }
    },
  });

  // Charting mounts last: a closed card defers its build to first reveal
  // instead of paying for it at 0×0.
  for (const mount of [
    mountCharts,
    mountPerCapita,
    mountCrossEpisode,
    mountSummary,
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

/* One repaint per frame. A locale switch, a theme change and a resize can all
   land in the same tick; without the guard each would rebuild every chart.
   Errors are caught here because render() runs outside any caller's stack. */
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
  // Two writers own this attribute — setLang() and applyUrlLang(). A mismatch
  // means one of them ran without the other.
  if (document.documentElement.dataset.lang !== getLocale())
    console.error("[lang] DOM attribute out of sync with locale state");
  mountLangSwitch();
  initTheme();
  onLocaleChange(() => {
    scheduleRender();
    const { switched } = t().a11y as { switched: string };
    announce(fill(switched, { lang: localeMeta().label }));
  });
  // Synchronous, not scheduleRender(): the first paint must not wait a frame.
  render();
  window.addEventListener("pagehide", destroyAll, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

/* Boot: locale, chrome, then whatever this page actually hosts. Every mount
   is guarded, so one bundle serves all eight pages. `data-page` on <html>
   selects the page table entry; an unknown value falls back to the landing. */

import { mountCharts } from "../charts/mount.ts";
import { mountCrossEpisode } from "../charts/trellis/index.ts";
import {
  applyStaticCopy,
  fill,
  localeMeta,
  onLocaleChange,
  syncLangSwitch,
  t,
} from "../copy";
import { destroyAll } from "../core/canvas-registry.ts";
import { byId, el } from "../core/dom.ts";
import { applyUrlLang, mountLangSwitch } from "../core/lang.ts";
import { initTheme } from "../core/theme.ts";
import { mountCards } from "../sections/cards/index.ts";
import { mountCasualties } from "../sections/casualties.ts";
import { renderChrome } from "../sections/chrome.ts";
import { mountContext } from "../sections/context/context.ts";
import { mountKpis, mountKpiPresets } from "../sections/kpis.ts";
import { mountPerCapita } from "../sections/percapita/percapita.ts";
import { renderSources } from "../sections/sources/index.ts";
import { mountSummary } from "../sections/summary.ts";
import {
  CRUMB_LABEL,
  HOME_LABEL,
  PAGES,
  SITE_NAME,
  pageById,
  pageHref,
  type PageSpec,
} from "../site/routes.ts";
import { bi } from "../copy";
import { announce } from "../core/a11y.ts";

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

export function render(): void {
  destroyAll();
  const page =
    pageById(document.documentElement.dataset.page ?? "") ?? PAGES.home;

  renderChrome(); // legacy A–E headers, notes, #about, <title>
  renderSources(); // Sources + the new Media group
  mountPage(page);
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
  ]) {
    try {
      mount();
    } catch (err) {
      console.error(`[${mount.name}]`, err);
    }
  }
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
  mountLangSwitch();
  initTheme();
  onLocaleChange(() => {
    scheduleRender();
    announce(fill(t().a11y.switched, { lang: localeMeta().label }));
  });
  render();
  window.addEventListener("pagehide", destroyAll, { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

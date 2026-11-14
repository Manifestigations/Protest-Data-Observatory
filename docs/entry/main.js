import { announce } from "../core/a11y.ts";
import { destroyAll } from "../core/canvas-registry.ts";
import { mountCasualties } from "../sections/casualties.ts";
import { CHARTS, mountCharts } from "../charts/chart.ts";
import { mountContext } from "../sections/context/context.ts";
import { byId } from "../core/dom.ts";
import {
  mountCrossEpisode,
  mountSummary
} from "../data/episodes/episodes.ts";
import {
  applyStaticCopy,
  fill,
  localeMeta,
  onLocaleChange,
  syncLangSwitch,
  t
} from "../copy";
import { mountKpis } from "../sections/kpis.ts";
import { applyUrlLang, mountLangSwitch } from "../core/lang.ts";
import { renderChrome } from "../sections/chrome.ts";
import { mountPerCapita } from "../sections/percapita/percapita.ts";
import { renderSources } from "../data/sources/sources.ts";
import { initTheme } from "../core/theme.ts";
function trellisHosts() {
  const episodeHost = byId("trellis-episodes");
  const itemHost = byId("trellis-items");
  const itemLegend = byId("legend-items");
  const eventLegend = byId("legend-events");
  if (!episodeHost || !itemHost || !itemLegend || !eventLegend) {
    console.warn("[trellis] one or more hosts missing");
    return null;
  }
  return { episodeHost, itemHost, itemLegend, eventLegend };
}
function render() {
  destroyAll();
  renderSources();
  renderChrome();
  applyStaticCopy();
  syncLangSwitch();
  mountCharts();
  mountKpis();
  mountCasualties();
  mountPerCapita();
  mountContext();
  const hosts = trellisHosts();
  if (hosts) {
    try {
      mountCrossEpisode(hosts);
    } catch (err) {
      console.error("[trellis]", err);
    }
  }
  try {
    mountSummary();
  } catch (err) {
    console.error("[summary]", err);
  }
}
let frame = 0;
function scheduleRender() {
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
const REQUIRED = [
  ...CHARTS.map((c) => c.id),
  "trellis-episodes",
  "trellis-items",
  "legend-items",
  "legend-events",
  "summary",
  "legend-summary",
  "disclaimer",
  "sources",
  "kpi-a",
  "kpi-b",
  "kpi-c",
  "kpi-d",
  "kpi-e"
];
function boot() {
  const missing = REQUIRED.filter((id) => !byId(id));
  if (missing.length) {
    console.error(
      `[boot] ${missing.length} host(s) absent from the DOM: ${missing.join(", ")}`
    );
    return;
  }
  applyUrlLang();
  mountLangSwitch();
  initTheme();
  onLocaleChange((_next, _prev) => {
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
export {
  render,
  scheduleRender
};
//# sourceMappingURL=main.js.map

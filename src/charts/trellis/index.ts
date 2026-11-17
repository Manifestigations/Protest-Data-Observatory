/* ── Sections C and D — cross-episode comparison ─────────────────────────────
   Section C (historic/movements.html): one panel per movement, four series per
   panel, one shared log axis.
   Section D (historic/series.html): one panel per series, one line per movement
   on a sequential ramp, x capped at ENFORCEMENT_LAST.

   The two grids used to share a page, so one mount demanded all four hosts at
   once. They are paginated now, so each grid is mounted on its own and claims
   only the hosts it owns: no host at all means "this page does not host that
   grid" (silent, like mountCharts); some but not all means a markup bug.
   The emphasis maps stay module-scoped, so if both grids ever land on the same
   page, hovering one still dims the other. */

import { Chart, type ChartData, type ChartEvent } from "chart.js";
import { compact, fill, fmtSpan, t } from "../../copy/index.ts";
import { THEME, track } from "../../core/canvas-registry.ts";
import { ENFORCEMENT_LAST, EPISODES } from "../../data/episodes/index.ts";
import { isDetached, METRICS, type Metric } from "../../model/index.ts";
import {
  buildDataset,
  datasetsOf,
  logBounds,
  rawExtent,
  resetSeriesCache,
  type PanelDataset,
} from "./engine.ts";
import { nearestByY, WEEK_MODE } from "./interaction.ts";
import { legend, toggleDatasets, wireLegendSync } from "./legend.ts";
import { DIM, fade, movementRamp, seriesStyles } from "./palette.ts";
import {
  columns,
  decoratePanel,
  observations,
  panelFigure,
  panelOptions,
  xScale,
  yScale,
} from "./panel.ts";

/* ----- emphasis (shared by whichever grids this page hosts) */

const episodePanels: Chart<"line">[] = [];
const itemPanels: { chart: Chart<"line">; item: Metric }[] = [];
let activeItem: Metric | null = null;
let activeEvent: number | null = null;

/** One recolour path for both emphasis modes. Hollow points are decided from the
 *  point's own flag at draw time, so nothing has to be kept in sync. */
/* `restyle` now dims through fade(): tokens are rgb(), not hex. */
function restyle(d: PanelDataset, on: boolean, bold = false): void {
  const c = on ? d.__color : fade(d.__color, DIM);
  d.borderColor = c;
  d.backgroundColor = c;
  d.pointBorderColor = c;
  /* Per-point interiors: hollow stays hollow, solid follows the dim. Rebuilt
     from d.data each call, so repeated emphasises cannot compound the alpha. */
  if (Array.isArray(d.pointBackgroundColor))
    d.pointBackgroundColor = d.data.map((p) =>
      isDetached(p.flag) ? THEME.hollow : c,
    );
  d.borderWidth = bold && on ? 2.75 : 1.75;
}

function restylePanels(
  charts: readonly Chart<"line">[],
  keep: (d: PanelDataset) => boolean,
  bold = false,
): void {
  for (const chart of charts) {
    for (const d of datasetsOf(chart)) restyle(d, keep(d), bold);
    chart.update("none");
  }
}

/* Both emphasises tolerate an empty panel list: on a paginated site one of the
   two grids is always absent, and that is not a degraded state. */

function emphasiseItem(key: Metric | null): void {
  if (key === activeItem) return;
  activeItem = key;
  restylePanels(episodePanels, (d) => key === null || d.__item === key, true);
  for (const { chart, item } of itemPanels) {
    const host = chart.canvas.parentElement;
    if (host)
      host.style.opacity = key === null || item === key ? "1" : String(DIM);
  }
}

function emphasiseEvent(index: number | null): void {
  if (index === activeEvent) return;
  activeEvent = index;
  restylePanels(
    itemPanels.map((p) => p.chart),
    (d) => index === null || d.__ep === index,
  );
}

/* ----- hosts: one grid per page */

interface EpisodeHosts {
  episodeHost: HTMLElement;
  itemLegend: HTMLElement;
}

interface ItemHosts {
  itemHost: HTMLElement;
  eventLegend: HTMLElement;
}

/** The four ids section C/D own. The grids no longer share a page, so each grid
 *  resolves its own pair — one declaration, because the ids must not drift. */
const EPISODE_HOSTS = {
  episodeHost: "trellis-episodes",
  itemLegend: "legend-items",
} as const;

const ITEM_HOSTS = {
  itemHost: "trellis-items",
  eventLegend: "legend-events",
} as const;

/** Absent everywhere = this page does not host the grid (no warning).
 *  Present but partial = a markup bug (warn, and mount nothing). */
function resolveHosts<T extends Record<string, string>>(
  ids: T,
): { -readonly [K in keyof T]: HTMLElement } | null {
  const keys = Object.keys(ids) as Array<keyof T & string>;
  const out = {} as { -readonly [K in keyof T]: HTMLElement };
  const missing: string[] = [];

  for (const key of keys) {
    const node = document.getElementById(ids[key]);
    if (node) out[key] = node;
    else missing.push(ids[key]);
  }

  if (!missing.length) return out;
  if (missing.length < keys.length)
    console.warn(
      `[trellis] missing host(s): ${missing.map((m) => `#${m}`).join(", ")}`,
    );
  return null;
}

/* ----- section C: one panel per movement */

export function mountEpisodeTrellis(): void {
  const hosts = resolveHosts(EPISODE_HOSTS);
  if (!hosts) return;
  const { episodeHost, itemLegend } = hosts;

  const styles = seriesStyles(); // ← token lookup happens here, per mount

  episodePanels.length = 0;
  activeItem = null;
  episodeHost.replaceChildren();
  itemLegend.replaceChildren();

  const m = t();
  const unbounded = Number.POSITIVE_INFINITY;

  const [yMin, yMax] = logBounds(...rawExtent(EPISODES, METRICS, unbounded));
  const cols = columns(episodeHost);
  episodeHost.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  EPISODES.forEach((ep, idx) => {
    const text = m.episodes[ep.id];
    const maxW = Math.max(...ep.weeks.map((r) => r.w), 1);
    const { figure, canvas } = panelFigure(
      text.strip,
      `${fmtSpan(ep.start, ep.end)} · ${observations(ep)}`,
      text.banner,
    );
    episodeHost.append(figure);

    const datasets = styles
      .map((s) => buildDataset(ep, idx, s.key, s.color, unbounded))
      .filter((d): d is PanelDataset => d !== null);

    const chart = track(
      new Chart<"line">(canvas, {
        type: "line",
        data: { datasets } as unknown as ChartData<"line">,
        options: panelOptions(
          "episode",
          xScale(maxW),
          yScale(yMin, yMax, idx % cols === 0),
          (e, elements, host) => {
            const hit = nearestByY(host, elements, e);
            const d = hit
              ? (host.data.datasets[hit.datasetIndex] as PanelDataset)
              : undefined;
            emphasiseItem(d ? d.__item : null);
          },
        ),
        plugins: [],
      }),
    );

    decoratePanel(chart, figure, text.strip);
    canvas.addEventListener("mouseleave", () => emphasiseItem(null));
    episodePanels.push(chart);
  });

  legend(
    itemLegend,
    "items",
    styles.map((s) => ({
      text: m.items[s.key].label,
      color: s.color,
      on: () => emphasiseItem(s.key),
      off: () => emphasiseItem(null),
      hide: (hidden) => toggleDatasets(episodeHost, "__item", s.key, hidden),
    })),
  );

  wireLegendSync(episodeHost, "items", (d) => {
    const k = styles.findIndex((s) => s.key === d.__item);
    return k < 0 ? null : k;
  });
}

/* 3. section D — same, with the ordinal ramp resolved once */
export function mountItemTrellis(): void {
  const hosts = resolveHosts(ITEM_HOSTS);
  if (!hosts) return;
  const { itemHost, eventLegend } = hosts;

  const styles = seriesStyles();
  const steps = movementRamp(); // ← --chart-series-1..7, theme-aware, per mount

  itemPanels.length = 0;
  activeEvent = null;
  itemHost.replaceChildren();
  eventLegend.replaceChildren();

  const m = t();

  const itemCols = columns(itemHost);
  itemHost.style.gridTemplateColumns = `repeat(${itemCols}, minmax(0, 1fr))`;

  styles.forEach((s) => {
    const [rawLo, rawHi] = rawExtent(EPISODES, [s.key], ENFORCEMENT_LAST);
    const [lo, hi] = logBounds(rawLo, rawHi);
    const range = fill(m.panels.valueRange, {
      lo: compact().format(rawLo),
      hi: compact().format(rawHi),
    });

    const { figure, canvas } = panelFigure(
      m.items[s.key].short,
      fill(m.panels.itemMeta, { range, n: ENFORCEMENT_LAST }),
    );
    itemHost.append(figure);

    const datasets = EPISODES.map((ep, i) =>
      buildDataset(ep, i, s.key, steps[i % steps.length], ENFORCEMENT_LAST),
    ).filter((d): d is PanelDataset => d !== null);

    const chart = track(
      new Chart<"line">(canvas, {
        type: "line",
        data: { datasets } as unknown as ChartData<"line">,
        options: panelOptions(
          "item",
          xScale(ENFORCEMENT_LAST),
          yScale(lo, hi, true),
        ),
        plugins: [],
      }),
    );

    decoratePanel(chart, figure, m.items[s.key].short);

    canvas.addEventListener("mouseleave", () => emphasiseEvent(null));
    canvas.addEventListener("mousemove", (ev) => {
      const pts = chart.getElementsAtEventForMode(
        ev,
        WEEK_MODE,
        { intersect: false },
        true,
      );
      const hit = pts.length
        ? nearestByY(chart, pts, ev as unknown as ChartEvent)
        : undefined;
      const d = hit
        ? (chart.data.datasets[hit.datasetIndex] as PanelDataset)
        : undefined;
      emphasiseEvent(d ? d.__ep : null);
    });

    itemPanels.push({ chart, item: s.key });
  });

  legend(
    eventLegend,
    "events",
    EPISODES.map((ep, i) => ({
      text: m.episodes[ep.id].short,
      color: steps[i % steps.length],
      on: () => emphasiseEvent(i),
      off: () => emphasiseEvent(null),
      hide: (hidden) => toggleDatasets(itemHost, "__ep", i, hidden),
    })),
  );

  wireLegendSync(itemHost, "events", (d) =>
    d.__ep >= 0 && d.__ep < EPISODES.length ? d.__ep : null,
  );
}

/* ----- entry point kept for main.ts */

/** Mounts whichever grids this page hosts. Titles and notes are locale-bound, so
 *  the derivation cache is dropped once per render, before either grid rebuilds.
 *  Callers that mount a single grid directly must call resetSeriesCache() first. */
export function mountCrossEpisode(): void {
  resetSeriesCache();
  mountEpisodeTrellis();
  mountItemTrellis();
}

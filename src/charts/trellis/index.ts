/* ── Section C — cross-episode comparison ────────────────────────────────────
   Primary figure: one panel per episode, four series per panel, one shared log
   axis. Companion: one panel per series, one line per episode on a sequential
   ramp, x capped at ENFORCEMENT_LAST.

   The two grids share emphasis state by design: hovering a legend entry dims the
   matching series in the primary grid and the matching episode in the companion.
   They are one component with two grids, not two components — splitting them
   means threading eight mutable bindings across two modules. */

import { Chart, type ChartData, type ChartEvent } from "chart.js";
import { alpha, track } from "../../core/canvas-registry.ts";
import { compact, fill, fmtSpan, t } from "../../copy/index.ts";
import { ENFORCEMENT_LAST, EPISODES } from "../../data/episodes/index.ts";
import { METRICS, type Metric } from "../../model/index.ts";
import {
  buildDataset,
  datasetsOf,
  logBounds,
  rawExtent,
  resetSeriesCache,
  type PanelDataset,
} from "./engine.ts";
import { WEEK_MODE, nearestByY } from "./interaction.ts";
import { DIM, RAMP, SERIES } from "./palette.ts";
import {
  columns,
  decoratePanel,
  observations,
  panelFigure,
  panelOptions,
  xScale,
  yScale,
} from "./panel.ts";
import { legend, toggleDatasets, wireLegendSync } from "./legend.ts";

/* ----- emphasis */

const episodePanels: Chart<"line">[] = [];
const itemPanels: { chart: Chart<"line">; item: Metric }[] = [];
let activeItem: Metric | null = null;
let activeEvent: number | null = null;

/** One recolour path for both emphasis modes. Hollow points are decided from the
 *  point's own flag at draw time, so nothing has to be kept in sync. */
function restyle(d: PanelDataset, on: boolean, bold = false): void {
  const c = on ? d.__color : alpha(d.__color, DIM);
  d.borderColor = c;
  d.backgroundColor = c; // the tooltip swatch is drawn from this
  d.pointBorderColor = c;
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

/* ----- mount */

export function mountCrossEpisode(): void {
  const episodeHost = document.getElementById("trellis-episodes");
  const itemHost = document.getElementById("trellis-items");
  const itemLegend = document.getElementById("legend-items");
  const eventLegend = document.getElementById("legend-events");
  if (!episodeHost || !itemHost || !itemLegend || !eventLegend) return;

  /* destroyAll() has already destroyed the previous instances; clear the handles
     so emphasis cannot touch a dead chart. */
  episodePanels.length = 0;
  itemPanels.length = 0;
  activeItem = null;
  activeEvent = null;
  resetSeriesCache(); // titles and notes are locale-bound
  episodeHost.replaceChildren();
  itemHost.replaceChildren();
  itemLegend.replaceChildren();
  eventLegend.replaceChildren();

  const m = t();
  const unbounded = Number.POSITIVE_INFINITY;

  /* ---- primary trellis: one panel per episode, one y range for all ---- */
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

    const datasets = SERIES.map((s) =>
      buildDataset(ep, idx, s.key, s.color, unbounded),
    ).filter((d): d is PanelDataset => d !== null);

    const chart = track(
      new Chart<"line">(canvas, {
        type: "line",
        data: { datasets } as unknown as ChartData<"line">,
        options: panelOptions(
          "episode",
          xScale(maxW),
          yScale(yMin, yMax, idx % cols === 0),
          (e, elements, host) => {
            // every series at the week is active; follow the closest line
            const hit = nearestByY(host, elements, e);
            const d = hit
              ? (host.data.datasets[hit.datasetIndex] as PanelDataset)
              : undefined;
            emphasiseItem(d ? d.__item : null);
          },
        ),
        plugins: [], // no per-panel labels: the episode is the panel title
      }),
    );

    decoratePanel(chart, figure, text.strip);

    canvas.addEventListener("mouseleave", () => emphasiseItem(null));
    episodePanels.push(chart);
  });

  /* ---- companion: one panel per series, x capped at the last enforcement week ---- */
  const itemCols = columns(itemHost);
  itemHost.style.gridTemplateColumns = `repeat(${itemCols}, minmax(0, 1fr))`;

  SERIES.forEach((series) => {
    const [rawLo, rawHi] = rawExtent(EPISODES, [series.key], ENFORCEMENT_LAST);
    const [lo, hi] = logBounds(rawLo, rawHi);
    const range = fill(m.panels.valueRange, {
      lo: compact().format(rawLo),
      hi: compact().format(rawHi),
    });

    const { figure, canvas } = panelFigure(
      m.items[series.key].short,
      fill(m.panels.itemMeta, { range, n: ENFORCEMENT_LAST }),
    );
    itemHost.append(figure);

    const datasets = EPISODES.map((ep, i) =>
      buildDataset(ep, i, series.key, RAMP[i], ENFORCEMENT_LAST),
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

    decoratePanel(chart, figure, m.items[series.key].short);

    canvas.addEventListener("mouseleave", () => emphasiseEvent(null));
    canvas.addEventListener("mousemove", (ev) => {
      // same week band as the tooltip, else the emphasis dims a series the
      // tooltip is not showing
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

    itemPanels.push({ chart, item: series.key });
  });

  /* ---- legends ---- */
  legend(
    itemLegend,
    "items",
    SERIES.map((s) => ({
      text: m.items[s.key].label,
      color: s.color,
      on: () => emphasiseItem(s.key),
      off: () => emphasiseItem(null),
      hide: (hidden) => toggleDatasets(episodeHost, "__item", s.key, hidden),
    })),
  );

  legend(
    eventLegend,
    "events",
    EPISODES.map((ep, i) => ({
      text: m.episodes[ep.id].short,
      color: RAMP[i],
      on: () => emphasiseEvent(i),
      off: () => emphasiseEvent(null),
      hide: (hidden) => toggleDatasets(itemHost, "__ep", i, hidden),
    })),
  );

  wireLegendSync(episodeHost, "items", (d) => {
    const k = SERIES.findIndex((s) => s.key === d.__item);
    return k < 0 ? null : k;
  });
  wireLegendSync(itemHost, "events", (d) =>
    d.__ep >= 0 && d.__ep < EPISODES.length ? d.__ep : null,
  );
}

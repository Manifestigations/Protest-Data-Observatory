/* ── Section A/B — registration and mount ────────────────────────────────── */

import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PointElement,
  SubTitle,
  Title,
  Tooltip,
} from "chart.js";
import { a11y, fill, t } from "../copy";
import { fromChart, keyboardChart } from "../core/a11y.ts";
import { track } from "../core/canvas-registry.ts";
import { byId } from "../core/dom.ts";
import { contextBands } from "../sections/context/context.ts";
import { connectors } from "./plugins/connectors.ts";
import { errorBars } from "./plugins/error-bars.ts";
import { spanMark } from "./plugins/span-mark.ts";
import { buildChart, type Cfg } from "./shell.ts";
import { CHARTS } from "./specs.ts";
import { insertCostMethodology } from "../sections/costs/methodology.ts";

Chart.register(
  LineController,
  LineElement,
  LogarithmicScale,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  SubTitle,
);

const MIN_CHART_H = 420;

/** Chart.js measures the PARENT, never the canvas; an auto-height parent resolves
 *  to the canvas's intrinsic 150px, which collapsed every series onto the baseline. */
function ensureChartBox(canvas: HTMLCanvasElement): HTMLElement {
  let host = canvas.parentElement;
  if (!host || host === document.body) {
    host = document.createElement("div");
    host.className = "wrap";
    canvas.parentNode?.insertBefore(host, canvas);
    host.append(canvas);
  }
  if (getComputedStyle(host).position === "static")
    host.style.position = "relative";
  if (host.clientHeight < 160) host.style.height = `${MIN_CHART_H}px`;
  canvas.style.display = "block";
  return host;
}

export function mount(canvas: HTMLCanvasElement, cfg: Cfg): Chart<"line"> {
  ensureChartBox(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");
  const { data, ...options } = cfg;

  return track(
    new Chart<"line">(ctx, {
      type: "line",
      data,
      options,
      plugins: [contextBands, errorBars, connectors, spanMark],
    }),
  );
}

export function mountCharts(): void {
  for (const spec of CHARTS) {
    const canvas = byId(spec.id);

    // Absent = this page does not host the chart. Not a warning.
    if (!canvas) continue;

    // Present but wrong tag = a real markup bug. Warn, keep going.
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.warn(
        `[chart] #${spec.id} exists but is a <${canvas.tagName.toLowerCase()}>`,
      );
      continue;
    }

    try {
      const copy = t().chart.charts[spec.copy];
      const name = copy.subtitle
        ? `${copy.title}. ${copy.subtitle}`
        : copy.title;

      // Name = title + subtitle: the subtitle carries the caveats that make
      // the figure honest, and it is otherwise invisible to AT.
      canvas.setAttribute("aria-label", name);
      canvas.setAttribute("role", "img");

      const chart = mount(canvas, buildChart(spec));

      const host = canvas.closest("figure") ?? canvas.parentElement;
      host?.querySelector(".data-table")?.remove();

      // mountCharts() re-runs on every locale change, so the block is rebuilt,
      // not appended twice. Same remove-then-add discipline as the table above.
      host?.querySelector('[data-role="cost-method"]')?.remove();
      if (spec.id === "chart-costs" && host)
        insertCostMethodology(host, canvas);

      const table = fromChart(chart, {
        caption: fill(a11y().tableCaption, { title: copy.title }),
        indexHeader: a11y().dateHeader,
      });
      host?.append(table);

      keyboardChart(chart, {
        hint: a11y().chartHint,
        roledescription: a11y().chartRole,
      });
    } catch (err) {
      console.error(`[${spec.id}]`, err);
    }
  }
}

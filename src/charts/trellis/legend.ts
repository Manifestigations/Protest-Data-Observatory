/* ── Interactive legends ─────────────────────────────────────────────────────
   Click = filter the entry out of every chart in its section. Hover/focus
   previews the highlight, and a chart hover marks the matching entry. Hidden
   state lives in a module map so a locale re-mount replays it. */

import { Chart, type InteractionMode } from "chart.js";
import { html } from "../../core/html.ts";
import { datasetsOf, type PanelDataset } from "./engine.ts";

export type LegendKey = "items" | "events" | "stats";

export interface LegendEntry {
  text: string;
  color: string;
  dash?: string;
  on: () => void;
  off: () => void;
  /** Omit to make the entry highlight-only (no filter). */
  hide?: (hidden: boolean) => void;
}

const legendHidden = new Map<LegendKey, boolean[]>();
const legendButtons = new Map<LegendKey, HTMLButtonElement[]>();

function legendState(key: LegendKey, n: number): boolean[] {
  const s = legendHidden.get(key) ?? [];
  while (s.length < n) s.push(false);
  s.length = n;
  legendHidden.set(key, s);
  return s;
}

/** Reverse direction: chart hover → legend entry. */
export function legendMark(key: LegendKey, idx: number | null): void {
  legendButtons.get(key)?.forEach((b, i) => {
    b.classList.toggle("is-active", i === idx);
  });
}

export function legend(
  host: HTMLElement,
  key: LegendKey,
  entries: readonly LegendEntry[],
): void {
  const hidden = legendState(key, entries.length);
  const buttons = entries.map((entry, idx) => {
    /* The swatch colour is an inline style, so it travels as one `style`
       string: a dashed entry is a repeating gradient, a plain one a flat fill. */
    const swatch = entry.dash?.length
      ? `background: repeating-linear-gradient(90deg, ${entry.color} 0 3px, transparent 3px 6px)`
      : `background: ${entry.color}`;

    const button = html`<button
      type="button"
      aria-pressed="${String(hidden[idx])}"
    >
      <span class="swatch" style="${swatch}"></span>${entry.text}
    </button>` as HTMLButtonElement;

    /* is-off is a state the click handler also toggles, so it is set here by
       classList rather than baked into the template. */
    button.classList.toggle("is-off", hidden[idx]);

    if (entry.hide) {
      button.addEventListener("click", () => {
        hidden[idx] = !hidden[idx];
        button.setAttribute("aria-pressed", String(hidden[idx]));
        button.classList.toggle("is-off", hidden[idx]);
        entry.hide?.(hidden[idx]);
      });
    } else {
      let pinned = false;
      button.addEventListener("click", () => {
        pinned = !pinned;
        button.setAttribute("aria-pressed", String(pinned));
        (pinned ? entry.on : entry.off)();
      });
    }

    for (const ev of ["mouseenter", "focus", "pointerdown"] as const)
      button.addEventListener(ev, () => {
        entry.on();
        legendMark(key, idx);
      });

    for (const ev of ["mouseleave", "blur"] as const)
      button.addEventListener(ev, () => {
        if (!entry.hide && button.getAttribute("aria-pressed") === "true")
          return;
        entry.off();
        legendMark(key, null);
      });

    return button;
  });

  legendButtons.set(key, buttons);
  host.replaceChildren(...buttons);

  /* Re-apply filters after a re-mount. */
  entries.forEach((entry, idx) => {
    if (hidden[idx]) entry.hide?.(true);
  });
}

function chartsIn(host: Element | null): Chart<"line">[] {
  const out: Chart<"line">[] = [];
  for (const c of host?.querySelectorAll("canvas") ?? []) {
    const chart = Chart.getChart(c);
    if (chart) out.push(chart as Chart<"line">);
  }
  return out;
}

/** Show/hide every dataset in `host` whose `field` equals `key`. */
export function toggleDatasets(
  host: Element | null,
  field: "__item" | "__ep",
  key: string | number,
  hidden: boolean,
): void {
  for (const chart of chartsIn(host)) {
    let touched = false;
    datasetsOf(chart).forEach((d, i) => {
      if ((d as unknown as Record<string, unknown>)[field] !== key) return;
      chart.setDatasetVisibility(i, !hidden);
      touched = true;
    });
    if (touched) chart.update("none");
  }
}

/** Chart hover → legend entry, for every canvas in a section. */
export function wireLegendSync(
  host: Element | null,
  key: LegendKey,
  indexOf: (d: PanelDataset) => number | null,
): void {
  for (const canvas of host?.querySelectorAll("canvas") ?? []) {
    const chart = Chart.getChart(canvas);
    if (!chart) continue;
    canvas.addEventListener("pointermove", (ev) => {
      const mode = (chart.options.interaction?.mode ??
        "nearest") as InteractionMode;
      const els = chart.getElementsAtEventForMode(
        ev,
        mode,
        { intersect: !!chart.options.interaction?.intersect },
        true,
      );
      const d = els.length
        ? (datasetsOf(chart as Chart<"line">)[
            els[0].datasetIndex
          ] as PanelDataset)
        : undefined;
      legendMark(key, d ? indexOf(d) : null);
    });
    canvas.addEventListener("pointerleave", () => legendMark(key, null));
  }
}

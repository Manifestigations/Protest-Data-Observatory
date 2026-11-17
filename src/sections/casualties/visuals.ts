/* ── src/sections/casualties/visuals.ts — severity visuals ──────────────────
   Section A/B. Bars never invent a denominator: what a source did not publish
   is drawn as a hatch, and what has no denominator is drawn as an empty track.
   Exact published strings stay in the caption line and in the <details> table
   fallback, so no precision is lost by drawing. */

import { t } from "../../copy";
import { el } from "../../core/dom.ts";
import {
  type CaseRow,
  type Cell,
  type SevRow,
} from "../../vendor/dataset/src/data/casualties/index.ts";
import { cellView, pct, share } from "./model.ts";

/* ── Cell parsing ───────────────────────────────────────────────────────── */

const NUM = /\d[\d\s\u00a0\u202f]*(?:[.,]\d+)?/g;
const clean = (s: string) =>
  Number(s.replace(/[\s\u00a0\u202f]/g, "").replace(",", "."));

const nums = (c: Cell): number[] => {
  NUM.lastIndex = 0; // /g/ regex: reset before reuse
  return (cellView(c).text.match(NUM) ?? []).map(clean);
};
const lo = (c: Cell) => nums(c)[0] ?? null;
const hi = (c: Cell) => nums(c).at(-1) ?? null;

/* ── Copy access ────────────────────────────────────────────────────────── */

/* Local lookups over CasualtyCopy. That interface has no legend / showCases
 * fields, so: the legend reuses the column heads, and the case-note label
 * reuses casesCount ("{n} documented cases"). No new copy key is required. */
interface Labels {
  readonly scope: (id: string) => string;
  readonly side: (id: string) => string;
  readonly kind: (id: string) => string;
  readonly caseText: (id: string) => string;
  readonly legend: {
    readonly serious: string;
    readonly light: string;
    readonly unpub: string;
  };
  readonly casesLabel: (n: number) => string;
  readonly noCases: string;
}

function casCopy(): Labels {
  const c = t().casualties;
  return {
    scope: (id) => c.scope[id] ?? id,
    side: (id) => c.side[id] ?? id,
    kind: (id) => c.kind[id] ?? id,
    caseText: (id) => c.cases[id] ?? id,
    legend: {
      serious: c.colSerious,
      light: c.colLight,
      unpub: c.why.notPublished,
    },
    casesLabel: (n) => c.casesCount.replace(/\{n\}/g, String(n)),
    noCases: c.noCases,
  };
}

/* ── Severity strips ────────────────────────────────────────────────────── */

interface Part {
  readonly cls: string;
  readonly n: number;
}

/* Stacked parts must sum to the published total. `serious` is an overlay, not
 * a slice: on the CRS row it is a subset of the 66 unclassed cases
 * (1,167 + 66 = 1,233), so stacking it as a third segment produced 1,299 of
 * 1,233 and the browser had to drop or clip something. Whatever is unpublished
 * becomes the remainder; an over-budget row is reported, not drawn wrong.
 *
 * Widths come from the fr grid, so a segment's share is its count over the sum
 * of the parts — which equals the total except in the over-budget case, where
 * it is the sum and the row warns. */
function stackOf(row: SevRow): {
  parts: Part[];
  serious: readonly [number, number] | null;
} {
  const total = lo(row.total);
  if (total === null) return { parts: [], serious: null };

  const light = lo(row.light); // null when no number was published
  const other = lo(row.other);
  const sLo = lo(row.serious);
  const sHi = hi(row.serious);

  const parts: Part[] = [];
  if (light !== null) parts.push({ cls: "cas-seg-light", n: light });
  if (other !== null) parts.push({ cls: "cas-seg-other", n: other });

  // only a serious count published: then it is the whole bar
  if (parts.length === 0 && sHi !== null) {
    parts.push({ cls: "cas-seg-serious", n: Math.min(sHi, total) });
  }

  const used = parts.reduce((a, p) => a + p.n, 0);
  if (used < total) parts.push({ cls: "cas-seg-unpub", n: total - used });
  else if (used > total) {
    console.warn(
      `[casualties] ${row.id}: published parts sum to ${used} > total ${total}; ` +
        `proportions are scaled, the remainder is unknown`,
    );
  }

  const serious =
    sLo !== null && sHi !== null && sHi > sLo ? ([sLo, sHi] as const) : null;
  return { parts, serious };
}

function strip(row: SevRow, cp: Labels): HTMLElement {
  const c = t().casualties;
  const total = lo(row.total);
  const { parts, serious } = stackOf(row);

  const wrap = el("div", "cas-strip");

  const head = el("div", "cas-strip-head");
  head.append(
    el("span", "cas-strip-name", cp.scope(row.id)),
    el("span", "cas-strip-total", cellView(row.total).text),
  );
  const p = share(row.light, row.total);
  if (p !== null) head.append(el("span", "cas-strip-share", pct(p)));
  wrap.append(head);

  const box = el("div", "cas-track-wrap");
  const track = el("div", "cas-track");

  if (total === null || parts.length === 0) {
    track.classList.add("cas-track-empty");
    track.append(el("span", "cas-track-note", cellView(row.total).text));
  } else {
    // fr columns normalise to the total: no width maths, no flex shrink, no overflow
    track.style.gridTemplateColumns = parts
      .map((x) => `${Math.max(x.n, 0)}fr`)
      .join(" ");
    for (const x of parts) track.append(el("span", `cas-seg ${x.cls}`));

    if (serious) {
      const left = Math.min(100, Math.max(0, (serious[0] / total) * 100));
      const width = Math.min(
        100 - left,
        Math.max(0.6, ((serious[1] - serious[0]) / total) * 100),
      );
      const whisk = el("span", "cas-whisker");
      whisk.style.left = `${left}%`;
      whisk.style.width = `${width}%`;
      whisk.title = `${c.colSerious} ${cellView(row.serious).text}`;
      box.append(whisk);
    }
  }

  const meta = [
    `${c.colSerious} ${cellView(row.serious).text}`,
    `${c.colLight} ${cellView(row.light).text}`,
    `${c.colOther} ${cellView(row.other).text}`,
  ].join(" · ");

  track.setAttribute("role", "img");
  track.setAttribute("aria-label", `${head.textContent} — ${meta}`);
  box.append(track);
  wrap.append(box, el("p", "cas-strip-meta", meta));
  return wrap;
}

export function severityStrips(
  rows: readonly SevRow[],
  caption: string,
): HTMLElement {
  const cp = casCopy(); // once per section, not per row
  const wrap = el("div", "cas-visual");
  wrap.append(el("p", "cas-caption", caption));

  const legend = el("div", "cas-legend");
  const keys: readonly (readonly [string, string])[] = [
    ["cas-seg-serious", cp.legend.serious],
    ["cas-seg-light", cp.legend.light],
    ["cas-seg-unpub", cp.legend.unpub],
  ];
  for (const [cls, label] of keys) {
    const item = el("span", "cas-legend-item");
    item.append(el("i", `cas-swatch ${cls}`), el("span", "", label));
    legend.append(item);
  }
  wrap.append(legend);

  for (const row of rows) wrap.append(strip(row, cp));
  return wrap;
}

/* ── Case tally: one dot per documented case ────────────────────────────── */

interface Tally {
  readonly kind: "n" | "zero" | "unknown";
  readonly n: number;
}

function tally(cell: Cell, cp: Labels): Tally {
  const txt = cellView(cell).text.trim();
  if (txt === cp.noCases) return { kind: "zero", n: 0 };
  const n = lo(cell);
  return n === null ? { kind: "unknown", n: 0 } : { kind: "n", n };
}

const DOT_CAP = 24;

function dotsFor(row: CaseRow, t2: Tally): HTMLElement {
  const dots = el("div", "cas-dots");
  dots.setAttribute("aria-hidden", "true");

  if (t2.kind === "unknown") {
    dots.append(el("span", "cas-dot-unknown", "?"));
    return dots;
  }
  if (t2.kind === "zero") {
    dots.classList.add("cas-dots-empty");
    return dots;
  }

  const ref = row.reference;
  const shown = Math.min(t2.n, DOT_CAP);
  for (let i = 0; i < shown; i++) {
    dots.append(el("i", ref ? "cas-dot cas-dot-ref" : "cas-dot"));
  }
  if (t2.n > DOT_CAP) {
    dots.append(el("span", "cas-dot-more", `+${t2.n - DOT_CAP}`));
  }
  return dots;
}

/* The row already prints the count (e.g. "4 documented cases"); the expander
 * therefore carries no visible text, only the count as its accessible name. */
function detailsFor(row: CaseRow, cp: Labels): HTMLElement {
  const det = el("details", "cas-cases");
  const sum = el("summary", "cas-cases-sum");
  sum.setAttribute("aria-label", cp.casesLabel(row.cases.length));
  sum.title = cp.casesLabel(row.cases.length);

  const ul = el("ul", "cas-case-list");
  for (const key of row.cases) ul.append(el("li", "", cp.caseText(key)));
  det.append(sum, ul);
  return det;
}

export function caseTally(
  rows: readonly CaseRow[],
  caption: string,
): HTMLElement {
  const cp = casCopy(); // once per section, not per row
  const wrap = el("div", "cas-visual");
  wrap.append(el("p", "cas-caption", caption));

  let side: string | null = null;

  for (const row of rows) {
    const t2 = tally(row.count, cp);
    const line = el("div", "cas-tally-row");
    if (row.reference) line.classList.add("cas-reference");

    const sideLabel = cp.side(row.side);
    if (sideLabel !== side) {
      side = sideLabel;
      line.append(el("p", "cas-tally-side", sideLabel));
    }

    const facts = el("div", "cas-tally-facts");
    facts.append(
      el("span", "cas-tally-kind", cp.kind(row.kind)),
      el("span", "cas-tally-count", cellView(row.count).text),
    );
    if (row.cases.length > 0) facts.append(detailsFor(row, cp));

    const body = el("div", "cas-tally-body");
    body.append(dotsFor(row, t2), facts);

    line.append(body);
    line.setAttribute(
      "aria-label",
      `${sideLabel} — ${cp.kind(row.kind)}: ${cellView(row.count).text}`,
    );
    wrap.append(line);
  }
  return wrap;
}

/* ── Table fallback wrapper ─────────────────────────────────────────────── */

export function withTable(
  visual: HTMLElement,
  table: HTMLElement,
  label: string,
): HTMLElement {
  const det = el("details", "cas-table-toggle");
  det.append(el("summary", "", label), table);
  const box = el("div", "cas-visual-box");
  box.append(visual, det);
  return box;
}

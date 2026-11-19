/* ── src/sections/casualties/visuals.ts — severity visuals ──────────────────
   Section A/B. Bars never invent a denominator: what a source did not publish
   is drawn as a hatch, and what has no denominator is drawn as an empty track.
   Exact published strings stay in the caption line and in the <details> table
   fallback, so no precision is lost by drawing. */

import {
  type CaseRow,
  type Cell,
  type SevRow,
} from "@manifestigations/dataset";
import { t } from "../../copy";
import { html } from "../../core/html.ts";
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

function strip(row: SevRow, cp: Labels): Node {
  const c = t().casualties;
  const total = lo(row.total);
  const { parts, serious } = stackOf(row);

  const name = cp.scope(row.id);
  const totalText = cellView(row.total).text;
  const p = share(row.light, row.total);
  /* The share is shown in the head only when it exists. */
  const shareText = p === null ? "" : pct(p);

  const meta = [
    `${c.colSerious} ${cellView(row.serious).text}`,
    `${c.colLight} ${cellView(row.light).text}`,
    `${c.colOther} ${cellView(row.other).text}`,
  ].join(" · ");

  /* Was head.textContent + " — " + meta. Reading textContent made the
     accessible name depend on how the head was built; it is now the same
     string assembled from the same three values, with no whitespace in it —
     identical to before, and stable across a reformat. */
  const label = `${name}${totalText}${shareText} — ${meta}`;

  const empty = total === null || parts.length === 0;

  /* fr columns normalise to the total: no width maths, no flex shrink, no
     overflow. */
  const columns = empty
    ? null
    : parts.map((x) => `${Math.max(x.n, 0)}fr`).join(" ");

  const whisker = serious
    ? (() => {
        const t0 = total as number;
        const left = Math.min(100, Math.max(0, (serious[0] / t0) * 100));
        const width = Math.min(
          100 - left,
          Math.max(0.6, ((serious[1] - serious[0]) / t0) * 100),
        );
        return html`<span
          class="cas-whisker"
          style="left: ${left}%; width: ${width}%"
          title="${c.colSerious} ${cellView(row.serious).text}"
        ></span>`;
      })()
    : null;

  return html`<div class="cas-strip">
    <div class="cas-strip-head">
      <span class="cas-strip-name">${name}</span
      ><span class="cas-strip-total">${totalText}</span>${
        p === null ? null : html`<span class="cas-strip-share">${pct(p)}</span>`
      }
    </div>
    <div class="cas-track-wrap">
      ${whisker}
      <div
        class="cas-track${empty ? " cas-track-empty" : ""}"
        role="img"
        aria-label="${label}"
        style="${columns === null ? null : `grid-template-columns: ${columns}`}"
      >
        ${
          empty
            ? html`<span class="cas-track-note">${totalText}</span>`
            : parts.map((x) => html`<span class="cas-seg ${x.cls}"></span>`)
        }
      </div>
    </div>
    <p class="cas-strip-meta">${meta}</p>
  </div>`;
}

export function severityStrips(rows: readonly SevRow[], caption: string): Node {
  const cp = casCopy(); // once per section, not per row
  const keys: readonly (readonly [string, string])[] = [
    ["cas-seg-serious", cp.legend.serious],
    ["cas-seg-light", cp.legend.light],
    ["cas-seg-unpub", cp.legend.unpub],
  ];

  return html`<div class="cas-visual">
    <p class="cas-caption">${caption}</p>
    <div class="cas-legend">
      ${keys.map(
        ([cls, label]) =>
          html`<span class="cas-legend-item"
            ><i class="cas-swatch ${cls}"></i><span>${label}</span></span
          >`,
      )}
    </div>
    ${rows.map((row) => strip(row, cp))}
  </div>`;
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

function dotsFor(row: CaseRow, t2: Tally): Node {
  const dots = (children: readonly Node[]): Node =>
    html`<div class="cas-dots" aria-hidden="true">${children}</div>`;

  if (t2.kind === "unknown") {
    return dots([html`<span class="cas-dot-unknown">?</span>`]);
  }
  if (t2.kind === "zero") {
    return html`<div class="cas-dots cas-dots-empty" aria-hidden="true"></div>`;
  }

  const ref = row.reference;
  const shown = Math.min(t2.n, DOT_CAP);
  const marks = Array.from({ length: shown }, () =>
    ref
      ? html`<i class="cas-dot cas-dot-ref"></i>`
      : html`<i class="cas-dot"></i>`,
  );
  if (t2.n > DOT_CAP)
    marks.push(html`<span class="cas-dot-more">+${t2.n - DOT_CAP}</span>`);
  return dots(marks);
}

/* The row already prints the count (e.g. "4 documented cases"); the expander
   therefore carries no visible text, only the count as its accessible name. */
function detailsFor(row: CaseRow, cp: Labels): Node {
  const name = cp.casesLabel(row.cases.length);
  return html`<details class="cas-cases">
    <summary
      class="cas-cases-sum"
      aria-label="${name}"
      title="${name}"
    ></summary>
    <ul class="cas-case-list">
      ${row.cases.map((key) => html`<li>${cp.caseText(key)}</li>`)}
    </ul>
  </details>`;
}

export function caseTally(rows: readonly CaseRow[], caption: string): Node {
  const cp = casCopy(); // once per section, not per row
  let side: string | null = null;

  return html`<div class="cas-visual">
    <p class="cas-caption">${caption}</p>
    ${rows.map((row) => {
      const t2 = tally(row.count, cp);
      const sideLabel = cp.side(row.side);
      const heading = sideLabel !== side ? sideLabel : null;
      side = sideLabel;

      return html`<div
        class="cas-tally-row${row.reference ? " cas-reference" : ""}"
        aria-label="${sideLabel} — ${cp.kind(row.kind)}: ${cellView(row.count).text}"
      >
        ${heading ? html`<p class="cas-tally-side">${heading}</p>` : null}
        <div class="cas-tally-body">
          ${dotsFor(row, t2)}
          <div class="cas-tally-facts">
            <span class="cas-tally-kind">${cp.kind(row.kind)}</span
            ><span class="cas-tally-count">${cellView(row.count).text}</span
            >${row.cases.length > 0 ? detailsFor(row, cp) : null}
          </div>
        </div>
      </div>`;
    })}
  </div>`;
}

/* ── Table fallback wrapper ─────────────────────────────────────────────── */

export function withTable(visual: Node, table: Node, label: string): Node {
  return html`<div class="cas-visual-box">
    ${visual}
    <details class="cas-table-toggle">
      <summary>${label}</summary>
      ${table}
    </details>
  </div>`;
}

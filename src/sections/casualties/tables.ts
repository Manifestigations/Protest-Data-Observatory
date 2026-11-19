/* Every table in the casualty section. Rows are never summed: each table is a
 * set of different populations, windows or categories.
 *
 * Table rows are written on one source line each: a <tr> is a row of cells and
 * not a container, so it carries no text nodes of its own. */

import {
  BYSTANDER_CELLS,
  CIVILIAN_PROXY_SHARE,
  ESTIMATES,
  FORCES,
  LADDER,
  MIX,
  OBSERVATIONS,
  POPULATION_ORDER,
  RATIO,
  SENSITIVITY,
  SERIOUS_MOVEMENT,
  THINES,
  type CaseRow,
  type Cell,
  type SevRow,
} from "@manifestigations/dataset";
import { fill, nf, t } from "../../copy";
import { byId } from "../../core/dom.ts";
import { html } from "../../core/html.ts";
import { cellView, estimateRange, pct, share, type CellView } from "./model.ts";

function cell(c: Cell, extra = ""): Node {
  const v: CellView = cellView(c);
  return html`<td class="${extra ? `${v.cls} ${extra}` : v.cls}">
    ${v.text}
  </td>`;
}

function rowHead(text: string): Node {
  return html`<th scope="row" class="cas-scope">${text}</th>`;
}

function head(labels: readonly string[], lead = 1): Node {
  return html`<thead>
    <tr>
      ${labels.map(
        (label, i) =>
          html`<th
            scope="col"
            class="${i < lead ? "cas-scope-head" : "cas-num-head"}"
          >
            ${label}
          </th>`,
      )}
    </tr>
  </thead>`;
}

function bar(p: number): Node {
  const w = `${Math.max(0, Math.min(1, p)) * 100}%`;
  return html`<span class="cas-bar"
    ><span class="cas-bar-fill" style="width: ${w}"></span
  ></span>`;
}

/* ----- headline: the three estimands ----- */

function stat(num: string, label: string, cls = "cas-head-stat"): Node {
  return html`<div class="${cls}">
    <span class="cas-head-num">${num}</span
    ><span class="cas-head-label">${label}</span>
  </div>`;
}

export function headline(): Node {
  const c = t().casualties;
  const total = nf().format(FORCES.movement);

  return html`<div class="cas-headline">
    ${stat(
      `${pct(SERIOUS_MOVEMENT.lo / FORCES.movement)}–${pct(SERIOUS_MOVEMENT.hi / FORCES.movement)}`,
      fill(c.headSeriousShare, {
        lo: pct(SERIOUS_MOVEMENT.lo / FORCES.movement),
        hi: pct(SERIOUS_MOVEMENT.hi / FORCES.movement),
        total,
      }),
    )}
    ${stat(
      `${nf().format(SERIOUS_MOVEMENT.lo)}–${nf().format(SERIOUS_MOVEMENT.hi)}`,
      fill(c.headSeriousCount, {
        forces: `${nf().format(SERIOUS_MOVEMENT.lo)}–${nf().format(SERIOUS_MOVEMENT.hi)}`,
        protesters: `≥ ${nf().format(THINES.seriousTo5Nov + THINES.deathsTo5Nov)}`,
      }),
    )}
    ${stat(
      pct(MIX[0].central / FORCES.movement),
      fill(c.headMix, { light: nf().format(MIX[0].central), total }),
    )}
  </div>`;
}

/* ----- the mix, three exclusive bands ----- */

export function mixBlock(): Node {
  const c = t().casualties;
  const total = MIX.reduce((a, b) => a + b.central, 0);

  return html`<div class="cas-mix">
    <h4 class="cas-title">${c.mixTitle}</h4>
    ${MIX.map((band) => {
      const w = `${(band.central / total) * 100}%`;
      return html`<div class="cas-mix-row">
        <span class="cas-mix-label">${c.mix[band.id]}</span>
        <span class="cas-mix-track"
          ><span
            class="cas-mix-fill cas-mix-${band.id}"
            style="width: ${w}"
          ></span
        ></span>
        <span class="cas-mix-value"
          >${nf().format(band.lo)}–${nf().format(band.hi)}</span
        >
        <span class="cas-mix-share"
          >${pct(band.lo / total)}–${pct(band.hi / total)}</span
        >
      </div>`;
    })}
    <p class="cas-note">${c.noteMix}</p>
  </div>`;
}

/* ----- severity tables (A and B) ----- */

export function severityTable(rows: readonly SevRow[], caption: string): Node {
  const c = t().casualties;
  return html`<table class="cas-table">
    <caption class="cas-caption">
      ${caption}
    </caption>
    ${head([
      c.colScope,
      c.colTotal,
      c.colSerious,
      c.colLight,
      c.colLightShare,
      c.colOther,
    ])}
    <tbody>
      ${rows.map((row) => {
        const p = share(row.light, row.total);
        return html`<tr>
          ${rowHead(c.scope[row.id] ?? row.id)}${cell(row.total)}${cell(row.serious)}${cell(row.light)}${
            p === null
              ? html`<td class="cas-share">
                  <span class="cas-absent">—</span>
                </td>`
              : html`<td class="cas-share">
                  <span class="cas-pct">${pct(p)}</span>${bar(p)}
                </td>`
          }${cell(row.other)}
        </tr>`;
      })}
    </tbody>
  </table>`;
}

/* ----- populations: every observation, tagged ----- */

export function populationTable(): Node {
  const c = t().casualties;
  const ordered = [...OBSERVATIONS].sort(
    (a, b) =>
      POPULATION_ORDER.indexOf(a.population) -
        POPULATION_ORDER.indexOf(b.population) || a.date.localeCompare(b.date),
  );

  return html`<table class="cas-table cas-population">
    <caption class="cas-caption">
      ${c.capPopulation}
    </caption>
    ${head([
      c.colScope,
      c.colPopulation,
      c.colParticipation,
      c.colSelection,
      c.colCount,
    ])}
    <tbody>
      ${ordered.map(
        (obs) =>
          html`<tr>
            ${rowHead(c.observations[obs.id] ?? obs.id)}
            <td class="cas-kind">${c.population[obs.population]}</td>
            <td class="cas-kind">${c.participation[obs.participation]}</td>
            <td class="cas-kind">${c.selection[obs.selection]}</td>
            ${cell(obs.count)}
          </tr>`,
      )}
    </tbody>
  </table>`;
}

/* ----- bystanders: the empty table is the finding ----- */

export function bystanderTable(): Node {
  const c = t().casualties;
  const rows: Array<readonly [string, Cell]> = [
    [c.bystanders.documented, BYSTANDER_CELLS.documented],
    [c.bystanders.serious, BYSTANDER_CELLS.serious],
    [c.bystanders.national, BYSTANDER_CELLS.national],
  ];

  return html`<table class="cas-table cas-bystanders">
    <caption class="cas-caption">
      ${c.bystanderCaption}
    </caption>
    ${head([c.colQuestion, c.colCount])}
    <tbody>
      ${rows.map(
        ([label, c2]) =>
          html`<tr>
            ${rowHead(label)}${cell(c2)}
          </tr>`,
      )}
    </tbody>
  </table>`;
}

/* ----- the estimands ----- */

export function estimateTable(): Node {
  const c = t().casualties;
  return html`<table class="cas-table cas-estimates">
    <caption class="cas-caption">
      ${c.capEstimate}
    </caption>
    ${head([c.colEstimate, c.colRange, c.colMethod, c.colEdges, c.colStatus])}
    <tbody>
      ${ESTIMATES.map((e) => {
        const copy = c.estimates[e.key];
        const v = estimateRange(e);
        return html`<tr class="${e.status === "gap" ? "cas-reference" : ""}">
          ${rowHead(copy?.label ?? e.key)}
          <td class="${v.cls}">${v.text}</td>
          <td class="cas-kind">${copy?.method ?? ""}</td>
          <td class="cas-kind">
            ${fill(c.edgePair, { lo: c.edge[e.loEdge], hi: c.edge[e.hiEdge] })}
          </td>
          <td class="cas-kind">${c.status[e.status]}</td>
        </tr>`;
      })}
    </tbody>
  </table>`;
}

export function sensitivityTable(): Node {
  const c = t().casualties;
  return html`<table class="cas-table cas-sensitivity">
    <caption class="cas-caption">
      ${c.capSensitivity}
    </caption>
    ${head([c.colRatio, c.colAt17, c.colMovement])}
    <tbody>
      ${SENSITIVITY.map(
        (row) =>
          html`<tr class="${row.ratio === RATIO.mid ? "cas-reference" : ""}">
            ${rowHead(`r = ${row.ratio}`)}
            <td class="cas-num cas-derived">${nf().format(row.at17Oct)}</td>
            <td class="cas-num cas-derived">${nf().format(row.movement)}</td>
          </tr>`,
      )}
    </tbody>
  </table>`;
}

/* ----- cause ----- */

export function causeTable(rows: readonly CaseRow[], caption: string): Node {
  const c = t().casualties;
  return html`<table class="cas-table cas-cause">
    <caption class="cas-caption">
      ${caption}
    </caption>
    ${head([c.colSide, c.colCircumstance, c.colCount, c.colCases], 2)}
    <tbody>
      ${rows.map(
        (row) =>
          html`<tr class="${row.reference ? "cas-reference" : ""}">
            ${rowHead(c.side[row.side])}
            <td class="cas-kind">${c.kind[row.kind]}</td>
            ${cell(row.count)}
            <td class="cas-cases-cell">
              ${
                row.cases.length === 0
                  ? html`<span class="cas-absent">${c.noCases}</span>`
                  : html`<ul class="cas-case-list">
                      ${row.cases.map((key) => html`<li>${c.cases[key]}</li>`)}
                    </ul>`
              }
            </td>
          </tr>`,
      )}
    </tbody>
  </table>`;
}

/* ----- resolution ----- */

export function resolutionTable(): Node {
  const c = t().casualties;
  return html`<table class="cas-table cas-resolution">
    <caption class="cas-caption">
      ${c.capResolution}
    </caption>
    ${head([c.colQuestion, c.colWindow, c.colWeekly], 2)}
    <tbody>
      ${c.resolution.map(
        (row) =>
          html`<tr>
            ${rowHead(row.label)}
            <td>${row.window}</td>
            <td class="cas-num">${row.weekly}</td>
          </tr>`,
      )}
    </tbody>
  </table>`;
}

/* ----- the ladder (optional block, reused by the method note) ----- */

export function ladderList(): Node {
  const c = t().casualties;
  return html`<ul class="cas-ladder">
    ${LADDER.map(
      (rung) =>
        html`<li>
          ${`${rung.mais} — ${c.ladder[rung.id]} (${rung.lo}–${rung.hi})`}
        </li>`,
    )}
  </ul>`;
}

/** Exported for the method note: 150 injured, 3 serious → 2.0 %. */
export const CIVILIAN_PROXY = pct(CIVILIAN_PROXY_SHARE);

export { byId };

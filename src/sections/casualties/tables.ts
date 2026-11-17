/* Every table in the casualty section. Rows are never summed: each table is a
 * set of different populations, windows or categories. */

import { fill, nf, t } from "../../copy";
import { byId, el } from "../../core/dom.ts";
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
} from "../../vendor/dataset/src/data/casualties/index.ts";
import { cellView, estimateRange, pct, share, type CellView } from "./model.ts";

function cell(c: Cell, extra = ""): HTMLElement {
  const v: CellView = cellView(c);
  return el("td", extra ? `${v.cls} ${extra}` : v.cls, v.text);
}

function rowHead(text: string): HTMLTableCellElement {
  const th = el("th", "cas-scope", text) as HTMLTableCellElement;
  th.scope = "row";
  return th;
}

function head(labels: readonly string[], lead = 1): HTMLElement {
  const tr = el("tr");
  labels.forEach((label, i) => {
    const th = el(
      "th",
      i < lead ? "cas-scope-head" : "cas-num-head",
      label,
    ) as HTMLTableCellElement;
    th.scope = "col";
    tr.append(th);
  });
  const thead = el("thead");
  thead.append(tr);
  return thead;
}

function bar(p: number): HTMLElement {
  const wrap = el("span", "cas-bar");
  const run = el("span", "cas-bar-fill");
  run.style.width = `${Math.max(0, Math.min(1, p)) * 100}%`;
  wrap.append(run);
  return wrap;
}

/* ----- headline: the three estimands ----- */

function stat(num: string, label: string, cls = "cas-head-stat"): HTMLElement {
  const wrap = el("div", cls);
  wrap.append(
    el("span", "cas-head-num", num),
    el("span", "cas-head-label", label),
  );
  return wrap;
}

export function headline(): HTMLElement {
  const c = t().casualties;
  const wrap = el("div", "cas-headline");
  const total = nf().format(FORCES.movement);

  wrap.append(
    stat(
      `${pct(SERIOUS_MOVEMENT.lo / FORCES.movement)}–${pct(SERIOUS_MOVEMENT.hi / FORCES.movement)}`,
      fill(c.headSeriousShare, {
        lo: pct(SERIOUS_MOVEMENT.lo / FORCES.movement),
        hi: pct(SERIOUS_MOVEMENT.hi / FORCES.movement),
        total,
      }),
    ),
    stat(
      `${nf().format(SERIOUS_MOVEMENT.lo)}–${nf().format(SERIOUS_MOVEMENT.hi)}`,
      fill(c.headSeriousCount, {
        forces: `${nf().format(SERIOUS_MOVEMENT.lo)}–${nf().format(SERIOUS_MOVEMENT.hi)}`,
        protesters: `≥ ${nf().format(THINES.seriousTo5Nov + THINES.deathsTo5Nov)}`,
      }),
    ),
    stat(
      pct(MIX[0].central / FORCES.movement),
      fill(c.headMix, { light: nf().format(MIX[0].central), total }),
    ),
  );
  return wrap;
}

/* ----- the mix, three exclusive bands ----- */

export function mixBlock(): HTMLElement {
  const c = t().casualties;
  const wrap = el("div", "cas-mix");
  wrap.append(el("h4", "cas-title", c.mixTitle));

  const total = MIX.reduce((a, b) => a + b.central, 0);
  for (const band of MIX) {
    const row = el("div", "cas-mix-row");
    row.append(el("span", "cas-mix-label", c.mix[band.id]));
    const track = el("span", "cas-mix-track");
    const run = el("span", `cas-mix-fill cas-mix-${band.id}`);
    run.style.width = `${(band.central / total) * 100}%`;
    track.append(run);
    row.append(
      track,
      el(
        "span",
        "cas-mix-value",
        `${nf().format(band.lo)}–${nf().format(band.hi)}`,
      ),
      el(
        "span",
        "cas-mix-share",
        `${pct(band.lo / total)}–${pct(band.hi / total)}`,
      ),
    );
    wrap.append(row);
  }
  wrap.append(el("p", "cas-note", c.noteMix));
  return wrap;
}

/* ----- severity tables (A and B) ----- */

export function severityTable(
  rows: readonly SevRow[],
  caption: string,
): HTMLElement {
  const c = t().casualties;
  const table = el("table", "cas-table");
  table.append(el("caption", "cas-caption", caption));
  table.append(
    head([
      c.colScope,
      c.colTotal,
      c.colSerious,
      c.colLight,
      c.colLightShare,
      c.colOther,
    ]),
  );

  const tbody = el("tbody");
  for (const row of rows) {
    const tr = el("tr");
    tr.append(rowHead(c.scope[row.id] ?? row.id));
    tr.append(cell(row.total), cell(row.serious), cell(row.light));

    const p = share(row.light, row.total);
    const td = el("td", "cas-share");
    if (p === null) td.append(el("span", "cas-absent", "—"));
    else td.append(el("span", "cas-pct", pct(p)), bar(p));
    tr.append(td);

    tr.append(cell(row.other));
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

/* ----- populations: every observation, tagged ----- */

export function populationTable(): HTMLElement {
  const c = t().casualties;
  const table = el("table", "cas-table cas-population");
  table.append(el("caption", "cas-caption", c.capPopulation));
  table.append(
    head([
      c.colScope,
      c.colPopulation,
      c.colParticipation,
      c.colSelection,
      c.colCount,
    ]),
  );

  const tbody = el("tbody");
  const ordered = [...OBSERVATIONS].sort(
    (a, b) =>
      POPULATION_ORDER.indexOf(a.population) -
        POPULATION_ORDER.indexOf(b.population) || a.date.localeCompare(b.date),
  );
  for (const obs of ordered) {
    const tr = el("tr");
    tr.append(rowHead(c.observations[obs.id] ?? obs.id));
    tr.append(el("td", "cas-kind", c.population[obs.population]));
    tr.append(el("td", "cas-kind", c.participation[obs.participation]));
    tr.append(el("td", "cas-kind", c.selection[obs.selection]));
    tr.append(cell(obs.count));
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

/* ----- bystanders: the empty table is the finding ----- */

export function bystanderTable(): HTMLElement {
  const c = t().casualties;
  const table = el("table", "cas-table cas-bystanders");
  table.append(el("caption", "cas-caption", c.bystanderCaption));
  table.append(head([c.colQuestion, c.colCount]));

  const tbody = el("tbody");
  const rows: Array<[string, Cell]> = [
    [c.bystanders.documented, BYSTANDER_CELLS.documented],
    [c.bystanders.serious, BYSTANDER_CELLS.serious],
    [c.bystanders.national, BYSTANDER_CELLS.national],
  ];
  for (const [label, c2] of rows) {
    const tr = el("tr");
    tr.append(rowHead(label), cell(c2));
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

/* ----- the estimands ----- */

export function estimateTable(): HTMLElement {
  const c = t().casualties;
  const table = el("table", "cas-table cas-estimates");
  table.append(el("caption", "cas-caption", c.capEstimate));
  table.append(
    head([c.colEstimate, c.colRange, c.colMethod, c.colEdges, c.colStatus]),
  );

  const tbody = el("tbody");
  for (const e of ESTIMATES) {
    const copy = c.estimates[e.key];
    const tr = el("tr", e.status === "gap" ? "cas-reference" : "");

    tr.append(rowHead(copy?.label ?? e.key));

    const v = estimateRange(e);
    tr.append(el("td", v.cls, v.text));
    tr.append(el("td", "cas-kind", copy?.method ?? ""));
    tr.append(
      el(
        "td",
        "cas-kind",
        fill(c.edgePair, { lo: c.edge[e.loEdge], hi: c.edge[e.hiEdge] }),
      ),
    );
    tr.append(el("td", "cas-kind", c.status[e.status]));

    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

export function sensitivityTable(): HTMLElement {
  const c = t().casualties;
  const table = el("table", "cas-table cas-sensitivity");
  table.append(el("caption", "cas-caption", c.capSensitivity));
  table.append(head([c.colRatio, c.colAt17, c.colMovement]));

  const tbody = el("tbody");
  for (const row of SENSITIVITY) {
    const tr = el("tr", row.ratio === RATIO.mid ? "cas-reference" : "");
    tr.append(rowHead(`r = ${row.ratio}`));
    tr.append(el("td", "cas-num cas-derived", nf().format(row.at17Oct)));
    tr.append(el("td", "cas-num cas-derived", nf().format(row.movement)));
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

/* ----- cause ----- */

export function causeTable(
  rows: readonly CaseRow[],
  caption: string,
): HTMLElement {
  const c = t().casualties;
  const table = el("table", "cas-table cas-cause");
  table.append(el("caption", "cas-caption", caption));
  table.append(head([c.colSide, c.colCircumstance, c.colCount, c.colCases], 2));

  const tbody = el("tbody");
  for (const row of rows) {
    const tr = el("tr", row.reference ? "cas-reference" : "");
    tr.append(rowHead(c.side[row.side]));
    tr.append(el("td", "cas-kind", c.kind[row.kind]));
    tr.append(cell(row.count));

    const td = el("td", "cas-cases-cell");
    if (!row.cases.length) td.append(el("span", "cas-absent", c.noCases));
    else {
      const list = el("ul", "cas-case-list");
      for (const key of row.cases) list.append(el("li", "", c.cases[key]));
      td.append(list);
    }
    tr.append(td);
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

/* ----- resolution ----- */

export function resolutionTable(): HTMLElement {
  const c = t().casualties;
  const table = el("table", "cas-table cas-resolution");
  table.append(el("caption", "cas-caption", c.capResolution));
  table.append(head([c.colQuestion, c.colWindow, c.colWeekly], 2));

  const tbody = el("tbody");
  for (const row of c.resolution) {
    const tr = el("tr");
    tr.append(rowHead(row.label), el("td", "", row.window));
    tr.append(el("td", "cas-num", row.weekly));
    tbody.append(tr);
  }
  table.append(tbody);
  return table;
}

/* ----- the ladder (optional block, reused by the method note) ----- */

export function ladderList(): HTMLElement {
  const c = t().casualties;
  const list = el("ul", "cas-ladder");
  for (const rung of LADDER) {
    const li = el(
      "li",
      "",
      `${rung.mais} — ${c.ladder[rung.id]} (${rung.lo}–${rung.hi})`,
    );
    list.append(li);
  }
  return list;
}

/** Exported for the method note: 150 injured, 3 serious → 2.0 %. */
export const CIVILIAN_PROXY = pct(CIVILIAN_PROXY_SHARE);

export { byId };

import { byId, el } from "../../core/dom.ts";
import { fill, t } from "../../copy";
import { getLocale } from "../../copy/state.ts";
import {
  CASES,
  SEVERITY_LEVELS,
  SEVERITY_WEEKS,
} from "../../data/casualties/index.ts";
import {
  CIVILIAN_PROXY,
  bystanderTable,
  causeTable,
  estimateTable,
  headline,
  mixBlock,
  populationTable,
  resolutionTable,
  sensitivityTable,
  severityTable,
} from "./tables.ts";
import { caseTally, severityStrips, withTable } from "./visuals.ts";

const LABEL: Record<string, string> = {
  fr: "Voir les chiffres",
  en: "See the numbers",
};

export function mountCasualties(): void {
  const c = t().casualties;
  const label =
    (c as { showTable?: string }).showTable ?? LABEL[getLocale()] ?? LABEL.en;

  /* Section A — headline + mix above the chart, breakdown below it. */
  const a = byId("cas-a");
  const aHead = byId("cas-a-head");

  const aTop = [el("h4", "cas-title", c.headlineTitle), headline(), mixBlock()];
  const aRest = [
    withTable(
      severityStrips(SEVERITY_LEVELS, c.capLevels),
      severityTable(SEVERITY_LEVELS, c.capLevels),
      label,
    ),
    el("h4", "cas-title", c.popTitle),
    populationTable(),
    el("p", "cas-note", c.notePopulation),
    el("h4", "cas-title", c.bystanderTitle),
    bystanderTable(),
    el("p", "cas-note", fill(c.noteBystanders, { proxy: CIVILIAN_PROXY })),
    withTable(
      caseTally(CASES, c.capCases),
      causeTable(CASES, c.capCases),
      label,
    ),
    el("p", "cas-note", c.noteLevels),
  ];

  if (aHead) aHead.replaceChildren(...aTop);
  if (a) a.replaceChildren(...(aHead ? aRest : [...aTop, ...aRest]));

  /* Section B — weekly strip above the chart, estimands below it. */
  const b = byId("cas-b");
  const bHead = byId("cas-b-head");
  const bTop = [
    el("h4", "cas-title", c.weeklyTitle),
    severityStrips(SEVERITY_WEEKS, c.capWeeks),
  ];
  const bRest = [
    severityTable(SEVERITY_WEEKS, c.capWeeks),
    el("h4", "cas-title", c.estTitle),
    estimateTable(),
    el("p", "cas-note", c.noteEstimate),
    sensitivityTable(),
    el("p", "cas-note", c.noteSensitivity),
    resolutionTable(),
    el("p", "cas-note", c.noteWeeks),
  ];
  if (bHead) bHead.replaceChildren(...bTop);
  if (b) b.replaceChildren(...(bHead ? bRest : [...bTop, ...bRest]));
}

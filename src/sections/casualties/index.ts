/* Mount. Section A: what the severity split is. Section B: what a week can
 * establish, and the estimands. Anchors cas-a / cas-b are unchanged. */

import { byId, el } from "../../core/dom.ts";
import { t } from "../../copy";
import {
  CASES,
  SEVERITY_LEVELS,
  SEVERITY_WEEKS,
} from "../../data/casualties/index.ts";
import {
  bystanderTable,
  causeTable,
  estimateTable,
  headline,
  mixBlock,
  populationTable,
  resolutionTable,
  severityTable,
  sensitivityTable,
  CIVILIAN_PROXY,
} from "./tables.ts";
import { fill } from "../../copy";

export function mountCasualties(): void {
  const c = t().casualties;

  const a = byId("cas-a");
  if (a) {
    a.replaceChildren(
      el("h4", "cas-title", c.headlineTitle),
      headline(),
      mixBlock(),
      severityTable(SEVERITY_LEVELS, c.capLevels),
      el("h4", "cas-title", c.popTitle),
      populationTable(),
      el("p", "cas-note", c.notePopulation),
      el("h4", "cas-title", c.bystanderTitle),
      bystanderTable(),
      el("p", "cas-note", fill(c.noteBystanders, { proxy: CIVILIAN_PROXY })),
      causeTable(CASES, c.capCases),
      el("p", "cas-note", c.noteLevels),
    );
  }

  const b = byId("cas-b");
  if (b) {
    b.replaceChildren(
      el("h4", "cas-title", c.weeklyTitle),
      severityTable(SEVERITY_WEEKS, c.capWeeks),
      el("h4", "cas-title", c.estTitle),
      estimateTable(),
      el("p", "cas-note", c.noteEstimate),
      sensitivityTable(),
      el("p", "cas-note", c.noteSensitivity),
      resolutionTable(),
      el("p", "cas-note", c.noteWeeks),
    );
  }
}

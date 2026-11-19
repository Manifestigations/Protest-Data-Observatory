import {
  CASES,
  SEVERITY_LEVELS,
  SEVERITY_WEEKS,
} from "@manifestigations/dataset";
import { fill, t } from "../../copy";
import { getLocale } from "../../copy/state.ts";
import { byId } from "../../core/dom.ts";
import { html, mount } from "../../core/html.ts";
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

const subTitle = (text: string): Node =>
  html`<h4 class="cas-title">${text}</h4>`;

export function mountCasualties(): void {
  const c = t().casualties;
  const label =
    (c as { showTable?: string }).showTable ?? LABEL[getLocale()] ?? LABEL.en;

  /* Section A — headline + mix above the chart, breakdown below it. */
  const a = byId("cas-a");
  const aHead = byId("cas-a-head");

  const aTop = [subTitle(c.headlineTitle), headline(), mixBlock()];
  const aRest = [
    withTable(
      severityStrips(SEVERITY_LEVELS, c.capLevels),
      severityTable(SEVERITY_LEVELS, c.capLevels),
      label,
    ),
    subTitle(c.popTitle),
    populationTable(),
    html`<p class="cas-note">${c.notePopulation}</p>`,
    subTitle(c.bystanderTitle),
    bystanderTable(),
    html`<p class="cas-note">
      ${fill(c.noteBystanders, {
        proxy: CIVILIAN_PROXY,
      })}
    </p>`,
    withTable(
      caseTally(CASES, c.capCases),
      causeTable(CASES, c.capCases),
      label,
    ),
    html`<p class="cas-note">${c.noteLevels}</p>`,
  ];

  if (aHead) mount(aHead, ...aTop);
  if (a) mount(a, ...(aHead ? aRest : [...aTop, ...aRest]));

  /* Section B — weekly strip above the chart, estimands below it. */
  const b = byId("cas-b");
  const bHead = byId("cas-b-head");
  const bTop = [
    subTitle(c.weeklyTitle),
    severityStrips(SEVERITY_WEEKS, c.capWeeks),
  ];
  const bRest = [
    severityTable(SEVERITY_WEEKS, c.capWeeks),
    subTitle(c.estTitle),
    estimateTable(),
    html`<p class="cas-note">${c.noteEstimate}</p>`,
    sensitivityTable(),
    html`<p class="cas-note">${c.noteSensitivity}</p>`,
    resolutionTable(),
    html`<p class="cas-note">${c.noteWeeks}</p>`,
  ];
  if (bHead) mount(bHead, ...bTop);
  if (b) mount(b, ...(bHead ? bRest : [...bTop, ...bRest]));
}

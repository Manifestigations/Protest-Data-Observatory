import type { Lang } from "../../copy";
import { CALLOUT } from "./copy";
import type { Block, Run, SubSection } from "./model";

/** Only this sub-section is expanded on load; "" collapses everything. */
const OPEN_ID: string = "analysis";
/** Gets the accent treatment. Same id, because the featured section is the open one. */
const FEATURED_ID = OPEN_ID;

function inline(run: Run): Node {
  if (typeof run === "string") return document.createTextNode(run);

  if ("em" in run) {
    const em = document.createElement("em");
    em.textContent = run.em;
    return em;
  }

  const a = document.createElement("a");
  a.href = run.href;
  a.textContent = run.link;
  a.rel = "noopener noreferrer";
  if (/^https?:/i.test(run.href)) a.target = "_blank";
  return a;
}

function block(b: Block): HTMLElement {
  if (b.kind === "p") {
    const p = document.createElement("p");
    p.append(...b.runs.map(inline));
    return p;
  }

  if (b.kind === "ul") {
    const ul = document.createElement("ul");
    for (const item of b.items) {
      const li = document.createElement("li");
      li.append(...item.map(inline));
      ul.append(li);
    }
    return ul;
  }

  const quote = document.createElement("blockquote");
  quote.className = "about-quote";
  for (const para of b.paras) {
    const p = document.createElement("p");
    p.append(...para.map(inline));
    quote.append(p);
  }
  const by = document.createElement("footer");
  by.append(...b.by.map(inline));
  quote.append(by);
  return quote;
}

/** `open` carries the reader's choices across locale changes. */
export function group(
  sub: SubSection,
  open: ReadonlyMap<string, boolean>,
): HTMLDetailsElement {
  const details = document.createElement("details");
  details.className =
    sub.id === FEATURED_ID
      ? "about-group about-group--featured"
      : "about-group";
  details.dataset.about = sub.id;
  details.open = open.get(sub.id) ?? sub.id === OPEN_ID;

  const summary = document.createElement("summary");
  summary.className = "about-summary";

  const title = document.createElement("h3");
  title.className = "about-title";
  title.textContent = sub.title;
  summary.append(title);

  const body = document.createElement("div");
  body.className = "about-body";
  for (const b of sub.blocks) body.append(block(b));

  details.append(summary, body);
  return details;
}

export function callout(lang: Lang): HTMLElement {
  const p = document.createElement("p");
  p.className = "callout callout--positive";
  p.setAttribute("role", "note");
  p.textContent = CALLOUT[lang];
  return p;
}

import type { Lang } from "../../copy";
import { CALLOUT } from "./copy";
import type { Block, Run, SubSection } from "./model";

/** Gets the accent treatment. Same id, because the featured section is the open one. */
const FEATURED_ID = "analysis";

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
  switch (b.kind) {
    case "p": {
    const p = document.createElement("p");
    p.append(...b.runs.map(inline));
    return p;
  }

    case "ul": {
    const ul = document.createElement("ul");
    for (const item of b.items) {
      const li = document.createElement("li");
      li.append(...item.map(inline));
      ul.append(li);
    }
    return ul;
  }

    /* h4, not h3: the group title is already the h3. */
    case "h": {
      const h = document.createElement("h4");
      h.className = "about-subhead";
      h.textContent = b.text;
      return h;
    }

    default: {
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
  }
}

/* `open` carries the reader's choices across locale changes; nothing is
   opened on a first visit, so the section reads as a list of three closed
   questions rather than landing on the longest one. */
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
  details.open = open.get(sub.id) ?? false;

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

import type { Lang } from "../../copy";
import { html } from "../../core/html";
import { CALLOUT } from "./copy";
import type { Block, Run, SubSection } from "./model";

/** Gets the accent treatment. Same id, because the featured section is the open one. */
const FEATURED_ID = "analysis";

/** A run is already a node: text, <em>, or a link. */
function inline(run: Run): Node {
  if (typeof run === "string") return document.createTextNode(run);

  if ("em" in run) return html`<em>${run.em}</em>`;

  return html`<a
    href="${run.href}"
    rel="noopener noreferrer"
    target="${/^https?:/i.test(run.href) ? "_blank" : null}"
    >${run.link}</a
  >`;
}

function block(b: Block): Node {
  switch (b.kind) {
    case "p": {
      return html`<p>${b.runs.map(inline)}</p>`;
    }

    case "ul": {
      return html`<ul>
        ${b.items.map((item) => html`<li>${item.map(inline)}</li>`)}
      </ul>`;
    }

    /* h4, not h3: the group title is already the h3. */
    case "h": {
      return html`<h4 class="about-subhead">${b.text}</h4>`;
    }

    default: {
      return html`<blockquote class="about-quote">
        ${b.paras.map((para) => html`<p>${para.map(inline)}</p>`)}
        <footer>${b.by.map(inline)}</footer>
      </blockquote>`;
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
  const cls =
    sub.id === FEATURED_ID
      ? "about-group about-group--featured"
      : "about-group";

  return html`<details
    class="${cls}"
    data-about="${sub.id}"
    open="${open.get(sub.id) ?? false}"
  >
    <summary class="about-summary">
      <h3 class="about-title">${sub.title}</h3>
    </summary>
    <div class="about-body">${sub.blocks.map(block)}</div>
  </details>` as HTMLDetailsElement;
}

export function callout(lang: Lang): Node {
  return html`<p class="callout callout--positive" role="note">
    ${CALLOUT[lang]}
  </p>`;
}

/* Hub cards: a clickable card whose hero is greyscale until the card is
   hovered or holds focus. The credit line is a real link to the file page and
   is what the main link points at with aria-describedby, so the source
   travels with the image for screen readers and for anyone who tabs in. */

import { bi } from "../../copy";
import { byId } from "../../core/dom";
import { html } from "../../core/html";
import { heroFile720 } from "../../site/media";
import type { CardSpec } from "../../site/routes";
import {
  CREDIT_LABEL,
  CREDIT_LINK_LABEL,
  LICENCE_LABEL,
  MORE_LABEL,
  pageHref,
  relHref,
} from "../../site/routes";

/** docs/img/, relative to the page's own depth:
 *  index.html → "img/x.jpg"; 2026/turnout.html → "../img/x.jpg" */
const heroSrc = (fromPath: string, file: string): string =>
  relHref(fromPath, `img/${file}`);

function creditId(card: CardSpec): string {
  return `credit-${card.href.replace(/\//g, "-")}`;
}

function hero(card: CardSpec, fromPath: string): Node {
  /* src stays the full-size file: it is the fallback and the only candidate
     below the srcset breakpoint. srcset points at the 720w WebP variant.
     width/height are 3:2, matching .card-hero's aspect-ratio, not intrinsic
     pixels. */
  return html`<figure class="card-hero">
    <img
      src="${heroSrc(fromPath, card.hero.file)}"
      srcset="${heroSrc(fromPath, heroFile720(card.hero.file))} 720w"
      sizes="(min-width: 40rem) 336px, 92vw"
      alt="${bi(card.hero.alt)}"
      width="1200"
      height="800"
      loading="lazy"
      decoding="async"
      aria-describedby="${creditId(card)}"
    />
  </figure>`;
}

/* The separators are interpolations, not template whitespace: a card credit
   is a single running line and must not gain or lose a space depending on how
   the template is indented. */
function credit(card: CardSpec): Node {
  const licence = card.hero.licenceUrl
    ? html`${" "}<a
          class="card-licence-link"
          href="${card.hero.licenceUrl}"
          target="_blank"
          rel="noopener noreferrer"
          >${bi(LICENCE_LABEL)}</a
        >`
    : null;

  return html`<p class="card-credit" id="${creditId(card)}">
    <span class="card-credit-label">${bi(CREDIT_LABEL)}:</span>${" "}<a
      class="card-credit-link"
      href="${card.hero.filePage}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="${bi(card.hero.credit)} — ${bi(CREDIT_LINK_LABEL)}"
      >${card.hero.credit.en === "" ? "" : bi(card.hero.credit)}</a
    >${licence}${" · "}<span class="card-licence"
      >${bi(card.hero.licence)}</span
    >
  </p>`;
}

export function card(spec: CardSpec, fromPath: string): Node {
  return html`<article class="group-card">
    <a
      class="card-main"
      href="${pageHref(fromPath, spec.href)}"
      aria-describedby="${creditId(spec)}"
    >
      ${hero(spec, fromPath)}
      <div class="card-body">
        <h3 class="card-title">${bi(spec.title)}</h3>
        <p class="card-blurb">${bi(spec.blurb)}</p>
        <p class="card-more" aria-hidden="true">${bi(MORE_LABEL)} →</p>
      </div>
    </a>
    ${credit(spec)}
  </article>`;
}

/** Idempotent: replaces the grid's children on every locale change. */
export function mountCards(
  fromPath: string,
  cards: readonly CardSpec[],
  host: HTMLElement | null = byId("card-grid"),
): void {
  if (!host) return;
  host.replaceChildren(
    html`<div class="card-grid">${cards.map((c) => card(c, fromPath))}</div>`,
  );
}

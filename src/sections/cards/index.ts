/* Hub cards: a clickable card whose hero is greyscale until the card is
   hovered or holds focus. The credit line is a real link to the file page and
   is what the main link points at with aria-describedby, so the source
   travels with the image for screen readers and for anyone who tabs in. */

import { bi } from "../../copy";
import { byId, el } from "../../core/dom";
import {
  CREDIT_LABEL,
  CREDIT_LINK_LABEL,
  LICENCE_LABEL,
  MORE_LABEL,
  pageHref,
  relHref,
} from "../../site/routes";
import type { CardSpec } from "../../site/routes";

/** docs/img/<file>, relative to the page's own depth:
 *  index.html → "img/x.jpg";  2026/turnout.html → "../img/x.jpg" */
const heroSrc = (fromPath: string, file: string): string =>
  relHref(fromPath, `img/${file}`);

function creditId(card: CardSpec): string {
  return `credit-${card.href.replace(/\//g, "-")}`;
}

function hero(card: CardSpec, fromPath: string): HTMLElement {
  const figure = el("figure", "card-hero");
  const img = el("img");
  img.src = heroSrc(fromPath, card.hero.file);
  img.alt = bi(card.hero.alt);
  img.width = 1200;
  img.height = 800;
  img.loading = "lazy";
  img.decoding = "async";
  img.setAttribute("aria-describedby", creditId(card));
  figure.append(img);
  return figure;
}

function credit(card: CardSpec): HTMLElement {
  const p = el("p", "card-credit");
  p.id = creditId(card);
  p.append(el("span", "card-credit-label", `${bi(CREDIT_LABEL)}:`), " ");

  const link = el("a", "card-credit-link");
  link.href = card.hero.filePage;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = card.hero.credit.en === "" ? "" : bi(card.hero.credit);
  link.setAttribute(
    "aria-label",
    `${bi(card.hero.credit)} — ${bi(CREDIT_LINK_LABEL)}`,
  );
  p.append(link);

  if (card.hero.licenceUrl) {
    p.append(" ");
    const lic = el("a", "card-licence-link", bi(LICENCE_LABEL));
    lic.href = card.hero.licenceUrl;
    lic.target = "_blank";
    lic.rel = "noopener noreferrer";
    p.append(lic);
  }
  p.append(" · ", el("span", "card-licence", bi(card.hero.licence)));
  return p;
}

export function card(spec: CardSpec, fromPath: string): HTMLElement {
  const article = el("article", "group-card");

  const main = el("a", "card-main");
  main.href = pageHref(fromPath, spec.href);
  main.setAttribute("aria-describedby", creditId(spec));

  const body = el("div", "card-body");
  body.append(
    el("h3", "card-title", bi(spec.title)),
    el("p", "card-blurb", bi(spec.blurb)),
  );
  body.append(el("p", "card-more", `${bi(MORE_LABEL)} →`));
  body.lastElementChild?.setAttribute("aria-hidden", "true");

  main.append(hero(spec, fromPath), body);
  article.append(main, credit(spec));
  return article;
}

/** Idempotent: replaces the grid's children on every locale change. */
export function mountCards(
  fromPath: string,
  cards: readonly CardSpec[],
  host: HTMLElement | null = byId("card-grid"),
): void {
  if (!host) return;
  const grid = el("div", "card-grid");
  for (const c of cards) grid.append(card(c, fromPath));
  host.replaceChildren(grid);
}

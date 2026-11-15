import { getLocale, HELI_COPY_EN, HELI_COPY_FR, type Lang } from "../../copy";
import { HELI_TOTALS } from "../../data/helicopters.ts";

const eur = (millions: number): string =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(millions * 1e6);

/** Text nodes only — a copy change can never inject markup. */
export function insertCostMethodology(
  anchor: HTMLElement,
  canvas: HTMLCanvasElement,
): HTMLElement {
  const lang: Lang = getLocale();
  const c = lang === "fr" ? HELI_COPY_FR : HELI_COPY_EN;

  const section = document.createElement("section");
  section.className = "cost-method";
  section.dataset.role = "cost-method";

  const h = document.createElement("h3");
  h.textContent = c.heading;

  const intro = document.createElement("p");
  intro.className = "cost-method__intro";
  intro.textContent = c.intro;

  const ol = document.createElement("ol");
  ol.className = "cost-method__steps";
  for (const step of c.steps) {
    const li = document.createElement("li");
    const title = document.createElement("strong");
    title.textContent = step.title;
    const body = document.createElement("p");
    body.textContent = step.body;
    li.append(title, body);
    ol.append(li);
  }

  const [hLo, hHi] = HELI_TOTALS.hours;
  const [cLo, cHi] = HELI_TOTALS.inService;
  const [aLo, aHi] = HELI_TOTALS.allIn;

  const summary = document.createElement("p");
  summary.className = "cost-method__summary";
  summary.textContent = c.summary({
    days: HELI_TOTALS.days,
    hLo,
    hHi,
    cLo: eur(cLo),
    cHi: eur(cHi),
    aLo: eur(aLo),
    aHi: eur(aHi),
  });

  const caveat = document.createElement("p");
  caveat.className = "cost-method__caveat";
  caveat.textContent = c.caveat;

  section.append(h, intro, ol, summary, caveat);

  /* Anchor on the figure, before the wrapper ensureChartBox() may have
     created. Inserting inside that wrapper would fight its fixed height. */
  const wrap = canvas.parentElement;
  const ref = wrap && wrap !== anchor && anchor.contains(wrap) ? wrap : canvas;

  if (anchor.contains(ref)) anchor.insertBefore(section, ref);
  else anchor.before(section);

  return section;
}

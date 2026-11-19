import { HELI_TOTALS } from "@manifestigations/dataset";
import { getLocale, HELI_COPY_EN, HELI_COPY_FR, type Lang } from "../../copy";
import { html } from "../../core/html";

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

  const [hLo, hHi] = HELI_TOTALS.hours;
  const [cLo, cHi] = HELI_TOTALS.inService;
  const [aLo, aHi] = HELI_TOTALS.allIn;

  const section = html`<section class="cost-method" data-role="cost-method">
    <h3>${c.heading}</h3>
    <p class="cost-method__intro">${c.intro}</p>
    <ol class="cost-method__steps">
      ${c.steps.map(
        (step) =>
          html`<li>
            <strong>${step.title}</strong>
            <p>${step.body}</p>
          </li>`,
      )}
    </ol>
    <p class="cost-method__summary">
      ${c.summary({
        days: HELI_TOTALS.days,
        hLo,
        hHi,
        cLo: eur(cLo),
        cHi: eur(cHi),
        aLo: eur(aLo),
        aHi: eur(aHi),
      })}
    </p>
    <p class="cost-method__caveat">${c.caveat}</p>
  </section>` as HTMLElement;

  /* Anchor on the figure, before the wrapper ensureChartBox() may have
     created. Inserting inside that wrapper would fight its fixed height. */
  const wrap = canvas.parentElement;
  const ref = wrap && wrap !== anchor && anchor.contains(wrap) ? wrap : canvas;

  if (anchor.contains(ref)) anchor.insertBefore(section, ref);
  else anchor.before(section);

  return section;
}

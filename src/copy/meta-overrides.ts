/**  
  Section copy that holds on one page only. Deliberately NOT part of
   `sections` (which is Record<SectionId, SectionCopy> and would reject these keys). */
import type { SectionCopy } from "./types";

type Lang = "en" | "fr";

/** Key = `${PageId}:${"a"|"b"|"c"|"d"|"e"}`. */
export const PAGE_SECTIONS: Record<
  Lang,
  Partial<Record<string, SectionCopy>>
> = {
  en: {
    "2026/violence:a": {
      title: "A · Daily counts, 15 September – 11 November 2026",
      blurb:
        "One marker per day on which an arrest, an injury or a deployment figure was published. Days with no figure stay empty rather than interpolated; gaps in a line are dashed. These are situation reports, not a series: where a figure is a floor or a running total, the tooltip says so.",
    },
    "2026/violence:b": {
      title: "B · Weekly aggregates",
      blurb:
        "Weeks run Monday to Sunday. Arrests are summed across the week; injuries are the highest published level of the week, never a sum, and the officer-injury running total is a stock carried forward, not a weekly toll. The tooltip says which is which.",
    },
    /* add "2026/costs:a" / "2026/costs:b" here if that page needs its own wording */
  },
  fr: {
    "2026/violence:a": {
      title: "A · Décomptes quotidiens, 15 septembre – 11 novembre 2026",
      blurb:
        "Un marqueur par jour où un chiffre d’interpellation, de blessure ou de déploiement a été publié. Les jours sans chiffre restent vides plutôt qu’interpolés ; les lacunes d’une courbe sont en pointillés. Ce sont des points de situation, non une série : lorsqu’un chiffre est un plancher ou un cumul, l’infobulle le précise.",
    },
    "2026/violence:b": {
      title: "B · Agrégats hebdomadaires",
      blurb:
        "Les semaines vont du lundi au dimanche. Les interpellations sont sommées sur la semaine ; les blessures retiennent le niveau publié le plus haut de la semaine, jamais une somme, et le cumul des blessés parmi les forces est un stock reporté, non un bilan hebdomadaire. L’infobulle précise lequel est lequel.",
    },
  },
};

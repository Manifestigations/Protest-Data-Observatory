/* The whole site's page table: one entry per HTML file in docs/.
   Paths are docs-relative; relHref() turns them into page-relative links. */

import type { Bi } from "../copy/index.ts";
import {
  HERO_2026,
  HERO_COSTS,
  HERO_HISTORIC,
  HERO_MOVEMENTS,
  HERO_SERIES,
  HERO_TURNOUT,
  HERO_VIOLENCE,
  type Hero,
} from "./media.ts";

export const SITE_NAME: Bi = {
  en: "Protest activity in France",
  fr: "Activité contestataire en France",
};

export const CRUMB_LABEL: Bi = { en: "Breadcrumb", fr: "Fil d’Ariane" };
export const HOME_LABEL: Bi = { en: "Home", fr: "Accueil" };
export const MORE_LABEL: Bi = { en: "Open", fr: "Ouvrir" };
export const CREDIT_LABEL: Bi = { en: "Image", fr: "Image" };
export const CREDIT_LINK_LABEL: Bi = {
  en: "Image source and licensing (opens in a new tab)",
  fr: "Source et licence de l’image (nouvel onglet)",
};
export const LICENCE_LABEL: Bi = { en: "Licence", fr: "Licence" };

export type PageId =
  | "home" | "2026" | "historic" | "contribute"
  | "2026/turnout" | "2026/violence" | "2026/costs"
  | "historic/movements" | "historic/series";

export interface CardSpec {
  readonly href: PageId;
  readonly title: Bi;
  readonly blurb: Bi;
  readonly hero: Hero;
}

export interface PageSpec {
  readonly path: string;
  readonly kind: "landing" | "group" | "section" | "page";
  readonly title: Bi;
  readonly blurb: Bi;
  readonly parent: PageId | null;
  readonly cards: readonly CardSpec[];
}

const dirOf = (p: string): string =>
  p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";

/** "2026/turnout.html" from "index.html" → "2026/turnout.html"; from "2026.html" → "2026/turnout.html". */
export function relHref(fromPath: string, toPath: string): string {
  const from = dirOf(fromPath).split("/").filter(Boolean);
  const to = toPath.split("/");
  const file = to.pop() as string;
  let i = 0;
  while (i < from.length && i < to.length && from[i] === to[i]) i++;
  const parts = [
    ...Array<string>(from.length - i).fill(".."),
    ...to.slice(i),
    file,
  ];
  return parts.join("/") || file;
}

export const PAGES: Readonly<Record<PageId, PageSpec>> = {
  home: {
    path: "index.html",
    kind: "landing",
    title: {
      en: "Protest activity in France",
      fr: "Activité contestataire en France",
    },
    blurb: {
      en: "Two groups of charts. The first follows the autumn 2026 movement day by day; the second sets the same measures against six earlier French movements.",
      fr: "Deux ensembles de graphiques. Le premier suit le mouvement de l’automne 2026 jour après jour ; le second confronte les mêmes mesures à six mouvements français antérieurs.",
    },
    parent: null,
    cards: [
      {
        href: "2026",
        title: {
          en: "The Ongoing Revolt · 2026",
          fr: "La révolte en cours · 2026",
        },
        blurb: {
          en: "Turnout, arrests, injuries on both sides, school blockades, damage and the cost of policing, from 15 September to 11 November 2026 — plotted daily and aggregated by week.",
          fr: "Foule, interpellations, blessés des deux côtés, blocages de lycées, dommages et coût du maintien de l’ordre, du 15 septembre au 11 novembre 2026 — au jour le jour et agrégés par semaine.",
        },
        hero: HERO_2026,
      },
      {
        href: "historic",
        title: { en: "Historical Comparisons", fr: "Comparaisons historiques" },
        blurb: {
          en: "May 68, CPE 2006, the Gilets jaunes, June 2023, the pensions movement, Bloquons tout 2025: one panel per movement, then one panel per series.",
          fr: "Mai 68, le CPE 2006, les Gilets jaunes, juin 2023, les retraites, Bloquons tout 2025 : un panneau par mouvement, puis un panneau par série.",
        },
        hero: HERO_HISTORIC,
      },
    ],
  },

  "2026": {
    path: "2026.html",
    kind: "group",
    title: { en: "The Ongoing Revolt", fr: "La révolte en cours" },
    blurb: {
      en: "The autumn 2026 movement. Three sections: how many people were in the street, what the policing cost them and the state, and what it cost in euros.",
      fr: "Le mouvement de l’automne 2026. Trois sections : combien de personnes dans la rue, ce que le maintien de l’ordre a coûté aux personnes et à l’État, et ce qu’il a coûté en euros.",
    },
    parent: "home",
    cards: [
      {
        href: "2026/turnout",
        title: { en: "Turnout", fr: "Participation" },
        blurb: {
          en: "Turnout as a share of the population, plus protesters, people on strike and blocked schools — daily and as weekly peaks.",
          fr: "La participation rapportée à la population, ainsi que manifestants, grévistes et lycées bloqués — au jour le jour et en pics hebdomadaires.",
        },
        hero: HERO_TURNOUT,
      },
      {
        href: "2026/violence",
        title: { en: "Violence", fr: "Violences" },
        blurb: {
          en: "Arrests and injuries, daily; enforcement, weekly totals. How the injuries divide: light against serious, and who inflicted what.",
          fr: "Interpellations et blessés au jour le jour ; le maintien de l’ordre en totaux hebdomadaires. La répartition des blessures : légères contre graves, et qui a infligé quoi.",
        },
        hero: HERO_VIOLENCE,
      },
      {
        href: "2026/costs",
        title: { en: "Costs", fr: "Coûts" },
        blurb: {
          en: "Material damage against the daily cost of policing, and where the two cross.",
          fr: "Les dommages matériels face au coût quotidien du maintien de l’ordre, et le point où les deux se croisent.",
        },
        hero: HERO_COSTS,
      },
    ],
  },

  historic: {
    path: "historic.html",
    kind: "group",
    title: { en: "Historical Comparisons", fr: "Comparaisons historiques" },
    blurb: {
      en: "The same measures across six earlier French movements. The data is thinner the further back you go; each page says where.",
      fr: "Les mêmes mesures sur six mouvements français antérieurs. Les données se raréfient à mesure qu’on remonte ; chaque page le signale.",
    },
    parent: "home",
    cards: [
      {
        href: "historic/movements",
        title: { en: "One Panel Per Movement", fr: "Un panneau par mouvement" },
        blurb: {
          en: "Section C: each movement keeps its own time span on a shared logarithmic axis, so shapes are comparable and durations are not.",
          fr: "Section C : chaque mouvement garde sa propre durée sur un axe logarithmique commun : les formes se comparent, les durées non.",
        },
        hero: HERO_MOVEMENTS,
      },
      {
        href: "historic/series",
        title: { en: "One Panel Per Series", fr: "Un panneau par série" },
        blurb: {
          en: "Section D: the movements overlaid on elapsed weeks, so one measure can be read from 1968 to 2026. Section E closes with median and peak.",
          fr: "Section D : les mouvements superposés en semaines écoulées, pour lire une mesure de 1968 à 2026. La section E conclut sur médiane et pic.",
        },
        hero: HERO_SERIES,
      },
    ],
  },

  "2026/turnout": {
    path: "2026/turnout.html",
    kind: "section",
    title: { en: "Turnout", fr: "Participation" },
    blurb: {
      en: "Nine days in the window carry a published crowd; the rest are left empty rather than interpolated. The blockade line is a separate statistic, dotted across the Toussaint holiday because no lycée was in session.",
      fr: "Neuf journées de la fenêtre portent une foule publiée ; les autres restent vides plutôt qu’interpolées. La courbe des blocages est une statistique à part, en pointillés pendant la Toussaint car aucun lycée n’était en cours.",
    },
    parent: "2026",
    cards: [],
  },

  "2026/violence": {
    path: "2026/violence.html",
    kind: "section",
    title: { en: "Violence", fr: "Violences" },
    blurb: {
      en: "The state publishes arrests and officer injuries as situation reports, not as a series; protester injuries have no official total at all. No figure here is a primary measurement made for this site.",
      fr: "L’État publie interpellations et blessés parmi les forces en points de situation, non en série ; les blessés parmi les manifestants n’ont aucun total officiel. Aucun chiffre ici n’est une mesure primaire réalisée pour ce site.",
    },
    parent: "2026",
    cards: [],
  },

  "2026/costs": {
    path: "2026/costs.html",
    kind: "section",
    title: { en: "Costs", fr: "Coûts" },
    blurb: {
      en: "Neither damage nor policing cost exists as a daily series: these are one-off assessments, which is why most cells are empty rather than estimated. Insurers’ 30-day claim window had not closed when they were published.",
      fr: "Ni les dommages ni le coût du maintien de l’ordre n’existent en série quotidienne : ce sont des bilans ponctuels, d’où des cellules vides plutôt qu’estimées. Le délai de 30 jours des assureurs n’était pas écoulé lors de leur publication.",
    },
    parent: "2026",
    cards: [],
  },

  "historic/movements": {
    path: "historic/movements.html",
    kind: "section",
    title: { en: "One Panel Per Movement", fr: "Un panneau par mouvement" },
    blurb: {
      en: "Each panel keeps its own time span on a shared logarithmic axis. Hollow markers are regional, Paris-only, modelled or stock figures; dashed connectors span a week with nothing published.",
      fr: "Chaque panneau garde sa propre durée sur un axe logarithmique commun. Les marqueurs creux sont régionaux, strictement parisiens, modélisés ou de stock ; les connecteurs en pointillés couvrent une semaine sans publication.",
    },
    parent: "historic",
    cards: [],
  },

  "historic/series": {
    path: "historic/series.html",
    kind: "section",
    title: { en: "One Panel Per Series", fr: "Un panneau par série" },
    blurb: {
      en: "The same data with movements overlaid on elapsed weeks, capped at the last week with enforcement figures. Section E then reduces each measure to a median, a peak and a range.",
      fr: "Les mêmes données, mouvements superposés en semaines écoulées, jusqu’à la dernière semaine disposant de chiffres répressifs. La section E réduit ensuite chaque mesure à une médiane, un pic et une étendue.",
    },
    parent: "historic",
    cards: [],
  },

  contribute: {
    path: "contribute.html",
    kind: "page",
    title: { en: "Help improve this tool", fr: "Aidez à améliorer cet outil" },
    blurb: {
      en: "Three ways to make this observatory better: send a data point or a correction, send code, or hand the charts to someone arguing with a rumour. None of them requires being a programmer.",
      fr: "Trois façons d’améliorer cet observatoire : envoyer un chiffre ou une correction, envoyer du code, ou transmettre les graphiques à quelqu’un qui débat avec une rumeur. Aucune n’exige d’être programmeur.",
    },
    parent: "home",
    cards: [],
  },
};

export function pageById(id: string): PageSpec | null {
  return (PAGES as Record<string, PageSpec>)[id] ?? null;
}

export function pageHref(fromPath: string, to: PageId): string {
  return relHref(fromPath, PAGES[to].path);
}

/* and, replacing the inline lookup inside crumbs(): */
export function pageKey(page: PageSpec): PageId {
  return (
    (Object.keys(PAGES) as PageId[]).find((k) => PAGES[k] === page) ?? "home"
  );
}

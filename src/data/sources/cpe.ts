import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 7 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const CPE_SOURCES: readonly Source[] = [
  /* ------------------------------------------------------------------- CPE */
  src(
    "wiki-cpe",
    "cpe",
    "Contrat première embauche",
    "https://fr.wikipedia.org/wiki/Contrat_premi%C3%A8re_embauche",
    both(
      "the CPE turnout series (7 Feb, 7 Mar, 18 Mar, 23 Mar, 28 Mar, 4 Apr) and the Paris-only enforcement counts of 16–18 Mar.",
      "la série de foules du CPE (7 févr., 7 mars, 18 mars, 23 mars, 28 mars, 4 avr.) et les décomptes répressifs strictement parisiens des 16–18 mars.",
    ),
    "2026-08-23",
  ),

  src(
    "nouvelobs-cpe-chrono",
    "cpe",
    "Le Nouvel Obs — « Crise du CPE : chronologie »",
    "https://www.nouvelobs.com/societe/social/20060326.OBS1858/crise-du-cpe-chronologie.html",
    both(
      "the full chronology, including the 10 Apr withdrawal that ends the series.",
      "la chronologie complète, dont le retrait du 10 avr. qui clôt la série.",
    ),
    "2006-03-26",
  ),

  src(
    "nouvelobs-cpe-mars",
    "cpe",
    "Le Nouvel Obs — « CPE : les événements du 16 au 18 mars »",
    "https://www.nouvelobs.com/societe/social/20060321.OBS1191/cpe-les-evenements-du-16-au-18-mars.html",
    both(
      "the three peak days described day-of, used to date the enforcement counts.",
      "les trois journées de pointe racontées au jour le jour, servant à dater les décomptes répressifs.",
    ),
    "2006-03-21",
  ),

  src(
    "lemonde-16mars-2006",
    "cpe",
    "Le Monde — « Des centaines de milliers de jeunes ont défilé » (16 mars 2006)",
    "https://www.lemonde.fr/international/article/2006/03/16/des-centaines-de-milliers-de-jeunes-ont-defile_751311_3210.html",
    both(
      "the 16 Mar turnout, the first day of the peak.",
      "la foule du 16 mars, première journée du pic.",
    ),
    "2006-03-16",
  ),

  src(
    "lemonde-17mars-2006",
    "cpe",
    "Le Monde — « Des lycéens en nombre dans les défilés anti-CPE » (17 mars 2006)",
    "https://www.lemonde.fr/la-crise-au-proche-orient/article/2006/03/17/des-lyceens-en-nombre-dans-les-defiles-anti-cpe_751768_734511.html",
    both(
      "17 Mar, the day the lycéens rather than the students carry the movement.",
      "le 17 mars, jour où les lycéens plutôt que les étudiants portent le mouvement.",
    ),
    "2006-03-17",
  ),

  src(
    "lemonde-18mars-2006",
    "cpe",
    "Le Monde — « Des défilés dans toutes les villes » (18 mars 2006)",
    "https://www.lemonde.fr/international/article/2006/03/18/des-defiles-dans-toutes-les-villes_752040_3210.html",
    both(
      "18 Mar and the nationwide spread, which is why the CPE week is not Paris-weighted.",
      "le 18 mars et la diffusion nationale, d’où une semaine CPE non pondérée par Paris.",
    ),
    "2006-03-18",
  ),

  src(
    "aljazeera-19mars-2006",
    "cpe",
    "Al Jazeera — « French protesters issue job ultimatum » (19 March 2006)",
    "https://www.aljazeera.com/news/2006/3/19/french-protesters-issue-job-ultimatum",
    both(
      "the English-language account of the 18–19 Mar ultimatum, used to confirm the sequencing.",
      "le récit anglophone de l’ultimatum des 18–19 mars, servant à confirmer l’enchaînement.",
    ),
    "2006-03-19",
  ),
];

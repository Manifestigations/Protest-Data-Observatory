import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 3 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const RETRAITES_SOURCES: readonly Source[] = [
  /* --------------------------------------------------------- Pensions, 2023 */
  src(
    "wiki-retraites",
    "retraites",
    "Mouvement social contre la réforme des retraites de 2023",
    "https://fr.wikipedia.org/wiki/Mouvement_social_contre_la_r%C3%A9forme_des_retraites_en_France_de_2023",
    both(
      "the ministry and union turnout pairs for each national action day, 19 Jan – 6 Jun 2023.",
      "les couples ministère / syndicats de chaque journée nationale d’action, du 19 janv. au 6 juin 2023.",
    ),
    "2026-11-09",
  ),

  src(
    "lemonde-en-7mars-2023",
    "retraites",
    "Le Monde (English) — « March 7 protests among largest since 1995 »",
    "https://www.lemonde.fr/en/les-decodeurs/article/2023/03/09/french-pension-reform-march-7-protests-among-largest-since-1995_6018714_8.html",
    both(
      "the 7 Mar peak placed against 1995 — the comparison the chart’s annotation relies on.",
      "le pic du 7 mars situé face à 1995 — comparaison sur laquelle repose l’annotation du graphique.",
    ),
    "2023-03-09",
  ),

  src(
    "of-6juin-2023",
    "retraites",
    "Ouest-France — direct du 6 juin 2023 : les manifestations contre la réforme des retraites",
    "https://www.ouest-france.fr/economie/retraites/direct-greve-du-6-juin-suivez-les-manifestations-contre-la-reforme-des-retraites-en-france-e282f866-0393-11ee-bfa0-5e45e3198685",
    both(
      "the last national day, 6 Jun, which closes the series.",
      "la dernière journée nationale, le 6 juin, qui clôt la série.",
    ),
    "2023-06-06",
  ),
];

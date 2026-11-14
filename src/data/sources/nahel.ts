import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 7 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const NAHEL_SOURCES: readonly Source[] = [
  /* -------------------------------------------------- Nahel Merzouk, 2023 */
  src(
    "wiki-nahel",
    "nahel",
    "Mort de Nahel Merzouk",
    "https://fr.wikipedia.org/wiki/Mort_de_Nahel_Merzouk",
    both(
      "the 3,354 arrests and 722 officers injured of 27 Jun – 2 Jul 2023, and the 108 of the following week.",
      "les 3 354 interpellations et 722 policiers blessés du 27 juin au 2 juill. 2023, et les 108 de la semaine suivante.",
    ),
    "2026-11-13",
  ),

  src(
    "wiki-nahel-en",
    "nahel",
    "Nahel Merzouk riots (English Wikipedia)",
    "https://en.wikipedia.org/wiki/Nahel_Merzouk_riots",
    both(
      "the English summary and its damage estimate, used only as a cross-check.",
      "la synthèse anglophone et son estimation de dommages, utilisées seulement en recoupement.",
    ),
    "2026-10-18",
  ),

  src(
    "mediapart-marche-blanche",
    "nahel",
    "Mediapart — « La marche blanche pour Nahel, un cri de révolte plutôt qu’une minute de silence »",
    "https://www.mediapart.fr/journal/france/290623/la-marche-blanche-pour-nahel-un-cri-de-revolte-plutot-qu-une-minute-de-silence",
    both(
      "the 29 Jun 2023 silent march, the only 2023 day with a participant count from a non-police source.",
      "la marche blanche du 29 juin 2023, seule journée de 2023 dotée d’un décompte non policier.",
    ),
    "2023-06-29",
  ),

  src(
    "rfi-29juin-2023",
    "nahel",
    "RFI — le point sur la mort de Nahel (29 juin 2023)",
    "https://www.rfi.fr/fr/france/20230629-le-point-sur-la-mort-de-nahel-le-procureur-requiert-le-placement-en-d%C3%A9tention-provisoire-du-policier",
    both(
      "the legal chronology of 29 Jun, used to date the start of the riot series.",
      "la chronologie judiciaire du 29 juin, servant à dater le début de la série d’émeutes.",
    ),
    "2023-06-29",
  ),

  src(
    "of-4e-nuit",
    "nahel",
    "Ouest-France — mort de Nahel : une quatrième nuit d’émeutes, d’une intensité moindre",
    "https://www.ouest-france.fr/faits-divers/emeutes-urbaines/mort-de-nahel-une-quatrieme-nuit-demeutes-mais-des-violences-dune-intensite-moindre-5f28377d-edb2-4189-b320-5fa379186858",
    both(
      "the tapering after the third night, which is why the 2023 curve is drawn as an abrupt decay.",
      "la décrue après la troisième nuit, d’où une courbe 2023 tracée en chute brutale.",
    ),
    "2023-06-30",
  ),

  src(
    "franceinfo-1an-marche",
    "nahel",
    "franceinfo — un an après, une marche silencieuse réunit plusieurs centaines de personnes",
    "https://www.franceinfo.fr/faits-divers/adolescent-tue-par-un-policier-a-nanterre/mort-de-nahel-a-nanterre-un-an-apres-une-marche-silencieuse-reunit-plusieurs-centaines-de-personnes_6633804.html",
    both(
      "the 29 Jun 2024 anniversary march, the 2024 point in the series.",
      "la marche anniversaire du 29 juin 2024, point 2024 de la série.",
    ),
    "2024-06-29",
  ),

  src(
    "leparisien-marche-2024",
    "nahel",
    "Le Parisien — plusieurs centaines de personnes au départ de la marche silencieuse pour Nahel",
    "https://www.leparisien.fr/hauts-de-seine-92/nanterre-plusieurs-centaines-de-personnes-au-depart-de-la-marche-silencieuse-pour-nahel-29-06-2024-237YPUQKQZFQLHGTSHBOCKWVW4.php",
    both(
      "second count for the 2024 march, confirming it is an order of magnitude below 2023.",
      "second décompte de la marche 2024, confirmant un ordre de grandeur inférieur à 2023.",
    ),
    "2024-06-29",
  ),
];

import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 2 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const RN2024_SOURCES: readonly Source[] = [
  /* --------------------------------------------------- Anti-RN, June 2024 */
  src(
    "lemonde-en-16juin-2024",
    "rn2024",
    "Le Monde (English) — French protesters turn out in droves against far right",
    "https://www.lemonde.fr/en/politics/article/2024/06/16/french-protesters-turn-out-in-droves-against-far-right-caught-between-despair-and-the-will-to-fight_6674931_5.html",
    both(
      "the 15–16 Jun 2024 marches against the Rassemblement national.",
      "les marches des 15–16 juin 2024 contre le Rassemblement national.",
    ),
    "2024-06-16",
  ),

  src(
    "leparisien-15juin-2024",
    "rn2024",
    "Le Parisien — plus de 600 000 manifestants selon la CGT, 250 000 d’après la police",
    "https://www.leparisien.fr/elections/legislatives/manifestations-anti-rn-plus-de-600-000-manifestants-selon-la-cgt-250-000-dapres-la-police-15-06-2024-4TWAL2AAQFG2DGMZ5AYYFJNQ3I.php",
    both(
      "the widest police/union gap in the entire comparison — a factor of 2.4, which is why the band is drawn explicitly.",
      "l’écart police / syndicats le plus large de toute la comparaison — un facteur 2,4, d’où la fourchette explicite.",
    ),
    "2024-06-15",
  ),
];

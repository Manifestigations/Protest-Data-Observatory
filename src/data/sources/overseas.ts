import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 6 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const OVERSEAS_SOURCES: readonly Source[] = [
  /* ------------------------------------------------------- 2026 — overseas */
  src(
    "la1ere-lyceens",
    "overseas",
    "Outre-mer La 1ère — ce que l’on sait du mouvement des lycéens, de la Réunion à la Guyane",
    "https://la1ere.franceinfo.fr/ce-que-l-on-sait-du-mouvement-des-lyceens-de-la-reunion-a-la-guyane-en-passant-par-la-guyane-mayotte-et-la-martinique-1744191.html",
    both(
      "the geography of the lycéen movement across Réunion, Guyane, Mayotte and Martinique — the overseas half of the protest count.",
      "la géographie du mouvement Renda et en Guyane, à Mayotte et en Martinique — la moitié ultramarine du décompte.",
    ),
    "2026-10-02",
  ),

  src(
    "la1ere-territoires",
    "overseas",
    "Outre-mer La 1ère — la Guadeloupe, la Martinique et la Réunion, territoires les plus mobilisés depuis début octobre",
    "https://la1ere.franceinfo.fr/colere-dans-les-lycees-et-contre-la-vie-chere-la-guadeloupe-la-martinique-et-la-reunion-les-territoires-les-plus-mobilises-dans-les-outre-mer-depuis-debut-octobre-1751730.html",
    both(
      "which three territories carry almost all overseas activity, and the ranking used in the split.",
      "les trois territoires qui portent presque toute l’activité ultramarine, et le classement retenu pour la ventilation.",
    ),
    "2026-10-26",
  ),

  src(
    "la1ere-gign",
    "overseas",
    "Outre-mer La 1ère — intervention du GIGN, manifestations et premières condamnations : le climat social reste tendu",
    "https://la1ere.franceinfo.fr/intervention-du-gign-manifestations-et-premieres-condamnations-outre-mer-le-climat-social-reste-tendu-1750008.html",
    both(
      "the enforcement side overseas, which the ministry bilan never covers.",
      "le volet répressif ultramarin, que le bilan ministériel ne couvre jamais.",
    ),
    "2026-10-20",
  ),

  src(
    "la1ere-martinique-hot",
    "overseas",
    "Outre-mer La 1ère — Martinique et Caraïbe : les sujets chauds",
    "https://la1ere.franceinfo.fr/martinique/hot-topics-from-martinique-and-the-caribbean-1742126.html",
    both(
      "the Martinique strand, where the cost-of-living movement overlaps a pre-existing mobilisation.",
      "le volet martiniquais, où le mouvement contre la vie chère recouvre une mobilisation antérieure.",
    ),
    "2026-09-26",
  ),

  src(
    "la1ere-reunion-saintpierre",
    "overseas",
    "Outre-mer La 1ère — une centaine de manifestants à Saint-Pierre et un barrage filtrant dans le nord",
    "https://la1ere.franceinfo.fr/reunion/mobilisation-sociale-une-centaine-de-manifestants-a-saint-pierre-et-un-barrage-filtrant-dans-le-nord-on-fait-le-point-1753413.html",
    both(
      "a Réunion day detail: ~100 at Saint-Pierre plus a filtering roadblock — regional-only, never extrapolated.",
      "un détail journalier réunionnais : ~100 à Saint-Pierre et un barrage filtrant — régional seulement, jamais extrapolé.",
    ),
    "2026-10-31",
  ),

  src(
    "la1ere-archives-03nov",
    "overseas",
    "Outre-mer La 1ère — archives du 3 novembre 2026",
    "https://la1ere.franceinfo.fr/archives/2026/03-novembre-2026/",
    both(
      "the day-archive route used where no standalone article existed (Guyane intersyndicale call).",
      "la voie des archives quotidiennes là où aucun article autonome n’existait (appel de l’intersyndicale guyanaise).",
    ),
    "2026-11-03",
  ),
];

import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 4 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const REF2026_SOURCES: readonly Source[] = [
  /* --------------------------------------------------- 2026 — reference */
  src(
    "wiki-automne-2026",
    "ref2026",
    "Wikipédia (français) — Mouvement social d’automne 2026 en France",
    "https://fr.wikipedia.org/wiki/Mouvement_social_d%27automne_2026_en_France",
    both(
      "the overall movement chronology and the list of national call days.",
      "la chronologie d’ensemble du mouvement et la liste des journées d’appel nationales.",
    ),
    "2026-11-11",
  ),

  src(
    "wiki-civil-unrest-en",
    "ref2026",
    "Wikipedia (English) — 2026 French civil unrest",
    "https://en.wikipedia.org/wiki/2026_French_civil_unrest",
    both(
      "the English-language summary, checked against the French pages for divergences in the injury counts.",
      "la synthèse anglophone, recoupée avec les pages françaises pour les écarts de blessés.",
    ),
    "2026-11-13",
  ),

  src(
    "mavigilance-manifestation",
    "ref2026",
    "Ma vigilance — manifestationائحة : rassemblements et cortèges",
    "https://mavigilance.fr/themes/manifestation",
    both(
      "protest-level aggregation by theme, used for the count of actions rather than of participants.",
      "agrégation par thème, utilisée pour le nombre d’actions plutôt que de participants.",
    ),
    "2026-11-13",
  ),

  src(
    "mavigilance-lyceens",
    "ref2026",
    "Ma vigilance — mouvement lycée : dates et appels",
    "https://mavigilance.fr/mouvements/lyceens",
    both(
      "the call calendar behind the « protest taking place » column on the school-movement days.",
      "le calendrier des appels derrière la colonne « manifestations » des journées_shader.",
    ),
    "2026-11-13",
  ),
];

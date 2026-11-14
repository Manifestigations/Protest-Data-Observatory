import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 6 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const MAI68_SOURCES: readonly Source[] = [
  /* -------------------------------------------------------------- May 1968 */
  src(
    "wiki-mai68-fr",
    "mai68",
    "Mai 68",
    "https://fr.wikipedia.org/wiki/Mai_68",
    both(
      "1 May (25,000 prefecture / 100,000 CGT) and 13 May (230,000 prefecture / 171,000 ORTF / 1,000,000 unions) turnouts; the 469 arrests of 10–11 May and the 1,000+ of 25 May.",
      "les foules du 1er mai (25 000 préfecture / 100 000 CGT) et du 13 mai (230 000 préfecture / 171 000 ORTF / 1 000 000 syndicats) ; les 469 interpellations des 10–11 mai et les 1 000 et plus du 25 mai.",
    ),
    "2026-10-31",
  ),

  src(
    "wiki-mai68-en",
    "mai68",
    "May 68 (English Wikipedia)",
    "https://en.wikipedia.org/wiki/May_68",
    both(
      "the 887 injured figure, which appears only in this article’s infobox and is flagged accordingly — no French count was published.",
      "le chiffre de 887 blessés, présent uniquement dans l’infobox de cet article et signalé comme tel — aucun décompte français n’a été publié.",
    ),
    "2026-11-07",
  ),

  src(
    "nouvelobs-1mai-68",
    "mai68",
    "Le Nouvel Obs (Le Quotidien de 1968) — « Cent mille personnes de République à Bastille »",
    "https://www.nouvelobs.com/societe/le-quotidien-de-1968/20080424.OBS1184/cent-mille-personnes-de-republique-a-bastille.html",
    both(
      "the 1 May 1968 cortège described day-of, the origin of the 100,000 union figure.",
      "le cortège du 1er mai 1968 raconté le jour même, origine du chiffre syndical de 100 000.",
    ),
    "2008-04-24",
  ),

  src(
    "publicsenat-1mai",
    "mai68",
    "Public Sénat — « Des 1er mai souvent très politiques »",
    "https://www.publicsenat.fr/actualites/politique/des-1er-mai-souvent-tres-politiques-59701",
    both(
      "context for reading 1 May turnouts across episodes, including the 1968 and 2023 comparison.",
      "le contexte de lecture des foules du 1er mai entre épisodes, dont la comparaison 1968 / 2023.",
    ),
    "2017-05-01",
  ),

  src(
    "wiki-chrono-68",
    "mai68",
    "Wikipédia (français) — Chronologie des événements de mai-juin 1968",
    "https://fr.wikipedia.org/wiki/Chronologie_des_%C3%A9v%C3%A9nements_de_mai_-_juin_1968",
    both(
      "the day-by-day sequence that fixes which days enter the C′ weekly series.",
      "la séquence jour par jour qui détermine les journées retenues dans la série hebdomadaire de C′.",
    ),
    "2026-10-20",
  ),

  src(
    "wiki-rassemblements",
    "mai68",
    "Wikipédia (français) — Liste des rassemblements les plus importants en France",
    "https://fr.wikipedia.org/wiki/Liste_des_rassemblements_les_plus_importants_en_France",
    both(
      "the cross-episode leaderboard used to decide which movements belong in the comparison at all.",
      "le classement inter-épisodes servant à décider quels mouvements entrent dans la comparaison.",
    ),
    "2026-11-07",
  ),
];

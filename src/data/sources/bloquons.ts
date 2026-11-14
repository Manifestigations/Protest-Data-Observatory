import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 15 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const BLOQUONS_SOURCES: readonly Source[] = [
  /* -------------------------------------------------------- Bloquons tout */
  src(
    "france24-bloquons",
    "bloquons",
    "France 24 — direct du 10 septembre 2025",
    "https://www.france24.com/fr/france/20250910-en-direct-france-bloquons-tout-colere-sociale-emmanuel-macron",
    both(
      "197,000 participants, 596 rallies, 253 blockades, 540 arrests (211 in Paris) — the final ministry point of the evening, superseding the 175,000 of 17:45.",
      "197 000 participants, 596 rassemblements, 253 blocages, 540 interpellations (dont 211 à Paris) — le point ministériel final de la soirée, qui supplante les 175 000 de 17 h 45.",
    ),
    "2025-09-10",
  ),

  src(
    "bfmtv-bloquons",
    "bloquons",
    "BFMTV — direct du 10 septembre",
    "https://www.bfmtv.com/societe/manifestations/direct-10-septembre-blocages-transports-manifestations-suivez-le-mouvement-bloquons-tout-a-paris-lyon-marseille_LN-202509100070.html",
    both(
      "the intra-day revision of the count (175,000 → 197,000), which is why the chart shows a band rather than a point.",
      "la révision du décompte en cours de journée (175 000 → 197 000), d’où une fourchette plutôt qu’un point sur le graphique.",
    ),
    "2025-09-10",
  ),

  src(
    "franceinfo-bloquons-cgt",
    "bloquons",
    "franceinfo — près de 250 000 personnes mobilisées selon la CGT, 197 000 selon l’Intérieur",
    "https://www.franceinfo.fr/societe/bloquons-tout-mouvement-du-10-septembre/bloquons-tout-pres-de-250-000-personnes-mobilisees-dans-tout-le-pays-selon-la-cgt-175-000-selon-le-ministere-de-l-interieur_7484704.html",
    both(
      "the union side of the 10 Sep pair (~250,000), which completes the band.",
      "le côté syndical du couple du 10 sept. (~250 000), qui complète la fourchette.",
    ),
    "2025-09-10",
  ),

  src(
    "liberation-10sept",
    "bloquons",
    "Libération — direct du 10 septembre : la mobilisation « Bloquons tout »",
    "https://www.liberation.fr/societe/en-direct-bloquons-tout-suivez-la-mobilisation-ce-mercredi-10-septembre-au-lendemain-de-la-nomination-de-sebastien-lecornu-a-matignon-20250910_7UGUHFIOUNGDJP67XSMTH5FKVA/",
    both(
      "the 175,000 ministry figure as first published, before the evening revision.",
      "les 175 000 du ministère tels que publiés d’abord, avant la révision du soir.",
    ),
    "2025-09-10",
  ),

  src(
    "of-bloquons-infographies",
    "bloquons",
    "Ouest-France — « 200 000 participants à Bloquons tout : est-ce mieux que les autres mobilisations ? »",
    "https://www.ouest-france.fr/societe/manifestation/infographies-200-000-participants-a-bloquons-tout-est-ce-mieux-que-les-autres-mobilisations-0f322c98-8ef1-11f0-b582-5820cfc46140",
    both(
      "the 200,000 working figure and the pre-computed comparison with earlier movements, which the chart re-derives.",
      "le chiffre de travail de 200 000 et la comparaison déjà calculée avec les mouvements antérieurs, que le graphique recalcule.",
    ),
    "2025-09-11",
  ),

  src(
    "franceinfo-18sept-gav",
    "bloquons",
    "franceinfo — malgré 89 gardes à vue à Paris, Laurent Nuñez reconnaît que la journée s’est « plutôt bien passée »",
    "https://www.franceinfo.fr/economie/greve/greve/greve-du-18-septembre-malgre-89-gardes-a-vue-a-paris-laurent-nunez-reconnait-que-la-journee-s-est-plutot-bien-passee_7501129.html",
    both(
      "the 18 Sep arrests (103 in Paris, 89 custodies) — a markedly lower repressive profile than 2026.",
      "les interpellations du 18 sept. (103 à Paris, 89 gardes à vue) — profil répressif nettement plus bas qu’en 2026.",
    ),
    "2025-09-18",
  ),

  src(
    "franceinfo-18sept-direct",
    "bloquons",
    "franceinfo — direct du 18 septembre : jusqu’à 900 000 manifestants attendus",
    "https://www.franceinfo.fr/economie/greve/greve/direct-mobilisation-du-18-septembre-jusqu-a-900-000-manifestants-attendus-des-transports-perturbes-et-une-greve-qui-s-annonce-tres-suivie-dans-les-pharmacies-et-les-ecoles_7498174.html",
    both(
      "the pre-day expectation (900,000), kept to show how far the realised count fell short.",
      "l’attente d’avant-journée (900 000), conservée pour mesurer l’écart avec le décompte réalisé.",
    ),
    "2025-09-18",
  ),

  src(
    "franceinfo-18sept-comparaison",
    "bloquons",
    "franceinfo — la mobilisation du 18 septembre a-t-elle été plus ou moins forte que les précédents grands mouvements ?",
    "https://www.franceinfo.fr/economie/greve/greve/greve-du-18-septembre-la-mobilisation-a-t-elle-ete-plus-ou-moins-forte-que-lors-des-derniers-grands-mouvements-sociaux_7499668.html",
    both(
      "the explicit cross-movement comparison the C section reproduces.",
      "la comparaison inter-mouvements explicite que la section C reproduit.",
    ),
    "2025-09-18",
  ),

  src(
    "franceinfo-2oct",
    "bloquons",
    "franceinfo — environ 195 000 personnes ont manifesté selon l’Intérieur, près de 600 000 d’après la CGT",
    "https://www.franceinfo.fr/economie/greve/greve/greve-du-2-octobre-environ-195-000-personnes-ont-manifeste-en-france-selon-le-ministere-de-l-interieur-pres-de-600-000-d-apres-la-cgt_7528024.html",
    both(
      "the 2 Oct third wave: 195,000 ministry / ~600,000 CGT.",
      "la troisième vague du 2 oct. : 195 000 ministère / ~600 000 CGT.",
    ),
    "2025-10-02",
  ),

  src(
    "lefigaro-2oct",
    "bloquons",
    "Le Figaro — 100 000 participants attendus : « est-ce un chiffre assez bas comme le dit Bayrou ? »",
    "https://www.lefigaro.fr/social/mouvement-du-10-septembre-100-000-participants-attendus-est-ce-un-chiffre-assez-bas-comme-le-dit-bayrou-20250905",
    both(
      "the political framing of the turnout numbers, which is why both bounds are kept rather than averaged.",
      "la mise en politique des chiffres de foule, d’où la conservation des deux bornes plutôt qu’une moyenne.",
    ),
    "2025-09-05",
  ),

  src(
    "liberation-2oct",
    "bloquons",
    "Libération — direct du 2 octobre : journées d’actions et de grèves",
    "https://www.liberation.fr/economie/social/en-direct-mobilisation-du-2-octobre-suivez-la-journee-dactions-et-de-greves-de-ce-jeudi-20251002_GFUGFS2GS5GPHAU5TVAGAZMGBI/",
    both(
      "second source for the 2 Oct pair.",
      "seconde source pour le couple du 2 oct.",
    ),
    "2025-10-02",
  ),

  src(
    "of-bloquons-44a",
    "bloquons",
    "Ouest-France — « Bloquons tout » : une mobilisation en demi-teinte en Loire-Atlantique",
    "https://www.ouest-france.fr/societe/manifestation/bloquons-tout-une-mobilisation-en-demi-teinte-en-loire-atlantique-90dd52ae-c22c-11f0-a316-aa52a6afd2bb",
    both(
      "regional-only marker: the gap between the national headline and local reality.",
      "marqueur régional : l’écart entre le titre national et la réalité locale.",
    ),
    "2025-11-16",
  ),

  src(
    "of-bloquons-44b",
    "bloquons",
    "Ouest-France — une soixantaine de personnes manifestent à Nantes ce samedi",
    "https://www.ouest-france.fr/societe/manifestation/bloquons-tout-une-soixantaine-de-personnes-manifestent-a-nantes-ce-samedi-766d30c0-c226-11f0-8509-2c0807403e46",
    both(
      "~60 in Nantes on the Saturday — the smallest unit cited anywhere in the comparison.",
      "~60 à Nantes le samedi — la plus petite unité citée dans toute la comparaison.",
    ),
    "2025-11-15",
  ),

  src(
    "of-bloquons-44c",
    "bloquons",
    "Ouest-France (Manche) — le collectif « Indignons-nous » tente de faire perdurer le mouvement",
    "https://www.ouest-france.fr/societe/manifestation/dans-la-manche-le-collectif-indignons-nous-tente-de-faire-perdurer-le-mouvement-apres-le-10-septembre-3828460e-c20f-11f0-8509-2c0807403e46",
    both(
      "how a local collective tried to sustain the movement after 10 Sep — context for the 18 Sep and 2 Oct tail.",
      "comment un collectif local a tenté de prolonger le mouvement après le 10 sept. — contexte de la queue des 18 sept. et 2 oct.",
    ),
    "2025-11-15",
  ),

  src(
    "figaro-bloquons",
    "bloquons",
    "Le Figaro — direct « Bloquons tout » des 10 et 11 septembre",
    "https://www.lefigaro.fr/social/direct-bloquons-tout-10-septembre-mouvement-greves-manifestations-perturbations-transports-ecole-20250910",
    both(
      "the 18 Sep intersyndicale day and the 2 Oct third wave.",
      "la journée intersyndicale du 18 sept. et la troisième vague du 2 oct.",
    ),
    "2025-09-10",
    "2025-09-11",
  ),
];

import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 5 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const STRIKES_SOURCES: readonly Source[] = [
  /* ---------------------- 2026 — strikes */
  src(
    "liberation-29sept-strike",
    "strikes",
    "Libération — « Journée de mobilisation » (direct du 29 septembre 2026)",
    "https://www.liberation.fr/economie/social/en-direct-greve-du-29-septembre-suivez-la-mobilisation-dans-la-fonction-publique-ce-mardi-20260929_BFTDSESTTRBQHGN3EAA2SVR4MM/",
    both(
      "the government figure of about 10% of state civil servants on strike, the term behind the 29 September point.",
      "le chiffre gouvernemental d’environ 10 % d’agents de la fonction publique d’État en grève, à l’origine du point du 29 septembre.",
    ),
    "2026-09-29",
  ),

  src(
    "education-29sept-strike",
    "strikes",
    "Ministère de l’Éducation nationale — « Mouvement social du mardi 29 septembre 2026 »",
    "https://www.education.gouv.fr/mouvement-social-du-mardi-29-septembre-2026-506092",
    both(
      "11.47% of education staff (weighted; 12.74% second degree, 27.39% life-school staff, 13.71% of teachers) — the largest component of the strike total, not an addend.",
      "11,47 % des personnels de l’Éducation (moyenne pondérée ; 12,74 % second degré, 27,39 % vie scolaire, 13,71 % des enseignants) — la principale composante du total, non un supplément.",
    ),
    "2026-09-29",
  ),

  src(
    "bbc-5nov-strike",
    "strikes",
    "BBC News — « French protests see numbers surge as unions join strikes over high cost of living »",
    "https://www.bbc.com/news/articles/ckx2qzv835pgo",
    both(
      "5 November rates: 9.89% of civil servants, 4.6% of local-authority staff, 3.93% of hospital staff — and the ~2.5 million state civil service the percentage is taken on.",
      "taux du 5 novembre : 9,89 % des fonctionnaires, 4,6 % des agents territoriaux, 3,93 % des hospitaliers — et les ~2,5 millions d’agents de la fonction publique d’État servant de base au pourcentage.",
    ),
    "2026-11-05",
  ),

  src(
    "laclepublique-5nov-strike",
    "strikes",
    "La République — « Grève du 5 novembre : résultats, coût et bilan en France »",
    "https://laclepublique.fr/national/articles/2026/2026-11-05-bilan-mobilisation-sociale/",
    both(
      "the 11% end-of-day civil-service rate that closes the 5 November band, education's 12.77% excluding Toulouse, and the CGT's one-rail-worker-in-three claim (one sector, not plotted).",
      "les 11 % de fin de journée qui ferment la fourchette du 5 novembre, les 12,77 % de l’Éducation hors Toulouse, et la revendication CGT d’un cheminot sur trois (un seul secteur, non tracé).",
    ),
    "2026-11-05",
  ),

  src(
    "cgt-1-6m-strike",
    "strikes",
    "CGT — « Nous étions près d’1,6 million en grève et dans les manifestations »",
    "https://www.cgt.fr/comm-de-presse/nous-etions-pres-d16-million-en-greve-et-dans-les-manifestations-un-nouveau-cap-franchi-pour-gagner",
    both(
      "the combined claim. Deliberately not plotted: it covers strikers and marchers in one number, and the same 1.6 million is already the turnout ceiling for that day.",
      "la revendication combinée. Volontairement non tracée : elle couvre grévistes et manifestants en un seul chiffre, et le même 1,6 million borne déjà la foule de ce jour.",
    ),
    "2026-11-05",
  ),
];

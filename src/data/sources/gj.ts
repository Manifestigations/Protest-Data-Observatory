import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 5 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const GJ_SOURCES: readonly Source[] = [
  /* --------------------------------------------------------- Gilets jaunes */
  src(
    "wikinews-8dec2018",
    "gj",
    "Wikinews (français) — Gilets jaunes : samedi 8 décembre 2018",
    "https://fr.wikinews.org/wiki/Gilets_jaunes_:_samedi_8_d%C3%A9cembre_2018",
    both(
      "Act IV day-of reporting: the 8 Dec turnout and the 1,700+ arrests.",
      "le compte rendu de l’acte IV : foule du 8 déc. et plus de 1 700 interpellations.",
    ),
    "2018-12-08",
  ),

  src(
    "of-gj-chiffres",
    "gj",
    "Ouest-France — « Gilets jaunes : comment évolue la mobilisation ? Tous les chiffres »",
    "https://www.ouest-france.fr/societe/gilets-jaunes/gilets-jaunes-comment-evolue-la-mobilisation-tous-les-chiffres-6147118",
    both(
      "the running ministry-vs-union turnout table, used as the primary series and cross-checked against the Wikipedia acts.",
      "le tableau courant ministère / syndicats, utilisé comme série principale et recoupé avec les actes de Wikipédia.",
    ),
    "2018-12-23",
  ),

  src(
    "bbc-gj",
    "gj",
    "BBC News — yellow-vest protests",
    "https://www.bbc.com/news/world-europe-46577598",
    both(
      "the English narrative and the casualty figures quoted at the time.",
      "le récit anglophone et les chiffres de blessés cités à l’époque.",
    ),
    "2018-12-15",
  ),

  src(
    "monde-diplo-gj",
    "gj",
    "Le Monde diplomatique — chronologie du mouvement des Gilets jaunes",
    "https://www.monde-diplomatique.fr/mav/168/PIRONET/61011",
    both(
      "an independent chronology, used to check the act numbering (the press and the state do not agree on it). Published as issue #168, December 2019 – January 2020; the issue date is shown here.",
      "une chronologie indépendante, servant à vérifier la numérotation des actes (presse et État ne s’accordent pas). Publiée dans le numéro 168, décembre 2019 – janvier 2020 ; la date du numéro est affichée ici.",
    ),
    "2019-12-01",
  ),

  src(
    "rfi-gj",
    "gj",
    "RFI — Gilets jaunes : retour sur neuf actes de contestation",
    "https://www.rfi.fr/fr/france/20190118-gilets-jaunes-retour-neuf-actes-contestation-rue-interpellations",
    both(
      "the first nine acts condensed, with arrest figures — the only compact source for acts I–IX enforcement.",
      "les neuf premiers actes en résumé, avec interpellations — seule source compacte pour la répression des actes I à IX.",
    ),
    "2019-01-18",
  ),
];

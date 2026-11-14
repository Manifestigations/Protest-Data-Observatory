import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 7 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const BLOCKADES_SOURCES: readonly Source[] = [
  /* ---------------------- 2026 — school blockades and the school calendar */
  src(
    "service-public-vacances",
    "blockades",
    "Service-Public — « Calendrier des vacances scolaires 2026-2027 »",
    "https://www.service-public.gouv.fr/particuliers/actualites/A18563",
    both(
      "the Toussaint dates behind the dotted line: classes end Friday 16 October and resume Monday 2 November 2026, identical in zones A, B and C — which is why the holiday needs no zone logic.",
      "les dates de la Toussaint derrière la ligne en pointillés : fin des cours le vendredi 16 octobre et reprise le lundi 2 novembre 2026, identiques dans les zones A, B et C — d'où l'absence de logique par zone.",
    ),
    "2025-10-24",
  ),

  src(
    "education-calendrier",
    "blockades",
    "Ministère de l’Éducation nationale — « Calendrier scolaire : toutes les dates des cours et des vacances »",
    "https://www.education.gouv.fr/calendrier-scolaire-toutes-les-dates-des-cours-et-des-vacances-100148",
    both(
      "the official end-of-class and return-to-school dates, read against the press calendar for the last day of classes (Friday 16 October). A standing reference page for the 2026-2027 school year: it publishes no date of its own, so none is shown here.",
      "les dates officielles de fin de cours et de reprise, confrontées au calendrier de presse pour le dernier jour de cours (vendredi 16 octobre). Page de référence permanente pour l’année scolaire 2026-2027 : elle ne publie pas de date propre, aucune n’est donc affichée ici.",
    ),
  ),

  src(
    "education-bilans",
    "blockades",
    "Ministère de l’Éducation nationale — bilans d’établissements perturbés et fermés",
    "https://www.education.gouv.fr",
    both(
      "the ministry's balances behind the blockade line: 45 blocked of 338 concerned (29 Sept), 735 establishments perturbed (3 Oct), 224 closed (8 Oct), 214 closed with 94.2% of lycées open (13 Oct), 41 blocked at the rentrée (2 Nov) and 48 (3 Nov). Where the only figure published is “établissements perturbés” or “cours suspendus” rather than “bloqués”, the point is flagged as a wider measure — the tooltip says which. A continuously updated portal: the span shown is the window its cited balances cover.",
      "les bilans ministériels derrière la courbe des blocages : 45 bloqués sur 338 concernés (29 sept.), 735 établissements perturbés (3 oct.), 224 fermés (8 oct.), 214 fermés avec 94,2 % de lycées ouverts (13 oct.), 41 bloqués à la rentrée (2 nov.) et 48 (3 nov.). Lorsque le seul chiffre publié est « établissements perturbés » ou « cours suspendus » plutôt que « bloqués », le point est signalé comme une mesure plus large — l'infobulle précise laquelle. Portail mis à jour en continu : la période affichée est celle couverte par les bilans cités.",
    ),
    "2026-09-29",
    "2026-11-03",
  ),

  src(
    "usl-comptes",
    "blockades",
    "Union syndicale lynéenne — appels et décomptes syndicaux",
    "https://www.uslsyndicat.fr/",
    both(
      "the organiser side of the blockade band: 640 (1 Oct), 1 800 schools “à l'arrêt” (6 Oct), 1 000 (5 Nov). The union's own definition counts schools closed administratively as well as schools actually blocked, so its figure is an upper bound rather than a like-for-like count — which is why the band is wide and the tooltip says so. The “1800 LYCÉES À L'ARRÊT” communiqué is dated 6 Oct 2026 and the following one 7 Oct; the span shown covers the union's published counts from 1 Oct to 5 Nov.",
      "le côté syndical de la fourchette des blocages : 640 (1er oct.), 1 800 lycées « à l'arrêt » (6 oct.), 1 000 (5 nov.). La définition syndicale compte aussi les lycées fermés administrativement, et non seulement les lycées bloqués : son chiffre est une borne haute plutôt qu'un décompte comparable — d'où la largeur de la fourchette, que l'infobulle explique. Le communiqué « 1800 LYCÉES À L'ARRÊT » est daté du 6 oct. 2026 et le suivant du 7 oct. ; la période affichée couvre les décomptes syndicaux publiés du 1er oct. au 5 nov.",
    ),
    "2026-10-06",
    "2026-11-05",
  ),

  src(
    "franceinfo-blocages",
    "blockades",
    "Franceinfo — le suivi jour par jour des blocages de lycées",
    "https://www.franceinfo.fr/societe/education/blocage-des-lycees/",
    both(
      "the live day-by-day counts used where no ministry balance was issued: 169 blockades in the morning of 1 Oct, 891 schools with classes suspended at midday on 6 Oct, more than 150 perturbed on 8 Oct, and “more than 40 schools blocked” on 10 Oct. A rolling topic page with no date of its own — items are labelled “Aujourd'hui” — so the span shown runs from the first cited count to the last update of the page.",
      "les décomptes journaliers en direct utilisés là où aucun bilan ministériel n'a été publié : 169 blocages le matin du 1er oct., 891 établissements avec cours suspendus à la mi-journée du 6 oct., plus de 150 perturbés le 8 oct. et « plus de 40 lycées bloqués » le 10 oct. Page de suivi sans date propre — les entrées sont marquées « Aujourd'hui » — ; la période affichée va du premier décompte cité à la dernière mise à jour de la page.",
    ),
    "2026-10-01",
    "2026-11-13",
  ),

  src(
    "lemonde-29sept-338",
    "blockades",
    "Le Monde — « Blocages des lycées : 338 établissements concernés mardi, dont 45 encore bloqués, selon le ministère de l’éducation nationale »",
    "https://www.lemonde.fr/societe/article/2026/09/29/blocages-des-lycees-338-etablissements-concernes-et-dix-blesses-selon-le-ministere-de-l-education-nationale_6785573_3225.html",
    both(
      "Act I: the USL claimed 400 blocked establishments out of ~3,700 in France; the Education ministry counted 416 establishments touched since the morning, 338 still affected at day's end with 45 blocked, and 31 injured students and staff; 440 interpellations, two thirds leading to a garde à vue.",
      "l’acte I : l’USL revendiquait 400 établissements bloqués sur ~3 700 en France ; le ministère de l’Éducation recensait 416 établissements touchés depuis le matin, 338 encore affectés en fin de journée dont 45 bloqués, et 31 blessés parmi élèves et personnels ; 440 interpellations, les deux tiers ayant donné lieu à une garde à vue.",
    ),
    "2026-09-29",
  ),

  src(
    "figaro-06nov-live",
    "blockades",
    "Le Figaro — direct du 6 novembre : 41 lycées bloqués, de nouvelles actions attendues samedi",
    "https://www.lefigaro.fr/actualite-france/en-direct-colere-sociale-apres-la-forte-mobilisation-de-jeudi-de-nouvelles-actions-attendues-des-samedi-20261106",
    both(
      "41 lycées still blocked the day after the 5 Nov peak — the tail of the school movement.",
      "41 lycées encore bloqués au lendemain du pic du 5 nov. — la queue du mouvementruc.",
    ),
    "2026-11-06",
  ),
];

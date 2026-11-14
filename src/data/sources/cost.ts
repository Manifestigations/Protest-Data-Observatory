import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 20 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const COST_SOURCES: readonly Source[] = [
  /* ------------------------------------------ 2026 — damage and cost */
  src(
    "ifrap-2026",
    "cost",
    "Fondation IFRAP — « Violences des 17 et 18 octobre 2026 : une facture qui approche le milliard d’euros »",
    "https://www.ifrap.org/etat-et-collectivites/violences-des-17-et-18-octobre-2026-une-facture-qui-approche-le-milliard-deuros",
    both(
      "the €247M–872M damage range for 17–18 Oct: ~€910M material damage and ~€190M lost turnover in the high estimate, €666M of it retail.",
      "la fourchette de 247 à 872 M€ de dommages pour les 17–18 oct. : ~910 M€ de dommages matériels et ~190 M€ de chiffre d’affaires perdu dans l’hypothèse haute, dont 666 M€ pour le commerce de détail.",
    ),
    "2026-10-21",
  ),

  src(
    "monde-cci-2026",
    "cost",
    "Le Monde — «Plus de 2 500 commerces dégradés », d’après CCI France",
    "https://www.lemonde.fr/economie/article/2026/10/27/plus-de-2-500-commerces-degrades-en-marge-des-recentes-mobilisations-selon-cci-france-qui-demande-une-interdiction-des-manifestations-jusqu-aux-fetes-de-fin-d-annee_6801314_3234.html",
    both(
      "CCI France’s shop counts: 2,488 hit on 17 Oct, of which 1,161 pillaged, sacked or burnt.",
      "les décomptes de commerces de CCI France : 2 488 touchés le 17 oct., dont 1 161 pillés, saccagés ou incendiés.",
    ),
    "2026-10-27",
  ),

  src(
    "franceinfo-cci-2026",
    "cost",
    "franceinfo — « Plus de 2 500 magasins touchés »",
    "https://www.franceinfo.fr/societe/mobilisation-du-17-octobre/plus-de-2-500-magasins-touches-par-les-violences-en-marge-des-manifestations-des-17-et-24-octobre-selon-les-chambres-de-commerce_8256049.html",
    both(
      "the 24 Oct increment (50 shops, total 2,538) and the 80% centre-town turnover drop.",
      "l’incrément du 24 oct. (50 commerces, 2 538 au total) et la chute de 80 % du chiffre d’affaires en centre-ville.",
    ),
    "2026-10-27",
  ),

  src(
    "bfmtv-cci-2026",
    "cost",
    "BFMTV — CCI France, 20 commerces vandalisés le 31 octobre",
    "https://www.bfmtv.com/economie/entreprises/20-commerces-vandalises-samedi-contre-2-488-le-17-octobre-cci-france-constate-une-nette-baisse-des-degradations-en-marge-des-manifestations-mais-s-inquiete-d-une-forte-chute-du-chiffre-d-affaires-des-magasins-pouvant-atteindre-80_AD-202611010225.html",
    both(
      "why week 6 carries no damage figure: the count collapses after 24 Oct.",
      "pourquoi la semaine 6 ne porte aucun chiffre de dommages : le décompte s’effondre après le 24 oct.",
    ),
    "2026-11-01",
  ),

  src(
    "ladepeche-cci-31oct",
    "cost",
    "La Dépêche — 20 commerces dégradés ce samedi, contre 2 488 il y a deux semaines",
    "https://www.ladepeche.fr/2026/11/01/manifestations-du-31-octobre-20-commerces-degrades-ce-samedi-selon-cci-france-il-y-en-avait-2-488-il-y-a-deux-semaines-13630867.html",
    both(
      "the 31 Oct figure set against 17 Oct, the cleanest evidence of the movement’s tapering.",
      "le chiffre du 31 oct. face au 17 oct., preuve la plus nette de l’essoufflement.",
    ),
    "2026-11-01",
  ),

  src(
    "figaro-cost-weekend",
    "cost",
    "Le Figaro — « Le coût exorbitant d’un week-end d’émeutes pour les commerces et les collectivités »",
    "https://www.lefigaro.fr/societes/violences-urbaines-le-cout-exorbitant-d-un-week-end-d-emeutes-pour-les-commerces-et-les-collectivites-20261020",
    both(
      "cross-check on the damage order of magnitude.",
      "contre-vérification de l’ordre de grandeur des dommages.",
    ),
    "2026-10-20",
  ),

  src(
    "figaro-damage-2500",
    "cost",
    "Le Figaro — plus de 2 500 commerces dégradés en France",
    "https://www.lefigaro.fr/actualite-france/violences-urbaines-plus-de-2-500-commerces-degrades-en-france-20261027",
    both(
      "second, non-CCI route to the 2,500-shop figure and the €1bn headline.",
      "seconde voie, hors CCI, vers les 2 500 commerces et le titre du milliard.",
    ),
    "2026-10-27",
  ),

  src(
    "leparisien-idf-1m",
    "cost",
    "Le Parisien — 1 million d’euros de dégâts, 200 lycées perturbés : le bilan des blocages en Île-de-France",
    "https://www.leparisien.fr/societe/1-million-deuros-de-degats-200-lycees-perturbes-le-bilan-des-blocus-de-lycees-en-ile-de-france-01-10-2026-YACA325BUBAD5K7L5B6DWBDODY.php",
    both(
      "the 1 Oct lycée-blockade baseline: €1M and 200 establishments in Île-de-France.",
      "la base du 1er oct. pour les blocages de lycées : 1 M€ et 200 établissements en Île-de-France.",
    ),
    "2026-10-01",
  ),

  src(
    "leparisien-millions",
    "cost",
    "Le Parisien — blocages des lycées : plusieurs millions d’euros de dégâts déjà estimés en France",
    "https://www.leparisien.fr/societe/blocages-des-lycees-plusieurs-millions-deuros-de-degats-materiels-deja-estimes-en-france-02-10-2026-ICDKIV5SEFEA7NXURY45JLAZRA.php",
    both(
      "the first national order of magnitude for the school movement, before 17 Oct.",
      "le premier ordre de grandeur national pour le mouvement defecé, avant le 17 oct.",
    ),
    "2026-10-02",
  ),

  src(
    "leparisien-1500shops",
    "cost",
    "Le Parisien — violences du 17 octobre : 1 500 magasins touchés, plusieurs centaines de millions d’euros de dégâts",
    "https://www.leparisien.fr/economie/violences-du-17-octobre-1-500-magasins-touches-en-france-plusieurs-centaines-de-millions-deuros-de-degats-18-10-2026-PAAKNFW6ZVCCJMLJ7LTOAWLKOI.php",
    both(
      "the 1,500-shop figure published the day after, later revised upward to 2,488.",
      "les 1 500 commerces publiés au lendemain, révisés ensuite à 2 488.",
    ),
    "2026-10-18",
  ),

  src(
    "leparisien-looting",
    "cost",
    "Le Parisien — Paris : des heurts et des magasins pillés dans la nuit de dimanche à lundi",
    "https://www.leparisien.fr/paris-75/paris-des-heurts-et-des-magasins-pilles-encore-tard-dans-la-nuit-de-dimanche-a-lundi-19-10-2026-OUUITGPFNRD47NWIU5VVWP2IKY.php",
    both(
      "the 18–19 Oct looting, which is why the 17–18 Oct damage window closes on the Monday night.",
      "les pillages des 18–19 oct., d’où la clôture de la fenêtre de dommages le lundi soir.",
    ),
    "2026-10-19",
  ),

  src(
    "leparisien-451-shops",
    "cost",
    "Le Parisien — 451 commerces vandalises : la carte des établissements parisiens pillés et dégradés",
    "https://www.leparisien.fr/paris-75/451-commerces-vandalises-la-carte-des-etablissements-parisiens-pilles-et-degrades-les-17-et-18-octobre-22-10-2026-SBWJHPIKZ5DMZFSEWE4IYYCAIY.php",
    both(
      "the Paris-only shop count (451), marked regional in the table.",
      "le décompte strictement parisien (451), marqué régional dans le tableau.",
    ),
    "2026-10-22",
  ),

  src(
    "mesinfos-idf",
    "cost",
    "mesinfos.fr — blocages de lycées : 8,5 millions d’euros de dégâts en Île-de-France",
    "https://mesinfos.fr/ile-de-france/blocus-lyceens-85-millions-d-euros-de-degats-en-ile-de-france-341003.html",
    both(
      "the highest Île-de-France figure for the lycée blockades — the upper bound in the table.",
      "le chiffre francilien le plus élevé pour les blocages de lycées — borne haute du tableau.",
    ),
    "2026-10-13",
  ),

  src(
    "ici-lille",
    "cost",
    "ici.fr (Nord) — mobilisation du 17 octobre : premières tensions à Lille",
    "https://www.ici.fr/hauts-de-france/nord-59/lille/mobilisation-du-17-octobre-des-premieres-tensions-a-lille-entre-forces-de-l-ordre-et-manifestants-7548967",
    both(
      "the Lille McDonald’s fire, one of the few individually costed damage items.",
      "l’incendie du McDonald’s à Lille, l’un des rares dommages chiffrés individuellement.",
    ),
    "2026-10-17",
  ),

  src(
    "cnews-14oct",
    "cost",
    "CNEWS — blocus des lycées : agence immobilière attaquée, feux de poubelle, le bilan",
    "https://www.cnews.fr/videos/france/2026-10-14/blocus-des-lycees-agence-immobiliere-attaquee-feux-de-poubelle-le-bilan",
    both(
      "the 14 Oct incidents, the first damage report of the school movement.",
      "les incidents du 14 oct., premier bilan de dommages du mouvementlymcéen.",
    ),
    "2026-10-14",
  ),

  src(
    "actu-450-shops",
    "cost",
    "actu.fr — pillages et dégradations en marge du 17 octobre : 450 commerces sinistrés à Paris",
    "https://actu.fr/ile-de-france/paris_75056/pillages-et-degradations-en-marge-du-17-octobre-450-commerces-sinistres-a-paris-quels-sont-les-plus-touches_64960656.html",
    both(
      "the 450/451 Paris shops with the sector breakdown.",
      "les 450/451 commerces parisiens avec la ventilation par secteur.",
    ),
    "2026-10-22",
  ),

  src(
    "of-facture",
    "cost",
    "Ouest-France — violences du 17 octobre : des dégâts estimés à des centaines de millions d’euros, qui va payer ?",
    "https://www.ouest-france.fr/societe/manifestation/violences-du-17-octobre-des-degats-estimes-a-des-centaines-de-millions-deuros-qui-va-payer-la-facture-5e077b82-cbb5-11f1-b8bc-a46147b584ed",
    both(
      "who bears the cost — communes, insurers, the state — the basis for the footnote on the damage columns.",
      "qui supporte le coût — communes, assureurs, État — base de la note de bas de page des colonnes dommages.",
    ),
    "2026-10-20",
  ),

  src(
    "of-assurance",
    "cost",
    "Ouest-France — 17 octobre : le chiffrage précis des dégâts attendra la fin du délai de 30 jours accordé par les assureurs",
    "https://www.ouest-france.fr/economie/assurance/17-octobre-le-chiffrage-precis-des-degats-devra-attendre-la-fin-du-delai-de-30-jours-accorde-par-les-assureurs-0da74e46-cdff-11f1-bf87-17eca79cb13c",
    both(
      "why every damage figure here is provisional: the insurers’ 30-day claim window had not closed at the time of writing.",
      "pourquoi tout chiffre de dommages est provisoire : le délai de 30 jours des assureurs n’était pas écoulé à la rédaction.",
    ),
    "2026-10-23",
  ),

  src(
    "decryptargent",
    "cost",
    "Décryptargent — 17 octobre : le premier bilan économique",
    "https://decryptargent.fr/finances-personnelles/17-octobre-bilan-economique-premiers-chiffres/",
    both(
      "the first, earliest economic assessment of 17 Oct, superseded by IFRAP and CCI France.",
      "la première estimation économique du 17 oct., supplantée par l’IFRAP et CCI France.",
    ),
    "2026-10-17",
    "2026-10-20",
  ),

  src(
    "capital-policing",
    "cost",
    "Capital.fr — « Combien ont coûté les 70 000 policiers de samedi »",
    "https://www.capital.fr/economie-politique/combien-ont-coute-les-70-000-policiers-de-samedi-letat-ne-le-dit-pas-mais-certains-chiffres-existent-1531269",
    both(
      "the €15,000–30,000 per CRS company per day and €3.4M per 3,000 gendarmes benchmarks behind the policing-cost band; also the 1,435 arrests and 53 officers injured on 24 Oct.",
      "les références de 15 000–30 000 € par compagnie de CRS et par jour, et de 3,4 M€ pour 3 000 gendarmes, derrière la fourchette de coût du maintien de l’ordre ; aussi les 1 435 interpellations et 53 policiers blessés du 24 oct.",
    ),
    "2026-10-28",
  ),
];

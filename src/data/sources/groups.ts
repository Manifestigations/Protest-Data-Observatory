import type { SourceGroup } from "./types";

export const GROUPS: readonly SourceGroup[] = [
  {
    id: "official",
    title: {
      en: "The 2026 movement — state situation reports",
      fr: "Le mouvement de 2026 — points de situation de l’État",
    },
    blurb: {
      en: "Origin of every arrest, custody and officer-injury count and of the ministry turnout figure. Published as press briefings and evening situation reports, not as a downloadable series, so the daily values were collected from the reporting in the next group rather than from a dataset. One préfecture bulletin is included: 13 Oct had no national briefing, so the Ardèche report is the only state account of that day.",
      fr: "Origine de chaque décompte d’interpellations, de gardes à vue et de blessés parmi les forces, ainsi que du chiffre ministériel de foule. Publiés en points presse et points de situation du soir, non en séries téléchargeables : les valeurs quotidiennes ont donc été relevées dans la presse du groupe suivant, et non dans un jeu de données. Un communiqué préfectoral est inclus : le 13 oct. n’a donné lieu à aucun point national, le rapport ardéchois est donc le seul compte rendu étatique de cette journée.",
    },
  },
  {
    id: "press",
    title: {
      en: "The 2026 movement — turnout, arrests, injuries",
      fr: "Le mouvement de 2026 — foule, interpellations, blessés",
    },
    blurb: {
      en: "Daily press reporting for 15 Sep – 11 Nov 2026, plus the two disputes that shaped the charts: whether the 17 Oct policing operation was actually smaller than its predecessors, and how far the injured-protester total can be trusted.",
      fr: "La presse quotidienne du 1er oct. au 11 nov. 2026, plus les deux controverses qui ont façonné les graphiques : le dispositif du 17 oct. était-il réellement inférieur aux précédents, et jusqu’où le total de blessés parmi les manifestants est-il fiable.",
    },
  },
  {
    id: "strikes",
    title: {
      en: "The 2026 movement — participation in the strikes",
      fr: "Le mouvement de 2026 — participation aux grèves",
    },
    blurb: {
      en: "Basis of the ‘people on strike’ series on chart 1 of sections A and B. No authority published a national headcount of strikers: what was published, on the two national action days, were participation rates for the fonction publique, applied here to its 2,500,000 agents. Education staff are inside that base and are reported as a component, never added to it. The CGT's “nearly 1.6 million on strike and in the demonstrations” is deliberately unused: it counts strikers and marchers at once, and already bounds the turnout band for 5 November.",
      fr: "Base de la série « personnes en grève » du graphique 1 des sections A et B. Aucune autorité n’a publié de décompte national des grévistes : ce qui a été publié, les deux journées nationales d’action, sont des taux de participation dans la fonction publique, appliqués ici à ses 2 500 000 agents. Les personnels de l’Éducation sont inclus dans cette base et figurent comme composante, jamais en supplément. Le « près d’1,6 million en grève et dans les manifestations » de la CGT n’est pas utilisé : il compte grévistes et manifestants ensemble et borne déjà la fourchette de foule du 5 novembre.",
    },
  },
  {
    id: "blockades",
    title: {
      en: "The 2026 movement — school blockades and the school calendar",
      fr: "Le mouvement de 2026 — blocages de lycées et calendrier scolaire",
    },
    blurb: {
      en: "The blockade line on the daily and weekly charts is a separate statistic: establishments where pupils could not attend normally — blocked, or closed by decision. The band runs from the ministry count to the union count, and the two publishers do not count the same thing: the union's “à l'arrêt” includes schools closed administratively, so it is an upper bound. The Toussaint holiday (17 Oct – 1 Nov) is drawn dotted because no lycée was in session: the count did not exist, it was not zero. The Interior Ministry's daily tallies of establishments concerned and blocked are in the first group above.",
      fr: "La courbe des blocages des graphiques quotidien et hebdomadaire est une statistique à part : les établissements où les élèves ne pouvaient pas suivre normalement — bloqués, ou fermés par décision. La fourchette va du décompte ministériel au décompte syndical, et les deux éditeurs ne comptent pas la même chose : le « à l'arrêt » syndical inclut les lycées fermés administrativement, c'est donc une borne haute. Les vacances de la Toussaint (17 oct. – 1 nov.) sont en pointillés car aucun lycée n'était en cours : le décompte n'existait pas, il n'était pas nul. Les bilans quotidiens du ministère de l'Intérieur sur les établissements concernés et bloqués figurent dans le premier groupe ci-dessus.",
    },
  },
  {
    id: "cost",
    title: {
      en: "The 2026 movement — damage and cost",
      fr: "Le mouvement de 2026 — dommages et coûts",
    },
    blurb: {
      en: "Damage, damage cost and policing cost. None of this exists as a daily series: it is a handful of one-off assessments for 17–18 Oct and for the lycée blockades, which is why most cells in those columns are empty rather than estimated.",
      fr: "Dommages, coût des dommages et coût du maintien de l’ordre. Rien de tout cela n’existe en série quotidienne : ce sont quelques bilans ponctuels pour les 17–18 oct. et pour les blocages de lycées, d’où des colonnes le plus souvent vides plutôt qu’estimées.",
    },
  },
  {
    id: "overseas",
    title: {
      en: "The 2026 movement — overseas",
      fr: "Le mouvement de 2026 — outre-mer",
    },
    blurb: {
      en: "Outre-mer La 1ère is the only continuous reporting on the Guadeloupe, Martinique, Réunion, Guyane and Mayotte half of the protest count; the ministry bilan gives no territorial split.",
      fr: "Outre-mer La 1ère est le seul suivi continu de la moitié guadeloupéenne, martiniquaise, réunionnaise, guyanaise et mahoraise du décompte ; le bilan ministériel ne fournit aucune ventilation territoriale.",
    },
  },
  {
    id: "ref2026",
    title: {
      en: "The 2026 movement — reference pages",
      fr: "Le mouvement de 2026 — pages de référence",
    },
    blurb: {
      en: "Encyclopaedia and aggregator pages used to cross-check the 2026 chronology. Secondary: never used for a figure that a primary report in the groups above carries.",
      fr: "Pages encyclopédiques et agrégateurs servant à recouper la chronologie de 2026. Secondaires : jamais utilisées pour un chiffre qu’un article primaire des groupes précédents porte déjà.",
    },
  },
  {
    id: "mai68",
    title: { en: "May 1968", fr: "Mai 68" },
    blurb: {
      en: "Two counts exist for almost every 1968 day — prefecture and union — and they diverge by a factor of four on 13 May. Both are plotted.",
      fr: "Deux décomptes existent pour presque chaque journée de 1968 — préfecture et syndicats — et ils divergent d’un facteur quatre le 13 mai. Les deux sont tracés.",
    },
  },
  {
    id: "cpe",
    title: { en: "CPE, 2006", fr: "CPE, 2006" },
    blurb: {
      en: "The first movement in the comparison with a usable daily series. The 16–18 March enforcement counts are Paris-only and are marked as such.",
      fr: "Le premier mouvement de la comparaison doté d’une série quotidienne exploitable. Les décomptes répressifs des 16–18 mars sont strictement parisiens et signalés comme tels.",
    },
  },
  {
    id: "gj",
    title: { en: "Gilets jaunes, 2018–19", fr: "Gilets jaunes, 2018–2019" },
    blurb: {
      en: "Turnout was published act by act for 44 acts; the custody and injury counts were not, which is why the enforcement lines stop at week 3.",
      fr: "La foule a été publiée acte par acte sur 44 actes ; les décomptes de gardes à vue et de blessés non, d’où l’arrêt des courbes répressives à la semaine 3.",
    },
  },
  {
    id: "nahel",
    title: {
      en: "Nahel Merzouk, June–July 2023",
      fr: "Nahel Merzouk, juin–juillet 2023",
    },
    blurb: {
      en: "The only episode here with a consolidated official total, via the Sénat inquiry; the four nights themselves are counted day by day from press and encyclopaedia summaries.",
      fr: "Le seul épisode disposant d’un total officiel consolidé, via l’enquête du Sénat ; les quatre nuits elles-mêmes sont décomptées jour par jour à partir de la presse et des synthèses encyclopédiques.",
    },
  },
  {
    id: "retraites",
    title: { en: "Pensions, 2023", fr: "Retraites, 2023" },
    blurb: {
      en: "Ministry and union pairs for each national action day, 19 Jan – 6 Jun 2023.",
      fr: "Les couples ministère / syndicats de chaque journée nationale d’action, du 19 janv. au 6 juin 2023.",
    },
  },
  {
    id: "rn2024",
    title: {
      en: "Anti-RN marches, June 2024",
      fr: "Marches anti-RN, juin 2024",
    },
    blurb: {
      en: "Kept separate because the 15–16 June 2024 marches are usually folded into the pensions series; they are a different mobilisation with a different organiser base.",
      fr: "Groupe distinct car les marches des 15–16 juin 2024 sont souvent rattachées à la série retraites ; c’est une mobilisation différente, avec une base d’organisateurs différente.",
    },
  },
  {
    id: "bloquons",
    title: {
      en: "« Bloquons tout », September–October 2025",
      fr: "« Bloquons tout », septembre–octobre 2025",
    },
    blurb: {
      en: "The closest precedent to 2026 and the reason the 2026 figures are shown as a band: the ministry revised its own 10 Sep count upward during the evening, from 175,000 to 197,000.",
      fr: "Le précédent le plus proche de 2026, et la raison pour laquelle les chiffres de 2026 sont tracés en fourchette : le ministère a révisé son propre décompte du 10 sept. en cours de soirée, de 175 000 à 197 000.",
    },
  },
];

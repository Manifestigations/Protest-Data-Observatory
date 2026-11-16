import { CASUALTY_FR } from "../../sections/casualties/copy.fr";
import { flagMap } from "../markers";

export const TEXT_FR = {
  panels: {
    partialWeek: "Semaine du {label} (partielle)",
    act: "Acte {n}",
    withAction: "{when} · {action}",
    seriesContinues: "{name} (suite)",
    obs: "relevés\u00A0: {counts}",
    obsSep: " · ",
    valueRange: "{lo}–{hi}",
    itemMeta: "fourchette {range} · jusqu’à la semaine {n}",
    median: "médiane",
    peak: "pointe",
    range: "fourchette min–max",
    figureCount: "{n} chiffres publiés",
    singleFigure:
      "un seul chiffre publié — la médiane et la pointe sont le même nombre",
    summaryMeta: "médiane et pointe · {n} mouvements",
  },
  kpi: {
    heading: "Chiffres clés",
    largestDay: "Plus grand jour",
    largestWeek: "Plus grande semaine",
    largestFigure: "Plus grand chiffre",
    vsMean: "Max vs moyenne",
    vsMedian: "Max vs médiane",
    vsFirst: "Max vs premier chiffre",
    againstMean: "{value} contre une moyenne de {base}",
    againstMedian: "{value} contre une médiane de {base}",
    againstFirst: "{value} contre un premier chiffre de {base}",
    noteDaily:
      "Les rapports sont calculés sur les séries quotidiennes : chaque chiffre publié est divisé par la moyenne, la médiane et le premier chiffre publié de sa propre série. Les jours sans chiffre publié sont écartés, non comptés comme zéro. Le total de dommages de 1 000 M€ du 24 octobre n’a pas de marqueur sur le graphique et en est donc écarté ici aussi.",
    noteWeekly:
      "Les rapports sont calculés sur les séries hebdomadaires : chaque chiffre publié est divisé par la moyenne, la médiane et le premier chiffre publié de sa propre série. Les semaines sans chiffre publié sont écartées, non comptées comme zéro.",
    noteEpisodes:
      "Chaque mouvement est comparé à sa propre série — sa moyenne, sa médiane et son premier chiffre publié — et le plus grand rapport sur les sept mouvements est affiché. Un rapport au premier chiffre peut atteindre des milliers de pour cent lorsqu’un mouvement a commencé avec une poignée de personnes.",
    noteEpisodesCapped:
      "Sur les seules semaines tracées ici, qui s’arrêtent à la dernière semaine de chiffres de maintien de l’ordre.",
    eurM: "{v} M€",
    none: "aucun chiffre publié",
  },
  casualties: CASUALTY_FR,
  items: {
    p: { label: "Manifestants", short: "Manifestants" },
    a: { label: "Interpellations", short: "Interpellations" },
    f: { label: "Blessés — forces de l’ordre", short: "Forces blessées" },
    i: { label: "Blessés — manifestants", short: "Manifestants blessés" },
  },
  units: { weeks: "semaine" },
  flags: flagMap("fr"),
  tooltip: {
    linePlain: "{value}",
    lineWithFlag: "{value} · {flag}",
    firstFigure: "premier chiffre publié : {n}",
    shareOfFirst: "{pct} du premier chiffre ({n})",
    shareComparisons: "Comparaisons : {list}",
    cmpHighest: "le plus élevé",
    cmpMean: "moyenne",
    cmpMedian: "médiane",
    cmpFirst: "premier chiffre",
    listAnd: " et ",
  },
  disclaimer: {
    body: "La recherche et le code ont été réalisés à l’aide d’un LLM et les chiffres n’ont pas été vérifiés. Ne les utilisez pas pour une analyse sérieuse ou pour prendre des décisions sans avoir d’abord vérifié les chiffres et les sources en bas de page.",
  },
};

export const TEXT_FR = {
  panels: {
    partialWeek: "Semaine du {label} (partielle)",
    act: "Acte {n}",
    withAction: "{when} · {action}",
    seriesContinues: "{name} (suite)",
    obs: "observations {counts} sur {weeks}",
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
      "Comme en section C, mais sur les seules semaines tracées en section D, qui s’arrêtent à la dernière semaine de chiffres de maintien de l’ordre.",
    eurM: "{v} M€",
    none: "aucun chiffre publié",
  },
  casualties: {
    headlineTitle: "Comment se répartissent les blessures",
    weeklyTitle: "Ce qu’une semaine peut établir",

    colScope: "Population",
    colTotal: "Total déclaré",
    colSerious: "Graves",
    colLight: "Légères",
    colLightShare: "Part de légères",
    colOther: "Non classées légères",
    colSide: "Camp",
    colCircumstance: "Circonstance",
    colCount: "Décompte",
    colCases: "Cas documentés",
    colQuestion: "Question",
    colWindow: "Plus petite fenêtre publiée",
    colWeekly: "Chiffre hebdomadaire",

    scope: {
      crsOctober: "CRS, octobre 2026",
      forcesPeak: "Toutes forces, cumul à son pic",
      protesters: "Manifestant·es, depuis le 30 septembre",
      week12oct: "Semaine du 12 octobre",
      week19oct: "Semaine du 19 octobre",
      week26oct: "Semaine du 26 octobre",
      week2nov: "Semaine du 2 novembre",
    },
    side: {
      forces: "Police et gendarmerie",
      protesters: "Manifestant·es",
    },
    kind: {
      accidental: "Accidentelle ou auto-infligée",
      conflictual: "Imputée à l’affrontement",
    },
    why: {
      notPublished: "non publié",
      noDenominator: "aucun total publié",
      binaryFile: "fichier binaire : léger / non léger",
      noTally: "aucun décompte, des cas seulement",
      noneDocumented: "aucun cas documenté",
    },
    cases: {
      givors:
        "Givors, 10 octobre : deux policiers en faction devant un lycée se brûlent à la main et à la cuisse quand une grenade part accidentellement dans leur propre véhicule, qui prend feu.",
      crsWrist:
        "Un CRS s’est contusionné le poignet gauche en fermant la portière de son véhicule.",
      crsAnkle: "Un autre CRS s’est tordu la cheville en chutant du fourgon.",
      helmet:
        "Paris, 31 octobre : un CRS touché au casque, indemne — un peu de peinture ôtée de la coque.",
      groin2023:
        "Sainte-Soline, mars 2023, pour comparaison : sur 29 gendarmes recensés, un hématome à l’aine, un traumatisme respiratoire, les autres examinés pour traumatismes sonores.",
      mael: "Tours, 30 septembre : un lycéen éborgné par une balle en caoutchouc, alors qu’il ne lançait rien.",
      alaric:
        "Paris, 17 octobre : un étudiant de 19 ans brûlé au torse et au bras par une grenade lacrymogène tirée en tir tendu ; brûlures au deuxième degré, non cicatrisées dix jours plus tard.",
      eyes: "Plusieurs autres mineurs ont perdu un œil dans les mêmes circonstances.",
      sainteSoline:
        "Le bilan officiel était de 29 gendarmes blessés, dont deux en urgence absolue. Les deux ont ensuite été décrits comme un hématome à l’aine et un traumatisme respiratoire.",
    },

    casesCount: "{n} cas documentés",
    noCases: "aucun cas documenté",

    capLevels:
      "Gravité, à la plus fine fenêtre publiée par chaque source. Les lignes sont des populations et des fenêtres différentes — elles ne s’additionnent jamais.",
    capWeeks:
      "Gravité, par semaine. L’incrément est la différence entre le cumul en début et en fin de semaine.",
    capCases:
      "Circonstance. Aucune source ne la dénombre : la colonne donne le nombre de cas documentés, non une part.",
    capResolution:
      "La plus petite fenêtre à laquelle chaque ventilation existe, et si un chiffre hebdomadaire peut en être tiré.",
    noteLevels:
      "Les 1 167 sur 1 233 constituent la seule part de blessés légers publiée : 94,6 %, le chiffre que le fichier énonce lui-même. Il porte sur les CRS en octobre : il ne s’étend ni à toutes les forces ni à tout le mouvement. Les 7 blessés graves relèvent de la consolidation de 1 144 du 17 octobre. Aucun total des blessures chez les manifestant·es n’a jamais été publié : aucune part ne peut donc être calculée de ce côté — les cas graves forment un registre, non un taux. Les quatre blessures accidentelles documentées sont quatre personnes nommées, non quatre pour cent de quoi que ce soit.",
    noteWeeks:
      "Le ministère publie un cumul, non une ventilation hebdomadaire de la gravité. Découper ce cumul en semaines est de l’arithmétique, et le total se recoupe exactement à 1 580, mais la seule ventilation léger / non léger existante est le fichier des CRS d’octobre, qui couvre quatre de ces semaines sans pouvoir être attribué à l’une d’elles. C’est pourquoi la section A porte la ventilation et la section B les incréments.",
    headLight: "{light} blessures déclarées sur {total} classées légères",
    headLightNote: "Agents des CRS, octobre 2026",
    headMissingNote:
      "Aucun total publié pour les blessures des manifestant·es : aucune part n’existe",

    resolution: [
      {
        label: "Ventilation léger / grave",
        window: "Un mois (octobre 2026), CRS seulement",
        weekly: "non",
      },
      {
        label: "Ventilation accidentelle / conflictuelle",
        window: "Aucune — des cas nommés seulement",
        weekly: "non",
      },
      {
        label: "Cumul des forces blessées",
        window: "Un jour",
        weekly: "oui",
      },
      {
        label: "Incréments quotidiens",
        window: "Un jour",
        weekly: "oui",
      },
    ],
  },
  items: {
    p: { label: "Manifestants", short: "Manifestants" },
    a: { label: "Interpellations", short: "Interpellations" },
    f: { label: "Blessés — forces de l’ordre", short: "Forces blessées" },
    i: { label: "Blessés — manifestants", short: "Manifestants blessés" },
  },
  units: { weeks: "semaine" },
  flags: {
    n: "",
    r: "régional",
    p: "partiel",
    e: "modélisé",
    f: "plancher",
    c: "stock",
    w: "hebdomadaire",
    x: "mesure plus large",
  }, // fr
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

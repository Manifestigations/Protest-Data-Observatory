import type { CasualtyCopy } from "../../copy/types.ts";

export const CASUALTY_FR: CasualtyCopy = {
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
  colPopulation: "Population comptée",
  colParticipation: "Participation",
  colSelection: "Mode de sélection",
  colEstimate: "Grandeur",
  colRange: "Intervalle",
  colMethod: "Méthode",
  colEdges: "Bornes",
  colStatus: "Statut",
  colRatio: "Pris en charge par cas grave",
  colAt17: "17 octobre (54 cas graves)",
  colMovement: "Mouvement (78 cas graves)",

  scope: {
    crsOctober: "CRS, octobre 2026",
    forcesPeak: "Toutes forces, cumul à son pic",
    forcesMovement: "Toutes forces, mouvement jusqu’au 5 novembre",
    protesters: "Manifestant·es, depuis le 30 septembre",
    week12oct: "Semaine du 12 octobre",
    week19oct: "Semaine du 19 octobre",
    week26oct: "Semaine du 26 octobre",
    week2nov: "Semaine du 2 novembre",
    "montpellier-2026-10-17": "Montpellier, 17 octobre 2026",
  },
  side: { forces: "Police et gendarmerie", protesters: "Manifestant·es" },
  kind: {
    accidental: "Accidentelle ou auto-infligée",
    conflictual: "Imputée à l’affrontement",
  },
  population: {
    forces: "Police et gendarmerie",
    protesters: "Manifestant·es",
    bystanders: "Personnes non participantes",
    educationDeclared: "Élèves et personnels de l’éducation",
    mixed: "Civils, cause non précisée",
  },
  participation: {
    participating: "participant",
    "non-participating": "ne participant pas",
    unknown: "inconnue",
  },
  selection: {
    official: "décompte officiel",
    declared: "déclaration",
    register: "registre de cas",
    treated: "pris en charge",
    legal: "clients d’avocats",
    regional: "une seule région",
  },
  edge: {
    published: "chiffre publié",
    floor: "plancher documenté",
    ceiling: "plafond modélisé",
    transfer: "transfert de taux",
    residual: "résidu",
    bound: "borne structurelle",
    unbounded: "aucune borne n’existe",
  },
  why: {
    notPublished: "non publié",
    noDenominator: "aucun total publié",
    binaryFile: "fichier binaire : léger / non léger",
    noTally: "aucun décompte, des cas seulement",
    noneDocumented: "aucun cas documenté",
    universeMismatch: "population différente, non transférable",
    noSeverityClass: "la source n’a pas de classe de gravité",
    registerOnly: "registre de cas graves seulement",
    causeUnknown: "cause non publiée",
    notEstimable: "non estimable à partir de ces données",
  },
  estimates: {
    crsSeriousShare: {
      label: "CRS, octobre : part de cas graves",
      method:
        "Borne imbriquée — un cas grave est toujours non léger, et le fichier n’a pas de classe grave",
    },
    forcesSeriousShare17: {
      label: "Toutes forces : part de cas graves au pic",
      method: "Publié : 7 cas graves dans la consolidation de 1 144",
    },
    forcesSeriousCount: {
      label: "Toutes forces : blessés graves, mouvement",
      method:
        "Plancher publié, centre par transfert de taux, plafond en ajoutant la part non légère post-pic",
    },
    forcesNotLightCount: {
      label: "Toutes forces : non classés légers, mouvement",
      method:
        "Le réel des CRS comme plancher, son taux transféré à 1 580 comme plafond",
    },
    crsShareOfForces: {
      label: "Part des CRS dans les blessés des forces en octobre",
      method: "1 233 rapportés à l’incrément d’octobre, toutes forces",
    },
    seriousShareMovement: {
      label: "Part de cas graves sur les 1 580",
      method:
        "Tirée de l’intervalle des cas graves, sur le dénominateur du ministère",
    },
    protestersSeriousFloor: {
      label: "Manifestant·es : blessés graves",
      method:
        "Registre des cas graves et des décès — un plancher, sans plafond disponible",
    },
    protestersSeriousShare: {
      label: "Manifestant·es : part de cas graves",
      method: "Déduite du nombre de pris en charge par cas grave (r = 5 à 30)",
    },
    bystandersSerious: {
      label: "Non-participant·es : blessés graves",
      method:
        "Aucun décompte n’existe — une lacune nommée, pas un chiffre manquant",
    },
  },
  assumptions: {
    seriousSubsetOfNotLight:
      "Une blessure grave est toujours aussi non classée légère.",
    rateTransfer:
      "La répartition par gravité ne change pas après le 17 octobre.",
    crsDominatesOctober:
      "Les CRS représentent 83 à 85 % des blessés des forces en octobre : leur taux vaut pour le reste.",
    declarationsNotPersons:
      "Les 1 580 du ministère et les 1 233 du fichier CRS comptent la même chose.",
    registerSelection:
      "Le registre ne contient que des cas graves : il peut être un plancher, jamais un taux.",
    treatedPerSerious:
      "Entre 5 et 30 personnes ont été prises en charge par cas grave.",
    singleDayProxy:
      "La répartition civile d’un jour vaut pour tout le mouvement.",
    listsNotIndependent:
      "Les listes partagent leurs sources : la capture–recapture ne s’applique pas.",
  },
  status: {
    publishable: "titre",
    note: "note de méthode",
    gap: "lacune déclarée",
  },
  edgePair: "{lo} à {hi}",
  ladder: {
    light: "Légères",
    residual: "Non classées légères — non résolues",
    serious: "Graves",
    vision: "Perte visuelle définitive",
    destruction: "Amputation ou destruction crânio-faciale",
    fatal: "Décès",
  },
  mix: {
    light: "Légères",
    residual: "Non légères, non graves",
    serious: "Graves",
  },
  bystanders: {
    documented: "Blessé·es hors participation, documenté·es",
    serious: "Dont cas graves",
    national: "Total national",
  },
  observations: {
    edu29: "29 septembre — 31 élèves et personnels blessés ce jour-là",
    edu30:
      "30 septembre — 119 blessés depuis le début (85 élèves, 34 personnels)",
    edu01:
      "1er octobre — 235 blessés depuis le début (170 élèves, 65 personnels)",
    edu05: "5 octobre — 300 blessés (215 élèves, 85 personnels)",
    reg12:
      "12 octobre — 1 proviseur, 1 parent d’élève, 1 agent de la Région (Île-de-France)",
    thines17:
      "17 octobre — 54 blessés graves et 1 décès, registre à cette date",
    toulouse17:
      "17 octobre — plus de 130 personnes prises en charge à Toulouse",
    civ24: "24 octobre — 150 civils blessés, dont 3 graves",
    thines05:
      "5 novembre — 78 blessés graves et 1 décès, registre à cette date",
    legal05: "5 novembre — 18 personnes ayant saisi des avocats",
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
  capMix:
    "Les 1 580 blessés des forces, en trois bandes exclusives qui font le total.",
  capPopulation:
    "Tous les décomptes de blessés du site, étiquetés par population et par mode de sélection.",
  capEstimate:
    "Chaque grandeur avec son intervalle, sa méthode et ce sur quoi reposent ses deux bornes.",
  capSensitivity:
    "Le total chez les manifestant·es selon le nombre de pris en charge par cas grave.",

  noteLevels:
    "Les 1 167 sur 1 233 constituent la seule part de blessés légers publiée : 94,6 %, le chiffre que le fichier énonce lui-même. Il porte sur les CRS en octobre : il ne s’étend ni à toutes les forces ni à tout le mouvement. Les 7 blessés graves relèvent de la consolidation de 1 144 du 17 octobre. Aucun total des blessures chez les manifestant·es n’a jamais été publié : aucune part ne peut donc être calculée de ce côté — les cas graves forment un registre, non un taux. Les quatre blessures accidentelles documentées sont quatre personnes nommées, non quatre pour cent de quoi que ce soit.",
  noteWeeks:
    "Le ministère publie un cumul, non une ventilation hebdomadaire de la gravité. Découper ce cumul en semaines est de l’arithmétique, et le total se recoupe exactement à 1 580, mais la seule ventilation léger / non léger existante est le fichier des CRS d’octobre, qui couvre quatre de ces semaines sans pouvoir être attribué à l’une d’elles. C’est pourquoi la section A porte la ventilation et la section B les incréments.",
  noteMix:
    "Les cas graves partent des 7 publiés et ne montent à 30 qu’en supposant que les blessés postérieurs au 17 octobre portent le taux non léger du fichier CRS. Les non légers non graves sont ce qui reste des 66 à 85 cas non légers une fois les graves retirés : ils ne peuvent donc jamais être comptés deux fois.",
  notePopulation:
    "Les décomptes du ministère de l’Éducation restent à part plutôt que d’être versés d’un côté ou de l’autre : le ministère dit en mots que des élèves ont été blessés accidentellement, par des « fauteurs de troubles » et par la police, sans jamais chiffrer la répartition. La cellule du 12 octobre est trois non-participants nommés ; elle a été retirée de la série des manifestant·es.",
  noteEstimate:
    "Chaque intervalle est une contrainte, non un intervalle de confiance : ses deux bornes reposent sur des preuves de nature différente et le tableau le dit. La capture–recapture n’est pas utilisée — les listes partagent leurs sources et ne sont pas indépendantes.",
  noteSensitivity:
    "Le 13 en gras est le rapport de Toulouse : plus de 130 prises en charge pour 54 cas graves. La bande qu’il produit est la largeur honnête de l’estimation : 390 à 2 340 pour le mouvement.",
  noteBystanders:
    "Le seul décompte de non-participants est de trois personnes dans une région et un jour. Rien ne compte le total national, rien n’enregistre leur gravité, et le chiffre civil du 24 octobre mêle toutes les causes à {proxy} de cas graves sans dire qui participait. Le vide est le résultat.",

  headLight: "{light} blessures déclarées sur {total} classées légères",
  headLightNote: "Agents des CRS, octobre 2026",
  headMissingNote:
    "Aucun total publié pour les blessures des manifestant·es : aucune part n’existe",
  headSeriousShare:
    "Les blessures graves représentent {lo} à {hi} des {total} blessés des forces",
  headSeriousCount:
    "Blessés graves : forces {forces} ; manifestant·es {protesters}",
  headMix: "{light} des {total} blessés des forces ont été classés légers",

  resolution: [
    {
      label: "Ventilation léger / grave",
      window: "Un mois (octobre 2026), CRS seulement",
      weekly: "non",
    },
    {
      label: "Part de cas graves, toutes forces",
      window: "Un jour (17 octobre)",
      weekly: "non",
    },
    {
      label: "Répartition par gravité des 1 580",
      window: "Un mois, transféré par taux",
      weekly: "non",
    },
    {
      label: "Nombre de cas graves, manifestant·es",
      window: "Mouvement à ce jour, registre",
      weekly: "non",
    },
    {
      label: "Nombre de cas graves, non-participant·es",
      window: "Aucune — aucun décompte",
      weekly: "non",
    },
    {
      label: "Ventilation accidentelle / conflictuelle",
      window: "Aucune — des cas nommés seulement",
      weekly: "non",
    },
    { label: "Cumul des forces blessées", window: "Un jour", weekly: "oui" },
    { label: "Incréments quotidiens", window: "Un jour", weekly: "oui" },
  ],
  capCity: "Décomptes à l’échelle d’une ville, par les street medics",

  colSource: "Recueil",

  breakdown: {
    lbd: "par tir de LBD",
    baton: "par coup de matraque",
    grenade: "par grenade de désencerclement",
    gas: "par gaz lacrymogène",
    cranialTraumaSuspected: "suspicions de trauma crânien",
  },

  provisional: "provisoire",

  teams: "équipes",
};

export const TEXT_EN = {
  panels: {
    partialWeek: "Week of {label} (partial)",
    act: "Act {n}",
    withAction: "{when} · {action}",
    seriesContinues: "{name} (cont.)",
    obs: "observations {counts} over {weeks}",
    valueRange: "{lo}–{hi}",
    itemMeta: "range {range} · up to week {n}",
    median: "median",
    peak: "peak",
    range: "min–max range",
    figureCount: "{n} published figures",
    singleFigure:
      "one published figure — the median and the peak are the same number",
    summaryMeta: "median and peak · {n} movements",
  },
  kpi: {
    heading: "Key figures",
    largestDay: "Largest day",
    largestWeek: "Largest week",
    largestFigure: "Largest figure",
    vsMean: "Highest vs mean",
    vsMedian: "Highest vs median",
    vsFirst: "Highest vs first figure",
    againstMean: "{value} against a mean of {base}",
    againstMedian: "{value} against a median of {base}",
    againstFirst: "{value} against a first figure of {base}",
    noteDaily:
      "Ratios are computed on the daily series: each published figure is divided by the mean, the median and the first published figure of its own series. Days with no published figure are left out, not counted as zero. The €1,000M damages total of 24 October carries no marker on the chart and is left out here too.",
    noteWeekly:
      "Ratios are computed on the weekly series: each published figure is divided by the mean, the median and the first published figure of its own series. Weeks with no published figure are left out, not counted as zero.",
    noteEpisodes:
      "Each movement is compared with its own series — its mean, its median and its first published figure — and the largest ratio across all seven movements is shown. A ratio of the first figure can run into the thousands when a movement began with a handful of people.",
    noteEpisodesCapped:
      "As in section C, but over the weeks plotted in section D only, which stop at the last week with an enforcement figure.",
    eurM: "€{v}M",
    none: "no figure published",
  },
  casualties: {
    headlineTitle: "How the injuries divide",
    weeklyTitle: "What a week can establish",

    colScope: "Population",
    colTotal: "Declared total",
    colSerious: "Serious",
    colLight: "Light",
    colLightShare: "Light share",
    colOther: "Not classed light",
    colSide: "Side",
    colCircumstance: "Circumstance",
    colCount: "Count",
    colCases: "Documented cases",
    colQuestion: "Question",
    colWindow: "Smallest published window",
    colWeekly: "Weekly figure",

    scope: {
      crsOctober: "CRS, October 2026",
      forcesPeak: "All forces, running total at its peak",
      protesters: "Protesters, since 30 September",
      week12oct: "Week of 12 October",
      week19oct: "Week of 19 October",
      week26oct: "Week of 26 October",
      week2nov: "Week of 2 November",
    },
    side: {
      forces: "Police and gendarmerie",
      protesters: "Protesters",
    },
    kind: {
      accidental: "Accidental or self-inflicted",
      conflictual: "Inflicted in the confrontation",
    },
    why: {
      notPublished: "not published",
      noDenominator: "no published total",
      binaryFile: "file is light / not light only",
      noTally: "no count, cases only",
      noneDocumented: "none documented",
    },
    cases: {
      givors:
        "Givors, 10 October: two officers on patrol outside a school burned on the hand and thigh when a grenade fired accidentally inside their own vehicle, setting it alight.",
      crsWrist:
        "A CRS officer bruised his left wrist closing his own vehicle door.",
      crsAnkle: "Another CRS officer sprained his ankle falling out of a van.",
      helmet:
        "Paris, 31 October: a CRS officer struck on the helmet, found uninjured — a little paint removed from the shell.",
      groin2023:
        "Sainte-Soline, March 2023, for comparison: of the 29 gendarmes counted, one had a groin haematoma, one respiratory trauma, the rest were examined for acoustic trauma.",
      mael: "Tours, 30 September: a school student blinded in one eye by a rubber bullet, having thrown nothing.",
      alaric:
        "Paris, 17 October: a 19-year-old student burned on the torso and arm by a tear-gas grenade fired flat at him; second-degree burns, unhealed ten days later.",
      eyes: "Several other minors lost an eye in the same circumstances.",
      sainteSoline:
        "The official claim was 29 gendarmes injured, two in absolute emergency. The two were later described as a groin haematoma and respiratory trauma.",
    },

    casesCount: "{n} documented cases",
    noCases: "none documented",

    capLevels:
      "Severity, by the finest window each source publishes. Rows are different populations and different windows — they are never summed.",
    capWeeks:
      "Severity, by week. The increment is the difference between the running total at the start and the end of the week.",
    capCases:
      "Circumstance. No source counts this, so the column gives the number of documented cases, not a share.",
    capResolution:
      "The smallest window at which each breakdown exists, and whether a weekly figure can be derived from it.",
    noteLevels:
      "The 1,167 of 1,233 is the only published light share: 94.6%, the figure the file itself states. It covers CRS officers in October, so it cannot be extended to all forces or to the whole movement. The 7 serious injuries belong to the 1,144 consolidation of 17 October. No total for protester injuries has ever been published, so no share can be computed on that side — the serious cases are a register, not a rate. The four documented accidental injuries are four named people, not four per cent of anything.",
    noteWeeks:
      "The ministry publishes a running total, not a weekly severity breakdown. Splitting the total into weeks is arithmetic, and it reconciles exactly to 1,580, but the only light/not-light split that exists is the October CRS file, which spans four of these weeks and cannot be attributed to any one of them. That is why section A carries the breakdown and section B carries the increments.",
    headLight: "{light} of {total} declared injuries were classed light",
    headLightNote: "CRS officers, October 2026",
    headMissingNote:
      "No published total for protester injuries, so no share exists",

    resolution: [
      {
        label: "Light / serious split",
        window: "One month (October 2026), CRS only",
        weekly: "no",
      },
      {
        label: "Accidental / conflictual split",
        window: "None — named cases only",
        weekly: "no",
      },
      {
        label: "Running total of injured forces",
        window: "One day",
        weekly: "yes",
      },
      {
        label: "Daily increments",
        window: "One day",
        weekly: "yes",
      },
    ],
  },
  items: {
    p: { label: "Protesters", short: "Protesters" },
    a: { label: "Arrests", short: "Arrests" },
    f: { label: "Injured — security forces", short: "Forces injured" },
    i: { label: "Injured — protesters", short: "Protesters injured" },
  },
  units: { weeks: "week" },
  flags: {
    n: "",
    r: "regional",
    p: "partial",
    e: "modelled",
    f: "floor",
    c: "stock",
    w: "weekly",
    x: "wider measure",
  }, // en
  tooltip: {
    linePlain: "{value}",
    lineWithFlag: "{value} · {flag}",
    firstFigure: "first published figure: {n}",
    shareOfFirst: "{pct} of the first figure ({n})",
    shareComparisons: "Comparisons: {list}",
    cmpHighest: "highest",
    cmpMean: "mean",
    cmpMedian: "median",
    cmpFirst: "first figure",
    listAnd: " and ",
  },
  disclaimer: {
    body: "Research and coding was performed using an LLM and figures have not been verified. Do not use them for serious analysis or decision-making without first double-checking the figures and the sources at the bottom.",
  },
};

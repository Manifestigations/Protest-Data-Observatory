/* English copy for the casualty section. Typed as CasualtyCopy on both sides, so
 * a key present in one locale and not the other fails `tsc`. */

import type { CasualtyCopy } from "../../copy/types.ts";

export const CASUALTY_EN: CasualtyCopy = {
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
  colPopulation: "Population counted",
  colParticipation: "Participating",
  colSelection: "How selected",
  colEstimate: "Estimand",
  colRange: "Range",
  colMethod: "Method",
  colEdges: "Edges",
  colStatus: "Status",
  colRatio: "Treated per serious case",
  colAt17: "17 October (54 serious)",
  colMovement: "Movement (78 serious)",

  scope: {
    crsOctober: "CRS, October 2026",
    forcesPeak: "All forces, running total at its peak",
    forcesMovement: "All forces, movement to 5 November",
    protesters: "Protesters, since 30 September",
    week12oct: "Week of 12 October",
    week19oct: "Week of 19 October",
    week26oct: "Week of 26 October",
    week2nov: "Week of 2 November",
  },
  side: { forces: "Police and gendarmerie", protesters: "Protesters" },
  kind: {
    accidental: "Accidental or self-inflicted",
    conflictual: "Inflicted in the confrontation",
  },
  population: {
    forces: "Police and gendarmerie",
    protesters: "Protesters",
    bystanders: "Bystanders",
    educationDeclared: "Students and education staff",
    mixed: "Civilians, cause not stated",
  },
  participation: {
    participating: "participating",
    "non-participating": "not participating",
    unknown: "unknown",
  },
  selection: {
    official: "official count",
    declared: "declaration",
    register: "case register",
    treated: "treated",
    legal: "legal clients",
    regional: "one region",
  },
  edge: {
    published: "published count",
    floor: "documented floor",
    ceiling: "modelled ceiling",
    transfer: "rate transfer",
    residual: "residual",
    bound: "structural bound",
    unbounded: "no bound exists",
  },
  why: {
    notPublished: "not published",
    noDenominator: "no published total",
    binaryFile: "file is light / not light only",
    noTally: "no count, cases only",
    noneDocumented: "none documented",
    universeMismatch: "different population, cannot transfer",
    noSeverityClass: "source has no severity class",
    registerOnly: "register of serious cases only",
    causeUnknown: "cause not published",
    notEstimable: "not estimable from these data",
  },
  estimates: {
    crsSeriousShare: {
      label: "CRS, October: serious share",
      method:
        "Nested bound — serious is a subset of not-light, and the file has no serious class",
    },
    forcesSeriousShare17: {
      label: "All forces: serious share at the peak",
      method: "Published: 7 serious in the 1,144 consolidation",
    },
    forcesSeriousCount: {
      label: "All forces: seriously injured, movement",
      method:
        "Floor published, central by rate transfer, ceiling by adding the post-peak not-light share",
    },
    forcesNotLightCount: {
      label: "All forces: not classed light, movement",
      method:
        "CRS actual as a floor, CRS rate transferred onto 1,580 as the ceiling",
    },
    crsShareOfForces: {
      label: "CRS share of all force injuries in October",
      method: "1,233 against October's all-forces increment",
    },
    seriousShareMovement: {
      label: "Serious share of the 1,580",
      method:
        "Derived from the serious count band, over the ministry's own denominator",
    },
    protestersSeriousFloor: {
      label: "Protesters: seriously injured",
      method:
        "Register of serious cases and deaths — a floor, with no ceiling available",
    },
    protestersSeriousShare: {
      label: "Protesters: serious share",
      method: "Inferred from people treated per serious case (r = 5 to 30)",
    },
    bystandersSerious: {
      label: "Bystanders: seriously injured",
      method: "No count exists — a named gap, not a missing number",
    },
  },
  assumptions: {
    seriousSubsetOfNotLight:
      "A serious injury is always also not classed light.",
    rateTransfer: "The severity mix does not change after 17 October.",
    crsDominatesOctober:
      "CRS is 83–85% of all force injuries in October, so its rate can stand in for the rest.",
    declarationsNotPersons:
      "The ministry's 1,580 and the CRS file's 1,233 count the same kind of thing.",
    registerSelection:
      "The register holds serious cases only, so it can be a floor but never a rate.",
    treatedPerSerious:
      "Between 5 and 30 people were treated for each serious case.",
    singleDayProxy: "One day's civilian mix stands in for the movement's.",
    listsNotIndependent:
      "The injury lists share sources, so capture–recapture does not apply.",
  },
  status: { publishable: "headline", note: "method note", gap: "declared gap" },
  edgePair: "{lo} to {hi}",
  ladder: {
    light: "Light",
    residual: "Not classed light — unresolved",
    serious: "Serious",
    vision: "Permanent visual loss",
    destruction: "Amputation or cranio-facial destruction",
    fatal: "Fatal",
  },
  mix: {
    light: "Light",
    residual: "Not light, not serious",
    serious: "Serious",
  },
  bystanders: {
    documented: "Injured while not protesting, documented",
    serious: "Serious among them",
    national: "National total",
  },
  observations: {
    edu29: "29 September — 31 students and staff injured that day",
    edu30: "30 September — 119 injured since the start (85 students, 34 staff)",
    edu01: "1 October — 235 injured since the start (170 students, 65 staff)",
    edu05: "5 October — 300 injured (215 students, 85 staff)",
    reg12:
      "12 October — 1 proviseur, 1 parent d'élève, 1 regional agent (Île-de-France)",
    thines17:
      "17 October — 54 seriously injured and 1 death, register to that date",
    toulouse17: "17 October — 130+ people treated in Toulouse",
    civ24: "24 October — 150 civilians injured, 3 seriously",
    thines05:
      "5 November — 78 seriously injured and 1 death, register to that date",
    legal05: "5 November — 18 people who instructed lawyers to sue",
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
  capMix:
    "The 1,580 force injuries, split into three bands that are mutually exclusive and add to the total.",
  capPopulation:
    "Every injury count the site holds, tagged with the population it counts and how it was selected.",
  capEstimate:
    "Each estimand with its range, its method and what the two edges of the range rest on.",
  capSensitivity:
    "The protester total as a function of people treated per serious case.",

  noteLevels:
    "The 1,167 of 1,233 is the only published light share: 94.6%, the figure the file itself states. It covers CRS officers in October, so it cannot be extended to all forces or to the whole movement. The 7 serious injuries belong to the 1,144 consolidation of 17 October. No total for protester injuries has ever been published, so no share can be computed on that side — the serious cases are a register, not a rate. The four documented accidental injuries are four named people, not four per cent of anything.",
  noteWeeks:
    "The ministry publishes a running total, not a weekly severity breakdown. Splitting the total into weeks is arithmetic, and it reconciles exactly to 1,580, but the only light/not-light split that exists is the October CRS file, which spans four of these weeks and cannot be attributed to any one of them. That is why section A carries the breakdown and section B carries the increments.",
  noteMix:
    "Serious is the published 7, raised to 30 only by assuming the post-17-October injuries carry the CRS file's not-light rate. Not light, not serious is what remains of the 66–85 not-light cases once serious is taken out, so it can never be added to serious twice.",
  notePopulation:
    "The education-ministry counts are held apart rather than folded into either side: the ministry says in words that students were hurt accidentally, by troublemakers and by police, and never quantifies the split. The 12 October cell is three named non-participants and has been removed from the protester series.",
  noteEstimate:
    "Every range here is a constraint, not a confidence interval: the two edges rest on different kinds of evidence and the table says which. Capture–recapture is not used — the injury lists share sources and are not independent.",
  noteSensitivity:
    "The 13 in bold is Toulouse's 130+ treatments against 54 serious cases. The band it produces is the honest width of the protester estimate: 390 to 2,340 for the movement.",
  noteBystanders:
    "The only bystander count in the dataset is three people in one region on one day. Nothing counts the national total and nothing records severity for them, and the 24 October civilian figure mixes all causes at {proxy} serious without saying who was participating. The emptiness is the finding.",

  headLight: "{light} of {total} declared injuries were classed light",
  headLightNote: "CRS officers, October 2026",
  headMissingNote:
    "No published total for protester injuries, so no share exists",
  headSeriousShare:
    "Serious injuries were {lo}–{hi} of the {total} injured forces",
  headSeriousCount:
    "Seriously injured: forces {forces}; protesters {protesters}",
  headMix: "{light} of the {total} force injuries were classed light",

  resolution: [
    {
      label: "Light / serious split",
      window: "One month (October 2026), CRS only",
      weekly: "no",
    },
    {
      label: "Serious share of all forces",
      window: "One day (17 October)",
      weekly: "no",
    },
    {
      label: "Severity mix of the 1,580",
      window: "One month, transferred by rate",
      weekly: "no",
    },
    {
      label: "Serious count, protesters",
      window: "Movement to date, register",
      weekly: "no",
    },
    {
      label: "Serious count, bystanders",
      window: "None — no count exists",
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
    { label: "Daily increments", window: "One day", weekly: "yes" },
  ],
};

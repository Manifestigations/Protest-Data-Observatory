import { suffixMap } from "../markers";
import type { ChartCopy } from "../types";

export const CHART_EN: ChartCopy = {
  axisDate: "Date",
  axisWeek: "Week",
  edgeMark: "†",
  weekOf: "Week of {date}",
  weekOfPartial: "Week of {date} (partial)",
  eurM: "€{v}M",
  suffix: suffixMap("en"),
  suffixWrap: " · {text}",
  dayNotes: {
    "2026-09-25":
      "Paris-area figure only: 21 interpellations by midday, announced by the Préfecture de Police.",
    "2026-09-28":
      "The movement goes national — actions in Marseille, Lille, the Rhône, the Var and the Alpes-Maritimes.",
    "2026-09-29":
      "Act I. The crowd figure counts the public-service cortège the school actions joined, not a student crowd. The strike series starts here: 250,000 state civil servants, derived from the government's 10% rate.",
    "2026-09-30":
      "The second day of Act I: 625 interpellations and 83 security forces injured. The Education ministry counted 356 establishments concerned; no count of fully blocked schools was published that day.",
    "2026-10-01":
      "Act II, the peak of the first week. Arrests and injuries published with no turnout figure for the day.",
    "2026-10-02":
      "735 establishments still perturbed, and urban violence near 158 of them.",
    "2026-10-03":
      "No weekend figure was published; the arrests for 3–4 October are derived by subtraction. 735 establishments perturbed — a wider measure than blockades, so the point is flagged as such.",
    "2026-10-05":
      "The first national school day after the break, with the ministry's stock figures.",
    "2026-10-06":
      "Act III — the first full national student demonstration of the movement.",
    "2026-10-07":
      "The Interior Ministry suspended the use of stun grenades for the student mobilisations, after a lycée student was injured at Lens.",
    "2026-10-09":
      "Justice Ministry publishes its first judicial balance: 6,877 in garde à vue since mid-September.",
    "2026-10-10":
      "CNEWS compiles a national damage bill of €30M — with no ministry tally behind it.",
    "2026-10-13":
      "Turnout band spans a factor of three: ministry floor, organiser ceiling.",
    "2026-10-16":
      "Last day of classes before the Toussaint holiday: from 17 October no lycée is in session, so the blockade count stops.",
    "2026-10-17":
      "The peak day. The damage band here is the 17–18 October IFRAP estimate, not a daily flow. Toussaint holiday — schools closed.",
    "2026-10-19":
      "Toussaint holiday — students supported the lycée movement from outside the schools.",
    "2026-10-24":
      "Arrest figures include preventive stops; not all become custody placements. Toussaint holiday — the mobilisation was an inter-union day, not a school day.",
    "2026-10-31":
      "No protester-injury figure was published for this day. Toussaint holiday — inter-union mobilisation.",
    "2026-11-01": "Last day of the Toussaint holiday.",
    "2026-11-04":
      "In the Rhône, seven establishments ran in remote mode; no lycée was reported blocked.",
    "2026-11-05":
      "Turnout band runs from 575 000 to 1.6 million — the band is the disagreement, not an error bar. The strike point is derived from the government's rates: 9.89–11% of state civil servants.",
    "2026-11-06":
      "In the Rhône, 16 lycées and two colleges saw incidents, and a lycée in Lyon's 8th arrondissement was blocked when it was cleared.",
    "2026-11-09":
      "In the Rhône, no lycée was blocked: 14 ran in remote mode and 11 were reported as affected. A zero cannot be plotted on a logarithmic axis, so it is recorded here rather than as a point.",
    "2026-11-10": "In the Rhône, about ten establishments were affected.",
  },
  obsNotes: {
    "2026-09-15": {
      blockades:
        "The lycée Victor-Hugo in Caen — the first mainland blockade. Villeneuve-d'Ascq was blocked on 14 September and Le Rheu on 7 September, both before the window opens.",
    },
    "2026-09-19": {
      blockades:
        "Lycée Saint-Exupéry in Créteil: students backed the teachers' strike with the school's first blockade — the origin of the national movement.",
    },
    "2026-09-23": {
      blockades:
        "Île-de-France only: the Créteil rectorate counted the blockades spreading to about ten lycées.",
    },
    "2026-09-25": {
      arrests: "Paris area only — Préfecture de Police figure, by midday.",
    },
    "2026-09-28": {
      protesterInjured:
        "One documented case: a 14-year-old hit by a police projectile. A floor, not a count.",
      blockades:
        "Interior Ministry: 27 complete blockades, out of 180 establishments perturbed.",
    },
    "2026-09-29": {
      turnout:
        "Counts the public-service cortège the school actions joined (206 000 ministry / 300 000 CGT), not a student crowd.",
      strikers:
        "Derived, not counted. 10% of the 2,500,000 state civil servants on strike (government figure), giving 250,000. Education is the largest component, not an addend: 11.47% of education staff (ministry weighted average — 12.74% second degree, 27.39% life-school staff; 13.71% of teachers) is 114,700 of the same civil service and is already inside the 250,000. Union claims (>40% of first-degree staff, >40% in Lyon and Créteil) are regional and are not used as a national ceiling.",
      protesterInjured:
        "Students and education staff injured that day, counted by the Education ministry.",
      blockades:
        "Education ministry at the time of its balance: 45 schools blocked out of 338 concerned. Le Monde counted actions at nearly 410 establishments.",
    },
    "2026-09-30": {
      protesterInjured:
        "Cumulative since the first blockades — a stock, not a daily count.",
      forcesInjuredStock:
        "The running total of injured security forces: 83 on 30 September, the first injury figures of the movement.",
    },
    "2026-10-01": {
      forcesInjured:
        "The day's own figure: 'some 300' injured in intervention on Thursday (Nuñez), 305 in Actu Forces' Beauvau tally. The running total that day was 383–388.",
      protesterInjured:
        "Cumulative level reached at the 1 October cut-off (170 students + 65 education staff) — a stock, not a daily count. Where a week ends on this cell, the level is the week’s figure, never the sum of the week’s flows.",
      damagesCost:
        "Part of the 1–8 October Île-de-France increment; the anchor of that run is 8 October.",
      blockades:
        "Low end: 222 schools blocked (Le Monde live, out of 1,027 establishments concerned). High end: the Union étudiante's 640. The police counted 169 blockades in the morning, and 900 actions with 400 closures by the end of the day.",
    },
    "2026-10-02": {
      blockades:
        "'More than 400 schools blocked' (Le Monde live). The Interior Ministry's own tally for 2 October: 1,027 lycées concerned, more than 560 perturbed, 400 closed.",
    },
    "2026-10-03": {
      arrests:
        "Derived by subtraction: the ministry's 6 059 since 28 September (published 5 October) less the published daily figures. Covers 3 and 4 October together.",
      blockades:
        "Wider measure: the Education ministry counted 735 establishments perturbed, not schools fully blocked. The highest blocked count that week was 400+ on 2 October.",
    },
    "2026-10-05": {
      arrests:
        "984 interpellations that day. The ministry's 6 059 since 28 September is the stock that makes the weekend figure checkable.",
      blockades:
        "Wider measure: 400 to 500 establishments closed (government spokeswoman), more than 400 to stay closed. The ministry's morning count was 413 establishments perturbed.",
      forcesInjuredStock:
        "Running total since the start of the movement: 715 injured police and gendarmes (Matignon).",
    },
    "2026-10-06": {
      damagesCost:
        "Part of the 1–8 October Île-de-France increment; the anchor of that run is 8 October.",
      blockades:
        "Wider measure: 891 of the 3,700 schools had their classes suspended, totally or partially, at midday (ministry). The USL counted 1,800 schools 'à l'arrêt' — a union figure that also includes administratively closed schools.",
    },
    "2026-10-08": {
      damagesCost:
        "Anchor of the 1–8 October Île-de-France damage increment. The same €6M is published for 6 October and is not counted twice.",
      strikers:
        "Derived, not counted. The Education ministry published a weighted participation rate of 0.82% for education staff; no function-wide rate was published that day, so the education rate stands in for the civil service on the same 2,500,000-agent base: 20,500. The proxy is known to run low — where both were published, education was 11.47% against about 10% for the civil service (29 Sept) and 12.77% against 10.46% (5 Nov).",
      blockades:
        "Wider measure: 224 establishments closed (ministry); more than 150 still perturbed (franceinfo). The 224 figure is the benchmark the ministry quotes back on 13 October.",
      forcesInjuredStock:
        "Running total: 761 injured (Nuñez). The published increments reconcile with it — 715 on 5 October plus 43 on 6 October is 758.",
    },
    "2026-10-09": {
      arrests:
        "Justice Ministry judicial balance, cut off 8 Oct 17:00: 6,877 people placed in garde à vue since the start of the movement, 86% minors, 2,376 being prosecuted, 21 in detention. A different scope (since mid-September) and a different statistic (custodial placements, not interpellations) from the Interior Ministry's series — not reconcilable with it.",
    },
    "2026-10-10": {
      damagesCost:
        "National cumulative stock since mid-September, compiled by CNEWS from regional figures — no ministry published a national tally. Pannekoucke's parallel €25–30M estimate for Auvergne-Rhône-Alpes is NOT included, so this is neither a floor nor additive with the regional figures.",
      blockades: "'More than 40 schools blocked' (AFP/Reuters, 10 October).",
    },
    "2026-10-12": {
      arrests:
        "13 interpellations reported independently by the Rhône prefecture (27 établissements touched) and the Bas-Rhin prefecture in Strasbourg. Two prefectures, the same number — so 13 is a floor for the day, not the day's regional total. Not Paris.",
      protesterInjured:
        "Île-de-France only: a proviseur, a parent d'élève and a Région employee injured. Counted as education and local-authority staff, on the same basis as the 29 September ministry figure.",
      damagesCost:
        'Normandy — Hervé Morin, Conseil régional de Normandie, at the regional assembly, 12 Oct: "1,5 million en Normandie" out of "d\'ores et déjà 30 millions d\'euros" nationally. A cumulative regional stock, not a daily flow, and a component of the national stock — never added to it. Île-de-France\'s own revised total the same day was €8.5M.',
      blockades:
        "Rhône prefecture only: 19 of the 27 establishments affected were lycées (six universities, two colleges). Île-de-France counted nearly 80 lycées perturbed the same day.",
    },
    "2026-10-13": {
      blockades:
        "Wider measure: 214 establishments closed, 94.2% of lycées open — against 224 on 8 October. The ministry called the movement 'en recul'.",
      strikers:
        "Derived, not counted. 3.71% weighted education participation (ministry), used as a proxy for the civil service on the 2,500,000-agent base: 92,750. Education's own rates that day: 4.52% of teachers, 10.31% of life-schools staff. The ministry's figure excludes Toulouse, La Réunion (school holidays since 10 October), Guadeloupe, Martinique and Guyana (time difference).",
    },
    "2026-10-14": {
      forcesInjuredStock: "Running total: 937 injured (Nuñez).",
    },
    "2026-10-17": {
      forcesInjured:
        "Derived: the ministry's running total rose from 937 (14 October) to 1,144 (17 October), so this is the three-day increment, not a single day.",
      forcesInjuredStock:
        "The peak of the running total: 997 injured in the first bilan, 1,144 on consolidation, 7 of them serious. This is the total since the movement began, not that day's toll.",
      protesterInjured:
        "Derived band: the floor is the serious-injury register, the ceiling is extrapolated from street-medics treatment counts. No official count exists.",
      damagesCost:
        "IFRAP modelled estimate for the 17–18 October weekend; excludes lost turnover and order-maintenance costs. The Paris-only estimate published for 18 October is a subset of it and is excluded from the weekly sum.",
    },
    "2026-10-18": {
      arrests: "Prefecture of police of Paris figure only — curfew day.",
      damagesCost:
        "Paris-only subset of the 17–18 October IFRAP total — never added to it.",
    },
    "2026-10-20": {
      arrests: "Guadeloupe prefecture figures only — regional.",
    },
    "2026-10-24": {
      damagesCost:
        "CCI France's national tally for 17–24 October — a superset of the 17 October cell, never added to it.",
      forcesInjuredStock:
        "Derived: 1,144 (17 October) plus 267 injured that day gives 1,411.",
    },
    "2026-10-31": {
      damagesCost: "Local estimate — no national damage figure was published.",
      forcesInjuredStock:
        "Derived: 1,411 plus 116–159 injured that day gives 1,527–1,570. An internal CRS file obtained by Mediapart counts 1,233 CRS agents declared injured in October, of whom 1,167 were classified as light injuries — 94.6%.",
    },
    "2026-11-02": {
      blockades:
        "Education ministry at 9.30: 41 lycées blocked, about 1% of the country's 3,700, with no perturbation in three quarters of the departments.",
    },
    "2026-11-03": {
      blockades:
        "Education ministry: 48 schools blocked. The USL counted nearly 500.",
    },
    "2026-11-05": {
      strikers:
        "Derived, not counted. The government put 9.89% of state civil servants on strike at midday and 11% by the end of the day, on 2,500,000 agents: 247,250 to 275,000 — the band is the timing of the count, not an error bar. Education: 12.77% of staff (ministry, excluding the Toulouse academy) = 127,700, a component of that total, never an addition to it. Excluded: local authorities 4.60% and public hospitals 3.93% (no headcount published), the SNES-FSU's 52% (narrower scope), and the CGT's “nearly 1.6 million on strike and in demonstrations”, which spans two populations and already bounds the turnout band above.",
      forcesInjured: "The day's own figure: 53 at 18:00, 112 on consolidation.",
      forcesInjuredStock:
        "The ministry's final running total: 1,580 injured since the start of the movement. It reconciles exactly with the published daily increments — 1,144 (17 October) + 267 (24 October) + 116 (31 October) + 53 (5 November) = 1,580.",
      protesterInjured: 'Published as a floor: "at least this many".',
      blockades:
        "Matignon at 10.00: 81 establishments blocked (2.2%). The USL counted 1,000 schools 'à l'arrêt' — blocked or administratively closed, so an upper bound. The Education ministry counted 33% of establishments perturbed.",
    },
    "2026-11-09": {
      arrests: "Regional prefecture figures only — Bordeaux, Lyon, Strasbourg.",
    },
    "2026-11-10": {
      strikers:
        "Derived, not counted. 1.55% weighted education participation (ministry), used as a proxy for the civil service on the 2,500,000-agent base: 38,750. Education's own rates: 1.60% of teachers, 7.01% of life-schools staff. The ministry's figure covers the metropolitan academies only.",
    },
  },
  actNotes: {
    /* ── far-right ──────────────────────────────────────────────────── */
    "act-2026-10-24-rouen-01":
      "Identitarian militants beat a man in central Rouen after the march dispersed, then left chanting 'Rouen nationaliste'. Nobody was arrested at the time; police passing through the group went to check the victim instead. The Rouen prosecutor opened an aggravated-violence enquiry on 26 October, after Blast published the video. 'Identitarian' is the prosecutor's word, not ours.",
    "act-2026-10-24-nancy-01":
      "Masked men threw projectiles at demonstrators, then sang La Marseillaise and placed themselves behind mobile gendarmes moving towards the march. No enquiry is reported, so the status stays at alleged. The account rests on a video published by Libération, which is why the attribution is journalistic rather than judicial.",
    "act-2026-10-24-montpellier-01":
      "The mayor described a 'far-right militia' using violence against demonstrators. The prosecutor opened an enquiry on 26 October 'to identify these individuals' and announced no charge, so the record carries none: an enquiry to identify people is not yet an accusation of a named offence.",
    "act-2026-10-24-nice-01":
      "Eleven suspected ultra-right militants were arrested before the march, and the Nice prosecutor announced they would be tried for criminal conspiracy to commit aggravated violence. The charge concerns an agreement to act, not the injuries: the prefecture reported three light injuries near the Old Nice without saying who caused them.",
    "act-2026-10-24-clermont-ferrand-01":
      "Black-clad individuals occupied a café terrace, gave Nazi salutes, unfurled flags and photographed themselves in front of the manager. No offence has been publicly characterised and no enquiry is reported, so there is no charge and the status is alleged. The record is here because the incident is documented; remove it if no offence is ever identified.",

    /* ── protesters ─────────────────────────────────────────────────── */
    "act-2026-10-17-limoges-01":
      "The Limoges prosecutor opened an attempted-homicide investigation after a protester was left with a serious head injury. The injury is counted once, in the casualty register; this record is its legal reading, not a second victim.",
    "act-2026-10-17-marseille-01":
      "Damage reported in Marseille during the 17 October demonstrations. No charge, no proceeding and no figure were published. The record marks that the act was reported; it does not count it.",
    "act-2026-10-17-lyon-01":
      "Arson reported in Lyon on 17 October. No published charge or proceeding. The record exists so the act is not lost, not so that it can be added to anything.",
    "act-2026-10-17-paris-01":
      "A trumpeter from the Vosges was prosecuted for taking part in an armed demonstration, after police found work gloves, a mask, a box of matches and a spanner on him near the Place de la République. The prosecution asked for six months; the court acquitted him. He also faced a charge of racially aggravated insult, recorded in this note rather than in a second record, because one act holds one charge.",

    /* ── sittings ───────────────────────────────────────────────────── */
    "sit-2026-10-19-paris":
      "Six adults were tried in immediate appearance, four of them before the 23rd chamber, division 1. Five of the six ended the day in detention, and one hearing was adjourned to 22 December with the defendant held in the meantime. Room and docket counts were not published: the six are defendants, not the court's capacity.",
    "sit-2026-10-20-paris":
      "Four courtrooms, twice the usual number, plus a fifth for guilty-plea procedures. Defence lawyers denounced a 'historic repression' and accused the justice minister of trying to force open the doors of the courts and guide the judges' pens. The reported constraint was arithmetic: cases arrived faster than they could be heard, and procedure risked annulment for breach of the delay within which a detained person must be brought to court. Most outcomes were suspended sentences, below what prosecutors sought.",
    "sit-2026-10-20-marseille":
      "Two courtrooms sat at full capacity. Neither docket nor outcomes were published, so the record holds a room count and nothing else.",
    "sit-2026-10-20-lyon":
      "Lyon sat the same day; no figure — rooms, docket or outcomes — was published. The empty fields are the finding: the national picture of 20 October is Paris-shaped because Paris is where the press was.",

    /* ── police ─────────────────────────────────────────────────────── */
    "act-2026-09-28-saint-ouen-laumone-01":
      "A stun grenade fired at close range during a lycée protest. The Interior Ministry suspended stun grenades for the student mobilisations on 7 October, nine days later — a suspension is an administrative decision, not a finding against the officer.",
    "act-2026-09-30-tours-01":
      "The date is derived, not reported: the source places the injury 'two days after' 28 September. The only record in this set to have left the enquiry stage — the officer was charged (mis en examen) on 29 October.",
    "act-2026-10-05-lens-01":
      "A stun grenade injury at a lycée in Lens. The suspension of stun grenades for student mobilisations followed two days later, and no outright ban has been ordered since. The record concerns the use, not the weapon.",
    "act-2026-10-17-limoges-02":
      "A grenade injury in Limoges on 17 October, entered separately from the attempted-homicide case of the same day. The reporting cited does not say whether one projectile caused both injuries: the two records are not a matched pair.",
    "act-2026-10-24-toulouse-01":
      "A grenade injury in Toulouse on 24 October, the day far-right groups clashed with protesters in several cities. The record concerns the police projectile, not those clashes — for which this dataset has no side.",
    "act-2026-10-17-paris-02":
      "A baton beating filmed at the edge of the Place de la République at about 16:00 on 17 October. The IGPN enquiry is the only proceeding known, and no unit is named in the reporting cited.",

    /* ── counterfactual register ────────────────────────────────────── */
    "nrm-2026-10-17-paris-orchestra":
      "Tear gas fired during the orchestra's set at the Place de la République gathering. Tested against the prohibition on indiscriminate attack: the crowd was not a military objective, and no method of direction could have made it one.",
    "nrm-2026-10-17-paris-gassing":
      "Mass gassing on 17 October, the day a 59-year-old man died after exposure, per the medical tally. The proportionality test asks whether the expected civilian harm was excessive to the military advantage anticipated — a question no French court will put, hence hypothetical.",
    "nrm-2026-10-05-lens-grenade":
      "No instrument in force prohibits stun grenades. The entry asks whether a close-range use causing irreversible injury would breach the rule against weapons of a nature to cause superfluous injury.",
    "nrm-2026-09-30-tours-lbd":
      "The LBD 40 is not a prohibited weapon. The question is the use: a defence-ball launcher fired at head height is one documented mechanism of blinding injury in this movement.",
    "nrm-2026-11-08-tear-gas-as-method":
      "CS is lawful for domestic riot control and unlawful as a method of warfare. Nothing here alleges the second; the entry marks where the line would fall.",
  },
  actNoteMissing:
    "No note has been written for this record yet — the record stands, its provenance is unstated.",
  deployNotes: {
    "2026-09-28": "deployment estimated",
    "2026-09-29": "deployment estimated",
    "2026-09-30": "deployment estimated",
    "2026-10-01": "deployment estimated",
    "2026-10-02": "deployment estimated",
    "2026-10-05": "deployment estimated",
    "2026-10-06": "deployment estimated",
    "2026-10-08": "deployment estimated",
    "2026-10-12": "estimated — Île-de-France, Lyon and Strasbourg",
    "2026-10-13": "deployment estimated",
    "2026-10-17": "deployment published",
    "2026-10-18": "estimated — Paris curfew",
    "2026-10-24": "deployment published",
    "2026-10-31": "deployment published",
    "2026-11-05": "deployment published",
    "2026-11-07": "deployment published",
  },
  policingDay: "{head} officers × {low}–{high} per officer-day · {note}",
  policingDayPlain: "{head} officers × {low}–{high} per officer-day",
  cumulativeAdded: "deployment counted this day — {days} so far",
  cumulativeCarried: "no deployment published — cumulative carried forward",
  weekNational: "{n} day{s} counted",
  weekRegionalOnly: "{n} day{s}, regional only",
  weekPeak: "peak {date}",
  weekNoNational: "no national figure this week",
  weekExcluded: "{n} point{s} excluded (regional or subset)",
  weekFloored: "includes a floor — not a sum",
  weekClipped: "week clipped by the window",
  weekJoin: " · ",
  tooltipRange: "{label}: {mid} (band {low}–{high})",
  tooltipPoint: "{label}: {value}",
  tooltipNote: "{base}\n{note}",
  footerMark: "ⓘ {note}",
  weekVacation: "partly inside the Toussaint holiday (17 Oct – 1 Nov)",
  holidayLine:
    "Dotted line: the Toussaint holiday, 17 October – 1 November 2026. No lycée was in session, so no school could be blocked — the count did not exist, it was not zero.",
  metricNote:
    "Schools blocked or closed: establishments where pupils could not attend normally. The band runs from the official count to the union count, and the union's figure also includes administratively closed schools.",
  blockerNote:
    "A wider measure than blockades — establishments perturbed, with classes suspended, or closed — used where it is the only figure published that day.",
  series: {
    protestersDaily: {
      label: "Protesters",
      detached: "Protesters (detached figure)",
    },
    strikersDaily: {
      label: "People on strike",
      detached: "People on strike (modelled)",
    },
    blockadesDaily: {
      label: "Schools blocked",
      detached: "Schools blocked (regional count)",
    },
    arrestsDaily: { label: "Arrests", detached: "Arrests (detached figure)" },
    forcesDaily: {
      label: "Injured — security forces",
      detached: "Injured forces (detached figure)",
    },
    forcesInjuredStock: {
      label: "Injured forces (running total)",
      detached: "Injured forces, running total (stock)",
    },
    protestersInjuredDaily: {
      label: "Injured — protesters",
      detached: "Injured protesters (detached figure)",
    },
    damagesDaily: {
      label: "Material damage",
      detached: "Damage (stock or modelled figure)",
    },
    policingDaily: {
      label: "Policing cost, per day",
      detached: "Policing cost, per day (modelled)",
    },
    policingCumulative: {
      label: "Policing cost, cumulative",
      detached: "Policing cost, cumulative (modelled)",
    },
    protestersWeekly: {
      label: "Protesters (weekly peak)",
      detached: "Protesters (regional week)",
    },
    strikersWeekly: {
      label: "People on strike (weekly peak)",
      detached: "People on strike (modelled)",
    },
    blockadesWeekly: {
      label: "Schools blocked (weekly peak)",
      detached: "Schools blocked (regional week)",
    },
    arrestsWeekly: {
      label: "Arrests (weekly total)",
      detached: "Arrests (regional week)",
    },
    forcesWeekly: {
      label: "Forces injured (weekly total)",
      detached: "Forces injured (regional week)",
    },
    protestersInjuredWeekly: {
      label: "Protesters injured (weekly total)",
      detached: "Protesters injured (regional week)",
    },
  },
  charts: {
    protestersDaily: {
      title: "Protesters, people on strike and blocked schools, daily",
      subtitle:
        "Crowd counts and people on strike on the left axis, school blockades on the right. People on strike is derived from published participation rates — no authority published a headcount. The dotted line is the Toussaint holiday. Three of the five strike points are derived.",
      y: "People in the street or on strike",
      yRight: "Schools blocked or closed",
    },
    enforcementDaily: {
      title: "Arrests and injuries, daily",
      subtitle:
        "Arrests are not custody placements; injuries are counted per side",
      y: "People",
    },
    cost: {
      title: "Damage and the cost of policing",
      subtitle: "",
      y: "€ millions",
    },
    protestersWeekly: {
      title: "Protesters, people on strike and blocked schools, weekly peak",
      subtitle:
        "Peak day of each week, not a weekly sum — the same lycée is blocked on several consecutive days, and a person on strike for three days is still one person",
      y: "People (peak day)",
      yRight: "Schools blocked or closed (peak)",
    },
    enforcementWeekly: {
      title: "Enforcement, weekly totals",
      subtitle: "Weekly sums; a stock or a floor is not additive",
      y: "People (weekly total)",
    },
  },
};

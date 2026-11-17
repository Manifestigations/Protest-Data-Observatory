/* The 2026 daily record: every published cell, with its verification
   comments. The verification passes and the arithmetic cross-checks are
   recorded in data.ts, the entry point of this data layer. */

import type { MetricKey } from "../model/index.ts";
import type { Obs } from "./types.ts";

export const FACTS: Readonly<Record<string, Partial<Record<MetricKey, Obs>>>> =
  {
    /* ── School blockades ─────────────────────────────────────────────────
       Metric: establishments where pupils could not attend normally —
       blocked, or closed by decision. Band = official count (floor) to
       union count (ceiling); the union's "à l'arrêt" also counts
       administratively closed schools, so the ceiling is an upper bound.

       "x" = a wider measure than blockades (établissements perturbés,
       cours suspendus, établissements fermés) — the only figure published
       that day. "r" = regional count. "f" = publisher said "more than".

       Days with no published count stay empty. During the Toussaint
       holiday (17 Oct – 1 Nov) no lycée was in session, so the metric did
       not exist: those days are empty and the connector is dotted.       */

    /* ── The movement's first fortnight ─────────────────────────────────────
       The wave began after the rentrée: teachers and parents had been on
       strike in Mayotte since 31 August (lycée Nord d'Acoua, blocked for
       five weeks); in mainland France the lycée Théodore-Monod at Le Rheu
       was blocked on 7 September, the lycée Queneau at Villeneuve-d'Ascq on
       14 September and the lycée Victor-Hugo at Caen on 15 September. The
       window opens on 15 September at the user's request, so the 7 and 14
       September blockades fall outside it.

       NONE of 15–27 September carries a published turnout, arrest, injury or
       damage figure, so the week of 14–20 September is empty rather than
       estimated. The one exception is the Paris area on 25 September. */

    "2026-09-15": { blockades: { low: 1, high: 1 } },
    "2026-09-19": { blockades: { low: 1, high: 1 } },
    "2026-09-23": { blockades: { low: 10, high: 10, q: "r" } },

    /* Fri 25 Sep — the Île-de-France centre of gravity: ~60 franciliens
       lycées disrupted over 24–25 Sep, mainly Seine-Saint-Denis and
       Val-de-Marne (Saint-Denis, Sarcelles, Gonesse, Stains, Saint-Ouen,
       Rosny-sous-Bois, La Courneuve); the Créteil rectorat counted a
       "grosse dizaine" of new blockades that day.
       21 interpellations by noon by the Préfecture de Police, in connection
       with the Paris-area mobilisations — PARIS ONLY, hence "r". The
       rectorat noted gatherings, crowd movements and material damage
       without quantifying them. */
    "2026-09-25": {
      arrests: { low: 21, high: 21, q: "r" },
    },

    /* Mon 28 Sep — the movement goes national: actions in Marseille, Lille,
       the Rhône, the Var and the Alpes-Maritimes. Interior Ministry: 180
       establishments perturbed, 27 of them totally blocked, 164
       interpellations that day.
       First serious injury of the movement: a 14-year-old hit in the face
       by a police projectile at the lycée professionnel Château-d'Epluches,
       Saint-Ouen-l'Aumône (Val-d'Oise); the IGPN was seized. Flagged "f":
       one documented casualty is a minimum, not a count. */
    "2026-09-28": {
      arrests: { low: 164, high: 164 },
      protesterInjured: { low: 1, high: 1, q: "f" },
      blockades: { low: 27, high: 27 },
    },

    /* Tue 29 Sep — national public-service mobilisation day, which the USL
       called students to join; it is the movement's Act I.
       Education ministry, end of day: 416 establishments touched since the
       morning, 338 still affected, 45 blocked; Le Monde counted actions at
       nearly 410 establishments; the USL claimed 400 blocked out of ~3,700
       in France. 440 interpellations, two thirds of them leading to a garde
       à vue, "essentially for degradations and attacks on officers"
       (Nuñez, BFM-TV).
       Turnout: the intersyndicale demonstration drew 206,000 (ministry) /
       300,000 (CGT) nationwide and 30,000 / 70,000 in Paris, across 170+
       demonstrations. The students marched with it, so the figure is
       carried here — but it counts the public-service cortèges, not a
       student crowd, for which no national count exists. Flagged "p".
       The Education ministry counted 31 injured students and staff that
       day. Strike rate: 11.47% weighted (12.74% second degree, 27.39%
       life-schools staff; 13.71% of teachers). */
    "2026-09-29": {
      turnout: { low: 206_000, high: 300_000, q: "p" },
      strikers: { low: 250_000, high: 250_000, q: "e" },
      arrests: { low: 440, high: 440 },
      protesterInjured: { low: 31, high: 31, q: "p" },
      blockades: { low: 45, high: 45 },
    },

    /* Wed 30 Sep — 356 establishments perturbed; 625 interpellations that
       day, which with 440 on the 29th makes the two-day total 1,065.
       83 police and gendarmes injured.
       The Education ministry's stock since the start of the blockades
       reaches 119 injured students and staff (85 students, 34 staff) — a
       cumulative level, hence "c". */
    "2026-09-30": {
      arrests: { low: 625, high: 625 },
      protesterInjured: { low: 119, high: 119, q: "c" },
    },

    /* Thu 1 Oct — Acte II. More than 900 actions and blockages; AFP's police
       returns counted 340 actions in the morning and 169 blockades, ending
       the day at 900 actions including 400 closures; the Union étudiante
       claimed 640 lycées and ~30 campuses blocked, a figure the authorities
       do not confirm. Marseille: 18 high schools totally blocked, 3
       partially, ~40 in Bouches-du-Rhône; Aix-en-Provence ~600 students;
       Metz 6; Brest most; Épinal 2; Perpignan 11 interpellations and one
       student injured. No national turnout figure was published.

       FIX 5: arrests 1,949 are THAT DAY ("1 949 interpellations ce jeudi"),
       not a stock; the only stock is 6,059 "depuis le 28 septembre" on
       5 Oct. The day was the peak of the first week.

       FIX 7: forces injured are bracketed [83, 300] — 83 is the
       government level at the Wednesday cut-off (it is the same 83 that
       appears in the 318-injury total of 1 Oct) and ~300 is Nuñez's
       Thursday figure ("quelque 300 policiers et gendarmes blessés en
       intervention jeudi"). The band spans a cumulative level and a daily
       flow, so it is flagged "e" and the 83 is not counted twice.

       FIX 6: 235 = 170 students + 65 education staff, cumulative at the
       1 Oct cut-off; the previous 119–235 band was two vintages of this
       same series. Flagged "c".

       Damage: the hall of the lycée Nelson-Mandela in Nantes was destroyed
       by a fire (several classrooms unusable for weeks), as was the main
       entrance and a 35-classroom block at the lycée Henri-Moissan in
       Meaux; the façade of the lycée Lumière in Lyon was burnt; in
       Seine-Maritime two headteachers were hurt (Petit-Quevilly, Rouen) and
       the prefecture counted eight injured and several intrusions. The €1M
       cell is a local estimate from the original research and is a subset
       of the larger Île-de-France and IFRAP totals, hence "c". */
    "2026-10-01": {
      arrests: { low: 1_949, high: 1_949 },
      forcesInjured: { low: 300, high: 305, q: "e" },
      protesterInjured: { low: 235, high: 235, q: "c" },
      damagesCost: { low: 1, high: 1, q: "c" },
      blockades: { low: 222, high: 640 },
    },

    /* Fri 2 Oct — 1,747 interpellations that day and "more than 5,000 since
       Monday" (the daily series gives 4,925); 735 establishments perturbed,
       30% fewer than the day before, with urban violence near 158 of them
       (projectiles, attacks on officers, teachers, journalists and
       passers-by). A young police lieutenant was assaulted in Paris's 20th
       arrondissement. Geffray: 65 education staff injured since the start
       of the movement, 40 of them headteachers. */
    "2026-10-02": {
      arrests: { low: 1_747, high: 1_747 },
      blockades: { low: 400, high: 400, q: "f" },
    },

    /* Sat 3 Oct — the ministry's stock "6,059 interpellations since
       28 September" (5 Oct) minus 984 on Monday 5 Oct leaves 5,075 through
       Sunday 4 Oct; the daily figures for 28 Sep–2 Oct sum to 4,925. The
       difference, 150, is the weekend of 3–4 October. It is a two-day total
       derived by subtraction, not a Saturday figure — flagged "e" and
       carried on the Saturday, with the derivation in this comment. */
    "2026-10-03": {
      arrests: { low: 150, high: 150, q: "e" },
      blockades: { low: 735, high: 735, q: "x" },
    },

    /* Mon 5 Oct — 984 interpellations and 65 forces injured that day.
       Stocks published the same day: 6,059 interpellations since 28 Sep;
       715 police and gendarmes injured since the start of the movement;
       Matignon: 215 students and 85 education staff injured since the
       start, 34 of them headteachers. */
    "2026-10-05": {
      arrests: { low: 984, high: 984 },
      forcesInjured: { low: 65, high: 65 },
      blockades: { low: 400, high: 500, q: "x" },
    },

    /* Tue 6 Oct — "Acte III", first national school/student day.
       256,000 ministry / 450,000 organisers; Paris 56,000 / 100,000.
       488 interpellations and 43 forces injured that day; 215 students
       injured since mid-September. The €6M is the Île-de-France damage
       increment for the 1–8 Oct run and is therefore a subset, not an
       increment unique to 6 Oct. Flagged "c"; the anchor of the run is
       8 Oct. */
    "2026-10-06": {
      turnout: { low: 256_000, high: 450_000 },
      arrests: { low: 488, high: 488 },
      forcesInjured: { low: 43, high: 43 },
      damagesCost: { low: 6, high: 6, q: "c" },
      blockades: { low: 891, high: 1_800, q: "x" },
    },

    /* Thu 8 Oct — Act IV. Education ministry: 0.82% weighted all staff
       (teachers 0.99%, 1st degree 0.10%, 2nd degree 1.67%, vie scolaire
       2.33%, other staff 0.45%), excluding Toulouse, Nantes and Corse.
       The lowest rate of the whole sequence, in the middle of the
       mobilisation — the school action had drained by 8 Oct. */
    "2026-10-08": {
      turnout: { low: 71_500, high: 130_000 },
      /* Education ministry 0.82% weighted; no function-wide rate that day,
         so the education rate stands in for the civil service on the same
         2,500,000-agent base: 20,500. Flagged "e" — the proxy runs low. */
      strikers: { low: 20_500, high: 20_500, q: "e" },
      damagesCost: { low: 6, high: 6, q: "e" },
      blockades: { low: 224, high: 224, q: "x" },
    },

    /* Sat 10 Oct — national cumulative damage stock: "déjà estimées à
       30 millions d'euros en France" since mid-September (CNEWS's own
       compilation of regional figures — no ministry published a national
       tally). Pannekoucke's parallel AURA estimate of €25–30M is NOT
       included, so this is neither a floor nor additive with the regional
       figures. Flagged "c": a stock, never summed with flows. */
    "2026-10-10": {
      damagesCost: { low: 30, high: 30, q: "c" },
      blockades: { low: 40, high: 40, q: "f" },
    },

    /* Mon 12 Oct — three regional prefecture figures, all regional:
         · Rhône: 27 établissements touchés (19 lycées, 6 universités,
           2 collèges), 13 interpellations.
         · Bas-Rhin/Strasbourg: 13 interpellations (préfecture), incl. 4
           for preparing incendiary devices, 3 for mortar fire.
       Two prefectures published 13 independently, so 13 is a FLOOR for the
       day, not the day's regional total. NOT Paris — the old note was
       wrong.
       FIX 13 (third pass): the €1.5M moved here from 13 Oct. It is
       NORMANDY (Hervé Morin, Conseil régional de Normandie, 12 Oct) and
       it is a CUMULATIVE stock since mid-September — "atteint d'ores et
       déjà 30 millions d'euros, dont 1,5 million en Normandie" — so the
       flag moves from "e" to "c". Île-de-France's own revised total the
       same day was €8.5M (110+ lycées, ~120 portails/sas out of service).
       Both regional stocks are components of the €30M national stock and
       must never be added to it.
       The 3 injured are an Île-de-France figure and count education and
       local-authority staff, not protesters: 1 proviseur, 1 parent
       d'élève, 1 agent de la Région. */
    "2026-10-12": {
      arrests: { low: 13, high: 13, q: "r" },
      damagesCost: { low: 1.5, high: 1.5, q: "c" },
      blockades: { low: 19, high: 19, q: "r" },
    },

    /* Tue 13 Oct — "Acte V": 214 high schools closed (94.2% open), 161,500
       ministry / 480,000 youth intersyndicate (41,500 Paris), 40 police
       and gendarmes injured.
       FIX 13 (third pass): the €1.5M cell is GONE from this date — it
       was Normandy, and it was published on 12 October. */
    "2026-10-13": {
      turnout: { low: 161_500, high: 480_000 },
      /* 3.71% weighted education rate as proxy: 3.71% x 2,500,000 = 92,750. */
      strikers: { low: 92_750, high: 92_750, q: "e" },
      forcesInjured: { low: 40, high: 40 },
      blockades: { low: 214, high: 214, q: "x" },
    },

    /* Sat 17 Oct — the peak of the episode.
       110 → 430 → 441 actions; ~60,000 officers deployed.
       550,000 ministry / 800,000 organisers; Paris 110,000.
       Arrests 2,397 initial → 2,628 consolidated (2,513 gardes à vue;
       108 in Paris). Forces injured 997 initial → 1,144 consolidated,
       7 serious. One civilian death: Christophe M., 59, Paris.

       FIX 2 (first pass): no official protester-injury count exists. The
       low bound is Laurent Thines's serious-injury register (54 seriously
       injured — 5 eye, 5 cranio-facial, 2 amputations, 42 other — plus the
       1 death, i.e. 55); the high bound is a reasoned ceiling from
       Toulouse's 130+ street-medics treatments (~13 treated per serious
       case) against 54 serious cases nationally. Wikipedia's "400+ civilians"
       is an uncited infobox line and sits below the partial nine-city sum
       (~204 across Bordeaux, Clermont-Ferrand, Dijon, Metz, Nancy, Rouen,
       Strasbourg, Avignon, Toulouse), so it is a floor, not a ceiling.
       Flagged "e": derived, drawn hollow.

       Damages: IFRAP conditional estimate for the 17–18 Oct weekend,
       €244M low / €463M central / €866M high for MATERIAL damage; the
       €294M–€1.1bn variant includes lost turnover and is a different measure.
       IFRAP excludes marginal order-maintenance and curfew costs. */
    "2026-10-17": {
      turnout: { low: 550_000, high: 800_000 },
      arrests: { low: 2_397, high: 2_628 },
      forcesInjured: { low: 207, high: 207, q: "e" },
      /* 54 x 13 = 702 — see E8/E10 in casualties/estimate.ts. */
      protesterInjured: { low: 55, high: 702, q: "e" },
      damagesCost: { low: 244, high: 866, q: "e" },
    },

    /* Sun 18 Oct — Paris curfew only, 108 interpellations.
       FIX 3 (first pass): the €1.8–5M damage figure is a subset of the
       17–18 Oct IFRAP weekend total, so it is flagged "c" and cannot be
       added to it.
       FIX 11 (third pass): "r", not "p" — the figure is Paris-only, and
       "p" now means partial coverage. */
    "2026-10-18": {
      arrests: { low: 108, high: 108, q: "r" },
      damagesCost: { low: 1.8, high: 5, q: "c" },
    },

    /* Tue 20 Oct — regional only: 13 interpellations overnight in Guadeloupe
       (Basse-Terre, Saint-François, Goyave, Vieux-Habitants, Gosier). */
    "2026-10-20": { arrests: { low: 13, high: 13, q: "r" } },

    /* Sat 24 Oct — 289 actions, 70,000 officers, Centaure AFVs, water cannons,
       14 aerial cameras in Paris. 410,000 ministry / 800,000+ CGT;
       Paris 110,000 (préfecture) / 250,000 (CGT).
       Arrests 1,314 initial → 1,435 final (142 Paris, 126 GàV).
       Forces injured 53 at 7:30 a.m. — the ministry's own communiqué calls
       this "provisoire" — then 267 on consolidation (Nuñez, 26 Oct), with
       150 civilians injured, 3 seriously. 75 fire interventions.
       La Réunion: ~80 Saint-Denis, 300 Saint-Pierre. Mayotte: Tsingoni.
       FIX 4 (first pass): the national damage cell below replaces the earlier
       local derivation. CCI France's 27 Oct tally — 2,488 shops hit after the
       17th plus 50 after the 24th, 1,161 heavily damaged, 643 still shut —
       puts the cost of the degradations at over €1bn on the IFRAP estimate,
       for the 17–24 Oct period as a whole. That is a SUPERSET of the 17 Oct
       cell, so it is flagged "c" and is never added to it. */
    "2026-10-24": {
      turnout: { low: 410_000, high: 800_000 },
      arrests: { low: 1_314, high: 1_435 },
      forcesInjured: { low: 267, high: 267 },
      protesterInjured: { low: 150, high: 150 },
      damagesCost: { low: 1_000, high: 1_000, q: "c" },
    },

    /* Sat 31 Oct — 291 actions → 227 consolidated.
       320,000 ministry / ~500,000 youth organisations; Paris 70,000.
       Arrests 565 at 21h → 779 cumulative (incl. 214 on the Halloween night).
       Forces injured 116 by 21h + 43 that night = 159.
       515 fires handled; 36 shops degraded, 3 pillaged — no cost figure. */
    "2026-10-31": {
      turnout: { low: 320_000, high: 500_000 },
      arrests: { low: 565, high: 779 },
      forcesInjured: { low: 116, high: 159 },
      damagesCost: { low: 0.4, high: 3.3, q: "e" },
    },

    "2026-11-02": { blockades: { low: 41, high: 41 } },
    "2026-11-03": { blockades: { low: 48, high: 500 } },

    /* Thu 5 Nov — national strike day, 193 actions.
       575,000 ministry (definitive) / 1.6M CGT; Paris 65,000 / 350,000.
       Arrests 448 at 18h → 642 updated. Forces injured 53 at 18h → 112.
       86 fire interventions. Marseille: 17 schools blocked, ~40 interpellations,
       13 police wounded.
       Protester injuries = 18, a FLOOR: the 18 who instructed lawyers to sue
       Nuñez. Not a ministry count. */
    "2026-11-05": {
      turnout: { low: 575_000, high: 1_600_000 },
      strikers: { low: 247_250, high: 275_000, q: "e" },
      arrests: { low: 448, high: 642 },
      forcesInjured: { low: 53, high: 112 },
      protesterInjured: { low: 18, high: 18, q: "f" },
      blockades: { low: 81, high: 1_000 },
    },

    /* Sat 7 Nov — 141 actions; ~70,000 officers, 25 blindés, 15 water-cannon
       trucks; ~40,000 preventive checks; Caen campus dispersed by 50 CRS.
       146,000 ministry / 250,000 youth intersyndicate; Paris 46,000 / 75,000.
       Arrests 232 at 18h → 360+ at 19h.
       Security-force casualties acknowledged but no number published. */
    "2026-11-07": {
      turnout: { low: 146_000, high: 250_000 },
      arrests: { low: 350, high: 360 },
    },

    /* Mon 9 Nov — regional only: Bègles 4, Lyon 8, Strasbourg 5 = 17.
       ~50 Île-de-France schools disrupted with mortar fire; Rennes 2
       evacuated; Brest rally; Guadeloupe: lycée blocked at Baie-Mahault. */
    "2026-11-09": { arrests: { low: 17, high: 17, q: "r" } },

    "2026-11-10": {
      /* Education strike + student march. 1.55% weighted rate as proxy:
         1.55% x 2,500,000 = 38,750. */
      strikers: { low: 38_750, high: 38_750, q: "e" },
    },
  };

/* Every published input the severity work rests on, with the source id it came
 * from. Nothing here is derived: estimate.ts derives, checks.ts asserts the
 * derivations against these constants. */

export const CRS_OCTOBER = {
  /** Médiapart 13 Nov 2026, internal CRS file, October 2026, CRS only. */
  declared: 1_233,
  light: 1_167,
  /** The file has two categories and no "serious" one. */
  serious: null,
  sources: ["mediapart-crs-blesses-1311"],
} as const;

export const FORCES = {
  /** Ministry running totals (FORCES_STOCK in data.ts). */
  stock30Sep: 83,
  stock14Oct: 937,
  stock17Oct: 1_144,
  serious17Oct: 7,
  stock31Oct: { lo: 1_527, hi: 1_570 },
  movement: 1_580,
  increments: {
    to14Oct: 854,
    week12oct: 207,
    week19oct: 267,
    week26oct: 116,
    week2nov: 53,
  },
  sources: ["bfmtv-bilan-17oct"],
} as const;

/* Thines's register: serious cases only, built from press, militant blogs and
 * IGPN referrals. No denominator, and the lists are not independent. */
export const THINES = {
  seriousTo5Nov: 78,
  deathsTo5Nov: 1,
  seriousAt17Oct: 54, // 5 eye + 5 cranio-facial + 2 amputations + 42 other
  sources: ["lemonde-blessures-0511"],
} as const;

/* Interior Ministry, 26 Oct: 150 civilians injured, 3 seriously. One day. */
export const CIVILIANS_24OCT = {
  injured: 150,
  serious: 3,
  sources: [],
} as const;

/* Toulouse street medics, 17 Oct: 130+ treated. The only treated-per-serious
 * anchor in the dataset. */
export const TOULOUSE = {
  treated: 130,
  date: "2026-10-17",
  sources: ["mediacites-toulouse-17oct"],
} as const;

/* Education ministry: 31 (29 Sep), 119 (30 Sep), 235 (1 Oct, cumulative),
 * 300 by 5 Oct (215 students + 85 staff). Cause is stated in words by the
 * ministry and never quantified, hence participation "unknown" everywhere. */
export const EDUCATION = { d29: 31, d30: 119, d01: 235, d05: 300 } as const;

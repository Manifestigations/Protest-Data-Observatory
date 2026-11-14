import type { EpisodeCopy } from "../types";

export const EPISODES_EN: Record<string, EpisodeCopy> = {
  may68: {
    short: "May 68",
    strip: "May 68",
    banner:
      "General strike and factory occupations. Union and ministry crowd counts differ by a factor of ten, so both are plotted.",
    weeks: [
      { action: "1 May marches" },
      {
        action: "Night of the barricades, 10–11 May",
        note: { i: "Injury figure published as a floor." },
      },
      { action: "General strike from 13 May" },
      {
        action: "24 May: de Gaulle’s broadcast",
        note: { a: "Arrest count published as a floor." },
      },
      { action: "Grenelle agreements, 27 May" },
      { action: "Legislative campaign" },
      undefined,
      undefined,
      undefined,
    ],
  },
  cpe: {
    short: "CPE 2006",
    strip: "CPE 2006",
    banner:
      "First-employment contract: student and school movement, with two inter-union days. Enforcement figures exist for four weeks only.",
    weeks: [
      { action: "7 February: first national day" },
      undefined,
      undefined,
      undefined,
      { action: "Blockaded universities" },
      { action: "14 March: national day" },
      { action: "21 March: student day" },
      { action: "28 March: national day" },
      { action: "4 April: national day" },
      { action: "Withdrawal announced" },
    ],
  },
  gj: {
    short: "Gilets jaunes",
    strip: "Gilets jaunes",
    banner:
      "Counted act by act, on Saturdays only. Enforcement figures were published for the first four acts and never as a series afterwards.",
    weeks: [], // the act number in the tooltip title carries the chronology
  },
  nahel: {
    short: "June 2023",
    strip: "June 2023",
    banner:
      "Five nights of rioting after the 27 June killing. Arrests and injuries are high relative to turnout because this was not a demonstration.",
    weeks: [{ action: "27 June: riots begin" }, { action: "Return to calm" }],
  },
  pensions: {
    short: "Pensions 2023",
    strip: "Pensions 2023",
    banner:
      "Movement against the rise in the statutory retirement age. Two anchor days carry most of the series; the inter-union band is wide.",
    weeks: [
      { action: "19 January: first national day" },
      undefined,
      { action: "31 January" },
      { action: "7 February" },
      { action: "16 February" },
      undefined,
      undefined,
      { action: "7 March: schools and transport shut" },
      { action: "11 March" },
      { action: "15 March" },
      { action: "23 March" },
      { action: "28 March" },
      { action: "6 April" },
      undefined,
      undefined,
      undefined,
      { action: "1 May" },
      undefined,
      undefined,
      undefined,
      { action: "6 June" },
    ],
  },
  bt: {
    short: "Bloquons tout",
    strip: "Bloquons tout",
    banner:
      "September 2025: blockades and marches, counted partially. Weeks without a published figure are left empty.",
    weeks: [
      { action: "10 September: blockades" },
      { action: "18 September: national day" },
      undefined,
      { action: "1 October" },
    ],
  },
  students26: {
    short: "Autumn 2026",
    strip: "Autumn 2026",
    banner:
      "The movement this page was built for, traced from the first mainland high-school blockades on 15 September. Daily publication, so days with no figure stay empty rather than interpolated.",
    weeks: [
      { action: "15 September: the Caen and Villeneuve-d'Ascq blockades" },
      { action: "25 September: Paris-area blockades" },
      { action: "Act I on 29 September, Act II on 1 October" },
      { action: "Act III on 6 October" },
      { action: "17 October: the peak" },
      { action: "24 October" },
      { action: "31 October" },
      { action: "5 and 7 November" },
      { action: "9 November — window ends 11 November" },
    ],
    fallbackNote: {
      p: "Weekly peak taken from the daily series — the peak day of the week.",
      a: "Sum of the published daily figures for the week; a cumulative stock is shown as the stock, never added to it.",
    },
  },
};

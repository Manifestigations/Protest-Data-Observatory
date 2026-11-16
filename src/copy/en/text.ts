import { CASUALTY_EN } from "../../sections/casualties/copy.en";
import { flagMap } from "../markers";

export const TEXT_EN = {
  panels: {
    partialWeek: "Week of {label} (partial)",
    act: "Act {n}",
    withAction: "{when} · {action}",
    seriesContinues: "{name} (cont.)",
    obs: "observations: {counts}",
    obsSep: " · ",
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
      "Over the weeks plotted here only, which stop at the last week with an enforcement figure.",
    eurM: "€{v}M",
    none: "no figure published",
  },
  casualties: CASUALTY_EN,
  items: {
    p: { label: "Protesters", short: "Protesters" },
    a: { label: "Arrests", short: "Arrests" },
    f: { label: "Injured — security forces", short: "Forces injured" },
    i: { label: "Injured — protesters", short: "Protesters injured" },
  },
  units: { weeks: "week" },
  flags: flagMap("en"),
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

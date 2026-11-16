import type { LocaleMeta } from "../types";

export const EN_META: LocaleMeta = {
  tag: "en-GB",
  label: "English",
  meta: {
    htmlLang: "en",
    title: "Protest activity in France — 15 September – 11 November 2026",
    description:
      "Turnout, arrests, injuries and damage in the autumn 2026 movement, set against six earlier French movements.",
  },
  sections: {
    a: {
      title: "A · Daily counts, 15 September – 11 November 2026",
      blurb:
        "One marker per day on which something was published. Days with no figure stay empty rather than interpolated; gaps in a line are dashed. The school-blockade line is dotted across the Toussaint holiday, when no lycée was in session. The strike series is derived from participation rates: no authority published a national headcount of strikers.",
    },
    b: {
      title: "B · Weekly aggregates",
      blurb:
        "Weeks run Monday to Sunday. A peak-day crowd and a summed weekly arrest count are not the same statistic — the tooltip says which is which. The weekly blockade figure is a peak, never a sum: the same lycée is blocked on several consecutive days. People on strike is a level, so the weekly figure is the peak of the week, never a sum.",
    },
    c: {
      title: "C · One panel per movement",
      blurb:
        "Each panel keeps its own time span on a shared logarithmic axis, so the shapes are comparable but the durations are not. The tooltip also compares every point with its own series — as a percentage of the highest figure in that panel, of the mean, of the median and of the first published figure. The last of these can run to thousands of percent when a movement began with a handful of people, which is exactly why the other three are given first.",
      note: "Hollow markers are regional, Paris-only, modelled or stock figures. Dashed connectors span a week with nothing published.",
    },
    d: {
      title: "D · Transposed: one panel per series",
      blurb:
        "The same data with movements overlaid, so a single measure can be read across 1968 to 2026. The x axis is elapsed weeks, capped at the last week with enforcement figures. Tooltip comparisons work as on the movement page, but are computed over the weeks actually plotted in the hovered panel.",
      note: "Hover a measure or a movement to isolate it. Panel order matches legend order.",
    },
    e: {
      title: "E · Median and peak",
      blurb:
        "Each panel gathers one measure across the movements that published it. The dot is the median of the series — the typical week — and the triangle its peak, the largest single figure. The pale bar behind each pair spans the whole series, from its smallest figure to its largest, so a movement that was steady reads as a short bar and one that had a few enormous weeks as a long one. The axis is logarithmic, so a handful of mass marches and a routine week can share a panel. City-level counts by street medics are annotations, not observations.",
      note: "Each figure is counted once, at the midpoint of its range where one was published. The count of published figures is in the tooltip: with a single figure the median and the peak are the same number.",
    },
  },
};

/* ── Section A/B — tooltip callbacks ──────────────────────────────────────── */

import type { TooltipItem } from "chart.js";
import { fill, t } from "../copy";
import { noteText, suffixFor } from "../data/notes.ts";
import type { ProtestDataset } from "./datasets.ts";
import { fmt, rateLine } from "./format.ts";
import { wrapTooltipLines } from "./tooltip.ts";
import type { View } from "./view.ts";
import { cityCountsOn } from "../data/casualties/medics.ts";
import { DATES } from "../data/data.ts";
import { cityTooltip } from "../copy/city.ts";

/** City-level counts, as footer lines, for charts that opted into cityMarks. */
const cityFooter = (item: TooltipItem<"line">): string[] => {
  const marks = (
    item.chart.options.plugins as { cityMarks?: unknown } | undefined
  )?.cityMarks;
  if (!marks) return [];

  const date = DATES[item.dataIndex];
  if (!date) return [];

  const counts = cityCountsOn(date);
  if (!counts.length) return [];

  return counts.flatMap((c) =>
    wrapTooltipLines(cityTooltip(c), item, "footer"),
  );
};

export function tooltipCallbacks(v: View) {
  const m = t().chart;
  return {
    title: (items: TooltipItem<"line">[]) =>
      wrapTooltipLines(v.titles[items[0].dataIndex] ?? "", items[0], "title"),
    label: (item: TooltipItem<"line">) => {
      const ds = item.dataset as ProtestDataset;
      const unit = ds.unit ?? "count";
      const note = noteText(ds.notes?.[item.dataIndex]);
      const detached = ds.showLine === false;

      const band = ds.errorBars?.[item.dataIndex];
      const base = band
        ? fill(m.tooltipRange, {
            label: ds.label,
            mid: fmt((band[0] + band[1]) / 2, unit),
            low: fmt(band[0], unit),
            high: fmt(band[1], unit),
          })
        : fill(m.tooltipPoint, {
            label: ds.label,
            value: fmt(item.parsed.y ?? 0, unit),
          });

      const body = base + suffixFor(ds.quality?.[item.dataIndex], detached);
      // The rate is a second paragraph, so it survives the wrap intact.
      const rate = ds.perCapita
        ? rateLine(ds.errorBars?.[item.dataIndex], item.parsed.y ?? 0)
        : null;
      const full = rate ? `${body}\n${rate}` : body;
      return wrapTooltipLines(
        note ? fill(m.tooltipNote, { base: full, note }) : full,
        item,
        "body",
      );
    },
    footer: (items: TooltipItem<"line">[]) => {
      const item = items[0];
      const note = v.footers[item.dataIndex];

      const lines = [
        ...(note
          ? wrapTooltipLines(fill(m.footerMark, { note }), item, "footer")
          : []),
        ...cityFooter(item),
      ];

      return lines.length ? lines : [];
    },
  };
}

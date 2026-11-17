import type { TooltipItem } from "chart.js";
import { fill, t } from "../copy";
import { noteText, suffixFor } from "../data/notes.ts";
import type { Band } from "../model/index.ts";
import type { ProtestDataset } from "./datasets.ts";
import { fmt, rateLine } from "./format.ts";
import { wrapTooltipLines } from "./tooltip.ts";
import type { View } from "./view.ts";

type Unit = NonNullable<ProtestDataset["unit"]>;

const pair = (b: Band): [number, number] =>
  typeof b === "number" ? [b, b] : b;

export function tooltipCallbacks(v: View) {
  const m = t().chart;

  const rangeFill = (band: Band, label: string, unit: Unit) => {
    const [lo, hi] = pair(band);
    return fill(m.tooltipRange, {
      label,
      mid: fmt((lo + hi) / 2, unit),
      low: fmt(lo, unit),
      high: fmt(hi, unit),
    });
  };

  return {
    title: (items: TooltipItem<"line">[]) =>
      wrapTooltipLines(v.titles[items[0].dataIndex] ?? "", items[0], "title"),
    label: (item: TooltipItem<"line">) => {
      const ds = item.dataset as ProtestDataset;
      const unit = ds.unit ?? "count";
      const note = noteText(ds.notes?.[item.dataIndex]);
      const detached = ds.showLine === false;
      const label = ds.label ?? "";

      const band = ds.errorBars?.[item.dataIndex];
      const base =
        band != null
          ? rangeFill(band, label, unit)
          : fill(m.tooltipPoint, {
              label,
              value: fmt(item.parsed.y ?? 0, unit),
            });

      const body = base + suffixFor(ds.quality?.[item.dataIndex], detached);
      const rate = ds.perCapita
        ? rateLine(band == null ? undefined : pair(band), item.parsed.y ?? 0)
        : null;
      const full = rate ? `${body}\n${rate}` : body;
      return wrapTooltipLines(
        note ? fill(m.tooltipNote, { base: full, note }) : full,
        item,
        "body",
      );
    },
    footer: (items: TooltipItem<"line">[]) => {
      const note = v.footers[items[0].dataIndex];
      return note
        ? wrapTooltipLines(fill(m.footerMark, { note }), items[0], "footer")
        : [];
    },
  };
}

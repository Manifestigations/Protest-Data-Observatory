import type { Plugin } from "chart.js";
import { cityCountsOn } from "../../data/casualties/medics.ts";
import { DATES } from "../../data/data.ts";

type Opt = { readonly dates?: readonly string[] };

export const cityMarks: Plugin<"line"> = {
  id: "cityMarks",

  afterDatasetsDraw(chart) {
    const o = (chart.options.plugins as { cityMarks?: Opt } | undefined)
      ?.cityMarks;
    if (!o?.dates?.length) return;

    const xs = chart.scales.x;
    if (!xs) return;

    const { ctx, chartArea } = chart;
    ctx.save();

    for (const date of o.dates) {
      const i = DATES.indexOf(date); // ← ISO → index; labels are localized ("17 oct.", "Oct 17")
      if (i < 0 || i >= (chart.data.labels?.length ?? 0)) continue;
      const px = xs.getPixelForValue(i);
      if (px < chartArea.left || px > chartArea.right) continue;

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(px, chartArea.top);
      ctx.lineTo(px, chartArea.bottom);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeRect(px - 2.5, chartArea.top + 2, 5, 5); // hollow: presence, not a value

      ctx.fillStyle = "#111";
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      for (const c of cityCountsOn(date)) {
        ctx.fillText(`${c.city} ${c.injured}`, px + 4, chartArea.top - 14);
      }
    }

    ctx.restore();
  },
};

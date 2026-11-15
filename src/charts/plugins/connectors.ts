/* ── Gap connectors ─────────────────────────────────────────────────────────
   Solid where the hole is short, [6,4] where reporting paused, [1.5,3] across
   the Toussaint holiday. Drawn under the markers, over the grid and the band. */

import type { Plugin } from "chart.js";
import { THEME } from "../../core/canvas-registry.ts";
import type { ProtestDataset } from "../datasets.ts";
import { AXIS_LEFT } from "../series.ts";
import { clipToArea } from "./clip.ts";

export const connectors: Plugin<"line"> = {
  id: "connectors",
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    const xs = scales.x;
    if (!chartArea || !xs) return;

    for (let i = 0; i < chart.data.datasets.length; i++) {
      const ds = chart.data.datasets[i] as ProtestDataset;
      const spec = ds.connectors;
      if (!spec) continue;

      const meta = chart.getDatasetMeta(i);
      if (meta.hidden) continue;

      const ys = scales[meta.yAxisID ?? AXIS_LEFT];
      if (!ys) continue;
      const logAxis = ys.type === "logarithmic";

      // plotted points only; a detached marker ends the run
      const at: number[] = [];
      for (let j = 0; j < spec.series.length; j++) {
        const p = spec.series[j];
        if (p && p.v != null && p.v > (logAxis ? 0 : -Infinity) && !p.detach) {
          at.push(j);
        }
      }
      if (at.length < 2) continue;

      ctx.save();
      clipToArea(ctx, chartArea);
      ctx.strokeStyle = (ds.borderColor as string) ?? THEME.ink;
      ctx.lineWidth = (ds.borderWidth as number) ?? 1;
      ctx.lineJoin = "round";
      ctx.lineCap = "butt";

      for (let k = 1; k < at.length; k++) {
        const a = at[k - 1];
        const b = at[k];
        if (b - a === 1) continue;

        const va = spec.series[a]?.v;
        const vb = spec.series[b]?.v;
        if (va == null || vb == null) continue;

        ctx.setLineDash(b - a > spec.slots ? [6, 4] : []);
        ctx.beginPath();
        ctx.moveTo(xs.getPixelForValue(a), ys.getPixelForValue(va));
        ctx.lineTo(xs.getPixelForValue(b), ys.getPixelForValue(vb));
        ctx.stroke();
      }
      ctx.restore();
    }
  },
};

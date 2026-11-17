/* ── Gap connectors ─────────────────────────────────────────────────────────
   Draws the bridge Chart.js will not: solid where the hole is short, [6,4]
   where reporting paused. Drawn under the markers, over the grid and band.

   The holiday run is NOT drawn here: this file only ever picks [] or [6,4].
   `ConnectorSpec.holiday` is declared for spanSegment() in canvas-registry and
   is populated by no caller, so no chart currently asks for the dotted
   variant the copy promises. Either wire it here or drop the claim. */

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

      /* `at` holds the visible slots in order, so b - a is the spacing
         between them: 1 is adjacent (Chart.js strokes that one), 2 leaves one
         empty slot, and so on. `slots` is the largest spacing drawn solid, so
         b - a === slots is solid and b - a === slots + 1 is dashed. */
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

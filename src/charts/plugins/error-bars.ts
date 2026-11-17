/* ── Error bars and shaded bands ───────────────────────────────────────────── */

import type { Band } from "../../model/index.ts";
import type { Plugin } from "chart.js";
import { THEME } from "../../core/canvas-registry.ts";
import type { ProtestDataset } from "../datasets.ts";
import { AXIS_LEFT } from "../series.ts";
import { clipToArea } from "./clip.ts";

/** Half-width of the whisker cap, in px. */
const CAP_PX = 5;

export const errorBars: Plugin<"line"> = {
  id: "errorBars",
  beforeDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    for (let i = 0; i < chart.data.datasets.length; i++) {
      const ds = chart.data.datasets[i] as ProtestDataset;
      if (!ds.bandFill || !ds.errorBars) continue;
      const meta = chart.getDatasetMeta(i);
      if (meta.hidden) continue;
      const scale = chart.scales[meta.yAxisID ?? AXIS_LEFT];
      if (!scale) continue;

      const pts = meta.data as { x: number; skip?: boolean }[];
      const lowPts: [number, number][] = [];
      const highPts: [number, number][] = [];

      for (let j = 0; j < pts.length; j++) {
        const band = ds.errorBars[j];
        const p = pts[j];
        if (band == null || p.skip) continue;
        const [lo, hi] = typeof band === "number" ? [band, band] : band;
        lowPts.push([p.x, scale.getPixelForValue(lo)]);
        highPts.push([p.x, scale.getPixelForValue(hi)]);
      }
      if (lowPts.length < 2) continue;

      ctx.save();
      clipToArea(ctx, chartArea);
      ctx.beginPath();
      ctx.moveTo(lowPts[0][0], lowPts[0][1]);
      for (let k = 1; k < lowPts.length; k++)
        ctx.lineTo(lowPts[k][0], lowPts[k][1]);
      for (let k = highPts.length - 1; k >= 0; k--)
        ctx.lineTo(highPts[k][0], highPts[k][1]);
      ctx.closePath();
      ctx.fillStyle = ds.bandFillColor ?? "rgba(14,116,144,0.14)";
      ctx.fill();
      ctx.restore();
    }
  },
  afterDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;

    for (let i = 0; i < chart.data.datasets.length; i++) {
      const ds = chart.data.datasets[i] as ProtestDataset;
      if (!ds.errorBars || ds.noWhiskers) continue;

      const meta = chart.getDatasetMeta(i);
      if (meta.hidden) continue;

      const scale = chart.scales[meta.yAxisID ?? AXIS_LEFT];
      if (!scale) continue;

      const pts = meta.data as { x: number; skip?: boolean }[];

      ctx.save();
      clipToArea(ctx, chartArea);

      ctx.strokeStyle = ds.errorBarColor ?? THEME.muted;
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let j = 0; j < pts.length; j++) {
        const band = ds.errorBars[j];
        const p = pts[j];
        if (band == null || p.skip) continue;
        const [lo, hi] = typeof band === "number" ? [band, band] : band;
        const yHigh = scale.getPixelForValue(hi);
        const yLow = scale.getPixelForValue(lo);

        ctx.moveTo(p.x, yHigh);
        ctx.lineTo(p.x, yLow);
        ctx.moveTo(p.x - CAP_PX, yHigh);
        ctx.lineTo(p.x + CAP_PX, yHigh);
        ctx.moveTo(p.x - CAP_PX, yLow);
        ctx.lineTo(p.x + CAP_PX, yLow);
      }

      ctx.stroke();
      ctx.restore();
    }
  },
};

/* ==========================================================================
   src/charts/plugins/hatch.ts — diagonal two-colour fill.
   Draws the second colour over a bar, clipped to the bar's own rectangle.
   ========================================================================== */

import type { Plugin } from "chart.js";

export interface HatchOptions {
  /** CSS colour of the stripes. */
  colour: string;
  gap: number;
  width: number;
  angle: number;
  /** When false, hatch every dataset that declines its own. */
  onlyTagged: boolean;
}

const DEFAULTS: HatchOptions = {
  colour: "#d99e00",
  gap: 7,
  width: 3.5,
  angle: -45,
  onlyTagged: true,
};

interface HatchedDataset {
  hatch?: string | false;
}

export const hatch: Plugin<"bar"> = {
  id: "hatch",

  afterDatasetsDraw(chart, _args, rawOpts) {
    const opts = {
      ...DEFAULTS,
      ...(rawOpts as Partial<HatchOptions> | undefined),
    };
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, index) => {
      const tag = (dataset as HatchedDataset).hatch;
      const colour =
        typeof tag === "string" ? tag : opts.onlyTagged ? null : opts.colour;
      if (!colour) return;

      const meta = chart.getDatasetMeta(index);
      if (!meta || meta.hidden) return;

      const rad = (opts.angle * Math.PI) / 180;
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);

      ctx.save();
      ctx.strokeStyle = colour;
      ctx.lineWidth = opts.width;
      ctx.lineCap = "butt";

      for (const el of meta.data) {
        const bar = el as unknown as {
          x: number;
          y: number;
          width: number;
          height: number;
        };
        if (!Number.isFinite(bar.x) || !bar.width) continue;

        ctx.save();
        ctx.beginPath();
        ctx.rect(bar.x - bar.width / 2, bar.y, bar.width, bar.height);
        ctx.clip();
        ctx.beginPath();

        const span = Math.abs(bar.width) + Math.abs(bar.height);
        const step = opts.gap;
        for (let t = -span; t < span; t += step) {
          const cx = bar.x + t * dx;
          const cy = bar.y + bar.height / 2 + t * dy;
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + span * dx, cy + span * dy);
        }

        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    });
  },
};

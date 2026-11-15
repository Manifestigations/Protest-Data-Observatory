/* ── Span marker: a figure published for a date range, not a single day ───── */

import type { Plugin } from "chart.js";
import { fmtDayMonth } from "../../copy";
import { DATES } from "../../data/data.ts";
import { AXIS_LEFT, DEF } from "../series.ts";
import { clipToArea } from "./clip.ts";

export type SpanMark = {
  readonly from: string; // ISO date, inclusive
  readonly to: string; // ISO date, inclusive
  readonly value: number; // €M, drawn on the left axis
  readonly color: string;
};

/** CCI France's 27 Oct tally values 17–24 Oct as a whole, so the €1bn cell is
 *  shown spanning those dates rather than as a point on 24 Oct. */
export const SPAN_MARKS: readonly SpanMark[] = [
  {
    from: "2026-10-17",
    to: "2026-10-24",
    value: 1_000,
    color: DEF.damagesDaily.color,
  },
];

/** "ellipse" = dashed lozenge around the span; "brace" = overbrace, ends
 *  curling down toward the x axis. */
const MARKER: "ellipse" | "brace" = "ellipse";
const ELLIPSE_RY = 7;
const BRACE_CURL = 6;
const BRACE_LIFT = 12;

function withAlpha(hex: string, a: number): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export const spanMark: Plugin<"line"> = {
  id: "spanMark",
  afterDatasetsDraw(chart) {
    const spans = (
      chart.options.plugins as
        | { spanMark?: { spans?: readonly SpanMark[] } }
        | undefined
    )?.spanMark?.spans;
    if (!spans?.length) return;

    const xs = chart.scales.x;
    const ys = chart.scales[AXIS_LEFT];
    if (!xs || !ys) return;

    const { ctx, chartArea } = chart;
    ctx.save();
    clipToArea(ctx, chartArea);
    ctx.lineWidth = 1.5;

    for (const s of spans) {
      const i0 = DATES.indexOf(s.from);
      const i1 = DATES.indexOf(s.to);
      if (i0 < 0 || i1 <= i0) continue;

      const x0 = xs.getPixelForValue(i0);
      const x1 = xs.getPixelForValue(i1);
      if (Math.abs(x1 - x0) < 8) continue;

      const y = ys.getPixelForValue(s.value);
      const mid = (x0 + x1) / 2;

      ctx.strokeStyle = s.color;
      ctx.fillStyle = withAlpha(s.color, 0.1);
      ctx.beginPath();

      if (MARKER === "ellipse") {
        ctx.setLineDash([4, 3]);
        ctx.ellipse(
          mid,
          y,
          Math.abs(x1 - x0) / 2,
          ELLIPSE_RY,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.stroke();
      }

      // caption, skipped when it would hit the frame
      const labelY =
        (MARKER === "ellipse" ? y - ELLIPSE_RY : y - BRACE_LIFT - BRACE_CURL) -
        2;
      if (labelY - 10 > chartArea.top) {
        ctx.font = "10px system-ui, sans-serif";
        ctx.fillStyle = s.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(
          `${fmtDayMonth(s.from)}–${fmtDayMonth(s.to)}`,
          mid,
          labelY,
        );
      }
      ctx.setLineDash([]);
    }

    ctx.restore();
  },
};

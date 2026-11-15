/* ── Chart.js plot-area clip ─────────────────────────────────────────────────
   Three plugins in this folder and section E's range band each hand-rolled
   beginPath/rect/clip against `chartArea`; one helper keeps them identical.
   Deliberately dependency-free: nothing in charts/plugins may import the chart
   shell or a section. */

export interface Area {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

/** Clip subsequent drawing to the plot area, rounded out — a stroke on the
 *  frame's own edge is otherwise half-erased. */
export function clipToArea(ctx: CanvasRenderingContext2D, area: Area): void {
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.width, area.height);
  ctx.clip();
}

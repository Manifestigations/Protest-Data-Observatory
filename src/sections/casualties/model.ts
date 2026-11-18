/* Cell → text, and the one share rule the section has always had. */

import type { Cell, Estimate } from "@manifestigations/dataset";
import { fill, nf, t } from "../../copy";

export interface CellView {
  readonly text: string;
  readonly cls: string;
}

export function cellView(c: Cell): CellView {
  switch (c.s) {
    case "n": {
      const cls = ["cas-num"];
      if (c.d) cls.push("cas-derived");
      if (c.regional) cls.push("cas-regional");
      return {
        text: `${c.d ? "≈ " : ""}${nf().format(c.v)}`,
        cls: cls.join(" "),
      };
    }
    case "r":
      return {
        text: `≈ ${nf().format(c.lo)}–${nf().format(c.hi)}`,
        cls: `cas-num cas-derived${c.regional ? " cas-regional" : ""}`,
      };
    case "f":
      return { text: `≥ ${nf().format(c.v)}`, cls: "cas-num cas-floor" };
    case "c":
      return {
        text: fill(t().casualties.casesCount, { n: c.n }),
        cls: "cas-num cas-cases",
      };
    default:
      return { text: t().casualties.why[c.why], cls: "cas-absent" };
  }
}

/** The share a figure represents of its own total, when both exist.
 *  Preserved verbatim: a share is shown only when both operands are numeric and
 *  the denominator is positive, otherwise a dash. */
export function share(light: Cell, total: Cell): number | null {
  if (light.s !== "n" || total.s !== "n" || total.v <= 0) return null;
  return light.v / total.v;
}

export function pct(p: number): string {
  return `${nf().format(Number((p * 100).toFixed(1)))}%`;
}

export function estimateRange(e: Estimate): CellView {
  if (!e.value) return cellView({ s: "x", why: e.why ?? "notEstimable" });
  const f = e.unit === "share" ? pct : (x: number) => nf().format(x);
  return {
    text:
      e.value.lo === e.value.hi
        ? f(e.value.lo)
        : `${f(e.value.lo)}–${f(e.value.hi)}`,
    cls: e.unit === "share" ? "cas-num cas-derived" : "cas-num",
  };
}

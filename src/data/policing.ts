/* Policing: officer deployments, the published forces-injured running
   total, and the per-officer-day cost rate. */

import type { Obs } from "./types.ts";

export const DEPLOYMENT: Readonly<Record<string, Obs>> = {
  /* September deployment is an ASSUMPTION … (verbatim) */
};

/* ── Forces injured: the ministry's running total ── … (verbatim comment) */

export const FORCES_STOCK: Readonly<Record<string, Obs>> = {/* … */};

export const FORCES_STOCK_DERIVED: Readonly<Record<string, Obs>> = {/* … */};

export const RATE = { low: 136, high: 1_133 } as const;

export const costBand = (dep: Obs): [number, number] => [
  (dep.low * RATE.low) / 1e6,
  (dep.high * RATE.high) / 1e6,
];

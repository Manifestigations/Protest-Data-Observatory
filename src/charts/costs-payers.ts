/* ═══════════════════════════════════════════════════════════════════════════
   src/charts/costs-payers.ts — the payer table and the damage/concession ratio.

   THREE columns, never two: committed, disbursed, contingent. The disbursed
   column is empty for every payer because no source publishes a claims-paid
   figure for 2026 — it must render as "not published", never as 0.

   The protestor column is per-person exposure and is NEVER plotted on the
   same axis as the aggregates: €10,000 against €5bn is four orders of
   magnitude, and a bar chart would imply a national total that does not exist.
   ═══════════════════════════════════════════════════════════════════════════ */

import {
  IFRAP_SCENARIOS,
  PAYERS,
  PAYER_COSTS,
  concessionToDamage,
  rowsFor,
  sumRows,
  type Instrument,
  type Payer,
  type Stage,
} from "@manifestigations/dataset";

export interface PayerCell {
  readonly payer: Payer;
  readonly usd: never; // guard: this module is EUR-only
  readonly eurM: [number, number] | null; // null = nothing priced
  readonly instrument: Instrument | null;
  readonly rows: number;
}

export interface PayerColumn {
  readonly stage: Stage;
  readonly cells: readonly PayerCell[];
  readonly note: "published" | "none-published";
}

/** One column of the payer comparison. Instruments differ per payer, so each
 *  cell carries its own — you cannot add a loan to spending across payers. */
export function payerColumn(stage: Stage, instrument: Instrument): PayerColumn {
  const cells: PayerCell[] = PAYERS.map((payer) => {
    const rows = rowsFor(payer, stage, instrument);
    if (!rows.length) {
      return {
        payer,
        usd: undefined as never,
        eurM: null,
        instrument: null,
        rows: 0,
      };
    }
    return {
      payer,
      usd: undefined as never,
      eurM: sumRows(rows),
      instrument,
      rows: rows.length,
    };
  });
  return {
    stage,
    cells,
    note: cells.some((c) => c.eurM) ? "published" : "none-published",
  };
}

/** The three columns, as the chart reads them. */
export const PAYER_TABLE = {
  committedLoan: payerColumn("committed", "loan"),
  committedSpending: payerColumn("committed", "spending"),
  committedLiability: payerColumn("committed", "liability"),
  disbursed: payerColumn("disbursed", "liability"),
} as const;

/** Protestor exposure: per-person maxima, listed, never summed. */
export const PROTESTOR_EXPOSURE = PAYER_COSTS.filter(
  (r) => r.payer === "protestor" && r.unit === "perPerson",
);
d;

/** Commitment per euro of damage, high and low damage scenarios. */
export const RATIO = {
  vsHigh: concessionToDamage(
    [5_000, 5_000],
    [IFRAP_SCENARIOS.total.high, IFRAP_SCENARIOS.total.high],
  ),
  vsLow: concessionToDamage(
    [5_000, 5_000],
    [IFRAP_SCENARIOS.total.low, IFRAP_SCENARIOS.total.low],
  ),
  caption: "commitment per euro of damage — not spending",
} as const;

/* Shared series types. `NIL` and `round2` are internal to the data layer. */

import type { Flag, NoteRef } from "../model/index.ts";

export interface Obs {
  low: number;
  high: number;
  q?: Flag;
}

export interface Pt {
  v: number | null;
  band: [number, number] | null;
  q: Flag | null;
  note: NoteRef | null;
  detach: boolean;
}
export type Series = Pt[];

export const NIL: Pt = {
  v: null,
  band: null,
  q: null,
  note: null,
  detach: false,
};

export const round2 = (v: number): number =>
  Number.isInteger(v) ? v : Math.round(v * 100) / 100;

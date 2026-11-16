/* Circumstances. No source publishes a causation breakdown: the column gives the
 * number of documented cases, never a share. `n` in a "c" cell counts named
 * people, not per cent of anything. */

import type { CaseRow } from "./types.ts";

export const CASES: readonly CaseRow[] = [
  {
    id: "forcesAccidental",
    side: "forces",
    kind: "accidental",
    count: { s: "c", n: 4 },
    cases: ["givors", "crsWrist", "crsAnkle"],
  },
  {
    id: "forcesConflictual",
    side: "forces",
    kind: "conflictual",
    count: { s: "x", why: "causeUnknown" },
    cases: ["helmet", "groin2023"],
  },
  {
    id: "protesterConflictual",
    side: "protesters",
    kind: "conflictual",
    count: { s: "x", why: "causeUnknown" },
    cases: ["mael", "alaric", "eyes"],
  },
  {
    id: "protesterAccidental",
    side: "protesters",
    kind: "accidental",
    count: { s: "x", why: "noneDocumented" },
    cases: [],
  },
  {
    id: "sainteSoline",
    side: "forces",
    kind: "accidental",
    count: { s: "c", n: 29 },
    cases: ["sainteSoline"],
    reference: true,
  },
];

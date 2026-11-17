/* Invariants. `assertCasualties()` runs at import time, like the duplicate-id
 * check in sources/index.ts: a broken reconciliation is a build error, not a
 * runtime surprise. `scripts/check-casualties.ts` runs the same functions under
 * Node for CI. */

import {
  LIGHT_CENTRAL_SHARE,
  MIX,
  NOT_LIGHT,
  NOT_LIGHT_MOVEMENT,
  SERIOUS_MOVEMENT,
} from "./estimate.ts";
import { CIVILIANS_24OCT, CRS_OCTOBER, FORCES, THINES } from "./inputs.ts";

const close = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) <= eps;

export function casualtyFailures(): string[] {
  const f: string[] = [];
  const eq = (name: string, got: number, want: number) => {
    if (!close(got, want)) f.push(`${name}: ${got} ≠ ${want}`);
  };
  const ok = (name: string, cond: boolean) => {
    if (!cond) f.push(name);
  };

  /* 1. the ministry's two reconciliations */
  eq(
    "83 + 854 + 207 + 267 + 116 + 53",
    FORCES.stock30Sep +
      FORCES.increments.to14Oct +
      FORCES.increments.week12oct +
      FORCES.increments.week19oct +
      FORCES.increments.week26oct +
      FORCES.increments.week2nov,
    FORCES.movement,
  );
  eq(
    "1,144 + 267 + 116 + 53",
    FORCES.stock17Oct +
      FORCES.increments.week19oct +
      FORCES.increments.week26oct +
      FORCES.increments.week2nov,
    FORCES.movement,
  );
  eq(
    "83 + 854",
    FORCES.stock30Sep + FORCES.increments.to14Oct,
    FORCES.stock14Oct,
  );

  /* 2. the CRS file's own share */
  eq(
    "1,167 / 1,233",
    Number(((CRS_OCTOBER.light / CRS_OCTOBER.declared) * 100).toFixed(2)),
    94.65,
  );
  eq("1,167 + 66", CRS_OCTOBER.light + NOT_LIGHT, CRS_OCTOBER.declared);

  /* 3. nesting: serious ⊆ not-light, and the mix is exhaustive */
  ok("serious lo ≥ 7", SERIOUS_MOVEMENT.lo >= FORCES.serious17Oct);
  ok("not-light lo ≥ 66", NOT_LIGHT_MOVEMENT.lo >= NOT_LIGHT);
  ok("serious hi ≤ not-light hi", SERIOUS_MOVEMENT.hi <= NOT_LIGHT_MOVEMENT.hi);
  eq(
    "light lo + not-light hi",
    MIX[0].lo + NOT_LIGHT_MOVEMENT.hi,
    FORCES.movement,
  );
  eq(
    "light hi + not-light lo",
    MIX[0].hi + NOT_LIGHT_MOVEMENT.lo,
    FORCES.movement,
  );
  eq("residual lo", MIX[1].lo, NOT_LIGHT_MOVEMENT.lo - SERIOUS_MOVEMENT.hi);
  eq("residual hi", MIX[1].hi, NOT_LIGHT_MOVEMENT.hi - SERIOUS_MOVEMENT.lo);
  eq(
    "mix total (central)",
    MIX.reduce((a, b) => a + b.central, 0),
    FORCES.movement,
  );

  /* 4. the edges that the brief fixes */
  eq(
    "E3 hi",
    SERIOUS_MOVEMENT.hi,
    7 +
      Math.round(
        (FORCES.movement - FORCES.stock17Oct) *
          (NOT_LIGHT / CRS_OCTOBER.declared),
      ),
  );
  eq(
    "E3 central",
    SERIOUS_MOVEMENT.central,
    Math.round(FORCES.movement * (7 / FORCES.stock17Oct)),
  );
  eq(
    "E4 hi",
    NOT_LIGHT_MOVEMENT.hi,
    Math.round(FORCES.movement * (NOT_LIGHT / CRS_OCTOBER.declared)),
  );
  eq(
    "E6 central light share",
    Number((LIGHT_CENTRAL_SHARE * 100).toFixed(2)),
    94.62,
  );
  eq("E7 floor", THINES.seriousTo5Nov + THINES.deathsTo5Nov, 79);
  eq(
    "civilian proxy",
    Number(
      ((CIVILIANS_24OCT.serious / CIVILIANS_24OCT.injured) * 100).toFixed(1),
    ),
    2.0,
  );

  /* 5. a floor is never a total, and no band inverts */
  ok("E7 is a floor", SERIOUS_MOVEMENT.lo >= 0);
  ok(
    "bands not inverted",
    [MIX[0], MIX[1], MIX[2]].every((b) => b.lo <= b.hi),
  );

  return f;
}

export function assertCasualties(): void {
  const failures = casualtyFailures();
  if (failures.length) {
    throw new Error(
      `casualties: ${failures.length} invariant failure(s)\n  ${failures.join("\n  ")}`,
    );
  }
}

#!/usr/bin/env node
/* ── Bundle budget ────────────────────────────────────────────────────────
Visitors are often on phones on flaky connections; the gzipped JS + CSS
is what they pay on every page. Fails when the total crosses the budget.
First run: set BUDGET_KB to today's measured total, then ratchet it down;
never raise it without saying why in the MR. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve(import.meta.dirname, "..");
const BUDGET_KB = 1_000;

const files = ["docs/bundle.js", "docs/styles.css"];
let total = 0;
for (const f of files) {
  const kb = gzipSync(readFileSync(resolve(root, f))).length / 1024;
  total += kb;
  console.log(`${f}: ${kb.toFixed(1)} KiB gzip`);
}
const imgKb = readdirSync(join(root, "docs/img")).reduce(
  (s, n) => s + statSync(join(root, "docs/img", n)).size / 1024,
  0,
);
console.log(
  `docs/img/: ${imgKb.toFixed(1)} KiB raw (advisory — not in budget)`,
);
console.log(`total: ${total.toFixed(1)} KiB (budget ${BUDGET_KB} KiB)`);
process.exit(total <= BUDGET_KB ? 0 : 1);

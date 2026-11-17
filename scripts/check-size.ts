#!/usr/bin/env node
/* ── Bundle budget ────────────────────────────────────────────────────────
Visitors are often on phones on flaky connections; the gzipped JS + CSS
is what they pay on every page. Fails when the total crosses the budget.
First run: set BUDGET_KB to today's measured total, then ratchet it down;
never raise it without saying why in the PR. */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve(import.meta.dirname, "..");
const BUDGET_KB = 150; // TODO: set to current measured total, then tighten

const files = ["docs/bundle.js", "docs/styles.css"];
let total = 0;
for (const f of files) {
  const kb = gzipSync(readFileSync(resolve(root, f))).length / 1024;
  total += kb;
  console.log(`${f}: ${kb.toFixed(1)} KiB gzip`);
}
console.log(`total: ${total.toFixed(1)} KiB (budget ${BUDGET_KB} KiB)`);
process.exit(total <= BUDGET_KB ? 0 : 1);

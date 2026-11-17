#!/usr/bin/env node
/* ── Baseline review markers ──────────────────────────────────────────────
Enforces AGENTS.md § Browser and quality bar: a use of a Baseline
"Newly available" or "Limited availability" browser feature must carry

  // baseline:<web.dev slug> — review <YYYY-MM-DD>

with the date the feature is expected to reach Widely available. Fails on
a malformed marker or a review date in the past (drop the feature, or
confirm it is now Widely available and delete the marker). */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const SRC = resolve(import.meta.dirname, "../src");
const MARKER = /baseline:([a-z0-9][a-z0-9-]*)\s+review\s+(\d{4}-\d{2}-\d{2})/;
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory()
      ? walk(p)
      : e.name.endsWith(".ts") || e.name.endsWith(".css")
        ? [p]
        : [];
  });

const today = new Date().toISOString().slice(0, 10);
let errors = 0;
for (const file of walk(SRC)) {
  const rel = relative(SRC, file).split("\\").join("/");
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (!line.includes("baseline:")) return;
      const m = line.match(MARKER);
      if (!m) {
        console.log(
          `✗ ${rel}:${i + 1} marker must be "baseline:<slug> — review <YYYY-MM-DD>"`,
        );
        errors++;
        return;
      }
      if (m[2] < today) {
        console.log(
          `✗ ${rel}:${i + 1} review date for "${m[1]}" (${m[2]}) has passed — drop the feature or confirm it is now Widely available`,
        );
        errors++;
      }
    });
}
console.log(`\n${errors} error(s)`);
process.exit(errors === 0 ? 0 : 1);

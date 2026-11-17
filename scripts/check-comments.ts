#!/usr/bin/env node
/* ── Comment hygiene ───────────────────────────────────────────────────────
   Mechanical checks for the conventions in CONTRIBUTING.md § Comments. No
   dependencies, no config: exits 1 on any error, prints warnings without
   failing. Run via `npm run check:comments`. */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const SRC = resolve(import.meta.dirname, "../src");
const MAX_WIDTH = 80;
/** Small barrel/type-only modules legitimately start with an import. */
const NO_HEADER_OK = new Set([
  "copy/catalogue.ts",
  "copy/en/index.ts",
  "copy/fr/index.ts",
  "copy/index.ts",
  "data/sources/record.ts",
  "data/casualties/index.ts",
]);

type Level = "error" | "warn";
interface Finding {
  file: string;
  line: number;
  level: Level;
  msg: string;
}

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith(".ts") ? [p] : [];
  });

/** Comment-bearing lines only: `//`, or any line inside a block comment. */
function commentLines(src: string): Array<{ n: number; text: string }> {
  const out: Array<{ n: number; text: string }> = [];
  let block = false;
  src.split("\n").forEach((text, i) => {
    const t = text.trim();
    const opens = t.includes("/*");
    const closes = t.includes("*/");
    if (block || opens || t.startsWith("//")) out.push({ n: i + 1, text });
    if (opens && !closes) block = true;
    else if (closes) block = false;
  });
  return out;
}

/** `raw` rules see the untrimmed line (trailing whitespace is the point). */
const RULES: ReadonlyArray<{
  re: RegExp;
  level: Level;
  msg: string;
  raw?: boolean;
}> = [
  {
    re: /^\/\*+\s*\d+\.\s/,
    level: "error",
    msg: "numbered comment (leftover review list) — drop the number",
  },
  {
    re: /^\/\/\s*\+/,
    level: "error",
    msg: "patch residue `// +` — use a plain `//`",
  },
  {
    re: /\/\*\s*-{3,}/,
    level: "error",
    msg: "banner: use `/* ── Title ─── */`, not dashes",
  },
  {
    re: /colours\.ts\b/,
    level: "error",
    msg: "the module is colors.ts — check the path being cited",
  },
  {
    re: /\/\*\s*={3,}/,
    level: "error",
    msg: "banner: use the horizontal-rule form, not equals signs",
  },
  {
    re: /\s+$/,
    level: "error",
    msg: "trailing whitespace in a comment",
    raw: true,
  },
];

const findings: Finding[] = [];

for (const file of walk(SRC)) {
  const rel = relative(SRC, file).split("\\").join("/");
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");

  if (!NO_HEADER_OK.has(rel)) {
    const first = lines.find((l) => l.trim() !== "") ?? "";
    if (!first.trimStart().startsWith("/*")) {
      findings.push({
        file: rel,
        line: 1,
        level: "warn",
        msg: "no file header — say what the module is and what it may import",
      });
    }
  }

  for (const { n, text } of commentLines(src)) {
    for (const r of RULES) {
      if (r.re.test(r.raw ? text : text.trim()))
        findings.push({ file: rel, line: n, level: r.level, msg: r.msg });
    }
    if (text.length > MAX_WIDTH) {
      findings.push({
        file: rel,
        line: n,
        level: "warn",
        msg: `comment is ${text.length} cols — wrap at ${MAX_WIDTH}`,
      });
    }
  }
}

const rank = (l: Level): number => (l === "error" ? 0 : 1);
findings.sort(
  (a, b) => rank(a.level) - rank(b.level) || a.file.localeCompare(b.file),
);

for (const f of findings) {
  console.log(
    `${f.level === "error" ? "✗" : "!"} ${f.file}:${f.line}  ${f.msg}`,
  );
}

const errors = findings.filter((f) => f.level === "error").length;
console.log(`\n${errors} error(s), ${findings.length - errors} warning(s)`);
process.exit(errors === 0 ? 0 : 1);

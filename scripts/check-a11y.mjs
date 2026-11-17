#!/usr/bin/env node
/* ── Accessibility + viewport checks ─────────────────────────────────────
Runs the built site in headless Chromium: axe-core with the WCAG 2.2 AA
tags at mobile and desktop, and a no-horizontal-overflow assertion at
360 / 768 / 1280 / 1920 px on every page. Needs a prior
`npx playwright install --with-deps chromium`. */
import { resolve } from "node:path";
import { chromium } from "playwright";

const PAGES = [
  "index.html",
  "2026.html",
  "2026/costs.html",
  "2026/turnout.html",
  "2026/violence.html",
  "historic.html",
  "historic/movements.html",
  "historic/series.html",
  "contribute.html",
];
const VIEWPORTS = [
  { name: "mobile", width: 360, height: 740 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "wide", width: 1920, height: 1080 },
];
const AXE = resolve("node_modules/axe-core/axe.min.js");
const AXE_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22a",
  "wcag22aa",
];

const failures = [];
const browser = await chromium.launch();
try {
  for (const page of PAGES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const tab = await context.newPage();
      const pageErrors = [];
      tab.on("pageerror", (e) => pageErrors.push(String(e)));
      await tab.goto(`file://${resolve("docs", page)}`);
      await tab.waitForTimeout(500); // let charts paint
      const overflow = await tab.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      if (overflow > 0)
        failures.push(
          `${page} @${vp.name}: horizontal overflow (${overflow}px)`,
        );
      for (const e of pageErrors)
        failures.push(`${page} @${vp.name}: pageerror: ${e}`);
      if (vp.name === "mobile" || vp.name === "desktop") {
        await tab.addScriptTag({ path: AXE });
        const results = await tab.evaluate(
          (tags) =>
            window.axe.run(document, {
              runOnly: { type: "tag", values: tags },
            }),
          AXE_TAGS,
        );
        for (const v of results.violations)
          failures.push(
            `${page} @${vp.name}: ${v.id} (${v.impact}) ×${v.nodes.length}: ${v.nodes[0]?.target?.join(",") ?? "?"}`,
          );
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
}
for (const f of failures) console.log(`✗ ${f}`);
console.log(`\n${failures.length} failure(s)`);
process.exit(failures.length === 0 ? 0 : 1);

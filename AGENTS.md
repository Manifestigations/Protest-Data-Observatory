# AGENTS.md

Operational map for coding agents. Read this file, then
`src/model/index.ts` → `src/data/sources/types.ts` → `src/site/routes.ts`.
Do not read all of `src/data/facts.ts` (~470 lines of commented cells) unless the
task is about a 2026 figure; grep it. `src/data/data.ts` is the barrel + the
verification record.

## Ground truth

- TypeScript, ESM, no framework. Charts: Chart.js on `<canvas>`. UI: plain DOM
  helpers (`src/core/dom.ts`). One esbuild bundle serves all pages.
- Node ≥ 22.18 (native type stripping). No test runner.
- There is no CI _build_ — a GitHub Actions gate (`style.yml`) checks PRs
  (typecheck, lint, checks, axe), but `docs/` is still the committed
  build output; Pages serves it as-is.
- Not verified data: never present figures as fact in copy or docs.
- Bilingual throughout. `Bi = { en: string; fr: string }`.

## Browser and quality bar

- **Baseline Widely available only.** The app must run on the current
  Baseline Widely available core browsers (Chrome, Edge, Firefox, Safari —
  desktop + Android/iOS; per web.dev/baseline, "Widely available" means 30
  months past the newly-interoperable date). The `browserslist` field in
  `package.json` is the pinned snapshot of that set; the esbuild `target`
  and TS `target`/`lib` are set from it. Re-sync all three when Baseline
  statuses move; record the last sync date on this line:
  **Last Baseline sync: 2026-11-17.**
- **Newly available / Limited availability features** may be used only
  with a marker comment on the line(s) that use the feature:
  `// baseline:<web.dev slug> — review <YYYY-MM-DD>` where the date is
  when the feature is expected to become Widely available. `npm run
check:baseline` fails on malformed or overdue markers; at review time,
  delete the marker (feature now widely available) or fix the code.
- **WCAG 2.2 AA, at all times.** Every page and every interactive element
  must meet WCAG 2.2 AA (contrast, keyboard order, focus visibility,
  `prefers-reduced-motion`, text alternatives for canvas). `npm run
check:a11y` runs axe-core over every built page and blocks red PRs.
- **All screen sizes.** Layouts must work from 320px to 1920px with no
  horizontal overflow and no clipped controls. `npm run check:a11y` also
  asserts no overflow at 360 / 768 / 1280 / 1920 px.
- **Efficient, lightweight, robust — mobile on flaky connections first.**
  No runtime network calls (data is bundled); gzipped bundle + CSS must
  stay under the budget in `scripts/check-size.ts` (never raise the budget
  without saying why in the PR); lazy-mount below-the-fold sections;
  functions stay small (ESLint `complexity` ≤ 12, `max-depth` 4, no
  `console.log`, no `innerHTML` assignment for dynamic content).

## Commands

```bash
npm install
node scripts/build.ts             # canonical one-shot build (JS + CSS + maps)
node scripts/build.ts --watch     # build + watch + spawn server.ts on :3000
npm run typecheck                 # tsc --noEmit — always run
npm run check:casualties          # casualty data self-consistency
npm run dev:server                # serve docs/ only
npm run lint                      # ESLint (flat config: eslint.config.js)
npm run format                    # Prettier — also sorts imports
npm run check:baseline            # Baseline review-date markers are well-formed and not overdue
npm run check:size                # gzipped bundle + CSS under budget
npm run check:a11y                # axe-core WCAG 2.2 AA + no horizontal overflow, all viewports
```

## Invariants — do not violate

1. **After any change under `src/`, rebuild and stage `docs/bundle.js` and
   `docs/styles.css`. **Never edit those files by hand.**
2. **`Band = number | [number, number]`.** A published range stays a range.
   Never average two publishers; never midpoint a band in the data layer.
3. **Never change a `Flag` to make a series continuous.** `r|p|e|c` are
   detached by definition (`isDetached()` in `src/model/index.ts`) and are drawn
   hollow. Detached ≠ missing: it means "do not join to the national line".
4. **Never interpolate a gap.** Absent cell = no published figure.
5. **`Source.label` is verbatim publisher + headline, never translated.**
   `Source.what` is bilingual.
6. **All user-visible strings are `Bi`.** No hardcoded text in DOM/TS code; no
   one-language additions. French is authored, not translated from English.
7. ~~**No new dependencies** (runtime deps: `chart.js`). Ask via issue first.~~
8. **`NoteRef` is a reference, not copy.** Wording lives in
   `src/data/notes.ts`, rendered per locale.
9. **Only Baseline Widely available browser features** — or a
   `// baseline:<slug> — review <date>` marker on the line using the
   feature (see Browser and quality bar). `npm run check:baseline` must
   pass.
10. **WCAG 2.2 AA is non-negotiable.** axe (`npm run check:a11y`) must
    stay green; a11y fixes go in the same PR as the change that broke it.

## Where things are

| Need                                                                      | File                                                                                                                                                                               |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Types: `Metric`, `Flag`, `Band`, `Row`, `Episode`, `MetricKey`, `NoteRef` | `vendor/dataset/src/model/index.ts` (Dataset repo)                                                                                                                                 |
| 2026 figures (daily rows, weekly notes, projections)                      | `vendor/dataset/src/data/data.ts` (Dataset repo)                                                                                                                                   |
| Historical episodes                                                       | `vendor/dataset/src/data/episodes/*` (Dataset repo)                                                                                                                                |
| Source catalogue                                                          | `vendor/dataset/src/data/sources/*` (Dataset repo)                                                                                                                                 |
| Casualty cases/levels/estimates                                           | `vendor/dataset/src/data/casualties/*` (Dataset repo)                                                                                                                              |
| Chart specs / datasets / axes / tooltip / plugins                         | `src/charts/{specs,datasets,axes,tooltip,chart-tooltip,mount,shell,series,format,palette}.ts`, `src/charts/plugins/*`                                                              |
| Multi-panel (trellis) engine                                              | `src/charts/trellis/*`                                                                                                                                                             |
| Page sections                                                             | `src/sections/**` (one folder per area: `kpis`, `summary`, `casualties`, `costs`, `percapita`, `context`, `sources`, `about`, `contribute`, `cards`, `chrome.ts`, `disclosure.ts`) |
| Copy / i18n                                                               | `src/copy/{en,fr}/*.ts`, helpers `index.ts`, `lookup.ts`, `interpolate.ts`, `format.ts`, `types.ts`                                                                                |
| DOM / lang / theme / colors / a11y                                        | `src/core/*`                                                                                                                                                                       |
| Page table (`PAGES`, `PageId`, `relHref`, `pageHref`)                     | `src/site/routes.ts`; hero images `src/site/media.ts`                                                                                                                              |
| Boot / mount dispatch (`data-page`)                                       | `src/entry/main.ts`                                                                                                                                                                |
| CSS                                                                       | `src/styles/index.css`                                                                                                                                                             |
| Build / checks                                                            | `scripts/build.ts`                                                                                                                                                                 |
| Dev server                                                                | `server.ts`                                                                                                                                                                        |
| HTML shells (static fallback, meta)                                       | `docs/*.html`, `docs/2026/*.html`, `docs/historic/*.html`                                                                                                                          |
| Method prose                                                              | `content/{my-analysis,data-problems,how-i-made-this}.md`                                                                                                                           |
| Quality checks                                                            | `scripts/check-baseline.ts`, `scripts/check-size.ts`, `scripts/check-a11y.mjs`                                                                                                     |
| CI gate                                                                   | `.github/workflows/style.yml`                                                                                                                                                      |

## Task recipes

**Change a 2026 figure** — in `vendor/dataset/`: branch; grep `src/data/facts.ts`
for the ISO date; edit the `p|a|f|i` band; add/keep `flag`; add a `Source` in
`src/data/sources/`; `npm run check:casualties && npm run typecheck`; push,
merge, tag. Back in the Observatory: `git submodule update --remote vendor/dataset`,
`git add vendor/dataset`, `node scripts/build.ts`, `npm run typecheck`, stage
`docs/` artifacts.

**Add a page** — add a `PageId` + `PageSpec` in `src/site/routes.ts`; create the
HTML shell in `docs/` with the right `data-page` and relative links
(`relHref()`); add a mount branch in `src/entry/main.ts`; add a section module;
rebuild. `docs/styles.css` and `docs/bundle.js` are shared — no per-page assets.

**Change wording** — edit `src/copy/{en,fr}/…` (both) or the section's
`copy.en.ts`/`copy.fr.ts`; never a literal in a chart or DOM call.

**Fix a chart** — check `src/charts/specs.ts` and `datasets.ts` first: most
"missing chart" or "wrong range" bugs are spec/dataset wiring, not the drawing
engine. Detached styling comes from `src/core/colors.ts` (`hollow`).

## Known traps

- `docs/bundle.js` is minified in production builds; do not read it to
  understand behaviour, read `src/`.
- A sourcemap mismatch in `docs/bundle.js.map` after a hand-run esbuild means
  you built without `--sourcemap`.
- `src/entry/main.ts` mounts are individually guarded — a section that never
  renders usually means the page's `data-page` value or the `PAGES` entry is
  wrong, not that the mount failed.
- src/data/data.ts and notes.ts are machine-formatted now, and their
  hand-written verification comments (FIX n, arithmetic cross-checks)
  are part of the record: Prettier preserves them in place — keep them
  when editing, never let a formatter commit drop or reword them.

## Definition of done

`npm run typecheck` passes · `node scripts/build.ts` ran · `docs/` artifacts
staged · `npm run check:baseline`, `npm run check:size`, `npm run check:a11y`
pass · both locales updated · every new figure has a verbatim-labelled source
· no range collapsed, no gap interpolated, no flag relaxed · PR body states
which figures changed and why.

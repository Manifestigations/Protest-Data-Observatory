# AGENTS.md

Operational map for coding agents. Read this file, then
`src/model/index.ts` → `src/data/sources/types.ts` → `src/site/routes.ts`.
Do not read all of `src/data/data.ts` (1168 lines) unless the task is about a
2026 figure; grep it.

## Ground truth

- TypeScript, ESM, no framework. Charts: Chart.js on `<canvas>`. UI: plain DOM
  helpers (`src/core/dom.ts`). One esbuild bundle serves all pages.
- Node ≥ 22.18 (native type stripping). No test runner.
- `docs/` is **committed build output** served by GitHub Pages as-is. No CI.
- Not verified data: never present figures as fact in copy or docs.
- Bilingual throughout. `Bi = { en: string; fr: string }`.

## Commands

```bash
npm install
node scripts/build.ts             # canonical one-shot build (JS + CSS + maps)
node scripts/build.ts --watch     # build + watch + spawn server.ts on :3000
npm run typecheck                 # tsc --noEmit — always run
npm run check:casualties          # casualty data self-consistency
npm run dev:server                # serve docs/ only
npm run lint                      # ESLint (flat config: eslint.config.mjs)
npm run format                    # Prettier — also sorts imports
```

## Invariants — do not violate

1. **After any change under `src/`, rebuild and stage `docs/bundle.js`,
   `docs/bundle.js.map`, `docs/styles.css`, `docs/styles.css.map`.** Never edit
   those files by hand.
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
7. **No new dependencies** (runtime deps: `chart.js`). Ask via issue first.
8. **`NoteRef` is a reference, not copy.** Wording lives in
   `src/data/notes.ts`, rendered per locale.

## Where things are

| Need                                                                      | File                                                                                                                                                                                          |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Types: `Metric`, `Flag`, `Band`, `Row`, `Episode`, `MetricKey`, `NoteRef` | `src/model/index.ts`                                                                                                                                                                          |
| 2026 figures (daily rows, weekly notes, projections)                      | `src/data/data.ts`                                                                                                                                                                            |
| Historical episodes (one per movement)                                    | `src/data/episodes/{mai68,cpe,gilets-jaunes,nahel,retraites,bloquons,students}.ts`                                                                                                            |
| Episode registry                                                          | `src/data/episodes/index.ts`                                                                                                                                                                  |
| Source catalogue                                                          | `src/data/sources/*.ts`, types in `types.ts`, helpers `src()`/`both()` in `record.ts`, aggregate in `index.ts`, attribution in `mentions.ts`, page→source mapping in `page-map.ts`            |
| Casualty cases/levels/estimates                                           | `src/data/casualties/*`                                                                                                                                                                       |
| Chart specs / datasets / axes / tooltip / plugins                         | `src/charts/{specs,datasets,axes,tooltip,chart-tooltip,mount,shell,series,format,palette}.ts`, `src/charts/plugins/*`                                                                         |
| Multi-panel (trellis) engine                                              | `src/charts/trellis/*`                                                                                                                                                                        |
| Page sections                                                             | `src/sections/**` (one folder per area: `kpis`, `summary`, `casualties`, `costs`, `percapita`, `context`, `sources`, `about`, `contribute`, `cards`, `trellis`, `chrome.ts`, `disclosure.ts`) |
| Copy / i18n                                                               | `src/copy/{en,fr}/*.ts`, helpers `index.ts`, `lookup.ts`, `interpolate.ts`, `format.ts`, `types.ts`                                                                                           |
| DOM / lang / theme / colors / a11y                                        | `src/core/*`                                                                                                                                                                                  |
| Page table (`PAGES`, `PageId`, `relHref`, `pageHref`)                     | `src/site/routes.ts`; hero images `src/site/media.ts`                                                                                                                                         |
| Boot / mount dispatch (`data-page`)                                       | `src/entry/main.ts`                                                                                                                                                                           |
| CSS                                                                       | `src/styles/index.css`                                                                                                                                                                        |
| Build / checks                                                            | `scripts/build.ts`, `scripts/check-casualties.ts`                                                                                                                                             |
| Dev server                                                                | `server.ts`                                                                                                                                                                                   |
| HTML shells (static fallback, meta)                                       | `docs/*.html`, `docs/2026/*.html`, `docs/historic/*.html`                                                                                                                                     |
| Method prose                                                              | `content/{my-analysis,data-problems,how-i-made-this}.md`                                                                                                                                      |

## Task recipes

**Change a 2026 figure** — grep `src/data/data.ts` for the ISO date; edit the
`p|a|f|i` band; add/keep `flag`; add a `noteRef` if the cell needs explaining;
add a `Source` in `src/data/sources/`; `node scripts/build.ts`; `npm run
typecheck`; stage `docs/` artifacts.

**Change a historical series** — edit `src/data/episodes/<movement>.ts` (a
`Row` per week, `w` sequential, `from`/`to` ISO); ensure the supporting sources
exist in `src/data/sources/<group>.ts`; rebuild.

**Add a source group** — extend `GroupId` and add a `SourceGroup` in
`src/data/sources/types.ts`; create `src/data/sources/<group>.ts`; register it
in `src/data/sources/index.ts`; update `page-map.ts` if the page→source mapping
needs it.

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
staged · both locales updated · every new figure has a verbatim-labelled source
· no range collapsed, no gap interpolated, no flag relaxed · PR body states
which figures changed and why.

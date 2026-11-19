# Protest activity in France · Activité contestataire en France

Charts of protest in France: the autumn 2026 movement day by day, and the same
measures set against six earlier movements (May 68, CPE 2006, Gilets jaunes,
June 2023, pensions, Bloquons tout 2025).

**Live site:** https://manifestigations.github.io/Protest-Data-Observatory/?lang=en

> ⚠️ **Read this before using a number.** The research and the code were
> produced with LLM assistance and the figures have not been independently
> verified. Do not use them for serious analysis or for decisions without first
> checking the figures and the sources listed at the bottom of each page.
> Every page states its own gaps under its title.

---

## Two repositories

| Repository                                                              | Holds                                                                                                                         | You touch it to                           |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [Manifestigations/Dataset](https://github.com/Manifestigations/Dataset) | **The data, and the authority over it.** Figures, sources, casualty data, historical series. TypeScript source, no build step | correct or add a number                   |
| `Manifestigations/Protest-Data-Observatory` (this repo)                 | The site: charts, pages, copy in French and English, the build, the committed output in `docs/`                               | change a chart, a page, a word, the build |

`Dataset` is the source of truth for every figure. This repository keeps a
working copy under `src/data/` and `src/model/` so the bundle stays
self-contained and the site can be built with one clone — but a number is
**authored** in `Dataset`, never here. If you find yourself editing
`src/data/facts.ts` or `src/data/episodes/*.ts` in this repository, stop and
open the equivalent change in `Dataset` instead; otherwise the next sync
silently reverts your correction.

The two repositories are deliberately separate so the data can be cited,
reviewed and reused without the site's code, and so prose about method sits
next to the numbers it explains.

---

## Three ways in

| I want to…                               | Start here                                                                                                  | Skills needed                            |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Report a figure that is wrong or missing | [Open the figure form](https://github.com/Manifestigations/Dataset/issues/new?template=report-a-figure.yml) | none — a free GitHub account             |
| Correct or add data                      | [Dataset CONTRIBUTING](https://github.com/Manifestigations/Dataset/blob/main/CONTRIBUTING.md)               | edit literal values in a TypeScript file |
| Change charts, pages, copy or build      | [CONTRIBUTING.md](CONTRIBUTING.md)                                                                          | TypeScript                               |
| Work in this repo as a coding agent      | [AGENTS.md](AGENTS.md)                                                                                      | —                                        |

You do not need to be a programmer, read the code, or install anything to
report a figure. **One number, one date, one link** is the whole process.

---

## What the site contains

| Page                      | File                           | Content                                                 |
| ------------------------- | ------------------------------ | ------------------------------------------------------- |
| Home                      | `docs/index.html`              | Landing page, two card groups                           |
| The Ongoing Revolt · 2026 | `docs/2026.html`               | Group page: turnout, violence, costs                    |
| 2026 / Turnout            | `docs/2026/turnout.html`       | Crowd size, strikers, blockades, day by day and by week |
| 2026 / Violence           | `docs/2026/violence.html`      | Arrests, injuries on both sides                         |
| 2026 / Costs              | `docs/2026/costs.html`         | Damage, cost of policing                                |
| Historical comparisons    | `docs/historic.html`           | Group page                                              |
| Historic / Movements      | `docs/historic/movements.html` | One panel per movement                                  |
| Historic / Series         | `docs/historic/series.html`    | One panel per measure across movements                  |
| Contribute                | `docs/contribute.html`         | Contributor-facing page                                 |

The page table lives in `src/site/routes.ts` (`PAGES`): one entry per HTML file
in `docs/`, with title, blurb, parent and cards. `data-page` on the `<html>`
element selects the entry; the bundle mounts only what that page hosts.

The site is **French and English**: every user-visible string exists as
`{ en, fr }` next to the module that uses it. `?lang=en` / `?lang=fr` switches
locale.

---

## Quick start

Requires **Node ≥ 22.18** (ESM, native TypeScript type stripping).

```bash
npm install

npm run build                # one-shot build → docs/bundle.js + docs/styles.css
npm run dev                  # rebuild on save + serve http://127.0.0.1:3000
npm run typecheck            # tsc --noEmit
npm run lint                 # eslint .
npm run check:comments       # comment/header conventions
npm run check:casualties     # internal consistency check on the casualty data
```

`npm run dev` runs `node scripts/build.ts --watch` and also spawns `server.ts`,
which serves `docs/` on `127.0.0.1:3000` (`PORT` / `HOST` env vars,
`Cache-Control: no-store`). If you prefer two terminals: `npm run dev:server`
plus a build in watch mode.

No framework, no test runner, no bundler config beyond the two esbuild
configs in `scripts/build.ts`. Runtime dependency for charts: `chart.js`
(canvas). UI is plain DOM helpers in `src/core/dom.ts`.

---

## Repository map

| Path                                                    | What it is                                                                                                                                              | Touch it when                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `src/data/facts.ts`                                     | The 2026 observations, keyed by ISO date — **a copy of the Dataset file; edit it in `Dataset`**                                                         | a 2026 number changes                     |
| `src/data/data.ts`                                      | Entry point for the 2026 layer: a verification record plus `export *` re-exports. No logic                                                              | never — import from it, don't edit it     |
| `src/data/{projections,aggregate,student-weeks}.ts`     | Daily and weekly series **computed** from `facts.ts`                                                                                                    | only the arithmetic behind a series       |
| `src/data/episodes/*.ts`                                | One file per historical movement (`mai68`, `cpe`, `gilets-jaunes`, `nahel`, `retraites`, `bloquons`, `students`) — copies of Dataset files              | a historical series changes               |
| `src/data/sources/*.ts`                                 | Source catalogue: publisher, verbatim headline, URL, date, what it is used for                                                                          | you cite anything new                     |
| `src/data/sources/types.ts`                             | `Source`, `SourceGroup`, `GroupId`, `Mention`                                                                                                           | rarely — adding a new source group        |
| `src/data/casualties/`                                  | Case-level casualty data, levels, estimates, checks                                                                                                     | casualty figures                          |
| `src/data/disruptive/`                                  | Disruptive acts                                                                                                                                         | distruptive figures                       |
| `src/data/{population,policing,helicopters,opinion}.ts` | Denominators, deployments and cost rate, helicopter, poll approval series                                                                               | rarely                                    |
| `src/data/notes.ts`                                     | Structured note copy, rendered per locale and referenced by `noteRef`                                                                                   | a note needs new wording                  |
| `src/model/index.ts`                                    | Pure types and definitions: `Metric`, `Flag`, `Band`, `Row`, `Episode`, `isDetached`                                                                    | never casually — everything depends on it |
| `src/charts/`                                           | Chart.js setup: specs, datasets, axes, tooltip, plugins (`error-bars`, `hatch`, `connectors`, `clip`, `span-mark`), `trellis/` engine for multi-panel   | drawing changes                           |
| `src/sections/`                                         | One folder per page area: `kpis`, `summary`, `casualties`, `costs`, `percapita`, `context`, `sources`, `about`, `contribute`, `cards`, plus `chrome.ts` | page structure                            |
| `src/copy/{en,fr}/` + `src/copy/*.ts`                   | All UI copy, `Bi = { en, fr }`, lookup/format/interpolation helpers                                                                                     | any wording                               |
| `src/core/`                                             | DOM, lang switch, theme, colors, a11y, canvas registry                                                                                                  | infrastructure only                       |
| `src/site/`                                             | `routes.ts` (page table), `media.ts` (hero images)                                                                                                      | adding a page                             |
| `src/entry/main.ts`                                     | Boot: locale, chrome, then guarded mounts                                                                                                               | wiring a new section                      |
| `src/styles/index.css`                                  | All CSS, bundled to `docs/styles.css`                                                                                                                   | styling                                   |
| `scripts/`                                              | `build.ts`, `check-casualties.ts`, `check-comments.ts`                                                                                                  | build/checks                              |
| `server.ts`                                             | Static dev server for `docs/`                                                                                                                           | rarely                                    |
| `docs/`                                                 | **Committed build output** + HTML shells + images + transcripts                                                                                         | rebuild after source changes              |
| `content/`                                              | Long-form notes: `my-analysis.md`, `data-problems.md`, `how-i-made-this.md`                                                                             | prose about method                        |

**The `src/data/` rows are the exception to "edit here".** Those files are a
checked-in copy of `Manifestigations/Dataset`; the same paths exist there and
are the ones under review. `content/data-problems.md` stays in **this**
repository, because it is prose about method rather than data — but a decision
recorded in it is applied by a commit in `Dataset`.

---

## The data model in sixty seconds

A figure is never a bare number. From `src/model/index.ts`:

| Type      | Meaning                                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Band`    | `number` or `[low, high]` — a published range is kept as a range                                                                                                                                                       |
| `Flag`    | `n` national · `r` regional only · `p` partial · `f` floor · `e` derived/modelled · `c` cumulative stock or subset of a larger published total · `w` weekly aggregate · `x` wider measure than the metric's definition |
| `Row`     | one week: `w` index, `from`/`to` ISO dates, `act`, `partial`, and `p`/`a`/`f`/`i` bands with per-metric `flag` and `noteRef`                                                                                           |
| `Episode` | `id`, `start`, `end`, `weeks: Row[]`                                                                                                                                                                                   |
| `NoteRef` | a _reference_ to copy (`obs`, `policing`, `cumulative`, `week`), never the copy itself                                                                                                                                 |

`p` turnout · `a` arrests · `f` forces injured · `i` protesters injured.
`isDetached()` is the single definition of "must not be joined to the national
line": `r`, `p`, `e`, `c`. Charts draw detached points hollow instead of
connecting them.

2026 observations use a different shape from historical weeks: `Obs` =
`{ low, high, q? }` in `src/data/facts.ts`, where a point figure has
`low === high`, and `Pt` = `{ v, band, q, note, detach }` with `Series = Pt[]`
once `projections.ts` has derived the daily series.

Sources (`src/data/sources/types.ts`) are `Source { id, group, label, url,
date?, dateEnd?, what }`. `label` is the publisher and headline **verbatim and
never translated**; `what` is bilingual. Entries are created with the `src()`
and `both()` helpers from `src/data/sources/record.ts`.

---

## How a number travels

1. **Source** — add or find an entry in `src/data/sources/<group>.ts`
   (`label` verbatim, `url`, `date`, `what` in both languages). In `Dataset`.
2. **Cell** — add the band in `src/data/facts.ts` (2026) or
   `src/data/episodes/<movement>.ts` (historic), with a `flag` if it is not a
   plain national count. In `Dataset`.
3. **Note** — if the cell needs explaining, add a `noteRef`; the wording lives
   in `src/data/notes.ts` and is rendered per locale.
4. **Sync** — the change lands in `Dataset`, then arrives here as its own
   commit. Never hand-edit the copied data files in this repository as a way of
   fixing the site.
5. **Spec** — charts read these through `src/charts/specs.ts` /
   `datasets.ts`; only touch this if the measure is new.
6. **Copy** — any new caption, axis label or legend entry is `{ en, fr }` in
   `src/copy/`.
7. **Build** — `npm run build`, commit `docs/bundle.js` and `docs/styles.css`
   along with the source change.

---

## Deployment

GitHub Pages serves `docs/` exactly as committed: `docs/bundle.js`,
`docs/styles.css`, the HTML shells and the images. There is no CI build step.
**If you change anything under `src/`, you must rebuild and commit the generated
files** — otherwise the live site keeps serving the old bundle. Never hand-edit
`docs/bundle.js` or `docs/styles.css`; edit the source and rebuild.

---

## Conventions that are not negotiable

- **A range is the result.** Keep `[low, high]` as published. Never average two
  publishers, never collapse a band to a midpoint in the data layer.
- **Never silently fill a gap.** A week with no figure stays empty; `e` marks a
  derived value and its tooltip must state the arithmetic.
- **Never change a flag to make a line look continuous.** `r`/`p`/`e`/`c` mean
  the point is detached from the national series on purpose.
- **Counts and estimates are different data.** Say which one you have.
- **Always the denominator.** Injuries without a crowd size compare to nothing.
- **One number, one home.** A figure is authored in `Dataset`; this repository
  displays it.
- **French is written, not translated.** French copy that reads like a
  translation is a bug worth reporting.
- **Accessibility is part of the data's honesty**: canvas descriptions, tab
  order, contrast, and black-and-white maps under `prefers-contrast`.
- **Consent, anonymity and safety come before the figure**, always.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for this repository, and the
[Dataset CONTRIBUTING](https://github.com/Manifestigations/Dataset/blob/main/CONTRIBUTING.md)
for a figure. For anything larger than a data cell or a typo, **open an issue
first** — settling the data question usually halves the code. Coding agents
should read [AGENTS.md](AGENTS.md) before editing.

Site copy on contributing, in French: `docs/contribute.html`.

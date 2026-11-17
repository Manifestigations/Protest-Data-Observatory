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

## Three ways in

| I want to…                               | Start here                                                                                                                   | Skills needed                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Report a figure that is wrong or missing | [Open the figure form](https://github.com/Manifestigations/Protest-Data-Observatory/issues/new?template=report-a-figure.yml) | none — a free GitHub account                                     |
| Correct or add data in the repo          | [CONTRIBUTING.md § Editing data](CONTRIBUTING.md#editing-data)                                                               | edit literal values in a TypeScript file; no framework knowledge |
| Change charts, pages, copy or build      | [CONTRIBUTING.md § Editing code](CONTRIBUTING.md#editing-code)                                                               | TypeScript                                                       |
| Work in this repo as a coding agent      | [AGENTS.md](AGENTS.md)                                                                                                       | —                                                                |

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

node scripts/build.ts # one-shot build → docs/bundle.js + docs/styles.css
node scripts/build.ts --watch # rebuild on save + serve http://127.0.0.1:3000
npm run typecheck # tsc --noEmit
npm run lint # ESLint (flat config: eslint.config.mjs); `npm run lint:fix` for auto-fixes
npm run format # Prettier — also sorts imports; `npm run format:check` is the CI gate
npm run check:casualties # internal consistency check on the casualty data
```

`node scripts/build.ts --watch` also spawns `server.ts`, which serves `docs/` on
`127.0.0.1:3000` (`PORT` / `HOST` env vars, `Cache-Control: no-store`). If you
prefer two terminals: `npm run dev:server` plus a build in watch mode.

No framework, no test runner, no bundler config beyond the two esbuild
configs in `scripts/build.ts`, and no style config beyond
`eslint.config.mjs` and `.prettierrc.json` — the Style CI workflow
(Prettier + ESLint, including automatic import sorting) blocks pull
requests until both pass; see [CONTRIBUTING.md](Contributing.md#formatting-and-linting).

---

## Repository map

| Path                                         | What it is                                                                                                                                                         | Touch it when                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `src/data/data.ts`                           | Every 2026 figure: daily rows, weekly aggregation notes, projections                                                                                               | a 2026 number changes                     |
| `src/data/episodes/*.ts`                     | One file per historical movement (`mai68`, `cpe`, `gilets-jaunes`, `nahel`, `retraites`, `bloquons`, `students`)                                                   | a historical series changes               |
| `src/data/sources/*.ts`                      | Source catalogue: publisher, verbatim headline, URL, date, what it is used for                                                                                     | you cite anything new                     |
| `src/data/sources/types.ts`                  | `Source`, `SourceGroup`, `GroupId`, `Mention`                                                                                                                      | rarely — adding a new source group        |
| `src/data/casualties/`                       | Case-level casualty data, levels, estimates, checks                                                                                                                | casualty figures                          |
| `src/data/{population,notes,helicopters}.ts` | Denominators, structured note copy, helicopter series                                                                                                              | rarely                                    |
| `src/model/index.ts`                         | Pure types and definitions: `Metric`, `Flag`, `Band`, `Row`, `Episode`, `isDetached`                                                                               | never casually — everything depends on it |
| `src/charts/`                                | Chart.js setup: specs, datasets, axes, tooltip, plugins (`error-bars`, `hatch`, `connectors`, `clip`, `span-mark`), `trellis/` engine for multi-panel              | drawing changes                           |
| `src/sections/`                              | One folder per page area: `kpis`, `summary`, `casualties`, `costs`, `percapita`, `context`, `sources`, `about`, `contribute`, `cards`, `trellis`, plus `chrome.ts` | page structure                            |
| `src/copy/{en,fr}/` + `src/copy/*.ts`        | All UI copy, `Bi = { en, fr }`, lookup/format/interpolation helpers                                                                                                | any wording                               |
| `src/core/`                                  | DOM, lang switch, theme, colors, a11y, canvas registry                                                                                                             | infrastructure only                       |
| `src/site/`                                  | `routes.ts` (page table), `media.ts` (hero images)                                                                                                                 | adding a page                             |
| `src/entry/main.ts`                          | Boot: locale, chrome, then guarded mounts                                                                                                                          | wiring a new section                      |
| `src/styles/index.css`                       | All CSS, bundled to `docs/styles.css`                                                                                                                              | styling                                   |
| `scripts/`                                   | `build.ts`, `check-casualties.ts`                                                                                                                                  | build/checks                              |
| `server.ts`                                  | Static dev server for `docs/`                                                                                                                                      | rarely                                    |
| `docs/`                                      | **Committed build output** + HTML shells + images + transcripts                                                                                                    | rebuild after source changes              |
| `content/`                                   | Long-form notes: `my-analysis.md`, `data-problems.md`, `how-i-made-this.md`                                                                                        | prose about method                        |

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

Sources (`src/data/sources/types.ts`) are `Source { id, group, label, url,
date?, dateEnd?, what }`. `label` is the publisher and headline **verbatim and
never translated**; `what` is bilingual. Entries are created with the `src()`
and `both()` helpers from `src/data/sources/record.ts`.

---

## How a number travels

1. **Source** — add or find an entry in `src/data/sources/<group>.ts`
   (`label` verbatim, `url`, `date`, `what` in both languages).
2. **Cell** — add the band in `src/data/data.ts` (2026) or
   `src/data/episodes/<movement>.ts` (historic), with a `flag` if it is not a
   plain national count.
3. **Note** — if the cell needs explaining, add a `noteRef`; the wording lives
   in `src/data/notes.ts` and is rendered per locale.
4. **Spec** — charts read these through `src/charts/specs.ts` /
   `datasets.ts`; only touch this if the measure is new.
5. **Copy** — any new caption, axis label or legend entry is `{ en, fr }` in
   `src/copy/`.
6. **Build** — `node scripts/build.ts`, commit `docs/bundle.js` and
   `docs/styles.css` along with the source change.

---

## Deployment

GitHub Pages serves `docs/` exactly as committed (`.nojekyll`-free static
output): `docs/bundle.js`, `docs/styles.css`, the HTML shells and the images.
There is no CI build step. **If you change anything under `src/`, you must
rebuild and commit the generated files** — otherwise the live site keeps
serving the old bundle. Never hand-edit `docs/bundle.js` or
`docs/styles.css`; edit the source and rebuild.

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
- **French is written, not translated.** French copy that reads like a
  translation is a bug worth reporting.
- **Accessibility is part of the data's honesty**: canvas descriptions, tab
  order, contrast, and black-and-white maps under `prefers-contrast`.
- **Consent, anonymity and safety come before the figure**, always.
- **The formatter settles style.** Two spaces, double quotes, semicolons,
  80 columns, trailing commas, LF, and Prettier's import ordering. If it
  looks wrong, run `npm run format` and `npm run lint` rather than
  reformatting by hand, and never inline-disable a lint rule without a
  comment saying why.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). For anything larger than a data cell or
a typo, **open an issue first** — settling the data question usually halves the
code. Coding agents should read [AGENTS.md](AGENTS.md) before editing.

Site copy on contributing, in French: `docs/contribute.html`.

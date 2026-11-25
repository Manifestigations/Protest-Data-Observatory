# Protest activity in France · Activité contestataire en France

Charts of protest in France: the autumn 2026 movement day by day, and the same
measures set against six earlier movements (May 68, CPE 2006, Gilets jaunes,
June 2023, pensions, Bloquons tout 2025).

**Live site:** https://manifestigations.frama.io/Protest-Data-Observatory/?lang=en

> ⚠️ **Read this before using a number.** The research and the code were
> produced with LLM assistance and the figures have not been independently
> verified. Do not use them for serious analysis or for decisions without first
> checking the figures and the sources listed at the bottom of each page.
> Every page states its own gaps under its title.

---

## Two repositories

| Repository                                                                | Holds                                                                                                                         | You touch it to                           |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [manifestigations/Dataset](https://framagit.org/manifestigations/Dataset) | **The data, and the authority over it.** Figures, sources, casualty data, historical series. TypeScript source, no build step | correct or add a number                   |
| `manifestigations/Protest-Data-Observatory` (this repo)                   | The site: charts, pages, copy in French and English, the build, the committed output in `docs/`                               | change a chart, a page, a word, the build |

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

The data reaches this repository two ways, and they are different mechanisms:
`vendor/dataset` (a git submodule) supplies the **source** that the shims under
`src/data/` re-export, and `@manifestigations/dataset` (a package on GitHub
Packages) supplies the **built types** that `src/copy/types.ts` re-exports. A
data commit here is not live until the pin is bumped, the dependency is on a
version that carries it, and `docs/` is rebuilt.

### Where review happens

**framagit.org is canonical.** Issues and merge requests live there, CI runs
there, and the site is published from there.

`github.com/manifestigations/Protest-Data-Observatory` is an automatic **push
mirror** of this repository. Do not open pull requests or push commits there:
the next mirror push overwrites the branch. GitHub is used for one thing only —
it hosts the `@manifestigations/dataset` package registry, because Framagit
does not have one.

---

## Three ways in

| I want to…                               | Start here                                                                                                         | Skills needed                            |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Report a figure that is wrong or missing | [Open the figure form](https://framagit.org/manifestigations/Dataset/issues/new?issuable_template=report-a-figure) | none — a free Framagit account           |
| Correct or add data                      | [Dataset CONTRIBUTING](https://framagit.org/manifestigations/Dataset/blob/main/CONTRIBUTING.md)                    | edit literal values in a TypeScript file |
| Change charts, pages, copy or build      | [CONTRIBUTING.md](CONTRIBUTING.md)                                                                                 | TypeScript                               |
| Work in this repo as a coding agent      | [AGENTS.md](AGENTS.md)                                                                                             | —                                        |

You do not need to be a programmer, read the code, or install anything to
report a figure. **One number, one date, one link** is the whole process.

---

## What the site contains

| Page                      | File                           | Content                                                                                             |
| ------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| Home                      | `docs/index.html`              | Landing page, two card groups                                                                       |
| The Ongoing Revolt · 2026 | `docs/2026.html`               | Group page: turnout, violence, costs                                                                |
| 2026 / Turnout            | `docs/2026/turnout.html`       | Crowd size, strikers, blockades, day by day and by week                                             |
| 2026 / Violence           | `docs/2026/violence.html`      | Arrests, injuries on both sides, and the ICD-10 / AIS classification of each published injury label |
| 2026 / Costs              | `docs/2026/costs.html`         | Damage, cost of policing                                                                            |
| Historical comparisons    | `docs/historic.html`           | Group page                                                                                          |
| Historic / Movements      | `docs/historic/movements.html` | One panel per movement                                                                              |
| Historic / Series         | `docs/historic/series.html`    | One panel per measure across movements                                                              |
| Contribute                | `docs/contribute.html`         | Contributor-facing page                                                                             |

The page table lives in `src/site/routes.ts` (`PAGES`): one entry per HTML file
in `docs/`, with title, blurb, parent and cards. `data-page` on the `<html>`
element selects the entry; the bundle mounts only what that page hosts.

The site is **French and English**: every user-visible string exists as
`{ en, fr }` next to the module that uses it. `?lang=en` / `?lang=fr` switches
locale.

**The illegal-act register has no page.** `src/data/illegal/` is available
through the shim and its labels and notes exist in both locales, but nothing
renders it yet. It is a case-level register: do not chart it as a daily series,
because a count per day would count press coverage rather than acts.

---

## Quick start

Requires **Node ≥ 22.18** (ESM, native TypeScript type stripping) and a GitHub
credential for the one dependency that is not on the public registry.

```bash
# one-time, on your machine: the dataset package is on GitHub Packages
npm config set //npm.pkg.github.com/:_authToken <classic PAT with read:packages>

git clone --recurse-submodules https://framagit.org/manifestigations/Protest-Data-Observatory.git
cd Protest-Data-Observatory
npm install

npm run build # one-shot build → docs/bundle.js + docs/styles.css
npm run dev # rebuild on save + serve http://127.0.0.1:3000
npm run typecheck # tsc --noEmit
npm run lint # eslint .
npm run format:check # prettier --check .
npm run check:comments # comment/header conventions
```

`npm run dev` runs `node scripts/build.ts --watch` and also spawns `server.ts`,
which serves `docs/` on `127.0.0.1:3000` (`PORT` / `HOST` env vars,
`Cache-Control: no-store`). There is no `dev:server` script: for two terminals,
run a watch build and `node server.ts`.

**The credential.** `@manifestigations/dataset` is served from GitHub Packages,
which requires an access token even though the package is public, and accepts
only **classic** personal access tokens (fine-grained tokens do not work for
npm). A token with `read:packages` is enough. Put the `_authToken` line in your
`~/.npmrc`, never in this repository's `.npmrc` — the committed file carries
only the scope mapping, so that nobody who lacks a token is blocked from
installing `chart.js` and `htm`. See [CONTRIBUTING, §3.1](CONTRIBUTING.md#31-set-up).

No framework, no test runner, no bundler config beyond the two esbuild
configs in `scripts/build.ts`. Runtime dependencies: `chart.js` (canvas) and
`htm` (~600 B gzip), which turns `html` tagged templates into real DOM nodes —
no virtual DOM, nothing re-renders. `src/core/dom.ts` holds the DOM helpers
(`byId`, `el`); markup goes through `src/core/html.ts`.

---

## Repository map

| Path                                                    | What it is                                                                                                                                                              | Touch it when                                       |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `src/data/facts.ts`                                     | The 2026 observations, keyed by ISO date — **a copy of the Dataset file; edit it in `Dataset`**                                                                         | a 2026 number changes                               |
| `src/data/index.ts`                                     | Entry point for the 2026 layer (a shim): verification record plus re-exports. No logic                                                                                  | never — import from it, don't edit it               |
| `src/data/costs.ts`                                     | Who pays: `PAYER_COSTS`, `COST_UNPRICED` — a **shim** of the Dataset file                                                                                               | a cost changes, in `Dataset`                        |
| `src/data/illegal/`                                     | The case-level register — **a shim** of `Dataset:src/data/illegal/`: `ILLEGAL_ACTS`, `NORMATIVE`, `SITTINGS`, `CHARGES`                                                 | never here; a record is added in `Dataset`          |
| `src/charts/notes.ts`                                   | `noteText()` for `NoteRef`s, `costNoteText()` for cost notes, `suffixFor()` for markers                                                                                 | a note resolves wrongly                             |
| `src/data/{projections,aggregate,student-weeks}.ts`     | Daily and weekly series **computed** from `facts.ts`                                                                                                                    | only the arithmetic behind a series                 |
| `src/data/episodes/*.ts`                                | One file per historical movement (`mai68`, `cpe`, `gilets-jaunes`, `nahel`, `retraites`, `bloquons`, `students`) — copies of Dataset files                              | a historical series changes                         |
| `src/data/sources/*.ts`                                 | Source catalogue: publisher, verbatim headline, URL, date, what it is used for                                                                                          | you cite anything new                               |
| `src/data/sources/types.ts`                             | `Source`, `SourceGroup`, `GroupId`, `Mention`                                                                                                                           | rarely — adding a new source group                  |
| `src/data/casualties/`                                  | Case-level casualty data, the severity ladder, estimates, checks — and `CODE_SPANS`, the ICD-10 / AIS codebook behind each published label — all **shims** of `Dataset` | a casualty figure or a classification, in `Dataset` |
| `src/data/disruptive/`                                  | Disruptive acts: one `ActRow` per (date, category), each with a `unit`                                                                                                  | disruptive figures                                  |
| `src/data/{population,policing,helicopters,opinion}.ts` | Denominators, deployments and cost rate, helicopter, poll approval series                                                                                               | rarely                                              |
| `src/data/notes.ts`                                     | Structured note copy, rendered per locale and referenced by `noteRef`                                                                                                   | a note needs new wording                            |
| `src/model/index.ts`                                    | Pure types and definitions: `Metric`, `Flag`, `Band`, `Row`, `Episode`, `isDetached`                                                                                    | never casually — everything depends on it           |
| `src/charts/`                                           | Chart.js setup: specs, datasets, axes, tooltip, plugins (`error-bars`, `hatch`, `connectors`, `clip`, `span-mark`), `trellis/` engine for multi-panel                   | drawing changes                                     |
| `src/sections/`                                         | One folder per page area: `kpis`, `summary`, `casualties`, `costs`, `percapita`, `context`, `sources`, `about`, `contribute`, `cards`, plus `chrome.ts`                 | page structure                                      |
| `src/copy/{en,fr}/` + `src/copy/*.ts`                   | All UI copy, `Bi = { en, fr }`, lookup/format/interpolation helpers                                                                                                     | any wording                                         |
| `src/copy/legal.ts`                                     | `CHARGE_LABELS`, side and hearing-mode labels, the presumption caption — keyed by Dataset ids                                                                           | a `ChargeId` is added in `Dataset`                  |
| `src/core/`                                             | DOM helpers, the htm binding (`html.ts`), lang switch, theme, colors, a11y, canvas registry                                                                             | infrastructure only                                 |
| `src/site/`                                             | `routes.ts` (page table), `media.ts` (hero images)                                                                                                                      | adding a page                                       |
| `src/entry/main.ts`                                     | Boot: locale, chrome, then guarded mounts                                                                                                                               | wiring a new section                                |
| `src/styles/index.css`                                  | All CSS, bundled to `docs/styles.css`                                                                                                                                   | styling                                             |
| `scripts/`                                              | `build.ts`, `check-casualties.ts`, `check-comments.ts`                                                                                                                  | build/checks                                        |
| `server.ts`                                             | Static dev server for `docs/`                                                                                                                                           | rarely                                              |
| `docs/`                                                 | **Committed build output** + HTML shells + images + transcripts                                                                                                         | rebuild after source changes                        |
| `content/`                                              | Long-form notes: `my-analysis.md`, `data-problems.md`, `how-i-made-this.md`                                                                                             | prose about method                                  |
| `vendor/dataset`                                        | The `Dataset` submodule at the pinned commit                                                                                                                            | bumped after a data merge, never edited             |
| `.npmrc`                                                | Scope mapping for `@manifestigations` → GitHub Packages. **No token.**                                                                                                  | the registry changes                                |
| `.gitlab-ci.yml`                                        | CI: checks, the pin assertion, the Pages publish                                                                                                                        | the pipeline changes                                |
| `.gitlab/merge_request_templates/`                      | The MR body                                                                                                                                                             | the review checklist changes                        |

**The `src/data/` rows are the exception to "edit here".** Those files are a
checked-in copy of `manifestigations/Dataset`; the same paths exist there and
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
| `NoteRef` | a _reference_ to copy (`obs`, `policing`, `cumulative`, `week`, `act`, and the `heli` variant), never the copy itself                                                                                                  |

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

### The illegal-act register is not a series

`ILLEGAL_ACTS` is a list of **cases**, not a metric:

| Field     | In the record                                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `side`    | `police`, `protesters`, `far-right`. The third is a label someone applied, so the record also carries `attribution: { term, by }` — the source's word and who used it     |
| `charges` | a list of `ChargeId`, `[]` when no qualification has been published. `CHARGE_LABELS` in `src/copy/legal.ts` is `Record<ChargeId, Bi>`, so a missing label is a type error |
| `status`  | `alleged` → `complaint` → `investigation` → `charged` → `tried` → `convicted`/`acquitted`, plus `dismissed`, `prescribed`, `unknown`                                      |
| `steps`   | the dated trail that justifies `status`                                                                                                                                   |
| `count`   | optional, and absent whenever `refs` links to a figure owned by `facts.ts` or `casualties/`                                                                               |

`NORMATIVE` holds police tactics read against the laws of war. Every entry is
`hypothetical` and carries a caveat; it is never summed with `ILLEGAL_ACTS` and
never drawn on the same axis. `SITTINGS` holds the conditions of a court day —
rooms and dockets — and is never added to an act.

### Casualty labels carry a codebook, not a diagnosis

The casualties page shows two things about each published injury label: the
severity it was given, and the injuries it _could_ stand for. The second is
`CODE_SPANS` in `Dataset:src/data/casualties/coding.ts`, and the distinction is
load-bearing:

| Field        | Means                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `grain`      | `"type"` when the label names an injury (`amputations`, `éborgnés`), `"severity"` when it names a degree (`légèrement blessé`, `blessés graves`) |
| `icd10`      | admissible chapter XIX categories — a set, never a single probable code                                                                          |
| `external`   | chapter XX, where the label has an external cause                                                                                                |
| `ais`        | the AIS severity range the label is consistent with, or `null`                                                                                   |
| `assignment` | `"none"`, always. No record here carries a diagnosis                                                                                             |

Of the nine published labels, only four name an injury — 10 eye losses, 7
amputations, 9 craniofacial traumas, 1 death — and the register's other 52
serious injuries do not. ISS, NISS and TRISS therefore cannot be computed and
are never shown.

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
   commit: the `vendor/dataset` pin moves, and the `@manifestigations/dataset`
   version in `package.json` moves with it, because `src/copy/types.ts` types
   against the built package. Never hand-edit the copied data files in this
   repository as a way of fixing the site.
5. **Spec** — charts read these through `src/charts/specs.ts` /
   `datasets.ts`; only touch this if the measure is new.
6. **Copy** — any new caption, axis label or legend entry is `{ en, fr }` in
   `src/copy/`.
7. **Build** — `npm run build`, commit `docs/bundle.js` and `docs/styles.css`
   along with the source change.

---

## Deployment

Framagit Pages serves `docs/` exactly as committed: `docs/bundle.js`,
`docs/styles.css`, the HTML shells and the images. There is no CI build step.
**If you change anything under `src/`, you must rebuild and commit the generated
files** — otherwise the live site keeps serving the old bundle. Never hand-edit
`docs/bundle.js` or `docs/styles.css`; edit the source and rebuild.

The publish is one job in `.gitlab-ci.yml`, `deploy-pages`, which declares
`pages: publish: docs`. GitLab appends the publish path to the job's artifacts
automatically (since 17.10), so the job needs neither a copy step nor an
`artifacts:` block of its own. It is deliberately **not** named `pages`: that
job name is deprecated, and a job is recognised as a Pages job by the `pages`
keyword, not by its name.

Once per project, in settings:

- a **runner** must be available to the project, or nothing above runs;
- **Settings → General → Visibility → Pages** must be _Everyone_, otherwise the
  site 404s even though the job succeeded. A repository-internal Pages site is
  no use for a public observatory;
- the hostname is shown under **Deploy → Pages**. Copy it from there rather than
  constructing it: it is
  `https://manifestigations.frama.io/Protest-Data-Observatory/`.

`CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH` is the only publish rule, so a merge
request never deploys.

---

## CI

`.gitlab-ci.yml` runs on merge requests and on the default branch:

| Job              | Runs                                                             | Blocking                  |
| ---------------- | ---------------------------------------------------------------- | ------------------------- |
| `typecheck`      | `npm run typecheck`                                              | yes                       |
| `lint`           | `npm run lint`, `npm run format:check`, `npm run check:comments` | yes                       |
| `bundle-in-sync` | rebuilds and fails if the committed `docs/` differs              | **no** — advisory, on MRs |
| `dataset-pin`    | asserts `vendor/dataset` sits on a tag, not a branch tip         | MRs only                  |
| `deploy-pages`   | publishes `docs/`                                                | default branch only       |

`bundle-in-sync` is advisory because esbuild output is not guaranteed
byte-identical across environments, and a formatting-only diff must never block
a data correction. Treat a red run as "you probably forgot to rebuild", not as
a veto.

**One CI variable is required: `NPM_TOKEN`.**

| Property  | Value                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------- |
| Type      | a **classic** GitHub personal access token — GitHub Packages does not accept fine-grained tokens for npm |
| Scope     | `read:packages`                                                                                          |
| Masked    | **yes**                                                                                                  |
| Protected | **no**                                                                                                   |

Do not mark it protected. A protected variable is only exposed to pipelines on
protected branches and tags, so every merge request pipeline — which runs on an
unprotected source branch — would receive an empty token and fail with `E401`
before a single check runs.

The committed `.npmrc` holds the scope mapping and no credential:

```
@manifestigations:registry=https://npm.pkg.github.com
```

The token is injected in the `.node` anchor with
`npm config set //npm.pkg.github.com/:_authToken "$NPM_TOKEN"`, which writes to
the job's `~/.npmrc`. Every job that installs extends that anchor.

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
  displays it. An illegal-act record that links to a figure with `refs` must not
  restate it.
- **A code is admissible, not assigned.** `CODE_SPANS` describes what a
  published label could stand for. No page may present an ICD-10 code as a
  patient's diagnosis, and no severity label may be given an injury type it did
  not state.
- **French is written, not translated.** French copy that reads like a
  translation is a bug worth reporting.
- **Accessibility is part of the data's honesty**: canvas descriptions, tab
  order, contrast, and black-and-white maps under `prefers-contrast`.
- **Consent, anonymity and safety come before the figure**, always.
- **An empty column is a finding.** In 2026 nothing is disbursed, because no
  one publishes a claims-paid figure. Draw it as "not published", never as
  zero, and never fill it with the committed total.
- **Never apply a label of our own to a group.** "Far-right" is attributed, not
  asserted: the record prints whose word it is.
- **A note explains provenance and procedure, never the verdict.** The status
  and the count are fields; restating them in prose gives them a second home
  that will contradict the first.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for this repository, and the
[Dataset CONTRIBUTING](https://framagit.org/manifestigations/Dataset/blob/main/CONTRIBUTING.md)
for a figure. For anything larger than a data cell or a typo, **open an issue
first** — settling the data question usually halves the code. Coding agents
should read [AGENTS.md](AGENTS.md) before editing.

Work arrives as a **merge request against `main` on Framagit**, with
`.gitlab/merge_request_templates/default.md` as the body. The GitHub project is
a push mirror; a pull request opened there is overwritten and will not be
reviewed.

Site copy on contributing, in French: `docs/contribute.html`.

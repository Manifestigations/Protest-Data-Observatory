# Contributing

Two rules cover most of it:

1. **A figure without a source does not go in.** One number, one date, one link.
2. **Open an issue before a large pull request.** Settling the data question
   first usually halves the code.

French or English, whichever is easier for you. A free GitHub account is the
only requirement for reporting.

**Which repository?** The figures live in
[Manifestigations/Dataset](https://github.com/Manifestigations/Dataset); the
charts, pages and copy live here. A number is corrected **there**, never here —
this repository only re-exports the Dataset files (see §2).

---

## 1. Reporting a figure (no code, no install)

Use the [figure form](https://github.com/Manifestigations/Dataset/issues/new?template=report-a-figure.yml)
or a plain issue in the **Dataset** repository. Include:

| Field                    | What we need                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| What the number measures | crowd, strikers, arrests, injuries (which side), blockaded schools, damage, cost of policing                         |
| Where and when           | the date (`YYYY-MM-DD`), and the territory — national, a region, a city, one institution                             |
| The number as published  | keep the range if the publisher gives one; do not average two publishers for us                                      |
| The source               | a URL, a report title and page, or outlet and date. Paywalled or PDF is not an obstacle: say so and we will fetch it |
| Who published it         | and whether it is a **count** or an **estimate** — charts distinguish the two                                        |

Also welcome as issues **here**, in this repository:

- a chart that is wrong: a range drawn from a single publisher, an interpolated
  gap that should have stayed empty, a detached point joined to the line;
- an accessibility problem: tab order, canvas descriptions, contrast,
  black-and-white maps under `prefers-contrast`;
- French copy that reads like a translation — because it is one.

If you count in the street (street medic, legal observer, anyone keeping a
tally), the field guide is still being written; propose a topic in an issue.
What to note in the moment: time, place, who was counting, and the limit of what
was counted. A count and an estimate are different data — note which one you
have, and never round a count up into an estimate. Always the denominator.
Consent, anonymity and safety override the data point, every time.

### Sharing a chart

Link the page, not a screenshot: the figures stay current and the source travels
with them. Cite the range, not one of its bounds — "between 175,000 and 197,000"
is the result; a single bound is half a truth. Say what the chart does not show:
each page states its gaps under its title. Point to the page's Sources section
so the number can be checked without trusting us.

---

## 2. Data is not edited here

Every file under `src/data/` in this repository except `src/data/notes.ts` is a
one-line re-export shim into `vendor/dataset/src/data/…`. The figures are
authored in [Manifestigations/Dataset](https://github.com/Manifestigations/Dataset)
and reach the site as source imports.

Concretely:

- To change a figure, follow the
  [Dataset CONTRIBUTING](https://github.com/Manifestigations/Dataset/blob/main/CONTRIBUTING.md)
  and open the pull request there.
- **Do not edit a shim.** An edit there is overwritten the next time
  `scripts/make-shims.js` runs, and it is invisible to review in the repository
  that owns the data.
- **Do not run `node scripts/make-shims.js` without reading it first.** It
  rewrites every `.ts` under `src/data` with no exclusion list, so it will
  replace `src/data/notes.ts` — which is hand-written note copy — unless a
  matching file exists in `vendor/dataset/src/data/`.
- If imports under `src/data/…` fail to resolve, the `vendor/dataset` checkout
  is missing; that is a setup problem, not a data problem.

The one piece of data-adjacent copy authored **here** is `src/data/notes.ts`:
the wording of a note attached to a cell by `noteRef`. It must exist in both
languages, and it is the only file under `src/data/` you may edit.

---

## 3. Editing code

The stack, in full: TypeScript, no framework, one esbuild bundle, Chart.js on
canvas, plain DOM helpers, CSS in one file. All pages share one bundle; each
page's HTML shell carries `data-page`, and `src/entry/main.ts` mounts only that
page's sections (every mount is guarded).

### 3.1 Set up

```bash
git clone https://github.com/Manifestigations/Protest-Data-Observatory.git
cd Protest-Data-Observatory
# make vendor/dataset available (the data shims import from it)
npm install # Node ≥ 22.18
npm run dev # watch build + dev server on http://127.0.0.1:3000
npm run typecheck
```

`npm run dev` runs `scripts/build.ts --watch` and spawns `server.ts`. There is
no `dev:server` script; run `node server.ts` if you want the server alone.

### 3.2 Good places to start

- `src/charts/` — specs, datasets, axes, tooltips, plugins. A range drawn from
  a single publisher, or a gap that got interpolated, is a chart bug worth
  fixing.
- `src/charts/trellis/` — the multi-panel engine behind the historical pages.
- `src/core/colors.ts`, `src/charts/palette.ts` — colour and the hollow-point
  rule for detached cells.
- `src/core/a11y.ts`, `src/site/routes.ts` — tab order, breadcrumbs, page table.
- `src/copy/{en,fr}/` — wording, `Bi = { en, fr }` next to the module using it.
- `src/sections/` — one folder per page area.

### 3.3 Conventions

- Never hardcode a user-visible string: add it as `{ en, fr }` and read it
  through `t()` / `bi()`. A string that exists in only one language is a bug.
- French is authored, not machine-translated.
- A chart module imports figures through `src/data/…` (the shims), never a
  literal number.
- No new dependencies without an issue first. There is no test framework;
  `npm run typecheck`, `npm run lint`, the build and `npm run check:casualties`
  are the checks.
- Keep the bundle working without JavaScript for content that is in the HTML
  shells, and keep canvas descriptions in sync when a chart changes.

### 3.4 Build and commit

```bash
npm run build
npm run typecheck
git add src docs/bundle.js docs/styles.css
git commit -m "charts: keep hollow points after the pagination move"
```

`docs/bundle.js` and `docs/styles.css` are **committed artifacts** — GitHub
Pages serves them as-is and there is no CI build. A PR that changes `src/`
without rebuilding leaves the live site stale.

**Do not commit `docs/*.map`.** Sourcemaps are emitted only by a `--watch`
build (`sourcemap: dev`), so a one-shot `npm run build` cannot produce them —
a committed map would silently describe a different bundle from the one being
served.

Comments:

- File header. Every module opens with a `/** */` block: what it is, what it may import, what it must not touch. One file, one job.
- `/** */` for anything exported or non-obvious; `//` for a single line inside a function; `/* */` when a comment runs to more than one line. Never `// +`, never numbered `/* 3. …` lists.
- Banners are `/* ── Title ───────── */` inside a file, `/* ====== path — purpose ====== */` only for the file header. No `-----`.
- No change-log comments. "was 0.18", "now dims through `fade()`" belongs in the commit message. Keep the reason, drop the history.
- A comment states a fact about the code next to it, including limits: a number in prose must match the literal below it, and every arithmetic comment (1,233 − 1,167 = 66) is checkable by hand.
- Prose is a claim, not a wish. If the code does not do it, the comment is a bug report — file it, don't word it away.
- Wrap at 80 columns, no trailing whitespace, `colors.ts` not `colours.ts`.

---

## 4. Pull request checklist

- [ ] No file under `src/data/` edited except `notes.ts`; any figure change
      links to the Dataset pull request.
- [ ] Ranges are kept as ranges; nothing averaged across publishers.
- [ ] Flags describe the data, not the drawing.
- [ ] Gaps left empty; derived cells flagged `e` with the arithmetic in the note.
- [ ] Any new string exists in both `en` and `fr` (`notes.ts` included).
- [ ] `npm run typecheck`, `npm run lint` and `npm run format:check` pass.
- [ ] `npm run build` was run; `docs/bundle.js` and `docs/styles.css` committed.
- [ ] No `.map` file staged.
- [ ] `content/data-problems.md` updated if you settled a known data problem
      (the prose lives here; the resulting cell change lands in Dataset).

We will not merge: a figure with no source, a silently interpolated gap, a
translated source label, a flag removed to smooth a line, a hand-edited shim, or
a source change without the rebuilt bundle.

## Commit messages

Descriptive, often lowercase, sometimes numbered when part of a series:

```
charts: keep hollow points after the pagination move
project structure refactor, pt 2.3 (splitting episodes.ts)
copy: name the curfew in both locales
```

State data changes explicitly in the **Dataset** repository (`data:`, which
figure, which date, which publisher). If an LLM drafted the change, say so in a
`Co-authored-by:` trailer — this project is explicit about what was
machine-written.

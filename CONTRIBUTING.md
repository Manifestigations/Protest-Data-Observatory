# Contributing

Two rules cover most of it:

1. **A figure without a source does not go in.** One number, one date, one link.
2. **Open an issue before a large pull request.** Settling the data question
   first usually halves the code.

French or English, whichever is easier for you. A free GitHub account is the
only requirement for reporting.

---

## 1. Reporting a figure (no code, no install)

Use the [figure form](https://github.com/Manifestigations/Protest-Data-Observatory/issues/new?template=report-a-figure.yml)
or a plain issue. Include:

| Field                    | What we need                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| What the number measures | crowd, arrests, injuries, blockaded schools, damage, cost of policing                                                |
| Where and when           | the date, and the territory — national, a region, a city, one institution                                            |
| The number as published  | keep the range if the publisher gives one; do not average two publishers for us                                      |
| The source               | a URL, a report title and page, or outlet and date. Paywalled or PDF is not an obstacle: say so and we will fetch it |
| Who published it         | and whether it is a **count** or an **estimate** — charts distinguish the two                                        |

Also welcome as issues:

- a movement missing from the historical comparison, or a group of sources to
  add under `src/data/sources`;
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

## 2. Editing data

Skills: editing literal values in a TypeScript file. You do not need to know the
framework, React or Chart.js.

### 2.1 Set up

```bash
git clone https://github.com/Manifestigations/Protest-Data-Observatory.git
cd Protest-Data-Observatory
npm install                    # Node ≥ 22.18
node scripts/build.ts --watch   # builds + serves http://127.0.0.1:3000
npm run typecheck
```

### 2.2 Find the right file

| You are changing                                 | File                                          |
| ------------------------------------------------ | --------------------------------------------- |
| An autumn 2026 figure (any day or week)          | `src/data/data.ts`                            |
| A historical movement                            | `src/data/episodes/<movement>.ts`             |
| A source (URL, headline, date, what it supports) | `src/data/sources/<group>.ts`                 |
| A note explaining a cell                         | `src/data/notes.ts` (referenced by `noteRef`) |
| A casualty case or level                         | `src/data/casualties/`                        |
| A denominator (population)                       | `src/data/population.ts`                      |

### 2.3 Add or correct a cell

A row is one week. Bands are `number` or `[low, high]`:

```ts
{ w: 1, from: "2023-07-03", to: "2023-07-09", a: 108, f: 1 },
{ w: 0, from: "2023-06-26", to: "2023-07-02", p: [8_000, 50_000], a: 3_354, f: 722, flag: { p: "e" } },
```

Rules:

- Keep ISO dates (`YYYY-MM-DD`); `from`/`to` must bracket `w`.
- Keep the published range as a range. Do not compute a midpoint.
- Flag anything that is not a plain national count:

| Flag | Use it when                                                      |
| ---- | ---------------------------------------------------------------- |
| `n`  | published national point figure (default; can be omitted)        |
| `r`  | regional only — one city, one prefecture                         |
| `p`  | partial coverage                                                 |
| `f`  | floor: "at least N"                                              |
| `e`  | derived or modelled — tooltip must state the arithmetic          |
| `c`  | cumulative stock, or a subset of a larger published total        |
| `w`  | weekly aggregate                                                 |
| `x`  | a wider measure than the metric's definition (perturbés, closed) |

`r`, `p`, `e`, `c` are **detached** (`isDetached()`): the point is drawn hollow
and is never joined to the national line. Do not flip a flag to make a line
continuous — fix the note instead.

- A week with no published figure stays empty. Do not interpolate.
- If the cell needs explaining, add `noteRef` and put the wording in
  `src/data/notes.ts` in both languages. Notes are references, not copy.

### 2.4 Add the source

```ts
src(
  "wiki-nahel",
  "nahel",
  "Mort de Nahel Merzouk",
  "https://fr.wikipedia.org/wiki/Mort_de_Nahel_Merzouk",
  both(
    "the 3,354 arrests and 722 officers injured of 27 Jun – 2 Jul 2023.",
    "les 3 354 interpellations et 722 policiers blessés du 27 juin au 2 juill. 2023.",
  ),
  "2026-11-13",
),
```

- `label` is the publisher and headline **verbatim** — never translate it.
- `what` is bilingual and states what this page takes from the source.
- `date` is the publication date (ISO); omit it for standing pages.
- Use an existing `group` id (`official`, `press`, `blockades`, `cost`,
  `overseas`, `ref2026`, `mai68`, `cpe`, `gj`, `strikes`, `nahel`, `retraites`,
  `rn2024`, `bloquons`, `media`); add a new group only in `types.ts`, its
  `SourceGroup`, and `src/data/sources/index.ts`.

### 2.4b If you added a numeric-metric cell

Run `npm run check:casualties` for casualty data. It fails loudly on internal
inconsistencies; a failure means the data contradicts itself, not that the
check is too strict.

### 2.5 Build and commit

```bash
node scripts/build.ts
npm run typecheck
git add src docs/bundle.js docs/bundle.js.map docs/styles.css docs/styles.css.map
git commit -m "data: 2026 arrests for 8 Nov corrected to 412 (prefecture)"
```

`docs/bundle.js` and `docs/styles.css` are **committed artifacts** — GitHub
Pages serves them as-is and there is no CI build. A PR that changes `src/`
without rebuilding leaves the live site stale.

---

## 3. Editing code

The stack, in full: TypeScript, no framework, one esbuild bundle, Chart.js on
canvas, plain DOM helpers, CSS in one file. All pages share one bundle; each
page's HTML shell carries `data-page`, and `src/entry/main.ts` mounts only that
page's sections (every mount is guarded).

Good places to start:

- `src/charts/` — specs, datasets, axes, tooltips, plugins. A range drawn from
  a single publisher, or a gap that got interpolated, is a chart bug worth
  fixing.
- `src/charts/trellis/` — the multi-panel engine behind the historical pages.
- `src/core/colors.ts`, `src/charts/palette.ts` — colour and the hollow-point
  rule for detached cells.
- `src/core/a11y.ts`, `src/site/routes.ts` — tab order, breadcrumbs, page table.
- `src/copy/{en,fr}/` — wording, `Bi = { en, fr }` next to the module using it.

Conventions:

- Never hardcode a user-visible string: add it as `{ en, fr }` and read it
  through `t()` / `bi()`. A string that exists in only one language is a bug.
- French is authored, not machine-translated.
- Data and copy are separate layers: a chart module imports figures from
  `src/data`, never a literal number.
- No new dependencies without an issue first. There is no test framework;
  `npm run typecheck`, the build, and `npm run check:casualties` are the checks.
- Keep the bundle working without JavaScript for content that is in the HTML
  shells, and keep canvas descriptions in sync when a chart changes.

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

- [ ] Every new or changed figure has a `Source` entry, and `label` is verbatim.
- [ ] Ranges are kept as ranges; nothing averaged across publishers.
- [ ] Flags describe the data, not the drawing.
- [ ] Gaps left empty; derived cells flagged `e` with the arithmetic in the note.
- [ ] Any new string exists in both `en` and `fr`.
- [ ] `npm run typecheck` passes; `node scripts/build.ts` was run.
- [ ] `docs/bundle.js`, `docs/bundle.js.map`, `docs/styles.css`,
      `docs/styles.css.map` committed.
- [ ] `content/data-problems.md` updated if you settled a known data problem.

We will not merge: a figure with no source, a silently interpolated gap, a
translated source label, a flag removed to smooth a line, or a source-count
change without the rebuilt bundle.

## Commit messages

Descriptive, often lowercase, sometimes numbered when part of a series:

```
data: 2026 arrests for 8 Nov corrected to 412 (prefecture)
charts: keep hollow points after the pagination move
project structure refactor, pt 2.3 (splitting episodes.ts)
```

State data changes explicitly (`data:`, which figure, which date, which
publisher). If an LLM drafted the change, say so in a `Co-authored-by:` trailer
— this project is explicit about what was machine-written.

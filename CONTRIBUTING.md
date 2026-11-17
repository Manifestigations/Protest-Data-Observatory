# Contributing

Two rules cover most of it:

1. **A figure without a source does not go in.** One number, one date, one link.
2. **Open an issue before a large pull request.** Settling the data question
   first usually halves the code.

French or English, whichever is easier for you. A free GitHub account is the
only requirement for reporting.

---

## 1. Updating Data

See the [Dataset repo](https://github.com/Manifestigations/Dataset/issues/new?template=report-a-figure.yml).

---

## 2. Editing code

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
  `npm run typecheck`, `npm run lint`, `npm run format:check`, the build,
  and `npm run check:casualties` are the checks (all four style commands
  also run in CI).
- Keep the bundle working without JavaScript for content that is in the HTML
  shells, and keep canvas descriptions in sync when a chart changes.

Comments:

- File header. Every module opens with `/* ── path — purpose ────────`: the
  banner line names the module, the paragraph under it says what it is, what it
  may import, what it must not touch. One file, one job. The paragraph sits
  inside the same comment; the banner line does not close it.
- `/** */` for anything exported or non-obvious; `//` for a single line inside
  a function; `/* */` for a multi-line note, three-space continuation, no
  leading asterisks. Never `// +`, never numbered `/* 3. …` lists.
- Banners are `/* ── Title ───────── */`, padded to 79 columns with `─`. No
  `-----`, no `====`, no `----- title -----`.
- No change-log comments. "was 0.18", "now dims through `fade()`" belongs in the commit message. Keep the reason, drop the history.
- A comment states a fact about the code next to it, including limits: a number in prose must match the literal below it, and every arithmetic comment (1,233 − 1,167 = 66) is checkable by hand.
- Prose is a claim, not a wish. If the code does not do it, the comment is a bug report — file it, don't word it away.
- Wrap at 80 columns, no trailing whitespace, `colors.ts` not `colours.ts`.

### Formatting and linting (enforced by CI)

Prettier is the formatter and ESLint is the linter; Prettier owns style
questions, ESLint only flags likely bugs. Never hand-fix what a command can
fix, and never add a new `eslint-disable` without a comment saying why.

| Rule            | Value                        |
| --------------- | ---------------------------- |
| Indent / tabs   | 2 spaces                     |
| Quotes          | double for strings           |
| Semicolons      | yes                          |
| Line width      | 80                           |
| Trailing commas | everywhere the parser allows |
| Line endings    | LF                           |

Imports are organized automatically by Prettier:
`prettier-plugin-organize-imports` runs TypeScript's organize-imports on
every `.ts`/`.tsx` file, collapsing the import list into a single block in
canonical order (side-effect imports first, then third-party, then relative
paths), sorted by module specifier, with named and type specifiers
alphabetical within each statement. It does not touch `eslint.config.js`,
`scripts/*.js`, or other JS files — keep those import lists hand-ordered.
Do not reorder or regroup imports by hand — change one import at a time and
run:

```bash
npm run format      # rewrites changed files (also sorts imports)
npm run format:check # fails if any file would change
npm run lint        # ESLint; `npm run lint:fix` for auto-fixable ones
```

The **Style** workflow (`.github/workflows/style.yml`) runs both checks on
every push to `main` and every pull request, and pull requests are blocked
while either check is red.

`docs/bundle.js`, its sourcemap and `docs/styles.css` are committed build
output (see §2.5) and are excluded from both tools; never edit them by
hand, and never add them to a format-only commit.

---

## 3. Pull request checklist

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

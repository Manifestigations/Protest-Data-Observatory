## What this changes

<!-- One line. If it changes a figure, say which and where it was authored. -->

## Data provenance

- [ ] Any number changed here was authored in `Manifestigations/Dataset`, not in `src/data/`
- [ ] `vendor/dataset` pin bumped to the Dataset release tag that carries it
- [ ] `pnpm run build` run and `docs/bundle.js` + `docs/styles.css` committed
- [ ] New or changed user-visible copy exists as `{ en, fr }`

## Checks

- [ ] `pnpm run typecheck`
- [ ] `pnpm run format:check && pnpm run lint && pnpm run check:comments`

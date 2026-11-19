export * from "./a11y.ts";
export * from "./chrome.ts";
export { COST_COPY_EN, type CostCopy } from "./en/costs.ts";
export { HELI_COPY_EN } from "./en/helicopters.ts";
export * from "./format.ts";
export { COST_COPY_FR } from "./fr/costs.ts";
export { HELI_COPY_FR } from "./fr/helicopters.ts";
export * from "./interpolate.ts";
export * from "./lookup.ts";
export * from "./state.ts";
export * from "./types.ts";

/* Dataset split — explicit re-exports win over the `export *` above,
   resolving the name clashes against the vendored i18n core. */
export { fill, plural } from "./interpolate.ts";
export { bi, t, warnOnce } from "./lookup.ts";
export { current } from "./state.ts";

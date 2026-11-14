/* ============================================================ interpolation */

const TOKEN = /\{(\w+)\}/g;

/** `{token}` substitution; injects `s` ('' / 's') when `n` is numeric. */
export function fill(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  const p: Record<string, string | number> =
    typeof params.n === "number" && params.s === undefined
      ? { ...params, s: params.n === 1 ? "" : "s" }
      : params;
  return template.replace(TOKEN, (whole, name: string) =>
    name in p ? String(p[name]) : whole,
  );
}

/** Pluralisation, both call orders used by the modules. */
export function plural(word: string, n: number, many?: string): string;
export function plural(n: number, one?: string, many?: string): string;
export function plural(
  a: string | number,
  b?: number | string,
  c?: string,
): string {
  if (typeof a === "string") {
    const n = typeof b === "number" ? b : 0;
    return Math.abs(n) === 1 ? a : (c ?? `${a}s`);
  }
  const isOne = Math.abs(a) === 1;
  if (typeof b !== "string") return isOne ? "" : "s";
  return isOne ? b : (c ?? `${b}s`);
}

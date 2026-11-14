import { CATALOGUE } from "./catalogue";
import { fill } from "./interpolate";
import { current } from "./state";
import type { Bi, Catalogue, Lang } from "./types";

const SPAN_SEP = { en: " – ", fr: " – " };

/* ================================================================= lookups */

const DICT: Record<Lang, Record<string, string>> = {
  en: { "span.sep": SPAN_SEP.en },
  fr: { "span.sep": SPAN_SEP.fr },
};

export const warned = new Set<string>();
export function warnOnce(key: string, message: string): void {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[i18n] ${message}`);
}
const PASSTHROUGH = new Set([
  "then",
  "toJSON",
  "constructor",
  "length",
  "name",
  "toString",
  "valueOf",
  "hasOwnProperty",
  "inspect",
  "nodeType",
  "$$typeof",
  "prototype",
]);

const tolerant = new Map<Lang, Catalogue>();

/** Unknown branches warn once and yield '' rather than crashing a render. */
function catalogueFor(forLang: Lang): Catalogue {
  const cached = tolerant.get(forLang);
  if (cached) return cached;

  const proxy = new Proxy(CATALOGUE[forLang], {
    get(target, prop, receiver) {
      if (typeof prop !== "string" || prop in target || PASSTHROUGH.has(prop)) {
        return Reflect.get(target, prop, receiver);
      }
      const tag = `${forLang}:${prop}`;
      if (!warned.has(tag)) {
        warned.add(tag);
        console.warn(
          `[i18n] catalogue branch "${prop}" is missing (${forLang})`,
        );
      }
      return new Proxy({} as Record<string, unknown>, { get: () => "" });
    },
  }) as Catalogue;

  tolerant.set(forLang, proxy);
  return proxy;
}

/** No argument → the active catalogue. With a key → the dictionary string. */
export function t(): Catalogue;
export function t(key: string): string;
export function t(key: string, params: Record<string, string | number>): string;
export function t(
  key?: string,
  params?: Record<string, string | number>,
): string | Catalogue {
  if (key === undefined) return catalogueFor(current);

  const template = DICT[current][key] ?? DICT.en[key];
  if (template === undefined) {
    if (!warned.has(key)) {
      warned.add(key);
      console.warn(`[i18n] missing key "${key}" (${current})`);
    }
    return key;
  }
  return params === undefined ? template : fill(template, params);
}

export function bi(value: Bi): string {
  return value[current] ?? value.en;
}

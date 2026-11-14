import { EN_META } from "./en/meta";
import { buildFormats } from "./format";
import { FR_META } from "./fr/meta";
import { warnOnce } from "./lookup";
import type { Lang, LocaleMeta } from "./types";

export const DEFAULT_LANG: Lang = "fr";
export const DEFAULT_LOCALE: string = FR_META.tag;

/** Descriptors, reachable by bare code and by full tag. */
export const LOCALE_META: Readonly<Record<Lang, LocaleMeta>> = {
  en: EN_META,
  fr: FR_META,
};

const STORAGE_KEY = "lang";

const hasDom = (): boolean =>
  typeof window !== "undefined" && typeof document !== "undefined";

export function normalizeLocale(input: unknown): Lang | null {
  const low = String(input ?? "")
    .toLowerCase()
    .replace(/_/g, "-");
  if (
    low === "fr" ||
    low.startsWith("fr-") ||
    low === "français" ||
    low === "francais"
  )
    return "fr";
  if (low === "en" || low.startsWith("en-")) return "en";
  return null;
}

export function isLang(value: unknown): value is Lang {
  return normalizeLocale(value) !== null;
}

export function localeFromUrl(search?: string): Lang | null {
  if (search === undefined && !hasDom()) return null;
  try {
    const q = search ?? window.location.search;
    return normalizeLocale(new URLSearchParams(q).get("lang"));
  } catch {
    return null;
  }
}

function fromStorage(): Lang | null {
  if (!hasDom()) return null;
  try {
    return normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export let current: Lang = localeFromUrl() ?? fromStorage() ?? DEFAULT_LANG;

buildFormats(localeMeta(current).tag);

let version = 0;

/** Bumped on every change. Fold into any config memo key. */
export function localeVersion(): number {
  return version;
}

/** The one synchronous accessor. */
export function getLocale(): Lang {
  return current;
}

/* ============================================================ subscriptions */

type LocaleListener = (next: Lang, previous: Lang) => void;

const listeners = new Set<LocaleListener>();
let emitting = false;

export function onLocaleChange(fn: LocaleListener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function emit(next: Lang, previous: Lang): void {
  if (emitting) return;
  emitting = true;
  try {
    for (const fn of [...listeners]) {
      try {
        fn(next, previous);
      } catch (err) {
        console.error("[i18n] locale listener threw", err);
      }
    }
  } finally {
    emitting = false;
  }
}

export interface SetLangOptions {
  persist?: boolean;
  notify?: boolean;
}

export function setLang(next: Lang | string, opts: SetLangOptions = {}): Lang {
  const { persist = true, notify = true } = opts;
  const target = normalizeLocale(next);
  if (!target) {
    warnOnce(`locale:${String(next)}`, `unrecognised locale "${String(next)}"`);
    return current;
  }
  const previous = current;
  if (previous === target) return current;

  current = target;
  version += 1;

  const locale = localeMeta(target);
  buildFormats(locale.tag);

  if (hasDom()) {
    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, target);
      } catch {
        /* private mode or quota — never fatal */
      }
    }
    document.documentElement.lang = locale.meta.htmlLang;
    document.documentElement.dataset.lang = target;
  }
  if (notify) emit(target, previous);
  return current;
}

export function toggleLang(): Lang {
  return setLang(current === "fr" ? "en" : "fr");
}

/** Flat list, in display order — `.includes()`, `.map()`, `.length` all work. */
export const LOCALES: readonly Lang[] = Object.freeze([
  "fr",
  "en",
] as const) as readonly Lang[];

export function localeMeta(locale: Lang | string = current): LocaleMeta {
  return LOCALE_META[normalizeLocale(locale) ?? DEFAULT_LANG];
}

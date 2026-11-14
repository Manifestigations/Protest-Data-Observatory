/**
 * The eight measure flags, in one table.
 *
 * Previously written out four times: `ChartCopy.suffix`, `Catalogue.flags`, the
 * sources marker key, and the vocabulary comment in `data.ts`. Each copy drifted
 * (`f` was "floor" in three places and "lower bound" in one).
 *
 * Two words per flag, because the contexts differ in available space: a chip or
 * a legend cell wants `floor`, a chart suffix line has room for `lower bound`.
 * `w` and `n` carry no suffix word — a weekly chart's axis already states the
 * unit, and national is the unmarked default.
 *
 * `copy/i18n.ts` imports this module for its derived maps, so this file must
 * never import a *value* from there. Types only; they are erased.
 */

import type { Bi, Lang } from "./types";

/** Display order: national, then narrowest to widest. */
export type FlagKey = "n" | "r" | "p" | "f" | "e" | "c" | "w" | "x";

export interface FlagCopy {
  readonly key: FlagKey;
  /** Chip, legend and table word: as short as the meaning allows. */
  readonly chip: Bi;
  /** Word appended to a chart's suffix line. `null` ⇒ nothing appended. */
  readonly suffix: Bi | null;
  /** The sources key: one sentence per flag. `null` ⇒ not in the marker list. */
  readonly long: Bi | null;
}

export const FLAGS: readonly FlagCopy[] = [
  {
    key: "n",
    chip: { en: "", fr: "" },
    suffix: null,
    long: null,
  },
  {
    key: "r",
    chip: { en: "regional", fr: "régional" },
    suffix: { en: "regional", fr: "régional" },
    long: {
      en: "regional only — one département or one city, never extrapolated",
      fr: "régional seulement — un département ou une ville, jamais extrapolé",
    },
  },
  {
    key: "p",
    chip: { en: "partial", fr: "partiel" },
    suffix: { en: "partial", fr: "partiel" },
    long: {
      en: "partial — a floor, or two publishers disagreeing; both bounds shown",
      fr: "partiel — un plancher, ou deux éditeurs en désaccord ; les deux bornes affichées",
    },
  },
  {
    key: "f",
    chip: { en: "floor", fr: "plancher" },
    suffix: { en: "lower bound", fr: "borne inférieure" },
    long: {
      en: "lower bound — the true figure is at least this",
      fr: "borne inférieure — le chiffre réel est au moins celui-ci",
    },
  },
  {
    key: "e",
    chip: { en: "modelled", fr: "modélisé" },
    suffix: { en: "modelled", fr: "modélisé" },
    long: {
      en: "derived — modelled here, not published as such",
      fr: "dérivé — modélisé ici, non publié tel quel",
    },
  },
  {
    key: "c",
    chip: { en: "stock", fr: "stock" },
    suffix: { en: "stock", fr: "stock" },
    long: {
      en: "stock or actions-total — a different basis; never sum it with the rest",
      fr: "stock ou total d’actions — autre base de mesure ; ne jamais l’additionner au reste",
    },
  },
  {
    key: "w",
    chip: { en: "weekly", fr: "hebdomadaire" },
    suffix: null, // the axis already says "Week"/"Semaine"
    long: {
      en: "weekly aggregate — a week, not a day",
      fr: "agrégat hebdomadaire — une semaine, pas un jour",
    },
  },
  {
    key: "x",
    chip: { en: "wider measure", fr: "mesure plus large" },
    suffix: { en: "wider measure", fr: "mesure plus large" },
    long: {
      en: "wider measure — establishments perturbed, with classes suspended, or closed, rather than schools fully blocked",
      fr: "mesure plus large — établissements perturbés, cours suspendus ou fermés, plutôt que des lycées entièrement bloqués",
    },
  },
];

/** `regional` was a duplicate key alongside `r`; kept resolvable, nothing emits it. */
const ALIAS: Readonly<Record<string, FlagKey>> = { regional: "r" };

/** Unknown or absent flag ⇒ `null`, so callers render nothing rather than "undefined". */
export function flagKey(key: string | undefined): FlagKey | null {
  if (!key) return null;
  const k = (ALIAS[key] ?? key) as FlagKey;
  return FLAGS.some((f) => f.key === k) ? k : null;
}

/** Replaces the hand-written `ChartCopy.suffix` maps (both locales). Every key is
 *  present, valued `""` when the flag has no suffix word, exactly as before. */
export function suffixMap(lang: Lang): Readonly<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const f of FLAGS) out[f.key] = f.suffix ? f.suffix[lang] : "";
  return out;
}

/** Replaces the hand-written `Catalogue.flags` maps (both locales). */
export function flagMap(lang: Lang): Readonly<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const f of FLAGS) out[f.key] = f.chip[lang];
  return out;
}

/** The sources key, in `FLAGS` order: r, p, f, e, c, w, x — `n` has no entry. */
export const MARKERS: readonly { readonly key: FlagKey; readonly text: Bi }[] =
  FLAGS.filter((f): f is FlagCopy & { long: Bi } => f.long !== null).map(
    (f) => ({
      key: f.key,
      text: f.long,
    }),
  );

/* ── convenience readers, for tooltip and legend code that has a raw flag ── */

export function chip(key: string | undefined, lang: Lang): string {
  const k = flagKey(key);
  return k ? flagMap(lang)[k] : "";
}

export function suffix(key: string | undefined, lang: Lang): string {
  const k = flagKey(key);
  return k ? suffixMap(lang)[k] : "";
}

/* ============================================================== number/date */

import { t } from "./lookup";
import { current } from "./state";

const UTC = { timeZone: "UTC" } as const;

type DateWidth = "long" | "short" | "day";
let dates: Record<DateWidth, Intl.DateTimeFormat>;

type DateInput = Date | string | number;

let numFmt: Intl.NumberFormat;
let cptFmt: Intl.NumberFormat;
let eurFmt: Intl.NumberFormat;

/** The one place a locale tag becomes formatters. Called at module scope and
 *  by setLang(); nothing else may build an Intl object. */
export function buildFormats(tag: string): void {
  numFmt = new Intl.NumberFormat(tag, { maximumFractionDigits: 0 });
  cptFmt = new Intl.NumberFormat(tag, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });
  eurFmt = new Intl.NumberFormat(tag, { maximumFractionDigits: 1 });
  dates = {
    long: new Intl.DateTimeFormat(tag, {
      day: "numeric",
      month: "short",
      year: "numeric",
      ...UTC,
    }),
    short: new Intl.DateTimeFormat(tag, {
      day: "numeric",
      month: "short",
      ...UTC,
    }),
    day: new Intl.DateTimeFormat(tag, { day: "numeric", ...UTC }),
  };
}

export const nf = (): Intl.NumberFormat => numFmt;
export const compact = (): Intl.NumberFormat => cptFmt;
export const eurM = (): Intl.NumberFormat => eurFmt;

/** ISO strings parse as UTC, so '2026-10-01' cannot slip to 30 September. */
function toDate(value: DateInput): Date | null {
  if (value instanceof Date)
    return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value !== "string" || value.trim() === "") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** French writes the first of the month as "1er"; Intl never emits it. */
function firstOfMonth(s: string, d: Date): string {
  return current === "fr" && d.getUTCDate() === 1
    ? s.replace(/^1\b/, "1er")
    : s;
}

export function fmtDate(value: DateInput): string {
  const d = toDate(value);
  return d ? firstOfMonth(dates.long.format(d), d) : "—";
}

export function fmtDayMonth(value: DateInput): string {
  const d = toDate(value);
  return d ? firstOfMonth(dates.short.format(d), d) : "—";
}

/**
 * Week label. Two arguments give a range:
 *   fmtWeek('2026-10-12', '2026-10-18') → "12–18 Oct"  ·  "12–18 oct."
 *   fmtWeek('2026-09-28', '2026-10-04') → "28 Sep – 4 Oct"
 * One argument gives a single day-month, for callers that pass a lone date.
 */
export function fmtWeek(start: DateInput, end?: DateInput): string {
  const a = toDate(start);
  if (!a) return "—";
  if (end === undefined) return firstOfMonth(dates.short.format(a), a);

  const b = toDate(end);
  if (!b) return firstOfMonth(dates.short.format(a), a);

  const sameYear = a.getUTCFullYear() === b.getUTCFullYear();
  const sameMonth = sameYear && a.getUTCMonth() === b.getUTCMonth();

  if (sameMonth)
    return `${firstOfMonth(dates.day.format(a), a)}–${fmtDayMonth(b)}`;
  if (sameYear) return `${fmtDayMonth(a)} – ${fmtDayMonth(b)}`;
  return `${fmtDayMonth(a)} ${a.getUTCFullYear()} – ${fmtDayMonth(b)} ${b.getUTCFullYear()}`;
}

export interface SpanLike {
  readonly start?: DateInput | null;
  readonly end?: DateInput | null;
  readonly label?: string | null;
}

const ISO_ANY = /\d{4}-\d{2}-\d{2}/;
const ISO_ALL = /\b(\d{4}-\d{2}-\d{2})\b/g;

/**
 *   fmtSpan('2026-10-01', '2026-11-11')  → "1 Oct – 11 Nov 2026"
 *   fmtSpan('Mai 68')                    → verbatim
 *   fmtSpan({ start, end, label })
 */
export function fmtSpan(
  span: string | SpanLike | DateInput,
  end?: DateInput,
): string {
  const sep = t("span.sep");

  if (typeof span === "string") {
    if (end !== undefined) return `${fmtDayMonth(span)}${sep}${fmtDate(end)}`;
    return ISO_ANY.test(span)
      ? span.replace(ISO_ALL, (m) => fmtDayMonth(m))
      : span;
  }
  if (typeof span === "number" || span instanceof Date) {
    return end !== undefined
      ? `${fmtDayMonth(span)}${sep}${fmtDate(end)}`
      : fmtDate(span);
  }
  if (span.label) return span.label;
  if (span.start != null && span.end != null) {
    return `${fmtDayMonth(span.start)}${sep}${fmtDate(span.end)}`;
  }
  if (span.start != null) return fmtDate(span.start);
  if (span.end != null) return fmtDate(span.end);
  return "—";
}

/**
 * Share, for tooltips: "12%" at 10 and above, "4.5%" below, so a small share
 * never reads as "0%". Was a file-local const in episodes.ts.
 *
 * Deliberately not built on Intl: the % glyph and its placement are identical
 * in both locales, and the thresholds are part of the copy's meaning.
 */
export function pctOf(v: number, base: number): string {
  const r = (100 * v) / base;
  return r >= 10 ? `${Math.round(r)}%` : `${Number(r.toFixed(1))}%`;
}

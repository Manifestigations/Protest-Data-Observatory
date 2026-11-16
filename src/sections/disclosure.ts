/* ==========================================================================
   src/sections/disclosure.ts — sections as collapsible cards.
   Must run after renderChrome(): the <header> it relocates into <summary> is
   filled idempotently by chrome.ts, which keeps working inside the moved node.
   ========================================================================== */

import { PAGES } from "../site/routes.ts";
import { getLocale } from "../copy/index.ts";
import type { Tone } from "../core/colors.ts";

const OPEN_KEY = "pdo-open";
const SEC_LETTERS = ["a", "b", "c", "d", "e"] as const;
type SecKey = (typeof SEC_LETTERS)[number] | "sources" | "page";

/** Which tone each section carries. Everything not listed falls back to blue. */
const PAGE_TONES: Readonly<Record<string, Partial<Record<SecKey, Tone>>>> = {
  "2026": { a: "turnout", b: "police", c: "cost" },
  "2026/turnout": { a: "turnout", b: "turnout" },
  "2026/violence": { a: "arrest", b: "police" },
  "2026/costs": { a: "policeCost" },
  historic: { a: "turnout", b: "arrest" },
  "historic/movements": {
    a: "turnout",
    b: "arrest",
    c: "police",
    d: "protest",
    e: "bystander",
  },
  "historic/series": {
    a: "turnout",
    b: "arrest",
    c: "police",
    d: "protest",
    e: "cost",
  },
};

const LABEL = {
  en: {
    tools: "Section controls",
    expand: "Expand all",
    collapse: "Collapse all",
  },
  fr: {
    tools: "Contrôles des sections",
    expand: "Tout déplier",
    collapse: "Tout replier",
  },
} as const;

type OpenMap = Record<string, boolean>;

export interface DisclosureOptions {
  /** Called when a card is opened — used to nudge Chart.js after a resize. */
  onReveal?: (card: HTMLDetailsElement) => void;
  /** Initial state for cards with no stored value. */
  defaultOpen?: boolean;
}

let reveal: DisclosureOptions["onReveal"];
let defaultOpen = true;

/* ---- page identity ------------------------------------------------------ */

function pageKey(): string {
  const last = location.pathname.split("/").filter(Boolean).pop() ?? "index";
  const name = /\.[a-z]+$/i.test(last) ? last : `${last}.html`;

  const hits = (Object.keys(PAGES) as (keyof typeof PAGES)[]).filter((k) => {
    const p = PAGES[k].path;
    return p === name || p.endsWith(`/${name}`);
  });
  if (hits.length === 1) return hits[0] as string;

  return document.documentElement.dataset.page ?? "home";
}

/* ---- stored open state -------------------------------------------------- */

function readAll(): Record<string, OpenMap> {
  try {
    const raw = JSON.parse(localStorage.getItem(OPEN_KEY) ?? "{}");
    return raw && typeof raw === "object"
      ? (raw as Record<string, OpenMap>)
      : {};
  } catch {
    return {};
  }
}

function storedOpen(id: string): boolean | undefined {
  return readAll()[pageKey()]?.[id];
}

function saveOpen(id: string, open: boolean): void {
  try {
    const all = readAll();
    const page = pageKey();
    all[page] = { ...(all[page] ?? {}), [id]: open };
    localStorage.setItem(OPEN_KEY, JSON.stringify(all));
  } catch {
    /* private mode: session-only */
  }
}

/* ---- tone --------------------------------------------------------------- */

function secKeyOf(head: HTMLElement): SecKey {
  if (head.id === "sources-title") return "sources";
  const m = /^hdr-([a-e])$/.exec(head.id);
  return (m?.[1] as SecKey) ?? "page";
}

/* ---- the wrapper -------------------------------------------------------- */

/**
 * `<section aria-labelledby>` → `<details class="sec-card"><summary>` +
 * `<section>` inside. The header moves into the summary, so the section's
 * aria-labelledby still resolves and the native disclosure stays keyboard- and
 * AT-friendly without extra ARIA.
 */
function wrap(host: HTMLElement, level: 1 | 2): HTMLDetailsElement | null {
  const head = host.querySelector<HTMLElement>(
    ':scope > header[id^="hdr-"], :scope > h2',
  );
  if (!head) return null;

  const card = document.createElement("details");
  card.className = level === 2 ? "sec-card sec-card--sub" : "sec-card";

  const id = head.id || `sec-${Math.random().toString(36).slice(2, 8)}`;
  card.dataset.sec = id;

  const summary = document.createElement("summary");
  summary.className = "sec-summary";
  summary.append(head);

  host.before(card);
  card.append(summary, host);
  card.open = level === 2 ? true : (storedOpen(id) ?? defaultOpen);

  card.addEventListener("toggle", () => {
    saveOpen(id, card.open);
    if (card.open) reveal?.(card);
  });

  return card;
}

/* ---- enhancement -------------------------------------------------------- */

const isPageShell = (s: HTMLElement): boolean =>
  !!s.querySelector(":scope > header#hdr-page");

export function enhanceSections(): void {
  if (typeof document === "undefined") return;

  const sections = [
    ...document.querySelectorAll<HTMLElement>(
      "main section[aria-labelledby], main section#sources",
    ),
  ].filter((s) => !s.closest("details.sec-card") && !isPageShell(s));

  for (const section of sections) {
    if (!wrap(section, 1)) continue;
    for (const group of section.querySelectorAll<HTMLElement>(".run-group")) {
      if (group.closest("section") !== section) continue;
      if (group.closest("details.sec-card")) continue;
      wrap(group, 2);
    }
  }
}

/* ---- expand / collapse all --------------------------------------------- */

export function setAllCards(open: boolean): void {
  for (const card of document.querySelectorAll<HTMLDetailsElement>(
    "main details.sec-card",
  )) {
    card.open = open;
    saveOpen(card.dataset.sec ?? "", open);
  }
}

function toolbar(): HTMLElement | null {
  document.querySelector("main > .sec-tools")?.remove(); // ← re-render safe
  const host =
    document.querySelector<HTMLElement>("main > #crumbs") ??
    document.querySelector<HTMLElement>("main");
  if (!host) return null;

  const label = LABEL[getLocale() === "fr" ? "fr" : "en"];
  const bar = document.createElement("div");
  bar.className = "sec-tools";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", label.tools);

  for (const [text, open] of [
    [label.expand, true],
    [label.collapse, false],
  ] as const) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "sec-tools__btn";
    b.textContent = text;
    b.addEventListener("click", () => setAllCards(open));
    bar.append(b);
  }

  host.after(bar);
  return bar;
}

/* ---- entry point -------------------------------------------------------- */
let printHookBound = false;
export function initDisclosure(opts: DisclosureOptions = {}): () => void {
  reveal = opts.onReveal;
  if (opts.defaultOpen !== undefined) defaultOpen = opts.defaultOpen;

  enhanceSections();
  const bar = toolbar();

  // Printing a collapsed card would print only its summary.
  const openForPrint = (): void => setAllCards(true);
  addEventListener("beforeprint", openForPrint);

  if (!printHookBound) {
    addEventListener("beforeprint", () => setAllCards(true));
    printHookBound = true;
  }

  return () => {
    reveal = undefined;
    bar?.remove();
    removeEventListener("beforeprint", openForPrint);
  };
}

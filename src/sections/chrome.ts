/**  
  src/client/page.ts — static chrome: disclaimer, section headers, axis notes,
   <title>. Idempotent; re-run on every locale change.

   <html lang> / data-lang are written by setLang() in i18n.ts only — not here.
   One writer per attribute. */

import {
  getLocale,
  localeMeta,
  onLocaleChange,
  t,
  type SectionCopy,
} from "../copy";
import { PAGE_SECTIONS } from "../copy/meta-overrides.ts";
import { PAGES, pageById, type PageId } from "../site/routes.ts";
import { renderAbout } from "./about";

const $ = (id: string): HTMLElement | null => document.getElementById(id);

type SecKey = "a" | "b" | "c" | "d" | "e";

const lang = (): "en" | "fr" => getLocale();

function tag<K extends keyof HTMLElementTagNameMap>(
  name: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(name);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/** h2 at section level, h3 inside a .run-group. Also supplies the id that the
 *  section's aria-labelledby points at (it was dangling before). */
function header(id: string, s: SectionCopy, level: 2 | 3 = 2): void {
  const host = $(id);
  if (!host) return;

  const h = tag(level === 3 ? "h3" : "h2", "sec-title", s.title);
  h.id = `${id}-title`;

  host.replaceChildren(h, tag("p", "sec-blurb", s.blurb));
}

/** Authored copy only — textContent, so a catalogue entry cannot inject markup. */
function note(id: string, text: string): void {
  const host = $(id);
  if (!host) return;
  host.textContent = text;
}

function disclaimer(): void {
  const host = $("disclaimer");
  if (!host) return;
  host.textContent = t().disclaimer.body;
}

/** Which page this document is.
 *  1. file name against PAGES[].path (authoritative — the four copied <head>s
 *     still carry the wrong data-page, so this must win);
 *  2. <html data-page> / <body data-page>;
 *  3. "home". Never throws, never returns a non-PageId. */
export function currentPage(): PageId {
  const last = location.pathname.split("/").filter(Boolean).pop() ?? "index";
  const name = /\.[a-z]+$/i.test(last) ? last : `${last}.html`;

  const hits = (Object.keys(PAGES) as PageId[]).filter((k) => {
    const p = PAGES[k].path;
    return p === name || p.endsWith(`/${name}`);
  });
  if (hits.length === 1) return hits[0];

  const raw =
    document.documentElement.dataset.page ?? document.body?.dataset.page ?? "";
  return pageById(raw) ? (raw as PageId) : "home";
}

/** Accepts a PageId, nothing, or a stray argument from a locale listener.
 *  Anything unrecognised falls back to the DOM — this is what stops `PAGES[p]`
 *  being undefined. */
const asPage = (p?: string): PageId =>
  p && pageById(p) ? (p as PageId) : currentPage();

/** Per-page override, else the shared copy for that section letter. */
const sec = (page: PageId, k: SecKey): SectionCopy =>
  PAGE_SECTIONS[lang()][`${page}:${k}`] ?? localeMeta().sections[k];

export function renderChrome(pageIn?: string): void {
  const page = asPage(pageIn);

  disclaimer();
  renderAbout();
  header("hdr-a", sec(page, "a"), 3);
  header("hdr-b", sec(page, "b"), 3);
  header("hdr-c", sec(page, "c"), 3);
  header("hdr-d", sec(page, "d"), 3);
  header("hdr-e", sec(page, "e"), 3);
  note("note-c", sec(page, "c").note ?? "");
  note("note-d", sec(page, "d").note ?? "");
  note("note-e", sec(page, "e").note ?? "");
}

/** For a page with no other renderer. main.ts uses onLocaleChange instead. */
export function initChrome(page?: string): () => void {
  renderChrome(page);
  return onLocaleChange(() => renderChrome(page));
}

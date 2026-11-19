import { localeMeta } from "../../copy";
import { callout, group } from "./blocks";
import { ABOUT, SECTION_LABEL } from "./copy";

export function renderAbout(
  host: HTMLElement | null = document.getElementById("about"),
): void {
  if (!host) return;

  const lang = localeMeta().meta.htmlLang;

  const open = new Map<string, boolean>();
  for (const el of host.querySelectorAll<HTMLDetailsElement>(
    "details[data-about]",
  )) {
    const id = el.dataset.about;
    if (id) open.set(id, el.open);
  }

  host.setAttribute("aria-label", SECTION_LABEL[lang]);

  const subs = ABOUT[lang];
  host.replaceChildren(callout(lang), ...subs.map((sub) => group(sub, open)));
}

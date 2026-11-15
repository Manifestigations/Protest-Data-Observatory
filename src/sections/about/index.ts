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
  const frag = document.createDocumentFragment();
  frag.append(callout(lang)); // above every <details>
  for (const sub of subs) frag.append(group(sub, open));
  host.replaceChildren(frag);
}

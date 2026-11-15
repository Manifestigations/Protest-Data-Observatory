/* ============================================================== static copy */

import { EN_META } from "./en/meta";
import { FR_META } from "./fr/meta";
import { warned } from "./lookup";
import { current } from "./state";
import type { Bi } from "./types";

type AttrName = "text" | "aria-label" | "title" | "placeholder";

const STATIC: Record<string, Bi> = {
  "hdr.cta": {
    en: "Help improve this tool",
    fr: "Aidez à améliorer cet outil",
  },
  "hdr.title": {
    en: "Protest activity in France, autumn 2026",
    fr: "L’activité contestataire en France, automne 2026",
  },
  "hdr.lede": {
    en: "Turnout, arrests, injuries and damage, set against six earlier French movements. Every point is a range where the publishers disagree. The series starts on 15 September 2026, with the first mainland high-school blockades.",
    fr: "Foules, interpellations, blessés et dommages, comparés à six mouvements français antérieurs. Chaque point est une fourchette là où les éditeurs divergent. La série commence le 15 septembre 2026, avec les premiers blocages de lycées en métropole.",
  },
  "ui.lang": { en: "Language", fr: "Langue" },
  "ui.lang.fr": {
    en: "Afficher la page en français",
    fr: "Afficher la page en français",
  },
  "ui.lang.en": {
    en: "Show this page in English",
    fr: "Afficher la page en anglais",
  },
  "ui.theme": { en: "Dark mode", fr: "Mode sombre" },
  "card.prot.title": { en: "Protesters", fr: "Manifestants" },
  "card.prot.sub": {
    en: "Ministry and organiser counts",
    fr: "Comptages ministériels et syndicaux",
  },
  "card.enf.title": {
    en: "Arrests and injuries",
    fr: "Interpellations et blessés",
  },
  "card.enf.sub": {
    en: "Custody is not the same as arrest",
    fr: "La garde à vue n’est pas l’interpellation",
  },
  "card.cost.title": {
    en: "Damage and the cost of policing",
    fr: "Dommages et coût du maintien de l’ordre",
  },
  "card.pw.title": {
    en: "Protesters, weekly peak",
    fr: "Manifestants, pointe hebdomadaire",
  },
  "card.ew.title": {
    en: "Enforcement, weekly totals",
    fr: "Maintien de l’ordre, totaux hebdomadaires",
  },
  "leg.holiday.title": {
    en: "Dotted line = the Toussaint school holiday",
    fr: "Ligne en pointillés = les vacances de la Toussaint",
  },
  "leg.items.title": {
    en: "Highlight a measure",
    fr: "Mettre en avant une mesure",
  },
  "leg.movements.title": {
    en: "Highlight a movement",
    fr: "Mettre en avant un mouvement",
  },
  "hdr.skip": { en: "Skip to content", fr: "Aller au contenu" },
  "leg.summary.title": {
    en: "Highlight a statistic",
    fr: "Mettre en avant une statistique",
  },
};

for (const id of ["a", "b", "c", "d", "e"] as const) {
  STATIC[`sec.${id}.title`] = {
    en: EN_META.sections[id].title,
    fr: FR_META.sections[id].title,
  };
  STATIC[`sec.${id}.lede`] = {
    en: EN_META.sections[id].blurb,
    fr: FR_META.sections[id].blurb,
  };
}

STATIC["doc.title"] = { en: EN_META.meta.title, fr: FR_META.meta.title };

/** Flat key set, for the build-time guard. Must stay below all STATIC writes. */
export const STATIC_KEYS: ReadonlySet<string> = new Set(Object.keys(STATIC));

/** Resolves every `[data-i18n]` under root. Idempotent. */
export function applyStaticCopy(root: ParentNode = document): void {
  const L = current;

  for (const node of root.querySelectorAll<HTMLElement>("[data-i18n]")) {
    const key = node.dataset.i18n;
    if (!key) continue;
    const entry = STATIC[key];
    if (!entry) {
      if (!warned.has(key)) {
        warned.add(key);
        console.warn(`[i18n] no static copy for "${key}"`);
      }
      continue;
    }
    const text = entry[L] ?? entry.en;
    const attr = node.dataset.i18nAttr as AttrName | undefined;
    if (!attr || attr === "text") node.textContent = text;
    else node.setAttribute(attr, text);
  }
}

/** Reflects the current language onto the segmented control. */
export function syncLangSwitch(root: ParentNode = document): void {
  for (const b of root.querySelectorAll<HTMLButtonElement>("[data-set-lang]")) {
    const on = b.dataset.setLang === current;
    b.setAttribute("aria-pressed", String(on));
    b.tabIndex = on ? 0 : -1;
  }
}

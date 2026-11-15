import type { Lang } from "../../copy";
import type { About } from "./model.ts";
import { ABOUT_EN, CALLOUT_EN, SECTION_LABEL_EN } from "./copy.en.ts";
import { ABOUT_FR, CALLOUT_FR, SECTION_LABEL_FR } from "./copy.fr.ts";

export const ABOUT: Record<Lang, About> = { en: ABOUT_EN, fr: ABOUT_FR };
export const SECTION_LABEL: Record<Lang, string> = {
  en: SECTION_LABEL_EN,
  fr: SECTION_LABEL_FR,
};
export const CALLOUT: Record<Lang, string> = { en: CALLOUT_EN, fr: CALLOUT_FR };

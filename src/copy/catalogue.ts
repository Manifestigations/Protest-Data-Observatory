import { CATALOGUE_EN } from "./en";
import { CATALOGUE_FR } from "./fr";
import type { Catalogue, Lang } from "./types";

export const CATALOGUE: Record<Lang, Catalogue> = {
  en: CATALOGUE_EN,
  fr: CATALOGUE_FR,
};

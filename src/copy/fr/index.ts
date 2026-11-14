import type { Catalogue } from "../types";
import { CHART_FR } from "./chart";
import { EPISODES_FR } from "./episodes";
import { TEXT_FR } from "./text";

export const CATALOGUE_FR: Catalogue = {
  chart: CHART_FR,
  episodes: EPISODES_FR,
  ...TEXT_FR,
};

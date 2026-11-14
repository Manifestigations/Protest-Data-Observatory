import type { Catalogue } from "../types";
import { CHART_EN } from "./chart";
import { EPISODES_EN } from "./episodes";
import { TEXT_EN } from "./text";

export const CATALOGUE_EN: Catalogue = {
  chart: CHART_EN,
  episodes: EPISODES_EN,
  ...TEXT_EN,
};

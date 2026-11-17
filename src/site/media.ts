/* Hero images. src goes through Special:FilePath so the thumbnail size is
   stable and no upload.wikimedia.org hash path is hard-coded. */

import type { Bi } from "../copy/index.ts";

/** Files in docs/img/. Keys are internal; the values are the real names. */
const FILE = {
  y2026: "hero-2026-demo.jpg",
  historic: "hero-historic-1968.jpg",
  turnout: "hero-turnout-belfort.jpg",
  violence: "hero-violence-2026.jpg",
  costs: "hero-costs-perpignan.jpg",
  movements: "hero-movements-gilets-jaunes.webp",
  series: "hero-series-jussieu-2006.jpg",
} as const;

export type HeroFile = (typeof FILE)[keyof typeof FILE];

export interface Hero {
  readonly file: HeroFile; // was: src (hotlink)
  readonly alt: Bi;
  readonly credit: Bi;
  readonly filePage: string; // unchanged: the Commons page, for attribution
  readonly licence: Bi;
  readonly licenceUrl: string | null;
  readonly sourceId: string;
}

const commonsPage = (file: string): string =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file).replace(/%20/g, "_")}`;

/* The licence line is deliberately not guessed: each string must be replaced
   with what the file page actually states before publication. */
const UNVERIFIED: Bi = {
  en: "see the file page for the licence",
  fr: "licence à vérifier sur la page du fichier",
};

const f2026 = "Manifestation lycéenne du 6 octobre 2026 à Paris 25.jpg";
const fHistoric = "1200x680 24mai68.jpg";
const fBelfort = "2026-10-06 11-59-18 MouvementDesLycéens-Belfort.jpg";
const fPerpignan = "Journée de mobilisation des lycéens à Perpignan 14.jpg";
const fGj =
  "Acte XIV gilets jaunes 16 février 2019 Besançon Toufik-de-Planoise.jpg";
const fJussieu =
  "Paris main entry campus jussieu-greve contre CPE-2006-02-27.jpg";

export const HERO_2026: Hero = {
  file: FILE.y2026,
  alt: {
    en: "School students on a lycée demonstration in Paris, 6 October 2026.",
    fr: "Lycéens dans une manifestation lycéenne à Paris, le 6 octobre 2026.",
  },
  credit: {
    en: "Photograph: “Manifestation lycéenne du 6 octobre 2026 à Paris 25”, Wikimedia Commons",
    fr: "Photographie : « Manifestation lycéenne du 6 octobre 2026 à Paris 25 », Wikimedia Commons",
  },
  filePage: commonsPage(f2026),
  licence: UNVERIFIED,
  licenceUrl: null,
  sourceId: "media-2026-demo",
};

export const HERO_HISTORIC: Hero = {
  file: FILE.historic,
  alt: {
    en: "Historic photograph of a street demonstration in Paris, 24 May 1968.",
    fr: "Photographie d’époque d’une manifestation de rue à Paris, le 24 mai 1968.",
  },
  credit: {
    en: "Photograph: “1200x680 24mai68”, Wikimedia Commons",
    fr: "Photographie : « 1200x680 24mai68 », Wikimedia Commons",
  },
  filePage: commonsPage(fHistoric),
  licence: UNVERIFIED,
  licenceUrl: null,
  sourceId: "media-historic",
};

export const HERO_TURNOUT: Hero = {
  file: FILE.turnout,
  alt: {
    en: "Lycée students demonstrating in Belfort, 6 October 2026.",
    fr: "Lycéens manifestant à Belfort, le 6 octobre 2026.",
  },
  credit: {
    en: "Photograph: “Mouvement des lycéens, Belfort, 6 October 2026”, Wikimedia Commons",
    fr: "Photographie : « Mouvement des lycéens, Belfort, 6 octobre 2026 », Wikimedia Commons",
  },
  filePage: commonsPage(fBelfort),
  licence: UNVERIFIED,
  licenceUrl: null,
  sourceId: "media-turnout",
};

export const HERO_VIOLENCE: Hero = {
  file: FILE.violence,
  alt: {
    en: "Police facing protesters during the autumn 2026 movement, 13 October 2026.",
    fr: "Forces de l’ordre face aux manifestants pendant le mouvement de l’automne 2026, le 13 octobre 2026.",
  },
  credit: {
    en: "Photograph: Freedom Press, 13 October 2026 — not a Wikimedia Commons file",
    fr: "Photographie : Freedom Press, 13 octobre 2026 — fichier non issu de Wikimedia Commons",
  },
  filePage: "https://freedompress.org.uk/",
  licence: {
    en: "no open licence stated: permission required from Freedom Press",
    fr: "aucune licence libre indiquée : autorisation de Freedom Press nécessaire",
  },
  licenceUrl: null,
  sourceId: "media-violence",
};

export const HERO_COSTS: Hero = {
  file: FILE.costs,
  alt: {
    en: "A day of lycée mobilisation in Perpignan.",
    fr: "Une journée de mobilisation des lycéens à Perpignan.",
  },
  credit: {
    en: "Photograph: “Journée de mobilisation des lycéens à Perpignan”, Wikimedia Commons",
    fr: "Photographie : « Journée de mobilisation des lycéens à Perpignan », Wikimedia Commons",
  },
  filePage: commonsPage(fPerpignan),
  licence: UNVERIFIED,
  licenceUrl: null,
  sourceId: "media-costs",
};

export const HERO_MOVEMENTS: Hero = {
  file: FILE.movements,
  alt: {
    en: "Gilets jaunes Act XIV in Besançon, 16 February 2019.",
    fr: "Acte XIV des Gilets jaunes à Besançon, le 16 février 2019.",
  },
  credit: {
    en: "Photograph: “Acte XIV gilets jaunes, Besançon, 16 February 2019”, Toufik-de-Planoise, Wikimedia Commons",
    fr: "Photographie : « Acte XIV gilets jaunes, Besançon, 16 février 2019 », Toufik-de-Planoise, Wikimedia Commons",
  },
  filePage: commonsPage(fGj),
  licence: UNVERIFIED,
  licenceUrl: null,
  sourceId: "media-movements",
};

export const HERO_SERIES: Hero = {
  file: FILE.series,
  alt: {
    en: "The main entrance to the Jussieu campus, Paris, during the anti-CPE strike, 27 February 2006.",
    fr: "L’entrée principale du campus de Jussieu, à Paris, pendant la grève anti-CPE, le 27 février 2006.",
  },
  credit: {
    en: "Photograph: “Paris main entry campus jussieu, grève contre le CPE, 27 February 2006”, Wikimedia Commons",
    fr: "Photographie : « Paris main entry campus jussieu, grève contre le CPE, 27 février 2006 », Wikimedia Commons",
  },
  filePage: commonsPage(fJussieu),
  licence: UNVERIFIED,
  licenceUrl: null,
  sourceId: "media-series",
};

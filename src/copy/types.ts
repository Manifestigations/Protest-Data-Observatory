export type Lang = "fr" | "en";

export interface Bi {
  readonly en: string;
  readonly fr: string;
}

/* ============================================================== descriptors */

export type SectionId = "a" | "b" | "c" | "d" | "e";

export interface SectionCopy {
  readonly title: string;
  readonly blurb: string;
  readonly note?: string;
}

export interface LocaleMeta {
  readonly tag: string;
  readonly label: string;
  readonly meta: {
    readonly htmlLang: Lang;
    readonly title: string;
    readonly description: string;
  };
  readonly groups?: {
    readonly ongoing: SectionCopy;
    readonly historical: SectionCopy;
  };
  readonly sections: Readonly<Record<SectionId, SectionCopy>>;
}

export interface SeriesCopy {
  readonly label: string;
  /** Legend entry for the hollow "detached" twin. */
  readonly detached: string;
}

export interface ChartCardCopy {
  readonly title: string;
  readonly subtitle: string;
  readonly y?: string;
  readonly yLeft?: string;
  readonly yRight?: string;
}

export interface ChartCopy {
  readonly axisDate: string;
  readonly axisWeek: string;
  readonly edgeMark: string;
  readonly weekOf: string;
  readonly weekOfPartial: string;
  /** Template for € millions: EN "€{v}M", FR "{v} M€". */
  readonly eurM: string;
  /** Derived from `markers.ts`; never author this by hand. */
  readonly suffix: Readonly<Record<string, string>>;
  readonly suffixWrap: string;
  readonly dayNotes: Readonly<Record<string, string>>;
  readonly obsNotes: Readonly<Record<string, Readonly<Record<string, string>>>>;
  readonly deployNotes: Readonly<Record<string, string>>;
  readonly policingDay: string;
  readonly policingDayPlain: string;
  readonly cumulativeAdded: string;
  readonly cumulativeCarried: string;
  readonly weekNational: string;
  readonly weekRegionalOnly: string;
  readonly weekPeak: string;
  readonly weekNoNational: string;
  readonly weekExcluded: string;
  readonly weekFloored: string;
  readonly weekClipped: string;
  readonly weekJoin: string;
  readonly tooltipRange: string;
  readonly tooltipPoint: string;
  readonly tooltipNote: string;
  readonly footerMark: string;
  readonly series: Readonly<Record<string, SeriesCopy>>;
  readonly charts: Readonly<Record<string, ChartCardCopy>>;
  readonly weekVacation: string;
  readonly holidayLine: string;
  readonly metricNote: string;
  readonly blockerNote: string;
}

export interface WeekCopy {
  /** "13 May: general strike" — appended to the tooltip title. */
  readonly action?: string;
  readonly note?: Readonly<Partial<Record<string, string>>>;
}

export interface EpisodeCopy {
  /** Legend and direct label. */
  readonly short: string;
  /** Panel caption head. */
  readonly strip: string;
  /** Prose under the panel caption. */
  readonly banner: string;
  /** Indexed BY WEEK NUMBER — holes are expected (gj reaches w: 43). */
  readonly weeks: readonly (WeekCopy | undefined)[];
  readonly fallbackNote?: Readonly<Partial<Record<string, string>>>;
}

export interface DisclaimerCopy {
  readonly body: string;
}

export interface PanelsCopy {
  readonly partialWeek: string;
  readonly act: string;
  readonly withAction: string;
  readonly seriesContinues: string;
  readonly obs: string;
  readonly obsSep: string;
  readonly valueRange: string;
  readonly itemMeta: string;
  readonly median: string;
  readonly peak: string;
  readonly range: string;
  readonly figureCount: string;
  readonly singleFigure: string;
  /** Caption meta on section E panels. */
  readonly summaryMeta: string;
}

export interface KpiCopy {
  readonly heading: string;
  readonly largestDay: string;
  readonly largestWeek: string;
  readonly largestFigure: string;
  readonly vsMean: string;
  readonly vsMedian: string;
  readonly vsFirst: string;
  readonly againstMean: string;
  readonly againstMedian: string;
  readonly againstFirst: string;
  readonly noteDaily: string;
  readonly noteWeekly: string;
  readonly noteEpisodes: string;
  readonly noteEpisodesCapped: string;
  readonly eurM: string;
  readonly none: string;
}

export interface CasualtyCopy {
  readonly headlineTitle: string;
  readonly weeklyTitle: string;
  readonly popTitle: string;
  readonly bystanderTitle: string;
  readonly estTitle: string;
  readonly mixTitle: string;
  readonly bystanderCaption: string;

  readonly colScope: string;
  readonly colTotal: string;
  readonly colSerious: string;
  readonly colLight: string;
  readonly colLightShare: string;
  readonly colOther: string;
  readonly colSide: string;
  readonly colCircumstance: string;
  readonly colCount: string;
  readonly colCases: string;
  readonly colQuestion: string;
  readonly colWindow: string;
  readonly colWeekly: string;
  /** The universe table's three tags. */
  readonly colPopulation: string;
  readonly colParticipation: string;
  readonly colSelection: string;
  /** The estimand table. */
  readonly colEstimate: string;
  readonly colRange: string;
  readonly colMethod: string;
  readonly colEdges: string;
  readonly colStatus: string;
  /** The treated-per-serious sensitivity table. */
  readonly colRatio: string;
  readonly colAt17: string;
  readonly colMovement: string;

  readonly scope: Readonly<Record<string, string>>;
  readonly side: Readonly<Record<string, string>>;
  readonly kind: Readonly<Record<string, string>>;
  readonly why: Readonly<Record<string, string>>;
  readonly cases: Readonly<Record<string, string>>;

  /** Population / participation / selection / edge / status tags — one map per
   *  enum, so a widening of the data union fails here rather than at runtime. */
  readonly population: Readonly<Record<string, string>>;
  readonly participation: Readonly<Record<string, string>>;
  readonly selection: Readonly<Record<string, string>>;
  readonly edge: Readonly<Record<string, string>>;

  readonly casesCount: string;
  readonly noCases: string;

  readonly capLevels: string;
  readonly capWeeks: string;
  readonly capCases: string;
  readonly capResolution: string;
  readonly capMix: string;
  readonly capPopulation: string;
  readonly capEstimate: string;
  readonly capSensitivity: string;

  readonly noteLevels: string;
  readonly noteWeeks: string;
  readonly noteMix: string;
  readonly notePopulation: string;
  readonly noteEstimate: string;
  readonly noteSensitivity: string;
  readonly noteBystanders: string;

  readonly headLight: string;
  readonly headLightNote: string;
  readonly headMissingNote: string;
  readonly headSeriousShare: string;
  readonly headSeriousCount: string;
  readonly headMix: string;

  readonly estimates: Readonly<
    Record<string, { readonly label: string; readonly method: string }>
  >;
  readonly assumptions: Readonly<Record<string, string>>;
  readonly status: Readonly<Record<string, string>>;
  readonly edgePair: string;
  readonly ladder: Readonly<Record<string, string>>;
  readonly mix: Readonly<Record<string, string>>;
  readonly bystanders: Readonly<Record<string, string>>;
  readonly observations: Readonly<Record<string, string>>;

  readonly resolution: readonly {
    readonly label: string;
    readonly window: string;
    readonly weekly: string;
  }[];

  /** Short legend labels for the severity strips. Optional: falls back to
   *  colSerious / colLight / why.notPublished. */
  readonly legend?: {
    readonly serious: string;
    readonly light: string;
    readonly unpub: string;
  };
  /** "{n}" is substituted with the number of documented cases. */
  readonly showCases?: string;
  /** Singular of casesCount, if the language needs one. */
  readonly caseSingular?: string;
}

export interface ItemCopy {
  readonly label: string;
  readonly short: string;
}

export interface TooltipCopy {
  readonly linePlain: string;
  readonly lineWithFlag: string;
  readonly firstFigure: string;
  readonly shareOfFirst: string;
  /** "Comparisons: {list}" — one compact line. */
  readonly shareComparisons: string;
  readonly cmpHighest: string;
  readonly cmpMean: string;
  readonly cmpMedian: string;
  readonly cmpFirst: string;
  /** Joins the last item: "a, b and c" / "a, b et c". */
  readonly listAnd: string;
}

export interface Catalogue {
  readonly chart: ChartCopy;
  readonly episodes: Readonly<Record<string, EpisodeCopy>>;
  readonly panels: PanelsCopy;
  readonly items: Readonly<Record<string, ItemCopy>>;
  readonly units: { readonly weeks: string };
  readonly flags: Readonly<Record<string, string>>;
  readonly tooltip: TooltipCopy;
  readonly disclaimer: DisclaimerCopy;
  readonly kpi: KpiCopy;
  readonly casualties: CasualtyCopy;
  /** Dictionary lookups; `t('key')` reads these. */
  readonly [key: string]: unknown;
}

export interface HeliCopy {
  readonly heading: string;
  readonly intro: string;
  readonly steps: readonly { readonly title: string; readonly body: string }[];
  readonly summary: (v: {
    days: number;
    hLo: number;
    hHi: number;
    cLo: string;
    cHi: string;
    aLo: string;
    aHi: string;
  }) => string;
  readonly caveat: string;
  readonly basis: Readonly<Record<string, string>>;
}

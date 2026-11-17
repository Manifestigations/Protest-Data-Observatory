/* ==========================================================================
   src/core/colors.ts — the semantic palette.

   Tokens are authored once in styles/index.css as --c-* (light-dark() pairs);
   this module resolves them to concrete colours for Chart.js, which bakes
   colours at create time and cannot read CSS variables.

   Two caches exist: the token cache below, and canvas-registry.ts's THEME
   cache. Both must be dropped on a theme change — theme.ts drops both.
   ========================================================================== */

/**
 * De-emphasis factor for hover/emphasis: a series is drawn as fade(c, DIM).
 * This is the only definition — canvas-registry re-exports it, and chart-side
 * palette code must import it rather than restating 0.45.
 */
export const DIM = 0.45;

export const TONES = [
  "police",
  "protest",
  "bystander",
  "arrest",
  "turnout",
  "cost",
  "policeCost",
  "protestSoft", // strikers — black's lighter neighbour
  "blockade", // schools blocked — dark brown
  "remainder", // the rest of the population — grey
] as const;

export type Tone = (typeof TONES)[number];

export interface ToneColours {
  /** The solid series colour. */
  fill: string;
  /** The same colour at low alpha, for area fills. */
  wash: string;
  /** Text set on top of `fill`. */
  ink: string;
  /** Stroke that keeps a white fill visible on a white page (bystanders). */
  edge: string;
  /** Second colour, for combination tones (policeCost only). */
  hatch?: string;
}

/* Used when a token is missing — never expected in practice. */
const FALLBACK: Readonly<Record<string, string>> = {
  "c-police": "#1d4ed8",
  "c-police-wash": "rgb(29 78 216 / 14%)",
  "c-police-on": "#ffffff",
  "c-protest": "#000000",
  "c-protest-wash": "rgb(0 0 0 / 12%)",
  "c-protest-on": "#ffffff",
  "c-bystander": "#ffffff",
  "c-bystander-wash": "rgb(255 255 255 / 20%)",
  "c-bystander-ink": "#111827",
  "c-bystander-edge": "#9aa3af",
  "c-arrest": "#b91c1c",
  "c-arrest-wash": "rgb(185 28 28 / 14%)",
  "c-arrest-on": "#ffffff",
  "c-turnout": "#0f7a3d",
  "c-turnout-wash": "rgb(15 122 61 / 14%)",
  "c-turnout-on": "#ffffff",
  "c-cost": "#d99e00",
  "c-cost-wash": "rgb(217 158 0 / 18%)",
  "c-cost-on": "#1b1300",
  "c-protest-soft": "#3f3f46",
  "c-protest-soft-wash": "rgb(63 63 70 / 14%)",
  "c-protest-soft-on": "#ffffff",
  "c-blockade": "#4a2c17",
  "c-blockade-wash": "rgb(74 44 23 / 14%)",
  "c-blockade-on": "#ffffff",
  "c-remainder": "#c7ccd3",
  "c-remainder-wash": "rgb(199 204 211 / 55%)",
  "c-remainder-ink": "#111827",
  "c-remainder-edge": "#9aa3af",
  "chart-hollow": "#ffffff",
  "chart-series-1": "#5c97c5",
  "chart-series-2": "#357ab0",
  "chart-series-3": "#2a6b9c",
  "chart-series-4": "#1b5c92",
  "chart-series-5": "#124a78",
  "chart-series-6": "#0a3a63",
  "chart-series-7": "#062844",
};

const cache = new Map<string, string>();
let probe: HTMLSpanElement | null = null;

/**
 * Resolve one custom property. `light-dark()` is only resolved at use time, so
 * a hidden probe element with `color: var(--token)` is the reliable way to get
 * a concrete rgb() out of it.
 */
function css(token: string): string {
  const hit = cache.get(token);
  if (hit !== undefined) return hit;

  if (!probe) {
    probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:absolute;inline-size:0;block-size:0;overflow:hidden;pointer-events:none";
    document.body.append(probe);
  }

  probe.style.color = `var(--${token}, ${FALLBACK[token] ?? "currentColor"})`;
  const value =
    getComputedStyle(probe).color || FALLBACK[token] || "currentColor";
  cache.set(token, value);
  return value;
}

export function resetColours(): void {
  cache.clear();
}

export const tones: Record<Tone, ToneColours> = {
  get police() {
    return {
      fill: css("c-police"),
      wash: css("c-police-wash"),
      ink: css("c-police-on"),
      edge: css("c-police"),
    };
  },
  get protest() {
    return {
      fill: css("c-protest"),
      wash: css("c-protest-wash"),
      ink: css("c-protest-on"),
      edge: css("c-protest"),
    };
  },
  get bystander() {
    return {
      fill: css("c-bystander"),
      wash: css("c-bystander-wash"),
      ink: css("c-bystander-ink"),
      edge: css("c-bystander-edge"),
    };
  },
  get arrest() {
    return {
      fill: css("c-arrest"),
      wash: css("c-arrest-wash"),
      ink: css("c-arrest-on"),
      edge: css("c-arrest"),
    };
  },
  get turnout() {
    return {
      fill: css("c-turnout"),
      wash: css("c-turnout-wash"),
      ink: css("c-turnout-on"),
      edge: css("c-turnout"),
    };
  },
  get cost() {
    return {
      fill: css("c-cost"),
      wash: css("c-cost-wash"),
      ink: css("c-cost-on"),
      edge: css("c-cost"),
    };
  },
  /** Blue & yellow: the cost of policing, everywhere it appears. */
  get policeCost() {
    return {
      fill: css("c-police"),
      wash: css("c-police-wash"),
      ink: css("c-police-on"),
      edge: css("c-police"),
      hatch: css("c-cost"),
    };
  },
  get protestSoft() {
    return {
      fill: css("c-protest-soft"),
      wash: css("c-protest-soft-wash"),
      ink: css("c-protest-soft-on"),
      edge: css("c-protest-soft"),
    };
  },
  get blockade() {
    return {
      fill: css("c-blockade"),
      wash: css("c-blockade-wash"),
      ink: css("c-blockade-on"),
      edge: css("c-blockade"),
    };
  },
  get remainder() {
    return {
      fill: css("c-remainder"),
      wash: css("c-remainder-wash"),
      ink: css("c-remainder-ink"),
      edge: css("c-remainder-edge"),
    };
  },
};

/* The only two things that can change a token: the OS colour-scheme switch
   and a data-theme write on <html>. Both clear the cache; the next getter
   re-probes. */
if (typeof document !== "undefined") {
  matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    resetColours,
  );
  new MutationObserver(resetColours).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

/* ----- ordinal ramp + hollow marker (trellis grids C and D) --------------- */

/** Seven movement steps exist in the stylesheet; a caller asking for more gets
 *  what is authored rather than an undefined colour. */
export const RAMP_STEPS = 7;

/**
 * Movements are ordered in time, so they take the site's ordinal ramp — not a
 * semantic tone. `--chart-series-N` is authored light→dark in light mode and
 * value-reversed in dark mode, so "lightest = earliest" survives both themes.
 * Called per mount: Chart.js bakes colours at create time.
 */
export function ramp(steps = RAMP_STEPS): string[] {
  const n = Math.min(steps, RAMP_STEPS);
  return Array.from({ length: n }, (_, i) => css(`chart-series-${i + 1}`));
}

/** Interior of a hollow marker — the card, never a literal white. */
export const hollow = (): string => css("chart-hollow");

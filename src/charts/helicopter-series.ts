
import type { Band } from "../model/index.ts";
import { HELI_BY_DATE, withHelicopters, cumulative } from "../data/helicopters.ts";

const mid = (b: Band): number => (typeof b === "number" ? b : (b[0] + b[1]) / 2);

/** Bar column: aerial cost per day, null on days with no sortie. */
export const heliBar = (dates: readonly string[]): (number | null)[] =>
  dates.map((d) => {
    const day = HELI_BY_DATE.get(d);
    return day ? mid(day.inService) : null;
  });

/** Error-bar column: low/high pair for the existing error-bars plugin. */
export const heliErrorBar = (
  dates: readonly string[],
): ({ y: number; lo: number; hi: number } | null)[] =>
  dates.map((d) => {
    const day = HELI_BY_DATE.get(d);
    if (!day) return null;
    const [lo, hi] = typeof day.inService === "number"
      ? [day.inService, day.inService]
      : day.inService;
    return { y: (lo + hi) / 2, lo, hi };
  });

/** Cumulative policing line, re-derived with the aerial component included.
 *  SPLICE POINT 1 — pass whichever array your datasets.ts already builds. */
export const cumulativeWithHeli = (
  dates: readonly string[],
  policingByDate: ReadonlyArray<{ date: string; band: Band }>,
): number[] =>
  cumulative(
    withHelicopters(
      dates.map((date) => ({
        date,
        band: policingByDate.find((p) => p.date === date)?.band ?? 0,
      })),
    ),
  );

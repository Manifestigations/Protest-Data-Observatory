import { HELI_BY_DATE } from "../data/helicopters.ts";
import type { Band } from "../model/index.ts";

const pair = (b: Band): [number, number] =>
  typeof b === "number" ? [b, b] : b;
const mid = (b: Band): number => {
  const [lo, hi] = pair(b);
  return (lo + hi) / 2;
};

export const heliBar = (dates: readonly string[]): (number | null)[] =>
  dates.map((d) => {
    const day = HELI_BY_DATE.get(d);
    return day ? mid(day.inService) : null;
  });

export const heliErrorBar = (
  dates: readonly string[],
): ({ y: number; lo: number; hi: number } | null)[] =>
  dates.map((d) => {
    const day = HELI_BY_DATE.get(d);
    if (!day) return null;
    const [lo, hi] = pair(day.inService);
    return { y: (lo + hi) / 2, lo, hi };
  });

/** Cumulative policing line, re-derived with the aerial component included. */
export const cumulativeWithHeli = (
  dates: readonly string[],
  policingByDate: ReadonlyArray<{ date: string; band: Band }>,
): number[] => {
  let run = 0;
  return dates.map((date) => {
    const base = policingByDate.find((p) => p.date === date)?.band ?? 0;
    const day = HELI_BY_DATE.get(date);
    run += mid(base) + (day ? mid(day.inService) : 0);
    return run;
  });
};

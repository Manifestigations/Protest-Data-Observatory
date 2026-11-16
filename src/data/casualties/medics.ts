export type BreakdownKey =
  | "lbd"
  | "baton"
  | "grenade"
  | "gas"
  | "cranialTraumaSuspected";

export interface CityCount {
  readonly date: string;
  readonly scope: string; // scope id; severityTable falls back to it
  readonly city: string;
  readonly injured: number;
  readonly breakdown: Readonly<Partial<Record<BreakdownKey, number>>>;
  readonly teams: number;
  readonly provisional: boolean;
  readonly collector: string;
  readonly sources: readonly string[];
}

export const CITY_COUNTS: readonly CityCount[] = [
  {
    date: "2026-10-17",
    scope: "montpellier-2026-10-17",
    city: "Montpellier",
    injured: 60,
    breakdown: { lbd: 9, baton: 5, cranialTraumaSuspected: 3 },
    teams: 11,
    provisional: true,
    collector: "Street Medics Montpellier",
    sources: ["sm-mtp-2026-10-17-ig", "sm-mtp-2026-10-17-press"],
  },
];

export const cityCountsOn = (date: string): readonly CityCount[] =>
  CITY_COUNTS.filter((c) => c.date === date);

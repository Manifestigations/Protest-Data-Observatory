import type { Bi } from "../../copy/index.ts";

export type GroupId =
  | "official"
  | "press"
  | "blockades"
  | "cost"
  | "overseas"
  | "ref2026"
  | "mai68"
  | "cpe"
  | "gj"
  | "strikes"
  | "nahel"
  | "retraites"
  | "rn2024"
  | "bloquons"
  | "media";

export interface Source {
  readonly id: string;
  readonly group: GroupId;
  /** Publisher and headline, verbatim. Never translated. */
  readonly label: string;
  readonly url: string;
  /** ISO start date. Absent for continuously published sources and standing pages. */
  date?: string;
  /** End of a publication span; rendered as "10 Sep–11 Sep 2025". */
  dateEnd?: string;
  /** What this page takes from the source. */
  readonly what: Bi;
}

export interface SourceGroup {
  readonly id: GroupId;
  readonly title: Bi;
  readonly blurb: Bi;
}

export interface Mention {
  readonly name: string;
  readonly note: Bi;
}

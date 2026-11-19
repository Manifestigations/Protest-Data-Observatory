import type { LegalCopy } from "../types";

export const LEGAL_EN: LegalCopy = {
  title: "Illegal acts",
  standfirst:
    "Three registers kept apart on purpose: acts attributed to protesters, acts attributed to the police, and acts attributed to far-right groups — the last named by whoever named them, not by us.",
  presumption:
    "Everyone is presumed innocent until finally convicted. A record states an alleged act and where the case stands; it is not a finding of guilt. An acquittal, a dismissal and a decision not to prosecute are three different things.",
  anonymity:
    "No individual is named. A record names a unit, a date and a place.",
  attributionPrefix: "Described as",
  sides: {
    protesters: "Protesters",
    police: "Police",
    "far-right": "Far-right",
  },
  modes: {
    "comparution-immediate": "Immediate appearance",
    crpc: "Guilty plea (CRPC)",
    renvoi: "Adjournment",
    "detention-hearing": "Detention hearing",
  },
  terms: {
    "ultra-right": "ultra-right",
    "extreme-right": "extreme right",
    "far-right": "far-right",
    identitarian: "identitarian",
    "revolutionary-nationalist": "revolutionary nationalist",
    unattributed: "no term given",
  },
  attributedBy: {
    court: "a prosecutor",
    police: "the police",
    prefecture: "a prefecture",
    minister: "the interior minister",
    "elected-official": "an elected official",
    journalist: "journalists",
  },
  sitting: {
    court: "Court",
    rooms: "Rooms sitting",
    roomsUsual: "Usually",
    docket: "Cases listed",
    nullityRisk: "Annulment risk reported",
    modes: "Tracks",
    oneRoom: "room",
    manyRooms: "rooms",
  },
};

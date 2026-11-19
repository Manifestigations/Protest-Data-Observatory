import type { LegalCopy } from "../types";

export const LEGAL_FR: LegalCopy = {
  title: "Actes illégaux",
  standfirst:
    "Trois registres volontairement séparés : les actes attribués aux manifestants, ceux attribués aux forces de l'ordre, et ceux attribués à des groupes d'extrême droite — ces derniers nommés par ceux qui les nomment, pas par nous.",
  presumption:
    "Toute personne est présumée innocente jusqu'à condamnation définitive. Une fiche décrit un acte allégué et l'état de la procédure ; elle ne vaut pas déclaration de culpabilité. Une relaxe, un non-lieu et un classement sans suite sont trois choses différentes.",
  anonymity:
    "Aucune personne n'est nommée. Une fiche nomme une unité, une date et un lieu.",
  attributionPrefix: "Décrit comme",
  sides: {
    protesters: "Manifestants",
    police: "Forces de l'ordre",
    "far-right": "Extrême droite",
  },
  modes: {
    "comparution-immediate": "Comparution immédiate",
    crpc: "Reconnaissance préalable de culpabilité (CRPC)",
    renvoi: "Renvoi",
    "detention-hearing": "Débat sur la détention",
  },
  terms: {
    "ultra-right": "ultradroite",
    "extreme-right": "extrême droite",
    "far-right": "extrême droite",
    identitarian: "identitaires",
    "revolutionary-nationalist": "nationalistes-révolutionnaires",
    unattributed: "aucun terme précisé",
  },
  attributedBy: {
    court: "un procureur",
    police: "la police",
    prefecture: "une préfecture",
    minister: "le ministre de l'intérieur",
    "elected-official": "un élu",
    journalist: "des journalistes",
  },
  sitting: {
    court: "Tribunal",
    rooms: "Salles siégeant",
    roomsUsual: "Ordinairement",
    docket: "Dossiers inscrits",
    nullityRisk: "Risque de nullité signalé",
    modes: "Filières",
    oneRoom: "salle",
    manyRooms: "salles",
  },
};

import type {
  ActStatus,
  Bi,
  CaveatId,
  ChargeId,
  Gap,
  NormId,
  StepKind,
  TacticId,
} from "./types.ts";

export const LEGAL_LABELS = {
  title: { en: "Illegal acts", fr: "Actes illégaux" } as Bi,
  standfirst: {
    en: "Three registers, kept apart on purpose: offences alleged against protesters, offences alleged against the police, and police tactics read against the laws of armed conflict. The third is a counterfactual, not an accusation.",
    fr: "Trois registres volontairement séparés : les infractions reprochées aux manifestants, celles reprochées aux forces de l'ordre, et les techniques policières relues à l'aune du droit des conflits armés. Le troisième est une hypothèse de travail, non une accusation.",
  } as Bi,
  method: {
    en: "Each record is one claim: a date, a place, a charge and the state of the proceedings. Nothing here is a count of crimes — a claim that has not been tried is still a claim. Figures published elsewhere, arrests in the daily series and injuries in the casualty register, are linked and never repeated.",
    fr: "Chaque fiche est une allégation : une date, un lieu, une qualification et l'état de la procédure. Rien ici n'est un décompte de crimes — une allégation non jugée reste une allégation. Les chiffres publiés ailleurs, les interpellations de la série quotidienne et les blessures du registre des victimes, sont liés et jamais recopiés.",
  } as Bi,
  presumption: {
    en: "Everyone is presumed innocent until finally convicted. A record describes an alleged act and where the case stands; it is not a finding of guilt. An acquittal, a dismissal and a decision not to prosecute are three different things.",
    fr: "Toute personne est présumée innocente jusqu'à condamnation définitive. Une fiche décrit un acte allégué et l'état de la procédure ; elle ne vaut pas déclaration de culpabilité. Une relaxe, un non-lieu et un classement sans suite sont trois choses différentes.",
  } as Bi,
  anonymity: {
    en: "No individual officer or protester is named. A record names a unit, a date and a place.",
    fr: "Aucun agent ni manifestant n'est nommé. Une fiche nomme une unité, une date et un lieu.",
  } as Bi,
  hypotheticalBanner: {
    en: "Hypothetical: this reads a police tactic against the law of armed conflict, which does not apply here. Each entry carries its caveat.",
    fr: "Hypothétique : cette lecture confronte une technique policière au droit des conflits armés, qui ne s'applique pas ici. Chaque entrée porte sa réserve.",
  } as Bi,
  emptyColumn: {
    en: "An empty column is a finding, not a zero.",
    fr: "Une colonne vide est un résultat, pas un zéro.",
  } as Bi,
  finalSuffix: { en: "final", fr: "définitif" } as Bi,
} as const;

export const STATUS_LABELS: Record<ActStatus | "hypothetical", Bi> = {
  alleged: { en: "Alleged", fr: "Allégué" },
  complaint: { en: "Complaint filed", fr: "Plainte déposée" },
  investigation: { en: "Under investigation", fr: "Enquête en cours" },
  charged: { en: "Charged", fr: "Poursuites engagées" },
  tried: { en: "On trial", fr: "Jugement en cours" },
  convicted: { en: "Convicted", fr: "Condamné" },
  acquitted: { en: "Acquitted", fr: "Relaxé / acquitté" },
  dismissed: {
    en: "Dismissed without trial",
    fr: "Classé sans suite ou non-lieu",
  },
  prescribed: { en: "Time-barred", fr: "Prescrit" },
  unknown: { en: "State unknown", fr: "État inconnu" },
  hypothetical: { en: "Hypothetical", fr: "Hypothétique" },
};

export const STEP_LABELS: Record<StepKind, Bi> = {
  incident: { en: "Incident", fr: "Faits" },
  complaint: { en: "Complaint", fr: "Plainte" },
  investigation: { en: "Investigation opened", fr: "Ouverture d'une enquête" },
  custody: { en: "Custody", fr: "Garde à vue" },
  charge: { en: "Charge", fr: "Poursuites" },
  trial: { en: "Hearing", fr: "Audience" },
  verdict: { en: "Decision", fr: "Décision" },
  appeal: { en: "Appeal", fr: "Appel" },
  dismissal: { en: "Closed", fr: "Classement ou non-lieu" },
  prescription: { en: "Time-barred", fr: "Prescription" },
};

export const CHARGE_LABELS: Record<ChargeId, Bi> = {
  attroupement: {
    en: "Participation in an unlawful assembly after a warning to disperse",
    fr: "Participation à un attroupement après sommation",
  },
  "entrave-circulation": {
    en: "Obstruction of traffic",
    fr: "Entrave à la circulation",
  },
  rebellion: { en: "Resisting arrest with violence", fr: "Rébellion" },
  outrage: {
    en: "Insulting a person holding public authority",
    fr: "Outrage à personne dépositaire de l'autorité publique",
  },
  "violences-volontaires": {
    en: "Wilful violence",
    fr: "Violences volontaires",
  },
  degradations: { en: "Criminal damage", fr: "Dégradations de biens" },
  incendie: { en: "Arson", fr: "Incendie volontaire" },
  "arme-prohibee": {
    en: "Carrying a prohibited weapon",
    fr: "Port ou transport d'une arme prohibée",
  },
  "association-malfaiteurs": {
    en: "Criminal conspiracy",
    fr: "Association de malfaiteurs",
  },
  "violences-depositaire": {
    en: "Wilful violence by a person holding public authority",
    fr: "Violences volontaires par personne dépositaire de l'autorité publique",
  },
  faux: { en: "Forgery of a public document", fr: "Faux en écriture publique" },
  "mise-en-danger": { en: "Endangering others", fr: "Mise en danger d'autrui" },
  "non-assistance": {
    en: "Failure to assist a person in danger",
    fr: "Non-assistance à personne en danger",
  },
  sequestration: { en: "False imprisonment", fr: "Séquestration" },
  discrimination: {
    en: "Discrimination by a person holding public authority",
    fr: "Discrimination par une personne dépositaire de l'autorité publique",
  },
  "vie-privee": { en: "Breach of privacy", fr: "Atteinte à la vie privée" },

  /* ── added with the far-right register ────────────────────────────────
     `CHARGE_LABELS` is keyed by id and not by side, so this grouping is
     cosmetic. What decides which side a record may use is `sides` in
     Dataset/src/data/illegal/charges.ts, and `check:illegal` holds records
     to it. */
  "violences-aggravees": {
    en: "Aggravated wilful violence",
    fr: "Violences volontaires aggravées",
  },
  "association-malfaiteurs-violences": {
    en: "Criminal conspiracy to commit violence",
    fr: "Association de malfaiteurs en vue de commettre des violences",
  },
  "tentative-homicide": {
    en: "Attempted homicide",
    fr: "Tentative d'homicide",
  },
};

export const TACTIC_LABELS: Record<TacticId, Bi> = {
  "tear-gas": { en: "Tear gas (CS)", fr: "Gaz lacrymogène (CS)" },
  lbd: {
    en: "Defence-ball launcher (LBD 40)",
    fr: "Lanceur de balles de défense (LBD 40)",
  },
  grenade: { en: "Hand-thrown grenade", fr: "Grenade lancée à la main" },
  charge: { en: "Charge", fr: "Charge" },
  nasse: { en: "Encircling (kettling)", fr: "Encerclement (« nasse »)" },
  interpellation: { en: "Arrest", fr: "Interpellation" },
  surveillance: {
    en: "Surveillance (drone, camera)",
    fr: "Surveillance (drone, caméra)",
  },
};

export const NORM_LABELS: Record<NormId, Bi> = {
  "ap1-51-2": {
    en: "Civilians must not be the object of attack",
    fr: "Les civils ne peuvent être l'objet d'une attaque",
  },
  "ap1-51-4": {
    en: "Indiscriminate attack: a method that cannot be directed at a military objective",
    fr: "Attaque indiscriminée : une méthode qui ne peut être dirigée contre un objectif militaire",
  },
  "ap1-51-5-b": {
    en: "Disproportionate attack: expected civilian harm excessive to the military advantage",
    fr: "Attaque disproportionnée : dommages civils excessifs au regard de l'avantage militaire attendu",
  },
  "ap1-75": {
    en: "Fundamental guarantees for persons in the power of a party to the conflict",
    fr: "Garanties fondamentales des personnes au pouvoir d'une partie au conflit",
  },
  "ap2-4": {
    en: "Fundamental guarantees in a non-international armed conflict",
    fr: "Garanties fondamentales dans un conflit armé non international",
  },
  "ap1-35-2": {
    en: "Weapons causing superfluous injury or unnecessary suffering",
    fr: "Armes causant des maux superflus",
  },
  "cwc-1-5": {
    en: "Riot-control agents used as a method of warfare",
    fr: "Agents de maintien de l'ordre employés comme méthode de guerre",
  },
};

/** The caveats carry the argument. They are not decoration: a counterfactual
 *  entry without one is a misreading waiting to happen. */
export const CAVEAT_LABELS: Record<CaveatId, Bi> = {
  "ihl-not-armed-conflict": {
    en: "The law of armed conflict applies to armed conflict. Metropolitan France in 2026 is not one, so this entry tests a norm against the facts — it does not allege that a war crime was committed.",
    fr: "Le droit des conflits armés s'applique aux conflits armés. La France métropolitaine de 2026 n'en est pas un : cette entrée confronte une norme aux faits, elle n'allègue pas qu'un crime de guerre a été commis.",
  },
  "cwc-riot-control": {
    en: "Riot-control agents are not prohibited as such: the Chemical Weapons Convention permits them for domestic riot control (Art. II(9)(d)) and prohibits their use as a method of warfare (Art. I(5)). What is at issue is the use, not the agent.",
    fr: "Les agents de maintien de l'ordre ne sont pas interdits en soi : la Convention sur les armes chimiques les autorise pour le maintien de l'ordre intérieur (art. II(9)(d)) et interdit leur emploi comme méthode de guerre (art. I(5)). Ce qui est en cause, c'est l'usage, non l'agent.",
  },
  "means-not-prohibited": {
    en: "No instrument in force prohibits this means. The entry asks whether a particular use would breach a norm if the same conduct occurred in an armed conflict.",
    fr: "Aucun instrument en vigueur n'interdit ce moyen. L'entrée examine si un usage précis violerait une norme dans l'hypothèse où les mêmes faits se produiraient dans un conflit armé.",
  },
};

export const GAP_LABELS: Record<Gap, Bi> = {
  "not-published": { en: "Not published", fr: "Non publié" },
  "not-collected": { en: "Not collected", fr: "Non recensé" },
  "not-split": { en: "Not broken down", fr: "Non ventilé" },
  "not-found": { en: "Not found", fr: "Introuvable" },
};

export const LEGAL_TABLE = {
  date: { en: "Date", fr: "Date" } as Bi,
  place: { en: "Place", fr: "Lieu" } as Bi,
  charge: { en: "Charge", fr: "Qualification" } as Bi,
  tactic: { en: "Tactic", fr: "Technique" } as Bi,
  status: { en: "State of the claim", fr: "État de l'allégation" } as Bi,
  figure: { en: "Figure", fr: "Chiffre" } as Bi,
  sources: { en: "Sources", fr: "Sources" } as Bi,
  records: { en: "records", fr: "fiches" } as Bi,
  unquantified: { en: "with no figure", fr: "sans chiffre" } as Bi,
} as const;

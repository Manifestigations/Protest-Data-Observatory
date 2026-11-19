/* Copy for the "who pays" panel. Every string here is referenced by name from
   src/charts/notes.ts (costNoteText) or from the costs section; no literal in
   a DOM call. FR is authored in ../fr/costs.ts, not translated. */

export interface CostCopy {
  heading: string;
  intro: string;
  stage: {
    heading: string;
    committed: string;
    disbursed: string;
    contingent: string;
  };
  payer: {
    heading: string;
    state: string;
    local: string;
    insurer: string;
    employer: string;
    private: string;
    household: string;
    protestor: string;
  };
  column: {
    payer: string;
    amount: string;
    notPublished: string;
    instrument: string;
    noPricedRow: string;
  };
  damage: { heading: string; body: string };
  concession: { heading: string; body: string; offset: string };
  ratio: { heading: string; body: string; caption: string };
  exposure: { heading: string; body: string; perPerson: string };
  notes: Readonly<Record<string, string>>;
  caveats: readonly string[];
}

export const COST_COPY_EN: CostCopy = {
  heading: "Who pays",
  intro:
    "A damage bill is not a transfer to anyone. Every cost in this panel is split by the party that ends up bearing it, and by whether it has actually been paid.",

  stage: {
    heading: "Three stages, never two",
    committed:
      "Committed — announced, owed or budgeted, not yet paid. The five billion of education money is committed and mostly loaned, so it is not spending.",
    disbursed:
      "Disbursed — actually paid. Empty for every party here, because no one publishes a claims-paid figure for 2026.",
    contingent:
      "Contingent — exposure that has been neither imposed nor paid: a statutory maximum, or a bill the Senate passed and the National Assembly has not.",
  },

  payer: {
    heading: "The parties",
    state:
      "The State — policing, support funds for damaged businesses, and the education package.",
    local:
      "Local authorities — town halls, schools, buses, and the uninsured share of public property.",
    insurer:
      "Insurers — they pay the claim first and recover through premiums. A conduit, not a victim.",
    employer:
      "Employers — the minimum-wage rise and the payroll measures around it.",
    private:
      "Businesses and vehicle owners — the uninsured share of their own damage and lost turnover.",
    household:
      "Households — parents, civilly liable for damage caused by their minor child.",
    protestor:
      "Protestors — penalties, compensation orders and their own fines.",
  },

  column: {
    payer: "Party",
    amount: "Amount",
    notPublished: "not published",
    instrument: "Instrument",
    noPricedRow: "no priced row",
  },

  damage: {
    heading: "The damage, by asset type",
    body: "The only published decomposition is IFRAP's, for 17–18 October, and it comes as three scenarios rather than a range. Shops carry 61% of the high estimate, public and collective property 18%, vehicles and other private property 4%.",
  },

  concession: {
    heading: "What the movement extracted",
    body: "Two rounds: the education package of 26 October and the social package of 9 November. Only the first has a published total, and it is the only number here that can be compared with the damage at all.",
    offset:
      "The Budget Minister put the education package at five billion euros and said it would be offset with spending cuts elsewhere. A concession that is offset is not a transfer to anyone: it moves the cost, it does not add to it.",
  },

  ratio: {
    heading: "Damage against concession",
    body: "Five billion committed against 309 million to 1.1 billion of damage: between four and a half and sixteen euros committed per euro of damage. Read it as a ratio of commitment, not of return. Most of the five billion is a loan, the interest subsidy on it is unpublished, and the government says the package is offset by cuts — so the cash cost cannot be computed from public sources.",
    caption: "commitment per euro of damage — not spending",
  },

  exposure: {
    heading: "What protestors owe",
    body: "Nothing has been collected that anyone has totalled, and no aggregate of fines imposed on this movement is published. What exists is exposure: statutory maxima per person, and a bill the Senate passed on 28 October capping compensation at 10,000 euros per person, which the National Assembly has not voted.",
    perPerson: "per person, statutory maximum",
  },

  notes: {
    "loan-not-spending":
      "A loan facility, not a budget line. The interest subsidy is unpublished, so the cash cost of this concession cannot be computed from public sources.",
    "insurer-conduit":
      "The insurer pays the claim and recovers through premiums. It is a conduit, not the party that bore the loss — which is why it is shown apart from the businesses it indemnifies. Its own count is an estimated ultimate cost, not money paid.",
    "uninsured-residual":
      "The gap between the estimates is not apportioned, and it is not asserted to be uninsured. The insurers count 207 million of insured damage against a material-damage estimate of 911 million: either the estimate is high, or much of the damage carried no cover, or claims were still arriving. This panel does not adjudicate between those.",
    "no-claims-paid":
      "No figure for indemnities actually paid is published. France Assureurs publishes an estimated ultimate cost of insured damage — 207 million as of 19 November — not a record of payments made.",
    "insured-gap":
      "Two independently produced figures, never reconciled: 207 million insured against 309 million to 1.1 billion estimated. The insured share is therefore between 19% and 67% depending on the scenario, and the difference is a finding, not a rounding error.",
    "local-not-in-insurer-count":
      "The 19 November estimate has no local-authority line, unlike the 2023 balance sheet. Public property is absent from it, not zero in it. What local authorities actually recover, and from whom, is published nowhere.",
    "proposed-not-law":
      "Adopted by the Senate on 28 October by 229 votes to 105. The National Assembly has not voted, so this creates no obligation yet.",
    "parental-liability":
      "Parents are civilly liable for damage caused by their minor child. In practice this is a household cost, usually met by a family liability policy — which is the quietest way a private individual pays for a protest.",
    "statutory-maximum":
      "A statutory maximum per person. It is not a national total, it is not what anyone was ordered to pay, and it is never summed.",
    "tax-expenditure":
      "A tax expenditure with no published total. Absent is not zero, and it is not the same thing as a budget line.",
  },

  caveats: [
    "The disbursed column is empty for every party. That is a finding about publication, not a claim that nothing was paid.",
    "Committing and disbursing are never added: a committed euro may be disbursed later, so the sum would count it twice. Loans are never added to spending.",
    "The protestor figures are per-person maxima, three to four orders of magnitude below the aggregates. They are shown on their own scale and never plotted against the national totals.",
  ],
};

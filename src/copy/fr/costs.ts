import type { CostCopy } from "../en/costs.ts";

export const COST_COPY_FR: CostCopy = {
  heading: "Qui paie",
  intro:
    "Une facture de dégâts n'est un transfert pour personne. Chaque coût de ce panneau est ventilé selon la partie qui finit par le supporter, et selon qu'il a été payé ou non.",

  stage: {
    heading: "Trois étapes, jamais deux",
    committed:
      "Engagé — annoncé, dû ou budgété, pas encore payé. Les cinq milliards de l'éducation sont engagés et pour l'essentiel prêtés : ce n'est pas de la dépense.",
    disbursed:
      "Décaissé — effectivement payé. Vide pour toutes les parties ici, parce qu'aucun montant d'indemnisation versé n'est publié pour 2026.",
    contingent:
      "Éventuel — une exposition ni prononcée ni payée : un maximum légal, ou un texte adopté par le Sénat et pas encore par l'Assemblée nationale.",
  },

  payer: {
    heading: "Les parties",
    state:
      "L'État — le maintien de l'ordre, les fonds de soutien aux entreprises sinistrées, et le paquet éducation.",
    local:
      "Les collectivités — mairies, écoles, bus, et la part non assurée des biens publics.",
    insurer:
      "Les assureurs — ils indemnisent d'abord et récupèrent sur les primes. Un canal, pas une victime.",
    employer:
      "Les employeurs — la hausse du SMIC et les mesures sur les cotisations qui l'entourent.",
    private:
      "Les entreprises et les propriétaires de véhicules — la part non assurée de leurs propres dommages et de leur chiffre d'affaires perdu.",
    household:
      "Les ménages — les parents, civilement responsables du dommage causé par leur enfant mineur.",
    protestor:
      "Les manifestants — les peines, les condamnations à réparation et leurs propres amendes.",
  },

  column: {
    payer: "Partie",
    amount: "Montant",
    notPublished: "non publié",
    instrument: "Instrument",
    noPricedRow: "aucune ligne chiffrée",
  },

  damage: {
    heading: "Les dommages, par type de bien",
    body: "La seule ventilation publiée est celle de l'IFRAP, pour les 17 et 18 octobre, et elle se présente en trois scénarios plutôt qu'en fourchette. Le commerce porte 61 % de l'hypothèse haute, les biens publics et collectifs 18 %, les véhicules et autres biens privés 4 %.",
  },

  concession: {
    heading: "Ce que le mouvement a obtenu",
    body: "Deux rounds : le paquet éducation du 26 octobre et le paquet social du 9 novembre. Seul le premier a un total publié, et c'est le seul chiffre comparable aux dommages.",
    offset:
      "Le ministre du Budget a chiffré le paquet éducation à cinq milliards d'euros, compensés par des économies ailleurs. Une concession compensée n'est un transfert pour personne : elle déplace le coût, elle ne l'ajoute pas.",
  },

  ratio: {
    heading: "Dommages et concessions",
    body: "Cinq milliards engagés contre 309 millions à 1,1 milliard de dégâts : entre quatre et demi et seize euros engagés par euro de dommage. À lire comme un rapport d'engagement, non de rendement. L'essentiel des cinq milliards est un prêt, la subvention d'intérêt n'est pas publiée, et le gouvernement annonce que le paquet est compensé par des économies : le coût budgétaire n'est donc pas calculable à partir des sources publiques.",
    caption: "engagement par euro de dommage — pas de la dépense",
  },

  exposure: {
    heading: "Ce que les manifestants doivent",
    body: "Rien n'a été recouvré qui ait été totalisé, et aucun total d'amendes prononcées pour ce mouvement n'est publié. Ce qui existe, c'est une exposition : des maxima légaux par personne, et un texte adopté par le Sénat le 28 octobre plafonnant la réparation à 10 000 euros par personne, que l'Assemblée nationale n'a pas voté.",
    perPerson: "par personne, maximum légal",
  },

  notes: {
    "loan-not-spending":
      "Une enveloppe de prêts, pas une ligne budgétaire. La subvention d'intérêt n'est pas publiée : le coût budgétaire de cette concession n'est pas calculable à partir des sources publiques.",
    "insurer-conduit":
      "L’assureur indemnise et récupère sur les primes. C’est un canal, non la partie qui a subi la perte — d’où sa présentation à part des entreprises qu’il indemnise. Son décompte est un coût ultime estimé, non de l’argent versé.",
    "uninsured-residual":
      "L’écart entre les estimations n’est pas réparti, et il n’est pas affirmé comme non assuré. Les assureurs comptent 207 M€ de dommages assurés face à une estimation de 911 M€ de dommages matériels : soit l’estimation est haute, soit une large part des dégâts n’était pas couverte, soit des sinistres arrivaient encore. Ce panneau n’arbitre pas entre ces hypothèses.",
    "no-claims-paid":
      "Aucun montant d’indemnisation effectivement versé n’est publié. France Assureurs publie un coût ultime estimé des dommages assurés — 207 M€ au 19 novembre — et non un relevé des paiements effectués.",
    "insured-gap":
      "Deux chiffres produits indépendamment, jamais réconciliés : 207 M€ assurés contre 309 M€ à 1,1 Md€ estimés. La part assurée se situe donc entre 19 % et 67 % selon le scénario, et l’écart est un résultat, non une erreur d’arrondi.",
    "local-not-in-insurer-count":
      "L’estimation du 19 novembre ne comporte aucune ligne pour les collectivités, contrairement au bilan 2023. Les biens publics en sont absents, non nuls. Ce que les collectivités récupèrent réellement, et de qui, n’est publié nulle part.",
    "proposed-not-law":
      "Adopté par le Sénat le 28 octobre par 229 voix contre 105. L'Assemblée nationale n'a pas voté : le texte ne crée donc aucune obligation à ce jour.",
    "parental-liability":
      "Les parents sont civilement responsables du dommage causé par leur enfant mineur. En pratique, c'est un coût de ménage, le plus souvent couvert par une assurance responsabilité familiale — la manière la plus discrète pour un particulier de payer une manifestation.",
    "statutory-maximum":
      "Un maximum légal par personne. Ce n'est pas un total national, ce n'est pas ce que quiconque a été condamné à payer, et ce n'est jamais additionné.",
    "tax-expenditure":
      "Une dépense fiscale sans total publié. L'absence n'est pas zéro, et ce n'est pas la même chose qu'une ligne budgétaire.",
  },

  caveats: [
    "La colonne décaissée est vide pour toutes les parties. C'est un constat sur la publication, non l'affirmation que rien n'a été payé.",
    "Engagé et décaissé ne s'additionnent jamais : un euro engagé peut être décaissé plus tard, la somme le compterait deux fois. Un prêt ne s'ajoute jamais à de la dépense.",
    "Les montants côté manifestants sont des maxima par personne, trois à quatre ordres de grandeur sous les agrégats. Ils ont leur propre échelle et ne sont jamais tracés face aux totaux nationaux.",
  ],
};

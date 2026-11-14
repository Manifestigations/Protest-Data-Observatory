import type { EpisodeCopy } from "../types";

export const EPISODES_FR: Record<string, EpisodeCopy> = {
  may68: {
    short: "Mai 68",
    strip: "Mai 68",
    banner:
      "Grève générale et occupations d’usines. Les foules syndicales et les décomptes ministériels diffèrent d’un facteur dix : les deux sont tracés.",
    weeks: [
      { action: "Manifestations du 1er mai" },
      {
        action: "Nuit des barricades, 10–11 mai",
        note: { i: "Chiffre publié comme plancher." },
      },
      { action: "Grève générale à partir du 13 mai" },
      {
        action: "24 mai : allocution du général de Gaulle",
        note: { a: "Bilan d’interpellations publié comme plancher." },
      },
      { action: "Accords de Grenelle, 27 mai" },
      { action: "Campagne des législatives" },
      undefined,
      undefined,
      undefined,
    ],
  },
  cpe: {
    short: "CPE 2006",
    strip: "CPE 2006",
    banner:
      "Contrat première embauche : mouvement lycéen et étudiant, avec deux journées interprofessionnelles. Les chiffres de maintien de l’ordre n’existent que pour quatre semaines.",
    weeks: [
      { action: "7 février : première journée nationale" },
      undefined,
      undefined,
      undefined,
      { action: "Universités bloquées" },
      { action: "14 mars : journée nationale" },
      { action: "21 mars : journée étudiante" },
      { action: "28 mars : journée nationale" },
      { action: "4 avril : journée nationale" },
      { action: "Retrait annoncé" },
    ],
  },
  gj: {
    short: "Gilets jaunes",
    strip: "Gilets jaunes",
    banner:
      "Compté acte par acte, le samedi uniquement. Les chiffres de maintien de l’ordre n’ont été publiés que pour les quatre premiers actes, jamais en série.",
    weeks: [],
  },
  nahel: {
    short: "Juin 2023",
    strip: "Juin 2023",
    banner:
      "Cinq nuits d’émeutes après la mort du 27 juin. Les interpellations et blessés sont élevés rapportés à la foule parce qu’il ne s’agissait pas de manifestations.",
    weeks: [
      { action: "27 juin : début des émeutes" },
      { action: "Retour au calme" },
    ],
  },
  pensions: {
    short: "Retraites 2023",
    strip: "Retraites 2023",
    banner:
      "Mouvement contre le report de l’âge légal. Deux journées portent l’essentiel de la série ; la fourchette intersyndicale est large.",
    weeks: [
      { action: "19 janvier : première journée nationale" },
      undefined,
      { action: "31 janvier" },
      { action: "7 février" },
      { action: "16 février" },
      undefined,
      undefined,
      { action: "7 mars : écoles et transports bloqués" },
      { action: "11 mars" },
      { action: "15 mars" },
      { action: "23 mars" },
      { action: "28 mars" },
      { action: "6 avril" },
      undefined,
      undefined,
      undefined,
      { action: "1er mai" },
      undefined,
      undefined,
      undefined,
      { action: "6 juin" },
    ],
  },
  bt: {
    short: "Bloquons tout",
    strip: "Bloquons tout",
    banner:
      "Septembre 2025 : blocages et défilés, décomptes partiels. Les semaines sans chiffre publié restent vides.",
    weeks: [
      { action: "10 septembre : blocages" },
      { action: "18 septembre : journée nationale" },
      undefined,
      { action: "1er octobre" },
    ],
  },
  students26: {
    short: "Automne 2026",
    strip: "Automne 2026",
    banner:
      "Le mouvement pour lequel cette page a été construite, suivi depuis les premiers blocages de lycées en métropole le 15 septembre. Publication quotidienne : les jours sans chiffre restent vides plutôt qu’interpolés.",
    weeks: [
      { action: "15 septembre : blocages de Caen et de Villeneuve-d’Ascq" },
      { action: "25 septembre : blocages dans l’agglomération parisienne" },
      { action: "Acte I le 29 septembre, acte II le 1er octobre" },
      { action: "Acte III le 6 octobre" },
      { action: "17 octobre : la pointe" },
      { action: "24 octobre" },
      { action: "31 octobre" },
      { action: "5 et 7 novembre" },
      { action: "9 novembre — fenêtre arrêtée au 11 novembre" },
    ],
    fallbackNote: {
      p: "Pointe hebdomadaire issue de la série quotidienne — le jour de pointe de la semaine.",
      a: "Somme des chiffres journaliers publiés de la semaine ; un stock cumulé est montré comme le stock, jamais additionné.",
    },
  },
};

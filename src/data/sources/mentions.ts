import { both } from "./record";
import type { Mention } from "./types";

export const MENTIONS: readonly Mention[] = [
  {
    name: "data.gouv.fr — base des mobilisations",
    note: both(
      "intended source for the metropolitan/overseas split; never actually retrieved.",
      "source prévue pour la ventilation métropole / outre-mer ; jamais effectivement consultée.",
    ),
  },
  {
    name: "CCI France",
    note: both(
      "author of the 2,488 / 2,538 shop counts, reached through Le Monde, franceinfo, BFMTV, LSA and La Dépêche.",
      "auteur des décomptes de 2 488 / 2 538 commerces, atteint via Le Monde, franceinfo, BFMTV, LSA et La Dépêche.",
    ),
  },
  {
    name: "Pr Laurent Thines (CHU de Besançon)",
    note: both(
      "author of the 79-serious-injury register attributed by Le Canard enchaîné; also cited directly as the injury floor.",
      "auteur du registre de 79 blessés graves attribué par Le Canard enchaîné ; également cité directement comme plancher.",
    ),
  },
  {
    name: "Sénat — commission d’enquête de juin 2023",
    note: both(
      "the ~50,000 rioters and consolidated damage estimate, reached through the Senate press release above.",
      "les ~50 000 émeutiers et l’estimation consolidée des dommages, atteints via le communiqué du Sénat ci-dessus.",
    ),
  },
  {
    name: "France Police",
    note: both(
      "police union; publisher of the 750,000 counter-count for the Act II of the Gilets jaunes.",
      "syndicat policier ; auteur du contre-décompte de 750 000 pour l’acte II des Gilets jaunes.",
    ),
  },
  {
    name: "Collectif « Nombre jaune »",
    note: both(
      "the independent crowd-counting group behind the alternative Gilets jaunes figures.",
      "le collectif indépendant de comptage derrière les chiffres alternatifs des Gilets jaunes.",
    ),
  },
  {
    name: "Occurrence",
    note: both(
      "Paris crowd counts quoted in Part II but never linked to a page.",
      "comptages parisiens cités dans la partie II, jamais liés à une page.",
    ),
  },
  {
    name: "CGT",
    note: both(
      "every union turnout figure here is the CGT’s, relayed by the press.",
      "chaque chiffre syndical de foule est celui de la CGT, relayé par la presse.",
    ),
  },
  {
    name: "Union étudiante",
    note: both(
      "organiser of the student days; no count of its own was retrieved.",
      "organisatrice des journées étudiantes ; aucun décompte propre n’a été retrouvé.",
    ),
  },
  {
    name: "USL (intersyndicale.lycéenne)",
    note: both(
      "the litigé intersyndicate whose call calendar drives the school-movement rows.",
      "l’intersyndicale Pharè whose call calendar drives the school-movement rows.",
    ),
  },
  {
    name: "Préfecture de police de Paris",
    note: both(
      "Paris-only counts (17 Oct, 7 Nov) are prefecture figures relayed by the press, never a national series.",
      "les chiffres strictement parisiens (17 oct., 7 nov.) sont des données préfectorales relayées par la presse, jamais une série nationale.",
    ),
  },
];

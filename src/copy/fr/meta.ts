import type { LocaleMeta } from "../types";

export const FR_META: LocaleMeta = {
  tag: "fr-FR",
  label: "Français",
  meta: {
    htmlLang: "fr",
    title: "L’activité contestataire en France — septembre–novembre 2026",
    description:
      "Foules, interpellations, blessés et dommages du mouvement de l’automne 2026, comparés à six mouvements français antérieurs.",
  },
  sections: {
    a: {
      title: "A · Décomptes quotidiens, 15 septembre – 11 novembre 2026",
      blurb:
        "Un marqueur par jour où un chiffre a été publié. Les jours sans chiffre restent vides plutôt qu’interpolés ; les lacunes d’une courbe sont en pointillés. La courbe des blocages de lycées est en pointillés pendant les vacances de la Toussaint, aucun lycée n’étant en cours. La série des personnes en grève est dérivée de taux de participation : aucune autorité n’a publié de décompte national des grévistes.",
    },
    b: {
      title: "B · Agrégats hebdomadaires",
      blurb:
        "Les semaines vont du lundi au dimanche. Une foule de jour de pointe et un total hebdomadaire d’interpellations ne sont pas la même statistique — l’infobulle précise laquelle. Le chiffre hebdomadaire des blocages est une pointe, jamais une somme : un même lycée est bloqué plusieurs jours de suite. Les personnes en grève sont un niveau, non un flux : le chiffre hebdomadaire en est la pointe de la semaine, jamais une somme.",
    },
    c: {
      title: "C · Un panneau par mouvement",
      blurb:
        "Chaque panneau conserve sa propre durée sur un axe logarithmique commun : les formes sont comparables, les durées non. L’infobulle compare en outre chaque point à sa propre série — en pourcentage du chiffre le plus élevé du panneau, de la moyenne, de la médiane et du premier chiffre publié. Ce dernier peut atteindre des milliers de pour cent lorsqu’un mouvement a commencé avec une poignée de personnes, et c’est précisément pourquoi les trois autres sont donnés d’abord.",
      note: "Les marqueurs creux sont des chiffres régionaux, parisiens, modélisés ou des stocks. Les liaisons en pointillés traversent une semaine sans publication.",
    },
    d: {
      title: "D · Transposé : un panneau par série",
      blurb:
        "Les mêmes données avec les mouvements superposés, pour lire une même mesure de 1968 à 2026. L’axe des x est le nombre de semaines écoulées, arrêté à la dernière semaine de chiffres de maintien de l’ordre. Les comparaisons de l’infobulle fonctionnent comme en section C, mais sont calculées sur les seules semaines tracées dans le panneau survolé.",
      note: "Survolez une mesure ou un mouvement pour l’isoler. L’ordre des panneaux suit celui de la légende.",
    },
    e: {
      title: "E · Médiane et pointe",
      blurb:
        "Chaque panneau rassemble une mesure pour les mouvements qui l’ont publiée. Le point est la médiane de la série — la semaine typique — et le triangle sa pointe, le plus grand chiffre publié. La barre claire derrière chaque paire couvre toute la série, de son plus petit chiffre à son plus grand : un mouvement régulier se lit donc comme une barre courte, un mouvement ayant connu quelques semaines énormes comme une barre longue. L’axe est logarithmique, de sorte que quelques marches de masse et une semaine ordinaire peuvent partager un panneau.",
      note: "Chaque chiffre est compté une fois, au milieu de sa fourchette lorsqu’une fourchette a été publiée. Le nombre de chiffres publiés figure dans l’infobulle : avec un seul chiffre, la médiane et la pointe sont le même nombre.",
    },
  },
  groups: {
    ongoing: {
      title: "La révolte en cours",
      blurb:
        "Les deux sections portent sur le mouvement de l’automne 2026. A trace chaque chiffre quotidien publié ; B agrège ces mêmes chiffres par semaine, de sorte qu’une foule de jour de pointe et un total d’interpellations ne partagent jamais un axe.",
    },
    historical: {
      title: "Comparaisons historiques",
      blurb:
        "Les mêmes mesures rapportées à six mouvements français antérieurs : 1968, 1986, 1995, 2006, 2010 et 2016. C garde un panneau par mouvement ; D un panneau par série.",
    },
  },
};

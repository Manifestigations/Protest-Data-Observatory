import { current } from "./state";

export interface A11yCopy {
  about: string;
  chart: string;
  chartRole: string;
  chartHint: string;
  tableCaption: string;
  dateHeader: string;
  weekHeader: string;
  switched: string;
}

const A11Y: Record<"fr" | "en", A11yCopy> = {
  en: {
    about: "Notes on this project",
    chart: "Chart",
    chartRole: "chart",
    chartHint:
      "Interactive chart. Use the left and right arrow keys to step through data points, Home and End for the ends, Escape to clear. A table of the same data follows the chart.",
    tableCaption: "Data for “{title}”",
    dateHeader: "Date",
    weekHeader: "Week",
    switched: "Page language: {lang}. Charts redrawn.",
  },
  fr: {
    about: "Notes sur ce projet",
    chart: "Graphique",
    chartRole: "graphique",
    chartHint:
      "Graphique interactif. Utilisez les flèches gauche et droite pour parcourir les points, Début et Fin pour les extrémités, Échap pour quitter. Un tableau des mêmes données suit le graphique.",
    tableCaption: "Données de « {title} »",
    dateHeader: "Date",
    weekHeader: "Semaine",
    switched: "Langue de la page : {lang}. Graphiques redessinés.",
  },
};

export const a11y = (): A11yCopy => A11Y[current];

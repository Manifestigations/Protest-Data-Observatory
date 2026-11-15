import type { HeliCopy } from "../types";

export const HELI_COPY_FR: HeliCopy = {
  heading: "Comment le modèle de coût du maintien de l'ordre est construit",
  intro:
    "Aucun ministère français ne publie ce que coûte une journée de manifestation. Les chiffres présentés ici sont reconstitués à partir de coûts unitaires publiés et d'effectifs déployés publiés. À lire comme un ordre de grandeur, pas comme une facture.",
  steps: [
    {
      title: "Déploiement au sol : coût unitaire × effectifs engagés",
      body: "L'unité de compte est la compagnie de CRS, une centaine de fonctionnaires. Les références publiées situent une compagnie entre 15 000 et 30 000 euros par jour, une fois comptés la solde, les indemnités, le transport, la restauration et les relèves. Les escadrons de gendarmerie mobile sont valorisés de la même manière, avec une référence publiée de 3,4 millions d'euros pour 3 000 gendarmes.",
    },
    {
      title: "Les effectifs viennent des préfectures",
      body: "Une journée disposant d'un effectif publié reçoit une valeur : effectif divisé par cent, multiplié par la fourchette de coût unitaire. Les journées sans chiffre restent vides plutôt que d'être interpolées, d'où l'aspect irrégulier de la série quotidienne. La courbe cumulée reporte la dernière valeur connue : c'est un plancher.",
    },
    {
      title:
        "La surveillance aérienne est une composante distincte, valorisée à l'heure de vol",
      body: "Les hélicoptères sont facturés en heures de vol multipliées par un tarif horaire, et c'est ainsi qu'ils sont modélisés. La Police nationale ne possède aucun hélicoptère : elle rembourse la gendarmerie ou la Sécurité civile sur un tarif de réquisition d'environ 1 412 euros par heure. Les heures viennent des traces ADS-B, qui donnent les temps de vol exacts des appareils qui émettent, principalement les H145 de la Sécurité civile, croisées avec les rapports de presse et des préfectures sur les villes couvertes. La borne basse ne compte que les appareils confirmés par une trace ou un rapport, la borne haute suppose un appareil par ville signalée. Les trajets de repositionnement et les missions de secours sont retirés.",
    },
    {
      title: "Trois tarifs, trois réponses",
      body: "1 412 euros par heure reproduit le précédent de 2019, quand la gendarmerie avait volé 717 heures pendant les Gilets jaunes pour environ un million d'euros. Un chiffre d'audit de 1 800 euros par heure borne la fourchette en service. Une estimation sénatoriale allant jusqu'à 7 000 euros par heure, en coût complet pour la flotte H145-D3 et H160, valorise le même temps de vol plusieurs fois plus haut. Le graphique retient la fourchette en service ; le coût complet est une sensibilité.",
    },
    {
      title: "Pourquoi la composante aérienne déplace à peine la courbe",
      body: "La composante aérienne représente une fraction de million d'euros les jours où elle existe, contre une courbe au sol de 12 à 44 millions. Elle est intégrée au modèle et visible dans les totaux ci-dessous, mais à cette échelle elle est indécelable sur la courbe. C'est le résultat, pas un défaut : le vol de surveillance pèse peu face à l'armée immobilisée d'une journée de manifestation.",
    },
    {
      title: "Ce que le modèle laisse de côté",
      body: "Les arrêts maladie consécutifs à des blessures, pour les policiers, les manifestants et les passants. Les heures supplémentaires reportées sur les mois suivants. Les dommages aux biens publics, suivis séparément. Les heures de drones, peu coûteuses à l'heure mais publiées sous aucune forme exploitable. Les suites judiciaires, la rétention, les enquêtes. Le coût matériel de l'appareil de surveillance. Chacun pousse le chiffre réel vers le haut.",
    },
  ],
  summary: (v) =>
    `${v.days} journées de vols de surveillance recensées, ${v.hLo} à ${v.hHi} heures de vol : ${v.cLo} à ${v.cHi} au tarif en service, ${v.aLo} à ${v.aHi} en coût complet. Seule la part de ces heures tombant un jour disposant d'un effectif publié est intégrée à la courbe ; le reste est indiqué ici et exclu du graphique.`,
  caveat:
    "La composante aérienne est la partie la moins solide du modèle : les EC135 et AS350 de la gendarmerie n'émettent pas en ADS-B, l'essentiel de leurs vols échappe aux traceurs et les heures sont déduites de rapports plutôt que mesurées. À lire comme une borne basse à erreur large.",
  basis: {
    clashes: "affrontements et pillages, appareils sur plusieurs villes",
    nightPatrol: "patrouille nocturne des périmètres interdits à Paris",
    saturday: "mobilisation du samedi, appareils sur les plus grandes villes",
    intersyndical:
      "journée interprofessionnelle, sommations diffusées depuis les airs",
    ongoing: "surveillance quotidienne continue",
  },
};

import {
  BLOG,
  BUNKER,
  HELICOPTER,
  PAGES,
  REPO,
  RN_VOTE,
  STRATEGY,
} from "./links";
import type { About } from "./model";
import { QUOTE } from "./quote";

export const ABOUT_FR: About = [
  {
    id: "analysis",
    title: "Mon analyse",
    blocks: [
      {
        kind: "p",
        runs: [
          "La section A montre assez crûment la dynamique initiale du mouvement : les blocages de lycées se sont rapidement propagés dans tout le pays (et dans ses territoires d’outre-mer), et la police y a répondu de manière extrêmement disproportionnée fin septembre. Cela aide à comprendre ",
          { em: "pourquoi" },
          " les gens étaient si en colère et pourquoi, lorsque la police a perdu le contrôle le 17 octobre, les dégâts ont été aussi considérables.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Pour tenter de reprendre la main, l’État a répondu par le droit : Macron et ses préfets ont cherché à interdire les manifestations et à instaurer des couvre-feux pour les jeunes. Ces mesures ont été rejetées avec éclat semaine après semaine, car — pendant les vacances scolaires, donc en pause des blocages de lycées — des foules immenses ont continué à descendre dans la rue en dépit de ces arrêtés.",
        ],
      },
      {
        kind: "p",
        runs: [
          "À regarder les données depuis le 17 octobre, les choses semblent s’être installées dans une routine inconfortable : les syndicats annoncent des parcours ; les préfets les interdisent ou proposent des itinéraires ridicules ; les syndicats déposent des recours en urgence qui sont invariablement rejetés ; les syndicats les plus tièdes acceptent les parcours de substitution ; les plus combatifs rejoignent les Gilets jaunes, les étudiants, etc. dans des manifestations sauvages et provocatrices ; les flics attendent que la plupart des gens partent ; puis ils engagent des batailles rangées avec les derniers jusqu’au soir. Mais soit les chiffres récents d’interpellations et de blessés sont actuellement sous-estimés, soit il y a eu une baisse régulière depuis le 17 octobre.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Je pense cependant que la police a peut-être décidé d’essayer le renseignement plutôt que la violence, pour changer. Elle semble recourir beaucoup plus souvent à l’encerclement (le « kettling ») : entourer et gazer les manifestants, puis ne les laisser sortir qu’en photographiant leur carte d’identité et en leur infligeant une amende pour participation à une manifestation interdite. Les amendes forfaitaires sont de 135 EUR, mais je soupçonne que l’objectif principal soit les pièces d’identité, pour la collecte de renseignements et les poursuites à venir. De même, à Brest, la police ",
          {
            link: "a saisi les trombinoscopes de plusieurs lycées",
            href: BLOG,
          },
          ", pour des raisons encore floues. Il faut rappeler qu’en France, l’État n’a pas le droit d’enregistrer des données ethniques, ni les employeurs de tenir des listes de salariés grévistes, en raison de l’expérience de la Seconde Guerre mondiale, où les gouvernements collaborateurs français et l’occupant allemand ont utilisé ces listes pour arrêter leurs ennemis en vue de leur déportation et pire. La crainte au fond de chacun est que la France ait de nouveau un gouvernement d’extrême droite en avril prochain, que ",
          {
            link: "près de deux tiers des policiers soutiennent ouvertement",
            href: RN_VOTE,
          },
          ", et alors où pourraient aboutir ces listes ?",
        ],
      },
      {
        kind: "p",
        runs: [
          "Pour les comparaisons historiques (même si les données y sont moins fiables ; voir la section ci-dessous), les mobilisations contre la réforme des retraites sont intéressantes : apparemment le seul cas où les protestations duraient déjà depuis un certain temps avant que la répression policière ne commence. La comparaison la plus évidente est avec les Gilets jaunes (d’autant que le mouvement actuel a adopté la même structure en « actes »), qui ont réussi à prolonger pendant bien plus d’un an une participation hebdomadaire en baisse constante (et ont un moment conduit Macron à ",
          {
            link: "envisager de s’enfuir en hélicoptère",
            href: HELICOPTER,
          },
          "), mais il est difficile de dire ce que cela a permis d’obtenir.",
        ],
      },
      {
        kind: "p",
        runs: [
          "La grande question qui se pose au mouvement est : ",
          { link: "que faire maintenant", href: STRATEGY },
          " ? Il a résisté à une violence policière gratuite, à une diabolisation médiatique sans vergogne et à une nuit particulièrement chaotique qui aurait pu lui faire perdre le soutien du public (mais cela ne semble pas s’être produit). À mon sens (et je suis sûr que beaucoup d’autres ont les mêmes conversations), il faut définir ce que l’on veut et élaborer une théorie du changement. Par exemple, le gouvernement a déjà fait quelques petites concessions aux revendications initiales des étudiants sur le financement de l’éducation, mais le mouvement a désormais absorbé toutes sortes d’autres griefs, du coût de la vie à la peur du militarisme, en passant par l’aversion personnelle pour le style de gouvernance paternaliste et autoritaire de Macron, jusqu’à la crainte d’un gouvernement RN.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Veut-il influencer les élites ? Veut-il peser sur les élections de l’an prochain ? L’élection présidentielle a lieu en avril, mais le vainqueur pourrait bien convoquer des législatives anticipées juste après. Dans ce cas, faudrait-il travailler à produire quelque chose comme la Liste étudiante en Serbie ?",
        ],
      },
      {
        kind: "p",
        runs: [
          "Veut-il infliger une douleur économique à l’État pour le contraindre à céder ? Les données ci-dessous suggèrent que nous approchons peut-être d’un point d’inflexion où le coût du maintien de l’ordre dépasse même l’estimation la plus haute des dommages causés le 17 octobre. Mais comme les Gilets jaunes le savent bien, cette approche favorise de nombreux groupes dispersés et plus petits, agissant contre des cibles intelligemment choisies (centres commerciaux, plateformes logistiques, etc.), et pas seulement le saccage de vitrines au hasard.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Quelles sont ces revendications ? Seulement les revendications étudiantes initiales ? Ou tout le programme : abrogation des réformes des retraites, refinancement de tous les secteurs, démilitarisation de la police, justice pour la Palestine, etc. ?",
        ],
      },
      {
        kind: "p",
        runs: [
          "Veut-il renverser le gouvernement par la force ? Cela s’est déjà produit — la fin de la IVe République est venue de la tentative de coup d’État de militaires français et de colons en Algérie. Certes, le gouvernement semble ",
          { link: "prendre la possibilité au sérieux", href: BUNKER },
          ". Mais même si les manifestants parvenaient à faire fuir Macron, on ne voit pas bien comment cette victoire symbolique se traduirait en prise de pouvoir concrète.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Pour l’instant, je pense qu’un essoufflement complet est peu probable. Le scénario le plus probable est que cela continue un certain temps, avec une participation en baisse lente et quelques petites concessions obtenues çà et là. L’engagement de la plupart des gens se limitera à une marche thérapeutique, mais les personnes politisées ici développeront de nouvelles associations et joueront un rôle déterminant dans les mouvements à venir, comme les anciens Gilets jaunes l’ont fait ici, et les soixante-huitards avant eux.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Mais peut-être, juste peut-être, la menace d’un gouvernement fasciste à venir et le souvenir de tant de résultats décevants par le passé serviront-ils à concentrer les esprits et à durcir les cœurs à temps pour exploiter leur avantage actuel et obtenir des victoires durables et significatives. Et de même que la simple ",
          { em: "résistance" },
          " en France s’est déjà propagée comme une traînée de poudre à travers l’Europe, une véritable victoire en France pourrait bien être ce qui déclenche un incendie embrasant le vieux monde et inaugurant le nouveau.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Je vous laisse avec cette citation (très largement paraphrasée) d’un film classique, que j’ai regardé pour la première fois récemment :",
        ],
      },
      QUOTE,
    ],
  },
  {
    id: "data",
    title: "Problèmes de données",
    blocks: [
      {
        kind: "p",
        runs: [
          "La plus grande difficulté a été de trouver des sources de données fiables. Je veux en particulier souligner quelques problèmes avec les données sur les blessés.",
        ],
      },
      {
        kind: "p",
        runs: [
          "La police est la seule à publier des chiffres officiels, mais elle ne distingue pas les blessures accidentelles et auto-infligées de celles causées par les manifestants, ni la gravité des blessures. Une bonne façon d’enrichir ces données serait peut-être de les comparer aux chiffres des arrêts de travail pour accident, mais je ne sais pas quand ni où ceux-ci pourraient être publiés (et il faudrait probablement les comparer à une base de référence hors soulèvement pour identifier un éventuel excès). À l’inverse, il n’existe aucun chiffre officiel sur les violences subies par les manifestants. Les décès sont évidemment assez faciles à vérifier, mais les causes exactes peuvent être floues. Pour les blessures, les données les plus fiables sont compilées par le Pr Laurent Thines et fournissent le plancher des blessures graves vérifiées. Certains collectifs locaux de street medics publient le nombre de personnes soignées après les grandes manifestations, mais beaucoup de ces cas concernent des choses relativement bénignes du type « sérum physiologique pour rincer le gaz lacrymogène » ; à l’inverse, beaucoup de personnes qui reçoivent du sérum ou une giclée de Maalox pour la même chose ne seront pas comptabilisées ; et le paysage des street medics est très fragmenté, plusieurs groupes opérant souvent sur les mêmes manifestations sans tous publier leurs chiffres ensuite.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Les dommages sont un autre cas délicat, et l’un des plus politisés. Des chiffres très larges sont publiés peu après les faits, mais je soupçonne qu’en attendant un peu, on pourrait déterminer un plancher plus réaliste en examinant les montants réels des déclarations d’assurance (même si cela exclurait peut-être les petits commerces non assurés). Et les estimations des coûts de maintien de l’ordre doivent être prises comme très approximatives : elles sont surtout obtenues en estimant le coût par escadron de CRS déployé, puis en l’extrapolant aux effectifs annoncés. Cela recoupe aussi le problème des données sur les blessés, car nous ne pouvons pas estimer le coût des arrêts de travail qui en découlent (qu’ils concernent des policiers, des manifestants ou des passants).",
        ],
      },
      {
        kind: "p",
        runs: [
          "De toute évidence, tous ces problèmes s’intensifient lorsqu’on remonte à des événements historiques.",
        ],
      },
    ],
  },
  {
    id: "method",
    title: "Comment j’ai fait ceci",
    blocks: [
      {
        kind: "p",
        runs: [
          "Ce projet a commencé comme une expérience personnelle de « vibe-coding » (c’est-à-dire du développement itératif avec un LLM, en essayant de ne pas toucher soi-même au code).",
        ],
      },
      {
        kind: "p",
        runs: [
          "Les graphiques sont rendus avec Chart.js. J’en ai fait à la main par le passé, et c’est assez fastidieux ; pouvoir faire convertir des instructions en langage naturel en syntaxe Chart.js par le LLM est donc assez incroyable.",
        ],
      },
      {
        kind: "p",
        runs: [
          "J’ai utilisé MiniMax M3.1 Flash pour la recherche et DeepSeek V4.1 Flash pour le code — merci la Chine ! Vous pouvez consulter l’intégralité de mes transcriptions de développement ici :",
        ],
      },
      {
        kind: "ul",
        items: [
          [{ link: "développement initial", href: "transcript-1.md" }],
          [{ link: "choix du type de graphique", href: "transcript-2.md" }],
          [
            {
              link: "ajout de comparaisons et de traduction",
              href: "transcript-3.md",
            },
          ],
          [{ link: "revue du code", href: "transcript-4.md" }],
          [{ link: "examen des sources", href: "transcript-5.md" }],
        ],
      },
      {
        kind: "p",
        runs: [
          "Ce projet est hébergé sur ",
          { link: "GitHub Pages", href: PAGES },
          ". Vous pouvez consulter le code ",
          { link: "ici", href: REPO },
          ".",
        ],
      },
      {
        kind: "p",
        runs: [
          "La première version de ce projet m’a pris un peu plus d’une journée d’allers-retours assez intenses.",
        ],
      },
    ],
  },
];

export const SECTION_LABEL_FR = "Notes sur le projet";

/** Green counterweight to the amber disclaimer; the "…" continues its sentence. */
export const CALLOUT_FR =
  "…sauf cette section, qui est écrite à 100 % par un humain ! (en anglais, puis traduite automatiquement)";

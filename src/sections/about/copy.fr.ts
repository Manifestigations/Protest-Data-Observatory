import {
  BARCELONA,
  BLOG,
  BROKEN_WINDOW,
  BUNKER,
  CHOKEHOLD,
  COUNTER_REVOLUTION,
  DUAL_POWER,
  ELSEWHERE,
  HELICOPTER,
  LEAKED,
  MAO,
  PAGES,
  PILEUP,
  REPO,
  RN_VOTE,
  STRATEGY,
  TRAINING,
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
          "Le graphique des manifestations, des interpellations et des blessés expose assez crûment la dynamique initiale du mouvement : les blocages de lycées se sont rapidement propagés dans tout le pays (et dans ses territoires d’outre-mer), et la police y a répondu de manière extrêmement disproportionnée fin septembre. Cela aide à comprendre ",
          { em: "pourquoi" },
          " les gens étaient si en colère et pourquoi, lorsque la police a perdu le contrôle le 17 octobre, les dégâts ont été aussi considérables (encore que les chiffres exacts soient très difficiles à établir).",
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
          "À regarder les données depuis le 17 octobre, les choses semblent s’être installées dans une routine inconfortable : les syndicats annoncent des parcours ; les préfets les interdisent ou proposent des itinéraires ridicules ; les syndicats déposent des recours en urgence qui sont invariablement rejetés ; les syndicats les plus tièdes acceptent les parcours de substitution ; les plus combatifs rejoignent les Gilets jaunes, les étudiants, etc. dans des manifestations sauvages et provocatrices ; les flics attendent que la plupart des gens partent ; puis ils engagent des batailles rangées avec les derniers jusqu’au soir. Mais soit les chiffres récents d’interpellations et de blessés sont actuellement sous-estimés, soit il y a eu une baisse régulière des deux depuis le 17 octobre, ce qui suggère une certaine désescalade. Pourtant, d’après mon expérience personnelle, c’est trompeur : chaque semaine, la police semble installer des barrières plus nombreuses et plus robustes, sortir de plus en plus de véhicules blindés et faire voler ses hélicoptères de plus en plus bas.",
        ],
      },
      { kind: "h", text: "Le maintien de l’ordre" },
      {
        kind: "p",
        runs: [
          "Je pense cependant que la police a peut-être décidé d’essayer le renseignement plutôt que la violence, pour changer. Elle semble recourir beaucoup plus souvent à l’encerclement (le « kettling ») : entourer et gazer les manifestants, puis ne les laisser sortir qu’en photographiant leur carte d’identité et en leur infligeant une amende pour participation à une manifestation interdite. Les amendes forfaitaires sont de 135 EUR, mais je soupçonne que l’objectif principal soit les pièces d’identité, pour la collecte de renseignements et les poursuites à venir. De même, à Brest, la police ",
          {
            link: "a saisi les trombinoscopes de plusieurs lycées",
            href: BLOG,
          },
          ", pour des raisons encore floues.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Il faut rappeler qu’en France, l’État n’a pas le droit d’enregistrer des données ethniques, ni les employeurs de tenir des listes de salariés grévistes, en raison de l’expérience de la Seconde Guerre mondiale, où les gouvernements collaborateurs français et l’occupant allemand ont utilisé ces listes pour arrêter leurs ennemis en vue de leur déportation et pire. La crainte au fond de chacun est que la France ait de nouveau un gouvernement d’extrême droite en avril prochain, que ",
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
          "Mais en même temps, je ne veux pas leur accorder trop de crédit. ",
          {
            link: "La baisse du niveau de formation des policiers",
            href: TRAINING,
          },
          " et ",
          {
            link: "l’inadéquation de leurs méthodes de maintien de l’ordre",
            href: TRAINING,
          },
          " font l’objet de nombreuses discussions en France ",
          { link: "et ailleurs", href: ELSEWHERE },
          " ces dernières années, mais j’ai vu des erreurs allant de :",
        ],
      },
      {
        kind: "ul",
        items: [
          [
            {
              link: "l’anecdotique, comme des écussons velcro à l’envers",
              href: PILEUP,
            },
          ],
          [
            "au assez grave, comme ",
            {
              link: "provoquer un carambolage sur l’autoroute",
              href: PILEUP,
            },
            " en route pour réprimer une manifestation",
          ],
          [
            "au très grave, comme des policiers antiémeute isolés ou en petits groupes régulièrement séparés et encerclés par les manifestants, et même une fois ",
            {
              link: "pris par surprise et placés (brièvement) dans une clé d’étranglement",
              href: CHOKEHOLD,
            },
          ],
        ],
      },
      {
        kind: "p",
        runs: [
          "S’ils faisaient face à une menace réelle, organisée et violente, je ne parierais pas beaucoup sur leurs chances.",
        ],
      },
      { kind: "h", text: "Le positionnement historique de 2026" },
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
      { kind: "h", text: "Et maintenant ?" },
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
          "Veut-il influencer les élites ? Veut-il se concentrer sur la conquête du pouvoir institutionnel lors des élections de l’an prochain ? L’élection présidentielle a lieu en avril, et sera suivie de législatives. Dans ce cas, faudrait-il s’unir derrière un seul candidat à la présidentielle (quelles que soient les réserves à l’égard du jeu électoral) tout en travaillant à produire quelque chose comme la Liste étudiante en Serbie ?",
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
          "Quelles sont ces revendications ? Seulement les revendications étudiantes initiales ? Ou tout le programme : ",
          { em: "sont" },
          "-elles… ",
        ],
      },
      {
        kind: "p",
        runs: [
          "Ou veut-il susciter un soutien massif, faire descendre les gens par millions dans une grève générale ? Cela suppose de s’attaquer aux raisons pour lesquelles les Français d’aujourd’hui répondent moins facilement à un appel à la grève que les générations précédentes. Cela suppose de mettre de l’argent de côté pour des caisses de grève afin d’aider ceux qui seraient le plus durement touchés financièrement en renonçant à leur revenu. Cela suppose d’identifier les groupes qui, une fois tous les agents des transports publics en grève, peuvent reprendre la gestion collective de ces services vitaux, ",
          { link: "comme à Barcelone il y a un siècle", href: BARCELONA },
          ".",
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
          "Une phrase courante dans la bouche des manifestants est « be water », inspirée de Bruce Lee et du mouvement de Hong Kong. Mais elle fait écho à ",
          { link: "la fameuse maxime de Mao", href: MAO },
          " : « le guérillero doit se mouvoir parmi le peuple comme un poisson dans l’eau ». Il y a un temps pour la masse, et pour emporter les barricades par le seul nombre — les Français célèbrent un tel exemple comme leur fête nationale. Mais il y a aussi un temps pour les tactiques de commando, et pour faire passer ces lignes dans l’invisibilité et la ruse afin de frapper à l’arrière de l’ennemi.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Personnellement, je pense que les deux approches sont nécessaires, mais qu’aucune ne suffit seule. Et, pour l’instant, je ne vois pas la seconde bien représentée dans le mouvement actuel. Quand ils érigent des barrières la veille d’une manifestation, où sont les réseaux de réponse rapide capables de réunir assez de monde dans un délai très court pour bloquer physiquement les travaux, le temps que les avocats obtiennent le blocage par voie juridique ?",
        ],
      },
      {
        kind: "p",
        runs: [
          "Ces débats, et bien d’autres, se jouent actuellement dans la vertigineuse constellation d’assemblées générales apparues au cours du dernier mois. Il y a ",
          {
            link: "une volonté claire de construire un double pouvoir",
            href: DUAL_POWER,
          },
          ". Mais jusqu’où ira-t-elle ?",
        ],
      },
      { kind: "h", text: "Prédire l’avenir" },
      {
        kind: "p",
        runs: [
          "Pour l’instant, je pense qu’un essoufflement complet est peu probable. Le scénario le plus probable est que cela continue un certain temps, avec une participation en baisse lente et quelques petites concessions obtenues çà et là. L’engagement de la plupart des gens se limitera à une marche thérapeutique, mais les personnes politisées ici développeront de nouvelles associations et joueront un rôle déterminant dans les mouvements à venir, comme les anciens Gilets jaunes l’ont fait ici, et les soixante-huitards avant eux. Les choses resteront en léthargie pendant les mois froids et humides, avant de sortir de leur hibernation hivernale à temps pour les élections de l’an prochain.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Mais peut-être, juste peut-être, la menace d’un gouvernement fasciste à venir et le souvenir de tant de résultats décevants par le passé serviront-ils à concentrer les esprits et à durcir les cœurs à temps pour exploiter leur avantage actuel et obtenir des victoires durables et significatives. Et de même que la simple ",
          { em: "résistance" },
          " en France s’est déjà propagée comme une traînée de poudre à travers l’Europe, une victoire définitive en France pourrait bien être ce qui déclenche un incendie embrasant le vieux monde et inaugurant le nouveau. Nous assistons peut-être enfin à la fin des ",
          {
            link: "cinquante dernières années de contre-révolution",
            href: COUNTER_REVOLUTION,
          },
          ", si ce mouvement (et d’autres) parvient vraiment à reprendre la flamme de 68 ; de la révolution de Rojava ; de la promesse initiale des printemps arabes ; et de trop d’autres exemples pour les énumérer ici.",
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
          "Produire cet outil a nécessité de vastes recherches dans un large éventail de jeux de données hétérogènes. Il a été difficile de trouver des données pour beaucoup de choses ; plus difficile encore de trouver des données fiables ; et plus difficile encore de tirer des conclusions de données qui traitent du même sujet de manières légèrement différentes.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Pour l’instant, toutes les recherches ont été effectuées avec l’aide d’un LLM (puis soumises à plusieurs cycles de validation assistée par LLM), mais elles n’ont pas été vérifiées manuellement ; je n’en ai tout simplement pas le temps. J’ai toutefois conçu l’outil de manière à séparer autant que possible les données du code qui produit les visualisations. J’espère pouvoir faire appel au crowdsourcing pour la vérification, ainsi que pour l’ajout continu de nouvelles données et de corrections aux données existantes, afin que les visualisations s’améliorent avec le temps.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Mais je voudrais souligner certains des problèmes que j’ai rencontrés avec les données, et je doute qu’aucune quantité de saisie et de vérification participatives puisse vraiment y remédier.",
        ],
      },
      { kind: "h", text: "Les blessures" },
      {
        kind: "p",
        runs: [
          "La police est la seule à publier des chiffres officiels, mais elle ne distingue pas les blessures accidentelles et auto-infligées de celles causées par les manifestants, ni la gravité des blessures. D’après ",
          { link: "un rapport interne divulgué", href: LEAKED },
          ", nous savons que 5 % seulement des chiffres qu’elle diffuse dans la presse pourraient correspondre à quelque chose de réellement grave. Une bonne façon d’enrichir ces données serait peut-être de les comparer aux chiffres des arrêts de travail pour accident, mais je ne sais pas quand ni où ceux-ci pourraient être publiés (et il faudrait probablement les comparer à une base de référence hors soulèvement pour identifier un éventuel excès).",
        ],
      },
      {
        kind: "p",
        runs: [
          "À l’inverse, il n’existe aucun chiffre officiel sur les violences subies par les manifestants. Les décès sont évidemment assez faciles à vérifier, mais les causes exactes peuvent être floues. Pour les blessures, les données les plus fiables sont compilées par le Pr Laurent Thines et fournissent le plancher des blessures graves vérifiées. Certains collectifs locaux de street medics publient le nombre de personnes soignées après les grandes manifestations, mais beaucoup de ces cas concernent des choses relativement bénignes du type « sérum physiologique pour rincer le gaz lacrymogène » ; à l’inverse, beaucoup de personnes qui reçoivent du sérum ou une giclée de Maalox pour la même chose ne seront pas comptabilisées ; et le paysage des street medics est très fragmenté, plusieurs groupes opérant souvent sur les mêmes manifestations sans tous publier leurs chiffres ensuite. Ceux qui le font ne le font parfois que dans un format peu accessible, comme une story Instagram, ce qui limite encore leur visibilité.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Et, des deux côtés, il n’existe pas de vocabulaire commun — les deux camps emploient des termes vagues comme blessure « grave » ou « légère », mais ceux-ci peuvent renvoyer à des seuils très différents. J’ai tenté, ici, de dériver de ce que j’ai un semblant de registre formel de localisation et de gravité des blessures, et j’encourage tout le monde à commencer à publier des bilans détaillés des victimes dans un dépôt central facilement accessible. Le mien, peut-être ?!",
        ],
      },
      { kind: "h", text: "Les coûts" },
      {
        kind: "p",
        runs: [
          "Les dommages sont un autre cas délicat, et l’un des plus politisés. Des chiffres très larges sont publiés peu après les faits, mais je soupçonne qu’en attendant un peu, on pourrait déterminer un plancher plus réaliste en examinant les montants réels des déclarations d’assurance (même si cela exclurait peut-être les petits commerces non assurés, et je ne sais d’ailleurs pas si ces montants sont publics).",
        ],
      },
      {
        kind: "p",
        runs: [
          "Les estimations des coûts de maintien de l’ordre doivent être prises comme très approximatives : elles sont surtout obtenues en estimant le coût par escadron de CRS déployé, auquel s’ajoutent les heures de vol d’hélicoptère estimées, puis en extrapolant aux effectifs annoncés. Cela recoupe aussi le problème des données sur les blessés, car nous ne pouvons pas estimer le coût des arrêts de travail qui en découlent (qu’ils concernent des policiers, des manifestants ou des passants).",
        ],
      },
      {
        kind: "p",
        runs: [
          "Ces coûts de maintien de l’ordre ne tiennent pas compte non plus des ",
          { link: "coûts d’opportunité", href: BROKEN_WINDOW },
          " — chaque euro supplémentaire dépensé en déploiements policiers est un euro qui n’est pas dépensé pour l’éducation ou la santé. Pour les manifestants, en revanche, on peut soutenir que les dommages causés ont un coût d’opportunité ",
          { em: "négatif" },
          " : ils ont saccagé un tas de choses le 17, et peu après, le gouvernement a commencé à proposer d’",
          { em: "augmenter" },
          " les dépenses pour l’éducation. Cela semble fondamentalement impossible à modéliser avec confiance, alors je l’ai laissé de côté.",
        ],
      },
      { kind: "h", text: "Données historiques" },
      {
        kind: "p",
        runs: [
          "De toute évidence, tous ces problèmes s’intensifient lorsqu’on remonte à des événements historiques (avec la réserve que les données historiques sont bien plus stabilisées). Il existe probablement des ouvrages universitaires sur 1968 contenant des ventilations détaillées des chiffres, mais je n’ai pas eu beaucoup de succès en les cherchant avec le LLM. Et remonter aussi loin pose ses propres problèmes : par exemple, la « France entière » n’existait pas à l’époque, et les chiffres de population totale ne concernent donc que ce que nous appelons aujourd’hui la France métropolitaine.",
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
          "J’ai utilisé MiniMax M3.1 Flash pour la recherche et DeepSeek V4.1 Flash pour le code — merci la Chine !",
        ],
      },
      {
        kind: "p",
        runs: [
          "Ce projet est hébergé sur ",
          { link: "Framagit Pages", href: PAGES },
          ". Vous pouvez consulter le code ",
          { link: "ici", href: REPO },
          ".",
        ],
      },
      {
        kind: "p",
        runs: [
          "Le premier lancement de ce projet est le fruit d’environ une semaine d’itérations intenses.",
        ],
      },
    ],
  },
];

export const SECTION_LABEL_FR = "Notes sur le projet";

/** Green counterweight to the amber disclaimer; the "…" continues its sentence. */
export const CALLOUT_FR =
  "…sauf cette section, qui est écrite à 100 % par un humain ! (en anglais, puis traduite automatiquement)";

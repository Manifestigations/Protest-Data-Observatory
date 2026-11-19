import { suffixMap } from "../markers";
import type { ChartCopy } from "../types";

export const CHART_FR: ChartCopy = {
  axisDate: "Date",
  axisWeek: "Semaine",
  edgeMark: "†",
  weekOf: "Semaine du {date}",
  weekOfPartial: "Semaine du {date} (partielle)",
  eurM: "{v} M€",
  suffix: suffixMap("fr"),
  suffixWrap: " · {text}",
  dayNotes: {
    "2026-09-25":
      "Chiffre de la région parisienne uniquement : 21 interpellations à midi, annoncées par la préfecture de police.",
    "2026-09-28":
      "Le mouvement prend une dimension nationale — actions à Marseille, Lille, dans le Rhône, le Var et les Alpes-Maritimes.",
    "2026-09-29":
      "Acte I. Le chiffre de foule compte le cortège de la fonction publique rejoint par les actions lycée, pas une foule étudiante. La série des personnes en grève commence ici : 250 000 agents de la fonction publique d’État, dérivés du taux de 10 % annoncé par le gouvernement.",
    "2026-09-30":
      "Deuxième jour de l’acte I : 625 interpellations et 83 blessés des forces de l’ordre. Le ministère de l’Éducation compte 356 établissements concernés ; aucun décompte de lycées entièrement bloqués n’a été publié ce jour-là.",
    "2026-10-01":
      "Acte II, la pointe de la première semaine. Interpellations et blessés publiés sans chiffre de foule pour la journée.",
    "2026-10-02":
      "735 établissements encore perturbés, et des violences urbaines près de 158 d’entre eux.",
    "2026-10-03":
      "Aucun chiffre de week-end n’a été publié ; les interpellations des 3–4 octobre sont dérivées par soustraction. 735 établissements perturbés — une mesure plus large que les blocages ; le point est signalé comme tel.",
    "2026-10-05":
      "Première journée nationale scolaire après les vacances, avec les stocks ministériels.",
    "2026-10-06":
      "Acte III — première manifestation étudiante nationale de plein exercice.",
    "2026-10-07":
      "Le ministère de l’Intérieur suspend l’usage des grenades de désencerclement pour les mobilisations étudiantes, après qu’un lycéen a été blessé à Lens.",
    "2026-10-09":
      "Le ministère de la Justice publie son premier bilan judiciaire : 6 877 gardes à vue depuis la mi-septembre.",
    "2026-10-13":
      "La fourchette de foule va du simple au triple : plancher ministériel, plafond syndical.",
    "2026-10-16":
      "Dernier jour de cours avant les vacances de la Toussaint : à partir du 17 octobre aucun lycée n’est en cours, le décompte des blocages s’interrompt.",
    "2026-10-17":
      "La journée de pointe. La fourchette de dommages ici est l’estimation IFRAP des 17–18 octobre, non un flux quotidien. Vacances de la Toussaint — établissements fermés. ",
    "2026-10-19":
      "Vacances de la Toussaint — les étudiants soutiennent le mouvement lycéeen depuis l’extérieur des établissements.",
    "2026-10-24":
      "Les interpellations incluent les contrôles préventifs ; toutes ne deviennent pas des gardes à vue. Vacances de la Toussaint — la mobilisation était une journée interprofessionnelle, pas une journée scolaire.",
    "2026-10-31":
      "Aucun chiffre de blessés parmi les manifestants n’a été publié ce jour-là. Vacances de la Toussaint — mobilisation interprofessionnelle.",
    "2026-11-01": "Dernier jour des vacances de la Toussaint.",
    "2026-11-04":
      "Dans le Rhône, sept établissements ont fait cours à distance ; aucun lycée n’est signalé comme bloqué.",
    "2026-11-05":
      "La fourchette de foule va de 575 000 à 1,6 million — la fourchette est la divergence, pas une barre d’erreur. Le point de grève est dérivé des taux gouvernementaux : 9,89–11 % des agents de la fonction publique d’État.",
    "2026-11-06":
      "Dans le Rhône, incidents dans 16 lycées et deux collèges, et un lycée du 8e arrondissement de Lyon bloqué lors de son évacuation.",
    "2026-11-09":
      "Dans le Rhône, aucun lycée n’est bloqué : 14 fonctionnent à distance et 11 sont signalés comme touchés. Un zéro ne peut pas être porté sur un axe logarithmique, il est donc consigné ici et non comme point.",
    "2026-11-10": "Dans le Rhône, une dizaine d’établissements sont touchés.",
  },
  obsNotes: {
    "2026-09-15": {
      blockades:
        "Le lycée Victor-Hugo de Caen — le premier blocus en métropole. Villeneuve-d’Ascq avait été bloqué le 14 septembre et Le Rheu le 7 septembre, avant l’ouverture de la fenêtre.",
    },
    "2026-09-19": {
      blockades:
        "Lycée Saint-Exupéry de Créteil : les élèves soutiennent la grève des enseignants par le premier blocus de l’établissement — l’origine du mouvement national.",
    },
    "2026-09-23": {
      blockades:
        "Île-de-France uniquement : selon le rectorat de Créteil, les blocus s’étendent rapidement à une dizaine de lycées.",
    },
    "2026-09-25": {
      arrests:
        "Région parisienne uniquement — chiffres de la préfecture de police, à midi.",
    },
    "2026-09-28": {
      protesterInjured:
        "Un cas documenté : un garçon de 14 ans touché par un projectile de police. Un plancher, pas un décompte.",
      blockades:
        "Ministère de l’Intérieur : 27 blocages totaux, sur 180 établissements perturbés.",
    },
    "2026-09-29": {
      turnout:
        "Compte le cortège de la fonction publique rejoint par les actions lycée (206 000 ministère / 300 000 CGT), pas une foule étudiante.",
      strikers:
        "Chiffre dérivé, non compté. 10 % des 2 500 000 agents de la fonction publique d’État en grève (chiffre gouvernemental), soit 250 000. L’Éducation en est la principale composante, non un supplément : 11,47 % des personnels de l’Éducation (moyenne pondérée du ministère — 12,74 % dans le second degré, 27,39 % pour la vie scolaire ; 13,71 % des enseignants) représentent 114 700 agents de la même fonction publique d’État, déjà compris dans ces 250 000. Les revendications syndicales (plus de 40 % des personnels du premier degré, plus de 40 % à Lyon et à Créteil) sont régionales et ne servent pas de plafond national.",
      protesterInjured:
        "Élèves et personnels de l’éducation blessés ce jour-là, comptés par le ministère de l’Éducation.",
      blockades:
        "Ministère de l’Éducation au moment de son bilan : 45 lycées bloqués sur 338 concernés. Le Monde recense des actions dans près de 410 établissements.",
    },
    "2026-09-30": {
      protesterInjured:
        "Cumul depuis les premiers blocages — un stock, pas un décompte quotidien.",
      forcesInjuredStock:
        "Cumul des blessés parmi les forces : 83 le 30 septembre, premiers chiffres de blessures du mouvement.",
    },
    "2026-10-01": {
      forcesInjured:
        "Le compte du jour : « quelque 300 » blessés en intervention le jeudi (Nuñez), 305 dans le décompte Beauvau d’Actu Forces. Le cumul de ce jour-là : 383–388.",
      protesterInjured:
        "Niveau cumulé atteint à l’arrêt du 1er octobre (170 élèves + 65 personnels de l’éducation) — un stock, pas un décompte quotidien. Lorsqu’une semaine se termine sur cette cellule, le niveau est le chiffre de la semaine, jamais la somme des flux de la semaine.",
      damagesCost:
        "Une part de l’incrément francilien du 1er au 8 octobre ; l’ancrage de cette série est le 8 octobre.",
      blockades:
        "Borne basse : 222 lycées bloqués (Le Monde en direct, sur 1 027 établissements concernés). Borne haute : les 640 de l’Union étudiante. La police comptait 169 blocages le matin, et 900 actions avec 400 fermetures en fin de journée.",
    },
    "2026-10-02": {
      blockades:
        "« Plus de 400 lycées bloqués » (Le Monde en direct). Le décompte du ministère de l’Intérieur pour le 2 octobre : 1 027 lycées concernés, plus de 560 perturbés, 400 fermés.",
    },
    "2026-10-03": {
      arrests:
        "Dérivé par soustraction : les 6 059 interpellations depuis le 28 septembre (publiés le 5 octobre) moins les chiffres journaliers publiés. Couvre les 3 et 4 octobre ensemble.",
      blockades:
        "Mesure plus large : le ministère de l’Éducation compte 735 établissements perturbés, et non des lycées entièrement bloqués. Le plus haut décompte de blocages de la semaine est de 400+ le 2 octobre.",
    },
    "2026-10-05": {
      arrests:
        "984 interpellations ce jour-là. Le stock ministériel de 6 059 depuis le 28 septembre est ce qui rend vérifiable le chiffre du week-end.",
      blockades:
        "Mesure plus large : 400 à 500 établissements fermés (porte-parole du gouvernement), plus de 400 doivent le rester. Le comptage de mi-matin du ministère est de 413 établissements perturbés.",
      forcesInjuredStock:
        "Cumul depuis le début du mouvement : 715 policiers et gendarmes blessés (Matignon).",
    },
    "2026-10-06": {
      damagesCost:
        "Une part de l’incrément francilien du 1er au 8 octobre ; l’ancrage de cette série est le 8 octobre.",
      blockades:
        "Mesure plus large : 891 établissements sur 3 700 ont eu leurs cours suspendus, totalement ou partiellement, à la mi-journée (ministère). L’USL compte 1 800 lycées « à l’arrêt » — un décompte syndical qui inclut aussi les lycées fermés administrativement.",
    },
    "2026-10-08": {
      damagesCost:
        "Ancrage de l’incrément de dommages francilien du 1er au 8 octobre. Les mêmes 6 M€ sont publiés au 6 octobre et ne sont pas comptés deux fois.",
      strikers:
        "Chiffre dérivé, non compté. Le ministère de l’Éducation publie un taux de participation pondéré de 0,82 % pour les personnels de l’éducation ; aucun taux pour l’ensemble de la fonction publique n’a été publié ce jour-là, le taux de l’éducation tient donc lieu de taux de la fonction publique sur la même base de 2 500 000 agents : 20 500. L’approximation est connue pour sous-estimer — là où les deux existent, l’éducation était à 11,47 % contre environ 10 % pour la fonction publique (29 sept.) et à 12,77 % contre 10,46 % (5 nov.).",
      blockades:
        "Mesure plus large : 224 établissements fermés (ministère) ; plus de 150 encore perturbés (franceinfo). Le chiffre de 224 est celui que le ministère rappellera le 13 octobre.",
      forcesInjuredStock:
        "Cumul : 761 blessés (Nuñez). Les incréments publiés se recoupent — 715 le 5 octobre plus 43 le 6 octobre font 758.",
    },
    "2026-10-09": {
      arrests:
        "Bilan judiciaire du ministère de la Justice, arrêté au 8 oct. 17 h : 6 877 personnes placées en garde à vue depuis le début du mouvement, 86 % de mineurs, 2 376 poursuivies, 21 en détention. Un périmètre différent (depuis la mi-septembre) et une statistique différente (gardes à vue, non interpellations) de la série du ministère de l’Intérieur — non réconciliable avec elle.",
    },
    "2026-10-10": {
      blockades: "« Plus de 40 lycées bloqués » (AFP/Reuters, 10 octobre).",
    },
    "2026-10-12": {
      arrests:
        "13 interpellations rapportées indépendamment par la préfecture du Rhône (27 établissements touchés) et par celle du Bas-Rhin à Strasbourg. Deux préfectures, le même nombre : 13 est donc un plancher pour la journée, pas le total régional du jour. Ce n’est pas Paris.",
      protesterInjured:
        "Île-de-France uniquement : un proviseur, un parent d’élève et un agent de la Région blessés. Comptés comme personnels de l’éducation et des collectivités, sur la même base que le chiffre ministériel du 29 septembre.",
      damagesCost:
        "Normandie — Hervé Morin, Conseil régional de Normandie, à l’assemblée régionale le 12 oct. : « 1,5 million en Normandie » sur « d’ores et déjà 30 millions d’euros » au niveau national. Un stock régional cumulé, pas un flux quotidien, et une composante du stock national — jamais additionné. Le total francilien révisé le même jour était de 8,5 M€.",
      blockades:
        "Préfecture du Rhône uniquement : 19 des 27 établissements touchés étaient des lycées (six universités, deux collèges). L’Île-de-France comptait près de 80 lycées perturbés le même jour.",
    },
    "2026-10-13": {
      blockades:
        "Mesure plus large : 214 établissements fermés, 94,2 % de lycées ouverts — contre 224 le 8 octobre. Le ministère parle d’un mouvement « en recul ».",
      strikers:
        "Chiffre dérivé, non compté. 3,71 % de participation pondérée dans l’éducation (ministère), utilisés comme approximation de la fonction publique sur la base de 2 500 000 agents : 92 750. Taux propres à l’éducation ce jour-là : 4,52 % des enseignants, 10,31 % des personnels de vie scolaire. Le chiffre ministériel exclut Toulouse, La Réunion (vacances depuis le 10 octobre), la Guadeloupe, la Martinique et la Guyane (décalage horaire).",
    },
    "2026-10-14": {
      forcesInjuredStock: "Cumul : 937 blessés (Nuñez).",
    },
    "2026-10-17": {
      protesterInjured:
        "Fourchette dérivée : le plancher est le registre des blessures graves, le plafond est extrapolé à partir des soins dispensés par les street-medics. Aucun décompte officiel n’existe.",
      damagesCost:
        "Estimation modélisée de l’IFRAP pour le week-end des 17–18 octobre ; hors chiffre d’affaires perdu et coûts de maintien de l’ordre. L’estimation parisienne publiée le 18 octobre en est un sous-ensemble, exclue de la somme hebdomadaire.",
      forcesInjured:
        "Dérivé : le cumul ministériel passe de 937 (14 octobre) à 1 144 (17 octobre) ; c’est donc l’incrément de trois jours, pas celui d’une journée.",
      forcesInjuredStock:
        "Pic du cumul : 997 blessés au premier bilan, 1 144 après consolidation, dont 7 graves. C’est le total depuis le début du mouvement, pas le compte du jour.",
    },
    "2026-10-18": {
      arrests:
        "Chiffre de la préfecture de police de Paris uniquement — journée de couvre-feu.",
      damagesCost:
        "Sous-ensemble parisien du total IFRAP des 17–18 octobre — jamais additionné.",
    },
    "2026-10-20": {
      arrests: "Chiffres des préfectures de Guadeloupe uniquement — régional.",
    },
    "2026-10-24": {
      damagesCost:
        "Bilan national de CCI France pour le 17–24 octobre — un surensemble de la cellule du 17 octobre, jamais additionné.",
      forcesInjuredStock:
        "Dérivé : 1 144 (17 octobre) plus 267 blessés ce jour-là font 1 411.",
    },
    "2026-10-31": {
      damagesCost:
        "Estimation locale — aucun chiffre national de dommages n’a été publié.",
      forcesInjuredStock:
        "Dérivé : 1 411 (17 octobre) plus 116–159 blessés le jour même font 1 527–1 570. Un fichier interne des CRS obtenu par Mediapart dénombre 1 233 agents déclarés blessés en octobre, dont 1 167 classés « légèrement » blessés — 94,6 %.",
    },
    "2026-11-02": {
      blockades:
        "Ministère de l’Éducation à 9 h 30 : 41 lycées bloqués, environ 1 % des 3 700 du pays, et aucune perturbation dans les trois quarts des départements.",
    },
    "2026-11-03": {
      blockades:
        "Ministère de l’Éducation : 48 lycées bloqués. L’USL en compte près de 500.",
    },
    "2026-11-05": {
      strikers:
        "Chiffre dérivé, non compté. 9,89 % des agents de la fonction publique d’État à la mi-journée, puis 11 % plus tard, sur 2 500 000 agents : de 247 250 à 275 000 — la fourchette est celle de l’heure du comptage, non une barre d’erreur. Éducation : 12,77 % des personnels (ministère, hors académie de Toulouse) = 127 700, une composante de ce total. Exclus : collectivités territoriales 4,60 % et hôpitaux publics 3,93 % (aucun effectif publié), les 52 % de la SNES-FSU (périmètre plus étroit), et le « près d’1,6 million en grève et dans les manifestations » de la CGT, qui recouvre deux populations et borne déjà la fourchette de foule ci-dessus.",
      protesterInjured: "Publié comme plancher : « au moins ». ",
      blockades:
        "Matignon à 10 h : 81 établissements bloqués (2,2 %). L’USL compte 1 000 lycées « à l’arrêt » — bloqués ou fermés administrativement, donc une borne haute. Le ministère de l’Éducation compte 33 % d’établissements perturbés.",
      forcesInjured: "Le compte du jour : 53 à 18 h, 112 après consolidation.",
      forcesInjuredStock:
        "Cumul final du ministère : 1 580 blessés depuis le début du mouvement. Il se recoupe exactement avec les incréments publiés — 1 144 (17 octobre) + 267 (24 octobre) + 116 (31 octobre) + 53 (5 novembre) = 1 580.",
    },
    "2026-11-09": {
      arrests:
        "Chiffres de préfectures régionales uniquement — Bordeaux, Lyon, Strasbourg.",
    },
    "2026-11-10": {
      strikers:
        "Chiffre dérivé, non compté. 1,55 % de participation pondérée dans l’éducation (ministère), utilisés comme approximation de la fonction publique sur la base de 2 500 000 agents : 38 750. Taux propres à l’éducation : 1,60 % des enseignants, 7,01 % des personnels de vie scolaire. Le chiffre ministériel ne couvre que les académies métropolitaines.",
    },
  },
  actNotes: {
    /* ── extrême droite ─────────────────────────────────────────────── */
    "act-2026-10-24-rouen-01":
      "Des militants identitaires frappent un homme dans le centre de Rouen après la dispersion du cortège, puis repartent en scandant « Rouen nationaliste ». Aucune interpellation sur le moment : les policiers qui traversent le groupe vont contrôler la victime. Le parquet de Rouen a ouvert une enquête pour violences aggravées le 26 octobre, après la diffusion de la vidéo par Blast. « Identitaires » est le mot du procureur, pas le nôtre.",
    "act-2026-10-24-nancy-01":
      "Des individus cagoulés lancent des projectiles sur des manifestants, entonnent La Marseillaise, puis se placent derrière des gendarmes mobiles qui interviennent en direction du cortège. Aucune enquête n'est signalée : le statut reste « allégué ». Le récit repose sur une vidéo publiée par Libération, d'où une attribution journalistique et non judiciaire.",
    "act-2026-10-24-montpellier-01":
      "Le maire dénonce une « milice d'extrême droite » ayant fait usage de la violence contre des manifestants. Le parquet a ouvert le 26 octobre une enquête pour « identifier ces individus » sans annoncer de qualification : la fiche n'en porte donc aucune, une enquête d'identification n'étant pas encore une accusation d'infraction précise.",
    "act-2026-10-24-nice-01":
      "Onze militants présumés d'ultradroite ont été interpellés avant la manifestation, et le parquet de Nice a annoncé qu'ils seraient jugés pour association de malfaiteurs en vue de commettre des violences volontaires aggravées. La qualification porte sur une entente, non sur les blessures : la préfecture a signalé trois blessés légers aux abords du Vieux-Nice sans préciser qui les avait causés.",
    "act-2026-10-24-clermont-ferrand-01":
      "Des individus vêtus de noir investissent la terrasse d'un café, font des saluts nazis, déploient des drapeaux et se photographient devant la gérante. Aucune infraction n'a été publiquement qualifiée et aucune enquête n'est signalée : pas de qualification, statut « allégué ». La fiche existe parce que le fait est documenté ; à retirer si aucune infraction n'est jamais caractérisée.",

    /* ── manifestants ───────────────────────────────────────────────── */
    "act-2026-10-17-limoges-01":
      "Le parquet de Limoges a ouvert une enquête pour tentative d'homicide après qu'un manifestant a été grièvement blessé à la tête. La blessure n'est comptée qu'une fois, au registre des victimes ; cette fiche en est la lecture juridique, non une seconde victime.",
    "act-2026-10-17-marseille-01":
      "Dégradations signalées à Marseille pendant les manifestations du 17 octobre. Aucune qualification, aucune procédure et aucun chiffre n'ont été publiés. La fiche atteste que le fait a été rapporté ; elle ne le compte pas.",
    "act-2026-10-17-lyon-01":
      "Incendie signalé à Lyon le 17 octobre. Aucune qualification ni procédure publiée. La fiche existe pour que l'acte ne disparaisse pas, non pour être additionné à quoi que ce soit.",
    "act-2026-10-17-paris-01":
      "Un trompettiste venu des Vosges est poursuivi pour participation avec arme à une manifestation, après que les policiers ont trouvé sur lui des gants coqués, un masque, une boîte d'allumettes et une clé à molette près de la place de la République. Le parquet a requis six mois ; le tribunal l'a relaxé. Il était aussi poursuivi pour outrage à caractère raciste, consigné dans cette note et non dans une seconde fiche, un acte ne portant qu'une qualification.",

    /* ── audiences ──────────────────────────────────────────────────── */
    "sit-2026-10-19-paris":
      "Six majeurs jugés en comparution immédiate, dont quatre devant la 23e chambre, 1re section. Cinq des six ont terminé la journée en détention, et une affaire a été renvoyée au 22 décembre avec maintien en détention. Le nombre de salles et le rôle n'ont pas été publiés : les six sont des prévenus, non une capacité.",
    "sit-2026-10-20-paris":
      "Quatre salles d'audience, le double de l'ordinaire, plus une cinquième consacrée aux procédures de reconnaissance préalable de culpabilité. Les avocats de la défense ont dénoncé une « répression historique » et accusé la ministre de la justice de vouloir forcer les portes des tribunaux et guider la plume des juges. La contrainte rapportée est arithmétique : les dossiers arrivaient plus vite qu'ils ne pouvaient être jugés, et les procédures risquaient la nullité pour dépassement du délai de comparution d'une personne détenue. La plupart des peines prononcées sont avec sursis, en deçà des réquisitions.",
    "sit-2026-10-20-marseille":
      "Deux salles ont siégé à pleine capacité. Ni le rôle ni les issues n'ont été publiés : la fiche ne retient qu'un nombre de salles.",
    "sit-2026-10-20-lyon":
      "Lyon a siégé le même jour ; aucun chiffre — salles, rôle, issues — n'a été publié. Les champs vides sont le résultat : l'image nationale du 20 octobre est parisienne parce que la presse était à Paris.",

    /* ── forces de l'ordre ──────────────────────────────────────────── */
    "act-2026-09-28-saint-ouen-laumone-01":
      "Grenade de désencerclement tirée à courte distance lors d'une manifestation lycéenne. Le ministère de l'Intérieur a suspendu les grenades de désencerclement pour les mobilisations lycéennes le 7 octobre, neuf jours plus tard — une suspension est une décision administrative, non une décision sur la responsabilité de l'agent.",
    "act-2026-09-30-tours-01":
      "La date est dérivée, non rapportée : la source situe la blessure « deux jours après » le 28 septembre. Seule fiche de cet ensemble à avoir dépassé le stade de l'enquête : l'agent a été mis en examen le 29 octobre.",
    "act-2026-10-05-lens-01":
      "Blessure par grenade dans un lycée à Lens. La suspension des grenades de désencerclement pour les mobilisations lycéennes est intervenue deux jours plus tard, sans qu'une interdiction générale ait été prononcée depuis. La fiche porte sur l'usage, non sur l'arme.",
    "act-2026-10-17-limoges-02":
      "Blessure par grenade à Limoges le 17 octobre, enregistrée séparément de l'affaire pour tentative d'homicide du même jour. Les sources citées ne disent pas si un même projectile a causé les deux blessures : les deux fiches ne forment pas une paire.",
    "act-2026-10-24-toulouse-01":
      "Blessure par grenade à Toulouse le 24 octobre, jour où des groupes d'extrême droite ont affronté des manifestants dans plusieurs villes. La fiche porte sur le projectile policier, non sur ces affrontements, pour lesquels ce jeu de données n'a pas de camp.",
    "act-2026-10-17-paris-02":
      "Passage à tabac filmé en marge de la place de la République, vers 16 h, le 17 octobre. L'enquête de l'IGPN est la seule procédure connue, et aucune unité n'est nommée dans les sources citées.",

    /* ── registre hypothétique ──────────────────────────────────────── */
    "nrm-2026-10-17-paris-orchestra":
      "Gaz lacrymogène tiré pendant le set de l'orchestre, place de la République. Confronté à l'interdiction des attaques indiscriminées : la foule n'était pas un objectif militaire, et aucune méthode de direction n'aurait pu en faire un.",
    "nrm-2026-10-17-paris-gassing":
      "Gazage massif le 17 octobre, jour où un homme de 59 ans est mort après exposition selon le bilan médical. Le test de proportionnalité demande si les dommages civils attendus étaient excessifs au regard de l'avantage militaire escompté — une question qu'aucune juridiction française ne posera, d'où le caractère hypothétique.",
    "nrm-2026-10-05-lens-grenade":
      "Aucun instrument en vigueur n'interdit les grenades de désencerclement. La fiche demande si un usage à courte distance causant des lésions irréversibles violerait la règle interdisant les armes de nature à causer des maux superflus.",
    "nrm-2026-09-30-tours-lbd":
      "Le LBD 40 n'est pas une arme interdite. La question est celle de l'usage : un tir à hauteur de tête est l'un des mécanismes d'éborgnement documentés dans ce mouvement.",
    "nrm-2026-11-08-tear-gas-as-method":
      "Le CS est autorisé pour le maintien de l'ordre intérieur et interdit comme méthode de guerre. Rien ici n'allègue le second : la fiche marque où passerait la frontière.",
  },
  actNoteMissing:
    "Aucune note n'a encore été rédigée pour cette fiche — la fiche existe, sa provenance n'est pas renseignée.",
  deployNotes: {
    "2026-09-28": "dispositif estimé",
    "2026-09-29": "dispositif estimé",
    "2026-09-30": "dispositif estimé",
    "2026-10-01": "dispositif estimé",
    "2026-10-02": "dispositif estimé",
    "2026-10-05": "dispositif estimé",
    "2026-10-06": "dispositif estimé",
    "2026-10-08": "dispositif estimé",
    "2026-10-12": "estimé — Île-de-France, Lyon et Strasbourg",
    "2026-10-13": "dispositif estimé",
    "2026-10-17": "dispositif publié",
    "2026-10-18": "estimé — couvre-feu parisien",
    "2026-10-24": "dispositif publié",
    "2026-10-31": "dispositif publié",
    "2026-11-05": "dispositif publié",
    "2026-11-07": "dispositif publié",
  },
  policingDay: "{head} agents × {low}–{high} € par agent-jour · {note}",
  policingDayPlain: "{head} agents × {low}–{high} € par agent-jour",
  cumulativeAdded: "dispositif compté ce jour — {days} à ce stade",
  cumulativeCarried: "aucun dispositif publié — cumul reporté",
  weekNational: "{n} jour{s} compté{s}",
  weekRegionalOnly: "{n} jour{s}, régional seulement",
  weekPeak: "pointe le {date}",
  weekNoNational: "aucun chiffre national cette semaine",
  weekExcluded: "{n} point{s} exclu(s) (régional ou sous-ensemble)",
  weekFloored: "comprend un plancher — pas une somme",
  weekClipped: "semaine tronquée par la fenêtre",
  weekJoin: " · ",
  tooltipRange: "{label} : {mid} (fourchette {low}–{high})",
  tooltipPoint: "{label} : {value}",
  tooltipNote: "{base}\n{note}",
  footerMark: "ⓘ {note}",
  weekVacation:
    "en partie pendant les vacances de la Toussaint (17 oct. – 1 nov.)",
  holidayLine:
    "Ligne en pointillés : les vacances de la Toussaint, du 17 octobre au 1er novembre 2026. Aucun lycée n’était en cours, aucun ne pouvait être bloqué — le décompte n’existait pas, il n’était pas nul.",
  metricNote:
    "Lycées bloqués ou fermés : les établissements où les élèves ne pouvaient pas suivre normalement. La fourchette va du décompte officiel au décompte syndical, et ce dernier inclut les lycées fermés administrativement.",
  blockerNote:
    "Mesure plus large que les blocages — établissements perturbés, cours suspendus ou fermés — utilisée lorsque c’est le seul chiffre publié ce jour-là.",
  series: {
    protestersDaily: {
      label: "Manifestants",
      detached: "Manifestants (chiffre écarté de la courbe)",
    },
    strikersDaily: {
      label: "Personnes en grève",
      detached: "Personnes en grève (chiffre modélisé)",
    },
    blockadesDaily: {
      label: "Lycées bloqués",
      detached: "Lycées bloqués (décompte régional)",
    },
    arrestsDaily: {
      label: "Interpellations",
      detached: "Interpellations (chiffre écarté)",
    },
    forcesDaily: {
      label: "Blessés — forces de l’ordre",
      detached: "Forces blessées (chiffre écarté)",
    },
    forcesInjuredStock: {
      label: "Forces blessées (cumul)",
      detached: "Forces blessées, cumul (stock)",
    },
    protestersInjuredDaily: {
      label: "Blessés — manifestants",
      detached: "Manifestants blessés (chiffre écarté)",
    },
    damagesDaily: {
      label: "Dommages matériels",
      detached: "Dommages (stock ou chiffre modélisé)",
    },
    policingDaily: {
      label: "Coût du maintien de l’ordre, par jour",
      detached: "Coût par jour (modélisé)",
    },
    policingCumulative: {
      label: "Coût du maintien de l’ordre, cumulé",
      detached: "Coût cumulé (modélisé)",
    },
    protestersWeekly: {
      label: "Manifestants (pointe hebdomadaire)",
      detached: "Manifestants (semaine régionale)",
    },
    strikersWeekly: {
      label: "Personnes en grève (pointe hebdomadaire)",
      detached: "Personnes en grève (chiffre modélisé)",
    },
    blockadesWeekly: {
      label: "Lycées bloqués (pointe hebdomadaire)",
      detached: "Lycées bloqués (semaine régionale)",
    },
    arrestsWeekly: {
      label: "Interpellations (total hebdomadaire)",
      detached: "Interpellations (semaine régionale)",
    },
    forcesWeekly: {
      label: "Forces blessées (total hebdomadaire)",
      detached: "Forces blessées (semaine régionale)",
    },
    protestersInjuredWeekly: {
      label: "Manifestants blessés (total hebdomadaire)",
      detached: "Manifestants blessés (semaine régionale)",
    },
  },
  charts: {
    protestersDaily: {
      title: "Manifestants, personnes en grève et lycées bloqués, par jour",
      subtitle:
        "Foules et personnes en grève sur l’axe de gauche, blocages de lycées sur l’axe de droite. Les personnes en grève sont dérivées de taux de participation publiés — aucune autorité n’a publié de décompte. La ligne en pointillés correspond aux vacances de la Toussaint. Trois des cinq points de grève sont dérivés.",
      y: "Personnes dans la rue ou en grève",
      yRight: "Lycées bloqués ou fermés",
    },
    enforcementDaily: {
      title: "Interpellations et blessés, par jour",
      subtitle:
        "Une interpellation n’est pas une garde à vue ; les blessés sont comptés par camp",
      y: "Personnes",
    },
    cost: {
      title: "Dommages et coût du maintien de l’ordre",
      subtitle: "",
      y: "Millions d’€",
    },
    protestersWeekly: {
      title:
        "Manifestants, personnes en grève et lycées bloqués, pointe hebdomadaire",
      subtitle:
        "Jour de pointe de chaque semaine, non une somme hebdomadaire — un même lycée est bloqué plusieurs jours de suite, et une personne en grève trois jours reste une personne",
      y: "Personnes (jour de pointe)",
      yRight: "Lycées bloqués ou fermés (pointe)",
    },
    enforcementWeekly: {
      title: "Maintien de l’ordre, totaux hebdomadaires",
      subtitle:
        "Sommes hebdomadaires ; un stock ou un plancher ne s’additionne pas",
      y: "Personnes (total hebdomadaire)",
    },
  },
};

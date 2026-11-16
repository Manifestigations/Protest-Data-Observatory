import { both, src } from "./record.ts";
import type { Source } from "./types.ts";

/* 74 entries, split out of sources.ts. Order and the
 * comments annotating each entry are preserved verbatim; the render layer sorts
 * by publication date and never depends on this order. */
export const PRESS_SOURCES: readonly Source[] = [
  /* 17 Oct 2026 — the injury series for that day. Read as a stack, not a list:
     the ministry figure (forces only) at the bottom, encyclopaedic / militant
     tallies above it, the medical register as the documented floor. */
  src(
    "bfmtv-bilan-17oct",
    "press",
    "BFMTV — « Violences du 17 octobre : le ministère de l’Intérieur recense 2 397 interpellations, 997 policiers et gendarmes blessés dont 7 graves »",
    "https://www.bfmtv.com/police-justice/violences-du-7-octobre-le-ministere-de-l-interieur-recense-2-397-interpellations-997-policiers-et-gendarmes-blesses-dont-7-graves_AD-202610180350.html",
    both(
      "the only consolidated state tally for the day: 2,397 arrests and 997 police and gendarmes injured, 7 seriously. It counts forces only — no protester figure — which is why the protest-injury series has no official anchor.",
      "le seul bilan étatique consolidé de la journée : 2 397 interpellations et 997 policiers et gendarmes blessés, dont 7 graves. Il ne compte que les forces — aucun chiffre de manifestants blessés — d’où l’absence d’ancrage officiel pour la série.",
    ),
    "2026-10-18",
  ),

  src(
    "mediacites-toulouse-17oct",
    "press",
    "Médiacités — « Plus de 130 blessés parmi les manifestants du 17 octobre à Toulouse »",
    "https://www.mediacites.fr/enquete/toulouse/2026/10/23/plus-de-130-blesses-parmi-les-manifestants-du-17-octobre-a-toulouse/",
    both(
      "the single largest city count for the day: 130+ people treated in Toulouse, mostly after police injuries, set against the prefecture’s “a dozen or so” officers hurt and the police’s 70 “bruised”. The treated-per-serious-case ratio that drives the reasoned ceiling comes from here.",
      "le plus gros décompte municipal de la journée : plus de 130 personnes prises en charge à Toulouse, pour la plupart blessées par les forces de l’ordre, face aux « une dizaine » d’effectifs blessés de la préfecture et aux 70 agents « contusionnés » de la police. C’est d’ici que vient le ratio pris-en-charge / cas grave qui fonde le plafond raisonné.",
    ),
    "2026-10-23",
  ),

  src(
    "wikifr-17oct",
    "press",
    "Wikipédia — « Manifestations du 17 octobre 2026 en France »",
    "https://fr.wikipedia.org/wiki/Manifestations_du_17_octobre_2026_en_France",
    both(
      "the per-city préfecture tallies used for the bottom-up sum: Bordeaux 23 injured (15 forces), Clermont-Ferrand 9 (5 forces), Dijon 3, Metz 6 (2 forces), Nancy 23 (2 seriously), Rouen 17, plus Paris 12 and Lyon 4 among the serious cases. Also the running casualty total of the movement as a whole. It is also the day page used to cross-check the arrest and injury counts.",
      "les bilans préfectoraux par ville utilisés pour la somme ascendante : Bordeaux 23 blessés (dont 15 forces), Clermont-Ferrand 9 (5 forces), Dijon 3, Metz 6 (2 forces), Nancy 23 (dont 2 graves), Rouen 17, plus Paris 12 et Lyon 4 parmi les cas graves. Aussi le décompte courant des blessés du mouvement. C’est aussi la page du jour servant à recouper interpellations et blessés.",
    ),
    "2026-11-11",
  ),

  src(
    "wiki-en-17oct-riots",
    "press",
    "Wikipedia — « 17 October riots »",
    "https://en.wikipedia.org/wiki/17_October_riots",
    both(
      "the “400+ civilians” injured figure in the infobox, tagged citation needed — so it is a published high bound, not a sourced one. Its 1,000+ forces figure sits on the same line and is equally uncited, which is why the ministry number is preferred for that series.",
      "le chiffre de « 400+ civils » blessés de l’infobox, marqué « citation needed » : une borne haute publiée, non sourcée. Le « 1 000+ » de forces figure sur la même ligne et n’est pas davantage sourcé, d’où la préférence donnée au chiffre ministériel pour cette série.",
    ),
    "2026-11-11",
  ),

  src(
    "mediaclub-thines",
    "press",
    "Le Club de Mediapart (Jonathan Gensburger) — « Violences d’État »",
    "https://blogs.mediapart.fr/jonathan-gensburger/blog/111126/violences-d-etat",
    both(
      "the full Thines register, stopped 5 Nov: 79 victims — 78 seriously injured plus one death — of whom 55 fall on 17 Oct (54 seriously injured: 5 eyes, 5 cranio-facial, 2 amputations, 42 other serious wounds). Documents the floor; the author states plainly that it is neither an official toll nor a judicial expertise. Two versions of the same blog post circulate under different slugs; the higher figures come from the later one, so the citation is flagged as a blog, not reporting.",
      "le relevé Thines complet, arrêté au 5 nov. : 79 victimes — 78 blessés graves et un décès — dont 55 le 17 oct. (54 blessés graves : 5 yeux, 5 traumatismes cranio-faciaux, 2 amputations, 42 autres blessures graves). Documente le plancher ; l’auteur précise qu’il ne s’agit ni d’un bilan officiel ni d’une expertise judiciaire. Deux versions du même billet circulent sous des slugs différents ; les chiffres hauts viennent de la seconde, d’où le signalement en tant que blog et non reportage.",
    ),
    "2026-11-11",
  ),

  src(
    "mediapart-blesses-17oct",
    "press",
    "Mediapart — « “J’ai cru mourir” : enquête sur les blessés du 17 octobre »",
    "https://www.mediapart.fr/journal/france/231026/j-ai-cru-mourir-enquete-sur-les-blesses-du-17-octobre",
    both(
      "the qualitative case file behind the day’s serious injuries — femoral artery severed by a grenade, dozens gravely hurt while peaceful — with no total, which is the point: even the paper that documented the day most closely declines to give one.",
      "le dossier de cas derrière les blessures graves du jour — artère fémorale sectionnée par une grenade, dizaines de blessés graves alors qu’ils manifestaient pacifiquement — sans total, ce qui est précisément l’intérêt : même le journal qui a le plus documenté la journée s’abstient d’en donner un.",
    ),
    "2026-10-23",
  ),

  src(
    "canard-mauvais-oeil",
    "press",
    "Le Canard enchaîné — « Violences policières : les manifestants ont le mauvais œil »",
    "https://www.lecanardenchaine.fr/police-justice/55381-les-manifestants-ont-le-mauvais-oeil",
    both(
      "the explicit statement that no official figure for serious injuries has ever been published since the movement began, and the method note: Thines built his register from national and local press plus militant blogs, and 127 IGPN referrals are open. It also carries Prof. Laurent Thines’ (CHU de Besançon) press-and-blog register: 79 serious injuries in three weeks — 10 blinded, 9 cranio-facial, 7 amputations, 1 death. The source of the protester-injury floor, and the reason no weekly protester-injury series exists.",
      "la mention explicite qu’aucun chiffre officiel de blessés graves n’a jamais été publié depuis le début du mouvement, et la note de méthode : Thines a bâti son relevé dans la presse nationale, locale et les blogs militants, 127 saisines de l’IGPN étant ouvertes. Elle porte aussi le registre presse et blog du Pr Laurent Thines (CHU de Besançon) : 79 blessés graves en trois semaines — 10 éborgnés, 9 traumatismes crânio-faciaux, 7 amputations, 1 mort. Source du plancher de blessés parmi les manifestants, et raison pour laquelle aucune série hebdomadaire de blessés manifestants n’existe.",
    ),
    "2026-11-10",
  ),

  src(
    "contre-attaque-20oct",
    "press",
    "Contre-Attaque — « Terrorisme d’État : le 17 octobre la police a fait couler le sang »",
    "https://contre-attaque.net/2026/10/20/terrorisme-detat-le-17-octobre-la-police-a-fait-couler-le-sang/",
    both(
      "the earliest case-by-case sweep (Paris, Rennes, Grenoble, Limoges, Caen, Nancy, Marseille) and the phrase “a repression that touched thousands” — the source of the upper part of the band. It gives no total, only an invitation for victims to come forward.",
      "le premier recensement cas par cas (Paris, Rennes, Grenoble, Limoges, Caen, Nancy, Marseille) et la formule d’une répression « qui a touché des milliers de personnes » — d’où vient le haut de la fourchette. Aucun total, seulement un appel à témoins.",
    ),
    "2026-10-20",
  ),

  src(
    "contre-attaque-23oct",
    "press",
    "Contre-Attaque — « 17 Octobre : un carnage policier sans précédent, nouveau recensement de la sauvagerie policière »",
    "https://contre-attaque.net/2026/10/23/17-octobre-un-carnage-policier-sans-precedent-nouveau-recensement-de-la-sauvagerie-policiere/",
    both(
      "“two cardiac arrests, an unprecedented number of mutilations in a few hours, hundreds of serious injuries” — the militant figure that sets the top of the band, and the claim of a second death on the day, which no register corroborates and which the chart therefore does not carry. It is also the militant recount of 17 Oct injuries; the highest bound considered, never plotted alone.",
      "« deux arrêts cardiaques, un nombre de mutilations sans précédent en quelques heures, des centaines de blessés graves » — le chiffre militant qui fixe le haut de la fourchette, et la revendication d’un second mort ce jour-là, que nul relevé ne corrobore et que le graphique ne retient donc pas. C’est aussi le recensement militant des blessés du 17 oct. ; borne la plus haute examinée, jamais tracée seule.",
    ),
    "2026-10-23",
  ),

  src(
    "ici-avignon-17oct",
    "press",
    "ICI — « Manifestation du 17 octobre à Avignon : 21 interpellations, 9 policiers et au moins 5 civils blessés »",
    "https://www.ici.fr/provence-alpes-cote-d-azur/vaucluse-84/avignon/manifestation-du-17-octobre-a-avignon-21-interpellations-9-policiers-et-au-moins-5-civils-blesses-8087735",
    both(
      "Avignon’s préfecture tally, one of the few that separates civilians from forces: 5 civilians hurt for 2,000 demonstrators. Note the publisher revised the officer count downward from 18 to 9 between its first and second version — a reminder that even same-day figures move.",
      "le bilan préfectoral d’Avignon, l’un des rares à séparer civils et forces : 5 civils blessés pour 2 000 manifestants. À noter : le journal a révisé à la baisse le nombre de policiers blessés, de 18 à 9, entre ses deux versions — rappel que même les chiffres du jour bougent.",
    ),
    "2026-10-21",
  ),

  src(
    "ici-strasbourg-17oct",
    "press",
    "ICI — « Mobilisation du 17 octobre : 17 blessés et 27 interpellations à Strasbourg, le bilan s’alourdit »",
    "https://www.ici.fr/grand-est/alsace-cea/mobilisation-du-17-octobre-16-interpellations-a-strasbourg-et-11-blesses-selon-un-premier-bilan-5327220",
    both(
      "Strasbourg’s revision in action: 11 injured and 16 arrests in the first evening bulletin, 17 and 27 the next day, with one man gravely head-injured near the pont du Corbeau. The URL still carries the original figures, which is why the entry cites the updated headline.",
      "la révision strasbourgeoise en acte : 11 blessés et 16 interpellations au premier communiqué du soir, 17 et 27 le lendemain, dont un homme grièvement touché à la tête près du pont du Corbeau. L’URL porte encore les chiffres d’origine, d’où le titre mis à jour.",
    ),
    "2026-10-17",
  ),

  /* ── optional: cross-checks for the severity breakdown and its limits ── */
  src(
    "monde-enquete-blessures",
    "press",
    "Le Monde — « Hands torn off, broken bones, blinded eye: Le Monde investigates French protesters’ injuries »",
    "https://www.lemonde.fr/en/france/article/2026/11/05/hands-torn-off-broken-bones-blinded-eye-le-monde-investigates-french-protesters-injuries_6772405_7.html",
    both(
      "independent corroboration of the register’s shape — three hands torn off, four eyes mutilated — described by Le Monde itself as “a preliminary and certainly underestimated count”, with intermediate-force weapons implicated in nearly every case.",
      "corroboration indépendante de la structure du relevé — trois mains arrachées, quatre yeux mutilés — que Le Monde qualifie lui-même de décompte « préliminaire et certainement sous-estimé », les armes de force intermédiaire étant en cause dans presque tous les cas.",
    ),
    "2026-11-05",
  ),

  src(
    "prodpress-verification",
    "press",
    "PRODPRESS — « Blessés des manifestations : les enquêtes documentent les cas, les bilans restent à consolider »",
    "https://www.prodpress.eu/manifestations-blesses-bilan-coquerel-verification-2026/",
    both(
      "the cautionary counterweight: the same Thines count stood at 61 cases on 30 Oct and 79 on 5 Nov, so any figure is a snapshot; the site declines to validate the extrapolation to a national total, which is why the middle point is labelled an estimate rather than a count. It also states explicitly that injury totals were never consolidated — the method note behind the injury floor. The page publishes no date of its own: no byline, no date metadata, and no archived capture, so none is shown here.",
      "le contrepoids méthodologique : le même relevé Thines affichait 61 cas au 30 oct. et 79 au 5 nov., tout chiffre n’étant donc qu’une photographie ; le site refuse de valider l’extrapolation à un total national, d’où le point milieu présenté comme une estimation, non un décompte. Il constate aussi explicitement que les totaux de blessés n’ont jamais été consolidés — la note de méthode derrière le plancher. La page ne publie aucune date propre : ni signature, ni métadonnée de date, ni capture archivée ; aucune n’est donc affichée ici.",
    ),
  ),

  src(
    "france24-24oct-prov",
    "press",
    "France 24 — « Mobilisation du 24 octobre : plus de 1 300 interpellations, une cinquantaine de policiers blessés »",
    "https://www.france24.com/fr/france/20261025-mobilisation-du-24-octobre-plus-de-1-300-interpellations-une-cinquantaine-de-policiers-bless%C3%A9s",
    both(
      "the press rendering of the provisional 24 Oct bilan: 1,314 arrests and 53 forces injured. Establishes that the 53 is a first-overnight provisional figure, which is why the table keeps the consolidated 267 rather than widening to a 53–267 band.",
      "le compte rendu presse du bilan provisoire du 24 oct. : 1 314 interpellations et 53 blessés des forces. Établit que le 53 est un chiffre provisoire de la nuit, ce qui justifie de conserver le 267 consolidé plutôt qu'ouvrir une bande 53–267.",
    ),
    "2026-10-25",
  ),

  src(
    "franceinfo-24oct-final",
    "press",
    "Franceinfo — « Manifestations du 24 octobre : 267 membres des forces de l’ordre et 150 someplaceants ont été blessés, dont trois gravement, annonce Laurent Nuñez »",
    "https://www.franceinfo.fr/societe/manifestations/manifestations-du-24-octobre-267-membres-des-forces-de-l-ordre-et-150-manifestants-ont-ete-blesses-dont-trois-gravement-annonce-laurent-nunez_8253910.html",
    both(
      "the minister's consolidated 24 Oct figures: 267 forces injured, 150 protesters injured including 3 seriously, 1,435 arrests. Source of the two cells now carried for that date.",
      "les chiffres consolidés du 24 oct. annoncés par le ministre : 257... 267 blessés des forces de l’ordre, 150 manifestants blessés dont 3 graves, 1 435 interpellations. Source des deux cellules portées pour cette date.",
    ),
    "2026-10-26",
  ),

  src(
    "lsa-cci-bilan",
    "press",
    "LSA / CCI France — « Manifestations d’octobre : 1 milliard d’euros de dégâts et 2 500 commerces touchés selon CCI France, les détails ville par ville »",
    "https://www.lsa-conso.fr/distributeurs-alimentaires/manifestations-doctobre-1-milliard-deuros-de-degats-et-2-500-commerces-touches-selon-cci-france-les-details-ville-par-ville.2HTRI7YOSJHP5E52ISPEQEF4KQ.html",
    both(
      "CCI France's 27 Oct tally, the basis of the new national damage cell: 2,488 businesses hit after 17 Oct plus 50 after 24 Oct, 1,161 heavily damaged, 643 still closed, cost of the degradations estimated at over €1bn on IFRAP's estimate. City detail: Marseille 500 (225 heavy), Paris/IDF 480 (240 degraded), Lyon–Saint-Étienne–Roanne 300 (€20M), Bordeaux 158, Rennes 143, Nantes 59, Toulouse 41, Montpellier 56 (€1–2M). No separate Marseille or Paris damage amount. It is also the source of the city-by-city breakdown of the €1bn retail estimate.",
      "le bilan CCI France du 27 oct., base de la nouvelle cellule nationale de dégâts : 2 488 commerces touchés après le 17 oct. plus 50 après le 24 oct., 1 161 fortement dégradés, 643 encore fermés, coût des dégradations estimé à plus d’1 milliard d’euros selon l’IFRAP. Détail par ville : Marseille 500 (225 lourds), Paris/IDF 480 (240 dégradés), Lyon–Saint-Étienne–Roanne 300 (20 M€), Bordeaux 158, Rennes 143, Nantes 59, Toulouse 41, Montpellier 56 (1 à 2 M€). Aucun montant distinct pour Marseille ni Paris. C’est aussi la source de la ventilation par ville de l’estimation de 1 Md€ pour le commerce.",
    ),
    "2026-10-28",
  ),

  src(
    "leprogres-cci-rhone",
    "press",
    "Le Progrès — « Rhône 307 commerces impactés, 20 millions d’euros de dégâts… Les conséquences des manifestations depuis le 17 octobre »",
    "https://www.leprogres.fr/economie/2026/10/27/307-commerces-impactes-20-millions-d-euros-de-degats-les-consequences-des-manifestations-depuis-le-17-octobre",
    both(
      "the regional half of the CCI tally: 307 businesses hit in the Rhône for €20M of damage, corroborating the Lyon–Saint-Étienne–Roanne line independently of CCI France.",
      "la moitié régionale du bilan CCI : 307 commerces impactés dans le Rhône pour 20 M€ de dégâts, corroboration indépendante de la ligne Lyon–Saint-Étienne–Roanne.",
    ),
    "2026-10-27",
  ),

  src(
    "lemonde-en-pensions-23mar",
    "press",
    "Le Monde — « French pension protests: 457 arrested and 441 police injured on Thursday, minister reports »",
    "https://www.lemonde.fr/en/france/article/2023/03/24/french-pension-protests-457-arrested-and-441-police-injured-on-thursday-minister-reports_6020504_7.html",
    both(
      "the consolidated 23 March 2023 enforcement figures — 457 arrests, 441 security forces injured — which close the pensions episode's enforcement gap. Earlier statements that night had put the figures at 80+ arrests and 123 police injured, so the consolidated numbers are the ones plotted.",
      "les chiffres dcited de la répression du 23 mars 2023 — 457 interpellations, 441 blessés des forces — qui comblent le trou de données de répression de l’épisode pensions. Les statements de la soirée donnaient 80+ interpellations et 123 blessés, d’où le choix des chiffres consolidés.",
    ),
    "2023-03-24",
  ),

  src(
    "france24-pensions-23mar",
    "press",
    "France 24 — « At least 457 people arrested, 441 security forces injured in violent French pension protests »",
    "https://www.france24.com/en/europe/20230324-at-least-457-people-arrested-441-security-forces-injured-in-violent-french-pension-protests",
    both(
      "independent confirmation of the 23 March totals, with Darmanin's evening statement of over 80 arrests and 123 police injured noted alongside, which is why the day is plotted at the consolidated figure.",
      "confirmation indépendante des totaux du 23 mars, avec la déclaration de Darmanin en soirée (plus de 80 interpellations, 123 blessés) rappelée en regard — d’où le choix du chiffre consolidé.",
    ),
    "2023-03-24",
  ),

  src(
    "enwiki-pensions-2023",
    "press",
    "Wikipedia — « 2023 French pension reform strikes »",
    "https://en.wikipedia.org/wiki/2023_French_pension_reform_strikes",
    both(
      "the chronology that fixes the pensions episode's weekly bands: 7 Mar 1.1–1.4M over 260+ protests; 11 Mar about 368,000, below the 800,000–1,000,000 expected; 15 Mar ministry 480,000 (37,000 Paris) against CGT 1.78M (450,000 Paris) over 200 protests; 19 Mar only hundreds; 23 Mar ministry 1.08M (119,000 Paris) against CGT 3.5M (800,000 Paris); 6 Apr 111 arrests and 154 police injured. It is also the source that shows 14 March was the eve, not the action day.",
      "la chronologie qui fixe les bandes de l’épisode pensions : 7 mars 1,1–1,4 M sur plus de 260 manifestations ; 11 mars environ 368 000, loin des 800 000 à 1 000 000 attendus ; 15 mars 480 000 ministère (37 000 Paris) contre 1,78 M CGT (450 000 Paris) sur 200 manifestations ; 19 mars quelques centaines ; 23 mars 1,08 M ministère (119 000 Paris) contre 3,5 M CGT (800 000 Paris) ; 6 avril 111 interpellations et 154 policiers blessés. C’est aussi ce qui montre que le 14 mars était la veille, pas le jour d’action.",
    ),
    "2026-10-23",
  ),

  src(
    "enwiki-cpe-2006",
    "press",
    "Wikipedia — « 2006 youth protests in France »",
    "https://en.wikipedia.org/wiki/2006_youth_protests_in_France",
    both(
      "the CPE series that is published at all: 7 Feb 200,000–400,000 over 187 demonstrations; 28 Mar 1.055M (police) against 2.71M (unions) with 600 arrests; 4 Apr 1M (police) against 3.1M (CGT); 18 demonstrators injured on 16 March; and the CAJ totals of 4,500 arrests, 1,950 in garde à vue and 635 prosecutions. It gives no totals for 15 or 25 February, 4 or 11 March — the series does not exist, and the episode should say so. The English summary is also used for the participation estimates that the French page leaves out.",
      "la seule série CPE qui soit publiée : 7 févr. 200 000–400 000 sur 187 manifestations ; 28 mars 1,055 M (police) contre 2,71 M (syndicats) et 600 interpellations ; 4 avr. 1 M (police) contre 3,1 M (CGT) ; 18 blessés le 16 mars ; totaux CAJ : 4 500 interpellations, 1 950 gardes à vue, 635 poursuites. Aucun total pour les 15 ou 25 février, 4 ou 11 mars : la série n’existe pas, et l’épisode doit le dire. La synthèse anglophone est aussi utilisée pour les estimations de participation absentes de la page française.",
    ),
    "2026-05-31",
  ),

  src(
    "frwiki-cpe-2006",
    "press",
    "Wikipédia — « Mouvement contre le contrat première embauche de 2006 »",
    "https://fr.wikipedia.org/wiki/Mouvement_contre_le_contrat_premi%C3%A8re_embauche_de_2006",
    both(
      "the French CPE account: 7 Feb nearly 400,000; 14 March 41,000 (police source); 16 March 447,500 (police) or 500,000–800,000 (organisers); 28 March 1,055,000–3,000,000; 4 April 1–3 million. The 14 March figure is the one addition this pass makes to the episode.",
      "le compte rendu français du CPE : 7 févr. près de 400 000 ; 14 mars 41 000 (source police) ; 16 mars 447 500 (police) ou 500 000 à 800 000 (organisateurs) ; 28 mars 1 055 000 à 3 000 000 ; 4 avril 1 à 3 millions. Le chiffre du 14 mars est le seul ajout de cette passe à l’épisode.",
    ),
    "2026-10-01",
  ),

  src(
    "enwiki-bloquons-tout",
    "press",
    "Wikipedia — « Bloquons tout »",
    "https://en.wikipedia.org/wiki/Bloquons_tout",
    both(
      "the movement's complete action calendar: 10 September (hundreds of actions, ring roads blocked in Bordeaux, Rennes, Nantes, Caen and Paris; participation 200,000–300,000), 18 September (union strikes more important than the movement's own actions; 500,000 to one million followed), and 2 October as the third wave. It mentions no action on 21 September, which closes that supposed gap. It is also the source of the movement's chronology and its 10 Sep / 18 Sep / 2 Oct structure.",
      "le calendrier complet des actions du mouvement : 10 septembre (des centaines d’actions, périphériques bloqués à Bordeaux, Rennes, Nantes, Caen et Paris ; participation de 200 000 à 300 000), 18 septembre (les grèves syndicales plus importantes que les actions du mouvement ; 500 000 à un million de participants) et 2 octobre comme troisième vague. Aucune action au 21 septembre n’y figure, ce qui ferme le faux manque. C’est aussi la source de la chronologie du mouvement et de sa structure des 10 sept., 18 sept. et 2 oct.",
    ),
    "2026-06-25",
  ),

  src(
    "frwiki-nahel-2023",
    "press",
    "Wikipédia — « Émeutes consécutives à la mort de Nahel Merzouk »",
    "https://fr.wikipedia.org/wiki/%C3%89meutes_cons%C3%A9cutives_%C3%A0_la_mort_de_Nahel_Merzouk",
    both(
      "the ministry day table that confirms the episode's weekly sums exactly: arrests 31/207/875/1,311/773/157/72/16/20 = 3,462; police injured 24/174/317/162/42/3/—/—/1 = 723; 5,954 vehicles burnt; 1,092 buildings damaged; 2 deaths. It gives no crowd count for any riot night, and the Place de la République demonstration it mentions was called for 8 July. It also carries the night-by-night breakdown of the four riot nights, which the casualty total does not.",
      "le tableau journalier du ministère qui confirme exactement les sommes hebdomadaires de l’épisode : interpellations 31/207/875/1 311/773/157/72/16/20 = 3 462 ; policiers blessés 24/174/317/162/42/3/—/—/1 = 723 ; 5 954 véhicules incendiés ; 1 092 bâtiments dégradés ; 2 morts. Aucun décompte de foule pour aucune nuit, et la manifestation place de la République qu’il mentionne était prévue pour le 8 juillet. Elle porte aussi la ventilation nuit par nuit des quatre nuits d’émeute, absente du total de victimes.",
    ),
    "2026-10-20",
  ),

  src(
    "frwiki-gj-mouvement",
    "press",
    "Wikipédia — « Mouvement des Gilets jaunes »",
    "https://fr.wikipedia.org/wiki/Mouvement_des_Gilets_jaunes",
    both(
      "the per-act casualty figures behind the revised GJ_EXTRA: Act I 409 injured and 1 death (Libération: 287,710 demonstrators, one death, 409 injured); Act II 24 injured including 5 police with 103 interpellations (Le JDD); Act IV 1,385 interpellations and 974 gardes à vue (Le Figaro live), with ~89,000 agents mobilised. It also carries the Act I–44 ministry turnout series and the Act I–IV custody/interpellation counts; later acts were never published as a series, which is why the enforcement lines stop at week 3.",
      "les chiffres de victimes par acte qui fondent le GJ_EXTRA révisé : acte I 409 blessés et 1 mort (Libération : 287 710 manifestants, un mort, 409 blessés) ; acte II 24 blessés dont 5 policiers et 103 interpellations (Le JDD) ; acte IV 1 385 interpellations et 974 gardes à vue (Le Figaro live), avec environ 89 000 agents mobilisés. Elle porte aussi la série ministérielle de foules des actes I à XLIV et les décomptes de gardes à vue / interpellations des actes I à IV ; les actes suivants n’ont jamais été publiés en série, d’où l’arrêt des courbes répressives à la semaine 3.",
    ),
    "2026-11-06",
  ),

  src(
    "frwiki-gj-deroulement",
    "press",
    "Wikipédia — « Déroulement du mouvement des Gilets jaunes »",
    "https://fr.wikipedia.org/wiki/D%C3%A9roulement_du_mouvement_des_Gilets_jaunes",
    both(
      "the authoritative per-act table: all 33 ministry counts and all seven Le Nombre jaune counts, which confirm GJ_ACTS and GJ_ORGANISER_COUNTS line for line. It also records Act II's first figure of 106,301 revised eight days later to 166,000, and Act I's communiqué of 117 interpellations with 73 gardes à vue and 409 injured. It is also the act-by-act narrative that dates each turnout point.",
      "le tableau par acte de référence : les 33 chiffres du ministère et les sept comptes du Nombre jaune, qui confirment GJ_ACTS et GJ_ORGANISER_COUNTS ligne à ligne. Y figurent aussi le premier chiffre de l’acte II (106 301) révisé huit jours plus tard à 166 000, et le communiqué de l’acte I : 117 interpellations dont 73 gardes à vue, 409 blessés. C’est aussi le récit acte par acte qui date chaque point de foule.",
    ),
    "2026-11-12",
  ),

  src(
    "lemonde-bloquons-10sep",
    "press",
    "Le Monde — « Takeaways from France's ‘Block Everything’ protests: ‘A lot of anger is building up around issues of social injustice’ »",
    "https://www.lemonde.fr/en/politics/article/2025/09/12/takeaways-from-france-s-block-everything-protests-a-lot-of-anger-is-building-up-around-issues-of-social-injustice_6745326_5.html",
    both(
      "the 10 September action count: 812 actions including 550 rallies and 262 blockades, 540 arrests and 415 people held in custody, 175,000 participants on the ministry's count. Explains why the file's “596 rallies / 253 blockages” is a different counting method, not a contradiction.",
      "le décompte des actions du 10 septembre : 812 actions dont 550 manifestations et 262 blocages, 540 interpellations et 415 personnes en garde à vue, 175 000 participants selon le ministère. Explique pourquoi les « 596 actions / 253 blocages » du fichier relèvent d’une autre méthode de comptage et non d’une contradiction.",
    ),
    "2025-09-12",
  ),

  src(
    "rfi-bloquons-10sep",
    "press",
    "RFI — « France: retour sur la journée “Bloquons tout”, qui a rassemblé 200 000 manifestants »",
    "https://www.rfi.fr/fr/france/20250910-en-direct-mouvement-bloquons-tout-des-nombreuses-arrestations-apr%C3%A8s-les-premi%C3%A8res-actions-partout-en-france",
    both(
      "the first-morning estimate for 10 September — 200,000 — which brackets the ministry's revised 175,000–197,000 and the 200,000–300,000 encyclopaedic range and confirms that the episode's band [175,000, 250,000] is defensible.",
      "la première estimation du 10 septembre au matin — 200 000 — qui encadre le chiffre ministériel révisé de 175 000–197 000 et la fourchette encyclopédique de 200 000 à 300 000, et confirme que la bande [175 000, 250 000] de l’épisode est défendable.",
    ),
    "2025-09-10",
  ),

  src(
    "lesechos-18sep",
    "press",
    "Les Échos — « Grève du 18 septembre : retour sur une journée de mobilisation »",
    "https://www.lesechos.fr/economie-france/conjoncture/direct-greve-du-18-septembre-les-fortes-perturbations-se-confirment-2186895",
    both(
      "the 18 September totals: more than 500,000 demonstrators per the Interior Ministry, 55,000 of them in Paris — the authority band already carried for the episode's w1, confirmed here against the union claim of one million.",
      "les totaux du 18 septembre : plus de 500 000chus défileants selon le ministère de l’Intérieur, dont 55 000 à Paris — la bande d’autorité déjà portée au w1 de l’épisode, confirmée ici face à la revendication syndicale d’un million.",
    ),
    "2025-09-18",
  ),

  /* ── 2026 movement: origins and the September–October bilans ────────── */
  src(
    "frwiki-mvt-lyceen-2026",
    "press",
    "Wikipédia — « Mouvement lycée et étudiant de 2026 en France »",
    "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_%C3%A9tudiant_de_2026_en_France",
    both(
      "the dated chronology of the whole movement: the first blockades (Mayotte 31 Aug, Le Rheu 7 Sep, Villeneuve-d'Ascq 14 Sep, Caen 15 Sep), Créteil 18–19 Sep, the 23 and 24–25 Sep extensions, then the national turn on 28 Sep (180 establishments perturbed, 27 blockades, 164 arrests), Act I on 29 Sep (338 establishments affected, 45 blocked, 440 arrests), 30 Sep (356 establishments, 625 arrests, 83 forces injured) and Acte II on 1 Oct (900 actions, 340 in the morning per AFP, 400 closures, 1,949 arrests, 318 injured = 170 students + 65 staff + 83 forces). Also the named damage of 1 Oct at Nantes, Meaux and Rouen. It also covers the 1 Oct – 16 Oct chronology of the school movement, which no ministry series covers.",
      "la chronologie datée de tout le mouvement : les premiers blocages (Mayotte 31 août, Le Rheu 7 sept., Villeneuve-d’Ascq 14 sept., Caen 15 sept.), Créteil 18–19 sept., les extensions des 23 et 24–25 sept., puis le tournant national du 28 sept. (180 établissements perturbés, 27 blocages, 164 interpellations), l’acte I du 29 sept. (338 établissements concernés, 45 bloqués, 440 interpellations), le 30 sept. (356 établissements, 625 interpellations, 83 blessés des forces) et l’acte II du 1er oct. (900 actions, 340 le matin selon l’Afrique, 400 fermetures, 1 949 interpellations, 318 blessés = 170 élèves + 65 personnels + 83 forces). Aussi les dégâts nommés du 1er oct. à Nantes, Meaux et Rouen. Elle couvre aussi la chronologie du 1er au 16 oct. du mouvement liceen, qu’aucune série ministérielle ne couvre.",
    ),
    "2026-11-13",
  ),

  src(
    "lemonde-30sept-625",
    "press",
    "Le Monde — « Blocage des lycées : 625 interpellations mercredi, annonce le ministre de l’Intérieur qui constate une extension du mouvement »",
    "https://www.lemonde.fr/societe/article/2026/09/30/blocage-des-lycees-625-interpellations-mercredi-annonce-le-ministre-de-l-interieur-qui-constate-une-extension-du-mouvement_6786023_3225.html",
    both(
      "30 September: 625 interpellations, actions in Île-de-France, Lyon, Strasbourg and Nice, and the extension of the movement after the 29 Sep national day.",
      "le 30 septembre : 625 interpellations, des actions en Île-de-France, à Lyon, Strasbourg et Nice, et l’extension du mouvement après la journée nationale du 29 sept.",
    ),
    "2026-09-30",
  ),

  src(
    "lefigaro-30sept-625",
    "press",
    "Le Figaro — « Blocages des lycées : 625 interpellations, 83 policiers et gendarmes blessés mercredi, annonce le ministre de l’Intérieur Laurent Nuñez »",
    "https://www.lefigaro.fr/actualite-france/en-direct-blocus-des-lycees-la-colere-ne-justifie-pas-la-violence-cingle-emmanuel-macron-des-tensions-dans-plusieurs-villes-20260930",
    both(
      "the 30 September figures: 625 interpellations, 83 police and gendarmes injured, 356 establishments concerned, and the Education ministry's 119 injured students and staff since the start of the blockades.",
      "les chiffres du 30 septembre : 625 interpellations, 83 policiers et gendarmes blessés, 356 établissements concernés, et les 119 élèves et personnels blessés depuis le début des blocages selon le ministère de l’Éducation.",
    ),
    "2026-10-01",
  ),

  src(
    "lefigaro-1oct-1949",
    "press",
    "Le Figaro — « Blocages des lycées : 1 949 interpellations jeudi, 1 793 gardes à vue depuis lundi, interdiction de manifester autour des établissements fermés vendredi »",
    "https://www.lefigaro.fr/actualite-france/en-direct-blocus-des-lycees-lyceens-et-etudiants-appellent-ce-jeudi-a-un-acte-deux-de-mobilisation-20261001",
    both(
      "the 1 October daily arrest figure of 1,949 — the basis for correcting that cell from a cumulative stock to a daily flow — with 1,793 gardes à vue since Monday and the Wednesday figures of 625 arrests and 83 police injured.",
      "le chiffre d’interpellations du jeudi 1er octobre, 1 949 — base de la correction de cette cellule, de stock cumulatif à flux journalier — avec 1 793 gardes à vue depuis lundi et les chiffres du mercredi, 625 interpellations et 83 blessés.",
    ),
    "2026-10-01",
  ),

  src(
    "lefigaro-2oct-1747",
    "press",
    "Le Figaro — « Blocages des lycées : 1 747 interpellations ce vendredi, plus de 5 000 depuis lundi, annonce Nuñez »",
    "https://www.lefigaro.fr/actualite-france/en-direct-blocus-des-lycees-les-autorites-espere-l-apaisement-apres-les-violences-d-une-extreme-gravite-400-etablissements-fermes-20261002",
    both(
      "2 October: 1,747 arrests that day, more than 5,000 since Monday, 735 establishments perturbed (30% fewer), urban violence near 158 of them, ~300 police and gendarmes injured on Thursday, and 65 education staff injured since the start of the movement including 40 headteachers.",
      "le 2 octobre : 1 747 interpellations, plus de 5 000 depuis lundi, 735 établissements perturbés (−30 %), des violences urbaines près de 158 d’entre eux, ~300 policiers et gendarmes blessés le jeudi, et 65 personnels de l’Éducation blessés depuis le début du mouvement dont 40 proviseurs.",
    ),
    "2026-10-02",
  ),

  src(
    "lefigaro-5oct-6059",
    "press",
    "Le Figaro — « Blocages des lycées : 984 personnes interpellées ce lundi, 715 blessés côté forces de l’ordre depuis le début de la mobilisation »",
    "https://www.lefigaro.fr/actualite-france/en-direct-blocage-des-lycees-des-centaines-de-lycees-seront-a-nouveau-fermes-au-moins-partiellement-lundi-avant-un-acte-iii-mardi-20261005",
    both(
      "the 5 October daily figures (984 arrests, 65 forces injured) and the ministry's stocks: 6,059 interpellations since 28 September and 715 police and gendarmes injured since the start of the movement. Matignon: 215 students and 85 education staff injured, 34 of them headteachers. The 6,059 figure is what makes the derived weekend total of 150 arrests checkable.",
      "les chiffres journaliers du 5 octobre (984 interpellations, 65 blessés des forces) et les stocks ministériels : 6 059 interpellations depuis le 28 septembre et 715 policiers ou gendarmes blessés depuis le début du mouvement. Matignon : 215 élèves et 85 personnels éducatifs blessés, dont 34 chefs d’établissement. Le chiffre de 6 059 est ce qui rend vérifiable le total de 150 interpellations du week-end.",
    ),
    "2026-10-06",
  ),

  src(
    "lefigaro-6oct-488",
    "press",
    "Le Figaro — « Mobilisation des lycéens : 488 interpellations en France, 43 membres des forces de l’ordre blessés »",
    "https://www.lefigaro.fr/actualite-france/en-direct-blocage-des-lycees-des-dizaines-de-milliers-de-lyceens-dans-la-rue-pour-un-acte-iii-sous-haute-surveillance-20261006",
    both(
      "the 6 October daily figures — 488 interpellations and 43 forces injured — and the cumulative 215 students injured since mid-September, including a 16-year-old who lost the use of an eye.",
      "les chiffres journaliers du 6 octobre — 488 interpellations et 53 blessés des forces — et le cumul de 215 élèves blessés depuis la mi-septembre, dont un youngster de 16 ans ayant perdu l’usage d’un œil.",
    ),
    "2026-10-06",
  ),

  src(
    "ouestfrance-25sept-21",
    "press",
    "Ouest-France — « Après des blocus dans des lycées d’Île-de-France, 21 personnes ont été interpellées »",
    "https://www.ouest-france.fr/education/ecole/apres-des-blocus-dans-des-lycees-dile-de-france-21-personnes-ont-ete-interpellees-7d16e80e-b8b0-11f1-8a73-5c5c9f666d13",
    both(
      "the only figure before the 28 September national turn: 21 interpellations by noon on Friday 25 September, announced by the Préfecture de Police, in connection with the Paris-area lycée mobilisations; the Créteil rectorat counted a “grosse dizaine” of new blockades, mainly in Seine-Saint-Denis and Val-de-Marne.",
      "le seul chiffre avant le tournant national du 28 septembre : 21 interpellations à midi le vendredi 25 septembre, annoncées par la préfecture de Police, au titre des mobilisations de lycées de l’agglomération parisienne ; le rectorat de Créteil comptait une « grosse dizaine » de nouveaux blocages, surtout en Seine-Saint-Denis et dans le Val-de-Marne.",
    ),
    "2026-09-25",
  ),

  src(
    "franceinfo-mvt-ampleur",
    "press",
    "Franceinfo — « Revendications locales, vidéos virales, soutien de LFI… Comment le blocage de quelques lycées s’est transformé en un mouvement d’ampleur »",
    "https://www.franceinfo.fr/societe/education/blocage-des-lycees/la-mobilisation-a-pris-une-ampleur-inattendue-comment-le-mouvement-de-blocage-des-lycees-s-est-propage-en-france_8216054.html",
    both(
      "the movement's chronology from the rentrée: first blockades in Brittany, Villeneuve-d'Ascq and Caen on 15 September, Créteil on 17 September, the LFI visit on 21 September, a dozen blocked lycées in the Créteil academy on 25 September, the USL call for 29 September, and the cumulative figures of 119 injured (85 students, 34 staff) and 1,065 arrests over Tuesday and Wednesday.",
      "la chronologie du mouvement dès la rentrée : premiers blocages en Bretagne, puis Villeneuve-d’Ascq et Caen le 15 septembre, Créteil le 17 septembre, la visite de LFI le 21 septembre, une dizaine de lycées bloqués dans l’académie de Créteil le 25 septembre, l’appel de l’USL pour le 29 septembre, et les cumulats de 119 blessés (85 élèves, 34 personnels) et 1 065 interpellations sur mardi et mercredi.",
    ),
    "2026-10-01",
  ),

  src(
    "rtbf-blocages-mineurs",
    "press",
    "RTBF — « Blocages, dégradations, arrestations de mineurs : que se passe-t-il dans les lycées en France ? »",
    "https://www.rtbf.be/article/blocages-degradations-arrestations-de-mineurs-que-se-passe-t-il-dans-les-lycees-en-france-11792600",
    both(
      "the enforcement narrative of the first fortnight: 21 arrests in the margins after a few days of blockades, 440 on 29 September mainly minors with two thirds in custody, 625 on 30 September, more than 100 students and staff injured, and the first IGPN referrals after police-firearm injuries.",
      "le récit de la répression des premières semaines : 21 interpellations en marge après quelques jours de blocages, 440 le 29 septembre principalement des mineurs aux deux tiers en garde à vue, 625 le 30 septembre, plus d’une centaine d’élèves et de personnels blessés, et les premières saisines de l’IGPN après des blessures par armes létales.",
    ),
    "2026-10-12",
  ),

  src(
    "lemonde-29sept-fonction-publique",
    "press",
    "Le Monde — « Grève du 29 septembre : 300 000-maths manifestations ont défilé en France pour demander plus de moyens dans la fonction publique, selon la CGT »",
    "https://www.lemonde.fr/societe/article/2026/09/29/greve-du-29-septembre-300-000-manifestants-ont-defile-en-france-pour-demander-plus-de-moyens-dans-la-fonction-publique-selon-la-cgt_6785560_3225.html",
    both(
      "the 29 September crowd: about 206,000 demonstrators nationwide per the Interior Ministry against the CGT's 300,000, 30,000 in Paris per the police prefecture (including 8,000 firefighters), across more than 170 demonstrations. These are the figures carried in the 29 September turnout cell, flagged “p” because they count the public-service cortège the lycée actions joined, not a student crowd.",
      "la foule du 29 septembre : environ 206 000IRRÉS manifestation selon le ministère de l’Intérieur contre 300 000 pour la CGT, 30 000 à Paris selon la préfecture de police (dont 8 000 pompiers), pour plus de 170 manifestations. Ce sont les chiffres portés dans la cellule de participation du 29 septembre, marquée « p » car ils dénombrent le cortège de la fonction publique rejoint par les actions lycée et non une foule étudiante.",
    ),
    "2026-09-29",
  ),

  src(
    "franceinfo-fonction-publique-29sept",
    "press",
    "Franceinfo — « Mobilisation dans la fonction publique : 206 000 manifestants selon le ministère de l’Intérieur, 300 000 pour la CGT »",
    "https://www.franceinfo.fr/economie/greve/mobilisation-dans-la-fonction-publique-206-000-manifestants-selon-le-ministere-de-l-interieur-300-000-pour-la-cgt_8215472.html",
    both(
      "the same 29 September figures with the Paris split (70,000 CGT / 30,000 ministry) and the strike rates: 9.64% of state civil servants, 5.68% territorial, 4.5% hospital, 13.71% of teachers.",
      "les mêmes chiffres du 29 septembre avec la répartition parisienne (70 000 CGT / 30 000 ministère) et les taux de grève : 9,64 % dans la fonction publique d’État, 5,68 % territoriale, 4,5 % hospitalière, 13,71 % des enseignants.",
    ),
    "2026-09-29",
  ),

  src(
    "ouestfrance-7sept-lerheu",
    "press",
    "Ouest-France — « Cours tardifs ou par correspondance, classes surchargées… ces lycéens bloquent leur établissement près de Rennes »",
    "https://www.ouest-france.fr/bretagne/le-rheu-35650/cours-tardifs-ou-par-correspondance-classes-surchargees-ces-lyceens-bloquent-leur-etablissement-pres-de-rennes-5cb2156e-aac0-11f1-9556-770e8387e7e9",
    both(
      "the movement's first mainland blockade: the lycée Théodore-Monod at Le Rheu, near Rennes, on Monday 7 September 2026, over late or correspondence classes and overcrowded classes — the origin point that precedes the 15 September window opening.",
      "le tout premier blocus en métropole : le lycée Théodore-Monod au Rheu, près de Rennes, le lundi 7 septembre 2026, sur les cours tardifs ou par correspondance et les classes surchargées — le point d’origine qui précède l’ouverture de la fenêtre au 15 septembre.",
    ),
    "2026-09-07",
  ),

  src(
    "actu-caen-15sept",
    "press",
    "Actu — « Un lycée bloqué par des élèves à Caen »",
    "https://actu.fr/normandie/caen_14118/un-lycee-bloque-par-des-eleves-a-caen-ils-denoncent-une-mauvaise-organisation-interne_64794136.html",
    both(
      "the 15 September blockade of the lycée Victor-Hugo in Caen over internal organisation — the first date inside the new window.",
      "le blocage du 15 septembre du lycée Victor-Hugo de Caen sur l’organisation interne — la première date à l’intérieur de la nouvelle fenêtre.",
    ),
    "2026-09-18",
  ),

  src(
    "actu-villeneuve-15sept",
    "press",
    "Actu — « Pourquoi déjà un blocage de l’université de Pont de Bois à Villeneuve-d’Ascq ? »",
    "https://actu.fr/hauts-de-france/villeneuve-d-ascq_59009/pourquoi-deja-un-blocage-de-luniversite-de-pont-de-bois_64791633.html",
    both(
      "the campus Pont de Bois blockade at Villeneuve-d'Ascq on Tuesday 15 September, with the lycée Queneau in the same town blocked the day before — the source of the one-day discrepancy between the two accounts of the Villeneuve-d'Ascq date.",
      "le blocage du campus Pont de Bois à Villeneuve-d’Ascq le mardi 15 septembre, le lycée Queneau de la même ville étant bloqué la veille — à l’origine de l’écart d’un jour entre les deux versions de la date de Villeneuve-d’Ascq.",
    ),
    "2026-09-15",
  ),

  src(
    "ouestfrance-infographie-2026",
    "press",
    "Ouest-France — « Infographie. Du 29 septembre au 29 octobre, comment la colère des lycéens est devenue une colère sociale »",
    "https://www.ouest-france.fr/societe/manifestation/infographie-du-29-septembre-au-29-octobre-comment-la-colere-des-lyceens-est-devenue-une-colere-sociale-0c2ca3ec-d37a-11f1-81f2-0d14b9f9c452",
    both(
      "the movement's own calendar, from the first act of manifestations and blockades on 29 September to 29 October — the spine the September rows are placed on.",
      "le calendrier du mouvement, du premier acte de manifestations et blocages le 29 septembre au 29 octobre — l’axe sur lequel sont posés les lignes de septembre.",
    ),
    "2026-10-29",
  ),

  src(
    "investigation-genz",
    "press",
    "Investigaction — « “Tasty crousti antifascisti” : Quand la Gen Z tente de faire nation »",
    "https://investigaction.net/tasty-crousti-antifascisti-quand-la-gen-z-tente-de-faire-nation/",
    both(
      "an independent dating of the movement's origin at Créteil on 17 September, the 21 September LFI visit, and the activist record of the repression that followed — mutilations by flashballs and grenades, custody humiliations, and the case of the Trappes killing.",
      "une datation indépendante de l’origine du mouvement à Créteil le 17 septembre, de la visite de LFI le 21 septembre, et le récit militant de la répression qui a suivi — mutilations par flashballs et grenades, humiliations en garde à vue, affaire de l’homicide à Trappes.",
    ),
    "2026-11-01",
  ),

  /* ------------------------------------- 2026 — turnout, arrests, injuries */
  src(
    "europe1-07nov",
    "press",
    "Europe 1 — « Manifestations du 7 novembre : 146 000 personnes ont défilé en France samedi, 360 interpellations »",
    "https://www.europe1.fr/societe/manifestations-du-7-novembre-146000-personnes-ont-defile-en-france-samedi-360-interpellations-selon-le-ministere-de-linterieur-1216046",
    both(
      "146,000 demonstrators and 360 arrests on 7 Nov — the figure the 7 Nov ministry bilan is read through.",
      "146 000 manifestants et 360 interpellations le 7 nov. — la lecture retenue du bilan ministériel du 7 nov.",
    ),
    "2026-11-07",
  ),

  src(
    "tf1info-07nov",
    "press",
    "TF1 Info — « Manifestations : 146 000 personnes en France samedi 7 novembre, au moins 360 interpellations »",
    "https://www.tf1info.fr/societe/manifestations-146-000-personnes-en-france-samedi-7-novembre-au-moins-360-interpellations-2474538.html",
    both(
      "independent confirmation of the 7 Nov pair.",
      "confirmation indépendante du couple de valeurs du 7 nov.",
    ),
    "2026-11-07",
  ),

  src(
    "france24-05nov",
    "press",
    "France 24 — live coverage of the 5 November national day",
    "https://www.france24.com/en/france/20261105-live-france-nationwide-strikes-living-costs",
    both(
      "the ministry’s 575,000 for 5 Nov, quoted in English.",
      "les 575 000 du ministère pour le 5 nov., cités en anglais.",
    ),
    "2026-11-05",
  ),

  src(
    "france24-06nov",
    "press",
    "France 24 — 70 000 policiers et gendarmes à nouveau mobilisés samedi",
    "https://www.france24.com/fr/france/20261106-manifestations-de-samedi-en-france-70-000-policiers-et-gendarmes-%C3%A0-nouveau-mobilis%C3%A9s",
    both(
      "the size of the 7 Nov policing operation, the input to the week-6 cost band.",
      "la taille du dispositif du 7 nov., entrée de la fourchette de coût de la semaine 6.",
    ),
    "2026-11-06",
  ),

  src(
    "franceinfo-05nov",
    "press",
    "franceinfo — direct du 5 novembre : plus de 250 actions annoncées dans toute la France",
    "https://www.franceinfo.fr/societe/manifestations/direct-greve-du-5-novembre-plus-de-250-actions-annoncees-dans-toute-la-france-selon-une-carte-de-la-ggt_8268827.html",
    both(
      "448 interpellations on 5 Nov, the arrest figure plotted for that day.",
      "448 interpellations le 5 nov., valeur tracée pour cette journée.",
    ),
    "2026-11-05",
  ),

  src(
    "franceinfo-24oct",
    "press",
    "franceinfo — « Près de 1 000 interpellations, deux blessés graves » : le bilan du 24 octobre",
    "https://www.franceinfo.fr/societe/manifestations/mobilisation-en-baisse-pres-de-1-000-interpellations-deux-blesses-graves-ce-qu-il-faut-retenir-de-cette-nouvelle-journee-de-manifestation-contre-la-vie-chere-partout-en-france_8252476.html",
    both(
      "24 Oct arrests and the two seriously injured protesters; also the evidence that turnout fell that day.",
      "les interpellations du 24 oct. et les deux manifestants grièvement blessés ; aussi la preuve d’une mobilisation en baisse ce jour-là.",
    ),
    "2026-10-24",
  ),

  src(
    "anadolu-05nov",
    "press",
    "Anadolu Agency (français) — 642 interpellations lors de la mobilisation du 5 novembre",
    "https://www.aa.com.tr/fr/france/france-642-interpellations-lors-de-la-mobilisation-du-5-novembre-une-plainte-annonc%C3%A9e-contre-nu%C3%B1ez/4114506",
    both(
      "the 642 figure that competes with 448 for 5 Nov; the higher bound is plotted as partial.",
      "le chiffre de 642 qui concurrence 448 pour le 5 nov. ; la borne haute est tracée comme partielle.",
    ),
    "2026-11-05",
  ),

  src(
    "yenisafak-05nov",
    "press",
    "Yeni Şafak (français) — 642 interpellations lors de la mobilisation du 5 novembre",
    "https://fr.yenisafak.com/actualites/642-interpellations-lors-de-la-mobilisation-du-5-novembre-61558",
    both(
      "corroborates Anadolu’s 642, which is why that bound is shown at all.",
      "corrobore les 642 d’Anadolu, raison pour laquelle cette borne est affichée.",
    ),
    "2026-11-05",
  ),

  src(
    "tf1info-05nov",
    "press",
    "TF1 Info — direct du 5 novembre : la France se prépare à un « jeudi noir »",
    "https://www.tf1info.fr/societe/en-direct-mobilisation-du-5-novembre-manifestations-et-greves-paris-marseille-nantes-la-france-se-prepare-a-un-jeudi-noir-2473952.html",
    both(
      "the shape of the 5 Nov day — 250+ actions, strikes in Paris, Marseille and Nantes.",
      "la physionomie du 5 nov. — plus de 250 actions, grèves à Paris, Marseille et Nantes.",
    ),
    "2026-11-05",
  ),

  src(
    "lefigaro-05nov",
    "press",
    "Le Figaro — « Manifestations du 5 novembre : 70 000 policiers et gendarmes mobilisés, déclare Nuñez »",
    "https://www.lefigaro.fr/flash-actu/manifestations-du-5-novembre-70-000-policiers-et-gendarmes-mobilises-declare-nunez-20261104",
    both(
      "announcement, on 4 Nov, of the 70,000-strong deployment for 5 Nov.",
      "annonce, le 4 nov., du dispositif de 70 000 agents pour le 5 nov.",
    ),
    "2026-11-04",
  ),

  src(
    "armees-05nov",
    "press",
    "armees.com — le dispositif de sécurité du 5 novembre 2026",
    "https://armees.com/manifestations-5-novembre-2026-dispositif-securite-70000-policiers-gendarmes/",
    both(
      "third confirmation of the 70,000 deployment.",
      "troisième confirmation du dispositif de 70 000 agents.",
    ),
    "2026-11-05",
  ),

  src(
    "leparisien-24oct-blesses",
    "press",
    "Le Parisien — « 267 membres des forces de l’ordre et 150 manifestants ont été blessés, annonce Laurent Nuñez »",
    "https://www.leparisien.fr/faits-divers/manifestations-du-samedi-24-octobre-267-membres-des-forces-de-lordre-et-150-manifestants-ont-ete-blesses-annonce-laurent-nunez-26-10-2026-MHSP3XA3QBEM7GR4JUZL77Z54I.php",
    both(
      "the only day in the window with both sides of the injury count published together.",
      "la seule journée de la fenêtre où les deux côtés du bilan de blessés sont publiés ensemble.",
    ),
    "2026-10-26",
  ),

  src(
    "ouest-france-angers",
    "press",
    "Ouest-France — manifestation du 7 novembre à Angers : huit blessés, onze interpellés",
    "https://www.ouest-france.fr/societe/manifestation/manifestation-du-7-novembre-a-angers-huit-blesses-onze-interpelles-un-commerce-et-quatre-banques-vandalises-b7d296cc-dada-11f1-a45f-49114163a350",
    both(
      "regional-only marker: 8 injured, 11 arrests, one shop and four banks vandalised — never extrapolated.",
      "marqueur régional : 8 blessés, 11 interpellations, un commerce et quatre banques vandalisés — jamais extrapolé.",
    ),
    "2026-11-07",
  ),

  src(
    "bulletindescommunes-07nov",
    "press",
    "Bulletin des communes — la mobilisation du 7 novembre, commune par commune",
    "https://bulletindescommunes.net/mobilisation-du-7-novembre-communes/",
    both(
      "the municipality-level outcome of 7 Nov, used to sanity-check the national total.",
      "le résultat communal du 7 nov., servant à recouper le total national.",
    ),
    "2026-11-07",
  ),

  src(
    "actuforces-17oct",
    "press",
    "Actu Forces de l’Ordre — plus de 10 000 policiers et gendarmes mobilisés à Paris le 17 octobre",
    "https://actuforcesdelordre.fr/2026/10/17/10000-policiers-gendarmes-mobilises-paris-manifestations/",
    both(
      "the Paris deployment on 17 Oct, the low end of the policing-cost band for that day.",
      "le dispositif parisien du 17 oct., borne basse de la fourchette de coût pour cette journée.",
    ),
    "2026-10-17",
  ),

  src(
    "actuforces-beauvau",
    "press",
    "Actu Forces de l’Ordre — Beauvau : 305 blessés, 1 949 interpellations",
    "https://actuforcesdelordre.fr/2026/10/01/beauvau-mobilise-forces-mobiles-305-blesses-1949-interpellations-lycees/",
    both(
      "the cumulative police-side tally of the lycée wave (305 injured, 1,949 arrests).",
      "le cumul côté forces de l’ordre pour la vague lycéenne (305 blessés, 1 949 interpellations).",
    ),
    "2026-10-01",
  ),

  src(
    "larep-17oct",
    "press",
    "La République du Centre — la journée du 17 octobre est-elle vraiment inédite ?",
    "https://www.larep.fr/paris-75000/faits-divers/arrestations-mobilisations-la-journee-du-17-octobre-est-elle-vraiment-inedite_15066265/",
    both(
      "the « unprecedented » claim tested against earlier mobilisations; it is why 17 Oct is not called a record.",
      "le caractère « inédit » mis à l’épreuve des mobilisations antérieures ; d’où l’absence de record pour le 17 oct.",
    ),
    "2026-10-19",
  ),

  src(
    "laprovence-17oct",
    "press",
    "La Provence — violences du 17 octobre : le dispositif policier inférieur à celui de mobilisations similaires",
    "https://www.laprovence.com/article/faits-divers-justice/5795089910157914/violences-du-17-octobre-le-dispositif-policier-inferieur-a-celui-observe-dans-des-mobilisations-similaires",
    both(
      "the numerical claim behind the « smaller dispositif » reading.",
      "l’argument chiffré derrière la lecture d’un dispositif plus faible.",
    ),
    "2026-10-19",
  ),

  src(
    "franceinfo-dispositif-17oct",
    "press",
    "franceinfo — le dispositif de maintien de l’ordre du 17 octobre était-il moins important ?",
    "https://www.franceinfo.fr/societe/mobilisation-du-17-octobre/le-dispositif-de-maintien-de-l-ordre-deploye-le-17-octobre-etait-il-moins-important-que-lors-des-dernieres-grandes-manifestations_8243998.html",
    both(
      "the fact-check that sets the policing-cost comparison against previous movements.",
      "la vérification qui situe la comparaison de coût face aux mouvements précédents.",
    ),
    "2026-10-21",
  ),

  src(
    "franceinfo-nunez-moyens",
    "press",
    "franceinfo — Laurent Nuñez revient sur les moyens policiers déployés après le 17 octobre",
    "https://www.franceinfo.fr/societe/mobilisation-du-17-octobre/apres-les-mobilisations-du-17-octobre-laurent-nunez-revient-sur-les-moyens-policiers-deployes_8266529.html",
    both(
      "the minister’s own account of the deployment, which contradicts the press reading.",
      "la version du ministre sur le dispositif, qui contredit la lecture de la presse.",
    ),
    "2026-11-03",
  ),

  src(
    "reporterre-street-medics",
    "press",
    "Reporterre — les street-medics face à une répression de plus en plus féroce",
    "https://reporterre.net/Les-street-medics-face-a-une-repression-de-plus-en-plus-feroce",
    both(
      "why no weekly protester-injury series exists: the first-aid volunteers are themselves policed.",
      "pourquoi aucune série hebdomadaire de blessés n’existe : les secouristes sont eux-mêmes visés.",
    ),
    "2026-10-26",
    "2026-10-27",
  ),

  src(
    "sudouest-street-medics",
    "press",
    "Sud Ouest — à Bordeaux, les secouristes de rue en première ligne",
    "https://www.sudouest.fr/gironde/bordeaux/mobilisation-sociale-a-bordeaux-c-est-le-meilleur-moyen-de-militer-au-milieu-des-detonations-et-des-lacrymogenes-les-secouristes-de-rue-en-premiere-ligne-du-secours-31404007.php",
    both(
      "local colour on injury recording, and the Bordeaux figure used as a regional check. The page publishes no date of its own, so none is shown here.",
      "le reportage local sur le relevé des blessés, et le chiffre bordelais utilisé comme contrôle régional. La page ne publie aucune date propre, aucune n’est donc affichée ici.",
    ),
  ),

  src(
    "mutins-pangee",
    "press",
    "Les Mutins de Pangée (Facebook) — « 10 éborgnés, 7 amputés, 52 autres blessés graves »",
    "https://www.facebook.com/LesMutinsDePangee/posts/-le-terrible-bilan-de-la-r%C3%A9pression10-%C3%A9borgn%C3%A9s-7-amput%C3%A9s-52-autres-bless%C3%A9s-grave/1566486208856655/",
    both(
      "the 79-victim figure before Le Canard enchaîné attributed it to Thines; social-media origin, treated as a floor only.",
      "les 79 victimes avant que Le Canard ne l’attribue à Thines ; origine réseaux sociaux, traitée comme plancher seulement.",
    ),
    "2026-11-09",
  ),

  src(
    "mediapart-crs-blesses",
    "press",
    "Mediapart — « CRS blessés : le fichier interne qui dégonfle le bilan du ministre »",
    "https://www.mediapart.fr/journal/france/131126/crs-blesses-le-fichier-interne-qui-degonfle-le-bilan-du-ministre",
    both(
      "the minister's running total of injured security personnel, which the ministry's daily figures do not contain: 761 on 8 October, 937 on 14 October and 1,580 on 5 November — the last being the movement's total, and the key that identifies the 17 October figure (997, then 1,144 on consolidation) as a cumulative level rather than a daily count. Also the internal CRS file: 1,233 agents declared injured in October, 1,167 of them classified as light injuries (94.6%).",
      "le cumul des blessés parmi les forces selon le ministre, que les chiffres quotidiens du ministère ne contiennent pas : 761 le 8 octobre, 937 le 14 octobre et 1 580 le 5 novembre — le dernier étant le total du mouvement, et la clef qui montre que le chiffre du 17 octobre (997, puis 1 144 après consolidation) est un cumul et non un compte du jour. Aussi le fichier interne des CRS : 1 233 agents déclarés blessés en octobre, dont 1 167 classés « légers » (94,6 %).",
    ),
    "2026-11-13",
  ),

  src(
    "contre-attaque-blessures",
    "press",
    "Contre-Attaque — « Leurs blessures et les nôtres : l’intox qui sert à justifier des crimes d’État »",
    "https://contre-attaque.net/2026/11/13/leurs-blessures-et-les-notres-lintox-qui-sert-a-justifier-des-crimes-detat/",
    both(
      "the polemical reading of the same two figures — the ministry's 1,580 and the CRS file's 94.6% of light injuries — with the case files it sets against the total: injuries described as accidental (two officers burnt in a patrol car at Givors by their own grenade, 10 October) or minor (a CRS with a bruised wrist from closing his vehicle door). Read as a claim about the composition of the total, not as a source for the total itself.",
      "la lecture polémique des deux mêmes chiffres — les 1 580 du ministère et les 94,6 % de « petits bobos » du fichier des CRS — avec les cas qu’elle oppose au total : blessures accidentelles (deux policiers brûlés dans leur voiture de patrouille à Givors par leur propre grenade, le 10 octobre) ou bénignes (un CRS avec le poignet contusionné en fermant la portière de son véhicule). À lire comme une thèse sur la composition du total, non comme une source du total.",
    ),
    "2026-11-13",
  ),
  src(
    "lemonde-blessures-0511",
    "press",
    "Le Monde — « Hands torn off, broken bones, blinded eye: a month of serious injuries at protests »",
    "https://www.lemonde.fr/en/france/article/2026/11/05/hands-torn-off-broken-bones-blinded-eye-le-monde-investigates-french-protesters-injuries_6772405_7.html",
    both(
      "the serious-injury register: 78 serious cases and one death by 5 November, 10 blinded, 9 cranio-facial injuries, 7 amputations. Serious cases only, built from press, militant blogs and IGPN referrals — a floor, and a non-independent list.",
      "le registre des blessures graves : 78 cas graves et un décès au 5 novembre, 10 éborgnés, 9 traumatismes crânio-faciaux, 7 amputations. Cas graves seulement, bâti sur la presse, les blogs militants et les saisines de l’IGPN — un plancher, et une liste non indépendante.",
    ),
    "2026-11-05",
  ),

  src(
    "lemonde-lycees-0610",
    "press",
    "Le Monde — « French high school protests: what we know about injuries among demonstrators and police »",
    "https://www.lemonde.fr/en/france/article/2026/10/06/high-school-protests-what-we-know-about-injuries-among-demonstrators-and-police_6758279_7.html",
    both(
      "the education-ministry wording that keeps the student counts out of both series: injuries 'either due to accidental circumstances … or injuries caused by troublemakers'.",
      "la formulation du ministère qui maintient les décomptes d’élèves hors des deux séries : blessures « soit accidentelles … soit causées par des fauteurs de troubles ».",
    ),
    "2026-10-06",
  ),

  src(
    "lemonde-principaux-1210",
    "press",
    "Le Monde — « French high school protests: exhausted principals struggle with violent clashes »",
    "https://www.lemonde.fr/en/france/article/2026/10/12/french-high-school-protests-exhausted-principals-struggle-to-deal-with-violent-clashes-at-their-schools_6758508_7.html",
    both(
      "that more than 210 students had been injured, 'some by police', alongside 88 staff including about 40 principals — the population behind the 'educationDeclared' tag.",
      "que plus de 210 élèves avaient été blessés, « certains par la police », aux côtés de 88 personnels dont une quarantaine de chefs d’établissement — la population derrière l’étiquette « educationDeclared ».",
    ),
    "2026-10-12",
  ),
];

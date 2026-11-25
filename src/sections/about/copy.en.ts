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

export const ABOUT_EN: About = [
  {
    id: "analysis",
    title: "My Analysis",
    blocks: [
      {
        kind: "p",
        runs: [
          "The turnout, arrests and injuries chart shows the early dynamics of the movement quite starkly: school blockades were rapidly spreading around the country (and its overseas territories), which was met with a hugely excessive response from the police at the end of September. This helps to contextualise ",
          { em: "why" },
          " people were so angry and why, when the police lost control on Oct 17, they caused so much damage (although accurate figures are very hard to come by).",
        ],
      },
      {
        kind: "p",
        runs: [
          "In an attempt to regain control, the state responded with lawfare, with Macron and his prefects attempting to ban protests and implement curfews for young people. This has been resoundingly rejected week after week as—during the school holidays and therefore a break in the school blockades—huge numbers of people continued to take to the streets in defiance of these orders.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Looking at the data since Oct 17, things seem to have settled into an uneasy routine: the unions declare planned routes; the prefects ban them or propose ridiculous alternatives; the unions file urgent appeals that invariably get rejected; the weaker unions accept the alternative routes; the spicier unions join the Gilets Jaunes, students, et al. in defiant undeclared manifestations; the cops wait until most people go; and then they engage in running battles with the remaining few until the evening. But either the more-recent arrest and injury figures are currently undercounted, or there has been a steady decline in each since Oct 17, suggesting a certain amount of de-escalation. However, in my own experience, that is deceptive: every week, the police here seem to be putting up more barriers of more robust construction, as well as bringing out more and more armoured vehicles and flying their helicopters lower and lower.",
        ],
      },
      { kind: "h", text: "Policing" },
      {
        kind: "p",
        runs: [
          "However, I think the police may have decided to try intelligence in place of violence for a change. They seem to be using kettling much more often, surrounding and tear-gassing protestors and then allowing them to exit only by allowing their identity card to be photographed and a fine for attending an illegal protest to be issued. The fixed-penalty fines are 135EUR, but I suspect their main objective is the IDs for intelligence collection and the issuing of future charges. Similarly, police in Brest ",
          {
            link: "seized the photo directories of several schools",
            href: BLOG,
          },
          ", for as-yet-unclear reasons.",
        ],
      },
      {
        kind: "p",
        runs: [
          "It’s worth noting that in France, it is illegal for the state to record ethnicity data and for employers to record lists of striking employees, both because of the experience in WWII when the French collaborator and German occupier governments used these lists to round up their enemies for deportation and worse. The fear in the back of everyone’s mind is the possibility that France will again have a far-right government next April, which ",
          {
            link: "almost two thirds of the police openly support",
            href: RN_VOTE,
          },
          ", and so where might those lists end up?",
        ],
      },
      {
        kind: "p",
        runs: [
          "But at the same time, I don’t want to give them too much credit. ",
          { link: "Falling standards in police training", href: TRAINING },
          " and the ",
          {
            link: "inappropriateness of their public order policing methods",
            href: TRAINING,
          },
          " have been a topic of much discussion in France ",
          { link: "and elsewhere", href: ELSEWHERE },
          " in recent years, but I’ve seen errors ranging from:",
        ],
      },
      {
        kind: "ul",
        items: [
          [{ link: "petty, like upside-down velcro patches", href: PILEUP }],
          [
            "to quite serious, like ",
            {
              link: "causing a multi-car pileup on the motorway",
              href: PILEUP,
            },
            " en route to repress a protest",
          ],
          [
            "to very serious, like individual or small groups of riot cops repeatedly getting separated and surrounded by protestors, and even once being ",
            {
              link: "snuck up on and placed (briefly) in a chokehold",
              href: CHOKEHOLD,
            },
          ],
        ],
      },
      {
        kind: "p",
        runs: [
          "If they were facing a real, organised, violent threat, I wouldn’t much fancy their chances.",
        ],
      },
      { kind: "h", text: "2026’s Historic Positioning" },
      {
        kind: "p",
        runs: [
          "In terms of the historic comparisons (although the data here is less trustworthy; see the section below), the pension reform protests are interesting as, apparently, the only case where the protests were already ongoing for some time before the police repression began. The most obvious comparison to make is with the Gilets Jaunes (especially since the present movement has adopted the same Act-based structure), which managed to prolong a steadily decreasing weekly turnout for well over a year (and at one point had Macron ",
          { link: "considering escape by helicopter", href: HELICOPTER },
          "), but it’s hard to say what was achieved by doing so.",
        ],
      },
      { kind: "h", text: "What Next?" },
      {
        kind: "p",
        runs: [
          "The big question facing the movement is ",
          { link: "what should they do now", href: STRATEGY },
          "? They’ve seen off wanton police violence, shameless media demonisation and one particularly chaotic night that could have lost them public support (but this seems not to have happened). As I see it (and I’m sure many others are having the same conversations), they need to figure out what they want and develop their theory of change. For example, the government has already made some small concessions to the students’ original demands for increased education funding, but the movement has now absorbed all sorts of other grievances, from the cost of living to fear of militarism to personal distaste for Macron’s patronising and authoritarian style of rule to fear of an incoming RN government.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Do they want to influence elites? Do they want to focus on gaining institutional power in next year’s elections? There is the presidential election in April, which will be followed by a legislative one. In this case, should people unify behind a single presidential candidate (whatever their skepticisms of electoral politics) whilst working to produce something like the Student List in Serbia?",
        ],
      },
      {
        kind: "p",
        runs: [
          "Do they want to inflict economic pain on the state to force it to meet their demands? The data below suggests that we may be reaching an inflection point whereby the cost of policing these protests exceeded even the highest estimated for the damage caused on Oct 17. But as the Gilets Jaunes well know, this is an approach that favours many dispersed, smaller groups acting against intelligently-chosen targets (e.g. malls, logistics hubs, etc.), and not just smashing up random shop windows.",
        ],
      },
      {
        kind: "p",
        runs: [
          "What ",
          { em: "are" },
          " those demands? Just the original student demands? Or the whole programme of reversing the pension reforms, re-funding every sector, demilitarising the police, seeking justice for Palestine, etc.?",
        ],
      },
      {
        kind: "p",
        runs: [
          "Or do they want to generate mass support, to bring people out in their millions in a general strike? This means addressing the reasons why French people today are less likely to respond to a strike call than previous generations. This means putting money aside for strike funds to help those who would struggle the most financially by giving up their income. This means identifying groups who, once all of the public transport workers are on strike, can take over the collective running of these vital services, ",
          { link: "as in Barcelona a century ago", href: BARCELONA },
          ".",
        ],
      },
      {
        kind: "p",
        runs: [
          "Do they want to overthrow the government by force? This has happened before—the end of Fourth Republic came when French military personnel and settlers in Algeria launched an attempted coup d’état. Certainly, the government seems to be ",
          { link: "taking the possibility seriously", href: BUNKER },
          ". But even if protestors did succeed in causing Macron to flee, it’s not clear how the symbolic victory might translate into a practical takeover.",
        ],
      },
      {
        kind: "p",
        runs: [
          "A common phrase on protestors lips is ‘be water’, taking inspiration from Bruce Lee and the Hong Kong protest movement. But it echoes ",
          { link: "Mao’s famous dictum", href: MAO },
          ", that ‘the guerrilla must move amongst the people as a fish swims in the sea.’ There is a time for mass, and for overpowering barricades through sheer numbers—the French celebrate one such example as their National Day. But there is also a time for commando tactics, and getting those lines through inconspicuity and subterfuge to launch attacks behind the enemy’s rear.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Personally, I think both approaches are necessary, but neither alone is sufficient. And, for now, I do not see the latter well-represented in the present movement. When they start erecting barriers the night before a protest, where are the rapid response networks who can organise enough people at short notice to physically block the work, buying the lawyers time to block it through legal means?",
        ],
      },
      {
        kind: "p",
        runs: [
          "These debates, and many more, are currently being played out amongst the dizzying constellation of General Assemblies that have sprung up over the past month. There is ",
          { link: "a clear drive to build dual power", href: DUAL_POWER },
          ". But how far will it go?",
        ],
      },
      { kind: "h", text: "Predicting the Future" },
      {
        kind: "p",
        runs: [
          "At the moment, I think a complete fizzling-out is unlikely. I think the most likely course is that this will continue for some time, with slowly diminishing turnout and some small concessions won here and there. Most people’s engagement will be limited to therapeutic marching, but the people who are politicised here will go on to develop new associations and be instrumental in future movements, as the former Gilets Jaunes have been here, and the 68-ers before them. Things will remain at a low simmer during the colder, wetter months, before re-emerging from its winter hibernation in time for next year’s elections.",
        ],
      },
      {
        kind: "p",
        runs: [
          "But maybe, just maybe, the threat of an incoming fascist government and the memory of so many past underwhelming results will serve to focus minds and harden hearts in time to press home their present advantage and win lasting, significant wins. And just as mere ",
          { em: "resistance" },
          " in France has already spread like wildfire across Europe, a definitive victory in France could be the thing to spark a conflagration that burns down the old world and inaugurates the new. We might finally be witnessing an end to ",
          {
            link: "the past fifty years of counter-revolution",
            href: COUNTER_REVOLUTION,
          },
          ", if this movement (and others) can truly pick up the flame of ’68; the Rojava Revolution; the early promise of the Arab Spring; and too many other examples to list here.",
        ],
      },
      {
        kind: "p",
        runs: [
          "I will leave you with this (heavily paraphrased) quote from a classic film, which I watched for the first time recently:",
        ],
      },
      QUOTE,
    ],
  },
  {
    id: "data",
    title: "Data Problems",
    blocks: [
      {
        kind: "p",
        runs: [
          "Producing this tool has required broad searches across a wide range of heterogenous datasets. It’s been hard to find data for a lot of things; it’s been harder to find trustworthy data; and it’s even harder to draw conclusions from data that treat the same topic in slightly different ways.",
        ],
      },
      {
        kind: "p",
        runs: [
          "For now, all of the research has been performed using LLM assistance (and then run through several cycles of LLM-assisted validation), but it has not been manually verified; I simply do not have the time. But I have architected the tool to divide the data from the code that produces the visualisations as much as possible. My hope is that I can crowd-source the verification, as well as the continued injection of both new data and amendments to previous data, so that the visualisations will improve over time.",
        ],
      },
      {
        kind: "p",
        runs: [
          "But I would like to highlight some of the issues I have had with the data, and I suspect no amount of crowdsourced data entry and verification can really help with them.",
        ],
      },
      { kind: "h", text: "Injuries" },
      {
        kind: "p",
        runs: [
          "The police are the only ones to publish official injury figures, but they make no distinction between: accidental & self-inflicted injuries, and those caused by protestors; nor the severity of injury. From ",
          { link: "one leaked internal report", href: LEAKED },
          ", we know that as little as 5% of the figures that they bandy about in the press may actually amount to anything serious. Potentially a good way to enrich this would be to compare with figures for injury-related work stoppages, but I don’t know when or where these might be published (and they would probably have to be compared against the non-uprising baseline to identify any excess).",
        ],
      },
      {
        kind: "p",
        runs: [
          "On the other hand, no official figures for violence against protestor exists. Deaths are obviously pretty easy to verify, but the exact causes can be unclear. For injuries, the most reliable data is compiled by Prof. Laurent Thines, and provides the floor of verified serious injuries. Some local street medic groups publish accounts of how many people they treated after large protests, but many of these will be for relatively minor things like ‘gave saline to rinse out tear gas’; on the flipside, many people who receive saline or a Maalox squirt for the same thing won’t be recorded; and the street medic landscape is very fragmented, with multiple groups often operating in the same protests but not all reporting their figures afterwards. Those that do might only do so in something inaccessible like an Instagram story, further limiting discoverability.",
        ],
      },
      {
        kind: "p",
        runs: [
          "And, on both sides, there is no agreed-upon vocabulary—both sides will use vague terms like ‘serious’ or ‘minor’ injury, but these could be defined with very different thresholds. I have tried, here, to derive from what I have some sort of formal register of injury location and severity, and I encourage everyone to start publishing detailed casualty breakdowns in an easily-accessible central repository. Maybe mine?!",
        ],
      },
      { kind: "h", text: "Costs" },
      {
        kind: "p",
        runs: [
          "Damage is another tricky one, and also one of the most politicised. Wide-ranging figures are published shortly after the fact, but I suspect that if we wait a while we might be able to determine a more realistic floor by looking at the real insurance claim amounts (although that might exclude smaller stores that might not have insurance, and I also have no idea if these are public).",
        ],
      },
      {
        kind: "p",
        runs: [
          "The estimates for policing costs should be taken as very rough, mainly determined by estimating the per-squadron cost of riot police deployment, plus estimated helicopter flight hours, and scaling that up to the reported police deployment numbers. This also dovetails with the injury data problem, because we can’t make estimates for the cost of any subsequent sick leave (whether for police, protestors, or bystanders).",
        ],
      },
      {
        kind: "p",
        runs: [
          "The policing costs also don’t address ",
          { link: "opportunity costs", href: BROKEN_WINDOW },
          "—every additional euro spent on police deployments is a euro not spent on the education or health service. However, for the protestors, it’s arguable that the damage they cause may come with a ",
          { em: "negative" },
          " opportunity cost: they smashed up a load of stuff on the 17th, and a little later the government started offering to ",
          { em: "increase" },
          " spending on education. That seems basically impossible to model confidently, so I’ve left it out.",
        ],
      },
      { kind: "h", text: "Historic Data" },
      {
        kind: "p",
        runs: [
          "Obviously, all of these issues are intensified when looking further back at historical events (although with the caveat that historic data is much more settled). There are probably academic books written about 1968 with detailed breakdowns of figures, but I have not been very successful finding them with the LLM. Also, going that far back in time causes its own issues: for example, ‘France-entière’ did not exist at the time, and so the total population figures are only for what we now call Metropolitan France.",
        ],
      },
    ],
  },
  {
    id: "method",
    title: "How I Made This",
    blocks: [
      {
        kind: "p",
        runs: [
          "This project began as a personal experiment in ‘vibe-coding’ (i.e., iterative software development using an LLM and trying to avoid touching the code yourself).",
        ],
      },
      {
        kind: "p",
        runs: [
          "The charts are rendered using Chart.js. I’ve made things using this by hand in the past, and it’s pretty tedious, so the ability to have the LLM convert natural language instructions into Chart.js syntax is pretty incredible.",
        ],
      },
      {
        kind: "p",
        runs: [
          "I used MiniMax M3.1 Flash for research and DeepSeek V4.1 Flash for coding—thanks China!",
        ],
      },
      {
        kind: "p",
        runs: [
          "This project is hosted on ",
          { link: "Framagit Pages", href: PAGES },
          ". You can view the code ",
          { link: "here", href: REPO },
          ".",
        ],
      },
      {
        kind: "p",
        runs: [
          "The first launch of this project is the result of about a week of intense iteration.",
        ],
      },
    ],
  },
];

export const SECTION_LABEL_EN = "Notes on this project";

/** Green counterweight to the amber disclaimer; the "…" continues its sentence. */
export const CALLOUT_EN =
  "…except for this section, which is 100% human written! (in English, and then machine translated)";

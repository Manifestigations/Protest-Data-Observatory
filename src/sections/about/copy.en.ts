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

export const ABOUT_EN: About = [
  {
    id: "analysis",
    title: "My Analysis",
    blocks: [
      {
        kind: "p",
        runs: [
          "Section A shows the early dynamics of the movement quite starkly: school blockades were rapidly spreading around the country (and its overseas territories), which was met with a hugely excessive response from the police at the end of September. This helps to contextualise ",
          { em: "why" },
          " people were so angry and why, when the police lost control on Oct 17, they caused such an amount of damage.",
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
          "Looking at the data since Oct 17, things seem to have settled into an uneasy routine: the unions declare planned routes; the prefects ban them or propose ridiculous alternatives; the unions file urgent appeals that invariably get rejected; the weaker unions accept the alternative routes; the spicier unions join the Gilets Jaunes, students, et al. in defiant undeclared manifestations; the cops wait until most people go; and then they engage in running battles with the remaining few until the evening. But either the more-recent arrest and injury figures are currently undercounted, or there has been a steady decline in each since Oct 17.",
        ],
      },
      {
        kind: "p",
        runs: [
          "However, I think the police may have decided to try intelligence in place of violence for a change. They seem to be using kettling much more often, surrounding and tear-gassing protestors and then allowing them to exit only by allowing their identity card to be photographed and a fine for attending an illegal protest to be issued. The fixed-penalty fines are 135EUR, but I suspect their main objective is the IDs for intelligence collection and issuing future charges. Similarly, police in Brest ",
          {
            link: "seized the photo directories of several schools",
            href: BLOG,
          },
          ", for as-yet-unclear reasons. It’s worth noting that in France, it is illegal for the state to record ethnicity data and for employers to record lists of striking employees, both because of the experience in WWII where the French collaborator and German occupier governments used these lists to round up their enemies for deportation and worse. The fear in the back of everyone’s mind is the possibility that France will again have a far-right government next April, which ",
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
          "In terms of the historic comparisons (although the data here is less trustworthy; see the section below), the pension reform protests are interesting as, apparently, the only case where the protests were already ongoing for some time before the police repression began. The most obvious comparison to make is with the Gilets Jaunes (especially since the present movement has adopted the same Act-based structure), which managed to prolong a steadily decreasing weekly turnout for well over a year (and at one point had Macron ",
          { link: "considering escape by helicopter", href: HELICOPTER },
          "), but it’s hard to say what was achieved by doing so.",
        ],
      },
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
          "Do they want to influence elites? Do they want to focus on influencing next year’s elections? There is the presidential election in April, but the winner could well choose to call a snap legislative election just after. In this case, should work be undertaken to produce something like the Student List in Serbia?",
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
          "What are those demands? Just the original student demands? Or the whole programme of reversing the pension reforms, re-funding every sector, demilitarising the police, seeking justice for Palestine, etc.?",
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
      /* closing argument, in the author's own words */
      {
        kind: "p",
        runs: [
          "At the moment, I think a complete fizzling-out is unlikely. I think the most likely course is that this will continue for some time, with slowly diminishing turnout and some small concessions won here and there. Most people’s engagement will be limited to therapeutic marching, but the people who are politicised here will go on to develop new associations and be instrumental in future movements, as the former Gilets Jaunes have been here, and the 68-ers before them.",
        ],
      },
      {
        kind: "p",
        runs: [
          "But maybe, just maybe, the threat of an incoming fascist government and the memory of so many past underwhelming results will serve to focus minds and harden hearts in time to press home their present advantage and win lasting, significant wins. And just as mere ",
          { em: "resistance" },
          " in France has already spread like wildfire across Europe, a real victory in France could be the thing to spark a conflagration that burns down the old world and inaugurates the new.",
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
          "The biggest challenge has been finding reliable data sources. In particular, I want to highlight some issues with the injury data.",
        ],
      },
      {
        kind: "p",
        runs: [
          "The police are the only ones to publish official figures, but they make no distinction between: accidental & self-inflicted injuries, and those caused by protestors; nor the severity of injury. Potentially a good way to enrich this would be to compare with figures for injury-related work stoppages, but I don’t know when or where these might be published (and they would probably have to be compared against the non-uprising baseline to identify any excess). On the other hand, no official figures for violence against protestor exists. Deaths are obviously pretty easy to verify, but the exact causes can be unclear. For injuries, the most reliable data is compiled by Prof. Laurent Thines, and provides the floor of verified serious injuries. Some local street medic groups publish accounts of how many people they treated after large protests, but many of these will be for relatively minor things like ‘gave saline to rinse out teargas’; on the flipside, many people who receive saline or a Maalox squirt for the same thing won’t be recorded; and the street medic landscape is very fragmented, with multiple groups often operating in the same protests but not all reporting their figures afterwards.",
        ],
      },
      {
        kind: "p",
        runs: [
          "Damage is another tricky one, and also one of the most politicised. Wide-ranging figures are published shortly after the fact, but I suspect that if we wait a while we might be able to determine a more realistic floor by looking at the real insurance claim amounts (although that might exclude smaller stores that might not have insurance). And the estimates for policing costs should be taken as very rough, mainly determined by estimating the per-squadron cost of riot police deployment and scaling that up to the reported police deployment numbers. This also dovetails with the injury data problem, because we can’t make estimates for the cost of any subsequent sick leave (whether for police, protestors, or bystanders).",
        ],
      },
      {
        kind: "p",
        runs: [
          "Obviously, all of these issues are intensified when looking further back at historical events.",
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
          "I used MiniMax M3.1 Flash for research and DeepSeek V4.1 Flash for coding—thanks China! You can view my full development transcripts here:",
        ],
      },
      {
        kind: "ul",
        items: [
          [{ link: "initial development", href: "transcript-1.md" }],
          [{ link: "chart type selection", href: "transcript-2.md" }],
          [
            {
              link: "adding comparisons and translation",
              href: "transcript-3.md",
            },
          ],
          [{ link: "reviewing code", href: "transcript-4.md" }],
          [{ link: "reviewing sources", href: "transcript-5.md" }],
        ],
      },
      {
        kind: "p",
        runs: [
          "This project is hosted on ",
          { link: "GitHub Pages", href: PAGES },
          ". You can view the code ",
          { link: "here", href: REPO },
          ".",
        ],
      },
      {
        kind: "p",
        runs: [
          "The first draft of this project took me just over a day of pretty intense back-and-forth.",
        ],
      },
    ],
  },
];

export const SECTION_LABEL_EN = "Notes on this project";

/** Green counterweight to the amber disclaimer; the "…" continues its sentence. */
export const CALLOUT_EN =
  "…except for this section, which is 100% human written! (in English, and then machine translated)";

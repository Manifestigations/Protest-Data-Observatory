import type { Block } from "./model";

const SPOOK = "https://www.youtube.com/watch?v=HG-56GKbPtk&t=3896";

/** Quoted verbatim, so it stays in English in both locales. */
export const QUOTE: Block = {
  kind: "quote",
  paras: [
    [
      "In guerrilla warfare, the winning is in not losing. When you sleep on the floor, you can’t fall out of bed.",
    ],
    [
      "[We have to force them] to make a choice between the two things which he seems to dig most of all.",
    ],
    [
      "There is no way that [they] can police the world and keep us on our ass too unless we cooperate. When we revolt, we reduce it to a simple choice.",
    ],
    ["[The time for others to make a] choice is when we start."],
    [
      "If they don’t follow our program and turn us in to the cops we lose in a week.",
    ],
    [
      "[But if they support us] then it’s hit and run, harass and hound, and we can paralyze this country.",
    ],
  ],
  by: [
    "Dan “Turk” Freeman, ",
    { link: "The Spook Who Sat by the Door", href: SPOOK },
  ],
};

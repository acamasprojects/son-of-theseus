// The three named endings boss-lair's choices can produce, see the `ending`
// tag on a terminal choice outcome in src/data/encounters.js. Same shape
// discipline as loreFragments.js. src/utils/endingDisplay.js reads its
// titles from here too, so there's one place these names live, not two.

export const endings = [
  {
    id: "truth",
    title: "You Follow Him Out",
    body: "You carried the whole truth out instead of leaving it buried with him: the bones, the name, what it actually cost to stay a hero. Less glory than the version that made your father famous. More honesty than he ever managed.",
  },
  {
    id: "buried",
    title: "You Become the Story",
    body: "You walked out whole, victorious, exactly the way the story says you're supposed to. You let the official version stay whole too. Somewhere, someday, maybe someone else stands where you stood, wondering why nobody ever told them.",
  },
  {
    id: "broken",
    title: "The Labyrinth Claims You",
    body: "You understood, finally, exactly what your father let the world believe for the rest of his life to stay a hero. The understanding is the thing that broke you. Not a monster. Not a fight. Just the weight of it, arriving all at once.",
  },
];

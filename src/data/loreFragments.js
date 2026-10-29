// The Codex content pool. A fragment is granted when a choice's outcome
// carries a matching `loreFragmentId` (see src/data/encounters.js), see
// the id references there for which choices grant which fragment. Shown in
// full once found, shown locked ("???") until then, see CodexPanel.jsx.
//
// Purely informational, nothing here affects a future run's odds. The
// accumulation across descents is the whole point, same spirit as
// meta.totalRuns/deepestRoomReached.

export const loreFragments = [
  {
    id: "ariadne",
    title: "The One Who Solved It",
    body: "Ariadne. Not a footnote, not \"the princess who helped him.\" She studied Daedalus's work until she understood it better than its own architect did, and she gave that understanding away to a stranger who needed it more than she ever let herself need anything. Every version of this story that starts with Theseus entering the labyrinth is already halfway to a lie.",
  },
  {
    id: "seven-names",
    title: "Seven Names, and the Hand That Carved One Twice",
    body: "Seven names, scratched low on a wall by someone who had to crouch to reach it, afraid the whole time. One of them is carved twice, in two different hands, years apart by the wear. Someone came back. Someone remembered enough to come back and make sure a name that was already there didn't disappear with the dust.",
  },
  {
    id: "fourteen-a-year",
    title: "How Long This Has Actually Been Happening",
    body: "Fourteen a year. Not a single terrible toll paid once, the way the story likes to tell it, a debt settled and closed. A yearly accounting, for longer than anyone currently alive can confirm the start of. Whatever this place actually is, it was never a single crime. It was a schedule.",
  },
  {
    id: "what-he-never-said",
    title: "What a Hundred Tellings Left Out",
    body: "A hundred tellings, at least, feast to feast, court to court, and not one of them included a single name but his own. It wasn't modesty. A man who tells his own story a hundred times isn't a modest man. It was the only arrangement under which he could keep being the hero of it.",
  },
  {
    id: "asterion",
    title: "His Name Was Asterion",
    body: "Asterion. A name, carved by a hand that cared enough to carve it properly, found beside remains more human than the word \"Minotaur\" ever let anyone imagine. Whatever killed the fourteen a year for all those years, it wasn't him. He didn't do it. He was just the thing everyone agreed to be afraid of instead of the truth.",
  },
];

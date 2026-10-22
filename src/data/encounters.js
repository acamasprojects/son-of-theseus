// The content pool: every room the labyrinth can generate a run from. Tags
// mark where in a run an encounter belongs: 'start' is always first, one of
// 'boss' is always last, 'early'/'mid' fill the middle and get shuffled by
// src/utils/generateRun.js.
//
// This is placeholder content for the engine build. The real labyrinth gets
// written once the mechanics are solid — see the project README.
//
// Choice shape: `check` is optional. If present, `onFail` is required too
// (the check can go either way). If absent, only `onSuccess` is read, since
// there's nothing to fail.

export const encounters = [
  {
    id: "start-threshold",
    tags: ["start"],
    title: "The Threshold",
    body: "The door Theseus sealed behind him a generation ago groans open at your touch, as if it had been waiting. Dust. Old rope, frayed to nothing. Somewhere ahead, the walls remember him.",
    choices: [
      {
        text: "Step inside.",
        onSuccess: { threadDelta: 0, resultBody: "The dark takes you in. The door does not close behind you, there's nothing left to close it.", next: "continue" },
      },
    ],
  },
  {
    id: "early-rope",
    tags: ["early"],
    title: "A Frayed Thread",
    body: "A length of old twine, half-rotted, tied to a stone. Your father's, or someone's. It leads two directions, both dark.",
    choices: [
      {
        text: "Follow it the way he would have.",
        check: { stat: "memory", difficulty: 6 },
        onSuccess: { threadDelta: 1, resultBody: "You know this kind of choice. He always went toward the sound, not away from it. The path opens easier for it.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You guess wrong. The twine snaps in your hand, and whatever was left of his path here is gone.", next: "continue" },
      },
      {
        text: "Cut the thread and choose your own way.",
        onSuccess: { threadDelta: -1, resultBody: "You're not him. You go your own direction, and the dark presses in a little closer for it.", next: "continue" },
      },
    ],
  },
  {
    id: "early-weaver-mark",
    tags: ["early"],
    title: "The Weaver's Mark",
    body: "Scratches in the stone, not random, a pattern that repeats and almost resolves into sense before it doesn't. Daedalus built this place to be solved, once, by one man, with help he wasn't supposed to have. Everything since has been the maze trying to forget how.",
    choices: [
      {
        text: "Trace the pattern to where it breaks.",
        check: { stat: "cunning", difficulty: 6 },
        onSuccess: { threadDelta: 1, resultBody: "It breaks the same place it always did, where the help stopped being enough. You know the shape of the trap even if you can't see it yet.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You lose the thread of it, literally. There was a version of this exact pun your father would have made, and it makes you feel nothing but tired.", next: "continue" },
      },
      {
        text: "Ignore it. Patterns are how the place gets you thinking instead of moving.",
        onSuccess: { threadDelta: 0, resultBody: "You walk past something that wanted to be understood. It'll wait.", next: "continue" },
      },
    ],
  },
  {
    id: "early-seven-names",
    tags: ["early"],
    title: "Seven Names",
    body: "Scratched into the base of the wall, low, where a frightened hand would reach without standing: seven names, none of them his. The tribute paid before him, the ones the stories don't follow past the door.",
    choices: [
      {
        text: "Read them. All of them.",
        check: { stat: "memory", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "You read every name like it's owed to them. One of them, you realize, is carved twice, in two different hands. Someone else read this wall before you. Recently.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You read until the names blur into shapes that aren't letters anymore, and you can't tell if that's the dark or you.", next: "continue" },
      },
      {
        text: "Keep walking. They're not why you're here.",
        onSuccess: { threadDelta: -1, resultBody: "You're not wrong. You're also not sure that's true.", next: "continue" },
      },
    ],
  },
  {
    id: "early-narrowing",
    tags: ["early", "mid"],
    title: "The Narrowing",
    body: "The passage tightens, stone pressing from both sides until it's a question whether you fit at all. Somewhere past it, air moves, which means somewhere past it is a room.",
    choices: [
      {
        text: "Go sideways, exhale, trust your body.",
        check: { stat: "instinct", difficulty: 6 },
        onSuccess: { threadDelta: 0, resultBody: "Your body remembers how to be small before your mind decides to let it. You're through.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "You fight the stone instead of listening to it, and it wins the argument your skin will remember.", next: "continue" },
      },
      {
        text: "Force it straight on.",
        onSuccess: { threadDelta: -1, resultBody: "You make it through on will alone, which is a currency that doesn't spend the same way twice.", next: "continue" },
      },
    ],
  },
  {
    id: "early-bones",
    tags: ["early"],
    title: "What's Left",
    body: "Bones, old and picked clean, arranged too neatly to be an accident. Someone, or something, sorts its dead.",
    choices: [
      {
        text: "Keep moving, don't look too long.",
        check: { stat: "instinct", difficulty: 5 },
        onSuccess: { threadDelta: 0, resultBody: "Your body knows better than your curiosity does. You pass through untouched.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "You linger a moment too long, and something in the dark notices you noticing.", next: "continue" },
      },
      {
        text: "Look closer anyway.",
        check: { stat: "resolve", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "You make yourself look, and find a detail that steadies you more than it should: these are old. Older than your father's hunt. This place was killing people long before him.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You look. You wish you hadn't.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-echo",
    tags: ["mid"],
    title: "An Echo That Answers",
    body: "You call out, half-expecting silence. Something calls back, in a voice almost like an answer, almost like your own.",
    choices: [
      {
        text: "Answer it back, carefully.",
        check: { stat: "cunning", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "You choose your words the way you'd choose a foothold. Whatever it is, it quiets, satisfied, or confused, you can't tell which.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "Wrong words. The echo turns into something closer to a growl before it fades.", next: "continue" },
      },
      {
        text: "Say nothing. Keep walking.",
        onSuccess: { threadDelta: -1, resultBody: "The silence you leave behind feels like its own kind of answer. You don't like what it might mean.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-rest",
    tags: ["mid"],
    title: "A Still Room",
    body: "A chamber with no exits but the one you came in through, and the one ahead. No bones here. No dust disturbed in a long time. It feels, almost, safe.",
    choices: [
      {
        text: "Rest here a while.",
        onSuccess: { threadDelta: 2, resultBody: "You let yourself breathe. It helps more than it should.", next: "continue" },
      },
      {
        text: "Don't trust it. Keep moving.",
        check: { stat: "resolve", difficulty: 6 },
        onSuccess: { threadDelta: 0, resultBody: "You're right not to trust it, and right to move on. Nothing here was ever going to be free.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You talk yourself out of resting and regret it almost immediately.", next: "continue" },
      },
    ],
  },
  {
    id: "boss-lair",
    tags: ["boss"],
    title: "The Lair",
    body: "The walls open into something too large to be a room. Whatever lived here, whatever your father fought, left more of itself behind than any story said. You understand, standing here, that the stories were never about the monster. They were about what it takes to leave.",
    choices: [
      {
        text: "Find the way out your father found.",
        check: { stat: "instinct", difficulty: 8 },
        onSuccess: { threadDelta: 0, resultBody: "You find it. Not the thread, something older than that, a path worn into the stone by the only two feet that ever walked it twice. You follow your father out.", next: "end-escaped" },
        onFail: { threadDelta: -3, resultBody: "You don't find it, not in time. Whatever's left of this place decides it has waited long enough.", next: "end-dead" },
      },
    ],
  },
];

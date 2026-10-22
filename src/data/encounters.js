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
    id: "early-stopped-running",
    tags: ["early"],
    title: "Where He Stopped Running",
    body: "A wide landing, flatter than the passage should allow, like it was worn down by someone standing still a long time. Wax pooled in the seam of the floor, burnt all the way down. He waited here. Long enough to use up every torch he carried before he moved again.",
    choices: [
      {
        text: "Sit where he sat.",
        check: { stat: "resolve", difficulty: 6 },
        onSuccess: { threadDelta: 2, resultBody: "You let yourself feel what he must have felt, and it doesn't break you the way you were afraid it would. He was scared here. You can be scared here too and keep going.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You sit, and the stillness that held him starts to hold you too. It takes real effort to stand back up.", next: "continue" },
      },
      {
        text: "Keep moving. Stillness is how the place eats time.",
        onSuccess: { threadDelta: 0, resultBody: "You don't let yourself stop. Some part of you suspects that's exactly what kept him alive.", next: "continue" },
      },
    ],
  },
  {
    id: "early-what-you-came-for",
    tags: ["early"],
    title: "What You Came For",
    body: "A long stretch with nothing in it, which is its own kind of room. Nothing to solve, nothing to read, nothing but the question that's been walking behind you since the threshold: why are you actually here.",
    choices: [
      {
        text: "Answer honestly, even if it's not flattering.",
        check: { stat: "memory", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "It isn't to finish what he started. It isn't even really about him. You wanted to know if you'd survive something he never told you about. You might.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You reach for an answer and come up with three contradictory ones, none of them quite true. You're not ready to know yet, apparently.", next: "continue" },
      },
      {
        text: "Don't answer it. Some questions are for after.",
        onSuccess: { threadDelta: 0, resultBody: "You put it down. It doesn't stay down for long, but it stays down for now.", next: "continue" },
      },
    ],
  },
  {
    id: "early-two-doors",
    tags: ["early"],
    title: "Two Doors, No Names",
    body: "The passage splits clean in two, no marks, no draft, no sound favoring either side. Whatever decided this layout didn't leave you a reason.",
    choices: [
      {
        text: "Go left.",
        onSuccess: { threadDelta: -1, resultBody: "You go left for no better reason than it was closer to your right hand. The maze doesn't care about your reasons either way.", next: "continue" },
      },
      {
        text: "Go right.",
        onSuccess: { threadDelta: -1, resultBody: "You go right for no better reason than it wasn't left. As good a method as any, down here.", next: "continue" },
      },
    ],
  },
  {
    id: "early-riddle",
    tags: ["early"],
    title: "A Riddle in the Dark",
    body: "Words carved at head height, in a hand too deliberate to be panic. A riddle, or a warning wearing a riddle's shape, the kind of thing that's only safe to ignore if you're certain, and you're not.",
    choices: [
      {
        text: "Work it out.",
        check: { stat: "cunning", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "It's a warning, not a trap, plain once you see it. Heeding it spares you something you'll never know the shape of, which is the best kind of danger to survive.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "You solve it wrong, and worse, you solve it confidently. Being certain and being correct turn out to be different things down here.", next: "continue" },
      },
      {
        text: "Whatever built this wants you reading instead of moving. Walk past.",
        onSuccess: { threadDelta: 0, resultBody: "You'll never know if it would have helped. That's the trade for not finding out if it would have hurt.", next: "continue" },
      },
    ],
  },
  {
    id: "early-copper-smell",
    tags: ["early"],
    title: "The Smell of Copper",
    body: "A smell on the air, faint, unmistakable, old enough that it shouldn't still carry this far. Something bled here, or something bleeds still.",
    choices: [
      {
        text: "Follow your gut, not the straightest path.",
        check: { stat: "instinct", difficulty: 6 },
        onSuccess: { threadDelta: 1, resultBody: "Your body steers you around whatever left that smell before your mind finishes deciding to be afraid of it. You never find out what it was. You'd like to keep it that way.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "You second-guess the pull in your gut and walk the straight way instead. The smell gets stronger before the passage finally turns.", next: "continue" },
      },
      {
        text: "Ignore it. There's only one way through regardless.",
        onSuccess: { threadDelta: -1, resultBody: "Smell doesn't change geometry. You walk through it either way, you just do it with your eyes open this time.", next: "continue" },
      },
    ],
  },
  {
    id: "early-ariadne-loom",
    tags: ["early"],
    title: "Ariadne's Loom",
    body: "An old spindle, half-buried, the thread long since rotted to nothing. Not his. Not the thing he fought. Hers, the one who actually solved this place, who handed him the one tool that mattered and got left out of every version of the story that followed.",
    choices: [
      {
        text: "Take a moment for her.",
        onSuccess: { threadDelta: 1, resultBody: "No one carved her name into anything down here. He got the sword story. You're standing in the one piece of this place that was ever actually hers, and that has to be enough, because it's all there is.", next: "continue" },
      },
      {
        text: "Keep moving. It's rotted string, not a thread anymore, it won't help you.",
        onSuccess: { threadDelta: -1, resultBody: "You're probably right that it can't help you. You walk on anyway feeling like you left something unpaid.", next: "continue" },
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
    id: "mid-walls-remember-moving",
    tags: ["mid"],
    title: "The Walls Remember Moving",
    body: "The passage behind you doesn't match the one you walked a moment ago. Not gone, wrong, a door where there was wall, stairs where there was floor. Daedalus's genius was never the maze itself. It's that the maze is still being built.",
    choices: [
      {
        text: "Map it by feel, not by sight. Trust the pattern under the wrongness.",
        check: { stat: "cunning", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "You find the logic underneath it. The walls aren't moving at random, they're moving around something, and once you see that, you can move with it instead of against it.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You follow a certainty that turns out to be false, and you don't just lose ground, you lose track of how much. Time stops meaning what it meant a minute ago.", next: "continue" },
      },
      {
        text: "Stop. Don't move again until it stops moving.",
        onSuccess: { threadDelta: -1, resultBody: "You wait it out, which costs you, standing still down here always does, but it costs you less than guessing wrong would have.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-long-fall",
    tags: ["mid"],
    title: "The Long Fall",
    body: "A bridge, or what's left of one, over a dark deep enough that dropping a stone into it never answers the question of how deep.",
    choices: [
      {
        text: "Cross on what's left of it. Trust your feet over your eyes.",
        check: { stat: "instinct", difficulty: 8 },
        onSuccess: { threadDelta: 1, resultBody: "You cross clean, your body finding weight-bearing stone your eyes never would have picked out in time.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You go down with a stone that wasn't as solid as it looked, and claw your way back up on nothing but will. You're across. You're not the same amount of across you were a minute ago.", next: "continue" },
      },
      {
        text: "Find another way around, however long it takes.",
        onSuccess: { threadDelta: -2, resultBody: "The detour costs you real time and more of yourself than you expected a walk to cost. It also costs you nothing you can't afford to lose.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-didnt-make-it-out",
    tags: ["mid"],
    title: "What Didn't Make It Out",
    body: "A sandal, a single one, too small to be his, tangled in old rope near the drop. Not his. One of the fourteen he was supposed to bring home, who didn't make it as far as he did.",
    choices: [
      {
        text: "Carry it with you, as far as you can.",
        check: { stat: "resolve", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "It isn't about finishing some promise he made. It's about proving this place doesn't get to erase every single one of them.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "You carry it exactly long enough to understand you can't carry what it actually means, and you set it down anyway, heavier for having tried.", next: "continue" },
      },
      {
        text: "Leave it where it fell. You can't save what's already lost.",
        onSuccess: { threadDelta: -1, resultBody: "You're probably right. It still costs you something to be right about it.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-half-remembered-warning",
    tags: ["mid"],
    title: "The Half-Remembered Warning",
    body: "Something he said once, drunk, or grieving, you were never sure which, about this place. You didn't think you'd need it. You're standing in front of exactly the thing it was about, and you can almost, almost, get the words back.",
    choices: [
      {
        text: "Reach for the exact words, not just the shape of them.",
        check: { stat: "memory", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "It comes back whole, all at once, in his actual voice. Whatever you were supposed to do here, you do it right, because for one second you remembered him instead of just missing him.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You reach for it and get a different year, a different story, close enough to feel right and wrong enough to cost you. You act on a memory that wasn't the one you needed.", next: "continue" },
      },
      {
        text: "Don't trust half a memory. Guess fresh instead.",
        onSuccess: { threadDelta: -2, resultBody: "You let the half-remembered thing go and work it out on your own. Slower. Costlier. At least it's actually yours.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-air-runs-thin",
    tags: ["mid"],
    title: "Where the Air Runs Thin",
    body: "The passage narrows into something that was never built for breathing, old smoke and older dust caught with nowhere to go and no reason to settle.",
    choices: [
      {
        text: "Control your breathing. Move economical, not fast.",
        check: { stat: "instinct", difficulty: 8 },
        onSuccess: { threadDelta: 1, resultBody: "Your body rations itself without being told to. You're through before the thinness of it becomes a real problem.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You fight your own lungs the whole way, panic spending air faster than care would have, and you come out the other side having used more of yourself than the distance should have cost.", next: "continue" },
      },
      {
        text: "Push through fast before you think too hard about it.",
        onSuccess: { threadDelta: -2, resultBody: "Brute speed over technique. It works. It costs more than technique would have, but it works.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-turning-back",
    tags: ["mid"],
    title: "The Turning Back",
    body: "The passage behind you is still open. It would take less out of you to leave than to keep going. No one down here would know, or care, if you did.",
    choices: [
      {
        text: "Keep walking. It was never actually a question.",
        onSuccess: { threadDelta: 1, resultBody: "You don't dignify the thought with real consideration. The certainty of that costs you nothing. It might even be worth something.", next: "continue" },
      },
      {
        text: "Let yourself imagine turning back, just for a moment, before you keep going anyway.",
        onSuccess: { threadDelta: -1, resultBody: "You let the thought all the way in before you close the door on it yourself. Honesty like that isn't free down here, but you go on regardless.", next: "continue" },
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

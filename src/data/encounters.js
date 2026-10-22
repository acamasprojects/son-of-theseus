// The content pool: every room the labyrinth can generate a run from. Tags
// mark where in a run an encounter belongs: 'start' is always first, one of
// 'boss' is always last, 'early'/'mid' fill the middle and get shuffled by
// src/utils/generateRun.js.
//
// 'combat' is a separate, additional tag, not a tier, an encounter carries
// it alongside 'early' or 'mid' (e.g. tags: ["mid", "combat"]). It marks a
// confrontation with one of Daedalus's own degraded mechanical guardians,
// never a living creature, never Asterion, that distinction matters, see
// the lair's reveal. RunScreen shows a Combat badge when this tag is
// present. generateRun.js doesn't look at this tag at all, so adding or
// removing it never affects sequencing.
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
    body: "Old twine, tied to a stone, leading two directions, both dark. Not hers, Ariadne's rotted to nothing generations before this. Someone's, though. His, maybe, left behind on the way out, too relieved to be careful what he dropped.",
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
    id: "early-trick-of-light",
    tags: ["early"],
    title: "A Trick of the Light",
    body: "Three passages branch ahead, lit differently somehow, though you carry the only torch. You'd swear you can see further down one than the others. You'd also swear this place doesn't do anyone favors for free.",
    choices: [
      {
        text: "Work out which \"passage\" is just a reflection.",
        check: { stat: "cunning", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "You catch the trick, polished stone throwing your own torchlight back at you dressed up as distance. One fewer wrong turn than you'd have taken otherwise.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "You walk confidently toward the one that looked deepest, and the wall meets you a lot sooner than the light promised it would.", next: "continue" },
      },
      {
        text: "Test each one by throwing a stone first.",
        onSuccess: { threadDelta: -1, resultBody: "Slower, and a little undignified, and it works anyway.", next: "continue" },
      },
    ],
  },
  {
    id: "early-weight-of-doubt",
    tags: ["early"],
    title: "The Weight of Doubt",
    body: "For the first time since the threshold, you let yourself actually consider it: you might not make it out. Not might, in the abstract, the way everyone might. Might, specifically, right here, the way the air has started to feel.",
    choices: [
      {
        text: "Sit with the fear instead of pushing it down.",
        check: { stat: "resolve", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "Naming it honestly, actually looking at the shape of it, takes some of its power away. Not all. Enough.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "Naming it just makes it realer. You weren't ready for that version of honest yet.", next: "continue" },
      },
      {
        text: "Push it down. There's no room for that thought right now.",
        onSuccess: { threadDelta: -1, resultBody: "You put it away. It doesn't go far.", next: "continue" },
      },
    ],
  },
  {
    id: "early-losing-the-day",
    tags: ["early"],
    title: "Losing the Day",
    body: "You've stopped being able to guess how long you've been down here. Time doesn't pass in this place so much as accumulate, and you've lost the thread of counting it.",
    choices: [
      {
        text: "Count anyway, just to have something to hold onto.",
        onSuccess: { threadDelta: 1, resultBody: "You count, knowing it's probably wrong, needing it anyway.", next: "continue" },
      },
      {
        text: "Let it go. Counting was never going to get you out faster.",
        onSuccess: { threadDelta: -1, resultBody: "You let the number go. It doesn't come back.", next: "continue" },
      },
    ],
  },
  {
    id: "early-bones",
    tags: ["early"],
    title: "What's Left",
    body: "Bones, old, picked clean, arranged too carefully to be an accident, more tended than violent. No sign of teeth in any of them. You don't know what to make of that yet, only that your gut flags it before your mind does.",
    choices: [
      {
        text: "Keep moving. Don't look too long.",
        check: { stat: "instinct", difficulty: 6 },
        onSuccess: { threadDelta: 0, resultBody: "Your body knows better than your curiosity does. You pass through untouched.", next: "continue" },
        onFail: { threadDelta: -2, resultBody: "You linger a moment too long, and something about the arrangement gets under your skin anyway.", next: "continue" },
      },
      {
        text: "Look closer anyway.",
        check: { stat: "resolve", difficulty: 7 },
        onSuccess: { threadDelta: 1, resultBody: "You make yourself look, really look, and the detail that steadies you is the one that'll matter later, whatever did this wasn't eating.", next: "continue" },
        onFail: { threadDelta: -1, resultBody: "You look. You wish you hadn't, not yet, not without knowing what it means.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-echo",
    tags: ["mid"],
    title: "An Echo That Answers",
    body: "You call out, half-expecting silence. Something calls back, close enough to an answer to unsettle you, too shaped to be only stone. Not a voice. The memory of one, worn into the walls by however many years of being the only sound down here.",
    choices: [
      {
        text: "Answer it back, carefully.",
        check: { stat: "cunning", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "You choose your words the way you'd choose a foothold, and whatever's left to hear it seems, almost, satisfied.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "Wrong words, or no words would have been right. The echo sharpens into something closer to a sound you don't want to name before it fades.", next: "continue" },
      },
      {
        text: "Say nothing. Keep walking.",
        onSuccess: { threadDelta: -2, resultBody: "The silence you leave behind feels like its own kind of answer. You don't like what it might mean.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-rest",
    tags: ["mid"],
    title: "A Still Room",
    body: "A chamber with no exits but the one you came through and the one ahead. No bones here. No dust disturbed in a long time. It feels, almost, like the one room in this place that was never meant to hurt anyone.",
    choices: [
      {
        text: "Rest here a while.",
        onSuccess: { threadDelta: 2, resultBody: "You let yourself believe it, just for a minute. It helps more than it should.", next: "continue" },
      },
      {
        text: "Don't trust it. Keep moving.",
        check: { stat: "resolve", difficulty: 6 },
        onSuccess: { threadDelta: 0, resultBody: "You're right not to trust it, and right to move on. Nothing here was ever actually free.", next: "continue" },
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
    id: "mid-the-count",
    tags: ["mid"],
    title: "The Count",
    body: "Stones set into the floor, evenly spaced, except they aren't, not quite, some narrower than others in a pattern too deliberate to be wear. You remember, suddenly, your father counting under his breath once, years ago, a cadence that never made sense until right now.",
    choices: [
      {
        text: "Count it exactly the way he did.",
        check: { stat: "memory", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "The pattern holds. You cross on a rhythm that was never really yours, and it carries you anyway.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You misremember the count by one, and the floor doesn't forgive rounding errors.", next: "continue" },
      },
      {
        text: "Test each stone yourself, slow and careful.",
        onSuccess: { threadDelta: -2, resultBody: "Safer, and slower, and the kind of careful that costs you something just by taking this long.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-what-he-never-said",
    tags: ["mid"],
    title: "What He Never Said",
    body: "He told the story a hundred times, at feasts, to kings, to you. Not once, not a single telling, did he say any of their names. You're starting to understand the silence wasn't modesty. It was the only way he could keep telling it at all.",
    choices: [
      {
        text: "Decide you'll say them, when you tell this your way.",
        check: { stat: "resolve", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "It isn't much, a resolution made alone in the dark nobody else will ever confirm you kept. It's still more honesty than he ever managed, and that has to count for something.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You reach for the resolve to do it differently and come up short, and understand, a little, why he never reached for it either.", next: "continue" },
      },
      {
        text: "Let it go. It's his story, not yours to fix.",
        onSuccess: { threadDelta: -1, resultBody: "You're probably right. It still costs you something to decide that.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-weight-of-running",
    tags: ["mid"],
    title: "The Weight of Running",
    body: "Somewhere above, stone shifts, not falling, settling, which is worse, because settling stone doesn't stop on its own. The passage ahead is the only direction that isn't closing.",
    choices: [
      {
        text: "Run. Don't think about the ceiling, just the floor in front of you.",
        check: { stat: "instinct", difficulty: 8 },
        onSuccess: { threadDelta: 1, resultBody: "You make it through on legs that know better than to listen to how scared you are.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You don't move fast enough, and the ceiling takes a piece of the margin you thought you had.", next: "continue" },
      },
      {
        text: "Move steady. Trust the structure to hold a little longer than it looks like it will.",
        onSuccess: { threadDelta: -2, resultBody: "Slower, calculated, and right, this time, about how much longer it had.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-second-marking",
    tags: ["mid"],
    title: "The Second Marking",
    body: "A symbol scratched into the stone ahead, confident, deliberate, the kind of mark that wants to be trusted. It's pointing you somewhere with total certainty, and certainty, down here, has never once meant safety.",
    choices: [
      {
        text: "Trust your own reading over the mark's claim.",
        check: { stat: "cunning", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "You see it for what it is, bait left by something that benefits from confident travelers all going exactly one direction. You go the other way.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You follow it. It was exactly as confident, and exactly as wrong, as it looked.", next: "continue" },
      },
      {
        text: "Follow the mark. Someone left it for a reason.",
        onSuccess: { threadDelta: -2, resultBody: "The reason wasn't yours.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-stars-would-have-said",
    tags: ["mid"],
    title: "What the Stars Would Have Said",
    body: "No sky down here, no stars, but you remember him teaching you to read them anyway, insisting a sense of direction was a thing you built above ground so it would still work when you couldn't see anything at all.",
    choices: [
      {
        text: "Trust the direction his lessons left in you.",
        check: { stat: "memory", difficulty: 8 },
        onSuccess: { threadDelta: 2, resultBody: "It works, somehow. Direction holds even without a sky to check it against.", next: "continue" },
        onFail: { threadDelta: -3, resultBody: "You trusted a lesson built for open air, and it doesn't translate the way you needed it to down here.", next: "continue" },
      },
      {
        text: "Guess. The lessons were for somewhere else.",
        onSuccess: { threadDelta: -2, resultBody: "You're probably right that they don't apply. It costs you something to bet on that anyway.", next: "continue" },
      },
    ],
  },
  {
    id: "mid-just-the-walking",
    tags: ["mid"],
    title: "Just the Walking",
    body: "No puzzle here. No decision that actually matters. Just the walking, and how much of it there's already been, and how much there probably still is.",
    choices: [
      {
        text: "Let the rhythm of it carry you. Stop thinking for a while.",
        onSuccess: { threadDelta: 2, resultBody: "You stop narrating it to yourself. It helps more than thinking ever did.", next: "continue" },
      },
      {
        text: "Count the steps. Measuring it is its own kind of control.",
        onSuccess: { threadDelta: -1, resultBody: "You measure it instead, and the number you get back isn't the comfort you wanted it to be.", next: "continue" },
      },
    ],
  },
  {
    id: "boss-lair",
    tags: ["boss"],
    title: "The Lair",
    body: "The chamber doesn't open into violence. It opens into bones, old enough that moss has had a generation to soften them, a ribcage too human to have belonged to any bull. Horns, yes, fused at the skull, but wrong, the way a birth goes wrong, not the way a god's curse is supposed to look. Someone scratched a name into the stone beside the remains, in a hand gentler than hate. Not \"Minotaur.\" Not \"the beast.\" Asterion. A name, not a label.\n\nYou think of every room behind you. The long fall. The thin air. The weight you carried and set down. Fourteen a year, for years, and not one mark on these bones that looks like teeth. Whatever killed them, it wasn't waiting here to be fought. It was the maze itself, the whole time, exactly the way it almost took you.",
    choices: [
      {
        text: "Stay with it. Let it be true. Carry it out whole, whatever it costs you.",
        check: { stat: "resolve", difficulty: 8 },
        onSuccess: { threadDelta: 0, resultBody: "You hold it. All of it, your father's story amended in real time by the actual shape of a dead man's skull. You walk out with less glory than he came back with and more truth than he ever told anyone, including you.", next: "end-escaped", ending: "truth" },
        onFail: { threadDelta: -3, resultBody: "You try to hold it and it holds you instead. Not a monster. Not a fight. Just the unbearable, quiet weight of understanding exactly what your father let the world believe, for the rest of his life, to stay a hero.", next: "end-dead", ending: "broken" },
      },
      {
        text: "Leave it buried. Let the story stay what it's always been.",
        onSuccess: { threadDelta: -1, resultBody: "You walk out the way the story says you're supposed to. Whole. Victorious. No more honest than the version that would've sent thirteen more children in after you. Somewhere, someday, maybe your own son stands where you're standing now, reading a name scratched by a hand gentler than hate, wondering why nobody ever told him.", next: "end-escaped", ending: "buried" },
      },
    ],
  },
];

# Son of Theseus

A dialogue-driven survival roguelike. You play Acamas, son of Theseus, entering the labyrinth his
father once escaped, to retrace those steps and find out what's actually down there. Each descent
reshuffles the maze from a pool of encounters, so no two runs play out the same way. A single resource,
the Thread, represents your light, your nerve, and your body all together, and it only ever goes down
until a room gives you a reason to rest. Dialogue choices are sometimes gated by one of four stats
(Cunning, Resolve, Instinct, Memory), so who Acamas is changes what the labyrinth lets him do.

There's no combat system and no meta-progression between runs. Dying or escaping both end the
descent, and the next one starts fresh. What carries over is smaller: a sense of how many times you've
gone down, and how far you've gotten.

This is an early build. The engine works, but the labyrinth itself (the actual rooms, Theseus's
traces, the lair) is still mostly placeholder text while that gets written.

## Running it locally

You'll need [Node.js](https://nodejs.org) installed (v18+ recommended).

```bash
npm install
npm run dev
```

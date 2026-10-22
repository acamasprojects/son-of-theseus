// Builds one run's path: a fixed 'start' encounter, a stretch of 'early'
// encounters, then a stretch of 'mid' encounters (no immediate repeats
// anywhere, including across that boundary), and a fixed 'boss' encounter to
// close it out. Pure and seedable — `rng` defaults to Math.random for real
// play, but accepts any () => number in [0, 1) so tests can pass a
// deterministic generator instead.
//
// Early-then-mid is a deliberate sequencing choice, not just a content
// label: without it, a mid-tier room (harder, bigger Thread swings) could
// show up as the very first thing after the threshold, which undercuts the
// difficulty curve the two tiers were written to create. A dual-tagged room
// (tags include both 'early' and 'mid') is eligible for either half.

function pickRandom(pool, rng) {
  return pool[Math.floor(rng() * pool.length)];
}

/** Draws `count` encounters from `pool` into `path`, avoiding an immediate repeat of the last-picked id, falling back to a repeat only if the pool is too small to avoid it. Mutates `path` and returns the new last-picked id. */
function drawInto(path, pool, count, lastId, rng) {
  let last = lastId;
  for (let i = 0; i < count; i++) {
    const candidates = pool.filter((e) => e.id !== last);
    const picked = pickRandom(candidates.length > 0 ? candidates : pool, rng);
    path.push(picked.id);
    last = picked.id;
  }
  return last;
}

export function generateRun(encounterPool, rng = Math.random, { middleLength = 5 } = {}) {
  const start = encounterPool.filter((e) => e.tags.includes("start"));
  const earlyPool = encounterPool.filter((e) => e.tags.includes("early"));
  const midPool = encounterPool.filter((e) => e.tags.includes("mid"));
  const boss = encounterPool.filter((e) => e.tags.includes("boss"));

  if (start.length === 0) throw new Error("No 'start' encounter in the pool");
  if (boss.length === 0) throw new Error("No 'boss' encounter in the pool");
  if (earlyPool.length === 0) throw new Error("No 'early' encounters in the pool");
  if (midPool.length === 0) throw new Error("No 'mid' encounters in the pool");

  const path = [pickRandom(start, rng).id];
  const earlyCount = Math.ceil(middleLength / 2);
  const midCount = middleLength - earlyCount;

  let lastId = drawInto(path, earlyPool, earlyCount, path[0], rng);
  drawInto(path, midPool, midCount, lastId, rng);

  path.push(pickRandom(boss, rng).id);
  return path;
}

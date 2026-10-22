// Builds one run's path: a fixed 'start' encounter, a shuffled stretch of
// 'early'/'mid' encounters with no immediate repeats, and a fixed 'boss'
// encounter to close it out. Pure and seedable — `rng` defaults to
// Math.random for real play, but accepts any () => number in [0, 1) so
// tests can pass a deterministic generator instead.

function pickRandom(pool, rng) {
  return pool[Math.floor(rng() * pool.length)];
}

export function generateRun(encounterPool, rng = Math.random, { middleLength = 5 } = {}) {
  const start = encounterPool.filter((e) => e.tags.includes("start"));
  const middlePool = encounterPool.filter((e) => e.tags.includes("early") || e.tags.includes("mid"));
  const boss = encounterPool.filter((e) => e.tags.includes("boss"));

  if (start.length === 0) throw new Error("No 'start' encounter in the pool");
  if (boss.length === 0) throw new Error("No 'boss' encounter in the pool");
  if (middlePool.length === 0) throw new Error("No 'early' or 'mid' encounters in the pool");

  const path = [pickRandom(start, rng).id];
  let lastId = path[0];

  for (let i = 0; i < middleLength; i++) {
    // Avoid picking the same encounter twice in a row. If the pool is too
    // small to avoid it (a single middle encounter total), fall back to
    // the full pool rather than throw, repeats are fine, just not the
    // preference.
    const candidates = middlePool.filter((e) => e.id !== lastId);
    const picked = pickRandom(candidates.length > 0 ? candidates : middlePool, rng);
    path.push(picked.id);
    lastId = picked.id;
  }

  path.push(pickRandom(boss, rng).id);
  return path;
}

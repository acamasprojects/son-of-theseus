// Data model for Son of Theseus. Two things get persisted:
// - run: the current descent into the labyrinth (or null between runs)
// - meta: what survives across every descent (how many, how far)
//
// Follows the same emptyX()/normalize pattern as Campaign Forge and Incident
// Forge's src/data/model.js files — a factory per entity plus a defensive
// backfill function run on every load so older saved data never breaks the
// app when a field gets added later.

export const STATS = ["cunning", "resolve", "instinct", "memory"];
export const RUN_STATUSES = ["active", "dead", "escaped"];

export const STAT_LABEL = { cunning: "Cunning", resolve: "Resolve", instinct: "Instinct", memory: "Memory" };

const STARTING_STAT_VALUE = 2;
const STARTING_THREAD = 10;

/** Short random id. Good enough for a local-only store with nothing else to collide with. */
export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Every stat starts equal. Any differentiation between playthroughs comes from the choices you make, not a pre-run build. */
export function emptyStats() {
  return { cunning: STARTING_STAT_VALUE, resolve: STARTING_STAT_VALUE, instinct: STARTING_STAT_VALUE, memory: STARTING_STAT_VALUE };
}

/**
 * Resolves one stat check: roll 1-6, add the relevant stat, compare to the
 * encounter's difficulty. `rng` defaults to Math.random but can be swapped
 * for a seeded generator in tests, so this stays deterministic there.
 */
export function resolveCheck(statValue, difficulty, rng = Math.random) {
  const roll = Math.floor(rng() * 6) + 1;
  return { roll, total: roll + statValue, success: roll + statValue >= difficulty };
}

/** Applies a Thread delta, clamped to [0, maxThread]. The one place this math happens, so it can't drift between where it's applied and where it's tested. */
export function applyThreadDelta(thread, maxThread, delta) {
  return Math.max(0, Math.min(maxThread, thread + delta));
}

/**
 * One descent into the labyrinth. `path` is the already-generated sequence
 * of encounter ids for this run (see src/utils/generateRun.js) — emptyRun()
 * itself doesn't touch the encounter pool, it just takes the path as given,
 * same separation Incident Forge uses between a scenario and the run that
 * plays it.
 */
export function emptyRun(path) {
  return {
    id: uid(),
    path,
    thread: STARTING_THREAD,
    maxThread: STARTING_THREAD,
    stats: emptyStats(),
    currentIndex: 0,
    log: [],
    status: "active",
    startedAt: Date.now(),
    endedAt: null,
  };
}

/** Appends id to list if it's not already there, deduped. Pure, reused anywhere meta tracks "have I seen this before" (lore fragments, endings). */
export function addUnique(list, id) {
  if (list.includes(id)) return list;
  return [...list, id];
}

/** What survives across every descent. Not power progression, just a record of how many times you've gone down and how far. */
export function emptyMeta() {
  return {
    totalRuns: 0,
    deepestRoomReached: 0,
    loreFragmentsFound: [],
    endingsSeen: [],
  };
}

function normalizeStats(s) {
  const result = {};
  for (const stat of STATS) {
    result[stat] = typeof s?.[stat] === "number" ? s[stat] : STARTING_STAT_VALUE;
  }
  return result;
}

export function normalizeRun(r) {
  if (!r) return null;
  return {
    ...r,
    id: r.id || uid(),
    path: r.path || [],
    thread: typeof r.thread === "number" ? r.thread : STARTING_THREAD,
    maxThread: typeof r.maxThread === "number" ? r.maxThread : STARTING_THREAD,
    stats: normalizeStats(r.stats),
    currentIndex: r.currentIndex || 0,
    log: r.log || [],
    status: RUN_STATUSES.includes(r.status) ? r.status : "active",
    startedAt: r.startedAt || Date.now(),
    endedAt: r.endedAt || null,
  };
}

export function normalizeMeta(m) {
  return {
    totalRuns: m?.totalRuns || 0,
    deepestRoomReached: m?.deepestRoomReached || 0,
    loreFragmentsFound: m?.loreFragmentsFound || [],
    endingsSeen: m?.endingsSeen || [],
  };
}

/** The whole persisted store: the live run (or null between runs) plus what survives across runs. */
export function emptyStore() {
  return { run: null, meta: emptyMeta() };
}

export function normalizeStore(store) {
  return { run: normalizeRun(store?.run), meta: normalizeMeta(store?.meta) };
}

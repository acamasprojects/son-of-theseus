import { useState, useEffect, useCallback, useRef } from "react";
import { emptyStore, normalizeStore, emptyRun, uid, resolveCheck, applyThreadDelta } from "../data/model.js";
import { encounters } from "../data/encounters.js";
import { generateRun } from "../utils/generateRun.js";

const STORE_KEY = "son-of-theseus-data";

/**
 * Owns the full { run, meta } store, loads it from localStorage on mount and
 * debounce-persists it on every change. Same shape as Campaign Forge's
 * useCampaignStore and Incident Forge's useExerciseStore: one hook, one
 * mutation primitive, named action methods for the actual game moves,
 * components stay dumb.
 */
export function useGameStore() {
  const [loaded, setLoaded] = useState(false);
  const [store, setStore] = useState(() => emptyStore());
  const saveTimer = useRef(null);
  const latest = useRef(store);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setStore(normalizeStore(JSON.parse(raw)));
    } catch {
      // first run, or corrupt data — start fresh
    }
    setLoaded(true);
  }, []);

  const writeNow = useCallback((next) => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Son of Theseus: failed to save", e);
    }
  }, []);

  const persist = useCallback(
    (next) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => writeNow(next), 300);
    },
    [writeNow]
  );

  useEffect(() => {
    latest.current = store;
  }, [store]);

  useEffect(() => {
    if (!loaded) return;
    persist(store);
  }, [store, loaded, persist]);

  // Same flush-on-exit pattern as the other two projects: 'pagehide' covers
  // navigation/close, 'visibilitychange' covers backgrounding, together they
  // catch far more exit paths than 'beforeunload' alone.
  useEffect(() => {
    const flush = () => {
      if (!saveTimer.current) return;
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
      writeNow(latest.current);
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", flush);
    };
  }, [writeNow]);

  /** Apply fn to a shallow copy of the store and commit what it returns. */
  const update = useCallback((fn) => {
    setStore((prev) => fn({ ...prev }));
  }, []);

  /** Starts a fresh descent: generates a new procedural path and resets run state. Overwrites any existing run, there's only ever one live run. */
  const startRun = useCallback(() => {
    const path = generateRun(encounters);
    update((prev) => ({
      ...prev,
      run: emptyRun(path),
      meta: { ...prev.meta, totalRuns: prev.meta.totalRuns + 1 },
    }));
  }, [update]);

  /**
   * Resolves one choice: rolls a stat check if the choice has one, applies
   * the resulting Thread delta, logs what happened, and advances to the
   * next encounter or ends the run. Thread hitting zero always ends the run
   * as a death, regardless of what the choice's own outcome said, that
   * invariant lives here once instead of needing every piece of content to
   * get it right.
   */
  const makeChoice = useCallback(
    (choiceIndex) => {
      update((prev) => {
        if (!prev.run || prev.run.status !== "active") return prev;
        const encounter = encounters.find((e) => e.id === prev.run.path[prev.run.currentIndex]);
        const choice = encounter?.choices[choiceIndex];
        if (!choice) return prev;

        let checkResult = null;
        let outcome;
        if (choice.check) {
          checkResult = resolveCheck(prev.run.stats[choice.check.stat], choice.check.difficulty);
          outcome = checkResult.success ? choice.onSuccess : choice.onFail;
        } else {
          outcome = choice.onSuccess;
        }

        const newThread = applyThreadDelta(prev.run.thread, prev.run.maxThread, outcome.threadDelta);
        const logEntry = {
          id: uid(),
          encounterId: encounter.id,
          choiceText: choice.text,
          checkResult,
          resultBody: outcome.resultBody,
          threadDelta: outcome.threadDelta,
          at: Date.now(),
        };

        let status = prev.run.status;
        let nextIndex = prev.run.currentIndex;
        let endedAt = prev.run.endedAt;

        if (newThread <= 0) {
          status = "dead";
          endedAt = Date.now();
        } else if (outcome.next === "end-escaped") {
          status = "escaped";
          endedAt = Date.now();
        } else if (outcome.next === "end-dead") {
          status = "dead";
          endedAt = Date.now();
        } else {
          nextIndex = prev.run.currentIndex + 1;
          // Safety net: if the path runs out without an explicit ending
          // (shouldn't happen with well-formed content, since generateRun
          // always ends on a boss encounter), treat it as an escape rather
          // than leaving the run stuck with no current encounter.
          if (nextIndex >= prev.run.path.length) {
            status = "escaped";
            endedAt = Date.now();
          }
        }

        const updatedRun = { ...prev.run, thread: newThread, currentIndex: nextIndex, log: [...prev.run.log, logEntry], status, endedAt };
        const meta =
          status === "active" ? prev.meta : { ...prev.meta, deepestRoomReached: Math.max(prev.meta.deepestRoomReached, nextIndex) };

        return { ...prev, run: updatedRun, meta };
      });
    },
    [update]
  );

  return { loaded, store, startRun, makeChoice };
}

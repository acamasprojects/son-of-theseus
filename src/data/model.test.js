// Guards against the same bug class that hit the other two projects: a
// field added to an emptyX() factory without a matching backfill in its
// normalizeX() counterpart. Also covers the core game math (stat checks,
// Thread clamping), since that's the whole engine.
//
// Uses Node's built-in test runner, same reasoning as the other two
// projects: no new dependency, no version conflict with the Vite 5 pin.
//
// Run with: node --test

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  emptyStats,
  emptyRun,
  emptyMeta,
  emptyStore,
  normalizeRun,
  normalizeMeta,
  normalizeStore,
  resolveCheck,
  applyThreadDelta,
  addLoreFragment,
} from "./model.js";

/** Every field in `expected` must exist (and not be `undefined`) on `actual`. */
function assertFieldsBackfilled(actual, expected, label) {
  for (const field of Object.keys(expected)) {
    assert.notStrictEqual(actual[field], undefined, `${label} is missing a backfill for "${field}"`);
  }
}

describe("normalize functions backfill every field", () => {
  test("normalizeRun fills in every emptyRun() field for a bare run", () => {
    const normalized = normalizeRun({ id: "bare-id" });
    assertFieldsBackfilled(normalized, emptyRun(["a", "b"]), "run");
  });

  test("normalizeRun fills in every emptyStats() field for a run with bare stats", () => {
    const normalized = normalizeRun({ id: "bare-id", stats: {} });
    assertFieldsBackfilled(normalized.stats, emptyStats(), "stats");
  });

  test("normalizeRun returns null for a null run (between descents)", () => {
    assert.equal(normalizeRun(null), null);
  });

  test("normalizeMeta fills in every emptyMeta() field for bare meta", () => {
    const normalized = normalizeMeta({});
    assertFieldsBackfilled(normalized, emptyMeta(), "meta");
  });

  test("normalizeStore handles a store missing both fields entirely", () => {
    const normalized = normalizeStore({});
    assert.equal(normalized.run, null);
    assertFieldsBackfilled(normalized.meta, emptyMeta(), "meta");
  });

  test("normalizeStore handles undefined without crashing", () => {
    const normalized = normalizeStore(undefined);
    assert.equal(normalized.run, null);
  });
});

describe("resolveCheck", () => {
  test("succeeds when roll + stat meets the difficulty", () => {
    const rng = () => 0.99; // rolls a 6
    const result = resolveCheck(2, 8, rng); // 6 + 2 = 8, meets difficulty exactly
    assert.equal(result.roll, 6);
    assert.equal(result.total, 8);
    assert.equal(result.success, true);
  });

  test("fails when roll + stat falls short of the difficulty", () => {
    const rng = () => 0; // rolls a 1
    const result = resolveCheck(2, 8, rng); // 1 + 2 = 3, short of 8
    assert.equal(result.roll, 1);
    assert.equal(result.success, false);
  });

  test("a roll of exactly the difficulty threshold succeeds (>=, not >)", () => {
    const rng = () => 0.5; // rolls a 4 (floor(0.5*6)+1 = 4)
    const result = resolveCheck(3, 7, rng); // 4 + 3 = 7, meets difficulty exactly
    assert.equal(result.success, true);
  });
});

describe("applyThreadDelta", () => {
  test("adds a positive delta normally", () => {
    assert.equal(applyThreadDelta(5, 10, 2), 7);
  });

  test("subtracts a negative delta normally", () => {
    assert.equal(applyThreadDelta(5, 10, -2), 3);
  });

  test("clamps at 0, never goes negative", () => {
    assert.equal(applyThreadDelta(1, 10, -5), 0);
  });

  test("clamps at maxThread, never exceeds it", () => {
    assert.equal(applyThreadDelta(9, 10, 5), 10);
  });
});

describe("emptyStore", () => {
  test("starts with no run and fresh meta", () => {
    const store = emptyStore();
    assert.equal(store.run, null);
    assert.deepEqual(store.meta, emptyMeta());
  });
});

describe("addLoreFragment", () => {
  test("adds a new id to an empty list", () => {
    assert.deepEqual(addLoreFragment([], "ariadne"), ["ariadne"]);
  });

  test("adds a new id alongside existing ones", () => {
    assert.deepEqual(addLoreFragment(["ariadne"], "asterion"), ["ariadne", "asterion"]);
  });

  test("is a no-op for an id that's already there, no duplicate entry", () => {
    assert.deepEqual(addLoreFragment(["ariadne"], "ariadne"), ["ariadne"]);
  });

  test("doesn't mutate the array it was given", () => {
    const found = ["ariadne"];
    addLoreFragment(found, "asterion");
    assert.deepEqual(found, ["ariadne"]);
  });
});

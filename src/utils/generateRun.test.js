import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { generateRun } from "./generateRun.js";

// A small fixture pool, independent of the real content in
// src/data/encounters.js, so these tests don't break as that content grows.
// Early and mid are kept disjoint here so sequencing assertions are
// unambiguous.
const pool = [
  { id: "s1", tags: ["start"] },
  { id: "e1", tags: ["early"] },
  { id: "e2", tags: ["early"] },
  { id: "e3", tags: ["early"] },
  { id: "m1", tags: ["mid"] },
  { id: "m2", tags: ["mid"] },
  { id: "b1", tags: ["boss"] },
];

// A tiny deterministic PRNG (mulberry32) so these tests don't depend on
// real randomness — same seed always produces the same sequence.
function seededRng(seed) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("generateRun", () => {
  test("always starts with a 'start' encounter and ends with a 'boss' encounter", () => {
    const path = generateRun(pool, seededRng(1), { middleLength: 4 });
    assert.equal(path[0], "s1");
    assert.equal(path[path.length - 1], "b1");
  });

  test("draws the early half before the mid half", () => {
    // middleLength 4 -> ceil(4/2) = 2 early, then 2 mid
    const path = generateRun(pool, seededRng(42), { middleLength: 4 });
    const middle = path.slice(1, -1);
    assert.equal(middle.length, 4);
    for (const id of middle.slice(0, 2)) {
      assert.ok(["e1", "e2", "e3"].includes(id), `${id} should be in the early half`);
    }
    for (const id of middle.slice(2, 4)) {
      assert.ok(["m1", "m2"].includes(id), `${id} should be in the mid half`);
    }
  });

  test("an odd middleLength gives the early half the extra room", () => {
    // middleLength 5 -> ceil(5/2) = 3 early, 2 mid
    const path = generateRun(pool, seededRng(5), { middleLength: 5 });
    const middle = path.slice(1, -1);
    assert.equal(middle.length, 5);
    assert.equal(middle.slice(0, 3).every((id) => ["e1", "e2", "e3"].includes(id)), true);
    assert.equal(middle.slice(3, 5).every((id) => ["m1", "m2"].includes(id)), true);
  });

  test("never picks the same encounter twice in a row, including across the early/mid boundary", () => {
    const path = generateRun(pool, seededRng(7), { middleLength: 6 });
    for (let i = 1; i < path.length; i++) {
      assert.notEqual(path[i], path[i - 1], `encounter repeated back-to-back at index ${i}`);
    }
  });

  test("the same seed always produces the same path", () => {
    const pathA = generateRun(pool, seededRng(99), { middleLength: 5 });
    const pathB = generateRun(pool, seededRng(99), { middleLength: 5 });
    assert.deepEqual(pathA, pathB);
  });

  test("different seeds can produce different paths", () => {
    const pathA = generateRun(pool, seededRng(1), { middleLength: 5 });
    const pathB = generateRun(pool, seededRng(2), { middleLength: 5 });
    assert.notDeepEqual(pathA, pathB);
  });

  test("falls back to repeating when a half's pool has only one option", () => {
    const tinyPool = [
      { id: "s1", tags: ["start"] },
      { id: "e1", tags: ["early"] },
      { id: "m1", tags: ["mid"] },
      { id: "b1", tags: ["boss"] },
    ];
    const path = generateRun(tinyPool, seededRng(3), { middleLength: 4 });
    assert.deepEqual(path, ["s1", "e1", "e1", "m1", "m1", "b1"]);
  });

  test("a dual-tagged encounter (both early and mid) is eligible for either half", () => {
    const dualPool = [
      { id: "s1", tags: ["start"] },
      { id: "both", tags: ["early", "mid"] },
      { id: "e1", tags: ["early"] },
      { id: "b1", tags: ["boss"] },
    ];
    // 'both' is the only mid-tagged encounter, so it must appear in the mid half
    const path = generateRun(dualPool, seededRng(11), { middleLength: 4 });
    const midHalf = path.slice(-3, -1); // last 2 middle slots before boss
    assert.ok(midHalf.includes("both"));
  });

  test("throws a clear error when the pool has no 'start' encounter", () => {
    assert.throws(
      () => generateRun([{ id: "e1", tags: ["early"] }, { id: "m1", tags: ["mid"] }, { id: "b1", tags: ["boss"] }], Math.random),
      /start/
    );
  });

  test("throws a clear error when the pool has no 'boss' encounter", () => {
    assert.throws(
      () => generateRun([{ id: "s1", tags: ["start"] }, { id: "e1", tags: ["early"] }, { id: "m1", tags: ["mid"] }], Math.random),
      /boss/
    );
  });

  test("throws a clear error when the pool has no 'early' encounters", () => {
    assert.throws(
      () => generateRun([{ id: "s1", tags: ["start"] }, { id: "m1", tags: ["mid"] }, { id: "b1", tags: ["boss"] }], Math.random),
      /early/
    );
  });

  test("throws a clear error when the pool has no 'mid' encounters", () => {
    assert.throws(
      () => generateRun([{ id: "s1", tags: ["start"] }, { id: "e1", tags: ["early"] }, { id: "b1", tags: ["boss"] }], Math.random),
      /mid/
    );
  });
});

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { generateRun } from "./generateRun.js";

// A small fixture pool, independent of the real content in
// src/data/encounters.js, so these tests don't break as that content grows.
const pool = [
  { id: "s1", tags: ["start"] },
  { id: "e1", tags: ["early"] },
  { id: "e2", tags: ["early"] },
  { id: "m1", tags: ["mid"] },
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

  test("the middle section is drawn only from 'early'/'mid' encounters", () => {
    const path = generateRun(pool, seededRng(42), { middleLength: 4 });
    const middle = path.slice(1, -1);
    assert.equal(middle.length, 4);
    for (const id of middle) {
      assert.ok(["e1", "e2", "m1"].includes(id), `${id} should be an early/mid encounter`);
    }
  });

  test("never picks the same encounter twice in a row", () => {
    const path = generateRun(pool, seededRng(7), { middleLength: 10 });
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

  test("falls back to repeating when the middle pool has only one option", () => {
    const tinyPool = [{ id: "s1", tags: ["start"] }, { id: "e1", tags: ["early"] }, { id: "b1", tags: ["boss"] }];
    const path = generateRun(tinyPool, seededRng(3), { middleLength: 3 });
    assert.deepEqual(path, ["s1", "e1", "e1", "e1", "b1"]);
  });

  test("throws a clear error when the pool is missing a required tag", () => {
    assert.throws(() => generateRun([{ id: "e1", tags: ["early"] }], Math.random), /start/);
    assert.throws(() => generateRun([{ id: "s1", tags: ["start"] }, { id: "e1", tags: ["early"] }], Math.random), /boss/);
  });
});

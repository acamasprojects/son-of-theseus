// Guards the content pool itself, separate from the engine tests in
// model.test.js. Caught a real bug once already: a check with a difficulty
// of 9 when the max possible roll (6) plus the baseline stat (2) is 8,
// meaning it could never succeed no matter what was rolled. This test is
// what stops that from silently coming back as more content gets added.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { encounters } from "./encounters.js";
import { emptyStats } from "./model.js";
import { loreFragments } from "./loreFragments.js";
import { endings } from "./endings.js";

const MAX_ROLL = 6;
// All stats share the same starting value today (see emptyStats()). If that
// ever stops being true per-stat, this'd need to become per-stat too.
const BASELINE_STAT = emptyStats().cunning;
const MAX_POSSIBLE = MAX_ROLL + BASELINE_STAT;

describe("encounters content pool", () => {
  test("every check is actually winnable: difficulty never exceeds the best possible roll + baseline stat", () => {
    for (const encounter of encounters) {
      for (const choice of encounter.choices) {
        if (choice.check) {
          assert.ok(
            choice.check.difficulty <= MAX_POSSIBLE,
            `${encounter.id} choice "${choice.text}" has difficulty ${choice.check.difficulty}, but the best possible roll+stat is ${MAX_POSSIBLE}, this check could never succeed`
          );
        }
      }
    }
  });

  test("every encounter has at least one choice, and every choice has the outcome fields its check implies", () => {
    for (const encounter of encounters) {
      assert.ok(encounter.choices.length > 0, `${encounter.id} has no choices`);
      for (const choice of encounter.choices) {
        assert.ok(choice.onSuccess, `${encounter.id} choice "${choice.text}" is missing onSuccess`);
        if (choice.check) {
          assert.ok(choice.onFail, `${encounter.id} choice "${choice.text}" has a check but is missing onFail`);
        }
      }
    }
  });

  test("exactly one 'start' encounter and at least one 'boss' encounter exist", () => {
    const starts = encounters.filter((e) => e.tags.includes("start"));
    const bosses = encounters.filter((e) => e.tags.includes("boss"));
    assert.equal(starts.length, 1, "there should be exactly one entry point");
    assert.ok(bosses.length >= 1, "generateRun requires at least one 'boss' encounter");
  });

  test("every encounter id is unique", () => {
    const ids = encounters.map((e) => e.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate encounter ids found");
  });

  test("every loreFragmentId referenced on a choice outcome actually exists in loreFragments.js", () => {
    const validIds = new Set(loreFragments.map((f) => f.id));
    for (const encounter of encounters) {
      for (const choice of encounter.choices) {
        for (const outcome of [choice.onSuccess, choice.onFail]) {
          if (outcome?.loreFragmentId) {
            assert.ok(
              validIds.has(outcome.loreFragmentId),
              `${encounter.id} choice "${choice.text}" references loreFragmentId "${outcome.loreFragmentId}", which doesn't exist in loreFragments.js`
            );
          }
        }
      }
    }
  });

  test("every ending tag referenced on a choice outcome actually exists in endings.js", () => {
    const validIds = new Set(endings.map((e) => e.id));
    for (const encounter of encounters) {
      for (const choice of encounter.choices) {
        for (const outcome of [choice.onSuccess, choice.onFail]) {
          if (outcome?.ending) {
            assert.ok(
              validIds.has(outcome.ending),
              `${encounter.id} choice "${choice.text}" references ending "${outcome.ending}", which doesn't exist in endings.js`
            );
          }
        }
      }
    }
  });
});

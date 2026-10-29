// Shape guard for the Codex content pool, mirrors encounters.test.js's
// pattern. Catches a blank field or a copy-pasted duplicate id before it
// ships silently into the Codex.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { loreFragments } from "./loreFragments.js";

describe("loreFragments content pool", () => {
  test("every fragment has a non-empty id, title, and body", () => {
    for (const fragment of loreFragments) {
      assert.ok(fragment.id?.trim(), "a fragment is missing an id");
      assert.ok(fragment.title?.trim(), `${fragment.id} is missing a title`);
      assert.ok(fragment.body?.trim(), `${fragment.id} is missing a body`);
    }
  });

  test("every fragment id is unique", () => {
    const ids = loreFragments.map((f) => f.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate loreFragment ids found");
  });
});

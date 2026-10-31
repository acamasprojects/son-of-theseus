// Shape guard for the endings pool, mirrors loreFragments.test.js's pattern.
// Catches a blank field or a copy-pasted duplicate id before it ships
// silently into the Codex.

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { endings } from "./endings.js";

describe("endings content pool", () => {
  test("every ending has a non-empty id, title, and body", () => {
    for (const ending of endings) {
      assert.ok(ending.id?.trim(), "an ending is missing an id");
      assert.ok(ending.title?.trim(), `${ending.id} is missing a title`);
      assert.ok(ending.body?.trim(), `${ending.id} is missing a body`);
    }
  });

  test("every ending id is unique", () => {
    const ids = endings.map((e) => e.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate ending ids found");
  });
});

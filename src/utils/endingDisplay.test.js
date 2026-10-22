import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getEndingDisplay } from "./endingDisplay.js";

function runWithLastEntry(status, ending) {
  return { status, log: [{ ending }] };
}

describe("getEndingDisplay", () => {
  test("the truth ending gets its own title and the escaped status class", () => {
    const { title, statusClass } = getEndingDisplay(runWithLastEntry("escaped", "truth"));
    assert.equal(title, "You Follow Him Out");
    assert.equal(statusClass, "sot-end-status-escaped");
  });

  test("the buried ending gets its own title and its own (not escaped, not dead) status class", () => {
    const { title, statusClass } = getEndingDisplay(runWithLastEntry("escaped", "buried"));
    assert.equal(title, "You Become the Story");
    assert.equal(statusClass, "sot-end-status-buried");
    assert.notEqual(statusClass, "sot-end-status-escaped");
  });

  test("the broken ending gets its own title and the dead status class", () => {
    const { title, statusClass } = getEndingDisplay(runWithLastEntry("dead", "broken"));
    assert.equal(title, "The Labyrinth Claims You");
    assert.equal(statusClass, "sot-end-status-dead");
  });

  test("falls back to a generic escaped title/class when the last entry has no ending tag", () => {
    const { title, statusClass } = getEndingDisplay({ status: "escaped", log: [{}] });
    assert.equal(title, "You Follow Him Out");
    assert.equal(statusClass, "sot-end-status-escaped");
  });

  test("falls back to a generic dead title/class when the last entry has no ending tag", () => {
    const { title, statusClass } = getEndingDisplay({ status: "dead", log: [{}] });
    assert.equal(title, "The Labyrinth Claims You");
    assert.equal(statusClass, "sot-end-status-dead");
  });

  test("doesn't crash on an empty log", () => {
    const { title, statusClass } = getEndingDisplay({ status: "dead", log: [] });
    assert.equal(title, "The Labyrinth Claims You");
    assert.equal(statusClass, "sot-end-status-dead");
  });
});

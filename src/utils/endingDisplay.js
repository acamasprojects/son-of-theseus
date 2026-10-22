// Two different runs can share the same run.status ("escaped") while being
// genuinely different outcomes, the truth and the comfortable lie both get
// you out alive. The optional `ending` tag on a run's final log entry (set
// only on terminal choices, see boss-lair in encounters.js) lets this tell
// them apart instead of rendering identical framing for different endings.

const ENDING_TITLE = {
  truth: "You Follow Him Out",
  buried: "You Become the Story",
  broken: "The Labyrinth Claims You",
};

const ENDING_STATUS_CLASS = {
  truth: "sot-end-status-escaped",
  buried: "sot-end-status-buried",
  broken: "sot-end-status-dead",
};

/**
 * What EndScreen should show for a finished run: a title and a CSS class.
 * Prefers the specific `ending` tag on the final log entry. Falls back to a
 * generic title/class keyed on run.status alone for a run that ends without
 * one, which shouldn't happen today (every terminal choice in the content
 * pool sets one) but costs nothing to guard against older saved data.
 */
export function getEndingDisplay(run) {
  const lastEntry = run.log[run.log.length - 1];
  const ending = lastEntry?.ending;
  const dead = run.status === "dead";

  return {
    title: (ending && ENDING_TITLE[ending]) || (dead ? "The Labyrinth Claims You" : "You Follow Him Out"),
    statusClass: (ending && ENDING_STATUS_CLASS[ending]) || (dead ? "sot-end-status-dead" : "sot-end-status-escaped"),
  };
}

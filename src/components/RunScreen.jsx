import { useState } from "react";
import { encounters } from "../data/encounters.js";
import { loreFragments } from "../data/loreFragments.js";
import { STAT_LABEL } from "../data/model.js";

/**
 * The core loop: show the current encounter and its choices, resolve a pick
 * into a result, show that result before moving on. `acknowledgedLength`
 * tracks how much of the run's log this screen has already shown, so after
 * a choice resolves (which updates the store immediately) the result stays
 * on screen until the player clicks Continue, instead of jumping straight to
 * the next room. Reset to the run's current log length at mount, so this
 * only matters within one sitting, not across a reload.
 */
export default function RunScreen({ run, makeChoice }) {
  const [acknowledgedLength, setAcknowledgedLength] = useState(() => run.log.length);

  const showingResult = run.log.length > acknowledgedLength;
  const lastEntry = showingResult ? run.log[run.log.length - 1] : null;
  const currentEncounter = encounters.find((e) => e.id === run.path[run.currentIndex]);

  const threadPct = Math.round((run.thread / run.maxThread) * 100);
  const threadLow = run.thread <= run.maxThread * 0.3;

  const header = (
    <div className="sot-run-header">
      <div className="sot-thread-meter">
        <div className="sot-thread-label">
          The Thread — {run.thread} / {run.maxThread}
        </div>
        <div className="sot-thread-bar">
          <div className={`sot-thread-fill${threadLow ? " sot-thread-fill-low" : ""}`} style={{ width: `${threadPct}%` }} />
        </div>
      </div>
      <div className="sot-stat-row">
        {Object.entries(run.stats).map(([stat, value]) => (
          <div key={stat} className="sot-stat">
            <span className="sot-stat-value">{value}</span>
            <span>{STAT_LABEL[stat].slice(0, 3).toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (showingResult) {
    const foundFragment = lastEntry.loreFragmentId && loreFragments.find((f) => f.id === lastEntry.loreFragmentId);
    return (
      <div className="sot-shell">
        {header}
        <p className="sot-result-body">{lastEntry.resultBody}</p>
        {lastEntry.threadDelta !== 0 && (
          <div className={`sot-result-delta ${lastEntry.threadDelta > 0 ? "sot-result-delta-positive" : "sot-result-delta-negative"}`}>
            Thread {lastEntry.threadDelta > 0 ? "+" : ""}
            {lastEntry.threadDelta}
          </div>
        )}
        {foundFragment && <div className="sot-fragment-found">Lore fragment found: {foundFragment.title}</div>}
        <div className="sot-start-actions">
          <button type="button" className="sot-btn sot-btn-primary" onClick={() => setAcknowledgedLength(run.log.length)}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sot-shell">
      {header}
      <div className="sot-encounter-title-row">
        <h2 className="sot-encounter-title">{currentEncounter.title}</h2>
        {/* Combat encounters (Daedalus's degraded mechanical guardians, not
            a living creature, not Asterion) get a visible identity instead
            of being indistinguishable from any other hazard until you read
            the prose. */}
        {currentEncounter.tags.includes("combat") && <span className="sot-combat-badge">Combat</span>}
      </div>
      {/* Body text can carry a double-newline for a paragraph break, most
          rooms are one beat and don't need it, but some (the lair) earn the
          pacing a break gives. */}
      {currentEncounter.body.split("\n\n").map((paragraph, i) => (
        <p key={i} className="sot-encounter-body">
          {paragraph}
        </p>
      ))}
      <div className="sot-choice-list">
        {currentEncounter.choices.map((choice, index) => {
          // A choice with no plausible odds, even the best roll wouldn't
          // clear the difficulty, gets flagged rather than hidden. You can
          // still try it, Disco Elysium's point is that you're allowed to
          // fail badly, not that the game should stop you.
          const guaranteedFail = choice.check && run.stats[choice.check.stat] + 6 < choice.check.difficulty;
          return (
            <button key={index} type="button" className="sot-choice-btn" onClick={() => makeChoice(index)}>
              {choice.check && (
                <span className={`sot-choice-check-tag${guaranteedFail ? " sot-choice-check-tag-hard" : ""}`}>
                  {STAT_LABEL[choice.check.stat]} {choice.check.difficulty}+
                </span>
              )}
              {choice.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

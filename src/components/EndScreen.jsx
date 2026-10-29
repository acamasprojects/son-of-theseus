import { getEndingDisplay } from "../utils/endingDisplay.js";
import { loreFragments } from "../data/loreFragments.js";

export default function EndScreen({ run, meta, startRun, onViewCodex }) {
  const lastEntry = run.log[run.log.length - 1];
  const { title, statusClass } = getEndingDisplay(run);

  return (
    <div className="sot-shell">
      <div className={`sot-end-status ${statusClass}`}>{title}</div>
      <p className="sot-end-summary">{lastEntry?.resultBody}</p>
      <div className="sot-end-actions">
        <button type="button" className="sot-btn sot-btn-primary" onClick={startRun}>
          Descend Again
        </button>
      </div>
      <div className="sot-start-actions">
        <button type="button" className="sot-btn" onClick={onViewCodex}>
          Codex ({meta.loreFragmentsFound.length} / {loreFragments.length} found)
        </button>
      </div>
      {/* This is the only place these ever show once you're past your first
          visit, there's no separate "return to start" screen, an ended run
          just stays an ended run until you descend again. */}
      <div className="sot-meta-row">
        <span>
          Descents: <strong>{meta.totalRuns}</strong>
        </span>
        <span>
          Deepest reach: <strong>{meta.deepestRoomReached}</strong>
        </span>
      </div>
    </div>
  );
}

export default function EndScreen({ run, meta, startRun }) {
  const lastEntry = run.log[run.log.length - 1];
  const dead = run.status === "dead";

  return (
    <div className="sot-shell">
      <div className={`sot-end-status ${dead ? "sot-end-status-dead" : "sot-end-status-escaped"}`}>
        {dead ? "The Labyrinth Claims You" : "You Follow Him Out"}
      </div>
      <p className="sot-end-summary">{lastEntry?.resultBody}</p>
      <div className="sot-end-actions">
        <button type="button" className="sot-btn sot-btn-primary" onClick={startRun}>
          Descend Again
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

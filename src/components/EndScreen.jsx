export default function EndScreen({ run, startRun }) {
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
    </div>
  );
}

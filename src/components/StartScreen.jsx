export default function StartScreen({ meta, startRun }) {
  return (
    <div className="sot-shell">
      <h1 className="sot-title">Son of Theseus</h1>
      <div className="sot-subtitle">A Descent Into the Labyrinth</div>
      <p className="sot-blurb">
        Your father sealed this place behind him and never spoke of what he left inside it. You go in
        anyway, to retrace his steps, or to find out why he never could speak of them.
      </p>
      <div className="sot-start-actions">
        <button type="button" className="sot-btn sot-btn-primary" onClick={startRun}>
          Enter the Labyrinth
        </button>
      </div>
      {meta.totalRuns > 0 && (
        <div className="sot-meta-row">
          <span>
            Descents: <strong>{meta.totalRuns}</strong>
          </span>
          <span>
            Deepest reach: <strong>{meta.deepestRoomReached}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

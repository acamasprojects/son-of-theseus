import { loreFragments } from "../data/loreFragments.js";
import { endings } from "../data/endings.js";

/**
 * A found/locked list, shared by both sections below: entries in the pool's
 * definition order, found ones show title + body, undiscovered ones show
 * locked ("???", no body), so there's a visible sense of how much is left
 * without spoiling what it is.
 */
function CodexList({ pool, foundIds }) {
  return (
    <div className="sot-codex-list">
      {pool.map((entry) => {
        const found = foundIds.includes(entry.id);
        return (
          <div key={entry.id} className={`sot-codex-entry${found ? "" : " sot-codex-entry-locked"}`}>
            <div className="sot-codex-entry-title">{found ? entry.title : "???"}</div>
            {found && <p className="sot-codex-entry-body">{entry.body}</p>}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Two sections: lore fragments found across descents, and which of the
 * labyrinth's named endings you've actually reached. Reachable only from
 * the start and end screens. Purely informational, nothing here affects a
 * future run.
 */
export default function CodexPanel({ meta, onBack }) {
  return (
    <div className="sot-shell">
      <h1 className="sot-title">Codex</h1>
      <div className="sot-subtitle">
        {meta.loreFragmentsFound.length} / {loreFragments.length} fragments found
      </div>
      <CodexList pool={loreFragments} foundIds={meta.loreFragmentsFound} />
      <div className="sot-subtitle">
        {meta.endingsSeen.length} / {endings.length} endings seen
      </div>
      <CodexList pool={endings} foundIds={meta.endingsSeen} />
      <div className="sot-start-actions">
        <button type="button" className="sot-btn sot-btn-primary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

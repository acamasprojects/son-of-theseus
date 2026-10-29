import { loreFragments } from "../data/loreFragments.js";

/**
 * Every fragment in the pool, in definition order, found ones shown in
 * full, undiscovered ones shown locked ("???", no body). Reachable only
 * from the start screen. Purely informational, nothing here affects a
 * future run.
 */
export default function CodexPanel({ meta, onBack }) {
  return (
    <div className="sot-shell">
      <h1 className="sot-title">Codex</h1>
      <div className="sot-subtitle">
        {meta.loreFragmentsFound.length} / {loreFragments.length} found
      </div>
      <div className="sot-codex-list">
        {loreFragments.map((fragment) => {
          const found = meta.loreFragmentsFound.includes(fragment.id);
          return (
            <div key={fragment.id} className={`sot-codex-entry${found ? "" : " sot-codex-entry-locked"}`}>
              <div className="sot-codex-entry-title">{found ? fragment.title : "???"}</div>
              {found && <p className="sot-codex-entry-body">{fragment.body}</p>}
            </div>
          );
        })}
      </div>
      <div className="sot-start-actions">
        <button type="button" className="sot-btn sot-btn-primary" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

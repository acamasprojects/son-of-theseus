import { useState } from "react";
import { useGameStore } from "./hooks/useGameStore.js";
import StartScreen from "./components/StartScreen.jsx";
import RunScreen from "./components/RunScreen.jsx";
import EndScreen from "./components/EndScreen.jsx";
import CodexPanel from "./components/CodexPanel.jsx";

export default function App() {
  const { loaded, store, startRun, makeChoice } = useGameStore();
  // Only ever relevant between runs (Start or End), RunScreen always wins
  // over it below, there's no way to open the Codex mid-descent.
  const [showCodex, setShowCodex] = useState(false);

  if (!loaded) {
    return (
      <div className="sot-page">
        <div className="sot-loading">Entering…</div>
      </div>
    );
  }

  const runIsActive = store.run?.status === "active";
  const viewingCodex = !runIsActive && showCodex;

  return (
    <div className="sot-page">
      {viewingCodex && <CodexPanel meta={store.meta} onBack={() => setShowCodex(false)} />}
      {!viewingCodex && !store.run && (
        <StartScreen meta={store.meta} startRun={startRun} onViewCodex={() => setShowCodex(true)} />
      )}
      {!viewingCodex && runIsActive && <RunScreen run={store.run} makeChoice={makeChoice} />}
      {!viewingCodex && store.run && !runIsActive && (
        <EndScreen run={store.run} meta={store.meta} startRun={startRun} onViewCodex={() => setShowCodex(true)} />
      )}
    </div>
  );
}

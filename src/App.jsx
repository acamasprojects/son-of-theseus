import { useGameStore } from "./hooks/useGameStore.js";
import StartScreen from "./components/StartScreen.jsx";
import RunScreen from "./components/RunScreen.jsx";
import EndScreen from "./components/EndScreen.jsx";

export default function App() {
  const { loaded, store, startRun, makeChoice } = useGameStore();

  if (!loaded) {
    return (
      <div className="sot-page">
        <div className="sot-loading">Entering…</div>
      </div>
    );
  }

  return (
    <div className="sot-page">
      {!store.run && <StartScreen meta={store.meta} startRun={startRun} />}
      {store.run?.status === "active" && <RunScreen run={store.run} makeChoice={makeChoice} />}
      {store.run && store.run.status !== "active" && <EndScreen run={store.run} startRun={startRun} />}
    </div>
  );
}

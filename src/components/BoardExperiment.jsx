import { useRef, useState } from "react";
import { PlaygroundEasing, PlaygroundMotion } from "./PlaygroundExperiments";

const MODES = ["Easing", "Motion"];

export default function BoardExperiment() {
  const [mode, setMode] = useState(0);
  const tabsRef = useRef([]);

  function handleKeyDown(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - mode;
    setMode(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <div className="board-experiment">
      <div className="board-experiment-tabs" role="tablist" aria-label="Small experiments">
        {MODES.map((label, index) => (
          <button
            key={label}
            ref={(element) => { tabsRef.current[index] = element; }}
            type="button"
            role="tab"
            id={`board-experiment-tab-${index}`}
            aria-selected={mode === index}
            aria-controls="board-experiment-panel"
            tabIndex={mode === index ? 0 : -1}
            onClick={() => setMode(index)}
            onKeyDown={handleKeyDown}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="board-experiment-panel" role="tabpanel" aria-labelledby={`board-experiment-tab-${mode}`}>
        {mode === 0 ? <PlaygroundEasing /> : <PlaygroundMotion />}
      </div>
    </div>
  );
}

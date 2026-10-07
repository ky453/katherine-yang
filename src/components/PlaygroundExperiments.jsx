import { useState } from "react";

const CURVES = [
  { name: "linear", css: "linear" },
  { name: "ease-out", css: "cubic-bezier(.2,.8,.2,1)" },
  { name: "spring-ish", css: "cubic-bezier(.34,1.56,.64,1)" },
];

export function PlaygroundEasing() {
  const [run, setRun] = useState(0);
  const curve = CURVES[run % CURVES.length];

  return (
    <div className="easing-demo">
      <div className="easing-track" aria-hidden="true">
        <div key={run} className="easing-dot" style={{ animationTimingFunction: curve.css }} />
      </div>
      <div className="playground-experiment-controls">
        <output className="playground-current-curve" aria-label="Current easing" aria-live="polite">{curve.name}</output>
        <button
          type="button"
          className="easing-button"
          onClick={() => setRun((value) => value + 1)}
          aria-label={`Try next easing: ${CURVES[(run + 1) % CURVES.length].name}`}
        >
          try another <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export function PlaygroundMotion() {
  const [run, setRun] = useState(0);
  const replay = () => setRun((value) => value + 1);

  return (
    <button
      type="button"
      className="playground-motion-trigger"
      onClick={replay}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") replay(); }}
      aria-label="Replay spring and settle motion"
    >
      <span className="playground-settle-track" aria-hidden="true">
        <span key={run} className={`playground-settle-dot${run ? " playground-settle-dot--playing" : ""}`} />
      </span>
      <span className="motion-demo-label hand">try a small settle</span>
    </button>
  );
}

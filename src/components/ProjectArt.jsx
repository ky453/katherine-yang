function DoodleArrow() {
  return (
    <svg className="doodle-arrow" viewBox="0 0 120 70" aria-hidden="true">
      <path d="M5 17 C35 5, 57 7, 74 25 C84 36, 83 49, 77 58" />
      <path d="M63 49 L77 60 L89 46" />
    </svg>
  );
}

export function ProjectArt({ type }) {
  if (type === "cloudsky") {
    return (
      <div className="art-scene cloudsky-scene" aria-hidden="true">
        <div className="browser-card cloud-main">
          <div className="window-top">
            <i />
            <i />
            <i />
            <span>cloud gaming / billing</span>
          </div>
          <div className="mock-heading">Session balance</div>
          <div className="mock-balance">$ 4.20</div>
          <div className="mock-bar">
            <span />
          </div>
          <div className="mock-button">Add time</div>
        </div>

        <div className="note-card cloud-note">
          <span className="hand">product question</span>
          <strong>What happens when balance hits zero?</strong>
          <div className="scribble-line" />
        </div>

        <div className="browser-card cloud-small">
          <div className="window-top">
            <i />
            <i />
            <i />
          </div>
          <p>Low balance</p>
          <strong>8 min left</strong>
          <div className="tiny-pill">Top up →</div>
        </div>

        <div className="art-caption hand">less interruption, more play ↗</div>
      </div>
    );
  }

  if (type === "sidequest") {
    return (
      <div className="art-scene sidequest-scene" aria-hidden="true">
        <div className="budget-ticket">
          <span className="hand">tonight's constraint</span>
          <strong>$35</strong>
          <small>budget</small>
        </div>

        <div className="phone-frame phone-one">
          <div className="phone-notch" />
          <span className="tiny-label">SIDEQUEST</span>
          <h4>What are you in the mood for?</h4>
          <div className="choice">something spontaneous</div>
          <div className="choice">good food</div>
          <div className="choice">outdoors</div>
        </div>

        <div className="phone-frame phone-two">
          <div className="phone-notch" />
          <span className="tiny-label">FOR YOU</span>
          <div className="event-photo" />
          <h4>Sunset pottery</h4>
          <p>$28 · 1.4 mi</p>
          <div className="mock-button dark">Save quest</div>
        </div>

        <DoodleArrow />
        <span className="side-note hand">budget should shape discovery</span>
      </div>
    );
  }

  if (type === "honor") {
    return (
      <div className="art-scene honor-scene" aria-hidden="true">
        <div className="motion-track">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
        </div>

        <div className="motion-card frame-a">
          <div className="motion-dot" />
          <p>enter</p>
        </div>
        <div className="motion-card frame-b">
          <div className="motion-dot" />
          <p>guide</p>
        </div>
        <div className="motion-card frame-c">
          <div className="motion-dot" />
          <p>settle</p>
        </div>

        <div className="honor-word">motion</div>
        <span className="honor-note hand">movement with a reason</span>
      </div>
    );
  }

  /* Fallback for a future project that hasn't gotten a custom
     scene yet — keeps things from breaking or silently reusing
     someone else's artwork. */
  return (
    <div className="art-scene art-scene-placeholder" aria-hidden="true">
      <span className="hand">[artwork placeholder]</span>
    </div>
  );
}

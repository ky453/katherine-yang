import { useState } from "react";

function HonorAsset({ src, label, alt, sequence = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`honor-asset${sequence ? " honor-asset-sequence" : ""}`}>
      <div className="honor-asset-frame">
        {!loaded && (
          <div className="honor-asset-placeholder" aria-hidden="true">
            {sequence ? (
              <div className="honor-sequence">
                {["enter", "guide", "settle"].map((step, index) => (
                  <div className={`honor-sequence-frame honor-sequence-frame-${index + 1}`} key={step}>
                    <span className="honor-sequence-index">0{index + 1}</span>
                    <span className="honor-sequence-element" />
                    <span className="honor-sequence-label">{step}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="honor-placeholder-label">{label}</span>
            )}
          </div>
        )}
        <img
          src={src}
          alt={alt}
          hidden={!loaded}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <figcaption>
        <span>{label}</span>
        <code>{src}</code>
      </figcaption>
    </figure>
  );
}

export default function HonorCaseStudy() {
  return (
    <div className="honor-case-study">
      <section className="honor-section honor-overview" aria-labelledby="honor-overview-title">
        <div className="honor-section-label">
          <span>01</span>
          <span>Overview</span>
        </div>
        <div className="honor-section-content">
          <h2 id="honor-overview-title">Small movements set the rules.</h2>
          <p>At HONOR, I worked on motion for mobile product experiences.</p>
          <p>
            A lot of the work looked small on the surface: an onboarding transition, the timing
            of an element entering the screen, or how one state hands off to another.
          </p>
          <p>
            But once I started looking closely, I realized that motion creates rules. If the same
            kind of element moves three different ways in three different places, the interface
            starts to feel inconsistent even if each animation looks good by itself.
          </p>
        </div>
      </section>

      <section className="honor-section" aria-labelledby="honor-work-title">
        <div className="honor-section-label">
          <span>02</span>
          <span>What I worked on</span>
        </div>
        <div className="honor-section-content">
          <h2 id="honor-work-title">A little of the whole motion process.</h2>
          <ul className="honor-work-list">
            <li>Onboarding animation concepts</li>
            <li>Motion behavior for mobile interfaces</li>
            <li>Analyzing existing motion patterns</li>
            <li>Improving consistency across transitions</li>
            <li>Preparing motion assets for implementation</li>
            <li>Lottie / JSON handoff where appropriate</li>
          </ul>
        </div>
      </section>

      <section className="honor-section" aria-labelledby="honor-onboarding-title">
        <div className="honor-section-label">
          <span>03</span>
          <span>Onboarding</span>
        </div>
        <div className="honor-section-content">
          <h2 id="honor-onboarding-title">The sequence had to keep moving.</h2>
          <p>
            One area I worked on was onboarding. The challenge was not just making the first few
            screens look polished. The sequence also had to help the user understand what was
            happening without making them wait for the animation to finish.
          </p>
          <p>I paid attention to timing, sequence, where attention lands first, whether motion clarifies the next action, and whether the experience still feels fast.</p>
          <div className="honor-assets honor-assets-onboarding">
            <HonorAsset
              src="/assets/honor/onboarding-01.png"
              label="Onboarding · first moment"
              alt="Onboarding sequence visual, first moment"
              sequence
            />
            <HonorAsset
              src="/assets/honor/onboarding-02.png"
              label="Onboarding · next state"
              alt="Onboarding sequence visual, next state"
              sequence
            />
          </div>
        </div>
      </section>

      <section className="honor-section honor-system" aria-labelledby="honor-system-title">
        <div className="honor-section-label">
          <span>04</span>
          <span>Motion as a system</span>
        </div>
        <div className="honor-section-content">
          <h2 id="honor-system-title">Good motion is usually doing one job.</h2>
          <ul className="honor-job-list">
            <li>Show where something came from</li>
            <li>Explain that a state changed</li>
            <li>Guide attention</li>
            <li>Connect an action with its result</li>
          </ul>
          <p className="honor-system-intro">The more screens I looked at, the more I asked:</p>
          <ul className="honor-question-list">
            <li>Should similar elements enter in similar ways?</li>
            <li>When should movement feel physical?</li>
            <li>When should something change almost instantly?</li>
            <li>How much variation can exist before the product stops feeling consistent?</li>
          </ul>
          <p>This made me think about motion as a system rather than a collection of individual effects.</p>
          <HonorAsset
            src="/assets/honor/motion-system.png"
            label="Motion system example"
            alt="Diagram showing how similar interface elements can share motion behavior"
            sequence
          />
        </div>
      </section>

      <section className="honor-section" aria-labelledby="honor-handoff-title">
        <div className="honor-section-label">
          <span>05</span>
          <span>Handoff</span>
        </div>
        <div className="honor-section-content">
          <h2 id="honor-handoff-title">Motion has to survive handoff.</h2>
          <p>One useful part of the internship was seeing what happens after something looks right in Figma.</p>
          <p>I had to think about timing values, easing, asset structure, what could be reproduced reliably, what should be exported, and how Lottie / JSON could support implementation.</p>
          <HonorAsset
            src="/assets/honor/lottie-handoff.png"
            label="Lottie / JSON handoff"
            alt="Abstracted example of a motion asset prepared for implementation"
          />
        </div>
      </section>

      <section className="honor-section honor-tradeoffs" aria-labelledby="honor-tradeoffs-title">
        <div className="honor-section-label">
          <span>06</span>
          <span>Tradeoffs</span>
        </div>
        <div className="honor-section-content">
          <h2 id="honor-tradeoffs-title">Things I kept balancing</h2>
          <div className="honor-tension-list">
            <div><span>Expressive</span><span>vs.</span><span>Distracting</span></div>
            <div><span>Smooth</span><span>vs.</span><span>Slow</span></div>
            <div><span>Unique</span><span>vs.</span><span>Consistent</span></div>
          </div>
          <p className="honor-tradeoff-note">Most of the decisions were not about whether motion looked good. They were about how much was enough.</p>
        </div>
      </section>

      <section className="honor-section honor-reflection" aria-labelledby="honor-reflection-title">
        <div className="honor-section-label">
          <span>07</span>
          <span>Reflection</span>
        </div>
        <div className="honor-section-content">
          <h2 id="honor-reflection-title">What I notice now</h2>
          <p>
            Before this internship, I mostly noticed motion when it was obvious. Afterward, I
            started noticing the quieter things: how a panel enters, whether two states feel
            connected, whether the timing matches the action, or whether something should move
            at all.
          </p>
          <p>Now, when an interaction feels “off,” I often look at motion before I look at color or layout.</p>
        </div>
      </section>
    </div>
  );
}
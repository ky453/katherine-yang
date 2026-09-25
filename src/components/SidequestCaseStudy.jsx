function SidequestAsset({ label, path, className = "" }) {
  return (
    <figure className={`sidequest-asset ${className}`}>
      <div className="sidequest-asset-frame" aria-hidden="true">
        <span className="sidequest-asset-label hand">{label}</span>
        <span className="sidequest-asset-grid" />
      </div>
      <figcaption>
        <span>future material</span>
        <code>{path}</code>
      </figcaption>
    </figure>
  );
}

function SidequestCaseStudy() {
  return (
    <div className="sidequest-case-study">
      <section className="sidequest-opening">
        <div className="sidequest-opening-heading">
          <span className="sidequest-section-number">01 / 12</span>
          <span className="sidequest-role">Product / Design / Build</span>
          <h2>A discovery and memory product for figuring out what to do, without pretending budget does not matter.</h2>
        </div>
        <div className="sidequest-opening-copy">
          <p>
            Sidequest started from a simple frustration: there are endless apps for
            finding restaurants, events, stores, and things to do, but discovery often
            happens in separate places.
          </p>
          <p>
            One app helps me find an event. Another saves restaurants. Another tracks
            spending. Photos and memories live somewhere else. The experience felt
            fragmented.
          </p>
          <p className="sidequest-hand-note hand">What if discovery, planning, budget, and memory lived together?</p>
        </div>
      </section>

      <section className="sidequest-problem sidequest-band">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">02</span>
          <span className="hand">the problem</span>
        </div>
        <div>
          <h2>Recommendations ignore context.</h2>
          <p>
            People do not only ask, "What am I interested in?" They are also asking
            what fits their life right now.
          </p>
          <div className="sidequest-context-list">
            <span>too expensive</span>
            <span>too far away</span>
            <span>not enough time</span>
            <span>wrong mood</span>
            <span>already done something similar</span>
            <span>needs to be spontaneous</span>
          </div>
          <p className="sidequest-pullquote">
            A recommendation can match my interests and still be completely useless.
          </p>
        </div>
      </section>

      <section className="sidequest-principle">
        <span className="sidequest-section-number">03</span>
        <span className="hand">product principle</span>
        <h2>Discovery should understand constraints, not just preferences.</h2>
        <p>
          Budget should not be a filter hidden at the end of the experience. It should
          be part of the recommendation logic from the beginning.
        </p>
        <div className="sidequest-budget-mark">
          <span className="hand">tonight's constraint</span>
          <strong>$35</strong>
          <small>not a footnote</small>
        </div>
      </section>

      <section className="sidequest-questions">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">04</span>
          <span className="hand">working notes</span>
        </div>
        <div>
          <h2>The product kept getting clearer through questions.</h2>
          <div className="sidequest-question-wall">
            <p>What information should Sidequest ask for before recommending something?</p>
            <p>How much friction is acceptable before discovery starts?</p>
            <p>Should budget be a hard constraint or a preference?</p>
            <p>What happens if the best recommendation is slightly over budget?</p>
            <p>How personal can recommendations feel without a huge onboarding flow?</p>
            <p>When does an activity become a memory?</p>
            <p>Should journaling be automatic, prompted, or optional?</p>
            <p>How much financial tracking belongs in an activity app?</p>
          </div>
        </div>
      </section>

      <section className="sidequest-hierarchy sidequest-band-lavender">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">05</span>
          <span className="hand">defining Sidequest</span>
        </div>
        <div>
          <h2>I had to decide what the product actually was.</h2>
          <p>
            It could have become an event discovery app, social planning app, local
            recommendation app, personal journal, or spending tracker. Instead of
            making each direction equally important, I started defining a hierarchy.
          </p>
          <div className="sidequest-hierarchy-list">
            <div><span>CORE</span><strong>Discover something worth doing.</strong></div>
            <div><span>CONTEXT</span><strong>Make it fit the user's situation, including budget.</strong></div>
            <div><span>CONTINUITY</span><strong>Save, reflect on, and remember what actually happened.</strong></div>
          </div>
          <p className="sidequest-caveat hand">A working hierarchy, not a claim that the idea is finished.</p>
        </div>
      </section>

      <section className="sidequest-mvp">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">06</span>
          <span className="hand">product prioritization</span>
        </div>
        <div>
          <h2>More ideas than belonged in an MVP.</h2>
          <p>
            The useful constraint was deciding which features strengthened the core user
            problem and which ones created product sprawl.
          </p>
          <ol className="sidequest-mvp-list">
            <li><span>01</span><strong>Activity discovery</strong></li>
            <li><span>02</span><strong>Contextual recommendation inputs</strong></li>
            <li><span>03</span><strong>Budget-aware recommendations</strong></li>
            <li><span>04</span><strong>Save / plan an activity</strong></li>
            <li><span>05</span><strong>Lightweight post-activity memory</strong></li>
          </ol>
          <div className="sidequest-later">
            <span className="hand">later / still exploring</span>
            <p>ratings · richer financial tracking · social features · community events · deeper personalization · recommendation history</p>
          </div>
        </div>
      </section>

      <section className="sidequest-flow">
        <div className="sidequest-flow-heading">
          <span className="sidequest-section-number">07</span>
          <div>
            <span className="hand">user journey</span>
            <h2>From "I want to do something" to remembering it.</h2>
          </div>
        </div>
        <div className="sidequest-flow-map">
          <span>I want to do something</span><i>↓</i>
          <span>Tell Sidequest what matters right now</span><i>↓</i>
          <span>mood / time / budget / context</span><i>↓</i>
          <span>Get relevant activity suggestions</span><i>↓</i>
          <span>Explore → save / plan → do → remember</span>
        </div>
        <SidequestAsset label="user flow" path="/assets/sidequest/user-flow.png" className="sidequest-asset-wide" />
      </section>

      <section className="sidequest-process sidequest-band">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">08</span>
          <span className="hand">designing the product</span>
        </div>
        <div>
          <h2>Each stage answered a different product question.</h2>
          <div className="sidequest-process-list">
            <div><strong>Sketches</strong><span>What information belongs in the experience?</span><em>designed</em></div>
            <div><strong>Mid-fi</strong><span>Does the flow make sense before visual polish?</span><em>prototyped</em></div>
            <div><strong>UI system</strong><span>What needs to stay consistent as the product grows?</span><em>designed</em></div>
            <div><strong>High-fi</strong><span>What should Sidequest actually feel like?</span><em>prototyped</em></div>
            <div><strong>Build</strong><span>Which interactions reveal whether the concept works outside Figma?</span><em>planned</em></div>
          </div>
        </div>
      </section>

      <section className="sidequest-assets-grid">
        <SidequestAsset label="sketches" path="/assets/sidequest/sketches.jpg" />
        <SidequestAsset label="mid-fi flow" path="/assets/sidequest/midfi-flow.png" />
        <SidequestAsset label="high-fi discover" path="/assets/sidequest/hifi-discover.png" />
        <SidequestAsset label="high-fi budget" path="/assets/sidequest/hifi-budget.png" />
      </section>

      <section className="sidequest-change sidequest-band-lavender">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">09</span>
          <span className="hand">what changed</span>
        </div>
        <div>
          <h2>A polished interface can still feel anonymous.</h2>
          <p>
            The early visual direction felt too generic and too black-and-white. It did
            not have enough personality for a product about choosing how to spend your
            time. I iterated toward something younger, more contemporary, more
            expressive, and still usable.
          </p>
          <p>
            That shift taught me that visual polish is not the same thing as a coherent
            product identity.
          </p>
          <SidequestAsset label="visual direction studies" path="/assets/sidequest/visual-direction.jpg" className="sidequest-asset-wide" />
        </div>
      </section>

      <section className="sidequest-tradeoffs">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">10</span>
          <span className="hand">product tensions</span>
        </div>
        <div>
          <h2>Useful tensions, not solved slogans.</h2>
          <div className="sidequest-tradeoff-grid">
            <div><h3>Personalization <i>vs</i> friction</h3><p>More inputs can improve recommendations, but asking too much before showing value makes discovery feel like a form.</p></div>
            <div><h3>Budget accuracy <i>vs</i> flexibility</h3><p>A strict budget filter can hide worthwhile options; too much flexibility makes the constraint meaningless.</p></div>
            <div><h3>Discovery <i>vs</i> product sprawl</h3><p>Journaling, ratings, social planning, and expense tracking are interesting, but each pulls Sidequest toward a different category.</p></div>
            <div><h3>Structure <i>vs</i> spontaneity</h3><p>Planning should get easier without turning "what should we do tonight?" into another task-management workflow.</p></div>
          </div>
        </div>
      </section>

      <section className="sidequest-build sidequest-band">
        <div className="sidequest-section-label">
          <span className="sidequest-section-number">11</span>
          <span className="hand">building beyond Figma</span>
        </div>
        <div>
          <h2>Make it buildable, not just presentable.</h2>
          <p>
            Sidequest connects component thinking, interaction logic, React, and frontend
            implementation. The component system is not only about visual consistency;
            it is also about making the product easier to extend and eventually build.
          </p>
          <div className="sidequest-status-row">
            <span><b>designed</b> product direction, UI system</span>
            <span><b>prototyped</b> key interaction ideas</span>
            <span><b>planned</b> reusable implementation patterns</span>
            <span><b>implemented</b> this case-study surface</span>
          </div>
          <SidequestAsset label="UI kit / component library" path="/assets/sidequest/ui-kit.png" className="sidequest-asset-wide" />
          <SidequestAsset label="components + recommendation modules" path="/assets/sidequest/component-library.png" className="sidequest-asset-wide" />
        </div>
      </section>

      <section className="sidequest-outcome">
        <span className="sidequest-section-number">12</span>
        <span className="hand">where it is now / what I learned</span>
        <h2>An evolving 0→1 product process.</h2>
        <p>
          The outcome is a clearer product concept, a more coherent feature hierarchy,
          a design system, and a path from sketches toward higher-fidelity and
          interactive implementation. The idea still needs validation, and that is part
          of its current state.
        </p>
        <blockquote>
          Sidequest taught me that 0→1 product work is mostly deciding what not to build.
        </blockquote>
        <p>
          It was easy to imagine more features: social planning, reviews, spending
          insights, journaling, community events. The harder question was whether each
          feature strengthened the same user promise.
        </p>
        <p>
          I started thinking less about "what else could this app do?" and more about
          "what does this product need to be unusually good at?" That shift made the
          project much clearer.
        </p>
      </section>
    </div>
  );
}

export default SidequestCaseStudy;

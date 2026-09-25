function AssetPlaceholder({ label, path, className = "" }) {
  return (
    <figure className={`cloudsky-asset ${className}`}>
      <div className="cloudsky-asset-frame" aria-hidden="true">
        <span className="cloudsky-asset-mark hand">{label}</span>
        <span className="cloudsky-asset-rule" />
      </div>
      <figcaption>
        <span>future material</span>
        <code>{path}</code>
      </figcaption>
    </figure>
  );
}

function CloudSkyCaseStudy() {
  return (
    <div className="cloudsky-case-study">
      <section className="cloudsky-intro">
        <div>
          <span className="cloudsky-section-number">01 / 07</span>
          <span className="cloudsky-role">Product Management Intern</span>
          <h2>Keeping the player in the game</h2>
        </div>
        <p>
          CloudSky is a cloud-gaming product where players manage playtime, balances,
          queues, sessions, and payment while trying to stay immersed in the game.
        </p>
      </section>

      <section className="cloudsky-split cloudsky-split--mint">
        <div className="cloudsky-label">
          <span className="cloudsky-section-number">02</span>
          <span className="hand">the problem</span>
        </div>
        <div>
          <h2>A payment flow can look simple when everything goes right.</h2>
          <p>
            The more interesting product problem was what happened at the edges: low
            balance, expired time cards, switching payment methods, inaccurate
            remaining-time displays, or waiting in a queue longer than expected.
          </p>
          <p>
            As a Product Management Intern, I worked on improving parts of that
            experience, especially the moments where system logic became visible to the
            user.
          </p>
        </div>
      </section>

      <section className="cloudsky-wide-block">
        <div className="cloudsky-block-heading">
          <span className="cloudsky-section-number">03</span>
          <div>
            <span className="hand">what I noticed</span>
            <h2>When expectation and system behavior drift apart</h2>
          </div>
        </div>
        <div className="cloudsky-observation-grid">
          <p>Remaining playtime could look incorrect even when backend deduction was working correctly.</p>
          <p>Automatic payment-method switching could fail when a time card expired.</p>
          <p>Queue estimates did not always match the actual waiting experience.</p>
        </div>
        <p className="cloudsky-pullquote">
          "How should the product behave when the system reaches an edge case?"
        </p>
        <AssetPlaceholder
          label="journey map"
          path="/assets/cloudsky/journey-map.png"
          className="cloudsky-asset--wide"
        />
      </section>

      <section className="cloudsky-split">
        <div className="cloudsky-label">
          <span className="cloudsky-section-number">04</span>
          <span className="hand">what I worked on</span>
        </div>
        <div>
          <h2>Making the invisible rules discussable</h2>
          <ul className="cloudsky-list">
            <li>Mapped the customer journey across payment, balance, queue, session, and storage flows.</li>
            <li>Clarified expected product behavior, business rules, edge cases, and operational dependencies.</li>
            <li>Thought through time-card payment behavior, low-balance reminders, and automatic payment-method switching.</li>
            <li>Synthesized recurring user friction into product documentation and supported feature rollouts and user guidance.</li>
          </ul>
        </div>
      </section>

      <section className="cloudsky-artifact-grid">
        <AssetPlaceholder label="billing flow" path="/assets/cloudsky/billing-flow.png" />
        <AssetPlaceholder label="edge-case notes" path="/assets/cloudsky/edge-case-notes.png" />
      </section>

      <section className="cloudsky-decision-section">
        <div className="cloudsky-block-heading">
          <span className="cloudsky-section-number">05</span>
          <div>
            <span className="hand">product decisions</span>
            <h2>Continuity is the real payment experience</h2>
          </div>
        </div>
        <p className="cloudsky-lede">
          A good payment experience is not only about completing a transaction. It is
          also about preserving continuity.
        </p>
        <div className="cloudsky-question-grid">
          <div><span>01</span><p>When should we warn someone that their balance is low?</p></div>
          <div><span>02</span><p>What should happen before a time card expires?</p></div>
          <div><span>03</span><p>If another payment method is available, when should the product switch automatically?</p></div>
          <div><span>04</span><p>What does the user need to understand, and what should the system simply handle?</p></div>
        </div>
        <AssetPlaceholder
          label="low-balance reminder / payment switching"
          path="/assets/cloudsky/payment-switching-flow.png"
          className="cloudsky-asset--wide"
        />
      </section>

      <section className="cloudsky-split cloudsky-split--lavender">
        <div className="cloudsky-label">
          <span className="cloudsky-section-number">06</span>
          <span className="hand">how I worked</span>
        </div>
        <div>
          <h2>Between product logic and implementation</h2>
          <p>
            I translated user-facing problems into clearer expected behaviors,
            requirements, edge cases, and documentation that could be discussed across
            product and engineering.
          </p>
          <p>
            I also conducted competitor analysis across UX, pricing, support,
            community, promotions, and customer journeys.
          </p>
          <div className="cloudsky-note">
            <span className="hand">artifact trail</span>
            <strong>requirements / edge cases / competitor analysis</strong>
          </div>
        </div>
      </section>

      <section className="cloudsky-outcome">
        <span className="cloudsky-section-number">07</span>
        <span className="hand">outcome + reflection</span>
        <h2>Clearer rules for common moments and edge cases.</h2>
        <p>
          The outcome was a clearer and more consistent way to think through product
          logic across payment, balance, queue, and session scenarios. This was about
          making behaviors explicit and discussable, not claiming a quantitative
          business result.
        </p>
        <blockquote>
          Before this internship, I often thought about product problems through the
          interface first. CloudSky made me think much more about the system underneath
          it.
        </blockquote>
        <p>
          A confusing screen might actually be a business-rule problem. A failed
          interaction might come from an edge case nobody defined. A better experience
          sometimes means changing what the system does, not what the button looks like.
          That shift is one of the reasons I became more interested in product
          management.
        </p>
        <div className="cloudsky-final-assets">
          <AssetPlaceholder label="queue / session screens" path="/assets/cloudsky/queue-session-screens.png" />
          <AssetPlaceholder label="competitor analysis" path="/assets/cloudsky/competitor-analysis.png" />
        </div>
      </section>
    </div>
  );
}

export default CloudSkyCaseStudy;

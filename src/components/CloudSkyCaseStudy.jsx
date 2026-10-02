function CloudSkyCaseStudy() {
  return (
    <div className="cloudsky-case-study">
      <section className="cloudsky-intro">
        <div>
          <span className="cloudsky-section-number">01 / 06</span>
          <span className="cloudsky-role">Product Management Intern</span>
          <h2>Making cloud PC flows work across devices.</h2>
        </div>
        <p>
          CloudSky gives people a remote Windows computer for games and demanding
          applications. My work focused on making the product behavior clearer across
          PC, Mac, Android, and web touchpoints, from payment and remote-session
          controls to setup guidance.
        </p>
      </section>

      <section className="cloudsky-split cloudsky-split--mint">
        <div className="cloudsky-label">
          <span className="cloudsky-section-number">02</span>
          <span className="hand">the product question</span>
        </div>
        <div>
          <h2>One cloud computer, several very different contexts.</h2>
          <p>
            A customer might discover a configuration on a phone, pay on a desktop,
            and then use a remote Windows session from another device. Small differences
            in platform behavior can change what a user expects next.
          </p>
          <p>
            I translated those moments into explicit flows, rules, and exception states
            that could be reviewed across product and engineering.
          </p>
        </div>
      </section>

      <section className="cloudsky-wide-block">
        <div className="cloudsky-block-heading">
          <span className="cloudsky-section-number">03</span>
          <div>
            <span className="hand">workstreams</span>
            <h2>Designing the rules around the happy path.</h2>
          </div>
        </div>
        <div className="cloudsky-workstream-grid">
          <article>
            <span>01 · PAYMENTS</span>
            <h3>Alipay across PC, Mac, and Android</h3>
            <p>
              Defined desktop QR payment and Android app handoff, alongside WeChat,
              across paid products such as credits, time cards, storage, and bundles.
            </p>
          </article>
          <article>
            <span>02 · REMOTE WORKFLOW</span>
            <h3>Clipboard between local and cloud</h3>
            <p>
              Specified two-way text, image, and file transfer across PC, Mac, Android,
              and H5 while preserving familiar copy-and-paste behavior.
            </p>
          </article>
          <article>
            <span>03 · ANDROID CONTROLS</span>
            <h3>Preventing accidental zoom</h3>
            <p>
              Set fixed display as the default, with an explicit free-zoom option in
              settings that takes effect immediately and is remembered.
            </p>
          </article>
        </div>
      </section>

      <section className="cloudsky-split">
        <div className="cloudsky-label">
          <span className="cloudsky-section-number">04</span>
          <span className="hand">making edge states explicit</span>
        </div>
        <div>
          <h2>A useful spec says what happens when things do not go to plan.</h2>
          <ul className="cloudsky-list">
            <li>For payment: distinguish success, failure, cancellation, pending confirmation, and an expired QR code; prevent duplicate payment or fulfillment.</li>
            <li>For clipboard: sync only the latest user-copied item, stop on disconnect, avoid restoring old content, and fail file transfers without leaving partial files.</li>
            <li>For age checks: calculate whether someone has reached 18 from the full birth date, not birth year alone; do not complete verification for an underage user.</li>
            <li>For payment operations: define order fields, payment-method filtering, and original-route refunds where the product supports refunds.</li>
          </ul>
        </div>
      </section>

      <section className="cloudsky-decision-section">
        <div className="cloudsky-block-heading">
          <span className="cloudsky-section-number">05</span>
          <div>
            <span className="hand">make the behavior legible</span>
            <h2>Clear feedback, predictable recovery, fewer surprises.</h2>
          </div>
        </div>
        <p className="cloudsky-lede">
          I tried to make the system’s state visible at the exact moment a person needs
          to decide what to do next.
        </p>
        <div className="cloudsky-question-grid">
          <div><span>01</span><p>While payment is being confirmed, tell the user and prevent another submission.</p></div>
          <div><span>02</span><p>If payment is canceled or fails, explain that nothing was issued and offer a retry.</p></div>
          <div><span>03</span><p>If a file transfer breaks, report the failure without leaving a partial file behind.</p></div>
          <div><span>04</span><p>Keep age eligibility precise without exposing a rejected identity as verified.</p></div>
        </div>
      </section>

      <section className="cloudsky-split cloudsky-split--lavender">
        <div className="cloudsky-label">
          <span className="cloudsky-section-number">06</span>
          <span className="hand">documentation + reflection</span>
        </div>
        <div>
          <h2>Turn product logic into something people can use.</h2>
          <p>
            Alongside feature requirements, I drafted a user guide covering the
            product from sign-in and configuration selection through connection,
            session controls, and ending a cloud PC session.
          </p>
          <p>
            Writing both requirements and user-facing guidance helped me see the same
            product from two directions: what the system must do, and what a person
            needs to understand to move forward.
          </p>
        </div>
      </section>

      <section className="cloudsky-outcome">
        <span className="hand">what I took from the work</span>
        <h2>Good product work includes the moment after “something went wrong.”</h2>
        <blockquote>
          A clear interface depends on clear rules underneath it: what the system knows,
          what it should do next, and what it owes the user in the meantime.
        </blockquote>
        <p>
          These documents capture the product decisions and expected behaviors I worked
          through. They do not imply a launch or a measured business result.
        </p>
      </section>
    </div>
  );
}

export default CloudSkyCaseStudy;

export default function CloudSkyCaseStudy() {
  return (
    <div className="case-study">
      <section className="project-modal-section">
        <h2>Product and role</h2>
        <p>CloudSky provides remote Windows computers for games and demanding applications. I worked on product requirements and user guidance across PC, Mac, Android, and web, collaborating with design, engineering, and operations.</p>
        <p>I mapped customer journeys across payment, balance, queues, sessions, and storage, and organized user, support, community, and competitive feedback into product recommendations.</p>
      </section>
      <section className="project-modal-section">
        <h2>Payments</h2>
        <p>I defined Alipay flows alongside WeChat for credits, time cards, storage, and bundles, including desktop QR payment and Android app handoff.</p>
        <ul>
          <li>Distinguished success, failure, cancellation, pending confirmation, and expired QR codes.</li>
          <li>Specified duplicate-payment and fulfillment prevention, transaction records, and payment-method filters.</li>
          <li>Worked through supported original-route refunds, operational queries, reconciliation, and acceptance criteria.</li>
        </ul>
      </section>
      <section className="project-modal-section">
        <h2>Remote sessions and controls</h2>
        <ul>
          <li><strong>Clipboard:</strong> Specified two-way text, image, and file transfer across PC, Mac, Android, and H5 while preserving familiar copy-and-paste behavior.</li>
          <li><strong>Transfer failures:</strong> Sync only the latest copied item, stop on disconnect, avoid restoring stale content, and leave no partial files after failed transfers.</li>
          <li><strong>Android display:</strong> Made fixed display the default, with an explicit free-zoom setting that takes effect immediately and is remembered.</li>
          <li><strong>Age verification:</strong> Determine eligibility from the full birth date and prevent underage users from completing verification.</li>
        </ul>
      </section>
      <section className="project-modal-section">
        <h2>Persistent storage</h2>
        <p>I organized the data-disk journey from purchase and use through renewal, expiration, and reclamation. The documentation explained region-specific use, how repurchasing a package extends validity rather than capacity, and irreversible data loss when expired storage is reclaimed.</p>
      </section>
      <section className="project-modal-section">
        <h2>Documentation and release support</h2>
        <p>I drafted guidance covering sign-in, configuration selection, connection, session controls, and ending a cloud PC session. I also supported Android app-store update materials and publishing workflows.</p>
        <p>Writing requirements and user guidance together helped identify where system rules needed clearer explanations or recovery steps.</p>
      </section>
      <section className="project-modal-section">
        <h2>Results and scope</h2>
        <p>During the internship, daily new users grew 66%, active users 49%, and paying users 40%. These are product-wide figures for the period; the materials do not establish that my work caused those increases.</p>
        <p>My contribution was clarifying product behavior, edge cases, documentation, and release workflows, rather than independently developing every feature.</p>
      </section>
    </div>
  );
}

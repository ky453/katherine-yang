export default function SidequestCaseStudy() {
  return (
    <div className="case-study">
      <section className="project-modal-section">
        <h2>Problem</h2>
        <p>Activity discovery, restaurant lists, spending, and personal memories often live in separate apps. Recommendations may match someone’s interests while missing their budget, available time, location, or mood.</p>
        <p>Sidequest explores activity discovery that accounts for those constraints from the start, with a lightweight way to save what happened afterward.</p>
      </section>
      <section className="project-modal-section">
        <h2>Product priorities</h2>
        <p>I defined a hierarchy: discover an activity, make it fit the user’s current situation, and keep a memory afterward. This helped separate the core experience from a broader social app, journal, or spending tracker.</p>
        <ol>
          <li>Activity discovery</li>
          <li>Contextual recommendation inputs</li>
          <li>Budget-aware suggestions</li>
          <li>Save an activity for later</li>
          <li>Lightweight post-activity memory</li>
        </ol>
        <p>Ratings, richer financial tracking, social features, community events, deeper personalization, and recommendation history were considered for later iterations.</p>
      </section>
      <section className="project-modal-section">
        <h2>User journey</h2>
        <ol>
          <li>Decide to find an activity.</li>
          <li>Provide the relevant budget, time, mood, and location constraints.</li>
          <li>Review suggestions that fit the current situation.</li>
          <li>Choose or save an activity.</li>
          <li>Optionally keep a memory afterward.</li>
        </ol>
      </section>
      <section className="project-modal-section">
        <h2>Design process</h2>
        <p>Sketches helped organize the information; mid-fidelity prototypes explored the flow; a UI system established consistent components; and high-fidelity studies explored the visual direction.</p>
        <p>I moved from an early black-and-white direction toward a more expressive identity suited to an activity-discovery product. Reusable React components and implementation patterns remain planned.</p>
      </section>
      <section className="project-modal-section">
        <h2>Decisions and tradeoffs</h2>
        <ul>
          <li><strong>Personalization and friction:</strong> More inputs can improve suggestions, but a long onboarding flow delays value.</li>
          <li><strong>Budget accuracy and flexibility:</strong> A strict limit may hide worthwhile options; too much flexibility makes the constraint ineffective.</li>
          <li><strong>Discovery and scope:</strong> Journaling, social planning, and spending tools each pull the product toward a different purpose.</li>
          <li><strong>Structure and spontaneity:</strong> Planning should help people choose an activity without adding unnecessary steps.</li>
        </ul>
        <p>Open questions include which inputs are essential, whether budget is a hard constraint, how to handle over-budget recommendations, and whether memory-keeping should be automatic, prompted, or optional.</p>
      </section>
      <section className="project-modal-section">
        <h2>Status and next steps</h2>
        <ul>
          <li><strong>Designed:</strong> Product direction and a UI system.</li>
          <li><strong>Prototyped:</strong> Key interaction ideas.</li>
          <li><strong>Planned:</strong> Reusable implementation patterns.</li>
          <li><strong>Implemented:</strong> This portfolio case-study surface.</li>
        </ul>
        <p>The concept still needs user validation. It is not presented as a launched recommendation engine or a product with measured adoption.</p>
      </section>
    </div>
  );
}

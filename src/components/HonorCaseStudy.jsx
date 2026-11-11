export default function HonorCaseStudy() {
  return (
    <div className="case-study">
      <section className="project-modal-section">
        <h2>Role and scope</h2>
        <p>I designed and iterated onboarding interactions for phones, tablets, and foldable products, working with UI designers and engineers to balance user experience with implementation constraints.</p>
        <p>I also compared interaction patterns across consumer devices, using Gemini and Claude to support research synthesis and checking the findings through human review.</p>
      </section>
      <section className="project-modal-section">
        <h2>Onboarding across devices</h2>
        <p>I adjusted motion for differences in screen size, information layout, and user attention rather than simply enlarging a phone animation.</p>
        <ul>
          <li>Established which information should receive attention first.</li>
          <li>Refined timing, sequence, and state feedback without delaying the next action.</li>
          <li>Reviewed transitions with engineers and adapted designs to device and implementation constraints.</li>
        </ul>
      </section>
      <section className="project-modal-section">
        <h2>Motion consistency</h2>
        <p>I explored shared behaviors for similar interface elements: where they enter, how they connect states, and when movement should be subtle or immediate.</p>
        <ul>
          <li>Use motion to explain an element’s origin or a change in state.</li>
          <li>Guide attention and connect actions with their results.</li>
          <li>Balance expressiveness with distraction, smoothness with speed, and variation with consistency.</li>
        </ul>
      </section>
      <section className="project-modal-section">
        <h2>Prototyping and handoff</h2>
        <p>I used Figma and Lottie/JSON where appropriate to prepare motion for implementation. Handoff involved timing values, easing, asset structure, export choices, and checking what engineering could reproduce reliably.</p>
      </section>
      <section className="project-modal-section">
        <h2>What I learned</h2>
        <p>Motion needs consistent rules across screens and devices. Reviewing timing, state transitions, and engineering constraints became part of how I evaluate an interaction.</p>
      </section>
    </div>
  );
}

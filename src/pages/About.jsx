import { PhotoFigure, ExperienceSkills } from "../components/PersonalSections";
import { ABOUT_FACTS, ABOUT_INTRO } from "../data/profile";

export default function About() {
  return (
    <>
      <header className="page-heading">
        <span className="mini-label">KATHERINE YANG</span>
        <h1>About</h1>
      </header>
      <section className="about" id="about">
        <div className="about-lead">
          <span className="section-no">03</span>
          <h2>
            Information Science
            <br />
            <span className="plus">+</span> History of Art
          </h2>
          <p className="hand">a strange combination that makes a lot of sense</p>

          <ul className="about-facts">
            {ABOUT_FACTS.filter((fact) => !fact.value.startsWith("[")).map((fact) => (
              <li key={fact.label}>
                <span className="hand">{fact.label}</span> {fact.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-copy">
          <p>{ABOUT_INTRO}</p>
          <PhotoFigure
            path="/assets/photos/travel/italy-florence-2.jpg"
            alt="Katherine standing in front of Florence Cathedral"
            caption="Florence, looking up as usual."
            className="about-photo-feature"
            loading="eager"
          />
        </div>

        <ExperienceSkills />
      </section>
      <section className="thinking" id="thinking">
        <div className="section-intro light">
          <span className="section-no">02</span>
          <p>HOW I THINK</p>
          <span className="section-side">messy → legible</span>
        </div>

        <div className="thinking-grid">
          <div className="thinking-title">
            <p className="hand">my default loop</p>
            <h2>
              Find the real
              <br />
              <em>question first.</em>
            </h2>
          </div>

          <div className="process">
            <span className="process-note process-note-a hand">what are we actually solving?</span>

            <div className="process-step">
              <span>01</span>
              <strong>Discover</strong>
              <p>Look for the behavior underneath the request.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <span>02</span>
              <strong>Frame</strong>
              <p>Turn ambiguity into a question the team can act on.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <span>03</span>
              <strong>Make</strong>
              <p>Prototype enough to expose assumptions quickly.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <span>04</span>
              <strong>Learn</strong>
              <p>Use evidence to decide what deserves the next iteration.</p>
            </div>

            <span className="process-note process-note-b hand">build just enough to learn</span>
            <span className="process-note process-note-c hand">what would change my mind?</span>
            <span className="process-note process-note-d hand">not always linear :)</span>
          </div>
        </div>
      </section>
    </>
  );
}


import { PhotoFigure, ExperienceSkills } from "../components/PersonalSections";
import { ABOUT_FACTS, ABOUT_INTRO } from "../data/profile";

export default function About() {
  return (
    <>
      <header className="page-heading">
        <h1>About</h1>
      </header>
      <section className="about" id="about">
        <div className="about-lead">
          <h2>
            Information Science
            <br />
            <span className="plus">+</span> Art History
          </h2>

          <ul className="about-facts">
            {ABOUT_FACTS.filter((fact) => !fact.value.startsWith("[")).map((fact) => (
              <li key={fact.label}>
                <span>{fact.label}</span> {fact.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-copy">
          <p>{ABOUT_INTRO}</p>
          <PhotoFigure
            path="/assets/photos/travel/italy-florence-2.jpg"
            alt="Katherine standing in front of Florence Cathedral"
            caption="Florence, Italy"
            className="about-photo-feature"
            loading="eager"
          />
        </div>

        <ExperienceSkills />
      </section>
      <section className="about-process" aria-labelledby="about-process-title">
        <h2 id="about-process-title">How I work</h2>
        <ol>
          <li><h3>Research</h3><p>Understand user behavior, needs, and constraints.</p></li>
          <li><h3>Define</h3><p>Turn findings into a clear problem and product requirements.</p></li>
          <li><h3>Prototype</h3><p>Build enough to test assumptions and implementation choices.</p></li>
          <li><h3>Evaluate</h3><p>Use feedback and evidence to guide the next iteration.</p></li>
        </ol>
      </section>
    </>
  );
}


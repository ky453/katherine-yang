import { Currently, PhotoFigure } from "../components/PersonalSections";
import ProjectPreview from "../components/ProjectPreview";
import { ABOUT_INTRO, PLAYGROUND_PHOTOS } from "../data/profile";
import { FEATURED_PROJECTS, PROJECTS } from "../data/projects";
import { assetUrl } from "../lib/assets";

export default function Home() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-opening">
          <div className="hero-copy">
            <span className="kicker">Katherine Yang</span>
            <h1>
              Product manager,
              <br />
              <em>designer when needed,</em>
              <br />
              builder when useful.
            </h1>

            <div className="hero-intro-card">
              <span className="intro-label">INTRO</span>
              <p>
                I make things to understand <mark>how they work</mark>. I'm curious
                about what people expect from a product, and the <mark>small details</mark>
                {" "}that help them find their way.
              </p>
            </div>

            <a className="scroll-cue" href="#/work">
              take a look at the work <span>↓</span>
            </a>
          </div>

          <figure className="hero-portrait">
            <div className="portrait-image-shell">
              <img
                src={assetUrl("/assets/photos/me/head-shot.jpg")}
                alt="Katherine Yang, portrait"
                fetchPriority="high"
              />
            </div>
            <figcaption className="hand">currently in Ithaca, NY</figcaption>
          </figure>
        </div>
      </section>

      <Currently />
      <section className="home-section" aria-labelledby="featured-title">
        <div className="preview-section-heading">
          <h2 id="featured-title">A closer look at my work</h2>
          <a className="case-link" href="#/work">View all work →</a>
        </div>
        <div className="project-preview-grid project-preview-grid--featured">
          {FEATURED_PROJECTS.map((id) => (
            <ProjectPreview project={PROJECTS[id]} headingLevel={3} key={id} />
          ))}
        </div>
      </section>
      <section className="home-section home-about-preview" aria-labelledby="about-preview-title">
        <div>
          <span className="mini-label">ABOUT</span>
          <h2 id="about-preview-title">Information Science <span className="preview-plus">+</span> History of Art</h2>
          <p>{ABOUT_INTRO.slice(0, ABOUT_INTRO.indexOf(".") + 1)}</p>
          <a className="case-link" href="#/about">More about me →</a>
        </div>
        <PhotoFigure
          path="/assets/photos/travel/italy-florence-2.jpg"
          alt="Katherine standing in front of Florence Cathedral"
          caption="Florence, looking up as usual."
        />
      </section>
      <section className="home-section home-playground-preview" aria-labelledby="playground-preview-title">
        <div className="preview-section-heading">
          <div>
            <span className="mini-label">PLAYGROUND</span>
            <h2 id="playground-preview-title">A little less résumé. A little more me.</h2>
          </div>
          <a className="case-link" href="#/playground">Enter playground →</a>
        </div>
        <div className="playground-preview-photos">
          {PLAYGROUND_PHOTOS.slice(0, 2).map((photo) => (
            <PhotoFigure key={photo.id} {...photo} />
          ))}
        </div>
      </section>
    </>
  );
}

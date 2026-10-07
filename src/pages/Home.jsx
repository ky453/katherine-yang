import { Currently, PhotoFigure } from "../components/PersonalSections";
import ProjectPreview from "../components/ProjectPreview";
import { ABOUT_INTRO, PLAYGROUND_PHOTOS } from "../data/profile";
import { FEATURED_PROJECTS, PROJECTS } from "../data/projects";
import HomeHero from "../components/HomeHero";

export default function Home() {
  return (
    <>
      <HomeHero />

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

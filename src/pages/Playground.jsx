import { PhotoFigure, EasingExperiment, MotionStudy } from "../components/PersonalSections";
import { PLAYGROUND_PHOTOS } from "../data/profile";

export default function Playground() {
  return (
    <>
      <header className="page-heading">
        <span className="mini-label">THINGS I NOTICED</span>
        <h1>Playground</h1>
      </header>
      <section className="playground" id="playground">
        <div className="section-intro">
          <span className="section-no">+</span>
          <p>CAMERA ROLL, LOOSELY EDITED</p>
          <span className="section-side">things I noticed</span>
        </div>

        <div className="playground-copy">
          <h2>A little less résumé. A little more me.</h2>
          <p>
            Places, plates, people, and the visual details I keep bringing home.
            Not quite a travel diary, not quite a portfolio; just a few things
            I wanted to remember.
          </p>
        </div>

        <div className="photo-notebook" aria-label="Selected personal photographs">
          {PLAYGROUND_PHOTOS.map((photo) => (
            <PhotoFigure
              key={photo.id}
              path={photo.path}
              caption={photo.caption}
              alt={photo.alt}
              className={`notebook-photo notebook-photo--${photo.layout}`}
            />
          ))}
        </div>

        <div className="playground-experiments" aria-label="Small interaction experiments">
          <div className="scrap scrap--code">
            <span className="scrap-label">CODE EXPERIMENT</span>
            <span className="hand scrap-title">easing, felt</span>
            <EasingExperiment />
          </div>
          <div className="scrap scrap--motion">
            <span className="scrap-label">MOTION EXPERIMENT</span>
            <span className="hand scrap-title">a small motion study</span>
            <MotionStudy />
          </div>
          <span className="hand playground-margin-note">still collecting little things ↗</span>
        </div>
      </section>
    </>
  );
}


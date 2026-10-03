import { useState } from "react";
import { CURRENTLY_ITEMS, EXPERIENCE, SKILLS } from "../data/profile";
import { assetUrl } from "../lib/assets";

export function PhotoFigure({ path, caption, alt, className = "", loading = "lazy" }) {
  return (
    <figure className={`photo-figure ${className}`}>
      <div className="photo-frame">
        <img src={assetUrl(path)} alt={alt} loading={loading} />
      </div>
      <figcaption className="hand">{caption}</figcaption>
    </figure>
  );
}

export function Currently() {
  return (
    <section className="currently" aria-label="Currently">
      <div className="currently-inner">
        <span className="currently-kicker hand">currently →</span>
        <ul className="currently-list">
          {CURRENTLY_ITEMS.map((item) => (
            <li className="currently-item" key={item.label}>
              <span className="currently-label hand">{item.label}</span>
              <span className="currently-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EasingExperiment() {
  const curves = [
    { name: "linear", css: "linear" },
    { name: "ease-out", css: "cubic-bezier(.2,.8,.2,1)" },
    { name: "spring-ish", css: "cubic-bezier(.34,1.56,.64,1)" },
  ];
  const [index, setIndex] = useState(0);
  const curve = curves[index % curves.length];

  return (
    <div className="easing-demo">
      <div className="easing-track">
        <div
          key={index}
          className="easing-dot"
          style={{ animationTimingFunction: curve.css }}
        />
      </div>
      <button type="button" className="easing-button" onClick={() => setIndex((i) => i + 1)}>
        try “{curve.name}” →
      </button>
    </div>
  );
}

export function MotionStudy() {
  return (
    <div className="motion-demo" tabIndex={0} aria-label="Motion study">
      <div className="motion-demo-dot" />
      <span className="motion-demo-label hand">hover to settle</span>
    </div>
  );
}

export function ExperienceSkills() {
  return (
    <div className="experience-skills">
      <div className="exp-col">
        <span className="mini-label">EXPERIENCE</span>
        <ul className="exp-list">
          {EXPERIENCE.map((job) => (
            <li className="exp-item" key={job.org}>
              <span className="exp-org">{job.org}</span>
              <span className="exp-role">{job.role}</span>
              <span className="exp-meta">{job.meta}</span>
            </li>
          ))}
        </ul>
        <p className="exp-more">— more added as they happen —</p>
      </div>

      <div className="skills-col">
        <span className="mini-label">SKILLS</span>
        <div className="skills-grid">
          {SKILLS.map((group) => (
            <div className="skill-group" key={group.category}>
              <strong>{group.category}</strong>
              <p>{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


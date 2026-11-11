import { CURRENTLY_ITEMS, EXPERIENCE, SKILLS } from "../data/profile";
import { assetUrl } from "../lib/assets";

export function PhotoFigure({ path, caption, alt, className = "", loading = "lazy" }) {
  return (
    <figure className={`photo-figure ${className}`}>
      <div className="photo-frame">
        <img src={assetUrl(path)} alt={alt} loading={loading} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function Currently() {
  return (
    <section className="currently" aria-label="Currently">
      <div className="currently-inner">
        <span className="currently-kicker">Currently</span>
        <ul className="currently-list">
          {CURRENTLY_ITEMS.map((item) => (
            <li className="currently-item" key={item.label}>
              <span className="currently-label">{item.label}</span>
              <span className="currently-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
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
              {(job.dates || job.location) && (
                <span className="exp-meta">{[job.dates, job.location].filter(Boolean).join(" · ")}</span>
              )}
              <p className="exp-description">{job.description}</p>
            </li>
          ))}
        </ul>
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


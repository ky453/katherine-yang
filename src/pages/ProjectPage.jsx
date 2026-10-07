import { ProjectArt } from "../components/ProjectArt";
import ProjectContent from "../components/ProjectContent";
import ProjectNavigation from "../components/ProjectNavigation";
import { PROJECTS, PROJECT_ORDER } from "../data/projects";
import { assetUrl } from "../lib/assets";

export default function ProjectPage({ project }) {
  const index = PROJECT_ORDER.indexOf(project.id);
  const previous = PROJECTS[PROJECT_ORDER[(index - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length]];
  const next = PROJECTS[PROJECT_ORDER[(index + 1) % PROJECT_ORDER.length]];

  return (
    <article className="project-page">
      <header className="project-page-header">
        <a className="case-link" href="#/work">← Back to Work</a>
        <div className="project-modal-count">
          {String(index + 1).padStart(2, "0")} / {String(PROJECT_ORDER.length).padStart(2, "0")}
        </div>
        <h1 className="project-modal-title">{project.title}</h1>
        <p className="project-modal-eyebrow">
          {project.id === "honor" ? "UX and Motion Design Intern · Shenzhen" : project.eyebrow}
        </p>
        <p className="project-modal-question hand">
          {project.id === "honor" ? "When does motion actually help?" : project.question}
        </p>
      </header>
      <div className="project-page-art project-modal-art">
        {project.thumbnail ? (
          <img src={assetUrl(project.thumbnail)} alt="" />
        ) : (
          <ProjectArt type={project.art} />
        )}
      </div>
      <div className="project-modal-tags tag-row">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <ProjectContent project={project} />
      <div className="project-page-navigation">
        <a className="case-link" href="#/work">← Back to Work</a>
        <ProjectNavigation previous={previous} next={next} />
      </div>
    </article>
  );
}

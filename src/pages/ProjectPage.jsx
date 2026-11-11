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
        <h1 className="project-modal-title">{project.title}</h1>
        <p className="project-modal-eyebrow">
          {project.eyebrow}
        </p>
        <p className="project-page-summary">
          {project.summary}
        </p>
      </header>
      {project.thumbnail && <div className="project-page-art project-modal-art">
          <img src={assetUrl(project.thumbnail)} alt="" />
      </div>}
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

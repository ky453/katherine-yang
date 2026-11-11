import { assetUrl } from "../lib/assets";

export default function ProjectPreview({ project, headingLevel = 2 }) {
  const href = `#/projects/${project.id}`;
  const Heading = `h${headingLevel}`;
  return (
    <article className="project-preview">
      {project.thumbnail && <a className="project-preview-art" href={href} aria-label={`View ${project.title} case study`}>
          <img src={assetUrl(project.thumbnail)} alt="" loading="lazy" />
      </a>}
      <div className="project-meta">
        <span>{project.eyebrow}</span>
      </div>
      <Heading className="project-preview-title"><a className="project-title-link" href={href}>{project.title}</a></Heading>
      <p className="project-preview-summary">{project.summary}</p>
      <div className="tag-row">
        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <a className="case-link" href={href}>View case study <span aria-hidden="true">→</span></a>
    </article>
  );
}

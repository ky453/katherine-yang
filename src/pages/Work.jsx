import ProjectPreview from "../components/ProjectPreview";
import { projectList } from "../data/projects";

export default function Work() {
  return (
    <div className="portfolio-page work-page">
      <header className="page-heading">
        <span className="mini-label">PRODUCT DECISIONS IN PRACTICE · 2025–2026</span>
        <h1>Work</h1>
      </header>
      <div className="project-preview-grid project-preview-grid--work">
        {projectList.map((project) => <ProjectPreview project={project} key={project.id} />)}
      </div>
    </div>
  );
}

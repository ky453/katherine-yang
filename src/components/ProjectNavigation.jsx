export default function ProjectNavigation({ previous, next }) {
  return (
    <nav className="project-nav" aria-label="Project">
      <a className="project-nav-btn" href={`#/projects/${previous.id}`}>
        <span aria-hidden="true">←</span> Previous Project — {previous.title}
      </a>
      <a className="project-nav-btn" href={`#/projects/${next.id}`}>
        Next Project — {next.title} <span aria-hidden="true">→</span>
      </a>
    </nav>
  );
}

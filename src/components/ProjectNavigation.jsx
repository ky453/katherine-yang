export default function ProjectNavigation({
  prevTitle,
  nextTitle,
  onPrev,
  onNext,
  compact = false,
}) {
  return (
    <nav
      className={`project-nav ${compact ? "project-nav--compact" : ""}`}
      aria-label="Project"
    >
      <button type="button" className="project-nav-btn" onClick={onPrev}>
        <span aria-hidden="true">←</span>{" "}
        {compact ? "Prev" : `Previous project — ${prevTitle}`}
      </button>
      <button type="button" className="project-nav-btn" onClick={onNext}>
        {compact ? "Next" : `Next project — ${nextTitle}`}{" "}
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}

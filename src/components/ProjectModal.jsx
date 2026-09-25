import { useEffect, useRef } from "react";
import ModalShell from "./ModalShell";
import ProjectNavigation from "./ProjectNavigation";
import { ProjectArt } from "./ProjectArt";
import CloudSkyCaseStudy from "./CloudSkyCaseStudy";
import SidequestCaseStudy from "./SidequestCaseStudy";
import { PROJECTS, PROJECT_ORDER } from "../data/projects";

/**
 * Sequence loops: CloudSky → Sidequest → HONOR → CloudSky.
 * Previous/Next are always enabled rather than disabling at the
 * ends, since three projects is short enough that looping reads
 * as "keep browsing" rather than confusing.
 */
export default function ProjectModal({ open, activeId, onClose, onNavigate, restoreFocusRef }) {
  const project = activeId ? PROJECTS[activeId] : null;
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  // Every time the active project changes (including the very
  // first open), scroll the case study back to the top and move
  // focus to its heading so screen readers announce the new
  // content instead of silently swapping it under existing focus.
  useEffect(() => {
    if (!open || !project) return;
    if (contentRef.current) contentRef.current.scrollTop = 0;
    headingRef.current?.focus({ preventScroll: true });
  }, [open, activeId, project]);

  if (!project) {
    return (
      <ModalShell
        open={open}
        onClose={onClose}
        restoreFocusRef={restoreFocusRef}
        className="project-modal-shell"
      />
    );
  }

  const index = PROJECT_ORDER.indexOf(project.id);
  const total = PROJECT_ORDER.length;
  const prevProject = PROJECTS[PROJECT_ORDER[(index - 1 + total) % total]];
  const nextProject = PROJECTS[PROJECT_ORDER[(index + 1) % total]];

  const titleId = `modal-title-${project.id}`;
  const descId = `modal-desc-${project.id}`;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descId}
      restoreFocusRef={restoreFocusRef}
      className="project-modal-shell"
    >
      <div className="project-modal">
        <header className="project-modal-header">
          <div className="project-modal-header-top">
            <span className="project-modal-count">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            <ProjectNavigation
              compact
              prevTitle={prevProject.title}
              nextTitle={nextProject.title}
              onPrev={() => onNavigate(prevProject.id)}
              onNext={() => onNavigate(nextProject.id)}
            />

            <button
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Close project detail"
            >
              ×
            </button>
          </div>

          <h1
            id={titleId}
            className="project-modal-title"
            ref={headingRef}
            tabIndex={-1}
          >
            {project.title}
          </h1>
          <p className="project-modal-eyebrow">{project.eyebrow}</p>
          <p id={descId} className="project-modal-question hand">
            {project.question}
          </p>
        </header>

        <div className="project-modal-content" ref={contentRef}>
          <div className="project-modal-art">
            <ProjectArt type={project.art} />
          </div>

          <div className="project-modal-tags tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          {project.id === "cloudsky" ? (
            <CloudSkyCaseStudy />
          ) : project.id === "sidequest" ? (
            <SidequestCaseStudy />
          ) : (
            project.sections.map((section) => (
              <section className="project-modal-section" key={section.heading}>
                <h2>{section.heading}</h2>
                <p className={section.placeholder ? "project-modal-placeholder" : undefined}>
                  {section.body}
                </p>
              </section>
            ))
          )}

          <ProjectNavigation
            prevTitle={prevProject.title}
            nextTitle={nextProject.title}
            onPrev={() => onNavigate(prevProject.id)}
            onNext={() => onNavigate(nextProject.id)}
          />
        </div>
      </div>
    </ModalShell>
  );
}

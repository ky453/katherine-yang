import CloudSkyCaseStudy from "./CloudSkyCaseStudy";
import SidequestCaseStudy from "./SidequestCaseStudy";
import HonorCaseStudy from "./HonorCaseStudy";

const CASE_STUDIES = {
  cloudsky: CloudSkyCaseStudy,
  sidequest: SidequestCaseStudy,
  honor: HonorCaseStudy,
};

export default function ProjectContent({ project }) {
  const CaseStudy = CASE_STUDIES[project.id];
  if (CaseStudy) return <CaseStudy />;

  return project.sections.filter((section) => !section.placeholder).map((section) => (
    <section className="project-modal-section" key={section.heading}>
      <h2>{section.heading}</h2>
      <p>{section.body}</p>
    </section>
  ));
}

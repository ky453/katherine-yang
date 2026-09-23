import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ProjectArt } from "./components/ProjectArt";
import ProjectModal from "./components/ProjectModal";
import { PROJECT_ORDER, projectList } from "./data/projects";

/* ───────────────────────────────────────────────────────
   EDITABLE CONTENT
   Everything below is data. Update copy, links, and
   placeholders here without touching the components
   further down the file. Project content itself lives in
   src/data/projects.js.
   ─────────────────────────────────────────────────────── */

const CURRENTLY_ITEMS = [
  { label: "learning", text: "React / product analytics" },
  { label: "making", text: "Sidequest + this website" },
  {
    label: "thinking about",
    text: "why some tiny interactions make products feel dramatically better",
  },
  { label: "saving", text: "menus, packaging, interesting interfaces, typography, signs" },
];

const PLAYGROUND_ITEMS = [
  {
    id: "photo-01",
    type: "photo",
    path: "/assets/playground/photo-01.jpg",
    caption: "swap for a real photo",
  },
  {
    id: "note-01",
    type: "note",
    title: "things I keep taking pictures of",
    body: "signs / menus / windows / shadows",
  },
  {
    id: "code-01",
    type: "code",
    title: "easing, felt",
  },
  {
    id: "motion-01",
    type: "motion",
    title: "a small motion study",
  },
  {
    id: "travel-01",
    type: "travel",
    place: "[place]",
    note: "[what you noticed there]",
  },
  {
    id: "save-01",
    type: "save",
    title: "things I save",
    items: [
      "a menu with too much personality",
      "a sign that over-explains itself",
      "a button that feels too good to click",
    ],
  },
];

const ABOUT_FACTS = [
  { label: "based in", value: "Ithaca, NY" },
  { label: "grew up in", value: "[add: hometown]" },
  { label: "studying", value: "Information Science + History of Art, Cornell" },
];

const ABOUT_CARE_ABOUT = [
  "[add: a thing you care about]",
  "[add: a thing you care about]",
  "[add: a thing you care about]",
];

const ABOUT_ENJOY = [
  "[add: something you do outside school/work]",
  "[add: something you do outside school/work]",
  "[add: something you do outside school/work]",
];

const EXPERIENCE = [
  { org: "CloudSky", role: "Product Management Intern", meta: "2025" },
  { org: "HONOR", role: "UX / Motion Design Intern", meta: "2025" },
];

const SKILLS = [
  {
    category: "Product",
    items: ["Product strategy", "User research", "Prioritization", "Product requirements"],
  },
  {
    category: "Design",
    items: ["Figma", "Prototyping", "Interaction design", "Motion"],
  },
  {
    category: "Build",
    items: ["React", "JavaScript", "HTML/CSS", "Git & GitHub"],
  },
];

/* ───────────────────────────────────────────────────────
   SMALL SHARED COMPONENTS
   ─────────────────────────────────────────────────────── */

function PhotoPlaceholder({ path, caption, className = "" }) {
  return (
    <figure className={`photo-placeholder ${className}`}>
      <div className="photo-placeholder-box" aria-hidden="true">
        <span className="hand">photo</span>
      </div>
      <figcaption>
        {caption}
        <code>{path}</code>
      </figcaption>
    </figure>
  );
}

/* ───────────────────────────────────────────────────────
   CURRENTLY — small editorial interlude after the hero
   ─────────────────────────────────────────────────────── */

function Currently() {
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

/* ───────────────────────────────────────────────────────
   SELECTED WORK
   Clicking the artwork, title, or "View product story"
   opens the project's modal instead of following the href.
   The href itself is a real, working "?view=id" URL, so
   modifier-clicking (open in new tab, etc.) still works
   the way people expect from a link.
   ─────────────────────────────────────────────────────── */

function isPlainLeftClick(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function Project({ project, onOpen }) {
  const handleClick = (event) => {
    if (!isPlainLeftClick(event)) return;
    event.preventDefault();
    onOpen(project.id, event.currentTarget);
  };

  return (
    <article className="project" id={project.id}>
      <div className="project-meta">
        <span>{project.number}</span>
        <span>{project.eyebrow}</span>
      </div>

      <div className="project-heading">
        <h2>
          <a className="project-title-link" href={`?view=${project.id}`} onClick={handleClick}>
            {project.title}
          </a>
        </h2>
        <p>{project.question}</p>
      </div>

      <a
        className={`project-art ${project.art}`}
        href={`?view=${project.id}`}
        onClick={handleClick}
      >
        <ProjectArt type={project.art} />
      </a>

      <div className="project-footer">
        <p>{project.summary}</p>

        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <a className="case-link" href={`?view=${project.id}`} onClick={handleClick}>
          View product story <span>↗</span>
        </a>
      </div>
    </article>
  );
}

/* ───────────────────────────────────────────────────────
   CREATIVE SPACE / PLAYGROUND
   ─────────────────────────────────────────────────────── */

function EasingExperiment() {
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

function MotionStudy() {
  return (
    <div className="motion-demo">
      <div className="motion-demo-dot" />
      <span className="motion-demo-label hand">hover to settle</span>
    </div>
  );
}

function PlaygroundItem({ item, index }) {
  const rotation = `scrap-rot-${(index % 4) + 1}`;

  if (item.type === "photo") {
    return (
      <div className={`scrap scrap--photo ${rotation}`}>
        <PhotoPlaceholder path={item.path} caption={item.caption} />
      </div>
    );
  }

  if (item.type === "note") {
    return (
      <div className={`scrap scrap--note ${rotation}`}>
        <span className="hand scrap-title">{item.title}</span>
        <p className="scrap-body">{item.body}</p>
      </div>
    );
  }

  if (item.type === "code") {
    return (
      <div className={`scrap scrap--code ${rotation}`}>
        <span className="scrap-label">CODE EXPERIMENT</span>
        <span className="hand scrap-title">{item.title}</span>
        <EasingExperiment />
      </div>
    );
  }

  if (item.type === "motion") {
    return (
      <div className={`scrap scrap--motion ${rotation}`}>
        <span className="scrap-label">MOTION EXPERIMENT</span>
        <span className="hand scrap-title">{item.title}</span>
        <MotionStudy />
      </div>
    );
  }

  if (item.type === "travel") {
    return (
      <div className={`scrap scrap--travel ${rotation}`}>
        <span className="scrap-label">TRAVEL / PLACES</span>
        <strong className="scrap-place">{item.place}</strong>
        <p className="scrap-body">{item.note}</p>
      </div>
    );
  }

  if (item.type === "save") {
    return (
      <div className={`scrap scrap--save ${rotation}`}>
        <span className="hand scrap-title">{item.title}</span>
        <ul className="scrap-save-list">
          {item.items.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}

/* ───────────────────────────────────────────────────────
   EXPERIENCE + SKILLS — compact, recruiter-scannable
   ─────────────────────────────────────────────────────── */

function ExperienceSkills() {
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

/* ───────────────────────────────────────────────────────
   APP
   ─────────────────────────────────────────────────────── */

function App() {
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  // Which project modal (if any) is open, keyed by project id.
  // If the URL already points at a project on first load (e.g.
  // someone was sent a direct "?view=cloudsky" link), that modal
  // opens immediately — computed here rather than in an effect
  // so it's ready on the very first render, with no extra pass.
  const [openSlug, setOpenSlug] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("view");
    return initial && PROJECT_ORDER.includes(initial) ? initial : null;
  });
  // The element that triggered the modal, so we can return
  // keyboard/screen-reader focus to it when the modal closes.
  const triggerRef = useRef(null);

  // Keep openSlug in sync with Back/Forward navigation.
  useEffect(() => {
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const view = currentParams.get("view");
      if (view && PROJECT_ORDER.includes(view)) {
        setOpenSlug(view);
      } else {
        setOpenSlug(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Opening a project is a real navigation: it pushes a new
  // history entry, so the browser Back button closes the modal
  // and returns to exactly where the visitor was on the homepage.
  function openProject(id, triggerEl) {
    if (triggerEl) triggerRef.current = triggerEl;
    window.history.pushState({ ky453Modal: true, view: id }, "", `?view=${id}`);
    setOpenSlug(id);
  }

  // Moving between projects with Previous/Next swaps content in
  // place — it replaces the current history entry rather than
  // stacking a new one, so Back always exits the modal system
  // in a single step, however many projects were browsed.
  function switchProject(id) {
    const state = { ...(window.history.state || {}), view: id };
    window.history.replaceState(state, "", `?view=${id}`);
    setOpenSlug(id);
  }

  // Closing: if this modal session was opened via a push (the
  // normal case), go back — that's what makes the Back button
  // and the Close button behave identically. If someone landed
  // directly on a "?view=" URL with nothing to go back to, fall
  // back to replacing the URL so Close never navigates away.
  function closeProject() {
    if (window.history.state && window.history.state.ky453Modal) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      setOpenSlug(null);
    }
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Katherine Yang home">
          KATHERINE / <span>KY</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#playground">Playground</a>
          <a href="#about">About</a>
        </nav>

        <a className="resume" href={resumeHref} target="_blank" rel="noreferrer">
          Résumé ↗
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-stamp">
          <span className="stamp-dot" />
          Product / Design / Code
        </div>

        <div className="hero-title">
          <span className="kicker">Katherine Yang</span>
          <h1>
            Product manager,
            <br />
            <em>designer when needed,</em>
            <br />
            builder when useful.
          </h1>
        </div>

        <div className="hero-grid">
          <p className="hero-intro">
            I'm interested in people, products, visual culture, and technology —
            and I like making things to understand them better, down to the
            smallest detail.
          </p>

          <div className="hero-note">
            <span className="hand">small detail →</span>
            <p>will absolutely stop to read a well-designed sign</p>
          </div>

          <a className="scroll-cue" href="#work">
            a bit about me, then the work <span>↓</span>
          </a>
        </div>

        <div className="hero-mark" aria-hidden="true">
          <span>K</span>
          <span>Y</span>
        </div>
      </section>

      <Currently />

      <section className="work" id="work">
        <div className="section-intro">
          <span className="section-no">01</span>
          <p>SELECTED PRODUCT STORIES</p>
          <span className="section-side">2025—2026</span>
        </div>

        {projectList.map((project) => (
          <Project project={project} onOpen={openProject} key={project.id} />
        ))}
      </section>

      <section className="thinking" id="thinking">
        <div className="section-intro light">
          <span className="section-no">02</span>
          <p>HOW I THINK</p>
          <span className="section-side">messy → legible</span>
        </div>

        <div className="thinking-grid">
          <div className="thinking-title">
            <p className="hand">my default loop</p>
            <h2>
              Find the real
              <br />
              <em>question first.</em>
            </h2>
          </div>

          <div className="process">
            <span className="process-note process-note-a hand">what are we actually solving?</span>

            <div className="process-step">
              <span>01</span>
              <strong>Discover</strong>
              <p>Look for the behavior underneath the request.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <span>02</span>
              <strong>Frame</strong>
              <p>Turn ambiguity into a question the team can act on.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <span>03</span>
              <strong>Make</strong>
              <p>Prototype enough to expose assumptions quickly.</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <span>04</span>
              <strong>Learn</strong>
              <p>Use evidence to decide what deserves the next iteration.</p>
            </div>

            <span className="process-note process-note-b hand">build just enough to learn</span>
            <span className="process-note process-note-c hand">what would change my mind?</span>
            <span className="process-note process-note-d hand">not always linear :)</span>
          </div>
        </div>
      </section>

      <section className="playground" id="playground">
        <div className="section-intro">
          <span className="section-no">+</span>
          <p>MY CREATIVE SPACE</p>
          <span className="section-side">one drawer of my desk</span>
        </div>

        <div className="playground-copy">
          <h2>A little less résumé. A little more me.</h2>
          <p>
            I like photography, visual culture, motion, small coded
            experiments, and collecting details that make interfaces feel
            human. This is where they live before they become anything else.
          </p>
        </div>

        <div className="scrap-board" aria-label="Creative interests">
          {PLAYGROUND_ITEMS.map((item, index) => (
            <PlaygroundItem item={item} index={index} key={item.id} />
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-lead">
          <span className="section-no">03</span>
          <h2>
            Information Science
            <br />
            <span className="plus">+</span> History of Art
          </h2>
          <p className="hand">a strange combination that makes a lot of sense</p>

          <ul className="about-facts">
            {ABOUT_FACTS.map((fact) => (
              <li key={fact.label}>
                <span className="hand">{fact.label}</span> {fact.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-copy">
          <p>
            I'm interested in products because they sit between systems and
            people. My technical background helps me understand what can be
            built; design helps me see how it should feel; visual studies
            keeps me asking what choices mean and who they're for. I'm
            especially drawn to work where the problem is still a little
            fuzzy and the team has to figure out what matters before deciding
            what to build.
          </p>

          <div className="about-lists">
            <div className="about-list">
              <span className="hand">things I care about</span>
              <ul>
                {ABOUT_CARE_ABOUT.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="about-list">
              <span className="hand">outside school &amp; work</span>
              <ul>
                {ABOUT_ENJOY.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about-photos">
            <PhotoPlaceholder
              path="/assets/about/photo-01.jpg"
              caption="a real photo of you"
              className="about-photo-a"
            />
            <PhotoPlaceholder
              path="/assets/about/photo-02.jpg"
              caption="a place, a moment, a detail"
              className="about-photo-b"
            />
          </div>

          <ExperienceSkills />
        </div>
      </section>

      <footer>
        <div className="footer-note hand">one last note →</div>
        <h2>
          Let's make something
          <br />
          people actually want to use.
        </h2>

        <div className="footer-row">
          <div className="footer-links">
            <a href="mailto:your-email@cornell.edu">Email ↗</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href="https://github.com/ky453" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>

          <p>Designed + coded by Katherine Yang · 2026</p>
        </div>
      </footer>

      <ProjectModal
        open={Boolean(openSlug)}
        activeId={openSlug}
        onClose={closeProject}
        onNavigate={switchProject}
        restoreFocusRef={triggerRef}
      />
    </main>
  );
}

export default App;

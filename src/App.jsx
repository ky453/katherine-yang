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

const PLAYGROUND_PHOTOS = [
  {
    id: "barcelona",
    path: "/assets/photos/travel/spain-barcelona.jpg",
    caption: "A day among the mosaics in Barcelona.",
    alt: "Katherine in front of colorful mosaic architecture in Barcelona",
    layout: "wide",
  },
  {
    id: "mapo-tofu",
    path: "/assets/photos/food/mapo-tofu.jpg",
    caption: "Dinner, with flowers on the table.",
    alt: "Homemade mapo tofu and side dishes on a table with pink flowers",
    layout: "food",
  },
  {
    id: "lookout",
    path: "/assets/photos/travel/spain-tibidabo.jpg",
    caption: "At a lookout, with mountains all around.",
    alt: "Katherine in a red dress beside a carved stone figure above a green valley",
    layout: "portrait",
  },
  {
    id: "sendoff",
    path: "/assets/photos/mcsa/mcsa-shanghai-sendoff.jpg",
    caption: "A little Cornell in Shanghai.",
    alt: "Katherine with fellow Cornell students at a Shanghai send-off gathering",
    layout: "group",
  },
  {
    id: "peach-burrata",
    path: "/assets/photos/food/peach-burrata-salad.jpg",
    caption: "Peaches, burrata, and a very good plate.",
    alt: "Peach and burrata salad with greens on a dark serving plate",
    layout: "food-wide",
  },
  {
    id: "japan",
    path: "/assets/photos/travel/japan-1.jpg",
    caption: "A quiet moment in Japan.",
    alt: "Katherine in a patterned blue kimono outside a traditional wooden building",
    layout: "portrait-small",
  },
];

const ABOUT_FACTS = [
  { label: "based in", value: "Ithaca, NY" },
  { label: "studying", value: "Information Science + History of Art, Cornell" },
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

function PhotoFigure({ path, caption, alt, className = "", loading = "lazy" }) {
  return (
    <figure className={`photo-figure ${className}`}>
      <div className="photo-frame">
        <img src={path} alt={alt} loading={loading} />
      </div>
      <figcaption className="hand">{caption}</figcaption>
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
          <p>CAMERA ROLL, LOOSELY EDITED</p>
          <span className="section-side">things I noticed</span>
        </div>

        <div className="playground-copy">
          <h2>A little less résumé. A little more me.</h2>
          <p>
            Places, plates, people, and the visual details I keep bringing home.
            Not quite a travel diary, not quite a portfolio; just a few things
            I wanted to remember.
          </p>
        </div>

        <div className="photo-notebook" aria-label="Selected personal photographs">
          {PLAYGROUND_PHOTOS.map((photo) => (
            <PhotoFigure
              key={photo.id}
              path={photo.path}
              caption={photo.caption}
              alt={photo.alt}
              className={`notebook-photo notebook-photo--${photo.layout}`}
            />
          ))}
        </div>

        <div className="playground-experiments" aria-label="Small interaction experiments">
          <div className="scrap scrap--code">
            <span className="scrap-label">CODE EXPERIMENT</span>
            <span className="hand scrap-title">easing, felt</span>
            <EasingExperiment />
          </div>
          <div className="scrap scrap--motion">
            <span className="scrap-label">MOTION EXPERIMENT</span>
            <span className="hand scrap-title">a small motion study</span>
            <MotionStudy />
          </div>
          <span className="hand playground-margin-note">still collecting little things ↗</span>
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
            {ABOUT_FACTS.filter((fact) => !fact.value.startsWith("[")).map((fact) => (
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
          <PhotoFigure
            path="/assets/photos/travel/italy-florence-2.jpg"
            alt="Katherine standing in front of Florence Cathedral"
            caption="Florence, looking up as usual."
            className="about-photo-feature"
            loading="eager"
          />
        </div>

        <ExperienceSkills />
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

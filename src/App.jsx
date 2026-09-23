import "./App.css";

const projects = [
  {
    id: "cloudsky",
    number: "01",
    eyebrow: "PRODUCT MANAGEMENT INTERNSHIP",
    title: "CloudSky",
    question: "How can paying for cloud gaming feel less disruptive?",
    summary:
      "A product story about improving a billing experience around real user friction, product constraints, and cross-functional execution.",
    tags: ["Product strategy", "UX", "Monetization", "Cross-functional"],
    art: "cloudsky",
  },
  {
    id: "sidequest",
    number: "02",
    eyebrow: "PRODUCT + DESIGN + BUILD",
    title: "Sidequest",
    question: "What can I actually afford to do tonight?",
    summary:
      "An activity discovery concept that treats budget as part of the recommendation problem instead of an afterthought.",
    tags: ["0→1", "Research", "Interaction design", "Frontend"],
    art: "sidequest",
  },
  {
    id: "honor",
    number: "03",
    eyebrow: "UX / MOTION DESIGN",
    title: "HONOR",
    question: "When should an interface move?",
    summary:
      "Exploring how motion can clarify hierarchy, guide attention, and become part of a product system rather than decoration.",
    tags: ["Motion systems", "Mobile UX", "Prototyping"],
    art: "honor",
  },
];

function DoodleArrow() {
  return (
    <svg
      className="doodle-arrow"
      viewBox="0 0 120 70"
      aria-hidden="true"
    >
      <path d="M5 17 C35 5, 57 7, 74 25 C84 36, 83 49, 77 58" />
      <path d="M63 49 L77 60 L89 46" />
    </svg>
  );
}

function ProjectArt({ type }) {
  if (type === "cloudsky") {
    return (
      <div className="art-scene cloudsky-scene" aria-hidden="true">
        <div className="browser-card cloud-main">
          <div className="window-top">
            <i />
            <i />
            <i />
            <span>cloud gaming / billing</span>
          </div>
          <div className="mock-heading">Session balance</div>
          <div className="mock-balance">$ 4.20</div>
          <div className="mock-bar"><span /></div>
          <div className="mock-button">Add time</div>
        </div>

        <div className="note-card cloud-note">
          <span className="hand">product question</span>
          <strong>What happens when balance hits zero?</strong>
          <div className="scribble-line" />
        </div>

        <div className="browser-card cloud-small">
          <div className="window-top">
            <i />
            <i />
            <i />
          </div>
          <p>Low balance</p>
          <strong>8 min left</strong>
          <div className="tiny-pill">Top up →</div>
        </div>

        <div className="art-caption hand">less interruption, more play ↗</div>
      </div>
    );
  }

  if (type === "sidequest") {
    return (
      <div className="art-scene sidequest-scene" aria-hidden="true">
        <div className="budget-ticket">
          <span className="hand">tonight's constraint</span>
          <strong>$35</strong>
          <small>budget</small>
        </div>

        <div className="phone-frame phone-one">
          <div className="phone-notch" />
          <span className="tiny-label">SIDEQUEST</span>
          <h4>What are you in the mood for?</h4>
          <div className="choice">something spontaneous</div>
          <div className="choice">good food</div>
          <div className="choice">outdoors</div>
        </div>

        <div className="phone-frame phone-two">
          <div className="phone-notch" />
          <span className="tiny-label">FOR YOU</span>
          <div className="event-photo" />
          <h4>Sunset pottery</h4>
          <p>$28 · 1.4 mi</p>
          <div className="mock-button dark">Save quest</div>
        </div>

        <DoodleArrow />
        <span className="side-note hand">budget should shape discovery</span>
      </div>
    );
  }

  return (
    <div className="art-scene honor-scene" aria-hidden="true">
      <div className="motion-track">
        <span>01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
      </div>

      <div className="motion-card frame-a">
        <div className="motion-dot" />
        <p>enter</p>
      </div>
      <div className="motion-card frame-b">
        <div className="motion-dot" />
        <p>guide</p>
      </div>
      <div className="motion-card frame-c">
        <div className="motion-dot" />
        <p>settle</p>
      </div>

      <div className="honor-word">motion</div>
      <span className="honor-note hand">movement with a reason</span>
    </div>
  );
}

function Project({ project }) {
  return (
    <article className="project" id={project.id}>
      <div className="project-meta">
        <span>{project.number}</span>
        <span>{project.eyebrow}</span>
      </div>

      <div className="project-heading">
        <h2>{project.title}</h2>
        <p>{project.question}</p>
      </div>

      <a className={`project-art ${project.art}`} href={`#${project.id}`}>
        <ProjectArt type={project.art} />
      </a>

      <div className="project-footer">
        <p>{project.summary}</p>

        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <a className="case-link" href={`#${project.id}`}>
          View product story <span>↗</span>
        </a>
      </div>
    </article>
  );
}

function App() {
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Katherine Yang home">
          KATHERINE / <span>KY</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a href="#work">01 Work</a>
          <a href="#thinking">02 Thinking</a>
          <a href="#about">03 About</a>
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
            I’m a Cornell student interested in how products turn messy human
            problems into simple, useful experiences.
          </p>

          <div className="hero-note">
            <span className="hand">currently thinking about →</span>
            <p>products, people & tiny details</p>
          </div>

          <a className="scroll-cue" href="#work">
            selected product stories <span>↓</span>
          </a>
        </div>

        <div className="hero-mark" aria-hidden="true">
          <span>K</span>
          <span>Y</span>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-intro">
          <span className="section-no">01</span>
          <p>SELECTED PRODUCT STORIES</p>
          <span className="section-side">2025—2026</span>
        </div>

        {projects.map((project) => (
          <Project project={project} key={project.id} />
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

            <span className="process-note hand">not always linear :)</span>
          </div>
        </div>
      </section>

      <section className="playground">
        <div className="section-intro">
          <span className="section-no">+</span>
          <p>MY CREATIVE SPACE</p>
          <span className="section-side">things that make my brain happy</span>
        </div>

        <div className="playground-copy">
          <h2>A little less résumé. A little more me.</h2>
          <p>
            I like photography, visual culture, motion, small coded experiments,
            and collecting details that make interfaces feel human.
          </p>
        </div>

        <div className="scrapbook" aria-label="Creative interests">
          <div className="scrap scrap-photo">
            <div className="photo-fill photo-a" />
            <span>PHOTO / 001</span>
          </div>
          <div className="scrap scrap-note">
            <span className="hand">things I save</span>
            <p>signage, menus, weird UI, packaging, type, tiny interactions</p>
          </div>
          <div className="scrap scrap-code">
            <span>CODE / PLAY</span>
            <pre>{`if (idea.isInteresting) {
  buildTinyVersion();
}`}</pre>
          </div>
          <div className="scrap scrap-photo rotated">
            <div className="photo-fill photo-b" />
            <span>PHOTO / 002</span>
          </div>
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
        </div>

        <div className="about-copy">
          <p>
            I’m interested in products because they sit between systems and
            people. My technical background helps me understand what can be
            built; design helps me see how it should feel; visual studies keeps
            me asking what choices mean and who they are for.
          </p>

          <p>
            I’m especially drawn to product work where the problem is still a
            little fuzzy and the team has to figure out what matters before
            deciding what to build.
          </p>
        </div>
      </section>

      <footer>
        <div className="footer-note hand">one last note →</div>
        <h2>
          Let’s make something
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
    </main>
  );
}

export default App;

import { assetUrl } from "../lib/assets";

const NAV_ITEMS = [
  { id: "home", title: "Home", href: "#/" },
  { id: "work", title: "Work", href: "#/work" },
  { id: "about", title: "About", href: "#/about" },
  { id: "playground", title: "Playground", href: "#/playground" },
];

export default function SiteLayout({ activePage, children }) {
  function skipToContent(event) {
    event.preventDefault();
    const main = document.getElementById("main-content");
    main?.focus();
    main?.scrollIntoView({ behavior: "instant" });
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={skipToContent}>Skip to content</a>
      <header className="topbar">
        <a className="wordmark" href="#/" aria-label="Katherine Yang home">
          KATHERINE / <span>KY</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a href={item.href} key={item.id} aria-current={activePage === item.id ? "page" : undefined}>
              {item.title}
            </a>
          ))}
        </nav>
        <a className="resume" href={assetUrl("resume.pdf")} target="_blank" rel="noreferrer">
          Résumé ↗
        </a>
      </header>
      {children}
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
    </div>
  );
}


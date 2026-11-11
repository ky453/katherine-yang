import { assetUrl } from "../lib/assets";
import AskKatherine from "./AskKatherine";
import AssistantProvider from "./AssistantProvider";

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
    <AssistantProvider>
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={skipToContent}>Skip to content</a>
      <header className="topbar">
        <a className="wordmark" href="#/" aria-label="Katherine Yang home">
          Katherine Yang
        </a>
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a href={item.href} key={item.id} aria-current={activePage === item.id ? "page" : undefined}>
              {item.title}
            </a>
          ))}
        </nav>
        <a className="resume" href={assetUrl("assets/Katherine_Yang_PM_Resume.pdf")} target="_blank" rel="noreferrer">
          Résumé ↗
        </a>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-intro">
            <a className="footer-name" href="#/">Katherine Yang</a>
          </div>
          <nav className="footer-links" aria-label="Contact and résumé">
            <a href="mailto:ky453@cornell.edu">Email <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/ky453" target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a href={assetUrl("assets/Katherine_Yang_PM_Resume.pdf")} target="_blank" rel="noreferrer">
              Résumé <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <p className="footer-copyright">© 2026 Katherine Yang</p>
        </div>
      </footer>
      {activePage !== "home" && <AskKatherine />}
    </div>
    </AssistantProvider>
  );
}

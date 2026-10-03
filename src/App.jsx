import { useEffect, useRef } from "react";
import "./App.css";
import "./pages.css";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Playground from "./pages/Playground";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import { PROJECTS } from "./data/projects";
import { useRoute } from "./lib/useRoute";
import { resolveRoute } from "./lib/routes";

function App() {
  const path = useRoute();
  const route = resolveRoute(path, PROJECTS);
  const mainRef = useRef(null);

  useEffect(() => {
    document.title = `${route.title} | Katherine Yang`;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const heading = mainRef.current?.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }, [path, route.title]);

  let page;
  switch (route.page) {
    case "home": page = <Home />; break;
    case "work": page = <Work />; break;
    case "about": page = <About />; break;
    case "playground": page = <Playground />; break;
    case "project": page = <ProjectPage project={PROJECTS[route.projectId]} />; break;
    default: page = <NotFound />;
  }

  return (
    <SiteLayout activePage={route.page === "project" ? "work" : route.page}>
      <main id="main-content" ref={mainRef} tabIndex={-1} key={path}>
        {page}
      </main>
    </SiteLayout>
  );
}

export default App;

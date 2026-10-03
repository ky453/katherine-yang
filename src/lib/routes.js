const MAIN_PAGES = {
  "/": { page: "home", title: "Home" },
  "/work": { page: "work", title: "Work" },
  "/about": { page: "about", title: "About" },
  "/playground": { page: "playground", title: "Playground" },
};

export function locationPath(location) {
  const hash = location.hash.slice(1);
  if (hash.startsWith("/")) return hash.replace(/\/+$/, "") || "/";

  // Keep links shared before the move to page routes working.
  const legacyProject = new URLSearchParams(location.search).get("view");
  if (legacyProject) return `/projects/${legacyProject}`;
  if (["work", "about", "playground"].includes(hash)) return `/${hash}`;
  return hash ? `/${hash}` : "/";
}

export function resolveRoute(path, projects) {
  if (Object.hasOwn(MAIN_PAGES, path)) return MAIN_PAGES[path];
  const match = /^\/projects\/([a-z0-9-]+)$/.exec(path);
  if (match && Object.hasOwn(projects, match[1])) {
    return { page: "project", projectId: match[1], title: projects[match[1]].title };
  }
  return { page: "not-found", title: "Page not found" };
}

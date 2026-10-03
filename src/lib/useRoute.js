import { useEffect, useSyncExternalStore } from "react";
import { locationPath } from "./routes";

function subscribe(callback) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getSnapshot() {
  return locationPath(window.location);
}

export function useRoute() {
  const path = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("view");
    url.hash = path;
    if (url.href !== window.location.href) {
      window.history.replaceState(window.history.state, "", url);
    }
  }, [path]);

  return path;
}

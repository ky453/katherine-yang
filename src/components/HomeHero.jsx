import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { assetUrl } from "../lib/assets";
import HeroCarousel from "./HeroCarousel";
import "./HomeHero.css";

function useMediaQuery(query) {
  const subscribe = useCallback((listener) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, () => false);
}

export default function HomeHero() {
  const heroRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery("(max-width: 600px)");
  const motionPaused = paused || !inView || !pageVisible || reducedMotion;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(heroRef.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className="home-landing" id="top" ref={heroRef}
      aria-labelledby="home-hero-title" data-motion-paused={motionPaused}>
      <div className="home-landing-stage">
        <div className="home-landing-intro">
          <h1 id="home-hero-title"><span>Katherine</span>{" "}<span>Yang</span></h1>
          <p className="home-landing-statement">
            I make things to understand how they work. I&apos;m curious about
            what people expect from a product, and the small details that help
            them find their way.
          </p>
          <p className="home-landing-studies">
            Information Science + History of Art at Cornell
          </p>
        </div>

        <figure className="home-landing-portrait">
          <img src={assetUrl("/assets/photos/me/head-shot.jpg")}
            alt="Katherine Yang" width="2831" height="4244" fetchPriority="high" />
        </figure>

        <HeroCarousel paused={motionPaused} staticLayout={reducedMotion || compact} />

        {!compact && !reducedMotion && (
          <button className="home-landing-motion" type="button"
            aria-label={paused ? "Resume motion" : "Pause motion"}
            title={paused ? "Resume motion" : "Pause motion"}
            aria-pressed={paused} onClick={() => setPaused(!paused)}>
            <span className={paused ? "hero-motion-icon hero-motion-icon--play" : "hero-motion-icon"} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}

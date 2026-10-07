import { useEffect, useRef, useState } from "react";
import { assetUrl } from "../lib/assets";
import { arcKeyframes, arcSlots, CAROUSEL_STEP_MS } from "../lib/heroCarousel";

const PAGES = [
  { id: "work", title: "Work", caption: "Selected work", href: "#/work", motif: "folder" },
  { id: "about", title: "About", caption: "My story", href: "#/about", motif: "person" },
  { id: "playground", title: "Playground", caption: "Things I notice", href: "#/playground", motif: "spark" },
  { id: "resume", title: "Résumé", caption: "Experience", href: assetUrl("resume.pdf"), motif: "document", external: true },
];
const SLOTS = arcSlots(PAGES.length);

export default function HeroCarousel({ paused, staticLayout }) {
  const cardRefs = useRef([]);
  const animations = useRef([]);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (staticLayout) return;
    animations.current = cardRefs.current.map((element, index) => {
      const animation = element.animate(arcKeyframes(PAGES.length), {
        duration: PAGES.length * CAROUSEL_STEP_MS,
        iterations: Infinity,
      });
      animation.currentTime = index * CAROUSEL_STEP_MS;
      return animation;
    });
    return () => {
      animations.current.forEach(animation => animation.cancel());
      animations.current = [];
    };
  }, [staticLayout]);

  useEffect(() => {
    animations.current.forEach(animation => {
      if (paused || hovered || focused) animation.pause();
      else animation.play();
    });
  }, [paused, hovered, focused, staticLayout]);

  return (
    <nav className="hero-carousel" aria-label="Explore Katherine's portfolio"
      onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}>
      {PAGES.map((page, index) => (
        <div className="hero-carousel-card" key={page.id} data-page={page.id}
          ref={element => { cardRefs.current[index] = element; }}
          style={SLOTS[index]}>
          <a href={page.href} className="hero-carousel-link"
            target={page.external ? "_blank" : undefined}
            rel={page.external ? "noreferrer" : undefined}
            aria-label={page.external ? "Résumé (opens in a new tab)" : page.title}>
            <span className={`hero-motif hero-motif--${page.motif}`} aria-hidden="true" />
            <span className="hero-carousel-title">{page.title}</span>
            <span className="hero-carousel-caption">{page.caption}</span>
          </a>
        </div>
      ))}
    </nav>
  );
}

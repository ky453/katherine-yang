import { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { assetUrl } from "../lib/assets";

export default function PhotoDetail({ photos, index, onNavigate, onClose, restoreFocusRef }) {
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const photo = photos[index];
  const hasNote = Boolean(photo.note?.trim());
  const previous = () => onNavigate((index - 1 + photos.length) % photos.length);
  const next = () => onNavigate((index + 1) % photos.length);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const trigger = restoreFocusRef.current;
    const body = document.body;
    const originalStyle = body.style.cssText;
    const scroll = { top: window.scrollY, left: window.scrollX };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = Number.parseFloat(getComputedStyle(body).paddingRight) || 0;

    // Fixed-body locking also preserves the camera-roll position on mobile.
    Object.assign(body.style, {
      position: "fixed", top: `${-scroll.top}px`, left: `${-scroll.left}px`,
      width: "100%", overflow: "hidden", paddingRight: `${paddingRight + scrollbarWidth}px`,
    });
    dialog.showModal();
    headingRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      body.style.cssText = originalStyle;
      if (trigger?.isConnected) {
        window.scrollTo({ ...scroll, behavior: "instant" });
        trigger.focus({ preventScroll: true });
      }
    };
  }, [restoreFocusRef]);

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      if (event.key === "ArrowLeft") previous();
      else next();
    }
    if (event.key === "Tab") {
      const buttons = [...dialogRef.current.querySelectorAll("button:not([disabled])")];
      const first = buttons[0];
      const last = buttons.at(-1);
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !buttons.includes(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !buttons.includes(active))) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="photo-detail"
      aria-labelledby="photo-detail-title"
      aria-describedby={hasNote ? "photo-detail-caption photo-detail-note" : "photo-detail-caption"}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={handleKeyDown}
    >
      <div className="photo-detail-toolbar">
        <span>Things I noticed</span>
        <button type="button" className="photo-detail-close" onClick={onClose} aria-label="Close photo" title="Close photo (Escape)">
          Close <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="photo-detail-layout">
        <figure className="photo-detail-figure">
          <div className="photo-detail-image-frame">
            <img key={photo.id} src={assetUrl(photo.path)} alt={photo.alt} />
          </div>
          <figcaption className="hand" id="photo-detail-caption">{photo.caption}</figcaption>
        </figure>
        <div className="photo-detail-context">
          <p className="photo-detail-position" aria-live="polite" aria-atomic="true">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            <span className="playground-sr-only"> — {photo.title}</span>
          </p>
          <h2 id="photo-detail-title" ref={headingRef} tabIndex={-1}>{photo.title}</h2>
          {hasNote && (
            <div className="photo-detail-observation">
              <span>what I noticed</span>
              <p id="photo-detail-note">{photo.note}</p>
            </div>
          )}
          {(photo.location || photo.year) && (
            <p className="photo-detail-place">{[photo.location, photo.year].filter(Boolean).join(" / ")}</p>
          )}
          <nav className="photo-detail-navigation" aria-label="Photographs">
            <button type="button" onClick={previous} aria-label="Previous photo" title="Previous photo (Left arrow)">
              <span aria-hidden="true">←</span> Previous
            </button>
            <button type="button" onClick={next} aria-label="Next photo" title="Next photo (Right arrow)">
              Next <span aria-hidden="true">→</span>
            </button>
          </nav>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}

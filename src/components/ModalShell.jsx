import { useEffect, useRef } from "react";

function getFocusable(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  );
}

/**
 * ModalShell wraps a native <dialog> so it behaves as a proper
 * accessible modal:
 * - open/close driven entirely by the `open` prop (controlled)
 * - Escape is intercepted so the caller decides how to close
 *   (needed here because closing also has to update history)
 * - Tab / Shift+Tab are kept inside the dialog as a safety net
 *   on top of the browser's native modal focus containment
 * - background scroll is locked while open
 * - focus returns to the element that opened the modal on close
 *
 * It knows nothing about project content — ProjectModal supplies
 * the header/body/navigation as children.
 */
export default function ModalShell({
  open,
  onClose,
  labelledBy,
  describedBy,
  restoreFocusRef,
  className = "",
  children,
}) {
  const dialogRef = useRef(null);
  const wasOpenRef = useRef(false);

  // Open/close the native dialog to match the `open` prop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.classList.add("modal-open");
      wasOpenRef.current = true;
    } else if (!open && dialog.open) {
      dialog.close();
    }

    if (!open) {
      document.body.classList.remove("modal-open");
      if (wasOpenRef.current) {
        restoreFocusRef?.current?.focus?.();
        wasOpenRef.current = false;
      }
    }
  }, [open, restoreFocusRef]);

  // Escape fires a native "cancel" event before the dialog would
  // close itself — intercept it so onClose (which also updates
  // browser history) is the single source of truth.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  // Belt-and-suspenders focus trap. Native <dialog> already keeps
  // focus inside a modal dialog in current browsers; this just
  // guarantees Tab/Shift+Tab wrap even if that ever falls short.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const focusable = getFocusable(dialog);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Unmount the heavy content when closed rather than just hiding
  // it, so closed-but-mounted content can't be tabbed to and
  // doesn't do work in the background.
  useEffect(
    () => () => document.body.classList.remove("modal-open"),
    []
  );

  return (
    <dialog
      ref={dialogRef}
      className={`modal-shell ${className}`}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      {open ? children : null}
    </dialog>
  );
}

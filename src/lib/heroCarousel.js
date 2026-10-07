export const CAROUSEL_PAUSE_MS = 1800;
export const CAROUSEL_SWIPE_MS = 1320;
export const CAROUSEL_STEP_MS = CAROUSEL_PAUSE_MS + CAROUSEL_SWIPE_MS;

export function arcSlots(count) {
  if (count < 2) return [{ left: "50%", top: "12%" }];
  return Array.from({ length: count }, (_, index) => {
    const fraction = index / (count - 1);
    return {
      left: `${13 + fraction * 74}%`,
      top: `${Math.sin(Math.PI * fraction) * 14}%`,
    };
  });
}

export function arcKeyframes(count) {
  const slots = arcSlots(count);
  const duration = count * CAROUSEL_STEP_MS;
  const frame = (slot, time, opacity = 1) => ({
    ...slot, offset: time / duration, opacity, pointerEvents: opacity === 0 ? "none" : "auto",
    easing: "ease-in-out", transform: "translateX(-50%)",
  });
  const frames = slots.flatMap((slot, index) => [
    frame(slot, index * CAROUSEL_STEP_MS),
    frame(slot, index * CAROUSEL_STEP_MS + CAROUSEL_PAUSE_MS),
  ]);
  // Preserve the 480ms fade-out, 120ms hidden crossing, and 720ms fade-in.
  frames.push(
    frame(slots.at(-1), duration - 840, 0),
    frame(slots[0], duration - 720, 0),
    frame(slots[0], duration),
  );
  return frames;
}

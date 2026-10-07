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
  const frame = (slot, offset, opacity = 1) => ({
    ...slot, offset, opacity, pointerEvents: opacity === 0 ? "none" : "auto",
    easing: "ease-in-out", transform: "translateX(-50%)",
  });
  const frames = slots.flatMap((slot, index) => [
    frame(slot, index / count),
    frame(slot, (index + 0.78) / count),
  ]);
  // Fade before wrapping so a card never sweeps across the portrait.
  frames.push(
    frame(slots.at(-1), (count - 0.14) / count, 0),
    frame(slots[0], (count - 0.12) / count, 0),
    frame(slots[0], 1),
  );
  return frames;
}

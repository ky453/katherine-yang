import test from "node:test";
import assert from "node:assert/strict";
import { arcKeyframes, arcSlots } from "../src/lib/heroCarousel.js";

test("carousel slots form an upright, balanced lower arc", () => {
  const slots = arcSlots(4);
  assert.equal(slots.length, 4);
  assert.equal(slots[0].left, "13%");
  assert.equal(slots.at(-1).left, "87%");
  assert.ok(parseFloat(slots[1].top) > parseFloat(slots[0].top));
  assert.ok(Math.abs(parseFloat(slots[1].top) - parseFloat(slots[2].top)) < 0.001);
});

test("rightmost card fades before wrapping to the left, without tilting", () => {
  const frames = arcKeyframes(4);
  assert.equal(frames[0].offset, 0);
  assert.equal(frames.at(-1).offset, 1);
  assert.ok(frames.every((frame,index) => index === 0 || frame.offset >= frames[index - 1].offset));
  assert.ok(frames.every(frame => frame.transform === "translateX(-50%)"));
  assert.equal(frames.at(-3).left, "87%");
  assert.equal(frames.at(-3).opacity, 0);
  assert.equal(frames.at(-3).pointerEvents, "none");
  assert.equal(frames.at(-2).left, "13%");
  assert.equal(frames.at(-2).opacity, 0);
  assert.equal(frames.at(-2).pointerEvents, "none");
  assert.equal(frames.at(-1).opacity, 1);
});

test("the arc supports an additional card without changing its geometry rules", () => {
  assert.equal(arcSlots(5).length, 5);
  assert.equal(arcKeyframes(5).length, 13);
});

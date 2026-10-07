import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { BOARD_PHOTOS, BOARD_PHOTO_IDS, BOARD_LAYOUTS } from "../src/data/playgroundBoard.js";

test("the board curates six to eight distinct, existing photographs", () => {
  assert.ok(BOARD_PHOTOS.length >= 6 && BOARD_PHOTOS.length <= 8);
  assert.equal(new Set(BOARD_PHOTO_IDS).size, BOARD_PHOTO_IDS.length);
  for (const photo of BOARD_PHOTOS) {
    assert.ok(photo);
    assert.ok(photo.alt && photo.caption);
    assert.ok(existsSync(new URL(`../public${photo.path}`, import.meta.url)));
  }
});

test("every preset positions all photographs inside the board with restrained rotation", () => {
  for (const layout of BOARD_LAYOUTS) {
    assert.equal(layout.length, BOARD_PHOTOS.length);
    for (const item of layout) {
      assert.ok(item.x >= 0 && item.y >= 0);
      assert.ok(item.width > 0 && item.height > 0);
      assert.ok(item.x + item.width <= 100 && item.y + item.height <= 100);
      assert.ok(Math.abs(item.tilt) <= 3);
    }
  }
});

test("preset overlaps are limited to small edges, never covering another photograph", () => {
  for (const layout of BOARD_LAYOUTS) {
    for (let first = 0; first < layout.length; first += 1) {
      for (let second = first + 1; second < layout.length; second += 1) {
        const a = layout[first];
        const b = layout[second];
        const width = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
        const height = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
        assert.ok(width * height / Math.min(a.width * a.height, b.width * b.height) <= 0.08);
      }
    }
  }
});

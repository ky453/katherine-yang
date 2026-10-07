import { PLAYGROUND_PHOTOS } from "./profile.js";

export const BOARD_PHOTO_IDS = [
  "barcelona", "mapo-tofu", "yunnan", "sendoff", "peach-burrata", "japan",
];

export const BOARD_PHOTOS = BOARD_PHOTO_IDS.map((id) => PLAYGROUND_PHOTOS.find((photo) => photo.id === id));

// Percentages keep both compositions fitted to the board without random collisions.
export const BOARD_LAYOUTS = [
  [
    { x: 5, y: 8, width: 24, height: 58, tilt: -2 },
    { x: 34, y: 6, width: 18, height: 36, tilt: 2 },
    { x: 57, y: 8, width: 34, height: 32, tilt: -1 },
    { x: 32, y: 51, width: 24, height: 28, tilt: -1.5 },
    { x: 81, y: 56, width: 14, height: 30, tilt: 2.5 },
    { x: 59, y: 45, width: 18, height: 48, tilt: 1.5 },
  ],
  [
    { x: 59, y: 43, width: 20, height: 51, tilt: 1 },
    { x: 77, y: 9, width: 17, height: 35, tilt: 2 },
    { x: 34, y: 8, width: 34, height: 32, tilt: -1.5 },
    { x: 31, y: 50, width: 26, height: 28, tilt: 1.5 },
    { x: 82, y: 55, width: 13, height: 30, tilt: -2 },
    { x: 6, y: 8, width: 24, height: 58, tilt: -2 },
  ],
];

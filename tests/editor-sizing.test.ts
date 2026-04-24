import assert from "node:assert/strict";

import { getAutoHeightForFontSize, MAX_CANVAS_HEIGHT } from "../lib/editor-sizing";

const twoLineHeight = getAutoHeightForFontSize({
  currentHeight: 160,
  fontSize: 102,
  lineHeight: 1.02,
  lineCount: 2,
  outlineWidth: 8,
  stickerEdgeEnabled: true,
  stickerEdgeWidth: 10,
  shadowEnabled: true,
  shadowBlur: 12,
  shadowY: 10,
  depth: 8,
});

assert.ok(
  twoLineHeight > 160,
  "larger two-line text should grow the canvas instead of being visually clamped",
);

const cappedHeight = getAutoHeightForFontSize({
  currentHeight: 500,
  fontSize: 160,
  lineHeight: 1.5,
  lineCount: 4,
  outlineWidth: 30,
  stickerEdgeEnabled: true,
  stickerEdgeWidth: 28,
  shadowEnabled: true,
  shadowBlur: 30,
  shadowY: 30,
  depth: 22,
});

assert.equal(cappedHeight, MAX_CANVAS_HEIGHT);

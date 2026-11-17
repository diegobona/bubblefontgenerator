import assert from "node:assert/strict";
import { canvasPoint, placeText } from "../lib/text-position";

const canvas = { width: 1120, height: 160 };
const bounds = { x: 400, y: 30, width: 320, height: 100 };
assert.deepEqual(placeText(bounds, canvas, "center"), { x: 0, y: 0, scale: 1 });
const left = placeText(bounds, canvas, "left");
const right = placeText(bounds, canvas, "right");
assert.equal(left.x + bounds.x, 8);
assert.equal(right.x + bounds.x + bounds.width, canvas.width - 8);
assert.ok(left.x < 0 && right.x > 0);
assert.equal(left.y, 0);
assert.equal(right.scale, 1);
assert.equal(placeText({ ...bounds, height: 900 }, canvas, "left").scale, 1);
assert.deepEqual(placeText(bounds, canvas, "left", { x: 45, y: 12 }), { x: 45, y: 12, scale: 1 });

// Oversized/rotated/effect-expanded text and extreme drags must fit on every side.
for (const box of [bounds, { x: -400, y: -100, width: 1800, height: 440 }]) {
  for (const x of [-10000, 0, 10000]) for (const y of [-10000, 0, 10000]) {
    const p = placeText(box, canvas, "center", { x, y });
    assert.ok(box.x * p.scale + p.x >= 8 - 1e-8);
    assert.ok(box.y * p.scale + p.y >= 8 - 1e-8);
    assert.ok((box.x + box.width) * p.scale + p.x <= canvas.width - 8 + 1e-8);
    assert.ok((box.y + box.height) * p.scale + p.y <= canvas.height - 8 + 1e-8);
  }
}
// Mobile letterboxing and desktop previews map to the same image coordinate.
assert.deepEqual(canvasPoint({ x: 76, y: 80 }, { x: 20, y: 40, width: 112, height: 80 }, canvas), { x: 560, y: 80 });
assert.deepEqual(canvasPoint({ x: 580, y: 108 }, { x: 20, y: 40, width: 1120, height: 136 }, canvas), { x: 560, y: 80 });

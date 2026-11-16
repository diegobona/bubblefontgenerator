import assert from "node:assert/strict";
import { unicodeText } from "../lib/unicode-text";

assert.equal(unicodeText("Abz 09!", 0), "Ⓐⓑⓩ ⓪⑨!");
assert.equal(unicodeText("AbZ", 1), "🅐🅑🅩");
assert.equal(unicodeText("AbZ", 2), "🄰🄱🅉");
assert.equal(unicodeText("Ab 09!", 3), "Ａｂ ０９！");
assert.equal(unicodeText("AbZ", 4), "⒜⒝⒵");
assert.equal(unicodeText("AbZ", 5), "ᴀʙᴢ");
for (let style = 0; style < 6; style++) {
  assert.equal(unicodeText("你好 🎈\n", style), "你好 🎈\n");
  assert.equal(unicodeText("", style), "");
}
console.log("Unicode conversion tests passed");

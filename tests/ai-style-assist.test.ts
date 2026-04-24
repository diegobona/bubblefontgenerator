import assert from "node:assert/strict";

import { buildStyleAssistSuggestion } from "../lib/ai-style-assist";

const stickerSuggestion = buildStyleAssistSuggestion("cute pink sticker", "core");

assert.ok(stickerSuggestion);
assert.equal(stickerSuggestion.presetId, "sticker");
assert.deepEqual(stickerSuggestion.fontCategories.slice(0, 2), ["cute", "sticker"]);
assert.equal(stickerSuggestion.textColor, "#ff5fa2");
assert.equal(stickerSuggestion.backgroundColor, "#f6c7ea");
assert.equal(stickerSuggestion.stickerEdgeEnabled, true);

const graffitiSuggestion = buildStyleAssistSuggestion("blue graffiti street", "core");

assert.ok(graffitiSuggestion);
assert.equal(graffitiSuggestion.presetId, "graffiti");
assert.equal(graffitiSuggestion.fontCategories[0], "graffiti");
assert.equal(graffitiSuggestion.textColor, "#7dd3fc");
assert.equal(graffitiSuggestion.backgroundColor, "#312e81");
assert.equal(graffitiSuggestion.shadowEnabled, true);

const emptySuggestion = buildStyleAssistSuggestion("   ", "core");

assert.equal(emptySuggestion, null);

const birthdaySuggestion = buildStyleAssistSuggestion("yellow birthday banner", "core");

assert.ok(birthdaySuggestion);
assert.equal(birthdaySuggestion.presetId, "sticker");
assert.equal(birthdaySuggestion.textColor, "#f59e0b");
assert.equal(birthdaySuggestion.backgroundColor, "#fef3c7");
assert.equal(birthdaySuggestion.stickerEdgeEnabled, true);

const redBirthdaySuggestion = buildStyleAssistSuggestion("red birthday banner", "core");

assert.ok(redBirthdaySuggestion);
assert.equal(redBirthdaySuggestion.presetId, "sticker");
assert.equal(
  redBirthdaySuggestion.textColor,
  "#ef4444",
  "explicit color words should override template context words like birthday",
);
assert.equal(redBirthdaySuggestion.backgroundColor, "#fee2e2");

const redGraffitiSuggestion = buildStyleAssistSuggestion("red graffiti street", "core");

assert.ok(redGraffitiSuggestion);
assert.equal(redGraffitiSuggestion.presetId, "graffiti");
assert.equal(
  redGraffitiSuggestion.textColor,
  "#ef4444",
  "explicit color words should override template context words like street",
);

const purpleClassroomSuggestion = buildStyleAssistSuggestion("purple classroom label", "letters");

assert.ok(purpleClassroomSuggestion);
assert.equal(purpleClassroomSuggestion.presetId, "kid");
assert.equal(
  purpleClassroomSuggestion.textColor,
  "#a78bfa",
  "explicit color words should override template context words like classroom",
);

const blueCuteStickerSuggestion = buildStyleAssistSuggestion("blue cute sticker", "core");

assert.ok(blueCuteStickerSuggestion);
assert.equal(blueCuteStickerSuggestion.presetId, "sticker");
assert.equal(
  blueCuteStickerSuggestion.textColor,
  "#7dd3fc",
  "explicit color words should override template context words like cute",
);

const classroomSuggestion = buildStyleAssistSuggestion("green classroom label", "letters");

assert.ok(classroomSuggestion);
assert.equal(classroomSuggestion.presetId, "kid");
assert.equal(classroomSuggestion.fontCategories[0], "school");
assert.equal(classroomSuggestion.textColor, "#22c55e");
assert.equal(classroomSuggestion.backgroundColor, "#dcfce7");

const outlineSuggestion = buildStyleAssistSuggestion("black outline logo", "core");

assert.ok(outlineSuggestion);
assert.equal(outlineSuggestion.presetId, "outline");
assert.equal(outlineSuggestion.outlineEnabled, true);
assert.equal(outlineSuggestion.textColor, "#111827");
assert.equal(outlineSuggestion.backgroundColor, "#f8fafc");

const neonSuggestion = buildStyleAssistSuggestion("neon party", "core");

assert.ok(neonSuggestion);
assert.equal(neonSuggestion.presetId, "chunky");
assert.equal(neonSuggestion.textColor, "#d946ef");
assert.equal(neonSuggestion.backgroundColor, "#111827");

const rainbowSuggestion = buildStyleAssistSuggestion("rainbow playful name", "letters");

assert.ok(rainbowSuggestion);
assert.equal(rainbowSuggestion.presetId, "kid");
assert.equal(rainbowSuggestion.textColor, "#f97316");
assert.equal(rainbowSuggestion.backgroundColor, "#dbeafe");

const removeShadowSuggestion = buildStyleAssistSuggestion("remove shadow", "core");

assert.ok(removeShadowSuggestion);
assert.equal(removeShadowSuggestion.shadowEnabled, false);
assert.equal(removeShadowSuggestion.applyColors, false);
assert.deepEqual(removeShadowSuggestion.fontCategories, []);
assert.equal(removeShadowSuggestion.shadowBlurDelta, -30);

const biggerTextSuggestion = buildStyleAssistSuggestion("bigger text", "core");

assert.ok(biggerTextSuggestion);
assert.equal(biggerTextSuggestion.applyColors, false);
assert.deepEqual(biggerTextSuggestion.fontCategories, []);
assert.equal(biggerTextSuggestion.fontSizeDelta, 18);
assert.match(biggerTextSuggestion.message, /bigger text/i);

const tighterSpacingSuggestion = buildStyleAssistSuggestion("tighter letter spacing", "core");

assert.ok(tighterSpacingSuggestion);
assert.equal(tighterSpacingSuggestion.applyColors, false);
assert.equal(tighterSpacingSuggestion.letterSpacingDelta, -2);

const removeOutlineSuggestion = buildStyleAssistSuggestion("remove outline", "core");

assert.ok(removeOutlineSuggestion);
assert.equal(removeOutlineSuggestion.applyColors, false);
assert.equal(removeOutlineSuggestion.outlineEnabled, false);

const orangeSuggestion = buildStyleAssistSuggestion("orange warm bubble", "core");

assert.ok(orangeSuggestion);
assert.equal(orangeSuggestion.applyColors, true);
assert.equal(orangeSuggestion.textColor, "#f97316");

const whiteSuggestion = buildStyleAssistSuggestion("clean white bubble", "core");

assert.ok(whiteSuggestion);
assert.equal(whiteSuggestion.applyColors, true);
assert.equal(whiteSuggestion.textColor, "#f8fafc");

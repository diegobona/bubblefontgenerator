import assert from "node:assert/strict";

import { buildStyleAssistSuggestion } from "../lib/ai-style-assist";

const stickerSuggestion = buildStyleAssistSuggestion("cute pink sticker", "core");

assert.ok(stickerSuggestion);
assert.equal(stickerSuggestion.presetId, "sticker");
assert.equal(stickerSuggestion.textColor, "#ff5fa2");
assert.equal(stickerSuggestion.backgroundColor, "#f6c7ea");
assert.equal(stickerSuggestion.stickerEdgeEnabled, true);

const graffitiSuggestion = buildStyleAssistSuggestion("blue graffiti street", "core");

assert.ok(graffitiSuggestion);
assert.equal(graffitiSuggestion.presetId, "graffiti");
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

const classroomSuggestion = buildStyleAssistSuggestion("green classroom label", "letters");

assert.ok(classroomSuggestion);
assert.equal(classroomSuggestion.presetId, "kid");
assert.equal(classroomSuggestion.textColor, "#22c55e");
assert.equal(classroomSuggestion.backgroundColor, "#dcfce7");

const outlineSuggestion = buildStyleAssistSuggestion("black outline logo", "core");

assert.ok(outlineSuggestion);
assert.equal(outlineSuggestion.presetId, "outline");
assert.equal(outlineSuggestion.textColor, "#111827");
assert.equal(outlineSuggestion.backgroundColor, "#f8fafc");

const neonSuggestion = buildStyleAssistSuggestion("neon purple party", "core");

assert.ok(neonSuggestion);
assert.equal(neonSuggestion.presetId, "chunky");
assert.equal(neonSuggestion.textColor, "#d946ef");
assert.equal(neonSuggestion.backgroundColor, "#111827");

const rainbowSuggestion = buildStyleAssistSuggestion("rainbow playful name", "letters");

assert.ok(rainbowSuggestion);
assert.equal(rainbowSuggestion.presetId, "kid");
assert.equal(rainbowSuggestion.textColor, "#f97316");
assert.equal(rainbowSuggestion.backgroundColor, "#dbeafe");

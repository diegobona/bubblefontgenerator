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

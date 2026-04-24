import assert from "node:assert/strict";

import {
  RESULT_CARD_PREVIEW_HEIGHTS,
  resultCardPreviewClassName,
} from "../lib/result-card-layout";

assert.ok(
  RESULT_CARD_PREVIEW_HEIGHTS.base >= 120,
  "preview cards should keep enough height for two-line text",
);
assert.ok(
  RESULT_CARD_PREVIEW_HEIGHTS.desktop <= 150,
  "preview cards should stay compact for faster font comparison",
);
assert.match(resultCardPreviewClassName, /h-\[132px\]/);
assert.match(resultCardPreviewClassName, /sm:h-\[142px\]/);
assert.match(resultCardPreviewClassName, /xl:h-\[136px\]/);

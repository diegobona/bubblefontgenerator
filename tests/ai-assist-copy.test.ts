import assert from "node:assert/strict";

import {
  AI_ASSIST_TEMPLATE_PLACEHOLDER,
  AI_ASSIST_TEMPLATE_NATIVE_SELECT_CLASS_NAME,
  AI_ASSIST_TEMPLATE_VALUE_CLASS_NAME,
} from "../lib/ai-assist-copy";

assert.equal(AI_ASSIST_TEMPLATE_PLACEHOLDER, "choose a template,can edit");
assert.ok(
  AI_ASSIST_TEMPLATE_PLACEHOLDER.length <= 28,
  "template placeholder should stay short enough to fit inside the select",
);
assert.match(
  AI_ASSIST_TEMPLATE_NATIVE_SELECT_CLASS_NAME,
  /opacity-0/,
  "native select text should be hidden so browser select clipping cannot cut the placeholder",
);
assert.match(
  AI_ASSIST_TEMPLATE_VALUE_CLASS_NAME,
  /text-\[12px\]/,
  "visible template placeholder should stay readable now that native select clipping is avoided",
);
assert.match(
  AI_ASSIST_TEMPLATE_VALUE_CLASS_NAME,
  /whitespace-nowrap/,
  "visible template placeholder should render on one line without native select clipping",
);

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const articlesPageSource = readFileSync("app/articles/page.tsx", "utf8");
const seoPageSource = readFileSync("components/sections/seo-page.tsx", "utf8");
const bubbleEditorSource = readFileSync("components/editor/bubble-editor.tsx", "utf8");
const writingPageSource = readFileSync("app/bubble-writing-font-generator/page.tsx", "utf8");
const nestedWritingPageSource = readFileSync(
  "app/bubble-font-generator/bubble-writing-font-generator/page.tsx",
  "utf8",
);

assert.ok(
  !articlesPageSource.includes('<header className="sr-only">'),
  "articles hub should show its H1 and intro instead of hiding the page topic",
);

assert.ok(
  !seoPageSource.includes('isToolPage ? "sr-only"'),
  "tool pages should show their intro instead of hiding it from users",
);

assert.ok(
  !seoPageSource.includes("{visibleToolSections.map"),
  "tool page supporting copy should not be rendered only in a screen-reader section",
);

assert.ok(
  writingPageSource.includes("permanentRedirect(routes.bubbleLetterFontGenerator)"),
  "Bubble Writing page should permanently redirect to Bubble Letter Font Generator",
);

assert.ok(
  nestedWritingPageSource.includes("permanentRedirect(routes.bubbleLetterFontGenerator)"),
  "Nested Bubble Writing URL should permanently redirect to Bubble Letter Font Generator",
);

assert.ok(
  !bubbleEditorSource.includes('path === routes.bubbleWritingFontGenerator'),
  "Bubble Writing should not keep a separate editor variant after merging",
);

assert.match(
  bubbleEditorSource,
  /graffiti:[\s\S]*defaultText: "Graffiti\\nBlast"[\s\S]*outlineWidth: 16[\s\S]*depth: 24/,
  "Graffiti page should have a visibly stronger default style",
);

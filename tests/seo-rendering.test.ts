import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const articlesPageSource = readFileSync("app/articles/page.tsx", "utf8");
const pageContainerSource = readFileSync("components/layout/page-container.tsx", "utf8");
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
assert.match(
  seoPageSource,
  /data-home-hero-header="true"[\s\S]*data-home-trust-items="true"[\s\S]*xl:justify-end/,
  "homepage trust tags should sit in the hero header row on large screens",
);
assert.ok(
  pageContainerSource.includes('max-w-[1680px]'),
  "PageContainer should support a wider layout for the homepage tool area",
);
assert.match(
  seoPageSource,
  /<PageContainer size=\{isHomePage \? "wide" : "default"\}>/,
  "homepage should use the wider container while inner pages keep the default reading width",
);
assert.ok(
  !seoPageSource.includes("lg:max-w-xl"),
  "homepage trust tags should not be capped too narrowly on large screens",
);
assert.ok(
  !seoPageSource.includes("max-w-2xl text-sm leading-6"),
  "homepage intro should have enough width to avoid unnecessary wrapping",
);
assert.ok(
  !seoPageSource.includes('<header className="mb-5">'),
  "homepage header spacing should stay compact so the editor starts higher",
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
assert.ok(
  bubbleEditorSource.includes('xl:grid-cols-[420px_minmax(0,1fr)]'),
  "desktop editor layout should give the left control panel enough width for short AI Assist copy",
);
assert.ok(
  !bubbleEditorSource.includes('xl:grid-cols-[300px_minmax(0,1fr)]'),
  "desktop editor layout should not keep the narrow 300px control panel",
);

assert.ok(
  bubbleEditorSource.includes('data-editor-color-controls="true"'),
  "color controls should have a stable wrapper for compact layout",
);
assert.ok(
  !bubbleEditorSource.includes('data-editor-color-controls="true" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1"'),
  "text and background color controls should stay on one row in the desktop sidebar",
);
assert.match(
  bubbleEditorSource,
  /data-editor-color-controls="true"[\s\S]*data-editor-font-size-control="true"[\s\S]*<details[\s\S]*Advanced Options/,
  "font size should sit below the color controls, outside Advanced Options",
);
assert.ok(
  !bubbleEditorSource.match(/<details[\s\S]*Advanced Options[\s\S]*<span>Font Size<\/span>/),
  "Advanced Options should start after the primary font size control",
);

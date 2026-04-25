import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const articlesPageSource = readFileSync("app/articles/page.tsx", "utf8");
const seoPageSource = readFileSync("components/sections/seo-page.tsx", "utf8");

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

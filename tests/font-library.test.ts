import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  BUBBLE_FONT_PAGE_SIZE,
  bubbleFontLibrary,
  coreBubbleFonts,
  getBubbleFontsForDistinctFirstView,
  getBubbleFontsForDisplay,
} from "../lib/font-library";

assert.equal(bubbleFontLibrary.length, 127);
assert.equal(BUBBLE_FONT_PAGE_SIZE, 24);

assert.ok(
  coreBubbleFonts.length >= 10 && coreBubbleFonts.length <= 12,
  "the first view should keep the core font set lightweight",
);

const ids = new Set<string>();

for (const font of bubbleFontLibrary) {
  assert.ok(font.id, "font id is required");
  assert.ok(!ids.has(font.id), `duplicate font id: ${font.id}`);
  ids.add(font.id);

  assert.ok(font.family, `${font.id} needs a CSS font family`);
  assert.ok(font.displayName, `${font.id} needs a display name`);
  assert.ok(font.author, `${font.id} needs an author or foundry`);
  assert.ok(font.sourceUrl.startsWith("https://"), `${font.id} needs a source URL`);
  assert.ok(font.licenseUrl.startsWith("https://"), `${font.id} needs a license URL`);
  assert.ok(font.filePath.startsWith("/fonts/"), `${font.id} needs a local font file path`);
  assert.ok(
    existsSync(join(process.cwd(), "public", font.filePath)),
    `${font.id} local font file is missing`,
  );
  assert.ok(font.categories.length > 0, `${font.id} needs at least one category`);
  assert.equal(font.allowsCommercialUse, true, `${font.id} must allow commercial use`);
  assert.equal(font.allowsWebEmbedding, true, `${font.id} must allow web embedding`);
  assert.equal(font.allowsRedistribution, true, `${font.id} must allow redistribution`);
}

const graffitiFonts = getBubbleFontsForDisplay({
  preferredCategories: ["graffiti"],
  sortKey: "popular",
});

assert.ok(graffitiFonts.length >= bubbleFontLibrary.length);
assert.ok(
  graffitiFonts[0].categories.includes("graffiti"),
  "graffiti recommendations should be sorted to the top",
);

const nameSortedFonts = getBubbleFontsForDisplay({
  preferredCategories: [],
  sortKey: "name",
});

assert.equal(nameSortedFonts[0].displayName, "Aclonica");

const globalNameSortedFonts = getBubbleFontsForDisplay({
  preferredCategories: ["graffiti"],
  sortKey: "name",
});

assert.equal(
  globalNameSortedFonts[0].displayName,
  "Aclonica",
  "name sorting should remain global even after AI recommendations",
);

const newestFonts = getBubbleFontsForDisplay({
  preferredCategories: [],
  sortKey: "newest",
});

assert.ok(
  newestFonts[0].addedRank > newestFonts.at(-1)!.addedRank,
  "newest sorting should prioritize recently added fonts",
);

const trendingFonts = getBubbleFontsForDisplay({
  preferredCategories: [],
  sortKey: "trending",
});

assert.equal(trendingFonts[0].id, "sour-gummy");
assert.ok(
  trendingFonts[0].trendingScore >= trendingFonts[1].trendingScore,
  "trending sorting should use the curated trending score",
);

const popularFonts = getBubbleFontsForDisplay({
  preferredCategories: [],
  sortKey: "popular",
});

assert.equal(popularFonts[0].id, "rubik-bubbles");

const bubbleLetterFonts = getBubbleFontsForDistinctFirstView({
  preferredCategories: ["school", "cute", "outline"],
  sortKey: "popular",
});
const firstBubbleLetterPage = bubbleLetterFonts.slice(0, BUBBLE_FONT_PAGE_SIZE);
const firstPageBalooFonts = firstBubbleLetterPage.filter((font) =>
  font.id.startsWith("baloo"),
);
const lastBubbleLetterPage = bubbleLetterFonts.slice(-12);

assert.ok(
  firstPageBalooFonts.length <= 1,
  "bubble letter first page should avoid repeated Baloo-family fonts",
);
assert.ok(
  firstBubbleLetterPage.some((font) => font.id === "rubik-bubbles"),
  "bubble letter first page should keep visually distinct bubble fonts near the top",
);
assert.ok(
  firstBubbleLetterPage.some((font) => font.id === "bubblegum-sans"),
  "bubble letter first page should keep Bubblegum Sans near the top",
);
assert.ok(
  lastBubbleLetterPage.filter((font) => font.id.startsWith("baloo")).length >= 4,
  "duplicate Baloo-family fonts should be pushed to the end of the bubble letter list",
);

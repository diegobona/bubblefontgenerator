import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  bubbleFontLibrary,
  coreBubbleFonts,
  getBubbleFontsForCategoryPreference,
} from "../lib/font-library";

assert.ok(
  bubbleFontLibrary.length >= 50,
  "the bubble font generator should expose at least 50 real font choices",
);

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

const graffitiFonts = getBubbleFontsForCategoryPreference(["graffiti"]);

assert.ok(graffitiFonts.length >= bubbleFontLibrary.length);
assert.ok(
  graffitiFonts[0].categories.includes("graffiti"),
  "graffiti recommendations should be sorted to the top",
);

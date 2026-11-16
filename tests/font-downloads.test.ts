import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { bubbleFontLibrary } from "../lib/font-library";
import { downloadableFonts, searchDownloadableFonts } from "../lib/font-downloads";

const licenseDirectory = join(process.cwd(), "public/fonts/licenses");
assert.ok(
  existsSync(join(licenseDirectory, "manifest.json")),
  "downloadable font files need an accompanying, family-specific license manifest",
);

const manifest = JSON.parse(readFileSync(join(licenseDirectory, "manifest.json"), "utf8")) as {
  revision: string;
  fonts: Record<string, { name: string; path: string; sourceUrl: string; sha256: string }>;
};
assert.match(manifest.revision, /^[a-f0-9]{40}$/);
assert.deepEqual(Object.keys(manifest.fonts).sort(), bubbleFontLibrary.map((font) => font.id).sort());

for (const font of bubbleFontLibrary) {
  const license = manifest.fonts[font.id];
  const bytes = readFileSync(join(process.cwd(), "public", font.filePath));
  assert.equal(bytes.readUInt32BE(0), 0x00010000, `${font.id} must be an actual TrueType font`);
  assert.ok(bytes.length > 1000, `${font.id} must not be an empty download`);
  assert.match(license.path, /^\/fonts\/licenses\/[a-z0-9-]+\.txt$/);
  const text = readFileSync(join(process.cwd(), "public", license.path), "utf8");
  assert.ok(text.length > 1000, `${font.id} needs the full license, not a short attribution`);
  assert.match(text, /SIL OPEN FONT LICENSE|Apache License|UBUNTU FONT LICEN[CS]E/i);
  assert.equal(createHash("sha256").update(text).digest("hex"), license.sha256);
  assert.ok(license.sourceUrl.startsWith(`https://github.com/google/fonts/blob/${manifest.revision}/`));
  assert.ok(license.name.length > 0);
}

assert.equal(downloadableFonts.length, bubbleFontLibrary.length);
assert.equal(searchDownloadableFonts("   ").length, bubbleFontLibrary.length);
assert.equal(searchDownloadableFonts("RUBIK bubbles")[0].id, "rubik-bubbles");
assert.ok(searchDownloadableFonts("outline").every((font) => font.categories.includes("outline") || font.displayName.toLowerCase().includes("outline")));
assert.ok(searchDownloadableFonts("", "school").every((font) => font.categories.includes("school")));
assert.deepEqual(searchDownloadableFonts("no-such-font-123"), []);
assert.deepEqual(searchDownloadableFonts("Rubik Bubbles", "handwritten"), []);
assert.equal(searchDownloadableFonts("")[0].id, "rubik-bubbles", "default list should show the popular bubble font first");
for (const font of downloadableFonts) {
  assert.equal(font.downloadName, font.filePath.split("/").at(-1));
  assert.equal(font.license.path, manifest.fonts[font.id].path);
}

console.log("Font downloads: all local TTF files and accompanying licenses verified.");

import assert from "node:assert/strict";

import { buildEmbeddedSvgFontFaceCss } from "../lib/svg-font-face";

const css = buildEmbeddedSvgFontFaceCss({
  family: "Rubik Bubbles",
  fontWeight: "400",
  fontDataUrl: "data:font/ttf;base64,AAEAAA",
});

assert.match(css, /@font-face/);
assert.match(css, /font-family:"Rubik Bubbles"/);
assert.match(css, /src:url\("data:font\/ttf;base64,AAEAAA"\) format\("truetype"\)/);
assert.match(css, /font-weight:400/);
assert.doesNotMatch(
  css,
  /\/fonts\/google\/rubik-bubbles\.ttf/,
  "download SVG font CSS should embed the font instead of pointing at an external file",
);

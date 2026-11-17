import assert from "node:assert/strict";
import { homeArtworkColors, homeArtworkDefaults } from "../lib/home-artwork";

const defaults = { text: false, background: false };
const first = homeArtworkColors("rubik-bubbles", homeArtworkDefaults, defaults);
const second = homeArtworkColors("bungee", homeArtworkDefaults, defaults);
assert.notEqual(first.textColor, second.textColor);
assert.notEqual(first.backgroundColor, second.backgroundColor);
assert.deepEqual(homeArtworkColors("bungee", homeArtworkDefaults, { text: true, background: true }), first,
  "Explicitly choosing the first palette must override the other default palettes too");
const custom = { textColor: "#123456", backgroundColor: "#abcdef" };
assert.deepEqual(homeArtworkColors("bungee", custom, defaults), custom,
  "AI or color-control changes take priority over decorative defaults");

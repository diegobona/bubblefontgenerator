import assert from "node:assert/strict";

import {
  HOME_VISIBLE_FAQ_COUNT,
  HOME_VISIBLE_SECTION_COUNT,
  HOME_VISIBLE_STYLE_IDEA_COUNT,
} from "../lib/home-seo-layout";
import { homeStyleIdeas, pageDocuments } from "../lib/page-data";
import { routes } from "../lib/routes";

const home = pageDocuments.home;
const bubbleLetterPage = pageDocuments.bubbleLetterFontGenerator;
const graffitiPage = pageDocuments.bubbleGraffitiFontGenerator;
const pngPage = pageDocuments.bubbleFontGeneratorPng;
const transparentPage = pageDocuments.transparentBubbleFontGenerator;

assert.equal(home.h1, "Bubble Font Generator");
assert.match(home.title, /Free Bubble Letter PNG Maker/);
assert.match(home.description, /transparent background/i);
assert.match(home.intro, /real bubble font text/i);
assert.match(home.intro, /download PNG images/i);

const homeText = [
  home.title,
  home.description,
  home.intro,
  ...home.sections.flatMap((section) => [section.title, ...section.paragraphs]),
  ...home.faqs.flatMap((faq) => [faq.question, faq.answer]),
].join(" ");

assert.match(homeText, /real bubble fonts/i);
assert.match(homeText, /transparent background/i);
assert.match(homeText, /copy-and-paste/i);
assert.match(homeText, /stickers/i);
assert.match(homeText, /logos/i);
assert.match(homeText, /classroom/i);
assert.match(homeText, /bubbly font generator/i);
assert.match(homeText, /font generator bubble/i);
assert.match(homeText, /bubble fonts generator/i);
assert.match(homeText, /bubble text font generator/i);
assert.match(homeText, /bubble font generator copy and paste/i);
assert.match(homeText, /bubbly font generator copy and paste/i);
assert.match(homeText, /3D bubble font generator/i);
assert.match(homeText, /70s bubble font generator/i);
assert.match(homeText, /bubble font alphabet generator/i);

assert.equal(
  HOME_VISIBLE_SECTION_COUNT,
  0,
  "homepage should collapse supporting SEO explanation by default",
);
assert.equal(
  HOME_VISIBLE_STYLE_IDEA_COUNT,
  0,
  "homepage should not show the long-tail style idea grid by default",
);
assert.equal(
  HOME_VISIBLE_FAQ_COUNT,
  0,
  "homepage should collapse FAQ answers by default",
);

const styleIdeaLabels = homeStyleIdeas.map((idea) => idea.label).join(" ");

assert.match(styleIdeaLabels, /3D Bubble Font Generator/i);
assert.match(styleIdeaLabels, /70s Bubble Font Generator/i);
assert.match(styleIdeaLabels, /Black Bubble Font Generator/i);
assert.match(styleIdeaLabels, /Bubble Calligraphy Font Generator/i);
assert.match(styleIdeaLabels, /Bubble Cursive Font Generator/i);
assert.match(styleIdeaLabels, /Bubble Font Alphabet Generator/i);
assert.ok(
  homeStyleIdeas.every((idea) => idea.prompt.length > 0),
  "home style ideas should map to usable AI Assist prompts",
);

const bubbleLetterText = [
  bubbleLetterPage.title,
  bubbleLetterPage.description,
  bubbleLetterPage.intro,
  ...bubbleLetterPage.sections.flatMap((section) => [
    section.title,
    ...section.paragraphs,
  ]),
  ...bubbleLetterPage.faqs.flatMap((faq) => [faq.question, faq.answer]),
].join(" ");

assert.match(bubbleLetterText, /bubble letter font generator/i);
assert.match(bubbleLetterText, /font generator bubble letters/i);
assert.match(bubbleLetterText, /bubble letter generator font/i);
assert.match(bubbleLetterText, /bubble letters font generator/i);

const graffitiText = [
  graffitiPage.title,
  graffitiPage.description,
  graffitiPage.intro,
  ...graffitiPage.sections.flatMap((section) => [
    section.title,
    ...section.paragraphs,
  ]),
].join(" ");

assert.match(graffitiText, /bubble graffiti font generator/i);
assert.match(graffitiText, /graffiti bubble font generator/i);

assert.ok(
  home.relatedLinks.some((link) => link.href === routes.bubbleFontGeneratorPng),
  "homepage should link to the PNG-focused long-tail page",
);
assert.ok(
  home.relatedLinks.some((link) => link.href === routes.transparentBubbleFontGenerator),
  "homepage should link to the transparent-background long-tail page",
);

assert.equal(pngPage.path, routes.bubbleFontGeneratorPng);
assert.match(pngPage.title, /Bubble Font Generator PNG/);
assert.match(pngPage.description, /download bubble letters as images/i);
assert.match(pngPage.intro, /PNG/i);

assert.equal(transparentPage.path, routes.transparentBubbleFontGenerator);
assert.match(transparentPage.title, /Transparent Bubble Font Generator/);
assert.match(transparentPage.description, /transparent background/i);
assert.match(transparentPage.intro, /transparent/i);

import assert from "node:assert/strict";

import {
  HOME_VISIBLE_FAQ_COUNT,
  HOME_VISIBLE_SECTION_COUNT,
  HOME_VISIBLE_STYLE_IDEA_COUNT,
} from "../lib/home-seo-layout";
import { buildMetadata } from "../lib/metadata";
import { type LinkItem, homeStyleIdeas, pageDocuments } from "../lib/page-data";
import { routes } from "../lib/routes";
import { homePreviewImage } from "../lib/seo-assets";
import { footerToolLinks, primaryNavLinks } from "../lib/site";

const home = pageDocuments.home;
const bubbleLetterPage = pageDocuments.bubbleLetterFontGenerator;
const graffitiPage = pageDocuments.bubbleGraffitiFontGenerator;
const pngPage = pageDocuments.bubbleFontGeneratorPng;
const transparentPage = pageDocuments.transparentBubbleFontGenerator;
const allPages = Object.values(pageDocuments);

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

const uniqueTitles = new Set(allPages.map((page) => page.title));
const uniqueDescriptions = new Set(allPages.map((page) => page.description));
const uniqueH1s = new Set(allPages.map((page) => page.h1));

assert.equal(uniqueTitles.size, allPages.length, "every page should have a unique title");
assert.equal(
  uniqueDescriptions.size,
  allPages.length,
  "every page should have a unique description",
);
assert.equal(uniqueH1s.size, allPages.length, "every page should have a unique H1");

const homeMetadata = buildMetadata(home);
const canonicalUrls = allPages.map((page) => buildMetadata(page).alternates?.canonical);

assert.ok(!("keywords" in homeMetadata), "home metadata should not use meta keywords");
assert.match(
  JSON.stringify(homeMetadata.openGraph),
  /bubble-home-preview\.svg/,
  "home Open Graph metadata should include the preview image",
);
assert.match(
  JSON.stringify(homeMetadata.openGraph),
  /Bubble font generator preview/i,
  "home Open Graph metadata should include natural image alt text",
);
assert.equal(
  new Set(canonicalUrls).size,
  canonicalUrls.length,
  "each page should have a unique canonical URL",
);

for (const page of allPages) {
  const metadata = buildMetadata(page);

  assert.equal(
    metadata.alternates?.canonical,
    `https://bubblefontgenerator.net${page.path}`,
    `${page.path} should use its own canonical URL`,
  );
}

const requiredHomeInternalLinks = [
  routes.bubbleLetterFontGenerator,
  routes.bubbleFontGeneratorPng,
  routes.transparentBubbleFontGenerator,
  routes.bubbleGraffitiFontGenerator,
  routes.howToMakeBubbleLetters,
];

for (const href of requiredHomeInternalLinks) {
  assert.ok(
    home.relatedLinks.some((link) => link.href === href),
    `homepage should internally link to ${href}`,
  );
}

const knownRoutes = new Set<string>(Object.values(routes));
const allRelatedLinks: LinkItem[] = [];

for (const page of allPages) {
  allRelatedLinks.push(...page.relatedLinks);
}

for (const link of allRelatedLinks) {
  assert.ok(knownRoutes.has(link.href), `${link.label} should link to a known route`);
}

const primaryNavLabels = new Map(primaryNavLinks.map((link) => [link.href, link.label]));

for (const href of [
  routes.bubbleLetterFontGenerator,
  routes.bubbleWritingFontGenerator,
  routes.bubbleGraffitiFontGenerator,
]) {
  assert.match(
    primaryNavLabels.get(href) ?? "",
    /Generator/,
    `${href} primary nav label should use clear generator anchor text`,
  );
}

const footerToolHrefs = new Set<string>(footerToolLinks.map((link) => link.href));

for (const href of [
  routes.bubbleFontGeneratorPng,
  routes.transparentBubbleFontGenerator,
]) {
  assert.ok(
    footerToolHrefs.has(href),
    `footer tool links should include ${href}`,
  );
}

for (const page of allPages.filter((item) => item.path !== routes.home)) {
  assert.ok(
    page.relatedLinks.some((link) => link.href === routes.home),
    `${page.path} should link back to the Bubble Font Generator homepage`,
  );
}

assert.equal(homePreviewImage.src, "/images/seo/bubble-home-preview.svg");
assert.match(homePreviewImage.alt, /bubble font generator preview/i);
assert.ok(homePreviewImage.width >= 300, "home preview image should be large enough");
assert.ok(homePreviewImage.height >= 300, "home preview image should be large enough");

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

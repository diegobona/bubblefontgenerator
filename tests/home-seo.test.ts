import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { buildMetadata } from "../lib/metadata";
import { type LinkItem, homeStyleIdeas, pageDocuments } from "../lib/page-data";
import { routes } from "../lib/routes";
import { homePreviewImage } from "../lib/seo-assets";
import { footerToolLinks, primaryNavLinks, siteConfig } from "../lib/site";

const home = pageDocuments.home;
const bubbleLetterPage = pageDocuments.bubbleLetterFontGenerator;
const graffitiPage = pageDocuments.bubbleGraffitiFontGenerator;
const pngPage = pageDocuments.bubbleFontGeneratorPng;
const transparentPage = pageDocuments.transparentBubbleFontGenerator;
const allPages = Object.values(pageDocuments);

assert.equal(home.h1, "Bubble Font Generator");
assert.match(home.title, /Free Bubble Letter PNG Maker/);
for (const phrase of ["bubble font generator", "free", "copy and paste", "bubble text"]) {
  assert.ok(home.description.toLowerCase().includes(phrase));
}
assert.ok(home.description.length >= 140 && home.description.length <= 160);
assert.match(home.intro, /copy and paste/i);
const homeContent = readFileSync("components/sections/home-content.tsx", "utf8");
assert.match(homeContent, /Bubble Text Generator/);
assert.ok(!/bubbly font generator|font generator bubble|bubble text font generator/.test(homeContent));
assert.match(homeContent, /routes.bubbleLetterFontGenerator, "bubble letter generator"/);

const homeText = [
  home.title,
  home.description,
  home.intro,
  ...home.sections.flatMap((section) => [section.title, ...section.paragraphs]),
  ...home.faqs.flatMap((faq) => [faq.question, faq.answer]),
].join(" ");

assert.match(homeText, /transparent background/i);
assert.match(homeText, /stickers/i);

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

assert.ok(
  !("bubbleWritingFontGenerator" in pageDocuments),
  "Bubble Writing should be merged into the Bubble Letter page instead of indexed as a separate page",
);

const knownRoutes = new Set<string>(Object.values(routes));
const allRelatedLinks: LinkItem[] = [];

for (const page of allPages) {
  allRelatedLinks.push(...page.relatedLinks);
}

for (const link of allRelatedLinks) {
  assert.ok(knownRoutes.has(link.href), `${link.label} should link to a known route`);
  assert.notEqual(
    link.href,
    routes.bubbleWritingFontGenerator,
    "site content should not actively link to the merged Bubble Writing page",
  );
}

const primaryNavLabels = new Map<string, string>(
  primaryNavLinks.map((link) => [link.href, link.label]),
);

assert.deepEqual(
  primaryNavLinks.map((link) => link.href),
  [
    routes.home,
    routes.printableBubbleLetters,
    routes.bubbleLettersFont,
    routes.bubbleLetterFontGenerator,
    routes.transparentBubbleFontGenerator,
    routes.bubbleGraffitiFontGenerator,
    routes.articles,
  ],
  "primary navigation should include printable templates and fonts alongside existing tools",
);
assert.equal(
  primaryNavLabels.get(routes.transparentBubbleFontGenerator),
  "Transparent PNG",
  "transparent generator should use the short Transparent PNG top-nav label",
);
assert.equal(
  primaryNavLabels.get(routes.articles),
  "Articles",
  "article hub should use the short Articles top-nav label",
);
assert.equal(
  siteConfig.brandName,
  "BubbleFont",
  "header brand should be distinct from the Bubble Font Generator homepage nav label",
);
assert.notEqual(
  siteConfig.brandName,
  primaryNavLabels.get(routes.home),
  "header brand and homepage nav entry should not repeat the same visible text",
);

for (const href of [
  routes.bubbleLetterFontGenerator,
  routes.bubbleGraffitiFontGenerator,
]) {
  assert.match(
    primaryNavLabels.get(href) ?? "",
    /Generator/,
    `${href} primary nav label should use clear generator anchor text`,
  );
}

assert.ok(
  !primaryNavLabels.has(routes.bubbleWritingFontGenerator),
  "primary navigation should not link to the merged Bubble Writing page",
);

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

assert.ok(
  !footerToolHrefs.has(routes.bubbleWritingFontGenerator),
  "footer should not link to the merged Bubble Writing page",
);

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
assert.doesNotMatch(bubbleLetterText, /font generator bubble letters|bubble letter generator font|bubble letters font generator|searches/i);
assert.ok(bubbleLetterPage.description.length >= 140 && bubbleLetterPage.description.length <= 160);
assert.equal(bubbleLetterPage.faqs.length, 5);
const letterBody = [
  ...bubbleLetterPage.sections.flatMap(section => [section.title, ...section.paragraphs]),
  ...bubbleLetterPage.faqs.flatMap(faq => [faq.question, faq.answer]),
].join(" ");
const letterWords = letterBody.match(/\b\w+(?:['¡¯-]\w+)*\b/g)?.length ?? 0;
const letterMentions = letterBody.match(/bubble letter font generator/gi)?.length ?? 0;
assert.ok(letterWords >= 1000);
assert.ok(letterMentions <= 17);
assert.ok(letterMentions * 300 / letterWords >= 2 && letterMentions * 300 / letterWords <= 5);
for (const phrase of ["bubble letter maker", "bubble letter creator"]) {
  const count = letterBody.split(phrase).length - 1;
  assert.ok(count >= 1 && count <= 2);
}

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

import { routes } from "./routes";

export const siteConfig = {
  name: "Bubble Font Generator",
  siteName: "Bubble Font Generator",
  url: "https://bubblefontgenerator.net",
  description:
    "Use the Bubble Font Generator to generate bubble text online, compare multiple rounded styles, customize colors and effects, and download a PNG in seconds.",
  locale: "en_US",
} as const;

export const primaryNavLinks = [
  { href: routes.home, label: "Bubble Font Generator" },
  { href: routes.bubbleLetterFontGenerator, label: "Bubble Letters" },
  { href: routes.bubbleWritingFontGenerator, label: "Bubble Writing" },
  { href: routes.bubbleGraffitiFontGenerator, label: "Graffiti Bubble" },
  { href: routes.articles, label: "Articles" },
];

export const footerToolLinks = [
  {
    href: routes.bubbleLetterFontGenerator,
    label: "Bubble Letter Font Generator",
  },
  {
    href: routes.bubbleWritingFontGenerator,
    label: "Bubble Writing Font Generator",
  },
  {
    href: routes.bubbleGraffitiFontGenerator,
    label: "Bubble Graffiti Font Generator",
  },
];

export const footerArticleLinks = [
  { href: routes.whatIsBubbleFont, label: "What Is Bubble Font?" },
  {
    href: routes.howToMakeBubbleLetters,
    label: "How to Make Bubble Letters",
  },
  {
    href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
    label: "Bubble Font Generator vs Bubble Letter Font Generator",
  },
  {
    href: routes.freeBubbleFontGenerator,
    label: "Free Bubble Font Generator Guide",
  },
];

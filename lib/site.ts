import { routes } from "./routes";

export const siteConfig = {
  name: "Bubble Font Generator",
  siteName: "Bubble Font Generator",
  url: "https://www.bubblefontgenerator.com",
  description:
    "Create bubble text online with a focused bubble font generator built for letters, bubble writing, and bubble graffiti styles.",
  locale: "en_US",
} as const;

export const primaryNavLinks = [
  { href: routes.home, label: "Home" },
  { href: routes.bubbleFontGenerator, label: "Bubble Font Generator" },
];

export const headerToolLinks = [
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

export const headerArticleLinks = [
  { href: routes.whatIsBubbleFont, label: "What Is Bubble Font?" },
  {
    href: routes.howToMakeBubbleLetters,
    label: "How to Make Bubble Letters",
  },
  {
    href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
    label: "Comparison Guide",
  },
  {
    href: routes.freeBubbleFontGenerator,
    label: "Free Bubble Font Generator Guide",
  },
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

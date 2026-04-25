export const routes = {
  home: "/",
  articles: "/articles/",
  bubbleFontGenerator: "/bubble-font-generator/",
  bubbleFontGeneratorPng: "/bubble-font-generator-png/",
  bubbleLetterFontGenerator: "/bubble-letter-font-generator/",
  transparentBubbleFontGenerator: "/transparent-bubble-font-generator/",
  bubbleWritingFontGenerator: "/bubble-writing-font-generator/",
  bubbleGraffitiFontGenerator: "/bubble-graffiti-font-generator/",
  whatIsBubbleFont: "/articles/what-is-bubble-font/",
  howToMakeBubbleLetters: "/articles/how-to-make-bubble-letters/",
  bubbleFontGeneratorVsBubbleLetterFontGenerator:
    "/articles/bubble-font-generator-vs-bubble-letter-font-generator/",
  freeBubbleFontGenerator: "/articles/free-bubble-font-generator/",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

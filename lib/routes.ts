export const routes = {
  home: "/",
  bubbleFontGenerator: "/bubble-font-generator/",
  bubbleLetterFontGenerator:
    "/bubble-font-generator/bubble-letter-font-generator/",
  bubbleWritingFontGenerator:
    "/bubble-font-generator/bubble-writing-font-generator/",
  bubbleGraffitiFontGenerator:
    "/bubble-font-generator/bubble-graffiti-font-generator/",
  whatIsBubbleFont: "/bubble-font-generator/what-is-bubble-font/",
  howToMakeBubbleLetters: "/bubble-font-generator/how-to-make-bubble-letters/",
  bubbleFontGeneratorVsBubbleLetterFontGenerator:
    "/bubble-font-generator/bubble-font-generator-vs-bubble-letter-font-generator/",
  freeBubbleFontGenerator: "/bubble-font-generator/free-bubble-font-generator/",
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

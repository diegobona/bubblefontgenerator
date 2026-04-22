import { routes } from "./routes";

export type LinkItem = {
  href: string;
  label: string;
  description: string;
};

export type ContentSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PageDocument = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: ContentSection[];
  faqs: FaqItem[];
  relatedLinks: LinkItem[];
};

export const pageDocuments = {
  home: {
    path: routes.home,
    title:
      "Bubble Font Generator | Free Online Bubble Text Tool",
    description:
      "Use the Bubble Font Generator to create rounded bubble text online, customize colors and effects, and export a clean PNG in seconds.",
    h1: "Bubble Font Generator",
    intro:
      "Create rounded bubble text, tune the style, and export a clean PNG in seconds.",
    sections: [
      {
        id: "brand-overview",
        title: "Make Bubble Text Fast",
        paragraphs: [
          "Turn plain words into playful bubble lettering without opening design software.",
        ],
      },
      {
        id: "feature-highlights",
        title: "Customize The Look",
        paragraphs: [
          "Change color, outline, shadow, spacing, sticker edge, and depth with a live preview.",
        ],
      },
      {
        id: "content-hub",
        title: "Explore More Styles",
        paragraphs: [
          "Jump into Bubble Letters, Bubble Writing, Graffiti Bubble, or browse articles for tips and ideas.",
        ],
      },
    ],
    faqs: [
      {
        question: "What can I make with this bubble font generator?",
        answer:
          "You can make bubble text for names, titles, stickers, classroom headings, labels, short social graphics, and graffiti-style word art.",
      },
      {
        question: "Can I customize the style before downloading?",
        answer:
          "Yes. You can adjust size, spacing, colors, outline, shadow, sticker edge, highlight, and other visual settings before exporting a PNG.",
      },
    ],
    relatedLinks: [
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Focused tool for names, labels, and rounded letter styles.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Focused tool for softer handwritten bubble text.",
      },
      {
        href: routes.bubbleGraffitiFontGenerator,
        label: "Bubble Graffiti Font Generator",
        description: "Focused tool for bolder graffiti-style bubble text.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Definition guide for readers new to bubble font.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "Simple step-by-step guide for making bubble letters.",
      },
      {
        href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
        label: "Bubble Font Generator vs Bubble Letter Font Generator",
        description: "Comparison guide for choosing the right starting page.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Guide to what people usually expect from a free tool.",
      },
      {
        href: routes.articles,
        label: "Bubble Font Articles",
        description: "Browse all guides, tutorials, and comparison pages.",
      },
    ],
  },
  articlesHub: {
    path: routes.articles,
    title: "Bubble Font Articles | Guides, Comparisons and Tutorials",
    description:
      "Browse bubble font guides, comparisons, and tutorials about bubble letters, bubble writing, and free bubble font generator usage.",
    h1: "Bubble Font Articles",
    intro:
      "Use this page to browse the article side of the bubble font topic cluster. Each guide answers a specific question and links naturally back to the tool pages when readers are ready to create.",
    sections: [
      {
        id: "article-overview",
        title: "Browse Bubble Font Guides",
        paragraphs: [
          "This article hub collects the supporting informational pages for the site, including concept explainers, tutorials, comparisons, and free-use guidance.",
          "Instead of showing these pages in a navigation dropdown, this hub gives them a dedicated home where users can scan and choose the right article more easily.",
        ],
      },
    ],
    faqs: [],
    relatedLinks: [
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Understand the meaning, style, and use cases of bubble font.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "Read the step-by-step beginner guide for bubble letters.",
      },
      {
        href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
        label: "Comparison Guide",
        description: "See how bubble font generator and bubble letter font generator differ.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Learn what users usually expect from a free bubble text tool.",
      },
    ],
  },
  bubbleFontGenerator: {
    path: routes.bubbleFontGenerator,
    title: "Bubble Font Generator | Free Online Bubble Text Tool",
    description:
      "Use the Bubble Font Generator to create rounded bubble text online, customize colors and effects, and export a clean PNG in seconds.",
    h1: "Bubble Font Generator",
    intro:
      "Create rounded bubble text, tune the style, and export a clean PNG in seconds.",
    sections: [
      {
        id: "editor-area",
        title: "Create Bubble Text Online",
        paragraphs: [
          "Type your word, try different bubble styles, and export a PNG without opening design software.",
          "This page is the main tool entry for the whole topic cluster, so it covers the broadest bubble font generator intent before sending users to narrower style pages when needed.",
        ],
      },
      {
        id: "how-to-use",
        title: "What You Can Make Here",
        paragraphs: [
          "Use it for names, titles, stickers, short headers, and playful display text that needs a rounded look.",
          "If you already know you want bubble letters, bubble writing, or graffiti bubble text, the related subpages help you jump straight into that narrower intent.",
        ],
      },
      {
        id: "why-this-page",
        title: "Why Start With This Page",
        paragraphs: [
          "This is the broadest tool page on the site and the best first stop if you want the main Bubble Font Generator experience.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this the main bubble font generator page?",
        answer:
          "Yes. This is the central tool page for the site and the main destination for the Bubble Font Generator topic.",
      },
      {
        question: "Will this page include the editor above the fold?",
        answer:
          "Yes. The first visible section is reserved for the online editor, while the explanatory content remains server-rendered below it.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Return to the homepage main tool page.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Explore the bubble letters intent page.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Explore the bubble writing intent page.",
      },
      {
        href: routes.bubbleGraffitiFontGenerator,
        label: "Bubble Graffiti Font Generator",
        description: "Explore the bubble graffiti intent page.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the concept guide.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "Read the step-by-step guide.",
      },
      {
        href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
        label: "Comparison Guide",
        description: "Understand the keyword distinction.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "See the informational free-use article.",
      },
    ],
  },
  bubbleLetterFontGenerator: {
    path: routes.bubbleLetterFontGenerator,
    title: "Bubble Letter Font Generator | Cute Bubble Letters Maker",
    description:
      "Create cute bubble letters for names, labels, and titles. Use this focused bubble letter generator for a playful rounded look.",
    h1: "Bubble Letter Font Generator",
    intro:
      "Make rounded bubble letters for names, labels, and short playful titles.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Letters Editor",
        paragraphs: [
          "This page focuses on the bubble letter look people usually want for names, labels, and friendly word art.",
        ],
      },
      {
        id: "use-cases",
        title: "When to Use Bubble Letters",
        paragraphs: [
          "Bubble letters work well for kids names, classroom headings, birthday graphics, sticker labels, and short words that need a soft rounded shape.",
        ],
      },
      {
        id: "page-purpose",
        title: "How This Page Fits The Site",
        paragraphs: [
          "This page serves a narrower search intent under the broader Bubble Font Generator topic, so users can go straight to a more specific style page when they already know what they want.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this page different from the main bubble font generator page?",
        answer:
          "Yes. This page is narrower and focuses on bubble letters as a specific use case under the broader Bubble Font Generator topic.",
      },
      {
        question: "Will this page link back to the core tool page?",
        answer:
          "Yes. Every intent page links back to the core bubble font generator page to reinforce structure and relevance.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Return to the homepage editor.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "See the step-by-step guide for drawing bubble letters.",
      },
      {
        href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
        label: "Comparison Guide",
        description: "Compare the broader and narrower tool intents.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Try a softer handwritten bubble style.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the quick concept guide.",
      },
    ],
  },
  bubbleWritingFontGenerator: {
    path: routes.bubbleWritingFontGenerator,
    title: "Bubble Writing Font Generator | Handwritten Bubble Text Maker",
    description:
      "Make soft handwritten bubble text with a lighter, smoother style. Great for casual headers, cute notes, and playful writing.",
    h1: "Bubble Writing Font Generator",
    intro:
      "Create softer bubble writing with a lighter, more handwritten feel.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Writing Editor",
        paragraphs: [
          "This page is tuned for short phrases and softer handwritten-looking bubble text rather than standard blocky bubble letters.",
        ],
      },
      {
        id: "style-intent",
        title: "What Bubble Writing Usually Means",
        paragraphs: [
          "Bubble writing usually means rounded handwritten-looking words with a casual feel. It works well for notes, small headers, labels, and short decorative text.",
        ],
      },
      {
        id: "page-purpose",
        title: "How This Page Fits The Site",
        paragraphs: [
          "This page gives bubble writing its own destination while still supporting the broader Bubble Font Generator topic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this page target a different keyword than bubble letter font generator?",
        answer:
          "Yes. The overlap is close, but this page is mapped to bubble writing language and a softer handwritten style.",
      },
      {
        question: "Will the final page still include tutorial content?",
        answer:
          "Yes. The final version will keep tutorials, FAQs, and internal links below the tool area so the page remains useful and crawlable.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Return to the homepage editor.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the definition and style guide.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "See what people usually want from a free tool.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Switch to a more classic bubble letters look.",
      },
      {
        href: routes.bubbleGraffitiFontGenerator,
        label: "Bubble Graffiti Font Generator",
        description: "Switch to a heavier graffiti-style look.",
      },
    ],
  },
  bubbleGraffitiFontGenerator: {
    path: routes.bubbleGraffitiFontGenerator,
    title:
      "Bubble Graffiti Font Generator | Graffiti Bubble Text Maker",
    description:
      "Create bold graffiti bubble text with thicker outlines, stronger shapes, and a street-style look for posters and standout headings.",
    h1: "Bubble Graffiti Font Generator",
    intro:
      "Create heavier graffiti-style bubble text with more impact and bolder shapes.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Graffiti Editor",
        paragraphs: [
          "This page is tuned for graffiti-flavored bubble text with stronger outlines, heavier depth, and a more expressive look than a standard bubble letters page.",
        ],
      },
      {
        id: "style-intent",
        title: "What Makes Bubble Graffiti Different",
        paragraphs: [
          "Bubble graffiti usually uses heavier outlines, deeper shadow, more exaggerated forms, and higher visual impact than ordinary bubble lettering.",
        ],
      },
      {
        id: "page-purpose",
        title: "How This Page Fits The Site",
        paragraphs: [
          "This page covers the graffiti-style query set while still supporting the broader Bubble Font Generator topic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this page only for graffiti-style bubble text?",
        answer:
          "Yes. This page is designed to target the graffiti bubble text angle specifically, even though it still connects back to the main tool.",
      },
      {
        question: "Will the final version include image examples?",
        answer:
          "Yes. The production page should include example visuals and style previews in addition to the editor and explanatory copy.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Return to the homepage editor.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the quick concept guide.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Check what people usually expect from a free tool.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Try a softer handwritten bubble style.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Try a cleaner rounded letters style.",
      },
    ],
  },
  whatIsBubbleFont: {
    path: routes.whatIsBubbleFont,
    title: "What Is Bubble Font? Meaning, Style, and Common Uses",
    description:
      "Learn what bubble font means, where this rounded lettering style is used, and how it differs from bubble letters.",
    h1: "What Is Bubble Font?",
    intro:
      "Bubble font is a rounded lettering style with a soft, playful look.",
    sections: [
      {
        id: "definition",
        title: "What Bubble Font Means",
        paragraphs: [
          "Bubble font usually means letters with rounded edges, thick shapes, and a puffy look. It is more of a style than a single font file.",
          "People use the term for text that feels playful, soft, and easy to notice at a glance.",
        ],
      },
      {
        id: "common-uses",
        title: "Where Bubble Font Is Common",
        paragraphs: [
          "Bubble-style lettering is common in posters, classroom signs, stickers, kids graphics, and casual title text.",
          "It works best when you want something friendly and loud rather than clean and formal.",
        ],
      },
      {
        id: "bubble-font-vs-bubble-letters",
        title: "Bubble Font And Bubble Letters",
        paragraphs: [
          "People often use bubble font and bubble letters as if they mean the same thing. In practice, bubble font is the broader label, while bubble letters usually points to the letter shape itself.",
          "If you want to make one quickly, the easiest next step is to use a generator and test a few styles with your own text.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is bubble font always hand-drawn?",
        answer:
          "No. You can draw it by hand, but many people now make bubble-style text with online tools or design software.",
      },
      {
        question: "Can bubble font be used for logos or titles?",
        answer:
          "Yes. It is often used for short titles, names, stickers, headers, and playful branding ideas.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Try the homepage editor.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Open the dedicated bubble letters tool.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "Continue to the practical tutorial.",
      },
      {
        href: routes.articles,
        label: "Bubble Font Articles",
        description: "Browse the full set of supporting guides.",
      },
    ],
  },
  howToMakeBubbleLetters: {
    path: routes.howToMakeBubbleLetters,
    title: "How to Make Bubble Letters | Simple Steps for Beginners",
    description:
      "Follow simple steps to make bubble letters by hand, then see how to speed up the process with an online bubble letter tool.",
    h1: "How to Make Bubble Letters",
    intro:
      "Start with simple letters, round them out, then add thickness and color.",
    sections: [
      {
        id: "start-with-block-letters",
        title: "Start With Basic Letter Shapes",
        paragraphs: [
          "Write your word in plain letters first. Leave a little space between each letter so you have room to round and thicken the shape later.",
        ],
      },
      {
        id: "round-the-shape",
        title: "Round The Edges",
        paragraphs: [
          "Go around each letter and soften the corners. The goal is to make every edge look fuller and more inflated, not sharp or rigid.",
        ],
      },
      {
        id: "add-depth-and-finish",
        title: "Add Thickness, Outline, And Color",
        paragraphs: [
          "Draw an outer border to give the letters width, then erase guide lines and add color, outline, or a small shadow if you want more depth.",
          "If you want the same look faster, you can type your text into a bubble letter generator and adjust the style online.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do bubble letters need to be perfectly even?",
        answer:
          "No. Slight variation usually makes them look more natural. What matters most is that the shapes stay rounded and easy to read.",
      },
      {
        question: "Can I make bubble letters without drawing by hand?",
        answer:
          "Yes. You can use an online tool to type the word, preview the style, and export it much faster.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Try the homepage editor.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Open the dedicated bubble letters tool.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the definition and style guide.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "See what to look for in a free tool.",
      },
    ],
  },
  bubbleFontGeneratorVsBubbleLetterFontGenerator: {
    path: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
    title:
      "Bubble Font Generator vs Bubble Letter Font Generator | What Is the Difference?",
    description:
      "Compare bubble font generator and bubble letter font generator pages, see how their intent differs, and choose the right starting point.",
    h1: "Bubble Font Generator vs Bubble Letter Font Generator",
    intro:
      "Short answer: bubble font generator is broader, and bubble letter font generator is narrower.",
    sections: [
      {
        id: "broader-term",
        title: "Bubble Font Generator Covers More Styles",
        paragraphs: [
          "Bubble font generator usually covers the whole rounded-text category. A user may want classic bubble text, softer writing, sticker-like styles, or even graffiti-flavored versions.",
        ],
      },
      {
        id: "narrower-term",
        title: "Bubble Letter Font Generator Is More Specific",
        paragraphs: [
          "Bubble letter font generator is more specific. It usually means someone wants rounded letter shapes for names, headings, or simple word art rather than every possible bubble style.",
        ],
      },
      {
        id: "which-one-to-use",
        title: "Which Page Should You Open First",
        paragraphs: [
          "If you are exploring and want options, start with the main bubble font generator. If you already know you want classic bubble letters, go straight to the bubble letter page.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do these two terms mean exactly the same thing?",
        answer:
          "Not exactly. They overlap a lot, but one is broader and the other is more specific.",
      },
      {
        question: "Which page is better for first-time users?",
        answer:
          "The main bubble font generator page is the better starting point because it shows the widest range of styles.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Go to the homepage editor.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Visit the more specific letters page.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Read the free-use guide.",
      },
      {
        href: routes.articles,
        label: "Bubble Font Articles",
        description: "Browse other supporting guides and comparisons.",
      },
    ],
  },
  freeBubbleFontGenerator: {
    path: routes.freeBubbleFontGenerator,
    title:
      "Free Bubble Font Generator | What to Look For Before You Choose",
    description:
      "See what users usually want from a free bubble font generator, what features matter, and where to start if you need a fast online tool.",
    h1: "Free Bubble Font Generator",
    intro:
      "See what people usually expect from a free bubble font generator before they choose one.",
    sections: [
      {
        id: "what-free-means",
        title: "What Users Expect From A Free Bubble Font Generator",
        paragraphs: [
          "Most users expect a free tool to let them enter text, try a few styles, change colors, and export something usable without hitting a paywall right away.",
        ],
      },
      {
        id: "how-to-evaluate",
        title: "How To Tell If A Free Tool Is Worth Using",
        paragraphs: [
          "Check whether the tool is easy to use, whether the preview updates quickly, and whether the export looks clean enough to actually keep.",
          "If a free tool hides basic actions or makes simple edits annoying, it usually is not worth the time.",
        ],
      },
      {
        id: "best-next-step",
        title: "Where To Start",
        paragraphs: [
          "If you want a quick starting point, open the main bubble font generator first. From there, you can switch into letters, writing, or graffiti depending on the look you want.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does free usually mean no download limits?",
        answer:
          "Not always. Some tools are free to try but restrict export size, quality, or advanced settings.",
      },
      {
        question: "What should I test first in a free tool?",
        answer:
          "Type your own word, change a few colors, and export one result. That usually tells you quickly whether the tool is actually useful.",
      },
    ],
    relatedLinks: [
      {
        href: routes.home,
        label: "Bubble Font Generator",
        description: "Go to the homepage editor.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Try the softer handwritten style page.",
      },
      {
        href: routes.bubbleGraffitiFontGenerator,
        label: "Bubble Graffiti Font Generator",
        description: "Try the heavier graffiti style page.",
      },
      {
        href: routes.articles,
        label: "Bubble Font Articles",
        description: "Browse more guides before choosing a tool.",
      },
    ],
  },
} satisfies Record<string, PageDocument>;

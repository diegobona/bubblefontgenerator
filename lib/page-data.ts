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
      "Best Bubble Font Generator Online | Bubble Text, Letters and Graffiti",
    description:
      "Create bubble text, bubble letters, and graffiti styles online with a fast bubble font generator. Edit colors, outline, shadow, spacing, and download PNG instantly.",
    h1: "Bubble Font Generator Online",
    intro:
      "Create bubble text, tweak the style, and download a clean PNG in seconds with a fast, easy, and focused editor.",
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
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Main money page and central tool entry.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Intent page for bubble letters and names.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Intent page for playful bubble writing.",
      },
      {
        href: routes.bubbleGraffitiFontGenerator,
        label: "Bubble Graffiti Font Generator",
        description: "Intent page for graffiti-style bubble text.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Introductory article for concept searches.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "Tutorial article for practical searches.",
      },
      {
        href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
        label: "Bubble Font Generator vs Bubble Letter Font Generator",
        description: "Comparison article for ambiguous queries.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Informational page about free usage.",
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
    title: "Free Bubble Font Generator | Best Bubble Text Tool Online",
    description:
      "Use our free bubble font generator to create bubble text online. Customize colors, outline, shadow, spacing, and export PNG with a fast editor.",
    h1: "Free Bubble Font Generator",
    intro:
      "The best all-purpose editor for rounded bubble text, quick previews, and clean PNG export.",
    sections: [
      {
        id: "editor-area",
        title: "Online Bubble Text Editor",
        paragraphs: [
          "Use this bubble text editor to type any word or short phrase, choose a playful preset, and adjust the look before exporting a clean PNG file.",
          "The current release supports text input, style selection, font size, canvas size, spacing, colors, outline, sticker edge, 3D thickness, highlight strength, shadow, and PNG download, which covers the main needs of most casual bubble text users.",
        ],
      },
      {
        id: "how-to-use",
        title: "How to Use This Bubble Font Generator",
        paragraphs: [
          "Start by entering your text, then pick the bubble style that best fits your design. After that, adjust size, spacing, outline, background, and effect controls until the preview matches the look you want.",
          "When the design is ready, export the result as a PNG. This makes the tool useful for social posts, headers, worksheets, stickers, and quick personal graphics.",
        ],
      },
      {
        id: "why-this-page",
        title: "Why This Page Matters",
        paragraphs: [
          "This is the broadest and strongest page in the site structure, so it targets the main bubble font generator intent while naturally sending users to more specific bubble letters, bubble writing, and graffiti bubble pages when needed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this the main bubble font generator page?",
        answer:
          "Yes. This is the central tool page for the whole project and the primary destination for the main keyword cluster.",
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
        label: "Homepage",
        description: "Return to the main hub page.",
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
        description: "Read the concept explainer.",
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
      "Make cute, clean bubble letters online for names, titles, and classroom graphics with an easy bubble letters maker and PNG export.",
    h1: "Bubble Letter Font Generator",
    intro:
      "The best page for names, classroom titles, and cute single-word bubble letters.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Letters Editor",
        paragraphs: [
          "This page gives you a focused bubble letters editor with the controls that matter most for clean, friendly lettering, including outline, sticker edge, highlight, depth, and PNG export.",
        ],
      },
      {
        id: "use-cases",
        title: "When to Use Bubble Letters",
        paragraphs: [
          "Bubble letters work especially well for kids names, classroom headings, birthday graphics, sticker-style labels, and short words that need a soft, rounded, easy-to-read look.",
        ],
      },
      {
        id: "page-purpose",
        title: "Why This Subpage Exists",
        paragraphs: [
          "This page exists to serve the narrower bubble letter search intent directly, so users who already know they want bubble letters can skip the broader parent page and go straight into editing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this page different from the main bubble font generator page?",
        answer:
          "Yes. This page is narrower and focuses on bubble letters as a specific use case under the broader bubble font generator topic.",
      },
      {
        question: "Will this page link back to the core tool page?",
        answer:
          "Yes. Every intent page links back to the core bubble font generator page to reinforce structure and relevance.",
      },
    ],
    relatedLinks: [
      {
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Return to the main tool page.",
      },
      {
        href: routes.home,
        label: "Homepage",
        description: "Go back to the main site hub.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "Read the tutorial article.",
      },
      {
        href: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
        label: "Comparison Guide",
        description: "See how the two terms differ.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Visit the related bubble writing page.",
      },
    ],
  },
  bubbleWritingFontGenerator: {
    path: routes.bubbleWritingFontGenerator,
    title: "Bubble Writing Font Generator | Handwritten Bubble Text Maker",
    description:
      "Create playful bubble writing online with a soft handwritten-style bubble text maker. Adjust colors, spacing, outline, and export PNG fast.",
    h1: "Bubble Writing Font Generator",
    intro:
      "The best page for softer handwritten bubble words and short playful phrases.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Writing Editor",
        paragraphs: [
          "This bubble writing editor is designed for short phrases and playful text layouts, with controls for spacing, color, outline, sticker edge, depth, highlight, and export.",
        ],
      },
      {
        id: "style-intent",
        title: "What Bubble Writing Usually Means",
        paragraphs: [
          "Bubble writing usually means rounded, handwritten-looking words with a casual and cheerful feel. It is a common style for signs, posters, labels, and short decorative text.",
        ],
      },
      {
        id: "page-purpose",
        title: "Why This Subpage Exists",
        paragraphs: [
          "This page gives that wording pattern its own destination, which helps users find the closest match to their intent and keeps the broader bubble font generator page from becoming too generic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does this page target a different keyword than bubble letter font generator?",
        answer:
          "Yes. The overlap is close, but this page is mapped to bubble writing language and examples.",
      },
      {
        question: "Will the final page still include tutorial content?",
        answer:
          "Yes. The final version will keep tutorials, FAQs, and internal links below the tool area so the page remains useful and crawlable.",
      },
    ],
    relatedLinks: [
      {
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Return to the main tool page.",
      },
      {
        href: routes.home,
        label: "Homepage",
        description: "Go back to the site hub.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the explainer article.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Read the informational guide.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Visit the related bubble letters page.",
      },
    ],
  },
  bubbleGraffitiFontGenerator: {
    path: routes.bubbleGraffitiFontGenerator,
    title:
      "Bubble Graffiti Font Generator | Graffiti Bubble Text Maker",
    description:
      "Design graffiti-style bubble text online with bold outline, shadow, depth, and high-impact styling in a focused graffiti bubble text maker.",
    h1: "Bubble Graffiti Font Generator",
    intro:
      "The best page for bold graffiti-style bubble text with heavier outline, depth, and impact.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Graffiti Editor",
        paragraphs: [
          "This editor is tuned for graffiti-flavored bubble text with stronger outline, shadow, 3D thickness, and highlight controls so you can push the look further than a standard bubble letters page.",
        ],
      },
      {
        id: "style-intent",
        title: "What Makes Bubble Graffiti Different",
        paragraphs: [
          "Bubble graffiti usually uses heavier outlines, deeper shadow, more exaggerated forms, and higher visual impact than ordinary bubble lettering. It is made for expressive display text, not quiet utility text.",
        ],
      },
      {
        id: "page-purpose",
        title: "Why This Subpage Exists",
        paragraphs: [
          "This page gives the site a dedicated destination for graffiti bubble queries, which helps match the right users to the right editing experience without overloading the parent tool page.",
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
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Return to the main tool page.",
      },
      {
        href: routes.home,
        label: "Homepage",
        description: "Go back to the site hub.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the concept explainer.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Read the free-use article.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Visit a nearby intent page.",
      },
    ],
  },
  whatIsBubbleFont: {
    path: routes.whatIsBubbleFont,
    title: "What Is Bubble Font? Meaning, Style and Use Cases",
    description:
      "Learn what bubble font is, what makes bubble letters unique, and where this playful text style is commonly used in design, art and online graphics.",
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
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Try the main tool page.",
      },
      {
        href: routes.home,
        label: "Homepage",
        description: "Return to the site hub.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Use the bubble letters tool page.",
      },
      {
        href: routes.howToMakeBubbleLetters,
        label: "How to Make Bubble Letters",
        description: "Continue to the practical guide.",
      },
    ],
  },
  howToMakeBubbleLetters: {
    path: routes.howToMakeBubbleLetters,
    title: "How to Make Bubble Letters | Step-by-Step Beginner Guide",
    description:
      "Learn how to make bubble letters step by step. See simple drawing and digital editing tips, then use our bubble font generator to create your own version online.",
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
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Try the main tool page.",
      },
      {
        href: routes.home,
        label: "Homepage",
        description: "Return to the site hub.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Use the dedicated bubble letters page.",
      },
      {
        href: routes.whatIsBubbleFont,
        label: "What Is Bubble Font?",
        description: "Read the concept explainer.",
      },
    ],
  },
  bubbleFontGeneratorVsBubbleLetterFontGenerator: {
    path: routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
    title:
      "Bubble Font Generator vs Bubble Letter Font Generator | Differences Explained",
    description:
      "Understand the difference between a bubble font generator and a bubble letter font generator so you can choose the right tool and page for your design needs.",
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
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Go to the main tool page.",
      },
      {
        href: routes.home,
        label: "Homepage",
        description: "Return to the site hub.",
      },
      {
        href: routes.bubbleLetterFontGenerator,
        label: "Bubble Letter Font Generator",
        description: "Visit the narrower intent page.",
      },
      {
        href: routes.freeBubbleFontGenerator,
        label: "Free Bubble Font Generator Guide",
        description: "Read the informational free-use guide.",
      },
    ],
  },
  freeBubbleFontGenerator: {
    path: routes.freeBubbleFontGenerator,
    title:
      "Free Bubble Font Generator Guide | How to Create Bubble Text Free",
    description:
      "Looking for a free bubble font generator? This guide explains what free features to expect, how to use them well, and where to create bubble text online.",
    h1: "Free Bubble Font Generator Guide",
    intro:
      "Free usually means you can type, customize, and download without paying.",
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
        href: routes.bubbleFontGenerator,
        label: "Core Bubble Font Generator",
        description: "Go to the main tool page.",
      },
      {
        href: routes.home,
        label: "Homepage",
        description: "Return to the site hub.",
      },
      {
        href: routes.bubbleWritingFontGenerator,
        label: "Bubble Writing Font Generator",
        description: "Visit the bubble writing page.",
      },
      {
        href: routes.bubbleGraffitiFontGenerator,
        label: "Bubble Graffiti Font Generator",
        description: "Visit the bubble graffiti page.",
      },
    ],
  },
} satisfies Record<string, PageDocument>;

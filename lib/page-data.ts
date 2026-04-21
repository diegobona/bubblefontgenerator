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
      "This article is the concept explainer for users who want a direct answer before they try a tool.",
    sections: [
      {
        id: "definition",
        title: "Definition of Bubble Font",
        paragraphs: [
          "Bubble font usually describes rounded, inflated letterforms that feel soft, playful, and highly visible. The look is common in posters, school projects, stickers, and casual design work.",
        ],
      },
      {
        id: "common-features",
        title: "Common Features of Bubble Font",
        paragraphs: [
          "Typical features include thick rounded letter shapes, soft corners, bold fill colors, visible outlines, highlights, and an overall cartoon-like appearance.",
        ],
      },
      {
        id: "next-step",
        title: "How to Try It Online",
        paragraphs: [
          "Readers who want to move from theory to practice can use the main bubble font generator page and then explore more specific intent pages for bubble letters, bubble writing, or bubble graffiti.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is bubble font the same as bubble letters?",
        answer:
          "They are closely related, but bubble font is broader as a style label while bubble letters often refers to the letterform look or drawing method.",
      },
      {
        question: "Where should readers go after learning the definition?",
        answer:
          "The article should send users to the core bubble font generator page and nearby tool pages for practical use.",
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
      "This article is the practical tutorial page for people who want instructions instead of just a generator landing page.",
    sections: [
      {
        id: "basic-steps",
        title: "Basic Steps to Make Bubble Letters",
        paragraphs: [
          "The beginner process usually starts with plain block letters, then rounds the outer edges, adds thickness, applies an outline, and finishes with color or shading.",
        ],
      },
      {
        id: "digital-workflow",
        title: "How to Make Bubble Letters Online",
        paragraphs: [
          "A digital workflow can speed this up by letting users enter text, adjust style controls, test colors, and export the final result instead of drawing each letter by hand.",
        ],
      },
      {
        id: "next-step",
        title: "Best Next Step for Readers",
        paragraphs: [
          "The natural next step after reading the guide is to try the bubble letter font generator page or go straight to the broader bubble font generator tool.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this page meant to teach hand drawing or digital creation?",
        answer:
          "It supports both intents, but it is especially useful as a bridge from manual drawing ideas to an online bubble text tool.",
      },
      {
        question: "Will this page link to the bubble letter tool?",
        answer:
          "Yes. It should send users to the bubble letter font generator and the main bubble font generator page.",
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
      "This comparison article exists to separate two closely related keyword phrases and explain when each one is the better fit.",
    sections: [
      {
        id: "term-difference",
        title: "How the Terms Differ",
        paragraphs: [
          "Bubble font generator is the broader phrase and can cover many rounded text styles, while bubble letter font generator usually points to more specific bubble letter outputs and use cases.",
        ],
      },
      {
        id: "page-selection",
        title: "Which Page Should Users Choose",
        paragraphs: [
          "Users with a broad need should start on the main tool page, while users who explicitly want bubble letters for names or headings may prefer the bubble letter page first.",
        ],
      },
      {
        id: "next-step",
        title: "Where to Go Next",
        paragraphs: [
          "The page should direct readers to the main bubble font generator page, the bubble letter intent page, and a nearby informational guide when free-use intent is present.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why publish a comparison page for similar terms?",
        answer:
          "A comparison page helps prevent keyword confusion, supports internal linking, and gives search engines a clearer understanding of page purpose.",
      },
      {
        question: "Should this page still link to the main tool page?",
        answer:
          "Yes. The main bubble font generator page remains the central destination even when term differences are explained here.",
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
      "This page is informational on purpose so it can capture free-use research intent without directly cannibalizing the core tool page.",
    sections: [
      {
        id: "what-free-means",
        title: "What Free Bubble Font Generator Usually Means",
        paragraphs: [
          "Users searching for free tools often want to know whether they can create text online, customize the result, and download a usable image without paying.",
        ],
      },
      {
        id: "how-to-evaluate",
        title: "How to Evaluate a Free Tool",
        paragraphs: [
          "Useful checkpoints include export quality, design controls, ease of use, and whether the page provides enough guidance for first-time users.",
        ],
      },
      {
        id: "next-step",
        title: "Best Tool Page for Action",
        paragraphs: [
          "Once the reader understands the free-use criteria, the right next step is to visit the core bubble font generator or a more specific tool page depending on style preference.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is this page informational instead of the main tool page?",
        answer:
          "This page is meant to serve research intent around free usage so the main tool page can stay focused on the core generator query.",
      },
      {
        question: "Will this article still push users to a tool page?",
        answer:
          "Yes. The page should always guide readers back to the main bubble font generator and relevant sub-intent pages.",
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

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
      "Bubble Font Generator Online | Create Bubble Text, Letters and Graffiti",
    description:
      "Create stylish bubble text online with our easy bubble font generator. Edit colors, outline, shadow, spacing, canvas size and download PNG instantly.",
    h1: "Bubble Font Generator Online",
    intro:
      "Bubble Font Generator is a focused SEO-friendly tool site built around one job: helping people create bubble text, bubble letters, and graffiti-style bubble writing online.",
    sections: [
      {
        id: "brand-overview",
        title: "Brand Overview",
        paragraphs: [
          "This homepage introduces the product direction, the main bubble font generator tool, and the supporting pages that build topical authority around bubble text design.",
          "The final version will highlight the best bubble font generator workflow for beginners who want fast editing and clean PNG exports.",
        ],
      },
      {
        id: "feature-highlights",
        title: "Feature Highlights",
        paragraphs: [
          "The first release is planned as an online bubble text editor with editable styles, color controls, outline and shadow settings, spacing controls, and download support.",
          "For now, this section acts as semantic placeholder copy so the homepage already returns meaningful HTML for search engines and future development.",
        ],
      },
      {
        id: "content-hub",
        title: "Bubble Font Content Hub",
        paragraphs: [
          "The homepage links to the core tool page, three intent-based tool variations, and four supporting articles so users and crawlers can reach every important URL from the root level.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is this site about?",
        answer:
          "This site is a dedicated bubble font generator project focused on online text editing rather than font downloads or copy-and-paste symbols.",
      },
      {
        question: "Will the homepage link to all important pages?",
        answer:
          "Yes. The homepage is designed to distribute internal links to every tool page and every article page in the first release.",
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
  bubbleFontGenerator: {
    path: routes.bubbleFontGenerator,
    title: "Bubble Font Generator Free | Best Bubble Text Font Generator Online",
    description:
      "Use our free bubble font generator to create bubble text online. Customize font style, size, colors, outline, shadow, 3D depth and download PNG in seconds.",
    h1: "Free Bubble Font Generator",
    intro:
      "This is the core landing page for the site and the future home of the main online editor. It targets the broadest commercial and informational intent around bubble font generation.",
    sections: [
      {
        id: "editor-area",
        title: "Online Bubble Text Editor",
        paragraphs: [
          "This page now includes a first-version client-side bubble text editor while still exposing all key headings and descriptive content in the server-rendered HTML.",
          "The current editor supports text input, style selection, font sizing, canvas controls, spacing, color settings, outline, sticker edge, 3D thickness, highlight strength, shadow, and PNG download, giving the page a practical starting point without overcomplicating the first release.",
        ],
      },
      {
        id: "how-to-use",
        title: "How to Use This Bubble Font Generator",
        paragraphs: [
          "Users will be able to type text, choose a bubble style, adjust the design settings, preview the output, and export the final result as an image.",
          "This placeholder section intentionally uses real heading structure so the page can be expanded later without changing the URL or metadata strategy.",
        ],
      },
      {
        id: "why-this-page",
        title: "Why This Page Matters",
        paragraphs: [
          "The core tool page acts as the strongest topical node in the site structure and links out to all three sub-intent pages and all supporting article pages.",
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
    title: "Bubble Letter Font Generator | Easy Bubble Letters Maker",
    description:
      "Make bold, cute and clean bubble letters online. Our bubble letter font generator lets you edit size, spacing, outline, shadow and export PNG fast.",
    h1: "Bubble Letter Font Generator",
    intro:
      "This intent page is dedicated to users who specifically want bubble letters for names, initials, posters, and simple decorative word art.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Letters Editor",
        paragraphs: [
          "The top of this page now includes a live bubble letters editor with outline, sticker edge, highlight, depth, and PNG export controls, while the supporting headings, paragraphs, FAQ content, and internal links remain visible in the initial HTML source.",
        ],
      },
      {
        id: "use-cases",
        title: "When to Use Bubble Letters",
        paragraphs: [
          "Bubble letters are often used for school projects, kids names, custom stickers, social graphics, and playful headings that need a rounded and friendly style.",
        ],
      },
      {
        id: "page-purpose",
        title: "Why This Subpage Exists",
        paragraphs: [
          "This URL isolates the bubble letter keyword family so the main bubble font generator page can stay broad while this page serves a tighter search intent.",
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
    title: "Bubble Writing Font Generator | Create Bubble Writing Online",
    description:
      "Create playful bubble writing online with adjustable colors, spacing, outline, highlights and canvas controls. Fast, simple and free to use.",
    h1: "Bubble Writing Font Generator",
    intro:
      "This page targets users who describe the style as bubble writing rather than bubble letters or general bubble fonts.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Writing Editor",
        paragraphs: [
          "This page now includes a working bubble writing editor with style, spacing, sticker edge, depth, highlight, and export controls, and the surrounding semantic content still ships from the server so the page can stand alone as an SEO-friendly resource.",
        ],
      },
      {
        id: "style-intent",
        title: "What Bubble Writing Usually Means",
        paragraphs: [
          "Bubble writing often refers to rounded hand-drawn looking words or short phrases, especially for captions, names, signs, and cheerful display text.",
        ],
      },
      {
        id: "page-purpose",
        title: "Why This Subpage Exists",
        paragraphs: [
          "This page helps capture a distinct wording pattern in search demand without mixing it into every other bubble font page on the site.",
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
      "Bubble Graffiti Font Generator | Make Graffiti Bubble Text Online",
    description:
      "Design graffiti-style bubble text online with bold outlines, shadow, sticker edge and 3D depth. A fast bubble graffiti font generator for titles and art text.",
    h1: "Bubble Graffiti Font Generator",
    intro:
      "This page focuses on graffiti-influenced bubble text for users who want a louder, street-inspired version of the core bubble style.",
    sections: [
      {
        id: "editor-area",
        title: "Bubble Graffiti Editor",
        paragraphs: [
          "This section now includes a working graffiti-flavored bubble text editor with stronger outline, shadow, 3D thickness, and highlight controls while preserving crawlable explanatory content and internal links in the first HTML response.",
        ],
      },
      {
        id: "style-intent",
        title: "What Makes Bubble Graffiti Different",
        paragraphs: [
          "Graffiti bubble text usually leans on stronger outlines, deeper shadows, exaggerated shapes, and more expressive visual energy than simple bubble lettering.",
        ],
      },
      {
        id: "page-purpose",
        title: "Why This Subpage Exists",
        paragraphs: [
          "The page gives the site a dedicated destination for graffiti-flavored queries while keeping the main tool page focused on the broad parent topic.",
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
    title: "What Is Bubble Font? Meaning, Style and Uses Explained",
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
    title: "How to Make Bubble Letters | Step-by-Step Guide for Beginners",
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
      "Bubble Font Generator vs Bubble Letter Font Generator | What’s the Difference?",
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
      "Free Bubble Font Generator Guide | Best Free Ways to Create Bubble Text",
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

import { routes } from "./routes";

export type PageKind = "home" | "tool" | "article";

type SampleImage = {
  src: string;
  alt: string;
};

type CallToAction = {
  title: string;
  description: string;
  href: string;
  label: string;
};

type JumpLink = {
  href: string;
  label: string;
};

export type PagePresentation = {
  kind: PageKind;
  heroLabel: string;
  sampleImage: SampleImage;
  highlights: string[];
  steps: string[];
  callToAction: CallToAction;
  jumpLinks: JumpLink[];
};

const toolPaths = new Set<string>([
  routes.bubbleFontGenerator,
  routes.bubbleLetterFontGenerator,
  routes.bubbleWritingFontGenerator,
  routes.bubbleGraffitiFontGenerator,
]);

const articlePaths = new Set<string>([
  routes.whatIsBubbleFont,
  routes.howToMakeBubbleLetters,
  routes.bubbleFontGeneratorVsBubbleLetterFontGenerator,
  routes.freeBubbleFontGenerator,
]);

export function getPageKind(path: string): PageKind {
  if (path === routes.home) {
    return "home";
  }

  if (toolPaths.has(path)) {
    return "tool";
  }

  if (articlePaths.has(path)) {
    return "article";
  }

  return "article";
}

export function getPagePresentation(path: string, h1: string): PagePresentation {
  const kind = getPageKind(path);

  if (kind === "home") {
    return {
      kind,
      heroLabel: "Create Bubble Text Online",
      sampleImage: {
        src: "/images/seo/bubble-home-preview.svg",
        alt: "Bubble font generator homepage preview with tool and article hub cards",
      },
      highlights: [
        "Start with the main editor and make bubble text in just a few steps.",
        "Switch between bubble letters, bubble writing, and graffiti-inspired styles.",
        "Export clean PNG graphics for names, titles, labels, and playful designs.",
      ],
      steps: [
        "Start on the homepage to understand the tool cluster and content structure.",
        "Open the core bubble font generator page for the main editing workflow.",
        "Explore a sub-intent page or article depending on the exact search need.",
      ],
      callToAction: {
        title: "Start With The Main Editor",
        description:
          "The core bubble font generator page is the fastest place to start creating and exporting bubble text.",
        href: routes.bubbleFontGenerator,
        label: "Open Main Editor",
      },
      jumpLinks: [
        { href: "#brand-overview", label: "Brand" },
        { href: "#feature-highlights", label: "Features" },
        { href: "#content-hub", label: "Hub" },
        { href: "#page-faq", label: "FAQ" },
      ],
    };
  }

  if (kind === "tool") {
    const isCoreTool = path === routes.bubbleFontGenerator;
    const isLetters = path === routes.bubbleLetterFontGenerator;
    const isWriting = path === routes.bubbleWritingFontGenerator;
    const heroLabel = isCoreTool
      ? "Core Bubble Font Tool"
      : isLetters
        ? "Bubble Letters Tool"
        : isWriting
          ? "Bubble Writing Tool"
          : "Bubble Graffiti Tool";

    const highlights = isCoreTool
      ? [
          "Acts as the main money page for the full bubble font generator cluster.",
          "Keeps the editor above the fold while preserving full SEO copy below.",
          "Distributes authority to all sub-intent pages and supporting articles.",
        ]
      : isLetters
        ? [
            "Targets bubble letter searches without diluting the broader parent page.",
            "Keeps letter-focused examples, guidance, and tool usage on one URL.",
            "Links clearly back to the core tool page and nearby educational content.",
          ]
        : isWriting
          ? [
              "Matches users who think in terms of bubble writing instead of bubble letters.",
              "Keeps the editor above the fold while preserving full SEO copy below.",
              "Supports internal linking back to the main tool page and related guides.",
            ]
          : [
              "Covers the graffiti-flavored edge of the bubble font topic cluster.",
              "Keeps style-specific examples and guidance separate from the parent page.",
              "Uses semantic HTML so headings, FAQs, and supporting copy appear in source HTML.",
            ];

    const callToAction = isCoreTool
      ? {
          title: "Explore Intent-Based Tool Pages",
          description:
            "Use the core generator first, then move into a narrower bubble letters, bubble writing, or bubble graffiti page when you want a more specific angle.",
          href: routes.bubbleLetterFontGenerator,
          label: "Open Bubble Letter Tool",
        }
      : {
          title: "Return To The Core Generator",
          description:
            "This page serves a narrower search intent. The broader bubble font generator page remains the main destination for the topic cluster.",
          href: routes.bubbleFontGenerator,
          label: "See Main Tool Page",
        };

    return {
      kind,
      heroLabel,
      sampleImage: {
        src: "/images/seo/bubble-tool-preview.svg",
        alt: `${h1} example preview showing rounded text styling`,
      },
      highlights,
      steps: [
        "Enter the text you want to turn into bubble-style lettering.",
        "Choose a style preset that matches your target look or use case.",
        "Adjust color, outline, spacing, and export settings before download.",
      ],
      callToAction,
      jumpLinks: [
        { href: "#editor-preview", label: "Editor" },
        { href: "#how-this-page-works", label: "How To Use" },
        { href: "#editor-area", label: "Guide" },
        { href: "#next-step", label: "Next Step" },
        { href: "#page-faq", label: "FAQ" },
      ],
    };
  }

  return {
    kind,
    heroLabel: "Bubble Font Article",
    sampleImage: {
      src: "/images/seo/bubble-article-preview.svg",
      alt: `${h1} article illustration about bubble font concepts and guidance`,
    },
    highlights: [
      "Answers informational intent with readable, crawlable article content.",
      "Guides readers back to the best bubble font generator or the most relevant tool page.",
      "Supports the topic cluster without duplicating the main tool page purpose.",
    ],
    steps: [
      "Read the article to resolve the specific question or comparison intent.",
      "Use the linked tool page when you are ready to create bubble text online.",
      "Continue to a related article or sub-intent page for deeper exploration.",
    ],
    callToAction: {
      title: "Move From Reading To Creating",
      description:
        "Once the article answers the question, the next step should be a practical tool page that lets users generate bubble text online.",
      href: routes.bubbleFontGenerator,
      label: "Try The Bubble Font Generator",
    },
    jumpLinks: [
      { href: "#how-this-page-works", label: "Guide" },
      { href: "#next-step", label: "Tool CTA" },
      { href: "#page-faq", label: "FAQ" },
    ],
  };
}

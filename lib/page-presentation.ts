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
  routes.bubbleFontGeneratorPng,
  routes.bubbleLetterFontGenerator,
  routes.transparentBubbleFontGenerator,
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
        "Fast text-to-bubble workflow",
        "Three style directions to start from",
        "Clean PNG export in one click",
      ],
      steps: [
        "Start with the main Bubble Font Generator and type your text directly into the editor.",
        "Adjust the bubble style, color, and effects for the look you want.",
        "Open a sub-intent page or guide only when you need a narrower style or answer.",
      ],
      callToAction: {
        title: "Open The Bubble Font Generator",
        description:
          "Use the main Bubble Font Generator right away and start designing.",
        href: `${routes.home}#main-editor`,
        label: "Open Bubble Font Generator",
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
    const isLetters = path === routes.bubbleLetterFontGenerator;
    const isWriting = path === routes.bubbleWritingFontGenerator;
    const heroLabel = isLetters
      ? "Bubble Letters Tool"
      : isWriting
        ? "Bubble Writing Tool"
        : "Bubble Graffiti Tool";

    const highlights = isLetters
      ? [
          "Targets bubble letter searches without diluting the broader homepage intent.",
          "Keeps letter-focused examples, guidance, and tool usage on one URL.",
          "Links clearly back to the main Bubble Font Generator page and nearby guides.",
        ]
      : isWriting
        ? [
            "Matches users who think in terms of bubble writing instead of bubble letters.",
            "Keeps the editor above the fold while preserving SEO structure below.",
            "Supports internal linking back to the homepage tool and related guides.",
          ]
        : [
            "Covers the graffiti-flavored edge of the bubble font topic cluster.",
            "Keeps style-specific examples and guidance separate from the homepage.",
            "Uses semantic HTML so headings, FAQs, and supporting copy appear in source HTML.",
          ];

    const callToAction = {
      title: "Return To The Bubble Font Generator",
      description:
        "This page serves a narrower search intent. The homepage remains the main Bubble Font Generator destination for the topic cluster.",
      href: routes.home,
      label: "Open Bubble Font Generator",
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
      href: routes.home,
      label: "Try The Bubble Font Generator",
    },
    jumpLinks: [
      { href: "#how-this-page-works", label: "Guide" },
      { href: "#next-step", label: "Tool CTA" },
      { href: "#page-faq", label: "FAQ" },
    ],
  };
}

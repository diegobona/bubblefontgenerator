import type { BubbleFontCategory } from "./font-library";

export type EditorVariant = "core" | "letters" | "writing" | "graffiti";
export type StyleAssistPresetId =
  | "classic"
  | "soft"
  | "outline"
  | "sticker"
  | "chunky"
  | "kid"
  | "writing"
  | "graffiti";

export type StyleAssistSuggestion = {
  presetId: StyleAssistPresetId;
  fontCategories: BubbleFontCategory[];
  textColor: string;
  backgroundColor: string;
  outlineColor: string;
  shadowColor: string;
  stickerEdgeEnabled?: boolean;
  shadowEnabled?: boolean;
  applyColors: boolean;
  outlineEnabled?: boolean;
  fontSizeDelta?: number;
  letterSpacingDelta?: number;
  outlineWidthDelta?: number;
  stickerEdgeWidthDelta?: number;
  shadowBlurDelta?: number;
  depthDelta?: number;
  highlightStrengthDelta?: number;
  message: string;
};

const colorThemes = {
  black: {
    textColor: "#111827",
    backgroundColor: "#f8fafc",
    outlineColor: "#111827",
    shadowColor: "rgba(17, 24, 39, 0.28)",
  },
  blue: {
    textColor: "#7dd3fc",
    backgroundColor: "#312e81",
    outlineColor: "#f8fafc",
    shadowColor: "rgba(15, 23, 42, 0.38)",
  },
  green: {
    textColor: "#22c55e",
    backgroundColor: "#dcfce7",
    outlineColor: "#f8fafc",
    shadowColor: "rgba(20, 83, 45, 0.22)",
  },
  neon: {
    textColor: "#d946ef",
    backgroundColor: "#111827",
    outlineColor: "#f8fafc",
    shadowColor: "rgba(217, 70, 239, 0.38)",
  },
  orange: {
    textColor: "#f97316",
    backgroundColor: "#ffedd5",
    outlineColor: "#fff7ed",
    shadowColor: "rgba(154, 52, 18, 0.24)",
  },
  pastel: {
    textColor: "#fb7185",
    backgroundColor: "#ddd6fe",
    outlineColor: "#fff7fb",
    shadowColor: "rgba(76, 29, 149, 0.22)",
  },
  pink: {
    textColor: "#ff5fa2",
    backgroundColor: "#f6c7ea",
    outlineColor: "#fff7fb",
    shadowColor: "rgba(80, 24, 58, 0.24)",
  },
  purple: {
    textColor: "#a78bfa",
    backgroundColor: "#ede9fe",
    outlineColor: "#f8fafc",
    shadowColor: "rgba(76, 29, 149, 0.24)",
  },
  rainbow: {
    textColor: "#f97316",
    backgroundColor: "#dbeafe",
    outlineColor: "#fff7ed",
    shadowColor: "rgba(37, 99, 235, 0.24)",
  },
  red: {
    textColor: "#ef4444",
    backgroundColor: "#fee2e2",
    outlineColor: "#fff7ed",
    shadowColor: "rgba(127, 29, 29, 0.22)",
  },
  white: {
    textColor: "#f8fafc",
    backgroundColor: "#334155",
    outlineColor: "#0f172a",
    shadowColor: "rgba(15, 23, 42, 0.38)",
  },
  yellow: {
    textColor: "#f59e0b",
    backgroundColor: "#fef3c7",
    outlineColor: "#fffbeb",
    shadowColor: "rgba(146, 64, 14, 0.22)",
  },
  default: {
    textColor: "#ff5b4d",
    backgroundColor: "#b79ced",
    outlineColor: "#f8fafc",
    shadowColor: "rgba(15, 23, 42, 0.28)",
  },
} as const;

const variantPresetFallbacks: Record<EditorVariant, Partial<Record<StyleAssistPresetId, StyleAssistPresetId>>> = {
  core: {},
  letters: {
    graffiti: "outline",
    writing: "soft",
    chunky: "classic",
  },
  writing: {
    graffiti: "classic",
    outline: "classic",
    sticker: "soft",
    chunky: "classic",
  },
  graffiti: {
    kid: "sticker",
    soft: "chunky",
    writing: "chunky",
  },
};

function includesAny(input: string, terms: string[]) {
  return terms.some((term) => input.includes(term));
}

function getPalette(input: string) {
  if (includesAny(input, ["rainbow", "colorful", "multi color", "multicolor"])) {
    return colorThemes.rainbow;
  }

  if (includesAny(input, ["neon", "glow", "vibrant", "party"])) {
    return colorThemes.neon;
  }

  if (includesAny(input, ["black", "dark", "mono", "logo"])) {
    return colorThemes.black;
  }

  if (includesAny(input, ["white", "clean", "minimal"])) {
    return colorThemes.white;
  }

  if (includesAny(input, ["yellow", "gold", "birthday", "sunny"])) {
    return colorThemes.yellow;
  }

  if (includesAny(input, ["green", "classroom", "school", "nature"])) {
    return colorThemes.green;
  }

  if (includesAny(input, ["pink", "rose", "cute", "kawaii"])) {
    return colorThemes.pink;
  }

  if (includesAny(input, ["blue", "navy", "sky", "street"])) {
    return colorThemes.blue;
  }

  if (includesAny(input, ["purple", "violet", "lavender"])) {
    return colorThemes.purple;
  }

  if (includesAny(input, ["red", "hot"])) {
    return colorThemes.red;
  }

  if (includesAny(input, ["orange", "warm"])) {
    return colorThemes.orange;
  }

  if (includesAny(input, ["pastel", "soft", "gentle"])) {
    return colorThemes.pastel;
  }

  return colorThemes.default;
}

function getPresetId(input: string, variant: EditorVariant): StyleAssistPresetId {
  const isGraffitiPrompt =
    variant === "graffiti" ||
    includesAny(input, ["graffiti", "street", "urban", "spray", "tag"]);
  const isOutlinePrompt = includesAny(input, ["outline", "border", "logo", "clean"]);
  const isStickerPrompt = includesAny(input, [
    "sticker",
    "cute",
    "kawaii",
    "birthday",
    "banner",
    "label",
  ]);
  const isKidPrompt = includesAny(input, ["kid", "kids", "school", "classroom", "playful", "name"]);
  const isWritingPrompt =
    variant === "writing" ||
    includesAny(input, ["writing", "handwritten", "script", "note", "notes"]);
  const isChunkyPrompt = includesAny(input, ["chunky", "bold", "thick", "neon", "party"]);
  const isClassicPrompt = includesAny(input, ["classic", "simple", "basic"]);

  const requestedPreset = isGraffitiPrompt
    ? "graffiti"
    : isOutlinePrompt
      ? "outline"
      : isKidPrompt
        ? "kid"
        : isStickerPrompt
          ? "sticker"
          : isWritingPrompt
            ? "writing"
            : isChunkyPrompt
              ? "chunky"
              : isClassicPrompt
                ? "classic"
                : variant === "letters"
                  ? "classic"
                  : "soft";

  return variantPresetFallbacks[variant][requestedPreset] ?? requestedPreset;
}

function getFontCategories(
  input: string,
  presetId: StyleAssistPresetId,
  variant: EditorVariant,
): BubbleFontCategory[] {
  if (includesAny(input, ["graffiti", "street", "urban", "spray", "tag"])) {
    return ["graffiti", "outline", "chunky"];
  }

  if (includesAny(input, ["cute", "kawaii", "pink"])) {
    return includesAny(input, ["sticker", "label", "birthday", "banner"])
      ? ["cute", "sticker", "bubble"]
      : ["cute", "bubble", "cartoon"];
  }

  if (includesAny(input, ["school", "classroom", "kid", "kids", "name"])) {
    return ["school", "cute", "handwritten"];
  }

  if (includesAny(input, ["sticker", "label", "birthday", "banner"])) {
    return ["sticker", "cute", "bubble"];
  }

  if (includesAny(input, ["handwritten", "writing", "script", "note", "notes"])) {
    return ["handwritten", "school", "cute"];
  }

  if (includesAny(input, ["outline", "border", "logo"])) {
    return ["outline", "chunky", "sticker"];
  }

  if (includesAny(input, ["chunky", "bold", "thick", "neon", "party"])) {
    return ["chunky", "sticker", "graffiti"];
  }

  if (includesAny(input, ["bubble", "rounded", "round"])) {
    return ["bubble", "cute", "cartoon"];
  }

  if (variant === "graffiti" || presetId === "graffiti") {
    return ["graffiti", "outline", "chunky"];
  }

  if (variant === "writing" || presetId === "writing") {
    return ["handwritten", "school", "cute"];
  }

  if (variant === "letters" || presetId === "kid") {
    return ["school", "cute", "bubble"];
  }

  return [];
}

function hasStyleIntent(input: string) {
  return includesAny(input, [
    "black",
    "blue",
    "bubble",
    "cartoon",
    "classic",
    "clean",
    "colorful",
    "cute",
    "dark",
    "gold",
    "graffiti",
    "green",
    "handwritten",
    "kawaii",
    "logo",
    "minimal",
    "multicolor",
    "neon",
    "orange",
    "pastel",
    "pink",
    "purple",
    "rainbow",
    "red",
    "school",
    "sticker",
    "street",
    "sunny",
    "warm",
    "white",
    "writing",
    "yellow",
  ]);
}

function hasOutlineStyleIntent(input: string, hasEditIntent: boolean) {
  return !hasEditIntent && includesAny(input, ["outline", "border"]);
}

function hasAnyAdjustment(adjustments: ReturnType<typeof getEditAdjustments>) {
  return Object.values(adjustments).some((value) => value !== undefined);
}

function getEditAdjustments(input: string) {
  const wantsRemoveShadow = includesAny(input, [
    "remove shadow",
    "no shadow",
    "without shadow",
    "turn off shadow",
    "disable shadow",
  ]);
  const wantsMoreShadow = includesAny(input, [
    "more shadow",
    "stronger shadow",
    "add shadow",
    "deeper shadow",
  ]);
  const wantsBiggerText = includesAny(input, [
    "bigger text",
    "larger text",
    "increase font",
    "increase size",
    "make text bigger",
    "make it bigger",
  ]);
  const wantsSmallerText = includesAny(input, [
    "smaller text",
    "decrease font",
    "decrease size",
    "make text smaller",
    "make it smaller",
  ]);
  const wantsNoOutline = includesAny(input, [
    "remove outline",
    "no outline",
    "without outline",
    "turn off outline",
  ]);
  const wantsMoreOutline = includesAny(input, [
    "more outline",
    "thicker outline",
    "bold outline",
    "strong outline",
  ]);
  const wantsStickerEdge = includesAny(input, [
    "add sticker edge",
    "more sticker",
    "sticker border",
    "thicker sticker",
  ]);
  const wantsMoreDepth = includesAny(input, [
    "more 3d",
    "more depth",
    "thicker 3d",
    "more thickness",
  ]);
  const wantsLessDepth = includesAny(input, [
    "less 3d",
    "remove 3d",
    "no 3d",
    "less depth",
  ]);
  const wantsMoreSpacing = includesAny(input, [
    "more spacing",
    "wider spacing",
    "spread letters",
    "increase spacing",
  ]);
  const wantsTighterSpacing = includesAny(input, [
    "less spacing",
    "tighter spacing",
    "tighter letter spacing",
    "decrease spacing",
  ]);
  const wantsMoreHighlight = includesAny(input, [
    "more highlight",
    "more shine",
    "glossier",
    "shiny",
  ]);
  const wantsLessHighlight = includesAny(input, [
    "less highlight",
    "remove highlight",
    "less shine",
  ]);

  return {
    shadowEnabled: wantsRemoveShadow ? false : wantsMoreShadow ? true : undefined,
    outlineEnabled: wantsNoOutline ? false : wantsMoreOutline ? true : undefined,
    stickerEdgeEnabled: wantsStickerEdge ? true : undefined,
    fontSizeDelta: wantsBiggerText ? 18 : wantsSmallerText ? -14 : undefined,
    letterSpacingDelta: wantsMoreSpacing ? 2 : wantsTighterSpacing ? -2 : undefined,
    outlineWidthDelta: wantsMoreOutline ? 4 : wantsNoOutline ? -30 : undefined,
    stickerEdgeWidthDelta: wantsStickerEdge ? 5 : undefined,
    shadowBlurDelta: wantsRemoveShadow ? -30 : wantsMoreShadow ? 6 : undefined,
    depthDelta: wantsMoreDepth ? 5 : wantsLessDepth ? -22 : undefined,
    highlightStrengthDelta: wantsMoreHighlight ? 18 : wantsLessHighlight ? -40 : undefined,
  };
}

function getAssistMessage(
  presetId: StyleAssistPresetId,
  adjustments: ReturnType<typeof getEditAdjustments>,
) {
  if (adjustments.shadowEnabled === false) {
    return "Applied AI assist: remove shadow.";
  }

  if (adjustments.fontSizeDelta && adjustments.fontSizeDelta > 0) {
    return "Applied AI assist: bigger text.";
  }

  if (adjustments.fontSizeDelta && adjustments.fontSizeDelta < 0) {
    return "Applied AI assist: smaller text.";
  }

  if (adjustments.outlineEnabled === false) {
    return "Applied AI assist: remove outline.";
  }

  if (adjustments.letterSpacingDelta) {
    return "Applied AI assist: adjust letter spacing.";
  }

  return `Applied ${presetId} style assist.`;
}

export function buildStyleAssistSuggestion(
  prompt: string,
  variant: EditorVariant,
): StyleAssistSuggestion | null {
  const normalizedPrompt = prompt.trim().toLowerCase();

  if (!normalizedPrompt) {
    return null;
  }

  const palette = getPalette(normalizedPrompt);
  const presetId = getPresetId(normalizedPrompt, variant);
  const adjustments = getEditAdjustments(normalizedPrompt);
  const hasEditIntent = hasAnyAdjustment(adjustments);
  const applyColors =
    hasStyleIntent(normalizedPrompt) ||
    hasOutlineStyleIntent(normalizedPrompt, hasEditIntent);
  const fontCategories =
    hasEditIntent && !applyColors
      ? []
      : getFontCategories(normalizedPrompt, presetId, variant);

  return {
    presetId,
    fontCategories,
    textColor: palette.textColor,
    backgroundColor: palette.backgroundColor,
    outlineColor: palette.outlineColor,
    shadowColor: palette.shadowColor,
    stickerEdgeEnabled:
      adjustments.stickerEdgeEnabled ??
      (applyColors ? presetId === "sticker" || presetId === "kid" : undefined),
    shadowEnabled: adjustments.shadowEnabled ?? (applyColors ? true : undefined),
    applyColors,
    outlineEnabled:
      adjustments.outlineEnabled ??
      (applyColors && presetId === "outline" ? true : undefined),
    fontSizeDelta: adjustments.fontSizeDelta,
    letterSpacingDelta: adjustments.letterSpacingDelta,
    outlineWidthDelta: adjustments.outlineWidthDelta,
    stickerEdgeWidthDelta: adjustments.stickerEdgeWidthDelta,
    shadowBlurDelta: adjustments.shadowBlurDelta,
    depthDelta: adjustments.depthDelta,
    highlightStrengthDelta: adjustments.highlightStrengthDelta,
    message: getAssistMessage(presetId, adjustments),
  };
}

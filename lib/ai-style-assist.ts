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
  textColor: string;
  backgroundColor: string;
  outlineColor: string;
  shadowColor: string;
  stickerEdgeEnabled: boolean;
  shadowEnabled: boolean;
  message: string;
};

const colorThemes = {
  pink: {
    textColor: "#ff5fa2",
    backgroundColor: "#f6c7ea",
    outlineColor: "#fff7fb",
    shadowColor: "rgba(80, 24, 58, 0.24)",
  },
  blue: {
    textColor: "#7dd3fc",
    backgroundColor: "#312e81",
    outlineColor: "#f8fafc",
    shadowColor: "rgba(15, 23, 42, 0.38)",
  },
  pastel: {
    textColor: "#fb7185",
    backgroundColor: "#ddd6fe",
    outlineColor: "#fff7fb",
    shadowColor: "rgba(76, 29, 149, 0.22)",
  },
  default: {
    textColor: "#ff5b4d",
    backgroundColor: "#b79ced",
    outlineColor: "#f8fafc",
    shadowColor: "rgba(15, 23, 42, 0.28)",
  },
} as const;

function includesAny(input: string, terms: string[]) {
  return terms.some((term) => input.includes(term));
}

export function buildStyleAssistSuggestion(
  prompt: string,
  variant: EditorVariant,
): StyleAssistSuggestion | null {
  const normalizedPrompt = prompt.trim().toLowerCase();

  if (!normalizedPrompt) {
    return null;
  }

  const isGraffitiPrompt =
    variant === "graffiti" ||
    includesAny(normalizedPrompt, ["graffiti", "street", "urban", "spray"]);
  const isWritingPrompt =
    variant === "writing" ||
    includesAny(normalizedPrompt, ["writing", "handwritten", "script", "soft"]);
  const isStickerPrompt = includesAny(normalizedPrompt, ["sticker", "cute", "kawaii"]);
  const isKidPrompt = includesAny(normalizedPrompt, ["kid", "kids", "school", "playful"]);

  const palette = includesAny(normalizedPrompt, ["pink", "rose"])
    ? colorThemes.pink
    : includesAny(normalizedPrompt, ["blue", "navy", "sky"])
      ? colorThemes.blue
      : includesAny(normalizedPrompt, ["pastel", "lavender", "soft"])
        ? colorThemes.pastel
        : colorThemes.default;

  const presetId = isGraffitiPrompt
    ? "graffiti"
    : isWritingPrompt
      ? "writing"
      : isStickerPrompt
        ? "sticker"
        : isKidPrompt
          ? "kid"
          : variant === "letters"
            ? "classic"
            : "soft";

  return {
    presetId,
    textColor: palette.textColor,
    backgroundColor: palette.backgroundColor,
    outlineColor: palette.outlineColor,
    shadowColor: palette.shadowColor,
    stickerEdgeEnabled: presetId === "sticker" || presetId === "kid",
    shadowEnabled: true,
    message: `Applied ${presetId} style assist.`,
  };
}

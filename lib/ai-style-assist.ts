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

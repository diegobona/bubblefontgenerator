// Default artwork colors mirror the warm homepage reference. User edits take priority.
const palettes = [
  { textColor: "#fa9b84", backgroundColor: "#fff4de" },
  { textColor: "#ffe17e", backgroundColor: "#fde1dc" },
  { textColor: "#b5d2ef", backgroundColor: "#e9efd7" },
];

export const homeArtworkDefaults = {
  text: "Bubble Magic",
  ...palettes[0],
  outlineColor: "#3b2220",
  stickerEdgeColor: "#fffdfa",
  stickerEdgeWidth: 20,
  shadowColor: "rgba(106,70,40,0.16)",
  shadowBlur: 4,
  depth: 4,
  highlightStrength: 18,
};

export function homeArtworkColors(
  fontId: string,
  current: { textColor: string; backgroundColor: string },
  custom: { text: boolean; background: boolean },
) {
  const featured: Record<string, number> = { "rubik-bubbles": 0, bungee: 1, "bubblegum-sans": 2 };
  const index = featured[fontId] ?? [...fontId].reduce((sum, char) => sum + char.charCodeAt(0), 0) % palettes.length;
  const palette = palettes[index];
  return {
    textColor: custom.text || current.textColor !== homeArtworkDefaults.textColor ? current.textColor : palette.textColor,
    backgroundColor: custom.background || current.backgroundColor !== homeArtworkDefaults.backgroundColor ? current.backgroundColor : palette.backgroundColor,
  };
}

export type BubbleFontCategory =
  | "bubble"
  | "cartoon"
  | "chunky"
  | "cute"
  | "graffiti"
  | "handwritten"
  | "outline"
  | "school"
  | "sticker";

export type BubbleFontEffectPresetId =
  | "classic"
  | "soft"
  | "outline"
  | "sticker"
  | "chunky"
  | "kid"
  | "writing"
  | "graffiti";

export type BubbleFontLoadStrategy = "core" | "deferred";

export type BubbleFont = {
  id: string;
  displayName: string;
  family: string;
  familyStack: string;
  author: string;
  sourceProvider: "Google Fonts";
  sourceUrl: string;
  licenseName: string;
  licenseUrl: string;
  filePath: string;
  categories: BubbleFontCategory[];
  effectPresetId: BubbleFontEffectPresetId;
  loadStrategy: BubbleFontLoadStrategy;
  fontWeight: string;
  allowsCommercialUse: boolean;
  allowsWebEmbedding: boolean;
  allowsRedistribution: boolean;
};

type FontSeed = {
  id: string;
  name: string;
  categories: BubbleFontCategory[];
  effectPresetId: BubbleFontEffectPresetId;
  loadStrategy?: BubbleFontLoadStrategy;
};

export const CORE_BUBBLE_FONT_COUNT = 12;

const googleFontsLicenseUrl = "https://fonts.google.com/attribution";

function buildSpecimenUrl(name: string) {
  return `https://fonts.google.com/specimen/${name.replace(/\s+/g, "+")}`;
}

function buildFont(seed: FontSeed): BubbleFont {
  return {
    id: seed.id,
    displayName: seed.name,
    family: seed.name,
    familyStack: `"${seed.name}", "Arial Rounded MT Bold", "Trebuchet MS", sans-serif`,
    author: "Google Fonts contributors",
    sourceProvider: "Google Fonts",
    sourceUrl: buildSpecimenUrl(seed.name),
    licenseName: "Google Fonts open source license",
    licenseUrl: googleFontsLicenseUrl,
    filePath: `/fonts/google/${seed.id}.ttf`,
    categories: seed.categories,
    effectPresetId: seed.effectPresetId,
    loadStrategy: seed.loadStrategy ?? "deferred",
    fontWeight: "400",
    allowsCommercialUse: true,
    allowsWebEmbedding: true,
    allowsRedistribution: true,
  };
}

export const bubbleFontLibrary = [
  buildFont({ id: "rubik-bubbles", name: "Rubik Bubbles", categories: ["bubble", "cute"], effectPresetId: "classic", loadStrategy: "core" }),
  buildFont({ id: "rubik-puddles", name: "Rubik Puddles", categories: ["bubble", "cute"], effectPresetId: "soft", loadStrategy: "core" }),
  buildFont({ id: "rubik-gemstones", name: "Rubik Gemstones", categories: ["bubble", "sticker"], effectPresetId: "sticker", loadStrategy: "core" }),
  buildFont({ id: "rubik-iso", name: "Rubik Iso", categories: ["outline", "chunky"], effectPresetId: "outline", loadStrategy: "core" }),
  buildFont({ id: "rubik-dirt", name: "Rubik Dirt", categories: ["graffiti", "chunky"], effectPresetId: "graffiti", loadStrategy: "core" }),
  buildFont({ id: "rubik-spray-paint", name: "Rubik Spray Paint", categories: ["graffiti"], effectPresetId: "graffiti", loadStrategy: "core" }),
  buildFont({ id: "bungee", name: "Bungee", categories: ["chunky", "sticker"], effectPresetId: "chunky", loadStrategy: "core" }),
  buildFont({ id: "bungee-shade", name: "Bungee Shade", categories: ["outline", "sticker"], effectPresetId: "outline", loadStrategy: "core" }),
  buildFont({ id: "bungee-inline", name: "Bungee Inline", categories: ["outline", "chunky"], effectPresetId: "outline", loadStrategy: "core" }),
  buildFont({ id: "chewy", name: "Chewy", categories: ["cute", "cartoon"], effectPresetId: "soft", loadStrategy: "core" }),
  buildFont({ id: "luckiest-guy", name: "Luckiest Guy", categories: ["cartoon", "sticker"], effectPresetId: "sticker", loadStrategy: "core" }),
  buildFont({ id: "bubblegum-sans", name: "Bubblegum Sans", categories: ["bubble", "cute"], effectPresetId: "soft", loadStrategy: "core" }),
  buildFont({ id: "rubik-beastly", name: "Rubik Beastly", categories: ["graffiti", "chunky"], effectPresetId: "graffiti" }),
  buildFont({ id: "rubik-moonrocks", name: "Rubik Moonrocks", categories: ["bubble", "chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "bungee-outline", name: "Bungee Outline", categories: ["outline"], effectPresetId: "outline" }),
  buildFont({ id: "bungee-spice", name: "Bungee Spice", categories: ["sticker", "chunky"], effectPresetId: "sticker" }),
  buildFont({ id: "coiny", name: "Coiny", categories: ["bubble", "cartoon"], effectPresetId: "classic" }),
  buildFont({ id: "modak", name: "Modak", categories: ["bubble", "chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "slackey", name: "Slackey", categories: ["bubble", "cartoon"], effectPresetId: "classic" }),
  buildFont({ id: "titan-one", name: "Titan One", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "fredoka", name: "Fredoka", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "baloo-2", name: "Baloo 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "dynapuff", name: "DynaPuff", categories: ["bubble", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "bagel-fat-one", name: "Bagel Fat One", categories: ["bubble", "chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "cherry-bomb-one", name: "Cherry Bomb One", categories: ["cute", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "chicle", name: "Chicle", categories: ["cartoon", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "frijole", name: "Frijole", categories: ["graffiti", "chunky"], effectPresetId: "graffiti" }),
  buildFont({ id: "fascinate-inline", name: "Fascinate Inline", categories: ["outline", "sticker"], effectPresetId: "outline" }),
  buildFont({ id: "monoton", name: "Monoton", categories: ["outline", "chunky"], effectPresetId: "outline" }),
  buildFont({ id: "rampart-one", name: "Rampart One", categories: ["outline", "sticker"], effectPresetId: "outline" }),
  buildFont({ id: "londrina-shadow", name: "Londrina Shadow", categories: ["outline", "cartoon"], effectPresetId: "outline" }),
  buildFont({ id: "londrina-outline", name: "Londrina Outline", categories: ["outline"], effectPresetId: "outline" }),
  buildFont({ id: "londrina-solid", name: "Londrina Solid", categories: ["cartoon", "chunky"], effectPresetId: "classic" }),
  buildFont({ id: "londrina-sketch", name: "Londrina Sketch", categories: ["outline", "handwritten"], effectPresetId: "outline" }),
  buildFont({ id: "jua", name: "Jua", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "lilita-one", name: "Lilita One", categories: ["chunky", "cartoon"], effectPresetId: "chunky" }),
  buildFont({ id: "spicy-rice", name: "Spicy Rice", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "henny-penny", name: "Henny Penny", categories: ["cartoon", "handwritten"], effectPresetId: "writing" }),
  buildFont({ id: "mystery-quest", name: "Mystery Quest", categories: ["cartoon", "handwritten"], effectPresetId: "writing" }),
  buildFont({ id: "fontdiner-swanky", name: "Fontdiner Swanky", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "freckle-face", name: "Freckle Face", categories: ["school", "handwritten"], effectPresetId: "kid" }),
  buildFont({ id: "flavors", name: "Flavors", categories: ["cartoon", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "griffy", name: "Griffy", categories: ["cartoon", "handwritten"], effectPresetId: "writing" }),
  buildFont({ id: "bangers", name: "Bangers", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "boogaloo", name: "Boogaloo", categories: ["cartoon", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "barrio", name: "Barrio", categories: ["graffiti", "outline"], effectPresetId: "graffiti" }),
  buildFont({ id: "righteous", name: "Righteous", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "permanent-marker", name: "Permanent Marker", categories: ["graffiti", "handwritten"], effectPresetId: "graffiti" }),
  buildFont({ id: "rock-salt", name: "Rock Salt", categories: ["graffiti", "handwritten"], effectPresetId: "graffiti" }),
  buildFont({ id: "sedgwick-ave-display", name: "Sedgwick Ave Display", categories: ["graffiti"], effectPresetId: "graffiti" }),
  buildFont({ id: "knewave", name: "Knewave", categories: ["graffiti", "chunky"], effectPresetId: "graffiti" }),
  buildFont({ id: "dokdo", name: "Dokdo", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "gochi-hand", name: "Gochi Hand", categories: ["handwritten", "cute"], effectPresetId: "writing" }),
  buildFont({ id: "patrick-hand", name: "Patrick Hand", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "schoolbell", name: "Schoolbell", categories: ["school", "handwritten"], effectPresetId: "kid" }),
  buildFont({ id: "finger-paint", name: "Finger Paint", categories: ["school", "handwritten"], effectPresetId: "kid" }),
  buildFont({ id: "kablammo", name: "Kablammo", categories: ["bubble", "graffiti"], effectPresetId: "graffiti" }),
] as const satisfies readonly BubbleFont[];

export const coreBubbleFonts = bubbleFontLibrary.filter(
  (font) => font.loadStrategy === "core",
);

export function getBubbleFontsForCategoryPreference(
  preferredCategories: readonly BubbleFontCategory[],
) {
  if (preferredCategories.length === 0) {
    return [...bubbleFontLibrary];
  }

  const rank = new Map(
    preferredCategories.map((category, index) => [category, index] as const),
  );

  return [...bubbleFontLibrary].sort((left, right) => {
    const leftRank = getCategoryRank(left, rank);
    const rightRank = getCategoryRank(right, rank);

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    if (left.loadStrategy !== right.loadStrategy) {
      return left.loadStrategy === "core" ? -1 : 1;
    }

    return bubbleFontLibrary.indexOf(left) - bubbleFontLibrary.indexOf(right);
  });
}

function getCategoryRank(
  font: BubbleFont,
  rank: Map<BubbleFontCategory, number>,
) {
  const matchingRanks = font.categories
    .map((category) => rank.get(category))
    .filter((value): value is number => value !== undefined);

  return matchingRanks.length > 0 ? Math.min(...matchingRanks) : 999;
}

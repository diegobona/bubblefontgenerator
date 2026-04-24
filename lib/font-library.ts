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
export type BubbleFontSortKey = "popular" | "trending" | "newest" | "name";

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
  popularityScore: number;
  trendingScore: number;
  addedRank: number;
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
  popularityScore?: number;
  trendingScore?: number;
};

export const CORE_BUBBLE_FONT_COUNT = 12;

const googleFontsLicenseUrl = "https://fonts.google.com/attribution";
let generatedFontRank = 0;

function buildSpecimenUrl(name: string) {
  return `https://fonts.google.com/specimen/${name.replace(/\s+/g, "+")}`;
}

function buildFont(seed: FontSeed): BubbleFont {
  generatedFontRank += 1;

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
    popularityScore: seed.popularityScore ?? 1000 - generatedFontRank,
    trendingScore: seed.trendingScore ?? ((generatedFontRank * 37) % 1000),
    addedRank: generatedFontRank,
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
  buildFont({ id: "aclonica", name: "Aclonica", categories: ["cartoon", "chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "alfa-slab-one", name: "Alfa Slab One", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "amarante", name: "Amarante", categories: ["cartoon", "handwritten"], effectPresetId: "writing" }),
  buildFont({ id: "anton", name: "Anton", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "archivo-black", name: "Archivo Black", categories: ["chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "atma", name: "Atma", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "averia-gruesa-libre", name: "Averia Gruesa Libre", categories: ["cartoon", "handwritten"], effectPresetId: "writing" }),
  buildFont({ id: "baloo-bhai-2", name: "Baloo Bhai 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "baloo-chettan-2", name: "Baloo Chettan 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "baloo-da-2", name: "Baloo Da 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "baloo-paaji-2", name: "Baloo Paaji 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "baloo-tamma-2", name: "Baloo Tamma 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "baloo-tammudu-2", name: "Baloo Tammudu 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "baloo-thambi-2", name: "Baloo Thambi 2", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "bowlby-one-sc", name: "Bowlby One SC", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "ceviche-one", name: "Ceviche One", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "chelsea-market", name: "Chelsea Market", categories: ["cartoon", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "comic-neue", name: "Comic Neue", categories: ["school", "cute"], effectPresetId: "kid" }),
  buildFont({ id: "concert-one", name: "Concert One", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "crafty-girls", name: "Crafty Girls", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "dekko", name: "Dekko", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "emilys-candy", name: "Emilys Candy", categories: ["cute", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "erica-one", name: "Erica One", categories: ["chunky", "cartoon"], effectPresetId: "chunky" }),
  buildFont({ id: "faster-one", name: "Faster One", categories: ["graffiti", "chunky"], effectPresetId: "graffiti" }),
  buildFont({ id: "galindo", name: "Galindo", categories: ["cartoon", "chunky"], effectPresetId: "classic" }),
  buildFont({ id: "glass-antiqua", name: "Glass Antiqua", categories: ["outline", "cartoon"], effectPresetId: "outline" }),
  buildFont({ id: "hanalei", name: "Hanalei", categories: ["outline", "cartoon"], effectPresetId: "outline" }),
  buildFont({ id: "hanalei-fill", name: "Hanalei Fill", categories: ["outline", "sticker"], effectPresetId: "outline" }),
  buildFont({ id: "happy-monkey", name: "Happy Monkey", categories: ["cute", "school"], effectPresetId: "kid" }),
  buildFont({ id: "joti-one", name: "Joti One", categories: ["handwritten", "cartoon"], effectPresetId: "writing" }),
  buildFont({ id: "kirang-haerang", name: "Kirang Haerang", categories: ["school", "handwritten"], effectPresetId: "kid" }),
  buildFont({ id: "lakki-reddy", name: "Lakki Reddy", categories: ["handwritten", "cartoon"], effectPresetId: "writing" }),
  buildFont({ id: "lemon", name: "Lemon", categories: ["bubble", "chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "lemonada", name: "Lemonada", categories: ["cute", "handwritten"], effectPresetId: "writing" }),
  buildFont({ id: "love-ya-like-a-sister", name: "Love Ya Like A Sister", categories: ["handwritten", "school"], effectPresetId: "kid" }),
  buildFont({ id: "madimi-one", name: "Madimi One", categories: ["cute", "cartoon"], effectPresetId: "soft" }),
  buildFont({ id: "mogra", name: "Mogra", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "mouse-memoirs", name: "Mouse Memoirs", categories: ["cartoon", "chunky"], effectPresetId: "classic" }),
  buildFont({ id: "neucha", name: "Neucha", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "oregano", name: "Oregano", categories: ["handwritten", "cute"], effectPresetId: "writing" }),
  buildFont({ id: "original-surfer", name: "Original Surfer", categories: ["cartoon", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "pangolin", name: "Pangolin", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "passion-one", name: "Passion One", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "paytone-one", name: "Paytone One", categories: ["chunky", "cartoon"], effectPresetId: "chunky" }),
  buildFont({ id: "pirata-one", name: "Pirata One", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "ranchers", name: "Ranchers", categories: ["cartoon", "chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "ribeye", name: "Ribeye", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "ribeye-marrow", name: "Ribeye Marrow", categories: ["outline", "cartoon"], effectPresetId: "outline" }),
  buildFont({ id: "road-rage", name: "Road Rage", categories: ["graffiti", "handwritten"], effectPresetId: "graffiti" }),
  buildFont({ id: "rowdies", name: "Rowdies", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "ruge-boogie", name: "Ruge Boogie", categories: ["handwritten", "cartoon"], effectPresetId: "writing" }),
  buildFont({ id: "rum-raisin", name: "Rum Raisin", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "rye", name: "Rye", categories: ["outline", "cartoon"], effectPresetId: "outline" }),
  buildFont({ id: "sansita", name: "Sansita", categories: ["cartoon", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "shrikhand", name: "Shrikhand", categories: ["bubble", "chunky"], effectPresetId: "chunky" }),
  buildFont({ id: "sigmar", name: "Sigmar", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "sigmar-one", name: "Sigmar One", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "sniglet", name: "Sniglet", categories: ["bubble", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "sour-gummy", name: "Sour Gummy", categories: ["bubble", "cute"], effectPresetId: "soft" }),
  buildFont({ id: "special-elite", name: "Special Elite", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "sue-ellen-francisco", name: "Sue Ellen Francisco", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "sunshiney", name: "Sunshiney", categories: ["handwritten", "cute"], effectPresetId: "writing" }),
  buildFont({ id: "swanky-and-moo-moo", name: "Swanky and Moo Moo", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "trade-winds", name: "Trade Winds", categories: ["cartoon", "sticker"], effectPresetId: "sticker" }),
  buildFont({ id: "ultra", name: "Ultra", categories: ["chunky", "sticker"], effectPresetId: "chunky" }),
  buildFont({ id: "unkempt", name: "Unkempt", categories: ["handwritten", "school"], effectPresetId: "writing" }),
  buildFont({ id: "wendy-one", name: "Wendy One", categories: ["bubble", "cartoon"], effectPresetId: "classic" }),
  buildFont({ id: "yatra-one", name: "Yatra One", categories: ["cartoon", "handwritten"], effectPresetId: "writing" }),
  buildFont({ id: "yesteryear", name: "Yesteryear", categories: ["handwritten", "cute"], effectPresetId: "writing" }),
  buildFont({ id: "zcool-kuaile", name: "ZCOOL KuaiLe", categories: ["cute", "school"], effectPresetId: "kid" }),
] as const satisfies readonly BubbleFont[];

export const coreBubbleFonts = bubbleFontLibrary.filter(
  (font) => font.loadStrategy === "core",
);

export function getBubbleFontsForCategoryPreference(
  preferredCategories: readonly BubbleFontCategory[],
) {
  return getBubbleFontsForDisplay({
    preferredCategories,
    sortKey: "popular",
  });
}

export function getBubbleFontsForDisplay({
  preferredCategories,
  sortKey,
}: {
  preferredCategories: readonly BubbleFontCategory[];
  sortKey: BubbleFontSortKey;
}) {
  const fonts = [...bubbleFontLibrary];

  const rank = new Map(
    preferredCategories.map((category, index) => [category, index] as const),
  );

  return fonts.sort((left, right) => {
    const leftRank = preferredCategories.length > 0 ? getCategoryRank(left, rank) : 0;
    const rightRank = preferredCategories.length > 0 ? getCategoryRank(right, rank) : 0;

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    const sortResult = compareFontsBySortKey(left, right, sortKey);

    if (sortResult !== 0) {
      return sortResult;
    }

    if (left.loadStrategy !== right.loadStrategy) {
      return left.loadStrategy === "core" ? -1 : 1;
    }

    return bubbleFontLibrary.indexOf(left) - bubbleFontLibrary.indexOf(right);
  });
}

function compareFontsBySortKey(
  left: BubbleFont,
  right: BubbleFont,
  sortKey: BubbleFontSortKey,
) {
  if (sortKey === "name") {
    return left.displayName.localeCompare(right.displayName);
  }

  if (sortKey === "newest") {
    return right.addedRank - left.addedRank;
  }

  if (sortKey === "trending") {
    return right.trendingScore - left.trendingScore;
  }

  return right.popularityScore - left.popularityScore;
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

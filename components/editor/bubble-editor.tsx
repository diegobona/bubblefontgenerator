"use client";

import { useId, useMemo, useRef, useState } from "react";

import {
  buildStyleAssistSuggestion,
  type EditorVariant,
} from "@/lib/ai-style-assist";
import {
  AI_ASSIST_TEMPLATE_DISPLAY_CLASS_NAME,
  AI_ASSIST_TEMPLATE_NATIVE_SELECT_CLASS_NAME,
  AI_ASSIST_TEMPLATE_PLACEHOLDER,
  AI_ASSIST_TEMPLATE_VALUE_CLASS_NAME,
} from "@/lib/ai-assist-copy";
import {
  CORE_BUBBLE_FONT_COUNT,
  BUBBLE_FONT_PAGE_SIZE,
  bubbleFontLibrary,
  getBubbleFontsForDistinctFirstView,
  getBubbleFontsForDisplay,
  type BubbleFont,
  type BubbleFontCategory,
  type BubbleFontSortKey,
} from "@/lib/font-library";
import {
  getAutoHeightForFontSize,
  MAX_CANVAS_HEIGHT,
  MIN_CANVAS_HEIGHT,
} from "@/lib/editor-sizing";
import {
  DEFAULT_REMOVE_DOWNLOAD_BACKGROUND,
  getDownloadBackgroundFill,
} from "@/lib/download-background";
import { routes } from "@/lib/routes";
import { resultCardPreviewClassName } from "@/lib/result-card-layout";
import {
  buildEmbeddedSvgFontFaceCss,
  buildExternalSvgFontFaceCss,
  fetchFontDataUrl,
} from "@/lib/svg-font-face";

type BubbleEditorProps = {
  pagePath: string;
  heading: string;
};

type ResultPresetKey =
  | "classic"
  | "soft"
  | "outline"
  | "sticker"
  | "chunky"
  | "kid"
  | "writing"
  | "graffiti";

type EditorState = {
  text: string;
  width: number;
  height: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textColor: string;
  backgroundColor: string;
  outlineEnabled: boolean;
  outlineColor: string;
  outlineWidth: number;
  stickerEdgeEnabled: boolean;
  stickerEdgeColor: string;
  stickerEdgeWidth: number;
  shadowEnabled: boolean;
  shadowColor: string;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  depth: number;
  highlightStrength: number;
};

type ResultPreset = {
  id: ResultPresetKey;
  label: string;
  tag: string;
  note: string;
  fontFamily: string;
  fontStyle?: "normal" | "italic";
  fontWeight: string;
  fontScale: number;
  letterSpacingOffset: number;
  lineHeightAdjust: number;
  rotate: number;
  skewX: number;
  outlineBoost: number;
  stickerBoost: number;
  depthBoost: number;
  highlightBoost: number;
  shadowBoost: number;
  shadowXBoost: number;
  shadowYBoost: number;
};

type VariantConfig = {
  defaultText: string;
  presetKeys: ResultPresetKey[];
  defaultState: Omit<EditorState, "text">;
};

const fontSortOptions: Array<{ label: string; value: BubbleFontSortKey }> = [
  { label: "Popular", value: "popular" },
  { label: "Trending", value: "trending" },
  { label: "Newest", value: "newest" },
  { label: "Name", value: "name" },
];

const resultPresets: Record<ResultPresetKey, ResultPreset> = {
  classic: {
    id: "classic",
    label: "Classic Bubble",
    tag: "Core",
    note: "Rounded everyday bubble style",
    fontFamily: "Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif",
    fontWeight: "900",
    fontScale: 1,
    letterSpacingOffset: 0,
    lineHeightAdjust: 0,
    rotate: 0,
    skewX: 0,
    outlineBoost: 0,
    stickerBoost: 0,
    depthBoost: 0,
    highlightBoost: 0,
    shadowBoost: 0,
    shadowXBoost: 0,
    shadowYBoost: 0,
  },
  soft: {
    id: "soft",
    label: "Soft Bubble",
    tag: "Cute",
    note: "Softer and lighter rounded look",
    fontFamily: "Verdana, Arial Rounded MT Bold, sans-serif",
    fontWeight: "800",
    fontScale: 0.96,
    letterSpacingOffset: 1,
    lineHeightAdjust: 0.04,
    rotate: 0,
    skewX: 0,
    outlineBoost: -2,
    stickerBoost: 0,
    depthBoost: -2,
    highlightBoost: 10,
    shadowBoost: -2,
    shadowXBoost: 0,
    shadowYBoost: 0,
  },
  outline: {
    id: "outline",
    label: "Outline Bubble",
    tag: "Outline",
    note: "High-contrast outline-heavy style",
    fontFamily: "Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif",
    fontWeight: "900",
    fontScale: 0.98,
    letterSpacingOffset: 1,
    lineHeightAdjust: 0,
    rotate: 0,
    skewX: 0,
    outlineBoost: 6,
    stickerBoost: -8,
    depthBoost: -4,
    highlightBoost: -8,
    shadowBoost: -6,
    shadowXBoost: 0,
    shadowYBoost: 0,
  },
  sticker: {
    id: "sticker",
    label: "Sticker Pop",
    tag: "Sticker",
    note: "Bold sticker-like bubble card",
    fontFamily: "Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif",
    fontWeight: "900",
    fontScale: 1,
    letterSpacingOffset: 2,
    lineHeightAdjust: 0,
    rotate: 0,
    skewX: 0,
    outlineBoost: 4,
    stickerBoost: 10,
    depthBoost: 2,
    highlightBoost: 8,
    shadowBoost: 2,
    shadowXBoost: 2,
    shadowYBoost: 2,
  },
  chunky: {
    id: "chunky",
    label: "Chunky Bubble",
    tag: "Bold",
    note: "Thicker mass with heavier depth",
    fontFamily: "Trebuchet MS, Arial Rounded MT Bold, Arial, sans-serif",
    fontWeight: "900",
    fontScale: 1.04,
    letterSpacingOffset: 1,
    lineHeightAdjust: -0.02,
    rotate: 0,
    skewX: 0,
    outlineBoost: 2,
    stickerBoost: 4,
    depthBoost: 6,
    highlightBoost: -4,
    shadowBoost: 2,
    shadowXBoost: 1,
    shadowYBoost: 2,
  },
  kid: {
    id: "kid",
    label: "Kid Bubble",
    tag: "Playful",
    note: "Friendly school-project look",
    fontFamily: "Comic Sans MS, Trebuchet MS, Arial, sans-serif",
    fontWeight: "700",
    fontScale: 0.98,
    letterSpacingOffset: 1,
    lineHeightAdjust: 0.06,
    rotate: -1,
    skewX: 0,
    outlineBoost: 0,
    stickerBoost: 4,
    depthBoost: 0,
    highlightBoost: 12,
    shadowBoost: -1,
    shadowXBoost: 0,
    shadowYBoost: 0,
  },
  writing: {
    id: "writing",
    label: "Bubble Writing",
    tag: "Script",
    note: "Rounded handwritten bubble flow",
    fontFamily: "Trebuchet MS, Verdana, Arial, sans-serif",
    fontStyle: "italic",
    fontWeight: "800",
    fontScale: 0.94,
    letterSpacingOffset: 2,
    lineHeightAdjust: 0.08,
    rotate: -2,
    skewX: -6,
    outlineBoost: -1,
    stickerBoost: 0,
    depthBoost: -2,
    highlightBoost: 6,
    shadowBoost: 0,
    shadowXBoost: 1,
    shadowYBoost: 1,
  },
  graffiti: {
    id: "graffiti",
    label: "Graffiti Bubble",
    tag: "Graffiti",
    note: "Street-style bubble with energy",
    fontFamily: "Arial Black, Arial Rounded MT Bold, Arial, sans-serif",
    fontWeight: "900",
    fontScale: 1.02,
    letterSpacingOffset: 3,
    lineHeightAdjust: 0,
    rotate: -4,
    skewX: -8,
    outlineBoost: 4,
    stickerBoost: -6,
    depthBoost: 10,
    highlightBoost: -10,
    shadowBoost: 6,
    shadowXBoost: 4,
    shadowYBoost: 4,
  },
};

const variantConfigs: Record<EditorVariant, VariantConfig> = {
  core: {
    defaultText: "Bubble\nMagic",
    presetKeys: ["classic", "soft", "outline", "sticker", "chunky", "writing"],
    defaultState: {
      width: 1120,
      height: 160,
      fontSize: 88,
      lineHeight: 1.02,
      letterSpacing: 2,
      textColor: "#ff3b30",
      backgroundColor: "#9b82c8",
      outlineEnabled: true,
      outlineColor: "#f8fafc",
      outlineWidth: 8,
      stickerEdgeEnabled: true,
      stickerEdgeColor: "#f8fafc",
      stickerEdgeWidth: 10,
      shadowEnabled: true,
      shadowColor: "rgba(15,23,42,0.28)",
      shadowX: 8,
      shadowY: 8,
      shadowBlur: 10,
      depth: 8,
      highlightStrength: 34,
    },
  },
  letters: {
    defaultText: "Luna\nName",
    presetKeys: ["classic", "soft", "kid", "sticker", "outline"],
    defaultState: {
      width: 1120,
      height: 160,
      fontSize: 84,
      lineHeight: 1.04,
      letterSpacing: 1,
      textColor: "#ff5a5f",
      backgroundColor: "#f0a8d8",
      outlineEnabled: true,
      outlineColor: "#fff7fb",
      outlineWidth: 10,
      stickerEdgeEnabled: true,
      stickerEdgeColor: "#fff7fb",
      stickerEdgeWidth: 14,
      shadowEnabled: true,
      shadowColor: "rgba(15,23,42,0.16)",
      shadowX: 4,
      shadowY: 5,
      shadowBlur: 8,
      depth: 4,
      highlightStrength: 44,
    },
  },
  writing: {
    defaultText: "Sweet\nNotes",
    presetKeys: ["writing", "soft", "classic", "kid"],
    defaultState: {
      width: 1120,
      height: 160,
      fontSize: 78,
      lineHeight: 1.14,
      letterSpacing: 3,
      textColor: "#ff6f61",
      backgroundColor: "#e8b7c8",
      outlineEnabled: true,
      outlineColor: "#fff8fb",
      outlineWidth: 6,
      stickerEdgeEnabled: false,
      stickerEdgeColor: "#fff8fb",
      stickerEdgeWidth: 8,
      shadowEnabled: true,
      shadowColor: "rgba(15,23,42,0.16)",
      shadowX: 3,
      shadowY: 4,
      shadowBlur: 8,
      depth: 2,
      highlightStrength: 28,
    },
  },
  graffiti: {
    defaultText: "Graffiti\nBlast",
    presetKeys: ["graffiti", "chunky", "outline", "sticker"],
    defaultState: {
      width: 1120,
      height: 160,
      fontSize: 94,
      lineHeight: 1,
      letterSpacing: 4,
      textColor: "#00f5d4",
      backgroundColor: "#1f1147",
      outlineEnabled: true,
      outlineColor: "#f8fafc",
      outlineWidth: 16,
      stickerEdgeEnabled: false,
      stickerEdgeColor: "#f8fafc",
      stickerEdgeWidth: 6,
      shadowEnabled: true,
      shadowColor: "rgba(2, 6, 23, 0.72)",
      shadowX: 18,
      shadowY: 20,
      shadowBlur: 24,
      depth: 24,
      highlightStrength: 18,
    },
  },
};

const styleAssistTemplates = [
  { label: "Style: cute pink sticker", prompt: "cute pink sticker" },
  { label: "Style: blue graffiti street", prompt: "blue graffiti street" },
  { label: "Style: yellow birthday banner", prompt: "yellow birthday banner" },
  { label: "Style: black outline logo", prompt: "black outline logo" },
  { label: "Style: green classroom label", prompt: "green classroom label" },
  { label: "Style: handwritten pink note", prompt: "handwritten pink note" },
  { label: "Edit: remove shadow", prompt: "remove shadow" },
  { label: "Edit: add stronger shadow", prompt: "add stronger shadow" },
  { label: "Edit: bigger text", prompt: "bigger text" },
  { label: "Edit: smaller text", prompt: "smaller text" },
  { label: "Edit: remove outline", prompt: "remove outline" },
  { label: "Edit: thicker outline", prompt: "thicker outline" },
  { label: "Edit: add sticker edge", prompt: "add sticker edge" },
  { label: "Edit: more 3D thickness", prompt: "more 3d thickness" },
  { label: "Edit: remove 3D depth", prompt: "remove 3d depth" },
  { label: "Edit: wider letter spacing", prompt: "wider letter spacing" },
  { label: "Edit: tighter letter spacing", prompt: "tighter letter spacing" },
  { label: "Edit: more shine", prompt: "more shine" },
  { label: "Edit: remove highlight", prompt: "remove highlight" },
];

const variantFontCategories: Record<EditorVariant, BubbleFontCategory[]> = {
  core: [],
  letters: ["school", "cute", "outline"],
  writing: ["handwritten", "school", "cute"],
  graffiti: ["graffiti", "outline", "chunky"],
};

function getVariantForPath(path: string): EditorVariant {
  if (path === routes.bubbleLetterFontGenerator) {
    return "letters";
  }

  if (path === routes.bubbleGraffitiFontGenerator) {
    return "graffiti";
  }

  return "core";
}

function getVariantFontCategories(variant: EditorVariant) {
  return variantFontCategories[variant];
}

function shouldUseDistinctFirstView(variant: EditorVariant) {
  return variant === "letters";
}

function getInitialState(variant: EditorVariant): EditorState {
  const config = variantConfigs[variant];

  return {
    text: config.defaultText,
    ...config.defaultState,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rgbaToFeColor(input: string) {
  const match = input.match(
    /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)/i,
  );

  if (!match) {
    return {
      color: input,
      opacity: 1,
    };
  }

  return {
    color: `rgb(${match[1]} ${match[2]} ${match[3]})`,
    opacity: match[4] ? Number(match[4]) : 1,
  };
}

function colorWithOpacity(input: string, opacity: number) {
  const hex = input.replace("#", "");

  if (/^[0-9a-f]{3}$/i.test(hex)) {
    const [r, g, b] = hex.split("").map((value) => value + value);
    return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(
      b,
      16,
    )}, ${opacity})`;
  }

  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(
      hex.slice(2, 4),
      16,
    )}, ${parseInt(hex.slice(4, 6), 16)}, ${opacity})`;
  }

  const rgbMatch = input.match(
    /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\s*\)/i,
  );

  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacity})`;
  }

  return input;
}

function buildLines(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.length > 0 ? lines : ["Bubble"];
}

type ResultSvgProps = {
  state: EditorState;
  preset: ResultPreset;
  font: BubbleFont;
  lines: string[];
  filterId: string;
  svgRef?: (node: SVGSVGElement | null) => void;
  ariaLabel: string;
};

function ResultSvg({
  state,
  preset,
  font,
  lines,
  filterId,
  svgRef,
  ariaLabel,
}: ResultSvgProps) {
  const lineHeight = clamp(state.lineHeight + preset.lineHeightAdjust, 0.9, 1.6);
  const baseFontSize = state.fontSize * preset.fontScale;
  const outlineWidth = Math.max(0, state.outlineWidth + preset.outlineBoost);
  const stickerWidth = Math.max(0, state.stickerEdgeWidth + preset.stickerBoost);
  const shadowBlur = Math.max(0, state.shadowBlur + preset.shadowBoost);
  const shadowX = state.shadowX + preset.shadowXBoost;
  const shadowY = state.shadowY + preset.shadowYBoost;
  const depthSteps = Math.max(0, Math.round(state.depth + preset.depthBoost));
  const verticalPadding = Math.max(
    18,
    outlineWidth,
    stickerWidth,
    shadowBlur + Math.abs(shadowY),
    depthSteps * 1.05 + 10,
  );
  const maxFontSizeByHeight =
    (state.height - verticalPadding * 2) /
    (1 + Math.max(0, lines.length - 1) * lineHeight);
  const fontSize = clamp(Math.min(baseFontSize, maxFontSizeByHeight), 28, 180);
  const letterSpacing = clamp(
    state.letterSpacing + preset.letterSpacingOffset,
    0,
    24,
  );
  const lineAdvance = fontSize * lineHeight;
  const totalHeight = fontSize + lineAdvance * (lines.length - 1);
  const startY = (state.height - totalHeight) / 2 + fontSize / 2;
  const shadowValues = rgbaToFeColor(state.shadowColor);
  const highlightOpacity =
    clamp((state.highlightStrength + preset.highlightBoost) / 100, 0, 1) * 0.55;
  const depthColor = colorWithOpacity(
    preset.id === "graffiti" ? "#020617" : state.outlineColor,
    preset.id === "graffiti" ? 0.75 : 0.28,
  );

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${state.width} ${state.height}`}
      width="100%"
      height="100%"
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="xMidYMid meet"
      className="block h-full w-full"
    >
      <defs>
        <style data-svg-font-face="true">
          {buildExternalSvgFontFaceCss({
            family: font.family,
            fontWeight: font.fontWeight,
            filePath: font.filePath,
          })}
        </style>
        <filter id={filterId} x="-20%" y="-20%" width="160%" height="160%">
          <feDropShadow
            dx={state.shadowEnabled ? shadowX : 0}
            dy={state.shadowEnabled ? shadowY : 0}
            stdDeviation={state.shadowEnabled ? shadowBlur / 2 : 0}
            floodColor={shadowValues.color}
            floodOpacity={state.shadowEnabled ? shadowValues.opacity : 0}
          />
        </filter>
      </defs>

      <rect
        x="0"
        y="0"
        width={state.width}
        height={state.height}
        fill={state.backgroundColor}
        data-download-background="true"
      />

      <g filter={`url(#${filterId})`}>
        {lines.map((line, index) => {
          const y = startY + lineAdvance * index;

          return (
            <g key={`${preset.id}-${line}-${index}`}>
              {state.stickerEdgeEnabled && stickerWidth > 0 ? (
                <text
                  x={state.width / 2}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={fontSize}
                  fontWeight={font.fontWeight}
                  fontFamily={font.familyStack}
                  fontStyle={preset.fontStyle}
                  fill={state.textColor}
                  stroke={state.stickerEdgeColor}
                  strokeWidth={stickerWidth}
                  strokeLinejoin="round"
                  paintOrder="stroke fill"
                  letterSpacing={letterSpacing}
                  opacity={0.98}
                  transform={
                    preset.rotate !== 0 || preset.skewX !== 0
                      ? `rotate(${preset.rotate} ${state.width / 2} ${y}) skewX(${preset.skewX})`
                      : undefined
                  }
                >
                  {line}
                </text>
              ) : null}

              {depthSteps > 0
                ? Array.from({ length: depthSteps }).map((_, depthIndex) => (
                    <text
                      key={`${preset.id}-${line}-${index}-depth-${depthIndex}`}
                      x={state.width / 2 + depthIndex * 0.8}
                      y={y + depthIndex * 1.05}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={fontSize}
                      fontWeight={font.fontWeight}
                      fontFamily={font.familyStack}
                      fontStyle={preset.fontStyle}
                      fill={depthColor}
                      stroke={state.outlineEnabled ? colorWithOpacity(state.outlineColor, 0.3) : "transparent"}
                      strokeWidth={state.outlineEnabled ? 2 : 0}
                      strokeLinejoin="round"
                      paintOrder="stroke fill"
                      letterSpacing={letterSpacing}
                      transform={
                        preset.rotate !== 0 || preset.skewX !== 0
                          ? `rotate(${preset.rotate} ${state.width / 2} ${y}) skewX(${preset.skewX})`
                          : undefined
                      }
                    >
                      {line}
                    </text>
                  ))
                : null}

              <text
                x={state.width / 2 - fontSize * 0.04}
                y={y - fontSize * 0.08}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={fontSize}
                fontWeight={font.fontWeight}
                fontFamily={font.familyStack}
                fontStyle={preset.fontStyle}
                fill="white"
                fillOpacity={preset.id === "graffiti" ? highlightOpacity * 0.7 : highlightOpacity}
                letterSpacing={letterSpacing}
                transform={
                  preset.rotate !== 0 || preset.skewX !== 0
                    ? `rotate(${preset.rotate} ${state.width / 2} ${y}) skewX(${preset.skewX}) translate(8 0)`
                    : undefined
                }
              >
                {line}
              </text>

              <text
                x={state.width / 2}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={fontSize}
                fontWeight={font.fontWeight}
                fontFamily={font.familyStack}
                fontStyle={preset.fontStyle}
                fill={state.textColor}
                stroke={state.outlineEnabled ? state.outlineColor : "transparent"}
                strokeWidth={state.outlineEnabled ? outlineWidth : 0}
                strokeLinejoin="round"
                paintOrder="stroke fill"
                letterSpacing={letterSpacing}
                transform={
                  preset.rotate !== 0 || preset.skewX !== 0
                    ? `rotate(${preset.rotate} ${state.width / 2} ${y}) skewX(${preset.skewX})`
                    : undefined
                }
              >
                {line}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function BubbleEditor({ pagePath, heading }: BubbleEditorProps) {
  const variant = getVariantForPath(pagePath);
  const [state, setState] = useState(() => getInitialState(variant));
  const [stylePrompt, setStylePrompt] = useState("");
  const [assistMessage, setAssistMessage] = useState<string | null>(null);
  const [selectedAssistTemplate, setSelectedAssistTemplate] = useState("");
  const [featuredFontCategories, setFeaturedFontCategories] = useState<BubbleFontCategory[]>([]);
  const [fontSort, setFontSort] = useState<BubbleFontSortKey>("popular");
  const [visibleFontCount, setVisibleFontCount] = useState(CORE_BUBBLE_FONT_COUNT);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const [removeBackgroundWhenDownloading, setRemoveBackgroundWhenDownloading] =
    useState(DEFAULT_REMOVE_DOWNLOAD_BACKGROUND);
  const baseId = useId().replace(/:/g, "");
  const svgRefs = useRef<Record<string, SVGSVGElement | null>>({});
  const lines = useMemo(() => buildLines(state.text), [state.text]);
  const orderedFonts = useMemo(() => {
    const variantCategories = getVariantFontCategories(variant);
    const preferredCategories =
      featuredFontCategories.length > 0 ? featuredFontCategories : variantCategories;

    const getFonts = shouldUseDistinctFirstView(variant)
      ? getBubbleFontsForDistinctFirstView
      : getBubbleFontsForDisplay;

    return getFonts({
      preferredCategories,
      sortKey: fontSort,
    });
  }, [featuredFontCategories, fontSort, variant]);

  const visibleFonts = useMemo(
    () => orderedFonts.slice(0, visibleFontCount),
    [orderedFonts, visibleFontCount],
  );
  const selectedAssistTemplateLabel =
    styleAssistTemplates.find((template) => template.prompt === selectedAssistTemplate)
      ?.label ?? AI_ASSIST_TEMPLATE_PLACEHOLDER;

  const applyStyleAssist = (promptValue: string) => {
    const suggestion = buildStyleAssistSuggestion(promptValue, variant);

    if (!suggestion) {
      setAssistMessage("Enter a short style prompt to apply a suggestion.");
      return;
    }

    setState((current) => {
      const fontSize = clamp(
        current.fontSize + (suggestion.fontSizeDelta ?? 0),
        52,
        160,
      );

      return {
        ...current,
        textColor: suggestion.applyColors ? suggestion.textColor : current.textColor,
        backgroundColor: suggestion.applyColors
          ? suggestion.backgroundColor
          : current.backgroundColor,
        outlineColor: suggestion.applyColors
          ? suggestion.outlineColor
          : current.outlineColor,
        shadowColor: suggestion.applyColors ? suggestion.shadowColor : current.shadowColor,
        outlineEnabled: suggestion.outlineEnabled ?? current.outlineEnabled,
        stickerEdgeEnabled:
          suggestion.stickerEdgeEnabled ?? current.stickerEdgeEnabled,
        shadowEnabled: suggestion.shadowEnabled ?? current.shadowEnabled,
        fontSize,
        height: getAutoHeightForFontSize({
          currentHeight: current.height,
          fontSize,
          lineHeight: current.lineHeight,
          lineCount: buildLines(current.text).length,
          outlineWidth: clamp(
            current.outlineWidth + (suggestion.outlineWidthDelta ?? 0),
            0,
            30,
          ),
          stickerEdgeEnabled:
            suggestion.stickerEdgeEnabled ?? current.stickerEdgeEnabled,
          stickerEdgeWidth: clamp(
            current.stickerEdgeWidth + (suggestion.stickerEdgeWidthDelta ?? 0),
            0,
            28,
          ),
          shadowEnabled: suggestion.shadowEnabled ?? current.shadowEnabled,
          shadowBlur: clamp(
            current.shadowBlur + (suggestion.shadowBlurDelta ?? 0),
            0,
            30,
          ),
          shadowY: current.shadowY,
          depth: clamp(current.depth + (suggestion.depthDelta ?? 0), 0, 22),
        }),
        letterSpacing: clamp(
          current.letterSpacing + (suggestion.letterSpacingDelta ?? 0),
          0,
          18,
        ),
        outlineWidth: clamp(
          current.outlineWidth + (suggestion.outlineWidthDelta ?? 0),
          0,
          30,
        ),
        stickerEdgeWidth: clamp(
          current.stickerEdgeWidth + (suggestion.stickerEdgeWidthDelta ?? 0),
          0,
          28,
        ),
        shadowBlur: clamp(
          current.shadowBlur + (suggestion.shadowBlurDelta ?? 0),
          0,
          30,
        ),
        depth: clamp(current.depth + (suggestion.depthDelta ?? 0), 0, 22),
        highlightStrength: clamp(
          current.highlightStrength + (suggestion.highlightStrengthDelta ?? 0),
          0,
          100,
        ),
      };
    });
    setFeaturedFontCategories(suggestion.fontCategories);
    setVisibleFontCount((currentCount) =>
      Math.max(currentCount, CORE_BUBBLE_FONT_COUNT),
    );
    setAssistMessage(suggestion.message);
    setDownloadMessage(null);
  };

  const downloadPresetPng = async (font: BubbleFont, preset: ResultPreset) => {
    const svgElement = svgRefs.current[font.id];

    if (!svgElement) {
      return;
    }

    try {
      setDownloadMessage(`Preparing ${preset.label} PNG...`);
      await document.fonts.load(`${font.fontWeight} 64px "${font.family}"`);
      await document.fonts.ready;
      const fontDataUrl = await fetchFontDataUrl(font.filePath);

      const downloadBackgroundFill = getDownloadBackgroundFill(
        removeBackgroundWhenDownloading,
        state.backgroundColor,
      );
      const svgForDownload = svgElement.cloneNode(true) as SVGSVGElement;
      const backgroundRect = svgForDownload.querySelector(
        "[data-download-background]",
      );

      if (backgroundRect && downloadBackgroundFill) {
        backgroundRect.setAttribute("fill", downloadBackgroundFill);
      } else {
        backgroundRect?.remove();
      }

      const fontFaceStyle = svgForDownload.querySelector(
        "style[data-svg-font-face]",
      );
      fontFaceStyle?.replaceChildren(
        buildEmbeddedSvgFontFaceCss({
          family: font.family,
          fontWeight: font.fontWeight,
          fontDataUrl,
        }),
      );

      const serializer = new XMLSerializer();
      const svgMarkup = serializer.serializeToString(svgForDownload);
      const svgBlob = new Blob([svgMarkup], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);
      const image = new Image();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = state.width;
      canvas.height = state.height;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Failed to load SVG preview."));
        image.src = url;
      });

      if (!context) {
        throw new Error("Canvas context is unavailable.");
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${heading.toLowerCase().replace(/\s+/g, "-")}-${font.id}.png`;
      link.click();

      URL.revokeObjectURL(url);
      setDownloadMessage(
        `${font.displayName} downloaded with ${
          downloadBackgroundFill ? "canvas color" : "transparent"
        } background.`,
      );
    } catch (error) {
      setDownloadMessage(
        error instanceof Error ? error.message : "Failed to export PNG.",
      );
    }
  };

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <aside className="rounded-3xl border border-white/10 bg-[rgba(24,20,48,0.82)] p-5 shadow-xl shadow-[#080812]/20">
        <label className="block">
          <span className="text-sm font-medium text-slate-300">Enter Your Text</span>
          <textarea
            value={state.text}
            onChange={(event) =>
              setState((current) => ({ ...current, text: event.target.value }))
            }
            rows={4}
            aria-label="Enter your text"
            placeholder="Type your words here"
            className="mt-2 w-full rounded-2xl border border-cyan-300/45 bg-[rgba(18,17,40,0.92)] px-4 py-4 text-xl text-slate-50 shadow-sm outline-none transition focus:border-cyan-200"
          />
        </label>

        <div className="mt-6 rounded-3xl border border-white/10 bg-[rgba(30,24,56,0.76)] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-slate-50">
                  AI Assist
                </h2>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  AI
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Describe a style or edit command. Try bigger text, remove shadow, cute sticker,
                graffiti, outline, 3D depth, spacing, or shine.
              </p>
            </div>
          </div>

          <label className="mt-4 block">
            <span className="sr-only">Describe your style</span>
            <input
              type="text"
              value={stylePrompt}
              onChange={(event) => {
                setStylePrompt(event.target.value);
                setSelectedAssistTemplate("");
                setAssistMessage(null);
              }}
              placeholder="cute pink sticker"
              className="w-full rounded-2xl border border-white/10 bg-[rgba(18,17,40,0.96)] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
            />
          </label>

          <label className="mt-3 block">
            <div className="relative">
              <span className={AI_ASSIST_TEMPLATE_DISPLAY_CLASS_NAME}>
                <span className={AI_ASSIST_TEMPLATE_VALUE_CLASS_NAME}>
                  {selectedAssistTemplateLabel}
                </span>
                <span className="shrink-0 text-[10px] text-cyan-100">v</span>
              </span>
              <select
                value={selectedAssistTemplate}
                onChange={(event) => {
                  setSelectedAssistTemplate(event.target.value);
                  setStylePrompt(event.target.value);
                  setAssistMessage(null);
                }}
                className={AI_ASSIST_TEMPLATE_NATIVE_SELECT_CLASS_NAME}
                aria-label="Choose an AI assist template"
              >
                <option value="" className="bg-slate-950">
                  {AI_ASSIST_TEMPLATE_PLACEHOLDER}
                </option>
                {styleAssistTemplates.map((template) => (
                  <option
                    key={template.prompt}
                    value={template.prompt}
                    className="bg-slate-950"
                  >
                    {template.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => applyStyleAssist(stylePrompt)}
              className="inline-flex items-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={stylePrompt.trim().length === 0}
            >
              Apply AI Assist
            </button>
            {assistMessage ? (
              <p className="text-sm leading-6 text-slate-400">{assistMessage}</p>
            ) : null}
          </div>
        </div>

        <div
          data-editor-color-controls="true"
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Text Color</span>
            <div className="mt-2 rounded-2xl border border-white/10 bg-[rgba(30,24,56,0.9)] p-2">
              <input
                type="color"
                value={state.textColor}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    textColor: event.target.value,
                  }))
                }
                className="h-11 w-full rounded-xl border border-white/10 bg-[rgba(18,17,40,0.96)] p-1"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Background</span>
            <div className="mt-2 rounded-2xl border border-white/10 bg-[rgba(30,24,56,0.9)] p-2">
              <input
                type="color"
                value={state.backgroundColor}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    backgroundColor: event.target.value,
                  }))
                }
                className="h-11 w-full rounded-xl border border-white/10 bg-[rgba(18,17,40,0.96)] p-1"
              />
            </div>
          </label>
        </div>

        <label
          data-editor-font-size-control="true"
          className="mt-5 block rounded-3xl border border-white/10 bg-[rgba(30,24,56,0.76)] p-4"
        >
          <div className="flex items-center justify-between text-sm font-medium text-slate-300">
            <span>Font Size</span>
            <span>{state.fontSize}px</span>
          </div>
          <input
            type="range"
            min={52}
            max={160}
            step={2}
            value={state.fontSize}
            onChange={(event) =>
              setState((current) => {
                const fontSize = Number(event.target.value);

                return {
                  ...current,
                  fontSize,
                  height: getAutoHeightForFontSize({
                    currentHeight: current.height,
                    fontSize,
                    lineHeight: current.lineHeight,
                    lineCount: buildLines(current.text).length,
                    outlineWidth: current.outlineWidth,
                    stickerEdgeEnabled: current.stickerEdgeEnabled,
                    stickerEdgeWidth: current.stickerEdgeWidth,
                    shadowEnabled: current.shadowEnabled,
                    shadowBlur: current.shadowBlur,
                    shadowY: current.shadowY,
                    depth: current.depth,
                  }),
                };
              })
            }
            className="mt-3 w-full"
          />
        </label>

        <details className="mt-8 rounded-3xl border border-white/10 bg-[rgba(30,24,56,0.76)] p-5">
          <summary className="cursor-pointer list-none text-xl font-semibold text-slate-100">
            Advanced Options
          </summary>
          <div className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Canvas Width</span>
                <input
                  type="number"
                  min={720}
                  max={1600}
                  step={20}
                  value={state.width}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      width: clamp(Number(event.target.value) || 1120, 720, 1600),
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(18,17,40,0.96)] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Canvas Height</span>
                  <input
                    type="number"
                    min={MIN_CANVAS_HEIGHT}
                    max={MAX_CANVAS_HEIGHT}
                    step={20}
                    value={state.height}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        height: clamp(
                          Number(event.target.value) || current.height,
                          MIN_CANVAS_HEIGHT,
                          MAX_CANVAS_HEIGHT,
                        ),
                      }))
                    }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[rgba(18,17,40,0.96)] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>Letter Spacing</span>
                  <span>{state.letterSpacing}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={18}
                  step={1}
                  value={state.letterSpacing}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      letterSpacing: Number(event.target.value),
                    }))
                  }
                  className="mt-3 w-full"
                />
              </label>
              <label className="block">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>Line Height</span>
                  <span>{state.lineHeight.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0.9}
                  max={1.5}
                  step={0.02}
                  value={state.lineHeight}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      lineHeight: Number(event.target.value),
                    }))
                  }
                  className="mt-3 w-full"
                />
              </label>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(18,17,40,0.76)] p-4">
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-300">Enable Outline</span>
                <input
                  type="checkbox"
                  checked={state.outlineEnabled}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      outlineEnabled: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-[rgba(18,17,40,0.96)] text-cyan-300"
                />
              </label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-300">Outline Color</span>
                  <input
                    type="color"
                    value={state.outlineColor}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        outlineColor: event.target.value,
                      }))
                    }
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[rgba(18,17,40,0.96)] p-2"
                    disabled={!state.outlineEnabled}
                  />
                </label>
                <label className="block">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                    <span>Outline Width</span>
                    <span>{state.outlineWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={1}
                    value={state.outlineWidth}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        outlineWidth: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!state.outlineEnabled}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(18,17,40,0.76)] p-4">
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-300">Enable Sticker Edge</span>
                <input
                  type="checkbox"
                  checked={state.stickerEdgeEnabled}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      stickerEdgeEnabled: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-[rgba(18,17,40,0.96)] text-cyan-300"
                />
              </label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-300">Sticker Edge Color</span>
                  <input
                    type="color"
                    value={state.stickerEdgeColor}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        stickerEdgeColor: event.target.value,
                      }))
                    }
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-[rgba(18,17,40,0.96)] p-2"
                    disabled={!state.stickerEdgeEnabled}
                  />
                </label>
                <label className="block">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                    <span>Sticker Edge Width</span>
                    <span>{state.stickerEdgeWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={28}
                    step={1}
                    value={state.stickerEdgeWidth}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        stickerEdgeWidth: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!state.stickerEdgeEnabled}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(18,17,40,0.76)] p-4">
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-300">Enable Shadow</span>
                <input
                  type="checkbox"
                  checked={state.shadowEnabled}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      shadowEnabled: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-[rgba(18,17,40,0.96)] text-cyan-300"
                />
              </label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-300">Shadow Color</span>
                  <input
                    type="text"
                    value={state.shadowColor}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        shadowColor: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                    disabled={!state.shadowEnabled}
                  />
                </label>
                <label className="block">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                    <span>Shadow Blur</span>
                    <span>{state.shadowBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={1}
                    value={state.shadowBlur}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        shadowBlur: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!state.shadowEnabled}
                  />
                </label>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                    <span>Shadow X</span>
                    <span>{state.shadowX}px</span>
                  </div>
                  <input
                    type="range"
                    min={-30}
                    max={30}
                    step={1}
                    value={state.shadowX}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        shadowX: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!state.shadowEnabled}
                  />
                </label>
                <label className="block">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                    <span>Shadow Y</span>
                    <span>{state.shadowY}px</span>
                  </div>
                  <input
                    type="range"
                    min={-30}
                    max={30}
                    step={1}
                    value={state.shadowY}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        shadowY: Number(event.target.value),
                      }))
                    }
                    className="mt-3 w-full"
                    disabled={!state.shadowEnabled}
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>3D Thickness</span>
                  <span>{state.depth}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={22}
                  step={1}
                  value={state.depth}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      depth: Number(event.target.value),
                    }))
                  }
                  className="mt-3 w-full"
                />
              </label>
              <label className="block">
                <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                  <span>Highlight Strength</span>
                  <span>{state.highlightStrength}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={state.highlightStrength}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      highlightStrength: Number(event.target.value),
                    }))
                  }
                  className="mt-3 w-full"
                />
              </label>
            </div>
          </div>
        </details>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setState(getInitialState(variant));
              setStylePrompt("");
              setSelectedAssistTemplate("");
              setAssistMessage(null);
              setFeaturedFontCategories([]);
              setFontSort("popular");
              setVisibleFontCount(CORE_BUBBLE_FONT_COUNT);
              setRemoveBackgroundWhenDownloading(DEFAULT_REMOVE_DOWNLOAD_BACKGROUND);
              setDownloadMessage(null);
            }}
            className="inline-flex items-center rounded-full border border-white/10 bg-[rgba(30,24,56,0.9)] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/25 hover:text-cyan-100"
          >
            Reset All
          </button>
        </div>

        {downloadMessage ? (
          <p className="mt-4 text-sm leading-6 text-slate-400">{downloadMessage}</p>
        ) : null}
      </aside>

      <section
        className="self-start rounded-3xl border border-white/10 p-4 shadow-2xl shadow-[#080812]/25"
        style={{ backgroundColor: colorWithOpacity(state.backgroundColor, 0.24) }}
      >
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4 pb-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-50">
              Bubble Font Generator Results
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Compare real bubble font previews, pick your favorite result, and download a PNG.
            </p>
              {featuredFontCategories.length > 0 && fontSort === "popular" ? (
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cyan-100">
                  AI Assist moved recommended font styles to the top.
                </p>
              ) : null}
          </div>
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                <span className="text-slate-400">Sort</span>
                <select
                  value={fontSort}
                  onChange={(event) => {
                    setFontSort(event.target.value as BubbleFontSortKey);
                    setVisibleFontCount(CORE_BUBBLE_FONT_COUNT);
                  }}
                  className="bg-transparent text-cyan-100 outline-none"
                  aria-label="Sort bubble fonts"
                >
                  {fontSortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-950">
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                {visibleFonts.length} of {bubbleFontLibrary.length} fonts
              </span>
            </div>

            <label className="flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold text-slate-200 sm:text-xs">
              <span className="min-w-0 leading-5">
                Remove background when downloading
              </span>
              <input
                type="checkbox"
                checked={removeBackgroundWhenDownloading}
                onChange={(event) => {
                  setRemoveBackgroundWhenDownloading(event.target.checked);
                  setDownloadMessage(null);
                }}
                className="sr-only"
                aria-label="Remove background when downloading"
              />
              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  removeBackgroundWhenDownloading
                    ? "bg-cyan-300"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
                    removeBackgroundWhenDownloading ? "translate-x-5" : ""
                  }`}
                />
              </span>
              <span className="w-6 shrink-0 text-cyan-100">
                {removeBackgroundWhenDownloading ? "on" : "off"}
              </span>
            </label>
          </div>
        </div>

        <div
          data-result-font-list="true"
          className="editor-scrollbar max-h-[1080px] space-y-3 overflow-y-auto pr-1"
        >
          {visibleFonts.map((font) => {
            const preset = resultPresets[font.effectPresetId];

            return (
            <article
              key={font.id}
              className="rounded-3xl p-3 shadow-xl shadow-black/20"
              style={{ backgroundColor: state.backgroundColor }}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    {font.displayName}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-100/80">
                    {font.categories.slice(0, 2).join(" / ")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => downloadPresetPng(font, preset)}
                  className="inline-flex items-center rounded-md bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/30"
                >
                  Download PNG
                </button>
              </div>

              <div
                className={resultCardPreviewClassName}
                style={{ backgroundColor: state.backgroundColor }}
              >
                <ResultSvg
                  state={state}
                  preset={preset}
                  font={font}
                  lines={lines}
                  filterId={`${baseId}-${font.id}`}
                  svgRef={(node) => {
                    svgRefs.current[font.id] = node;
                  }}
                  ariaLabel={`${heading} ${font.displayName} preview`}
                />
              </div>
            </article>
            );
          })}
          {visibleFontCount < bubbleFontLibrary.length ? (
            <button
              type="button"
              onClick={() =>
                setVisibleFontCount((currentCount) =>
                  Math.min(
                    bubbleFontLibrary.length,
                    currentCount + BUBBLE_FONT_PAGE_SIZE,
                  ),
                )
              }
              className="w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/15"
            >
              Show next{" "}
              {Math.min(
                BUBBLE_FONT_PAGE_SIZE,
                bubbleFontLibrary.length - visibleFontCount,
              )}{" "}
              real bubble fonts
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}

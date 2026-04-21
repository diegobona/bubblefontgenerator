"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { routes } from "@/lib/routes";

type BubbleEditorProps = {
  pagePath: string;
  heading: string;
};

type EditorVariant = "core" | "letters" | "writing" | "graffiti";
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
    defaultText: "Urban\nBlast",
    presetKeys: ["graffiti", "chunky", "outline", "sticker"],
    defaultState: {
      width: 1120,
      height: 160,
      fontSize: 94,
      lineHeight: 1,
      letterSpacing: 4,
      textColor: "#ffb703",
      backgroundColor: "#6b5bd2",
      outlineEnabled: true,
      outlineColor: "#f8fafc",
      outlineWidth: 12,
      stickerEdgeEnabled: false,
      stickerEdgeColor: "#f8fafc",
      stickerEdgeWidth: 6,
      shadowEnabled: true,
      shadowColor: "rgba(59,130,246,0.42)",
      shadowX: 14,
      shadowY: 16,
      shadowBlur: 20,
      depth: 18,
      highlightStrength: 18,
    },
  },
};

function getVariantForPath(path: string): EditorVariant {
  if (path === routes.bubbleLetterFontGenerator) {
    return "letters";
  }

  if (path === routes.bubbleWritingFontGenerator) {
    return "writing";
  }

  if (path === routes.bubbleGraffitiFontGenerator) {
    return "graffiti";
  }

  return "core";
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
  lines: string[];
  filterId: string;
  svgRef?: (node: SVGSVGElement | null) => void;
  ariaLabel: string;
};

function ResultSvg({
  state,
  preset,
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
      className="block h-auto w-full"
    >
      <defs>
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

      <rect x="0" y="0" width={state.width} height={state.height} fill={state.backgroundColor} />

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
                  fontWeight={preset.fontWeight}
                  fontFamily={preset.fontFamily}
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
                      fontWeight={preset.fontWeight}
                      fontFamily={preset.fontFamily}
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
                fontWeight={preset.fontWeight}
                fontFamily={preset.fontFamily}
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
                fontWeight={preset.fontWeight}
                fontFamily={preset.fontFamily}
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
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const baseId = useId().replace(/:/g, "");
  const svgRefs = useRef<Record<string, SVGSVGElement | null>>({});
  const lines = useMemo(() => buildLines(state.text), [state.text]);
  const presets = variantConfigs[variant].presetKeys.map((key) => resultPresets[key]);

  useEffect(() => {
    setState(getInitialState(variant));
    setDownloadMessage(null);
  }, [variant]);

  const downloadPresetPng = async (preset: ResultPreset) => {
    const svgElement = svgRefs.current[preset.id];

    if (!svgElement) {
      return;
    }

    try {
      setDownloadMessage(`Preparing ${preset.label} PNG...`);

      const serializer = new XMLSerializer();
      const svgMarkup = serializer.serializeToString(svgElement);
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
      link.download = `${heading.toLowerCase().replace(/\s+/g, "-")}-${preset.id}.png`;
      link.click();

      URL.revokeObjectURL(url);
      setDownloadMessage(`${preset.label} downloaded.`);
    } catch (error) {
      setDownloadMessage(
        error instanceof Error ? error.message : "Failed to export PNG.",
      );
    }
  };

  return (
    <div className="mt-4 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="rounded-3xl bg-slate-950/55 p-5 shadow-xl shadow-black/10">
        <label className="block">
          <span className="text-sm font-medium text-slate-300">Text</span>
          <textarea
            value={state.text}
            onChange={(event) =>
              setState((current) => ({ ...current, text: event.target.value }))
            }
            rows={4}
            aria-label="Text"
            className="mt-2 w-full rounded-2xl border border-cyan-400/60 bg-slate-900 px-4 py-4 text-xl text-slate-50 shadow-sm outline-none transition focus:border-cyan-300"
          />
        </label>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Text Color</span>
            <div className="mt-2 rounded-2xl border border-white/10 bg-slate-900 p-3">
              <input
                type="color"
                value={state.textColor}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    textColor: event.target.value,
                  }))
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 p-1"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Background</span>
            <div className="mt-2 rounded-2xl border border-white/10 bg-slate-900 p-3">
              <input
                type="color"
                value={state.backgroundColor}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    backgroundColor: event.target.value,
                  }))
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-slate-950 p-1"
              />
            </div>
          </label>
        </div>

        <details className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
          <summary className="cursor-pointer list-none text-xl font-semibold text-slate-100">
            Advance Options
          </summary>
          <div className="mt-6 space-y-5">
            <label className="block">
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
                  setState((current) => ({
                    ...current,
                    fontSize: Number(event.target.value),
                  }))
                }
                className="mt-3 w-full"
              />
            </label>

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
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Canvas Height</span>
                <input
                  type="number"
                  min={180}
                  max={520}
                  step={20}
                  value={state.height}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      height: clamp(Number(event.target.value) || 160, 140, 360),
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
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

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
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
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400"
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
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-slate-950 p-2"
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

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
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
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400"
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
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-slate-950 p-2"
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

            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
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
                  className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400"
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
            onClick={() => setState(getInitialState(variant))}
            className="inline-flex items-center rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            Reset
          </button>
        </div>

        {downloadMessage ? (
          <p className="mt-4 text-sm leading-6 text-slate-400">{downloadMessage}</p>
        ) : null}
      </aside>

      <section
        className="rounded-3xl p-4 shadow-2xl shadow-black/20"
        style={{ backgroundColor: colorWithOpacity(state.backgroundColor, 0.3) }}
      >
        <div className="mb-4 flex items-center justify-end gap-4 pb-2">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
            {presets.length} styles
          </span>
        </div>

        <div className="editor-scrollbar max-h-[76vh] space-y-4 overflow-y-auto pr-1">
          {presets.map((preset) => (
            <article
              key={preset.id}
              className="rounded-3xl p-4 shadow-xl shadow-black/20"
              style={{ backgroundColor: state.backgroundColor }}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    {preset.label}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-100/80">
                    {preset.tag}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => downloadPresetPng(preset)}
                  className="inline-flex items-center rounded-md bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/30"
                >
                  download
                </button>
              </div>

              <div
                className="overflow-hidden rounded-2xl"
                style={{ backgroundColor: state.backgroundColor }}
              >
                <ResultSvg
                  state={state}
                  preset={preset}
                  lines={lines}
                  filterId={`${baseId}-${preset.id}`}
                  svgRef={(node) => {
                    svgRefs.current[preset.id] = node;
                  }}
                  ariaLabel={`${heading} ${preset.label} preview`}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useId, useMemo, useRef, useState } from "react";

import { routes } from "@/lib/routes";

type BubbleEditorProps = {
  pagePath: string;
  heading: string;
};

type EditorVariant = "core" | "letters" | "writing" | "graffiti";
type PresetKey = "classic" | "sticker" | "graffiti";

type PresetConfig = {
  label: string;
  textColor: string;
  backgroundColor: string;
  outlineColor: string;
  outlineWidth: number;
  stickerEdgeEnabled: boolean;
  stickerEdgeColor: string;
  stickerEdgeWidth: number;
  shadowColor: string;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  letterSpacing: number;
  depth: number;
  highlightStrength: number;
};

type EditorState = {
  text: string;
  preset: PresetKey;
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

const presetConfigs: Record<PresetKey, PresetConfig> = {
  classic: {
    label: "Classic Bubble",
    textColor: "#38BDF8",
    backgroundColor: "#F8FAFC",
    outlineColor: "#0F172A",
    outlineWidth: 12,
    stickerEdgeEnabled: false,
    stickerEdgeColor: "#FFFFFF",
    stickerEdgeWidth: 10,
    shadowColor: "rgba(14, 165, 233, 0.45)",
    shadowX: 8,
    shadowY: 12,
    shadowBlur: 12,
    letterSpacing: 2,
    depth: 6,
    highlightStrength: 32,
  },
  sticker: {
    label: "Sticker Pop",
    textColor: "#F472B6",
    backgroundColor: "#FEF2F2",
    outlineColor: "#FFFFFF",
    outlineWidth: 16,
    stickerEdgeEnabled: true,
    stickerEdgeColor: "#FFFFFF",
    stickerEdgeWidth: 18,
    shadowColor: "rgba(244, 114, 182, 0.35)",
    shadowX: 10,
    shadowY: 14,
    shadowBlur: 14,
    letterSpacing: 3,
    depth: 8,
    highlightStrength: 40,
  },
  graffiti: {
    label: "Graffiti Pop",
    textColor: "#A855F7",
    backgroundColor: "#0F172A",
    outlineColor: "#F8FAFC",
    outlineWidth: 14,
    stickerEdgeEnabled: false,
    stickerEdgeColor: "#F8FAFC",
    stickerEdgeWidth: 10,
    shadowColor: "rgba(59, 130, 246, 0.45)",
    shadowX: 14,
    shadowY: 16,
    shadowBlur: 18,
    letterSpacing: 4,
    depth: 18,
    highlightStrength: 24,
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
  const basePreset =
    variant === "graffiti"
      ? "graffiti"
      : variant === "letters"
        ? "sticker"
        : "classic";
  const preset = presetConfigs[basePreset];

  const defaultText =
    variant === "letters"
      ? "Bubble\nLetters"
      : variant === "writing"
        ? "Bubble\nWriting"
        : variant === "graffiti"
          ? "Bubble\nBlast"
          : "Bubble\nMagic";

  return {
    text: defaultText,
    preset: basePreset,
    width: 960,
    height: 540,
    fontSize: variant === "writing" ? 106 : 112,
    lineHeight: 1.02,
    letterSpacing: preset.letterSpacing,
    textColor: preset.textColor,
    backgroundColor: preset.backgroundColor,
    outlineEnabled: true,
    outlineColor: preset.outlineColor,
    outlineWidth: preset.outlineWidth,
    stickerEdgeEnabled: preset.stickerEdgeEnabled,
    stickerEdgeColor: preset.stickerEdgeColor,
    stickerEdgeWidth: preset.stickerEdgeWidth,
    shadowEnabled: true,
    shadowColor: preset.shadowColor,
    shadowX: preset.shadowX,
    shadowY: preset.shadowY,
    shadowBlur: preset.shadowBlur,
    depth: preset.depth,
    highlightStrength: preset.highlightStrength,
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
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);

  return lines.length > 0 ? lines : ["Bubble"];
}

export function BubbleEditor({ pagePath, heading }: BubbleEditorProps) {
  const variant = getVariantForPath(pagePath);
  const [state, setState] = useState(() => getInitialState(variant));
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const filterId = useId().replace(/:/g, "");
  const lines = useMemo(() => buildLines(state.text), [state.text]);

  const lineAdvance = state.fontSize * state.lineHeight;
  const totalHeight = lineAdvance * (lines.length - 1);
  const startY = state.height / 2 - totalHeight / 2;
  const shadowValues = rgbaToFeColor(state.shadowColor);
  const highlightOpacity = clamp(state.highlightStrength / 100, 0, 1) * 0.55;
  const depthSteps = Math.max(0, Math.round(state.depth));
  const depthColor = colorWithOpacity(
    state.preset === "graffiti" ? "#020617" : state.outlineColor,
    state.preset === "graffiti" ? 0.75 : 0.28,
  );

  const applyPreset = (presetKey: PresetKey) => {
    const preset = presetConfigs[presetKey];

    setState((current) => ({
      ...current,
      preset: presetKey,
      textColor: preset.textColor,
      backgroundColor: preset.backgroundColor,
      outlineColor: preset.outlineColor,
      outlineWidth: preset.outlineWidth,
      stickerEdgeEnabled: preset.stickerEdgeEnabled,
      stickerEdgeColor: preset.stickerEdgeColor,
      stickerEdgeWidth: preset.stickerEdgeWidth,
      shadowColor: preset.shadowColor,
      shadowX: preset.shadowX,
      shadowY: preset.shadowY,
      shadowBlur: preset.shadowBlur,
      letterSpacing: preset.letterSpacing,
      depth: preset.depth,
      highlightStrength: preset.highlightStrength,
      outlineEnabled: true,
      shadowEnabled: true,
    }));
  };

  const downloadPng = async () => {
    if (!svgRef.current) {
      return;
    }

    try {
      setDownloadMessage("Preparing PNG...");

      const serializer = new XMLSerializer();
      const svgMarkup = serializer.serializeToString(svgRef.current);
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
      link.download = `${heading.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.click();

      URL.revokeObjectURL(url);
      setDownloadMessage("PNG downloaded.");
    } catch (error) {
      setDownloadMessage(
        error instanceof Error ? error.message : "Failed to export PNG.",
      );
    }
  };

  return (
    <div className="mt-6 grid gap-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">
            Bubble Editor Controls
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            This first version keeps the interaction focused: text, preset,
            canvas, color, outline, sticker edge, 3D depth, highlight,
            shadow, and PNG export.
          </p>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-slate-300">Text</span>
          <textarea
            value={state.text}
            onChange={(event) =>
              setState((current) => ({ ...current, text: event.target.value }))
            }
            rows={4}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-cyan-400"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-300">Style</span>
          <select
            value={state.preset}
            onChange={(event) => applyPreset(event.target.value as PresetKey)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-cyan-400"
          >
            {Object.entries(presetConfigs).map(([key, preset]) => (
              <option key={key} value={key}>
                {preset.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">
              Canvas Width
            </span>
            <input
              type="number"
              min={480}
              max={1600}
              step={20}
              value={state.width}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  width: clamp(Number(event.target.value) || 960, 480, 1600),
                }))
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-cyan-400"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-300">
              Canvas Height
            </span>
            <input
              type="number"
              min={320}
              max={1200}
              step={20}
              value={state.height}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  height: clamp(Number(event.target.value) || 540, 320, 1200),
                }))
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-cyan-400"
            />
          </label>
        </div>

        <label className="block">
          <div className="flex items-center justify-between text-sm font-medium text-slate-300">
            <span>Font Size</span>
            <span>{state.fontSize}px</span>
          </div>
          <input
            type="range"
            min={56}
            max={180}
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

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">
              Text Color
            </span>
            <input
              type="color"
              value={state.textColor}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  textColor: event.target.value,
                }))
              }
              className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-slate-900 p-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-300">
              Background
            </span>
            <input
              type="color"
              value={state.backgroundColor}
              onChange={(event) =>
                setState((current) => ({
                  ...current,
                  backgroundColor: event.target.value,
                }))
              }
              className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-slate-900 p-2"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-300">
              Enable Outline
            </span>
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
              <span className="text-sm font-medium text-slate-300">
                Outline Color
              </span>
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

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-300">
              Enable Sticker Edge
            </span>
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
              <span className="text-sm font-medium text-slate-300">
                Sticker Edge Color
              </span>
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

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-300">
              Enable Shadow
            </span>
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
              <span className="text-sm font-medium text-slate-300">
                Shadow Color
              </span>
              <input
                type="text"
                value={state.shadowColor}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    shadowColor: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition focus:border-cyan-400"
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

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
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

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={downloadPng}
            className="inline-flex items-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Download PNG
          </button>
          <button
            type="button"
            onClick={() => setState(getInitialState(variant))}
            className="inline-flex items-center rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            Reset
          </button>
        </div>

        {downloadMessage ? (
          <p className="text-sm leading-6 text-slate-400">{downloadMessage}</p>
        ) : null}
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/85 p-4 shadow-2xl shadow-black/20">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">
              Live SVG Preview
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              The preview uses inline SVG so the first tool version stays crisp
              and export-friendly.
            </p>
          </div>
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
            {presetConfigs[state.preset].label}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${state.width} ${state.height}`}
            width="100%"
            height="100%"
            role="img"
            aria-label={`${heading} live preview`}
            className="block h-auto w-full"
          >
            <defs>
              <filter
                id={filterId}
                x="-20%"
                y="-20%"
                width="160%"
                height="160%"
              >
                <feDropShadow
                  dx={state.shadowEnabled ? state.shadowX : 0}
                  dy={state.shadowEnabled ? state.shadowY : 0}
                  stdDeviation={state.shadowEnabled ? state.shadowBlur / 2 : 0}
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
            />

            <g filter={`url(#${filterId})`}>
              {lines.map((line, index) => {
                const y = startY + lineAdvance * index;
                const isSticker = state.preset === "sticker";
                const isGraffiti = state.preset === "graffiti";

                return (
                  <g key={`${line}-${index}`}>
                    {isSticker ? (
                      <text
                        x={state.width / 2}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={state.fontSize}
                        fontWeight="900"
                        fontFamily="Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif"
                        fill={state.textColor}
                        stroke="#FFFFFF"
                        strokeWidth={state.outlineEnabled ? state.outlineWidth + 8 : 8}
                        strokeLinejoin="round"
                        paintOrder="stroke fill"
                        letterSpacing={state.letterSpacing}
                      >
                        {line}
                      </text>
                    ) : null}

                    {state.stickerEdgeEnabled && state.stickerEdgeWidth > 0 ? (
                      <text
                        x={state.width / 2}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={state.fontSize}
                        fontWeight="900"
                        fontFamily="Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif"
                        fill={state.textColor}
                        stroke={state.stickerEdgeColor}
                        strokeWidth={state.stickerEdgeWidth}
                        strokeLinejoin="round"
                        paintOrder="stroke fill"
                        letterSpacing={state.letterSpacing}
                        opacity={0.95}
                      >
                        {line}
                      </text>
                    ) : null}

                    {depthSteps > 0
                      ? Array.from({ length: depthSteps }).map((_, depthIndex) => (
                          <text
                            key={`${line}-${index}-depth-${depthIndex}`}
                            x={state.width / 2 + depthIndex * 0.9}
                            y={y + depthIndex * 1.15}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={state.fontSize}
                            fontWeight="900"
                            fontFamily="Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif"
                            fill={depthColor}
                            stroke={
                              state.outlineEnabled
                                ? colorWithOpacity(state.outlineColor, 0.32)
                                : "transparent"
                            }
                            strokeWidth={state.outlineEnabled ? 2 : 0}
                            strokeLinejoin="round"
                            paintOrder="stroke fill"
                            letterSpacing={state.letterSpacing}
                            transform={
                              isGraffiti
                                ? `rotate(-4 ${state.width / 2} ${y})`
                                : undefined
                            }
                          >
                            {line}
                          </text>
                        ))
                      : null}

                    <text
                      x={state.width / 2 - state.fontSize * 0.04}
                      y={y - state.fontSize * 0.08}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={state.fontSize}
                      fontWeight="900"
                      fontFamily="Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif"
                      fill="white"
                      fillOpacity={isGraffiti ? highlightOpacity * 0.7 : highlightOpacity}
                      letterSpacing={state.letterSpacing}
                      transform={
                        isGraffiti ? `skewX(-8) translate(8 0)` : undefined
                      }
                    >
                      {line}
                    </text>

                    <text
                      x={state.width / 2}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={state.fontSize}
                      fontWeight="900"
                      fontFamily="Arial Rounded MT Bold, Trebuchet MS, Arial, sans-serif"
                      fill={state.textColor}
                      stroke={state.outlineEnabled ? state.outlineColor : "transparent"}
                      strokeWidth={state.outlineEnabled ? state.outlineWidth : 0}
                      strokeLinejoin="round"
                      paintOrder="stroke fill"
                      letterSpacing={state.letterSpacing}
                      transform={isGraffiti ? `rotate(-4 ${state.width / 2} ${y})` : undefined}
                    >
                      {line}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

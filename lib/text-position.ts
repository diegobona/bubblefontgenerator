export type TextAlignment = "left" | "center" | "right";
export type Point = { x: number; y: number };
export type TextBounds = Point & { width: number; height: number };
export type TextPlacement = Point & { scale: number };

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/** Bounds include the outline and shadow; coordinates are SVG canvas units. */
export function placeText(
  bounds: TextBounds,
  canvas: { width: number; height: number },
  alignment: TextAlignment,
  dragged: Point | null = null,
): TextPlacement {
  // Preserve every pixel of the existing default centered export.
  if (alignment === "center" && !dragged) return { x: 0, y: 0, scale: 1 };

  const padding = 8;
  // Alignment changes horizontal position only, including for legacy previews
  // whose effects already extend past the canvas vertically.
  if (!dragged) return {
    x: alignment === "left" ? padding - bounds.x : canvas.width - padding - bounds.x - bounds.width,
    y: 0,
    scale: 1,
  };
  const scale = Math.min(1,
    (canvas.width - padding * 2) / Math.max(1, bounds.width),
    (canvas.height - padding * 2) / Math.max(1, bounds.height));
  const minX = padding - bounds.x * scale;
  const maxX = canvas.width - padding - (bounds.x + bounds.width) * scale;
  const minY = padding - bounds.y * scale;
  const maxY = canvas.height - padding - (bounds.y + bounds.height) * scale;
  return {
    scale,
    x: clamp(dragged?.x ?? (alignment === "left" ? minX : maxX), minX, maxX),
    y: clamp(dragged?.y ?? canvas.height * (1 - scale) / 2, minY, maxY),
  };
}

/** SVG xMidYMid/meet letterboxing must not change drag speed on narrow previews. */
export function canvasPoint(
  pointer: Point,
  viewport: TextBounds,
  canvas: { width: number; height: number },
): Point {
  const scale = Math.min(viewport.width / canvas.width, viewport.height / canvas.height);
  return {
    x: (pointer.x - viewport.x - (viewport.width - canvas.width * scale) / 2) / scale,
    y: (pointer.y - viewport.y - (viewport.height - canvas.height * scale) / 2) / scale,
  };
}

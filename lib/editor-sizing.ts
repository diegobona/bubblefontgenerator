export const MIN_CANVAS_HEIGHT = 140;
export const MAX_CANVAS_HEIGHT = 520;

export type AutoHeightInput = {
  currentHeight: number;
  fontSize: number;
  lineHeight: number;
  lineCount: number;
  outlineWidth: number;
  stickerEdgeEnabled: boolean;
  stickerEdgeWidth: number;
  shadowEnabled: boolean;
  shadowBlur: number;
  shadowY: number;
  depth: number;
};

export function getAutoHeightForFontSize(input: AutoHeightInput) {
  const visualPadding = Math.max(
    18,
    input.outlineWidth + 8,
    input.stickerEdgeEnabled ? input.stickerEdgeWidth + 12 : 0,
    input.shadowEnabled ? input.shadowBlur + Math.abs(input.shadowY) + 16 : 0,
    input.depth * 1.05 + 18,
  );
  const textHeight =
    input.fontSize *
    (1 + Math.max(0, input.lineCount - 1) * input.lineHeight);
  const requiredHeight = Math.ceil((textHeight + visualPadding * 2) / 20) * 20;

  return Math.min(
    MAX_CANVAS_HEIGHT,
    Math.max(MIN_CANVAS_HEIGHT, input.currentHeight, requiredHeight),
  );
}

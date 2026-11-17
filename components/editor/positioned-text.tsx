"use client";

import { useLayoutEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { canvasPoint, placeText, type Point, type TextAlignment, type TextBounds, type TextPlacement } from "@/lib/text-position";

type Props = {
  width: number;
  height: number;
  alignment: TextAlignment;
  alignmentRevision: number;
  strokePadding: number;
  shadow: { x: number; y: number; blur: number };
  font: string;
  positionRef: (sync: (() => void) | null) => void;
  children: ReactNode;
};

export function PositionedText({ width, height, alignment, alignmentRevision, strokePadding, shadow, font, positionRef, children }: Props) {
  const outerRef = useRef<SVGGElement>(null);
  const contentRef = useRef<SVGGElement>(null);
  const hitRef = useRef<SVGRectElement>(null);
  const manualPosition = useRef<Point | null>(null);
  const appliedRevision = useRef(alignmentRevision);
  const placement = useRef<TextPlacement>({ x: 0, y: 0, scale: 1 });
  const drag = useRef<{ id: number; start: Point; origin: Point } | null>(null);

  function measure(): TextBounds | null {
    const box = contentRef.current?.getBBox();
    if (!box || !box.width || !box.height) return null;
    // getBBox includes rotated/skewed glyphs and 3D layers, but not strokes/filters.
    // Four standard deviations leave the visible shadow inside the canvas.
    const blur = shadow.blur * 2;
    const left = strokePadding + Math.max(0, blur - shadow.x);
    const right = strokePadding + Math.max(0, blur + shadow.x);
    const top = strokePadding + Math.max(0, blur - shadow.y);
    const bottom = strokePadding + Math.max(0, blur + shadow.y);
    return { x: box.x - left, y: box.y - top, width: box.width + left + right, height: box.height + top + bottom };
  }

  function syncPosition() {
    if (appliedRevision.current !== alignmentRevision) {
      manualPosition.current = null;
      drag.current = null;
      appliedRevision.current = alignmentRevision;
    }
    const bounds = measure();
    if (!bounds) return;
    const next = placeText(bounds, { width, height }, alignment, manualPosition.current);
    placement.current = next;
    if (manualPosition.current) manualPosition.current = { x: next.x, y: next.y };
    outerRef.current?.setAttribute("transform", `translate(${next.x} ${next.y}) scale(${next.scale})`);
    for (const [name, value] of Object.entries(bounds)) hitRef.current?.setAttribute(name, String(value));
  }

  // Synchronize after layout and again after web fonts load. The exporter invokes
  // this same function before cloning the SVG, so it never uses fallback metrics.
  useLayoutEffect(() => {
    let active = true;
    syncPosition();
    positionRef(syncPosition);
    void document.fonts.load(font).then(() => { if (active) syncPosition(); }).catch(() => { if (active) syncPosition(); });
    return () => { active = false; positionRef(null); };
  });

  function point(event: PointerEvent<SVGGElement>) {
    const rect = event.currentTarget.ownerSVGElement!.getBoundingClientRect();
    return canvasPoint({ x: event.clientX, y: event.clientY }, rect, { width, height });
  }

  function startDrag(event: PointerEvent<SVGGElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    const previous = placement.current;
    manualPosition.current = { x: previous.x, y: previous.y };
    syncPosition();
    const bounds = measure();
    if (bounds && previous.scale !== placement.current.scale) {
      // Keep the text's center under the pointer when an oversized legacy
      // preview needs to fit inside the canvas before it can be dragged.
      const difference = previous.scale - placement.current.scale;
      manualPosition.current = {
        x: previous.x + difference * (bounds.x + bounds.width / 2),
        y: previous.y + difference * (bounds.y + bounds.height / 2),
      };
      syncPosition();
    }
    drag.current = { id: event.pointerId, start: point(event), origin: { ...placement.current } };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
  }

  function moveDrag(event: PointerEvent<SVGGElement>) {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const next = point(event);
    manualPosition.current = { x: current.origin.x + next.x - current.start.x, y: current.origin.y + next.y - current.start.y };
    syncPosition();
  }

  function stopDrag(event: PointerEvent<SVGGElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grab";
  }

  return <g ref={outerRef} data-text-position="true" style={{ cursor: "grab", touchAction: "none", userSelect: "none" }}
    onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag}
    onPointerCancel={stopDrag} onLostPointerCapture={stopDrag}>
    <title>Drag to move text within the canvas</title>
    <rect ref={hitRef} fill="transparent" data-drag-hit-area="true" />
    <g ref={contentRef}>{children}</g>
  </g>;
}

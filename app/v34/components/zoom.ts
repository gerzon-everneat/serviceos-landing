import type { PointerEvent } from "react";

/* Pointer-follow zoom for the demo videos: hovering magnifies the recording
   around the cursor, so the forms inside the footage become readable.
   Handlers set CSS vars on the container; the <video> reads them via
   zoomVideoClass. Mouse only — touch keeps the plain player. */

export function zoomHandlers(scale = 2.1) {
  return {
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (e.pointerType !== "mouse") return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--zx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
      el.style.setProperty("--zy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
      el.style.setProperty("--zs", String(scale));
    },
    onPointerLeave(e: PointerEvent<HTMLElement>) {
      e.currentTarget.style.setProperty("--zs", "1");
    },
  };
}

/* For the <video> inside a zoomHandlers container. transform-origin tracks the
   cursor with a soft transition, so moving while zoomed pans the recording. */
export const zoomVideoClass =
  "[transform:scale(var(--zs,1))] [transform-origin:var(--zx,50%)_var(--zy,50%)] transition-[transform,transform-origin] duration-300 ease-out will-change-transform";

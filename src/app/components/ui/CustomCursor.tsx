"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — outlined circle that smoothly follows the mouse with
 * `mix-blend-mode: difference`. Desktop only. Hidden on touch devices and
 * when the user prefers reduced motion.
 *
 * Inspired by panicstudio.tv. Adapted to RDMD: smaller, neutral,
 * no color (the difference blend handles tone shifts on its own).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || reducedMotion) return;
    setEnabled(true);

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Dot snaps to cursor instantly
      dot.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
    };

    const tick = () => {
      // Lerp for smooth ring follow (snappy enough to feel responsive)
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };
    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    // Hover state on interactive elements — ring expands
    const onPointerOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [role=button], input, textarea, select");
      ring.dataset.hover = interactive ? "true" : "false";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerover", onPointerOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerover", onPointerOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-white opacity-0 transition-[width,height,opacity,border-color] duration-200 ease-out data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:border-2"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white opacity-0"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** How long each frame holds before the cross-fade to the next begins. */
const HOLD_MS = 7000;
/** The cross-fade itself — slow, so it reads as a change of ground, not a swipe. */
const FADE_MS = 1600;

/**
 * The hero photograph, or a slow cross-fade through several of them.
 *
 * With one frame this is a plain still. With two or more it advances on a
 * timer, fading rather than sliding — a slide or a zoom would turn the ground
 * into a moving picture, which is exactly what the ink wash over it is there to
 * prevent. The rotation stops entirely under `prefers-reduced-motion` and while
 * the tab is hidden.
 */
export function HeroBackdrop({
  slides,
  alt,
}: {
  slides: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((i) => (i + 1) % slides.length);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <>
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i === 0 ? undefined : true}
          fill
          priority={i < 2}
          sizes="100vw"
          style={{ transitionDuration: `${FADE_MS}ms` }}
          className={cn(
            "object-cover grayscale-[0.3] transition-opacity ease-linear motion-reduce:transition-none",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </>
  );
}

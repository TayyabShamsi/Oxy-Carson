"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The signature bar (see §Signature in globals.css).
 *
 * Solid black, full-bleed, four weights. It draws itself across from the left
 * when it enters view — narrative speed, because a bar is watched rather than
 * operated. Origin-aware: it grows from the edge it belongs to.
 *
 * Weights are semantic, not decorative:
 *   lg  — a major transition. At most twice on a page.
 *   md  — a section boundary.
 *   sm  — a subdivision inside a section.
 *   xs  — a rule under a heading.
 *   hair — the quietest divider; grey, not black.
 */
export default function Bar({
  weight = "sm",
  className = "",
  animate = true,
  bleed = false,
  delay = 0,
}: {
  weight?: "hair" | "xs" | "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
  bleed?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div
      ref={ref}
      className={[
        "bar",
        `bar-${weight}`,
        bleed ? "bleed" : "",
        animate ? "bar-anim" : "",
        seen ? "is-in" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    />
  );
}

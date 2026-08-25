"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The signature hairline (see §Signature in globals.css).
 *
 * Draws itself outward from the centre when it enters view, then the bronze
 * tick fades in on top. It is the one piece of ornament in the system, so it
 * gets the one piece of ornamental motion.
 */
export default function Rule({
  plain = false,
  className = "",
  animate = true,
}: {
  plain?: boolean;
  className?: string;
  animate?: boolean;
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
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div
      ref={ref}
      className={[
        "rule",
        plain ? "rule-plain" : "",
        animate ? "rule-anim" : "",
        seen ? "is-in" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

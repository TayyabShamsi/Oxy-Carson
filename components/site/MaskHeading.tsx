"use client";

import { useEffect, useState } from "react";

/**
 * The headline reveal: each line rides up from behind a clipped edge.
 * Runs once, on mount, after first paint — this is the hero, so it should not
 * wait for a scroll.
 */
export default function MaskHeading({
  lines,
  className = "",
  baseDelay = 120,
  step = 110,
  as: Tag = "h1",
}: {
  lines: string[];
  className?: string;
  baseDelay?: number;
  step?: number;
  as?: "h1" | "h2" | "p";
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={line + i}
          className={`line-mask ${started ? "is-in" : ""}`}
          style={{ ["--reveal-delay" as string]: `${baseDelay + i * step}ms` }}
        >
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

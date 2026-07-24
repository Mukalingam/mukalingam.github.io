"use client";

import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEF0123456789";

export default function TextScramble({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let raf = 0;
    let frame = 0;
    const timer = setTimeout(() => {
      const tick = () => {
        frame++;
        const revealed = frame / 4; // reveal speed: 1 char per 4 frames
        if (revealed >= text.length) {
          setOut(text);
          return;
        }
        setOut(
          text
            .split("")
            .map((c, i) =>
              c === " " || i < revealed
                ? c
                : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join("")
        );
        raf = requestAnimationFrame(tick);
      };
      tick();
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return <span className={className}>{out || " "}</span>;
}

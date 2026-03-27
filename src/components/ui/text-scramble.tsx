import { useEffect, useRef, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!";

interface TextScrambleProps {
  text: string;
  trigger?: boolean;
  speed?: number;
  className?: string;
}

export const TextScramble = ({
  text,
  trigger = true,
  speed = 2,
  className,
}: TextScrambleProps) => {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number>(0);
  const frame = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(raf.current);

    if (!trigger) {
      setDisplay(text);
      return;
    }

    frame.current = 0;
    const total = Math.ceil(text.length * speed);

    const tick = () => {
      frame.current++;
      const pct = frame.current / total;

      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "," || ch === "." || ch === "&") return ch;
          if (i / text.length < pct) return ch;
          return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        })
        .join("");

      setDisplay(next);

      if (frame.current < total) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, trigger, speed]);

  return <span className={className}>{display}</span>;
};

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
  LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
  RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
};

const highlightGreen =
  "radial-gradient(75% 181% at 50% 50%, hsl(155 83% 55%) 0%, rgba(255,255,255,0) 100%)";

const dirs: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

export function HoverBorderGradient({
  children,
  as: Element = "button",
  className = "",
  containerClassName = "",
  duration = 1.8,
  clockwise = true,
  innerBg = "hsl(170 35% 8%)",
  highlight = highlightGreen,
  ...props
}: React.PropsWithChildren<{
  as?: React.ElementType;
  className?: string;
  containerClassName?: string;
  duration?: number;
  clockwise?: boolean;
  innerBg?: string;
  highlight?: string;
} & React.HTMLAttributes<HTMLElement>>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("BOTTOM");

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => {
      setDirection((prev) => {
        const idx = dirs.indexOf(prev);
        return dirs[clockwise ? (idx - 1 + 4) % 4 : (idx + 1) % 4];
      });
    }, duration * 1000);
    return () => clearInterval(id);
  }, [hovered, duration, clockwise]);

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex h-min w-fit items-center justify-center overflow-visible rounded-full p-px transition duration-500 ${containerClassName}`}
      {...props}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden rounded-full"
        style={{ filter: "blur(2px)", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration }}
      />
      {/* Inner fill */}
      <div
        className="absolute inset-0.5 z-[1] rounded-full"
        style={{ backgroundColor: innerBg }}
      />
      {/* Content */}
      <div className={`relative z-10 flex items-center rounded-full ${className}`}>
        {children}
      </div>
    </Element>
  );
}

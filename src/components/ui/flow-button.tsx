import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface FlowButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const FlowButton = ({ href, onClick, children, className = "" }: FlowButtonProps) => {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      className={`flow-button-wrapper relative inline-flex ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover="hovered"
      initial="idle"
    >
      <Tag
        // @ts-ignore
        ref={ref}
        href={href}
        onClick={onClick}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className="flow-button group relative flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-semibold text-white text-sm select-none outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        style={{
          background: "linear-gradient(135deg, hsl(155 83% 28%) 0%, hsl(155 83% 22%) 100%)",
          boxShadow: "0 6px 24px -6px hsl(155 83% 30% / 0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Circle expand fill */}
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ transformOrigin: "center" }}
          variants={{
            idle: { scale: 0, opacity: 0 },
            hovered: { scale: 2.5, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{ background: "hsl(155 83% 35%)" }}
          />
        </motion.span>

        {/* Arrow icon — slides in from left */}
        <span className="relative z-10 flex items-center gap-3">
          <motion.span
            variants={{
              idle: { x: -20, opacity: 0, width: 0 },
              hovered: { x: 0, opacity: 1, width: "auto" },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="flex items-center overflow-hidden"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.span>
          <span>{children}</span>
        </span>
      </Tag>
    </motion.div>
  );
};

export default FlowButton;

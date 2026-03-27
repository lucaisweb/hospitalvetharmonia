import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

const WordReveal = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.1,
  once = false,
}: WordRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.4 });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 32, filter: "blur(10px)" }
            }
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 16,
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default WordReveal;

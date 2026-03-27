import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import simboloHarmonia from "@/assets/simbolo-harmonia.png";
import logoFull from "@/assets/logo-full.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const minPassedRef = useRef(false);
  const windowLoadedRef = useRef(false);

  // Tenta sair quando AMBOS: tempo mínimo passou E window.load disparou
  const tryComplete = () => {
    if (minPassedRef.current && windowLoadedRef.current) {
      setDone(true);
      setTimeout(onComplete, 750); // aguarda animação de saída
    }
  };

  useEffect(() => {
    // Barra de progresso animada (curva ease-out, 2.2s)
    const DURATION = 2200;
    const TICK = 30;
    const steps = DURATION / TICK;
    let step = 0;
    const ticker = setInterval(() => {
      step++;
      const t = step / steps;
      setProgress(Math.min((1 - Math.pow(1 - t, 2.5)) * 100, 97)); // para em 97% até window load
      if (step >= steps) {
        clearInterval(ticker);
        minPassedRef.current = true;
        tryComplete();
      }
    }, TICK);

    // window.load — dispara quando imagens e assets terminam
    if (document.readyState === "complete") {
      windowLoadedRef.current = true;
    } else {
      const onLoad = () => {
        windowLoadedRef.current = true;
        setProgress(100);
        tryComplete();
      };
      window.addEventListener("load", onLoad);
      return () => {
        clearInterval(ticker);
        window.removeEventListener("load", onLoad);
      };
    }

    return () => clearInterval(ticker);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "hsl(170 35% 8%)" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(155 83% 20% / 0.25) 0%, transparent 70%)",
            }}
          />

          {/* Symbol + rings */}
          <motion.div
            className="relative flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Pulsing ring 1 */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: 120, height: 120, border: "1px solid hsl(155 83% 40% / 0.35)" }}
              animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
            />
            {/* Pulsing ring 2 */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: 120, height: 120, border: "1px solid hsl(155 83% 40% / 0.2)" }}
              animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.45 }}
            />

            {/* Symbol rotating */}
            <motion.img
              src={simboloHarmonia}
              alt=""
              style={{
                width: 88,
                height: 88,
                objectFit: "contain",
                filter:
                  "brightness(0) saturate(100%) invert(56%) sepia(60%) saturate(400%) hue-rotate(101deg) brightness(110%)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
          </motion.div>

          {/* Logo */}
          <motion.img
            src={logoFull}
            alt="Hospital Veterinário Harmonia"
            className="brightness-0 invert mb-10"
            style={{ height: 22, opacity: 0.55 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          />

          {/* Progress bar */}
          <motion.div
            className="rounded-full overflow-hidden"
            style={{ width: 160, height: 2, backgroundColor: "rgba(255,255,255,0.07)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, hsl(155 83% 35%) 0%, hsl(155 83% 55%) 100%)",
                transition: "width 0.12s ease-out",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

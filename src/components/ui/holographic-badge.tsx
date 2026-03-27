import { useRef, useEffect } from "react";

interface HolographicBadgeProps {
  src: string;
  alt?: string;
  className?: string;
}

const HolographicBadge = ({ src, alt = "", className = "" }: HolographicBadgeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    let currentRx = 0;
    let currentRy = 0;
    const target = { rx: 0, ry: 0 };
    let isHovered = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentRx = lerp(currentRx, target.rx, 0.08);
      currentRy = lerp(currentRy, target.ry, 0.08);

      const rx = currentRx;
      const ry = currentRy;
      const rad = Math.PI / 180;
      const cosX = Math.cos(rx * rad);
      const sinX = Math.sin(rx * rad);
      const cosY = Math.cos(-ry * rad);
      const sinY = Math.sin(-ry * rad);

      const matrix = [
        cosY,          0,      sinY,       0,
        sinX * sinY,   cosX,  -sinX * cosY, 0,
       -cosX * sinY,   sinX,   cosX * cosY, 0,
        0,             0,      0,           1,
      ];
      el.style.transform = `perspective(800px) matrix3d(${matrix.join(",")})`;

      // Golden shine follows tilt
      const magnitude = Math.sqrt(rx * rx + ry * ry);
      const shineOpacity = Math.min(magnitude / 12, 1) * (isHovered ? 1 : 0.85);

      if (shineRef.current) {
        const px = 50 + ry * 3.5;
        const py = 50 - rx * 3.5;
        shineRef.current.style.backgroundPosition = `${px}% ${py}%`;
        shineRef.current.style.opacity = String(shineOpacity);
      }
      if (glowRef.current) {
        const gx = 50 + ry * 4;
        const gy = 50 - rx * 4;
        glowRef.current.style.backgroundPosition = `${gx}% ${gy}%`;
        glowRef.current.style.opacity = String(shineOpacity * 0.6);
      }

      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.rx = ((e.clientY - cy) / (rect.height / 2)) * -20;
      target.ry = ((e.clientX - cx) / (rect.width / 2)) * 20;
    };
    const onEnter = () => { isHovered = true; };
    const onLeave = () => {
      isHovered = false;
      target.rx = 0;
      target.ry = 0;
    };

    // Auto-shine every 5s: sweeps tilt then returns
    const runAutoShine = () => {
      if (isHovered) return;
      const startTime = Date.now();
      const duration = 1800;
      const tick = () => {
        const t = Math.min((Date.now() - startTime) / duration, 1);
        const wave = Math.sin(t * Math.PI);
        target.rx = wave * -12;
        target.ry = wave * 16;
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          target.rx = 0;
          target.ry = 0;
        }
      };
      tick();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);
    const interval = setInterval(runAutoShine, 5000);
    // First shine after 1.2s
    const initialTimeout = setTimeout(runAutoShine, 1200);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none cursor-pointer ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Badge image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain block rounded-3xl"
        style={{
          filter: "drop-shadow(0 8px 48px hsla(43, 70%, 50%, 0.35)) drop-shadow(0 2px 12px rgba(0,0,0,0.3))",
          borderRadius: "1.5rem",
        }}
        draggable={false}
      />

      {/* Golden shimmer overlay */}
      <div
        ref={shineRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 15%, rgba(255, 218, 100, 0.45) 33%, rgba(255, 248, 200, 0.9) 50%, rgba(255, 218, 100, 0.45) 67%, transparent 85%)",
          backgroundSize: "400% 400%",
          backgroundPosition: "50% 50%",
          mixBlendMode: "overlay",
          opacity: 0,
          borderRadius: "1.5rem",
          transition: "opacity 0.1s ease",
        }}
      />

      {/* Soft golden glow spot */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255, 230, 120, 0.55) 0%, rgba(255, 200, 60, 0.2) 35%, transparent 65%)",
          backgroundSize: "300% 300%",
          backgroundPosition: "50% 50%",
          mixBlendMode: "screen",
          opacity: 0,
          borderRadius: "1.5rem",
          transition: "opacity 0.1s ease",
        }}
      />
    </div>
  );
};

export default HolographicBadge;

interface WaveDividerProps {
  from?: string;
  to?: string;
  flip?: boolean;
}

const WaveDivider = ({ from = "hsl(var(--background))", to = "hsl(var(--background))", flip = false }: WaveDividerProps) => {
  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} style={{ marginTop: "-1px", marginBottom: "-1px" }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] lg:h-[100px] block"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={to}
        />
        <rect width="1440" height="120" fill={from} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} opacity="0" />
      </svg>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${from}, transparent 30%)` }} />
    </div>
  );
};

export default WaveDivider;

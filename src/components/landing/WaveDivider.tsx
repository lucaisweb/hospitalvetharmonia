interface WaveDividerProps {
  fillColor?: string;
  bgColor?: string;
  flip?: boolean;
}

const WaveDivider = ({ fillColor = "hsl(var(--background))", bgColor = "transparent", flip = false }: WaveDividerProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
      style={{ backgroundColor: bgColor, marginTop: "-2px", marginBottom: "-2px" }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[50px] md:h-[70px] lg:h-[90px] block"
      >
        <path
          d="M0,40 C180,90 360,0 540,50 C720,100 900,10 1080,50 C1200,75 1350,20 1440,40 L1440,100 L0,100 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
}

const WaveDivider = ({ topColor, bottomColor, flip = false }: WaveDividerProps) => {
  return (
    <div className="relative w-full overflow-hidden leading-[0]" style={{ backgroundColor: bottomColor, marginTop: "-1px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] md:h-[80px] lg:h-[120px]"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      >
        <path
          d="M0,0 L1440,0 L1440,40 C1200,110 960,20 720,60 C480,100 240,30 0,70 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  variant?: 1 | 2 | 3;
}

const paths = {
  1: "M0,40 C180,90 360,0 540,50 C720,100 900,10 1080,50 C1200,75 1350,20 1440,40 L1440,0 L0,0 Z",
  2: "M0,60 C240,10 480,90 720,40 C960,0 1200,80 1440,30 L1440,0 L0,0 Z",
  3: "M0,50 C360,100 720,0 1080,60 C1260,85 1380,30 1440,50 L1440,0 L0,0 Z",
};

const WaveDivider = ({ topColor, bottomColor, variant = 1 }: WaveDividerProps) => {
  return (
    <div className="relative w-full overflow-hidden leading-[0]" style={{ backgroundColor: bottomColor, marginTop: "-1px" }}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[50px] md:h-[70px] lg:h-[90px] block"
      >
        <path d={paths[variant]} fill={topColor} />
      </svg>
    </div>
  );
};

export default WaveDivider;

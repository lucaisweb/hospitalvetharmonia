import React, { MouseEvent, useEffect, useRef, useState } from "react";

interface PrideBadgeProps {
  imageSrc: string;
  alt?: string;
  size?: number;
}

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1";

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;

export const PrideBadge = ({ imageSrc, alt = "", size = 280 }: PrideBadgeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0);
  const [matrix, setMatrix] = useState(identityMatrix);
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false);
  const enterTimeout = useRef<NodeJS.Timeout>(null);
  const leaveTimeout1 = useRef<NodeJS.Timeout>(null);
  const leaveTimeout2 = useRef<NodeJS.Timeout>(null);
  const leaveTimeout3 = useRef<NodeJS.Timeout>(null);

  const getDimensions = () => {
    const rect = ref?.current?.getBoundingClientRect();
    return {
      left: rect?.left || 0,
      right: rect?.right || 0,
      top: rect?.top || 0,
      bottom: rect?.bottom || 0,
    };
  };

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xCenter - clientX) / (xCenter - left),
      maxScale - (maxScale - minScale) * Math.abs(yCenter - clientY) / (yCenter - top),
      maxScale - (maxScale - minScale) * (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) / (xCenter - left + yCenter - top),
    ];

    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left),
      x3: 0,
      y0: 0,
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom),
      z3: 0,
    };

    return `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`;
  };

  const getOppositeMatrix = (_matrix: string, clientY: number, onMouseEnter?: boolean) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onMouseEnter ? 0.7 : 4;
    const multiplier = onMouseEnter ? -1 : 1;

    return _matrix.split(", ").map((item, index) => {
      if (index === 2 || index === 4 || index === 8) {
        return -parseFloat(item) * multiplier / weakening;
      } else if (index === 0 || index === 5 || index === 10) {
        return "1";
      } else if (index === 6) {
        return multiplier * (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening;
      } else if (index === 9) {
        return (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / (top - bottom)) / weakening;
      }
      return item;
    }).join(", ");
  };

  const onMouseEnterHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current);
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current);
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current);
    setDisableOverlayAnimation(true);

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5);
      });
    });

    const mat = getMatrix(e.clientX, e.clientY);
    const oppositeMatrix = getOppositeMatrix(mat, e.clientY, true);
    setMatrix(oppositeMatrix);
    setIsTimeoutFinished(false);
    setTimeout(() => setIsTimeoutFinished(true), 200);
  };

  const onMouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setTimeout(() => setFirstOverlayPosition((Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5), 150);

    if (isTimeoutFinished) {
      setCurrentMatrix(getMatrix(e.clientX, e.clientY));
    }
  };

  const onMouseLeaveHandler = (e: MouseEvent<HTMLDivElement>) => {
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY);
    if (enterTimeout.current) clearTimeout(enterTimeout.current);

    setCurrentMatrix(oppositeMatrix);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false);
        leaveTimeout1.current = setTimeout(() => setFirstOverlayPosition(-firstOverlayPosition / 4), 150);
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false);
          setDisableInOutOverlayAnimation(true);
        }, 500);
      });
    });
  };

  useEffect(() => {
    if (isTimeoutFinished) {
      setMatrix(currentMatrix);
    }
  }, [currentMatrix, isTimeoutFinished]);

  const overlayAnimations = [...Array(10).keys()].map((i) =>
    `@keyframes prideBadgeOverlay${i + 1} {
      0% { transform: rotate(${i * 10}deg); }
      50% { transform: rotate(${(i + 1) * 10}deg); }
      100% { transform: rotate(${i * 10}deg); }
    }`
  ).join(" ");

  return (
    <>
      <style>{overlayAnimations}</style>
      <div
        ref={ref}
        onMouseEnter={onMouseEnterHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseLeave={onMouseLeaveHandler}
        style={{
          display: "inline-block",
          perspective: "800px",
          cursor: "default",
        }}
      >
        <div
          style={{
            width: `${size}px`,
            height: `${size * 0.75}px`,
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            transform: `matrix3d(${matrix})`,
            transition: "transform 0.3s ease",
          }}
        >
          <img
            src={imageSrc}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            draggable={false}
          />

          {/* Overlay shine effects */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
              borderRadius: "16px",
            }}
          >
            {[...Array(10).keys()].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "200%",
                  height: "4px",
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.35) 50%, transparent 100%)",
                  transformOrigin: "center",
                  transform: `rotate(${i * 10}deg) translateX(${firstOverlayPosition}px)`,
                  transition: disableInOutOverlayAnimation
                    ? disableOverlayAnimation ? "none" : "transform 0.3s ease"
                    : "transform 0.35s ease",
                  animation: disableOverlayAnimation
                    ? `prideBadgeOverlay${i + 1} 3s ease-in-out infinite`
                    : "none",
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

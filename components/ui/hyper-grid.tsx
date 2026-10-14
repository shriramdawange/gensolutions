"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
  type MotionValue,
} from "framer-motion";

// --- Configuration & Constants ---
const PHYSICS = {
  slow: { damping: 40, stiffness: 150, mass: 1.2 },
  cursor: { damping: 25, stiffness: 250, mass: 0.5 },
  warp: { damping: 15, stiffness: 300, mass: 0.2 },
};

const NOISE_Texture = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;

interface MovingGridProps {
  gridSize?: number;
  scrollSpeed?: number;
  maskRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

const MovingGrid: React.FC<MovingGridProps> = ({
  gridSize = 100,
  scrollSpeed = 0.4,
  maskRadius = 400,
  className = "",
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ w: 1920, h: 1080 });

  const gridX = useMotionValue(0);
  const gridY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    prevMouseX.current = window.innerWidth / 2;
    prevMouseY.current = window.innerHeight / 2;
    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mouseX, mouseY]);

  const warpSignal = useSpring(0, PHYSICS.warp);
  const lagX = useSpring(mouseX, PHYSICS.cursor);
  const lagY = useSpring(mouseY, PHYSICS.cursor);
  const sprungVelX = useSpring(velocityX, PHYSICS.slow);
  const sprungVelY = useSpring(velocityY, PHYSICS.slow);

  const rotateXBase = useTransform(mouseY, [0, windowSize.h], [8, -8]);
  const rotateYBase = useTransform(mouseX, [0, windowSize.w], [-8, 8]);

  const finalRotateX = useTransform(
    [rotateXBase, warpSignal],
    ([r, w]) => (r as number) * (1 + (w as number) * 2)
  );
  const finalRotateY = useTransform(
    [rotateYBase, warpSignal],
    ([r, w]) => (r as number) * (1 + (w as number) * 2)
  );

  const sprungRotateX = useSpring(finalRotateX, PHYSICS.slow);
  const sprungRotateY = useSpring(finalRotateY, PHYSICS.slow);

  const gridScale = useTransform(warpSignal, [0, 1], [1, 1]);
  const gridScaleX = useSpring(gridScale, PHYSICS.slow);
  const gridScaleY = useSpring(gridScale, PHYSICS.slow);
  const animatedGridSize = useTransform(
    warpSignal,
    [0, 1],
    [gridSize, gridSize * 0.8]
  );
  const contentScale = useTransform(warpSignal, [0, 1], [1, 0.92]);

  // Hoisted (fix: no hooks inside JSX props)
  const hueRotate = useTransform(warpSignal, [0, 1], [0, 40]);
  const saturateVal = useTransform(warpSignal, [0, 1], [1, 1.5]);
  const orbFilter = useMotionTemplate`hue-rotate(${hueRotate}deg) saturate(${saturateVal})`;
  const flashOpacity = useTransform(warpSignal, [0, 0.1, 1], [0, 0.4, 0]);
  const dodgeOpacity = useTransform(warpSignal, [0, 0.2, 0.8], [0, 0.3, 0]);

  const maskIntensity = useTransform(warpSignal, [0, 1], [0, 200]);
  const currentMaskRadius = useTransform(
    warpSignal,
    [0, 1],
    [maskRadius, maskRadius * 1.5]
  );
  const maskImage = useMotionTemplate`radial-gradient(${currentMaskRadius}px circle at ${lagX}px ${lagY}px, rgb(${maskIntensity},${maskIntensity},${maskIntensity}), transparent)`;

  useAnimationFrame((_, delta) => {
    const safeDelta = Math.min(delta, 100);
    const vx = sprungVelX.get();
    const vy = sprungVelY.get();
    const normalizedVX = Math.max(-2, Math.min(2, vx / 100));
    const normalizedVY = Math.max(-2, Math.min(2, vy / 100));
    const currentWarp = warpSignal.get();
    const speedMultiplier = 1 + currentWarp * 24;
    const baseForwardDrift = -0.3 * speedMultiplier;
    const cellSize = animatedGridSize.get();
    const moveX =
      normalizedVX * scrollSpeed * speedMultiplier * (safeDelta / 16);
    const moveY =
      (normalizedVY + baseForwardDrift) *
      scrollSpeed *
      speedMultiplier *
      (safeDelta / 16);
    gridX.set((gridX.get() + moveX) % cellSize);
    gridY.set((gridY.get() + moveY) % cellSize);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const dx = clientX - prevMouseX.current;
    const dy = clientY - prevMouseY.current;
    velocityX.set(dx);
    velocityY.set(dy);
    mouseX.set(clientX);
    mouseY.set(clientY);
    prevMouseX.current = clientX;
    prevMouseY.current = clientY;
  };

  const handleWarpClick = () => {
    if (isWarping) return;
    setIsWarping(true);
    setClickCount((p) => p + 1);
    warpSignal.set(1);
    setTimeout(() => {
      warpSignal.set(0);
      setIsWarping(false);
    }, 2000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const gridIntroVariants: Variants = {
    hidden: { scale: 0.01, opacity: 0, rotateZ: 45 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateZ: 0,
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate={isMounted ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ perspective: 1200 }}
      className={`relative w-full min-h-screen overflow-hidden bg-[#050505] flex flex-col items-center justify-center font-sans ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_Texture}")`,
          backgroundRepeat: "repeat",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-50 transition-colors duration-700 pointer-events-none"
        style={{ filter: orbFilter }}
        aria-hidden="true"
      >
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#b7ff5a]/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#6ef4d2]/10 rounded-full blur-[150px] animate-pulse-slow animation-delay-2000" />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none will-change-transform z-10"
        variants={gridIntroVariants}
        style={{
          rotateX: sprungRotateX,
          rotateY: sprungRotateY,
          scaleX: gridScaleX,
          scaleY: gridScaleY,
          transformOrigin: "center bottom",
        }}
        aria-hidden="true"
      >
        <GridLayer
          gridSize={animatedGridSize}
          x={gridX}
          y={gridY}
          strokeColor="rgba(183,255,90,0.07)"
        />
        <motion.div
          className="absolute inset-0"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <GridLayer
            gridSize={animatedGridSize}
            x={gridX}
            y={gridY}
            strokeColor="rgba(183,255,90,0.28)"
            strokeWidth={1}
          />
          <motion.div style={{ opacity: warpSignal }}>
            <GridLayer
              gridSize={animatedGridSize}
              x={gridX}
              y={gridY}
              strokeColor="rgba(110,244,210,0.85)"
              strokeWidth={2}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-30 pointer-events-none bg-[#b7ff5a] mix-blend-overlay"
        style={{ opacity: flashOpacity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none bg-[#6ef4d2] mix-blend-color-dodge"
        style={{ opacity: dodgeOpacity }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-40 text-center px-4 max-w-5xl mx-auto space-y-8 pointer-events-auto w-full"
        style={{ scale: contentScale }}
      >
        {children ? (
          children
        ) : (
          <DefaultContent
            itemVariants={itemVariants}
            handleWarpClick={handleWarpClick}
            clickCount={clickCount}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default MovingGrid;

const DefaultContent: React.FC<{
  itemVariants: Variants;
  handleWarpClick: () => void;
  clickCount: number;
}> = ({ itemVariants, handleWarpClick, clickCount }) => (
  <>
    <motion.div variants={itemVariants} className="flex flex-col items-center">
      <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b7ff5a] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b7ff5a]"></span>
        </span>
        <span className="text-xs font-semibold text-[#d8ffab] tracking-wider uppercase">
          System Online
        </span>
      </div>
      <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600 drop-shadow-2xl pb-2">
        HyperGrid.
      </h1>
    </motion.div>
    <motion.p
      variants={itemVariants}
      className="text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
    >
      Next-generation interface dynamics with warp-speed interactions and fluid
      spatial awareness.
    </motion.p>
    <motion.div variants={itemVariants} className="pt-12">
      <button onClick={handleWarpClick} className="group relative inline-flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b7ff5a] to-[#6ef4d2] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-110" />
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-10 py-5 bg-neutral-950/70 border border-white/20 rounded-full backdrop-blur-xl overflow-hidden flex items-center gap-3 shadow-2xl"
        >
          <span className="relative z-10 text-white font-semibold text-xl tracking-tight">
            Engage Warp Drive
          </span>
          <svg className="w-6 h-6 text-[#b7ff5a] group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
        </motion.div>
      </button>
      <motion.p animate={{ opacity: clickCount > 0 ? 1 : 0 }} className="mt-6 text-sm text-neutral-600 font-mono uppercase tracking-widest">
        Jumps Initiated: <span className="text-[#b7ff5a]">{clickCount}</span>
      </motion.p>
    </motion.div>
  </>
);

interface GridLayerProps {
  gridSize: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  strokeColor: string;
  strokeWidth?: number;
}

const MotionPattern = motion.pattern;
const MotionPath = motion.path;

const GridLayer: React.FC<GridLayerProps> = React.memo(
  ({ gridSize, x, y, strokeColor, strokeWidth = 1 }) => {
    const patternId = React.useId();
    const pathD = useTransform(gridSize, (s) => `M ${s} 0 L 0 0 0 ${s}`);
    return (
      <div className="absolute inset-0 h-full w-full pointer-events-none select-none">
        <svg className="w-full h-full bg-transparent">
          <defs>
            <MotionPattern
              id={patternId}
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
              x={x}
              y={y}
            >
              <MotionPath
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                shapeRendering="geometricPrecision"
              />
            </MotionPattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>
    );
  }
);

GridLayer.displayName = "GridLayer";

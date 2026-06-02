import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onStart: () => void;
}

const LoadingScreen = ({ onStart }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showStart, setShowStart] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStart(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }[] = [];

    const colors = ["#1372AA", "#17797C", "#7FD398", "#063848"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep atmospheric glow — center
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, "rgba(19, 114, 170, 0.12)");
      gradient.addColorStop(0.5, "rgba(23, 121, 124, 0.06)");
      gradient.addColorStop(1, "rgba(2, 10, 12, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleStart = () => {
    setExiting(true);
    setTimeout(() => onStart(), 1000);
  };

  return (
    <motion.div
      key="loading"
      className="fixed inset-0 bg-[#020A0C] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-[#020A0C] via-transparent to-[#020A0C]/60" />
      <div className="absolute inset-0 bg-linear-to-r from-[#020A0C]/60 via-transparent to-[#020A0C]/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.15em" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[12vw] md:text-[10vw] font-bold text-center leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            background: "linear-gradient(135deg, #1372AA 0%, #17797C 40%, #7FD398 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          NEMO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          className="text-[#4D8A8A] text-xs text-center md:text-sm tracking-[0.5em] uppercase"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Frontend Developer — Builder — Dreamer
        </motion.p>

        {/* Press Start */}
        <AnimatePresence>
          {showStart && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={handleStart}
              className="mt-8 text-[#E8F8F5] text-sm md:text-base tracking-[0.4em] uppercase hover:text-[#7FD398] transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Press Start
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-px bg-linear-to-r from-transparent via-[#17797C] to-transparent mt-4"
        />
      </div>

      {/* Corner decorations — game UI feel */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#17797C]/40" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#17797C]/40" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#17797C]/40" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#17797C]/40" />
    </motion.div>
  );
};

export default LoadingScreen;
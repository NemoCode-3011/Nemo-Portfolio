import { useEffect, useRef } from "react";
import { motion} from "framer-motion";
import nemo from "../../assets/img-2.jpeg";
import life from "../../assets/DBH.jpeg"
interface Props {
  onBack: () => void;
}

const stats = [
  { label: "Games", value: "Detroit: Become Human · Last of Us · Red Dead · Far Cry · God Of War 4 · Star Wars: Fallen Order" },
  { label: "Currently", value: "Frontend Development" },
  { label: "Reads", value: "Geopolitics · Mythology · Quantum Physics · Shakespeare · Karl Marx · Wole Soyinka" },
  { label: "Watches", value: "Anime, Cartoons, NatGeo Wild, Discovery Channel, Al-Jazeera & Food Network" },
  { label: "Obsessed With", value: "Neuralink · AI · Robotics · Games · The Future" },
  { label: "Powered By", value: "Curiosity & Coca Cola" },
];

const devStats = [
  { label: "Status", value: "Available for Work" },
  { label: "Stack", value: "HTML · CSS · React · JavaScript · TypeScript" },
  { label: "Mode", value: "Building toward Fullstack" },
  { label: "Goal", value: "Be part of the future" },
];

const About = ({ onBack }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleBack = () => {
    setTimeout(() => onBack(), 1200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleBack();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particles
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

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    let time = 0;

    const drawFigure = () => {
      const figureX = canvas.width * 0.72;
      const figureY = canvas.height * 0.78;
      const scale = canvas.height * 0.22;

      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "#E8F8F5";

      // Body
      ctx.beginPath();
      ctx.ellipse(figureX, figureY - scale * 0.25, scale * 0.08, scale * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(figureX, figureY - scale * 0.52, scale * 0.08, 0, Math.PI * 2);
      ctx.fill();

      // Left arm
      ctx.beginPath();
      ctx.moveTo(figureX - scale * 0.08, figureY - scale * 0.35);
      ctx.lineTo(figureX - scale * 0.18, figureY - scale * 0.12);
      ctx.lineWidth = scale * 0.06;
      ctx.strokeStyle = "#E8F8F5";
      ctx.globalAlpha = 0.12;
      ctx.stroke();

      // Right arm
      ctx.beginPath();
      ctx.moveTo(figureX + scale * 0.08, figureY - scale * 0.35);
      ctx.lineTo(figureX + scale * 0.18, figureY - scale * 0.12);
      ctx.stroke();

      // Left leg
      ctx.beginPath();
      ctx.moveTo(figureX - scale * 0.03, figureY - scale * 0.05);
      ctx.lineTo(figureX - scale * 0.08, figureY + scale * 0.2);
      ctx.stroke();

      // Right leg
      ctx.beginPath();
      ctx.moveTo(figureX + scale * 0.03, figureY - scale * 0.05);
      ctx.lineTo(figureX + scale * 0.08, figureY + scale * 0.2);
      ctx.stroke();

      ctx.restore();

      // Atmospheric haze around figure
      const haze = ctx.createRadialGradient(
        figureX, figureY - scale * 0.2, 0,
        figureX, figureY - scale * 0.2, scale * 0.8
      );
      haze.addColorStop(0, "rgba(19, 114, 170, 0.06)");
      haze.addColorStop(1, "rgba(2, 10, 12, 0)");
      ctx.fillStyle = haze;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    let lastTime = 0;
    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);
      if (timestamp - lastTime < 32) return;
      lastTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      // Central glow
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, "rgba(19, 114, 170, 0.1)");
      gradient.addColorStop(0.5, "rgba(23, 121, 124, 0.05)");
      gradient.addColorStop(1, "rgba(2, 10, 12, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Slow moving side glow
      const sideGlow = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.sin(time) * 30,
        canvas.height * 0.5,
        0,
        canvas.width * 0.7,
        canvas.height * 0.5,
        canvas.width * 0.4
      );
      sideGlow.addColorStop(0, "rgba(127, 211, 152, 0.06)");
      sideGlow.addColorStop(1, "rgba(2, 10, 12, 0)");
      ctx.fillStyle = sideGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(p.opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw figure
      drawFigure();

      animationId = requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

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

  return (
    <motion.div
      key="about"
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.15, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#020A0C] overflow-y-auto">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <img
        src={life}
        alt=""
        className="absolute inset-0 w-full h-full object-contain opacity-30"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-[#020A0C] via-transparent to-[#020A0C]/50" />
      <div className="absolute inset-0 bg-linear-to-r from-[#020A0C]/60 via-transparent to-[#020A0C]/80" />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#17797C]/50" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#17797C]/50" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#17797C]/50" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#17797C]/50" />

      {/* ESC prompt */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleBack}
        className="absolute top-8 left-12 md:left-20 flex items-center gap-3 group "
      >
        <span
          className="text-[#17797C] border border-[#17797C]/50 px-2 py-0.5 text-xs tracking-widest group-hover:border-[#7FD398] group-hover:text-[#7FD398] transition-all duration-300 "
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ESC
        </span>
        <span
          className="text-[#4D8A8A] text-xs tracking-[0.3em] uppercase group-hover:text-[#7FD398] transition-all duration-300"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Menu
        </span>
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 min-h-full flex flex-col justify-center pt-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left — Photo + Dev Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Section label */}
            <div className="flex items-center gap-4 mt-17">
              <div className="w-8 h-px bg-[#17797C]" />
              <p
                className="text-[#17797C] text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Player Profile
              </p>
            </div>

            {/* Photo — ID card style */}
            <div className="relative w-50">
              {/* Glow behind photo */}
              <div
                className="absolute -inset-2 rounded-sm blur-xl opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, #1372AA, #17797C, #7FD398)",
                }}
              />
              <div className="relative border border-[#17797C]/40 overflow-hidden">
                <img
                  src={nemo}
                  alt="Nemo"
                  className="w-full h-60 object-cover object-top grayscale"
                />
                {/* Photo overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#020A0C]/80 via-transparent to-transparent" />
                {/* ID tag */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#020A0C]/60 backdrop-blur-sm">
                  <p
                    className="text-[#E8F8F5] text-xs tracking-[0.3em] uppercase font-bold"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Nemo
                  </p>
                  <p
                    className="text-[#17797C] text-xs tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Frontend Dev
                  </p>
                </div>
              </div>
            </div>

            {/* Dev stats */}
            <div className="flex flex-col gap-3">
              {devStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 border-b border-[#17797C]/10 pb-3"
                >
                  <span
                    className="text-[#17797C] text-xs tracking-widest uppercase w-16 shrink-0 pt-0.5"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {stat.label}
                  </span>
                  <span
                    className="text-[#E8F8F5] text-xs tracking-wider"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio + Personal Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* Bio */}
            <div className="flex flex-col gap-4">
              <h2
                className="text-5xl md:text-6xl uppercase leading-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  background:
                    "linear-gradient(135deg, #1372AA 0%, #17797C 50%, #7FD398 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                About Me
              </h2>
              <p
                className="text-[#4D8A8A] text-sm leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                I'm Nemo, a frontend developer with a sociology degree and a
                brain that never stops asking questions. I'm drawn to the
                intrinsic nature of people, universal questions, and the kind
                of technology that blurs the line between human and machine.
              </p>
              <p
                className="text-[#4D8A8A] text-sm leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                My path into tech wasn't straight, it started with Detroit:
                Become Human and a thought:{" "}
                <span className="text-[#E8F8F5] italic">
                  "I want to build this."
                </span>{" "}
                So I did something about it. What drives me is simple, I want
                to be part of the future, not just watch it happen.
              </p>
            </div>
            {/* Personal stats — character sheet */}
            <div className="flex flex-col gap-1">
              <p
                className="text-[#17797C] text-xs tracking-[0.4em] uppercase mb-3"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Character Traits
              </p>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-4 py-2 border-b border-[#17797C]/10"
                >
                  <span
                    className="text-[#17797C] text-xs tracking-widest uppercase w-24 shrink-0 pt-0.5"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {stat.label}
                  </span>
                  <span
                    className="text-[#E8F8F5] text-xs tracking-wider leading-relaxed"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default About;
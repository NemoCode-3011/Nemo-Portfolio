import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiReactrouter } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiCssTricks } from "react-icons/di";
import { SiFramer } from "react-icons/si";
import { PiMouseScrollFill } from "react-icons/pi";
import { SiVite } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { TbApi } from "react-icons/tb";

interface Props {
  onBack: () => void;
}

const row1 = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <IoLogoJavascript /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "React", icon: <FaReact /> },
  { name: "React Router", icon: <SiReactrouter /> },
];

const row2 = [
  { name: "Tailwind CSS", icon: <RiTailwindCssFill /> },
  { name: "Custom CSS", icon: <DiCssTricks /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "Lenis", icon: <PiMouseScrollFill /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "REST APIs", icon: <TbApi /> },
];

const loadout = [
  {
    category: "Core",
    color: "#1372AA",
    skills: [
      { name: "HTML", level: "Confident", desc: "The foundation. Every structure starts here." },
      { name: "CSS", level: "Confident", desc: "Where design meets logic. My comfort zone." },
      { name: "JavaScript", level: "Learning", desc: "Still building the muscle. Getting there." },
      { name: "TypeScript", level: "Familiar", desc: "Learning to love the strictness." },
    ],
  },
  {
    category: "Frameworks",
    color: "#17797C",
    skills: [
      { name: "React", level: "Confident", desc: "Where the real building happens." },
      { name: "React Router", level: "Familiar", desc: "Navigation that makes sense." },
      { name: "Framer Motion", level: "Familiar", desc: "Making things move with purpose." },
      { name: "Lenis", level: "Familiar", desc: "Smooth scroll that actually feels smooth." },
    ],
  },
  {
    category: "Styling",
    color: "#7FD398",
    skills: [
      { name: "Tailwind CSS", level: "Confident", desc: "Fast, clean, no more naming things." },
      { name: "Custom CSS", level: "Confident", desc: "When Tailwind just won't cut it." },
    ],
  },
  {
    category: "Tools",
    color: "#4D8A8A",
    skills: [
      { name: "Vite", level: "Familiar", desc: "Fast builds. No complaints." },
      { name: "Git", level: "Learning", desc: "Still learning not to fear it." },
      { name: "REST APIs", level: "Learning", desc: "Calling data from the void." },
    ],
  },
];

const levelColor: Record<string, string> = {
  Confident: "#7FD398",
  Familiar: "#1372AA",
  Learning: "#4D8A8A",
};

const MarqueeRow = ({
  items,
  direction,
}: {
  items: typeof row1;
  direction: "left" | "right";
}) => {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ animationPlayState: paused ? "paused" : "running" }}
        className="flex gap-4 w-max"
        {...(paused && { animate: false })}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 border border-[#17797C]/20 bg-[#063848]/20 backdrop-blur-sm flex-shrink-0 hover:border-[#7FD398]/40 hover:bg-[#063848]/40 transition-all duration-300"
          >
            <span className="text-[#17797C] text-lg">{item.icon}</span>
            <span
              className="text-[#E8F8F5] text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const LoadoutCard = ({
  skill,
  color,
  index,
}: {
  skill: (typeof loadout)[0]["skills"][0];
  color: string;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col gap-2 p-4 border border-[#17797C]/20 bg-[#063848]/10 cursor-default overflow-hidden transition-all duration-300"
      style={{
        borderColor: hovered ? color + "60" : undefined,
        backgroundColor: hovered ? color + "10" : undefined,
        boxShadow: hovered ? `0 0 20px ${color}20` : "none",
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="text-[#E8F8F5] text-sm tracking-[0.15em] uppercase font-bold"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {skill.name}
        </span>
        <span
          className="text-xs tracking-widest uppercase px-2 py-0.5 border"
          style={{
            color: levelColor[skill.level],
            borderColor: levelColor[skill.level] + "40",
            fontFamily: "'Cinzel', serif",
          }}
        >
          {skill.level}
        </span>
      </div>

      {/* Description — reveals on hover */}
      <motion.p
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.25 }}
        className="text-xs leading-relaxed"
        style={{
          color: "#4D8A8A",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {skill.desc}
      </motion.p>

      {/* Bottom glow line */}
      <motion.div
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-px"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
};

const Skills = ({ onBack }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
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
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, "rgba(19, 114, 170, 0.08)");
      gradient.addColorStop(1, "rgba(2, 10, 12, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  return (
    <motion.div
      key="skills"
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.15, opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#020A0C] overflow-y-auto overflow-x-hidden"
    >
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#020A0C] via-transparent to-[#020A0C]/50 pointer-events-none" />

      {/* Corner decorations */}
      <div className="fixed top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#17797C]/50 pointer-events-none" />
      <div className="fixed top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#17797C]/50 pointer-events-none" />
      <div className="fixed bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#17797C]/50 pointer-events-none" />
      <div className="fixed bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#17797C]/50 pointer-events-none" />

      {/* ESC prompt */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onBack}
        className="fixed top-8 left-12 md:left-20 flex items-center gap-3 group z-50">
        <span
          className="text-[#17797C] border border-[#17797C]/50 px-2 py-0.5 text-xs tracking-widest group-hover:border-[#7FD398] group-hover:text-[#7FD398] transition-all duration-300"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ESC
        </span>
        <span
          className="text-[#4D8A8A] text-xs tracking-[0.3em] uppercase group-hover:text-[#7FD398] transition-all duration-300"
          style={{ fontFamily: "'Cinzel', serif" }}>
          Menu
        </span>
      </motion.button>
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 pt-28 pb-20 flex flex-col gap-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#17797C]" />
            <p
              className="text-[#17797C] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}>
              Loadout
              </p>
          </div>
          <h2
            className="text-5xl md:text-7xl uppercase leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              background:
                "linear-gradient(135deg, #1372AA 0%, #17797C 50%, #7FD398 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            Skills
          </h2>
          <p
            className="text-[#4D8A8A] text-sm max-w-md leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Early in the journey. Honest about where I am.
            Hover a card to learn more.
          </p>
        </motion.div>
        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-4">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </motion.div>

        {/* Loadout cards */}
        <div className="flex flex-col gap-10">
          {loadout.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + gi * 0.1 }}
              className="flex flex-col gap-4">
              {/* Category label */}
              <div className="flex items-center gap-4">
                <div
                  className="w-4 h-px"
                  style={{ backgroundColor: group.color }}/>
                <p
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{
                    color: group.color,
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  {group.category}
                </p>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {group.skills.map((skill, si) => (
                  <LoadoutCard
                    key={skill.name}
                    skill={skill}
                    color={group.color}
                    index={gi * 4 + si}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-8 flex-wrap">
          {Object.entries(levelColor).map(([level, color]) => (
            <div key={level} className="flex items-center gap-2">
              <div
                className="w-2 h-2"
                style={{ backgroundColor: color }}/>
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: "#4D8A8A",
                  fontFamily: "'Cinzel', serif",
                }}>
                {level}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Skills;
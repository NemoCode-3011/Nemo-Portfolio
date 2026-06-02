import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import gow from "../../assets/Godw.jpg"


interface Props {
  onBack: () => void;
}

const row1 = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <IoLogoJavascript /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "React", icon: < FaReact /> },
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

const abilityCards = [
  {
    name: "HTML",
    category: "Foundation",
    level: 85,
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.3)",
    borderColor: "rgba(245, 158, 11, 0.4)",
    desc: "The foundation. Every structure starts here.",
    rune: "ᚻᛏᛗᛚ",
    power: "85",
  },
  {
    name: "CSS",
    category: "Styling",
    level: 82,
    color: "#1372AA",
    glowColor: "rgba(19, 114, 170, 0.3)",
    borderColor: "rgba(19, 114, 170, 0.4)",
    desc: "Where design meets logic. My comfort zone.",
    rune: "ᚴᛋᛋ",
    power: "82",
  },
  {
    name: "React",
    category: "Framework",
    level: 75,
    color: "#17797C",
    glowColor: "rgba(23, 121, 124, 0.3)",
    borderColor: "rgba(23, 121, 124, 0.4)",
    desc: "Where the real building happens.",
    rune: "ᚱ ᛏ ",
    power: "75",
  },
  {
    name: "TypeScript",
    category: "Language",
    level: 55,
    color: "#7FD398",
    glowColor: "rgba(127, 211, 152, 0.3)",
    borderColor: "rgba(127, 211, 152, 0.4)",
    desc: "Learning to love the strictness.",
    rune: "ᛏᛋ",
    power: "55",
  },
  {
    name: "Tailwind",
    category: "Styling",
    level: 78,
    color: "#17797C",
    glowColor: "rgba(23, 121, 124, 0.3)",
    borderColor: "rgba(23, 121, 124, 0.4)",
    desc: "Fast, clean, no more naming things.",
    rune: "ᛏᚢ",
    power: "78",
  },
  {
    name: "JavaScript",
    category: "Language",
    level: 50,
    color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.3)",
    borderColor: "rgba(220, 38, 38, 0.4)",
    desc: "Still building the muscle. Getting there.",
    rune: "ᛃᛊ",
    power: "50",
  },
  {
    name: "Framer Motion",
    category: "Animation",
    level: 65,
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.3)",
    borderColor: "rgba(245, 158, 11, 0.4)",
    desc: "Making things move with purpose.",
    rune: "ᚠᛘ",
    power: "65",
  },
  {
    name: "Git",
    category: "Tools",
    level: 45,
    color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.3)",
    borderColor: "rgba(220, 38, 38, 0.4)",
    desc: "Still learning not to fear it.",
    rune: "ᚴᛁᛏ",
    power: "45",
  },
  {
    name: "REST APIs",
    category: "Integration",
    level: 40,
    color: "#1372AA",
    glowColor: "rgba(19, 114, 170, 0.3)",
    borderColor: "rgba(19, 114, 170, 0.4)",
    desc: "Calling data from the void.",
    rune: "ᚨᛈᛁ",
    power: "40",
  },
];

type AbilityCard = typeof abilityCards[0];

// ─── Segmented Bar ───────────────────────────────────────────
const SegmentedBar = ({ level, color }: { level: number; color: string }) => {
  const totalSegments = 10;
  const filledSegments = Math.round((level / 100) * totalSegments);

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalSegments }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="h-1.5 flex-1 rounded-sm"
          style={{
            backgroundColor:
              i < filledSegments ? color : "rgba(255,255,255,0.08)",
            boxShadow: i < filledSegments ? `0 0 6px ${color}` : "none",
          }}
        />
      ))}
    </div>
  );
};

// ─── Ability Card ─────────────────────────────────────────────
const AbilityCard = ({ card, index }: { card: AbilityCard; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => setClicked((prev) => !prev)}
      style={{ perspective: "1000px" }}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          rotateY: clicked ? 25 : hovered ? 8 : 0,
          scale: hovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex flex-col rounded-sm overflow-hidden border"
        style={{
          borderColor:
            hovered || clicked ? card.borderColor : "rgba(255,255,255,0.06)",
          backgroundColor: "#061410",
          boxShadow:
            hovered || clicked
              ? `0 0 30px ${card.glowColor}, 0 0 60px ${card.glowColor}`
              : "none",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Illustration area */}
        <div
          className="relative h-35 flex items-center justify-center overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at center, ${card.glowColor} 0%, #020A0C 70%)`,
          }}
        >
          <motion.span
            animate={{ scale: hovered ? 1.2 : 1, opacity: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-7xl select-none"
            style={{
              color: card.color,
              filter: `drop-shadow(0 0 20px ${card.color})`,
            }}
          >
            {card.rune}
          </motion.span>

          {/* Power badge */}
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold"
            style={{
              borderColor: card.color,
              color: card.color,
              backgroundColor: "#020A0C",
              fontFamily: "'Cinzel', serif",
            }}
          >
            {card.power}
          </div>

          {/* Category */}
          <div
            className="absolute top-3 left-3 text-xs tracking-widest uppercase"
            style={{ color: card.color, fontFamily: "'Outfit', sans-serif", fontSize: "9px" }}
          >
            {card.category}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-[#061410] to-transparent" />
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${card.color}, transparent)`,
          }}
        />

        {/* Info area */}
        <div className="flex flex-col gap-2 p-4">
          <h4
            className="text-base tracking-wider uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: "#E8F8F5", fontWeight: 600 }}
          >
            {card.name}
          </h4>

          <p
            className="text-xs leading-relaxed"
            style={{ color: "#4D8A8A", fontFamily: "'Outfit', sans-serif" }}
          >
            {card.desc}
          </p>

          <div className="flex flex-col gap-1 pt-1">
            <SegmentedBar level={card.level} color={card.color} />
            <p
              className="text-right text-xs"
              style={{ color: card.color, fontFamily: "'Outfit', sans-serif" }}
            >
              {card.level}%
            </p>
          </div>

          {/* Runes row */}
          <div className="flex gap-2 pt-1 border-t border-white/5">
            {["✦", "◈", "⬡"].map((r, i) => (
              <span
                key={i}
                className="text-xs"
                style={{ color: i === 0 ? card.color : "rgba(255,255,255,0.15)" }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Shimmer on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(105deg, transparent 40%, ${card.color}15 50%, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ─── Marquee Row ──────────────────────────────────────────────
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
        animate={
          paused
            ? {}
            : {
              x:
                direction === "left"
                  ? ["0%", "-33.33%"]
                  : ["-33.33%", "0%"],
            }
        }
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 w-max"
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 border border-[#17797C]/20 bg-[#063848]/20 backdrop-blur-sm shrink-0 hover:border-[#7FD398]/40 transition-all duration-300"
          >
            <span className="text-[#17797C] text-lg">{item.icon}</span>
            <span
              className="text-[#E8F8F5] text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Main Skills Component ────────────────────────────────────
const Skills = ({ onBack }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [deckRevealed, setDeckRevealed] = useState(false);

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
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; color: string;
    }[] = [];

    const colors = ["#1372AA", "#17797C", "#7FD398", "#F59E0B", "#DC2626"];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.3, 0,
        canvas.width * 0.5, canvas.height * 0.3,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, "rgba(19, 114, 170, 0.06)");
      gradient.addColorStop(1, "rgba(2, 10, 12, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
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
      <div className="absolute inset-0 bg-linear-to-t from-[#020A0C] via-transparent to-[#020A0C]/50 pointer-events-none" />
      
       <img
        src={gow}
        alt=""
        className="absolute inset-0 w-full h-300 object-contain opacity-30"
      />

      {/* Corner decorations */}
      <div className="fixed top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#17797C]/50 pointer-events-none" />
      <div className="fixed top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#17797C]/50 pointer-events-none" />
      <div className="fixed bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#17797C]/50 pointer-events-none" />
      <div className="fixed bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#17797C]/50 pointer-events-none" />

      {/* ESC */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onBack}
        className="fixed top-8 left-12 md:left-20 flex items-center gap-3 group z-50"
      >
        <span
          className="text-[#17797C] border border-[#17797C]/50 px-2 py-0.5 text-xs tracking-widest group-hover:border-[#7FD398] group-hover:text-[#7FD398] transition-all duration-300"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ESC
        </span>
        <span
          className="text-[#4D8A8A] text-xs tracking-[0.3em] uppercase group-hover:text-[#7FD398] transition-all duration-300"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
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
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#17797C]" />
            <p
              className="text-[#17797C] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Ability Loadout
            </p>
          </div>
          <h2
            className="text-6xl md:text-8xl uppercase leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              background:
                "linear-gradient(135deg, #1372AA 0%, #17797C 40%, #7FD398 70%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills
          </h2>
          <p
            className="text-[#4D8A8A] text-sm max-w-md leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Every ability earned through building. Click the deck to reveal.
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-4"
        >
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
        </motion.div>

        {/* Deck / Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#17797C]" />
            <p
              className="text-[#17797C] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Equipped Abilities
            </p>
          </div>
          <AnimatePresence mode="wait">
            {!deckRevealed ? (
              /* ── DECK STATE ── */
              <motion.div
                key="deck"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-16 gap-10"
              >
                {/* Stack */}
                <motion.div
                  className="relative cursor-pointer"
                  onClick={() => setDeckRevealed(true)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: "160px", height: "220px" }}
                >
                  {/* Back cards */}
                  {[4, 3, 2, 1].map((offset) => (
                    <motion.div
                      key={offset}
                      className="absolute rounded-sm border border-[#17797C]/20 overflow-hidden"
                      style={{
                        width: "160px",
                        height: "220px",
                        backgroundColor: "#061410",
                        top: `-${offset * 6}px`,
                        left: `${offset * 4}px`,
                        zIndex: offset,
                        rotate: offset * 1.5,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div
                        className="w-full h-full opacity-20"
                        style={{
                          background: `repeating-linear-gradient(45deg, #17797C, #17797C 1px, transparent 1px, transparent 8px)`,
                        }}
                      />
                      <div
                        className="absolute inset-3 border rounded-sm opacity-20"
                        style={{ borderColor: "#17797C" }}
                      />
                    </motion.div>
                  ))}

                  {/* Top card */}
                  <motion.div
                    className="absolute rounded-sm border overflow-hidden"
                    style={{
                      width: "160px",
                      height: "220px",
                      backgroundColor: "#061410",
                      borderColor: "rgba(127, 211, 152, 0.4)",
                      zIndex: 5,
                      boxShadow:
                        "0 0 30px rgba(127, 211, 152, 0.2), 0 4px 20px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-4"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(127,211,152,0.15) 0%, #020A0C 70%)",
                      }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-5xl"
                        style={{
                          color: "#7FD398",
                          filter: "drop-shadow(0 0 15px #7FD398)",
                        }}>
                        ᚨ ᛞ
                      </motion.span>
                      <div
                        className="h-px w-12"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, #7FD398, transparent)",
                        }}
                      />
                      <p
                        className="text-xs tracking-widest uppercase text-center px-4"
                        style={{ color: "#4D8A8A", fontFamily: "'Cinzel', serif" }}
                      >
                        Ability Deck
                      </p>
                    </div>

                    {/* Shimmer */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(127,211,152,0.1) 50%, transparent 60%)",
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Click arrow */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => setDeckRevealed(true)}
                >
                  <p
                    className="text-[#17797C] text-xs tracking-[0.3em] uppercase"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Click to reveal abilities
                  </p>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[#17797C] text-lg"
                  >
                    ↓
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              /* ── SPREAD STATE ── */
              <motion.div
                key="spread"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {abilityCards.map((card, index) => (
                    <motion.div
                      key={card.name}
                      initial={{
                        opacity: 0,
                        scale: 0.3,
                        rotate: (index - abilityCards.length / 2) * 15,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.07,
                        ease: [0.175, 0.885, 0.32, 1.275],
                      }}
                    >
                      <AbilityCard card={card} index={index} />
                    </motion.div>
                  ))}
                </div>

                {/* Reshuffle */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: abilityCards.length * 0.07 + 0.5 }}
                  onClick={() => setDeckRevealed(false)}
                  className="flex items-center gap-2 text-[#4D8A8A] hover:text-[#17797C] transition-colors duration-300 self-start"
                >
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    ↺ Reshuffle deck
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-8 flex-wrap"
        >
          {[
            { label: "Confident", color: "#7FD398" },
            { label: "Familiar", color: "#F59E0B" },
            { label: "Learning", color: "#DC2626" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-2 h-2" style={{ backgroundColor: color }} />
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "#4D8A8A", fontFamily: "'Outfit', sans-serif" }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>

      </div >
    </motion.div >
  );
};

export default Skills;
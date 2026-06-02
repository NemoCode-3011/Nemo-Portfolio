import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import rdr from "../../assets/reddead.jpeg"

interface Props {
  onBack: () => void;
  onContact: () => void;
}

const services = [
  {
    id: "landing",
    title: "Landing Pages",
    subtitle: "First Impressions. Built Right.",
    desc: "Clean, fast, responsive landing pages that convert visitors into believers. Built from scratch or converted from your design files.",
    rate: "Negotiable",
    difficulty: "★★★☆☆",
    tag: "OPEN CONTRACT",
  },
  {
    id: "portfolio",
    title: "Portfolio Websites",
    subtitle: "Your Story. Your Code.",
    desc: "Custom portfolio websites that actually reflect who you are. Not a template. Not a drag and drop. Something built for you.",
    rate: "Negotiable",
    difficulty: "★★★☆☆",
    tag: "OPEN CONTRACT",
  },
  {
    id: "uiux",
    title: "UI/UX to Code",
    subtitle: "Designs Deserve to Live.",
    desc: "You have a Figma file or a design that needs to become real. I convert UI/UX designs into pixel-precise, responsive code.",
    rate: "Negotiable",
    difficulty: "★★★★☆",
    tag: "OPEN CONTRACT",
  },
  {
    id: "responsive",
    title: "Responsive Development",
    subtitle: "Every Screen. Every Device.",
    desc: "Websites that work beautifully on mobile, tablet, and desktop. No broken layouts, no squished text, no compromises.",
    rate: "Negotiable",
    difficulty: "★★★☆☆",
    tag: "OPEN CONTRACT",
  },
  {
    id: "react",
    title: "React Applications",
    subtitle: "Build Something Real.",
    desc: "Interactive React applications with clean component architecture, state management, routing, and API integration.",
    rate: "Negotiable",
    difficulty: "★★★★☆",
    tag: "OPEN CONTRACT",
  },
];

const BountyCard = ({
  service,
  index,
  onTake,
}: {
  service: (typeof services)[0];
  index: number;
  onTake: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: (index % 2 === 0 ? -1 : 1) * 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: (index % 2 === 0 ? -1 : 1) * 0.8 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ rotate: 0, scale: 1.03, y: -8 }}
      className="relative cursor-pointer"
      style={{ transformOrigin: "center bottom" }}
    >
      {/* Parchment card */}
      <div
        className="relative flex flex-col gap-4 p-6 overflow-hidden"
        style={{
          background: hovered
            ? "linear-gradient(145deg, #F5E6C8 0%, #E8D5A3 40%, #D4BC7A 100%)"
            : "linear-gradient(145deg, #EDD9A3 0%, #D4BC7A 40%, #C4A85A 100%)",
          border: "2px solid #8B6914",
          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3)"
            : "0 8px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23000' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Corner ornaments */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8B6914]/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8B6914]/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8B6914]/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8B6914]/60" />

        {/* Tag */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs tracking-widest uppercase px-2 py-0.5 border border-[#8B6914]/60"
            style={{
              color: "#5C3D0A",
              fontFamily: "'Cinzel', serif",
              fontSize: "9px",
              backgroundColor: "rgba(139,105,20,0.1)",
            }}
          >
            {service.tag}
          </span>
          <span
            className="text-xs"
            style={{ color: "#8B6914", fontFamily: "'Outfit', sans-serif" }}
          >
            {service.difficulty}
          </span>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(to right, transparent, #8B6914, transparent)",
          }}
        />

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h3
            className="text-2xl md:text-3xl uppercase leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#2C1A06" }}
          >
            {service.title}
          </h3>
          <p
            className="text-xs italic"
            style={{ color: "#5C3D0A", fontFamily: "'Cinzel', serif" }}
          >
            "{service.subtitle}"
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(to right, transparent, #8B6914, transparent)",
          }}
        />

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#3D2209", fontFamily: "'Outfit', sans-serif" }}
        >
          {service.desc}
        </p>

        {/* Rate */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col gap-0.5">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#8B6914", fontFamily: "'Cinzel', serif", fontSize: "9px" }}
            >
              Rate
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "#2C1A06", fontFamily: "'Cinzel', serif" }}
            >
              {service.rate}
            </span>
          </div>

          {/* Take contract button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onTake();
            }}
            className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#EDD9A3",
              backgroundColor: "#2C1A06",
              border: "1px solid #8B6914",
            }}
          >
            Take Contract
          </motion.button>
        </div>

        {/* Stamp */}
        <motion.div
          initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
          animate={{ opacity: hovered ? 0.9 : 0.6, rotate: -12, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-16 right-4 pointer-events-none"
          style={{
            border: "2px solid rgba(139,105,20,0.6)",
            color: "rgba(139,105,20,0.6)",
            padding: "4px 8px",
            fontFamily: "'Cinzel', serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            transform: "rotate(-12deg)",
          }}
        >
          AVAILABLE
        </motion.div>
      </div>
    </motion.div>
  );
};

const Services = ({ onBack, onContact }: Props) => {
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
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; color: string;
    }[] = [];

    const colors = ["#1372AA", "#17797C", "#7FD398", "#F59E0B"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.2 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5,
        canvas.width * 0.7
      );
      gradient.addColorStop(0, "rgba(19, 114, 170, 0.05)");
      gradient.addColorStop(1, "rgba(2, 10, 12, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
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
      key="services"
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.15, opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#020A0C] overflow-y-auto overflow-x-hidden"
    >
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-[#020A0C] via-transparent to-[#020A0C]/50 pointer-events-none" />

      <img
        src={rdr}
        alt=""
        className="absolute inset-0 w-full h-300 object-cover opacity-15 object-top"
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
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 pt-28 pb-20 flex flex-col gap-12">

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
              Bounty Board
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
            Services
          </h2>
          <p
            className="text-[#4D8A8A] text-sm max-w-md leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Open contracts. Take one. Let's build something together.
          </p>
        </motion.div>

        {/* Bounty cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <BountyCard
              key={service.id}
              service={service}
              index={index}
              onTake={onContact}
            />
          ))}
        </div>
        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-xs tracking-widest uppercase"
          style={{ color: "#4D8A8A", fontFamily: "'Outfit', sans-serif" }}>
          All rates are negotiable — reach out and let's talk
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Services;
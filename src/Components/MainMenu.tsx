import { useState } from "react";
import { motion } from "framer-motion";
import bg from "../assets/bg-img.jpg";

interface Props {
  onSelect: (section: string) => void;
  
}

const menuItems = [
  { id: "restart", label: "New Game" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const MainMenu = ({ onSelect }: Props) => {
  const [activeItem, setActiveItem] = useState(0);

  // function onRestart(): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <motion.div
      key="main-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 overflow-hidden"
    >
      {/* Background image */}
      <motion.img
        src={bg}
        alt="background"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Lighter overlays — let the image breathe */}
      <div className="absolute inset-0 bg-[#020A0C]/35" />
      <div className="absolute inset-0 bg-linear-to-r from-[#020A0C]/95 via-[#020A0C]/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#020A0C]/80 via-transparent to-[#020A0C]/30" />

      {/* Subtle teal glow — much lighter than before */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 50%, rgba(19,114,170,0.08) 0%, transparent 55%)",
        }}
      />
      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#17797C]/50" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#17797C]/50" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#17797C]/50" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#17797C]/50" />

      {/* Name — top left with more padding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-11 left-12 md:left-20"
      >
        <p
          className="text-4xl md:text-5xl tracking-[0.2em] uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            background:
              "linear-gradient(135deg, #1372AA 0%, #17797C 50%, #7FD398 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Nemo
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-[#4D8A8A] text-xs tracking-[0.4em] uppercase mt-1"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Frontend Developer
        </motion.p>
      </motion.div>

      {/* Menu items — more breathing room */}
      <div className="absolute left-12 md:left-20 top-[22%] flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 + index * 0.12 }}
            onHoverStart={() => setActiveItem(index)}
            onClick={() => onSelect(item.id)}
            className="group flex items-center gap-6 text-left py-2 cursor-pointer"
          >
            {/* Active line */}
            <motion.div
              animate={{
                width: activeItem === index ? 36 : 12,
                backgroundColor:
                  activeItem === index ? "#7FD398" : "#17797C",
                opacity: activeItem === index ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              className="h-px shrink-0"
            />

            <motion.span
              animate={{
                color: activeItem === index ? "#E8F8F5" : "#4D8A8A",
              }}
              transition={{ duration: 0.2 }}
              className="text-md md:text-4xl tracking-[0.15em] uppercase"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: activeItem === index ? 700 : 400,
                textShadow:
                  activeItem === index
                    ? "0 0 30px rgba(127, 211, 152, 0.5), 0 0 60px rgba(19, 114, 170, 0.3)"
                    : "none",
              }}
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>

      {/* Bottom left info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-12 md:left-20 flex flex-col gap-1 top-[90%]"
      >
        <div className="w-16 h-px bg-linear-to-r from-[#17797C] to-transparent mb-2 " />
        <p
          className="text-[#4D8A8A] text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Portfolio — 2026
        </p>
        <p
          className="text-[#17797C]/50 text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          © Nemo. All Rights Reserved
        </p>
      </motion.div>

      {/* Bottom right hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 right-10 flex items-center gap-3"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-[#7FD398]"
        />
        <p
          className="text-[#4D8A8A] text-xs text-center tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Select to explore
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;
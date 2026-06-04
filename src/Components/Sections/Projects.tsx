import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import farCryMap from "../../assets/Yara-map.jpeg";
import immersa from "../../assets/immersa.png"
import vlanner from "../../assets/vlanner-img.png"
import next from "../../assets/next-gen.png"
import sp360 from "../../assets/sp-360.png"
import arcadia from "../../assets/Arcadia.png"
import portfolio from "../../assets/nemo-dev.png"

interface Props {
  onBack: () => void;
}

interface Project {
  id: string;
  title: string;
  category: string;
  status: "Deployed" | "In Progress";
  why: string;
  description: string;
  stack: string[];
  live: string;
  github: string;
  image?: string;
  // Position on map as percentage
  x: number;
  y: number;
  region: string;
}

const projects: Project[] = [

  {
    id: "immersa", 
    image: immersa,
    title: "Immersa 2026",
    category: "Conference Website",
    status: "Deployed",
    why: "I had a vision — a world where gaming, AI, VR, and design collide in one space. A fictional conference where creators, developers, and dreamers could compete, learn, and build together. Immersa was me asking: what would that world look like?",
    description: "A fictional gaming and design conference website with a bioluminescent dark aesthetic, glassmorphism UI, custom CSS grid system, countdown timer, marquee animations, and smooth page transitions.",
    stack: ["React", "Vite", "Custom CSS", "React Router", "Framer Motion", "Lenis"],
    live: "https://immersa-26.vercel.app/",
    github: "https://github.com/NemoCode-3011/IMMERSA26",
    x: 62,
    y: 18,
    region: "Norte",
  },

  {
    id: "nextgen",
    image: next,
    title: "Next Gen",
    category: "Fintech · Landing Page",
    status: "Deployed",
    why: "This was me proving I could take someone else's vision and build it precisely. A UX design handed to me and I had to convert it pixel by pixel using only HTML and CSS.",
    description: "A one-paged fintech banking landing page converted from a UX design. Built with pure HTML and CSS, focused on layout precision and responsive design.",
    stack: ["HTML", "CSS"],
    live: "https://next-gen-blue.vercel.app/",
    github: "https://github.com/NemoCode-3011/NextGen",
    x: 22,
    y: 35,
    region: "Oeste",
  },
  {
    id: "vlanner",
    image: vlanner,
    title: "Vlanner",
    category: "AI Hiring · Landing Page",
    status: "Deployed",
    why: "The future of hiring is changing and I wanted to understand how to present that visually. Take a design and build it faithfully.",
    description: "A one-paged landing page for an AI hiring company. UX to code conversion using HTML and CSS.",
    stack: ["HTML", "CSS"],
    live: "https://vlanner.vercel.app/",
    github: "https://github.com/NemoCode-3011/Vlanner",
    x: 78,
    y: 45,
    region: "Este",
  },
  {
    id: "sp360",
    image: sp360,
    title: "SP360",
    category: "Camera Brand · Landing Page",
    status: "Deployed",
    why: "A camera brand needs to make you feel something before you even read a word. A challenge in visual storytelling.",
    description: "A one-paged landing page for a camera brand. UX to code conversion focused on strong visual identity.",
    stack: ["HTML", "CSS"],
    live: "https://sp-360-delta.vercel.app/",
    github: "https://github.com/NemoCode-3011/SP360",
    x: 35,
    y: 65,
    region: "Sur",
  },
  {
    id: "arcadia",
    image: arcadia,
    title: "Arcadia Real Estate",
    category: "Dashboard · Web App",
    status: "In Progress",
    why: "I wanted to build something real. An actual application with data, roles, authentication, and logic. My first attempt at thinking like a fullstack developer.",
    description: "A real estate admin dashboard with role-based authentication, property listings, and API integration.",
    stack: ["React", "TypeScript", "CSS"],
    live: "https://arcadia-homes-wvni.vercel.app/",
    github: "https://github.com/NemoCode-3011/arcadia-homes",
    x: 55,
    y: 72,
    region: "Centro",
  },
  {
  id: "Portfolio",
   image: portfolio,
  title: "Nemo.dev",
  category: "Portfolio · Web Experience",
  status: "Deployed",
  why: "I didn't want a portfolio. I wanted a world. Every developer has a portfolio — not every developer builds one that feels like booting up a AAA game. This was me refusing to be ordinary with it. It's the most personal thing I've ever built.",
  description: "A game-inspired portfolio built as a single page application with scene-based navigation. Features a cinematic loading screen, post-apocalyptic game menu, and six unique sections each inspired by a different game universe — Detroit: Become Human, God of War, Far Cry 6, Red Dead Redemption 2, Jedi Fallen Order, and more.",
  stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis", "Vite", "EmailJS"],
  live: "https://nemo-portfolio-rho.vercel.app/",
  github: "https://github.com/NemoCode-3011/Nemo-Portfolio",
  x: 48,
  y: 38,
  region: "Centro",
},
];

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-16"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#020A0C]/85 backdrop-blur-md" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-[#17797C]/30"
        style={{ backgroundColor: "#020A0C" }}
      >
        {/* Image placeholder */}
        <div className="w-full h-45 bg-[#063848]/30 border-b border-[#17797C]/20 flex items-center justify-center relative overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#4D8A8A] text-xs tracking-widest uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              [ Screenshot Placeholder ]
            </span>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#020A0C] via-transparent to-transparent" />

          {/* Region tag */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-xs tracking-widest uppercase px-2 py-0.5 border border-[#17797C]/40 text-[#17797C]" style={{ fontFamily: "'Cinzel', serif" }}>
              {project.region}
            </span>
          </div>

          {/* Status */}
          <div className="absolute top-4 right-4">
            <span
              className="text-xs tracking-widest uppercase px-2 py-0.5"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: project.status === "Deployed" ? "#7FD398" : "#1372AA",
              }}
            >
              ● {project.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-8">
          <div className="flex flex-col gap-1">
            <p className="text-[#17797C] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              {project.category}
            </p>
            <h3
              className="text-4xl uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                background: "linear-gradient(135deg, #1372AA 0%, #17797C 50%, #7FD398 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {project.title}
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#17797C] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Why I Built This
            </p>
            <p className="text-[#4D8A8A] text-sm leading-relaxed border-l-2 border-[#17797C]/30 pl-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {project.why}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#17797C] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              What Was Built
            </p>
            <p className="text-[#E8F8F5] text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#17797C] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs tracking-wider uppercase px-3 py-1 border border-[#17797C]/20 text-[#4D8A8A]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8 pt-2 border-t border-[#17797C]/10">
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="text-[#7FD398] text-sm tracking-widest uppercase hover:text-[#E8F8F5] transition-colors duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Live Site →
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="text-[#4D8A8A] text-sm tracking-widest uppercase hover:text-[#E8F8F5] transition-colors duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              GitHub →
            </a>
            <button
              onClick={onClose}
              className="ml-auto text-[#4D8A8A] text-xs tracking-widest uppercase hover:text-[#E8F8F5] transition-colors duration-300 flex items-center gap-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="border border-[#17797C]/50 px-2 py-0.5">ESC</span>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MapPin = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 + Math.random() * 0.5 }}
      className="absolute cursor-pointer"
      style={{ left: `${project.x}%`, top: `${project.y}%`, transform: "translate(-50%, -100%)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Hover card — polaroid style */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-35 z-20"
            style={{
              backgroundColor: "#F5E6C8",
              border: "2px solid #8B6914",
              padding: "8px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.8)",
            }}
          >
            {/* Polaroid image area */}
            <div
              className="w-full h-20 mb-2 flex items-center justify-center"
              style={{ backgroundColor: "#E8D5A3" }}
            >
              <span
                className="text-xs tracking-widest uppercase text-center px-2"
                style={{ color: "#5C3D0A", fontFamily: "'Cinzel', serif", fontSize: "8px" }}
              >
                {project.title}
              </span>
            </div>
            <p
              className="text-center text-xs"
              style={{ color: "#2C1A06", fontFamily: "'Cinzel', serif", fontSize: "9px" }}
            >
              {project.category}
            </p>
            <p
              className="text-center text-xs mt-0.5"
              style={{
                color: project.status === "Deployed" ? "#2C6E0A" : "#8B4914",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "8px",
              }}
            >
              ● {project.status}
            </p>

            {/* Click hint */}
            <p
              className="text-center text-xs mt-1"
              style={{ color: "#8B6914", fontFamily: "'Outfit', sans-serif", fontSize: "8px" }}
            >
              Click to explore
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pin */}
      <div className="relative flex flex-col items-center">
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-6 h-6 rounded-full"
          style={{
            backgroundColor: project.status === "Deployed" ? "#7FD398" : "#1372AA",
            opacity: 0.3,
          }}
        />

        {/* Pin head */}
        <motion.div
          animate={{ scale: hovered ? 1.3 : 1 }}
          transition={{ duration: 0.2 }}
          className="relative w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
          style={{
            backgroundColor: project.status === "Deployed" ? "#7FD398" : "#1372AA",
            borderColor: "#020A0C",
            boxShadow: `0 0 12px ${project.status === "Deployed" ? "#7FD398" : "#1372AA"}`,
          }}
        >
          <span className="text-[8px] font-bold text-[#020A0C]">
            {project.title[0]}
          </span>
        </motion.div>

        {/* Pin stem */}
        <div
          className="w-0.5 h-3"
          style={{
            backgroundColor: project.status === "Deployed" ? "#7FD398" : "#1372AA",
          }}
        />
      </div>

      {/* Project name label */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <span
          className="text-xs tracking-wider uppercase px-1.5 py-0.5"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#E8F8F5",
            backgroundColor: "rgba(2,10,12,0.7)",
            fontSize: "8px",
          }}
        >
          {project.title}
        </span>
      </motion.div>
    </motion.div>
  );
};

const Projects = ({ onBack }: Props) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !selectedProject) onBack();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <motion.div
      key="projects"
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.15, opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#020A0C] overflow-hidden"
    >
      {/* Corner decorations */}
      <div className="fixed top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#17797C]/50 pointer-events-none z-10" />
      <div className="fixed top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#17797C]/50 pointer-events-none z-10" />
      <div className="fixed bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#17797C]/50 pointer-events-none z-10" />
      <div className="fixed bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#17797C]/50 pointer-events-none z-10" />

      {/* ESC */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onBack}
        className="fixed top-8 left-12 md:left-20 flex items-center gap-3 group z-40"
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

      {/* Header overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1"
      >
        <p
          className="text-xs tracking-[0.4em] uppercase px-4 py-1"
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#E8F8F5",
            backgroundColor: "rgba(2,10,12,0.8)",
            border: "1px solid rgba(23,121,124,0.3)",
          }}
        >
          Operación Nemo — Mission Map
        </p>
      </motion.div>

      {/* Viva Libertad watermark */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ opacity: 0.03 }}
      >
        <p
          className="text-[20vw] uppercase font-bold"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "#E8F8F5",
            transform: "rotate(-15deg)",
          }}
        >
          Viva Libertad
        </p>
      </div>
      {/* Map container */}
      <div className="relative w-full h-full">
        {/* Far Cry map */}
        <img
          src={farCryMap}
          alt="Mission Map"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        />

        {/* Dark overlay to blend with palette */}
        <div className="absolute inset-0 bg-[#020A0C]/40" />

        {/* Teal tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(23,121,124,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-linear-to-t from-[#020A0C]/60 via-transparent to-[#020A0C]/40" />
        <div className="absolute inset-0 bg-linear-to-r from-[#020A0C]/40 via-transparent to-[#020A0C]/40" />

        {/* Project pins */}
        {projects.map((project) => (
          <MapPin
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 right-10 flex flex-col gap-2 z-20"
          style={{
            backgroundColor: "rgba(2,10,12,0.8)",
            border: "1px solid rgba(23,121,124,0.3)",
            padding: "12px 16px",
          }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: "#17797C", fontFamily: "'Cinzel', serif", fontSize: "9px" }}
          >
            Legend
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#7FD398]" style={{ boxShadow: "0 0 8px #7FD398" }} />
            <span className="text-xs" style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif", fontSize: "10px" }}>
              Deployed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1372AA]" style={{ boxShadow: "0 0 8px #1372AA" }} />
            <span className="text-xs" style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif", fontSize: "10px" }}>
              In Progress
            </span>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
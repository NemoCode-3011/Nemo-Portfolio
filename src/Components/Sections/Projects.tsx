import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../../assets/bg-img-2.jpg";
import immersa from "../../assets/immersa.png"
import vlanner from "../../assets/vlanner-img.png"
import next from "../../assets/next-gen.png"
import sp360 from "../../assets/sp-360.png"
import arcadia from "../../assets/Arcadia.png"

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
}

const projects: Project[] = [
  {
    id: "immersa",
    image: immersa,
    title: "Immersa 2026",
    category: "Conference Website",
    status: "Deployed",
    why: "I had a vision,a world where gaming, AI, VR, and design collide in one space. Not just a website but a concept. A fictional conference where creators, developers, and dreamers could compete, learn, and build together. Immersa was me asking: what would that world look like?",
    description:
      "A fictional gaming and design conference website with a bioluminescent dark aesthetic, glassmorphism UI, custom CSS grid system, countdown timer, marquee animations, and smooth page transitions.",
    stack: ["React", "Vite", "Custom CSS", "React Router"],
    live: "#",
    github: "https://github.com/NemoCode-3011/IMMERSA26",
  },
  {
    id: "nextgen",
    image: next,
    title: "Next Gen",
    category: "Fintech · Landing Page",
    status: "Deployed",
    why: "This was me proving I could take someone else's vision and build it precisely. A UX design i found on Dribble and I had to convert it pixel by pixel using only HTML and CSS. No shortcuts. It taught me that design accuracy is a skill of its own.",
    description:
      "A one-paged fintech banking landing page converted from a UX design. Built with pure HTML and CSS, focused on layout precision, typography, and responsive design.",
    stack: ["HTML", "CSS"],
    live: "https://next-gen-blue.vercel.app/",
    github: "https://github.com/NemoCode-3011/NextGen",
  },
  {
    id: "vlanner",
     image: vlanner,
    title: "Vlanner",
    category: "AI Hiring · Landing Page",
    status: "Deployed",
    why: "Same discipline as Next Gen, take a design and build it faithfully. But this time for an AI hiring company, which felt relevant. The future of hiring is changing and I wanted to understand how to present that visually.",
    description:
      "A one-paged landing page for an AI hiring company. UX to code conversion using HTML and CSS, with a focus on clean professional presentation.",
    stack: ["HTML", "CSS"],
    live: "https://vlanner.vercel.app/",
    github: "https://github.com/NemoCode-3011/Vlanner",
  },
  {
    id: "sp360",
     image: sp360,
    title: "SP360",
    category: "Camera Brand · Landing Page",
    status: "Deployed",
    why: "A camera brand needs to make you feel something before you even read a word. This was a challenge in visual storytelling, how do you make a static page feel like it has a lens pointed at the world?",
    description:
      "A one-paged landing page for a camera brand. UX to code conversion focused on strong visual identity and product-led design using HTML and CSS.",
    stack: ["HTML", "CSS"],
    live: "https://sp-360-delta.vercel.app/",
    github: "https://github.com/NemoCode-3011/SP360",
  },
  {
    id: "arcadia",
     image: arcadia,
    title: "Arcadia Real Estate",
    category: "Dashboard · Web App",
    status: "In Progress",
    why: "I wanted to build something real. Not just a landing page — an actual application with data, roles, authentication, and logic. Arcadia is my first attempt at thinking like a fullstack developer, even before I fully am one.",
    description:
      "A real estate admin dashboard with role-based authentication, property listings, and API integration. My first full web application beyond landing pages.",
    stack: ["React", "TypeScript", "CSS"],
    live: "#",
    github: "https://github.com/NemoCode-3011/arcadia-homes",
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
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-16"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#020A0C]/90 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-[#020A0C] border border-[#17797C]/30 flex flex-col"
      >
        {/* Image placeholder */}
        <div className="w-full h-[200px] bg-[#063848]/30 border-b border-[#17797C]/20 flex items-center justify-center relative overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-[#4D8A8A] text-xs tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}>
              [ Screenshot Placeholder ]
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020A0C] via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span
              className="text-xs tracking-widest uppercase px-3 py-1 border"
              style={{
                fontFamily: "'Cinzel', serif",
                color: project.status === "Deployed" ? "#7FD398" : "#1372AA",
                borderColor:
                  project.status === "Deployed"
                    ? "#7FD398" + "40"
                    : "#1372AA" + "40",
                backgroundColor:
                  project.status === "Deployed"
                    ? "#7FD398" + "10"
                    : "#1372AA" + "10",
              }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 p-8">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <p
              className="text-[#17797C] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {project.category}
            </p>
            <h3
              className="text-4xl md:text-5xl uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                background:
                  "linear-gradient(135deg, #1372AA 0%, #17797C 50%, #7FD398 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Why */}
          <div className="flex flex-col gap-2">
            <p
              className="text-[#17797C] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Mission Brief
            </p>
            <p
              className="text-[#4D8A8A] text-sm leading-relaxed border-l-2 border-[#17797C]/30 pl-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {project.why}
            </p>
          </div>

          {/* What was built */}
          <div className="flex flex-col gap-2">
            <p
              className="text-[#17797C] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              What Was Built
            </p>
            <p
              className="text-[#E8F8F5] text-sm leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {project.description}
            </p>
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-2">
            <p
              className="text-[#17797C] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs tracking-wider uppercase px-3 py-1 border border-[#17797C]/20 text-[#4D8A8A]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 pt-2 border-t border-[#17797C]/10">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7FD398] text-sm tracking-widest uppercase hover:text-[#E8F8F5] transition-colors duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Live Site →
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4D8A8A] text-sm tracking-widest uppercase hover:text-[#E8F8F5] transition-colors duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              GitHub →
            </a>
            <button
              onClick={onClose}
              className="ml-auto text-[#4D8A8A] text-xs tracking-widest uppercase hover:text-[#E8F8F5] transition-colors duration-300 flex items-center gap-2"
              style={{ fontFamily: "'Cinzel', serif" }}
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
      {/* Background image — very dark */}
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-10"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#020A0C]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020A0C] via-transparent to-[#020A0C]/60" />

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
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Menu
        </span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 h-full overflow-y-auto pt-28 pb-20">
        <div className="flex flex-col gap-12">

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
                Mission Select
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
              }}
            >
              Projects
            </h2>
            <p
              className="text-[#4D8A8A] text-sm max-w-md leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Select a mission to view the full briefing.
            </p>
          </motion.div>

          {/* Project cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col text-left border border-[#17797C]/20 bg-[#063848]/10 hover:border-[#17797C]/50 hover:bg-[#063848]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="w-full h-[140px] bg-[#063848]/20 border-b border-[#17797C]/10 flex items-center justify-center relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span
                      className="text-[#4D8A8A]/30 text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {project.title}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020A0C]/60 via-transparent to-transparent" />

                  {/* Status */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-xs tracking-widest uppercase px-2 py-0.5"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        color:
                          project.status === "Deployed" ? "#7FD398" : "#1372AA",
                      }}
                    >
                      ● {project.status}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex flex-col gap-1">
                    <p
                      className="text-[#17797C] text-xs tracking-[0.2em] uppercase"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {project.category}
                    </p>
                    <h3
                      className="text-xl uppercase tracking-wider text-[#E8F8F5] group-hover:text-[#7FD398] transition-colors duration-300"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 border border-[#17797C]/20 text-[#4D8A8A]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span
                        className="text-xs px-2 py-0.5 text-[#4D8A8A]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View mission prompt */}
                  <motion.p
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[#17797C] text-xs tracking-widest uppercase mt-1"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    View Mission →
                  </motion.p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
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
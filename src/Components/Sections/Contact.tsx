import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import starwars from "../../assets/starwars.jpg";

interface Props {
  onBack: () => void;
}

const Contact = ({ onBack }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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

    const colors = ["#4FC3F7", "#29B6F6", "#0288D1", "#17797C"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);
      if (timestamp - lastTime < 32) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Holographic scan line effect
      const scanY = (timestamp * 0.05) % canvas.height;
      ctx.fillStyle = "rgba(79, 195, 247, 0.02)";
      ctx.fillRect(0, scanY, canvas.width, 2);

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5,
        canvas.width * 0.6
      );
      gradient.addColorStop(0, "rgba(41, 182, 246, 0.06)");
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

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      await emailjs.send(
        "service_v4jrqha",
        "template_8m1xupb",
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        "UtDMrfguFimDekRUr"
      );
      // Glitch effect before showing success
      setGlitch(true);
      setTimeout(() => {
        setGlitch(false);
        setSent(true);
      }, 800);
    } catch (error) {
      console.error("Failed to send:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      key="contact"
      initial={{ scale: 1.15, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.15, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 bg-[#020A0C] overflow-y-auto overflow-x-hidden"
    >
      {/* Star Wars background */}
      <img
        src={starwars}
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.2 }}
      />

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />

      {/* Holographic overlays */}
      <div className="fixed inset-0 bg-linear-to-t from-[#020A0C] via-[#020A0C]/60 to-[#020A0C]/40 pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-r from-[#020A0C]/60 via-transparent to-[#020A0C]/60 pointer-events-none" />

      {/* Holographic grid lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(79,195,247,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(79,195,247,0.5) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Glitch overlay */}
      <AnimatePresence>
        {glitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1] }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ backgroundColor: "rgba(79,195,247,0.1)" }}
          >
            {/* Glitch lines */}
            {[20, 40, 60, 75, 85].map((top) => (
              <motion.div
                key={top}
                animate={{ x: [0, -20, 10, -5, 0], opacity: [1, 0.5, 1, 0.3, 0] }}
                transition={{ duration: 0.8 }}
                className="absolute w-full h-px"
                style={{
                  top: `${top}%`,
                  backgroundColor: "rgba(79,195,247,0.6)",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations — Jedi style */}
      <div className="fixed top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#4FC3F7]/40 pointer-events-none" />
      <div className="fixed top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#4FC3F7]/40 pointer-events-none" />
      <div className="fixed bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#4FC3F7]/40 pointer-events-none" />
      <div className="fixed bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#4FC3F7]/40 pointer-events-none" />

      {/* ESC */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onBack}
        className="fixed top-8 left-12 md:left-20 flex items-center gap-3 group z-50"
      >
        <span
          className="text-[#4FC3F7] border border-[#4FC3F7]/50 px-2 py-0.5 text-xs tracking-widest group-hover:border-[#E8F8F5] group-hover:text-[#E8F8F5] transition-all duration-300"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ESC
        </span>
        <span
          className="text-[#4FC3F7]/60 text-xs tracking-[0.3em] uppercase group-hover:text-[#E8F8F5] transition-all duration-300"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Menu
        </span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 pt-28 pb-20 flex flex-col gap-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#4FC3F7]" />
            <p
              className="text-[#4FC3F7] text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Holocomm Terminal
            </p>
            <div className="w-8 h-px bg-[#4FC3F7]" />
          </div>

          <h2
            className="text-6xl md:text-8xl uppercase leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              background: "linear-gradient(135deg, #4FC3F7 0%, #29B6F6 40%, #E8F8F5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Open Channel
          </h2>

          <p
            className="text-[#4FC3F7]/60 text-sm max-w-md leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            The Force connects all living things. So does a good message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left — Direct links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <p
                className="text-[#4FC3F7] text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Transmission Frequencies
              </p>

              {[
                {
                  label: "Holonet Mail",
                  value: "adeniyitemilade192@gmail.com",
                  href: "mailto:adeniyitemilade192@gmail.com",
                },
                {
                  label: "Codex Archive",
                  value: "github.com/NemoCode-3011",
                  href: "https://github.com/NemoCode-3011",
                },
                {
                  label: "Alliance Network",
                  value: "temilade-adeniyi-vivian",
                  href: "https://linkedin.com/in/temilade-adeniyi-vivian",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 pb-4 transition-all duration-300"
                  style={{ borderBottom: "1px solid rgba(79,195,247,0.1)" }}
                >
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#4FC3F7", fontFamily: "'Cinzel', serif", opacity: 0.7 }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="text-sm group-hover:text-[#4FC3F7] transition-colors duration-300"
                    style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif" }}
                  >
                    {link.value}
                  </span>
                </a>
              ))}
            </div>

            {/* Status indicator */}
            <div
              className="flex flex-col gap-3 p-4"
              style={{
                border: "1px solid rgba(79,195,247,0.2)",
                backgroundColor: "rgba(79,195,247,0.03)",
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#4FC3F7" }}
                />
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#4FC3F7", fontFamily: "'Cinzel', serif" }}
                >
                  Signal Active
                </p>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#4FC3F7", opacity: 0.5, fontFamily: "'Outfit', sans-serif" }}
              >
                Available for work. Ready to receive transmissions.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <p
                    className="text-[#4FC3F7] text-xs tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Compose Transmission
                  </p>

                  {[
                    { key: "name", label: "Identification", placeholder: "Your name", type: "text" },
                    { key: "email", label: "Return Frequency", placeholder: "your@email.com", type: "email" },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-2">
                      <label
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "#4FC3F7", opacity: 0.7, fontFamily: "'Cinzel', serif" }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-transparent py-2 text-sm outline-none transition-colors duration-300"
                        style={{
                          color: "#E8F8F5",
                          fontFamily: "'Outfit', sans-serif",
                          borderBottom: "1px solid rgba(79,195,247,0.3)",
                        }}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2">
                    <label
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "#4FC3F7", opacity: 0.7, fontFamily: "'Cinzel', serif" }}
                    >
                      Message Content
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full bg-transparent py-2 text-sm outline-none resize-none transition-colors duration-300"
                      style={{
                        color: "#E8F8F5",
                        fontFamily: "'Outfit', sans-serif",
                        borderBottom: "1px solid rgba(79,195,247,0.3)",
                      }}
                      placeholder="What brings you to this frequency?"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={sending}
                    className="w-full py-3 text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                    style={{
                      color: "#020A0C",
                      fontFamily: "'Cinzel', serif",
                      backgroundColor: sending ? "rgba(79,195,247,0.6)" : "#4FC3F7",
                      border: "1px solid #4FC3F7",
                    }}
                  >
                    {/* Button shimmer */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                      }}
                    />
                    {sending ? "Transmitting..." : "Initiate Transmission →"}
                  </motion.button>
                </motion.div>
              ) : (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col gap-6 items-start py-8"
                >
                  {/* Holocron icon */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 relative"
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: "2px solid rgba(79,195,247,0.6)",
                        boxShadow: "0 0 20px rgba(79,195,247,0.3)",
                      }}
                    />
                    <div
                      className="absolute inset-3 rounded-full"
                      style={{
                        border: "1px solid rgba(79,195,247,0.3)",
                      }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center text-xl"
                      style={{ color: "#4FC3F7" }}
                    >
                      ✦
                    </div>
                  </motion.div>

                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-4xl uppercase"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        background: "linear-gradient(135deg, #4FC3F7, #E8F8F5)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Transmission Received
                    </h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl"
                      style={{ color: "#4FC3F7", fontFamily: "'Cinzel', serif" }}
                      >
                      ありがとうございます
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm leading-relaxed"
                      style={{ color: "#4FC3F7", opacity: 0.7, fontFamily: "'Outfit', sans-serif" }}>
                      Arigato Gozaimasu. Your message travels through the Force.
                      I will respond.
                    </motion.p>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs italic"
                    style={{ color: "#4FC3F7", opacity: 0.5, fontFamily: "'Cinzel', serif" }}>
                    "The Force will be with you. Always."
                  </motion.p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs tracking-widest uppercase transition-colors duration-300 mt-2"
                    style={{ color: "rgba(79,195,247,0.5)", fontFamily: "'Outfit', sans-serif" }}>
                    ← Open new channel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
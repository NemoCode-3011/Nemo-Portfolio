import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

interface Props {
  onBack: () => void;
}

const Contact = ({ onBack }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sent, setSent] = useState(false);
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

    const colors = ["#1372AA", "#17797C", "#7FD398"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.3 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.4, 0,
        canvas.width * 0.5, canvas.height * 0.4,
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

  const [sending, setSending] = useState(false);

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
      setSent(true);
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
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 bg-[#020A0C] overflow-y-auto overflow-x-hidden"
    >
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-[#020A0C] via-transparent to-[#020A0C]/50 pointer-events-none" />

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
      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 pt-28 pb-20 flex flex-col gap-12">

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
              Transmission
            </p>
          </div>
          <h2
            className="text-6xl md:text-8xl uppercase leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              background:
                "linear-gradient(135deg, #1372AA 0%, #17797C 50%, #7FD398 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contact
          </h2>
          <p
            className="text-[#4D8A8A] text-sm max-w-md leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Send a transmission. I'll respond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left — Direct links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <p
                className="text-[#17797C] text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Direct Lines
              </p>

              {/* Email */}
              <a
                href="mailto:adeniyitemilade192@gmail.com"
                className="group flex flex-col gap-1 border-b border-[#17797C]/10 pb-4 hover:border-[#17797C]/40 transition-all duration-300"
              >
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#4D8A8A", fontFamily: "'Cinzel', serif" }}
                >
                  Email
                </span>
                <span
                  className="text-sm group-hover:text-[#7FD398] transition-colors duration-300"
                  style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif" }}
                >
                  adeniyitemilade192@gmail.com
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/NemoCode-3011"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 border-b border-[#17797C]/10 pb-4 hover:border-[#17797C]/40 transition-all duration-300"
              >
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#4D8A8A", fontFamily: "'Cinzel', serif" }}
                >
                  GitHub
                </span>
                <span
                  className="text-sm group-hover:text-[#7FD398] transition-colors duration-300"
                  style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif" }}
                >
                  github.com/NemoCode-3011
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/temilade-adeniyi-vivian"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 border-b border-[#17797C]/10 pb-4 hover:border-[#17797C]/40 transition-all duration-300"
              >
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#4D8A8A", fontFamily: "'Cinzel', serif" }}
                >
                  LinkedIn
                </span>
                <span
                  className="text-sm group-hover:text-[#7FD398] transition-colors duration-300"
                  style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif" }}
                >
                  https://linkedin.com/in/temilade-adeniyi-vivian
                </span>
              </a>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#7FD398]"
              />
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "#4D8A8A", fontFamily: "'Outfit', sans-serif" }}
              >
                Available for work
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col gap-6"
          >
            {!sent ? (
              <>
                <p
                  className="text-[#17797C] text-xs tracking-[0.4em] uppercase"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Send Message
                </p>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#4D8A8A", fontFamily: "'Cinzel', serif" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-[#17797C]/30 py-2 text-sm outline-none focus:border-[#7FD398] transition-colors duration-300"
                    style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif" }}
                    placeholder="Your name" />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#4D8A8A", fontFamily: "'Cinzel', serif" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[#17797C]/30 py-2 text-sm outline-none focus:border-[#7FD398] transition-colors duration-300"
                    style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif" }}
                    placeholder="your@email.com"
                  />
                </div>
                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "#4D8A8A", fontFamily: "'Cinzel', serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-transparent border-b border-[#17797C]/30 py-2 text-sm outline-none focus:border-[#7FD398] transition-colors duration-300 resize-none"
                    style={{ color: "#E8F8F5", fontFamily: "'Outfit', sans-serif" }}
                    placeholder="What are you building?"
                  />
                </div>
                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="w-full py-3 text-sm tracking-widest uppercase transition-all duration-300 border border-[#17797C] hover:bg-[#17797C]/20 disabled:opacity-50"
                  style={{ color: "#7FD398", fontFamily: "'Cinzel', serif" }}>
                  {sending ? "Transmitting..." : "Transmit Message →"}
                </motion.button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 items-start justify-center h-full py-12">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-[#7FD398]"
                />
                <h3>Transmission Sent</h3>
                <p className="text-2xl" style={{ fontFamily: "'Cinzel', serif", color: "#7FD398" }}>
                  ありがとうございます
                </p>
                <p>Arigato Gozaimasu — Message received. I'll get back to you soon.</p>
                <button
                  onClick={() => setSent(false)}
                  className="text-xs tracking-widest uppercase text-[#4D8A8A] hover:text-[#17797C] transition-colors duration-300 mt-4"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  ← Send another
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
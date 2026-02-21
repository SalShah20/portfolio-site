"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const WORDS = ["systems thinker.", "problem solver.", "code builder.", "network debugger.", "STEM advocate."];

function TypewriterText() {
  const ref = useRef<HTMLSpanElement>(null);
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const word = WORDS[wordIdx.current];
      if (!ref.current) return;

      if (!deleting.current) {
        ref.current.textContent = word.slice(0, charIdx.current + 1);
        charIdx.current++;
        if (charIdx.current === word.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        ref.current.textContent = word.slice(0, charIdx.current - 1);
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          wordIdx.current = (wordIdx.current + 1) % WORDS.length;
        }
      }
      timeout = setTimeout(tick, deleting.current ? 55 : 90);
    }

    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="text-[#38bdf8]">
      <span ref={ref} />
      <span className="cursor-blink inline-block w-0.5 h-[1em] bg-[#38bdf8] ml-0.5 align-middle" />
    </span>
  );
}

// Animated SVG circle that draws itself
function CircleDecoration({ size = 300, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className="absolute pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
    >
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
        stroke="#38bdf8"
        strokeWidth="1"
        strokeDasharray={Math.PI * (size - 8)}
        initial={{ strokeDashoffset: Math.PI * (size - 8), opacity: 0.3 }}
        animate={{ strokeDashoffset: 0, opacity: 0.15 }}
        transition={{ delay: delay + 0.5, duration: 2.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function FloatingDot({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#38bdf8]"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.6, 0.3], scale: [0, 1, 1], y: [0, -15, 0] }}
      transition={{
        delay,
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
    >
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <CircleDecoration size={600} delay={0} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <CircleDecoration size={820} delay={0.4} />
      </div>

      {/* Floating dots */}
      <FloatingDot x="10%" y="20%" size={5} delay={0.3} />
      <FloatingDot x="85%" y="15%" size={4} delay={0.8} />
      <FloatingDot x="75%" y="70%" size={6} delay={1.1} />
      <FloatingDot x="15%" y="75%" size={3} delay={1.5} />
      <FloatingDot x="50%" y="10%" size={4} delay={2} />

      {/* Gradient radial glow behind text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Greeting */}
          <motion.p
            variants={item}
            className="font-mono text-[#38bdf8] text-sm tracking-[0.25em] uppercase mb-6"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.div variants={item} className="mb-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
              <span className="block text-[#e2eaf4]">Saloni</span>
              <span className="block text-[#38bdf8] glow-green">Shah.</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={item} className="mb-10">
            <p className="text-2xl md:text-3xl font-light text-[#6b8ba4]">
              A <TypewriterText />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="max-w-lg text-[#6b8ba4] text-lg leading-relaxed mb-12"
          >
            Computer Engineering student at the{" "}
            <span className="text-[#e2eaf4]">University of Minnesota</span>.
            I build performant systems and elegant interfaces — from low-level network
            protocols to full-stack web applications.
          </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#38bdf8] text-[#07111f] font-semibold text-sm tracking-wide hover:bg-[#7dd3fc] transition-all duration-200 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]"
              >
                View my work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#38bdf844] text-[#38bdf8] font-semibold text-sm tracking-wide hover:bg-[#38bdf811] hover:border-[#38bdf888] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v8M5 7l3 3 3-3M3 13h10" />
                </svg>
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#1a3248] text-[#e2eaf4] font-semibold text-sm tracking-wide hover:border-[#38bdf833] hover:text-[#38bdf8] transition-all duration-200"
              >
                Get in touch
              </a>
            </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-[#38bdf8] to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono text-[10px] text-[#555] tracking-[0.2em] rotate-90 mt-2">SCROLL</span>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const FACTS = [
  { label: "University", value: "U of Minnesota" },
  { label: "Major", value: "Computer Engineering" },
  { label: "Graduation", value: "Expected May 2028" },
  { label: "Location", value: "Twin Cities, MN" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[#38bdf8] text-sm tracking-[0.25em] uppercase">
              01. About
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#38bdf833] to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left — text */}
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold text-[#e2eaf4] mb-8 leading-tight"
              >
                Building at the intersection of{" "}
                <span className="text-[#38bdf8]">hardware</span> and{" "}
                <span className="text-[#38bdf8]">software</span>.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-[#6b8ba4] leading-relaxed mb-5 text-lg"
              >
                I&apos;m a Computer Engineering student at the University of Minnesota with
                hands-on experience in systems programming, embedded hardware, and full-stack
                development. I specialize in C/C++, Python, and TypeScript, and I love
                understanding how things work at every layer — from bare-metal microcontrollers
                to AI-powered applications.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-[#6b8ba4] leading-relaxed mb-5 text-lg"
              >
                At{" "}
                <span className="text-[#e2eaf4] font-medium">Arrcus</span>, I achieved a{" "}
                <span className="text-[#38bdf8] font-medium">9x runtime improvement</span>{" "}
                by replacing a Python decoder with a C Babeltrace 2 plugin, and extended
                routing protocol observability in ArcOS. I also built an AR productivity app
                that won a{" "}
                <span className="text-[#e2eaf4] font-medium">$1,000 development grant</span>{" "}
                at a hackathon.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-[#6b8ba4] leading-relaxed text-lg"
              >
                  Outside of code I TA electrical engineering labs, build STEM curriculum
                  for K-8 students at Moonpreneur, and stay active in IEEE, SWE, the
                  AI &amp; Competitive Programming clubs, and Startup Club on campus.
              </motion.p>
            </div>

            {/* Right — facts + avatar */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              {/* Animated avatar blob */}
              <div className="relative w-48 h-48 mx-auto md:mx-0">
                <motion.div
                  className="w-full h-full rounded-[40%_60%_60%_40%/50%_30%_70%_50%] bg-gradient-to-br from-[#38bdf822] to-[#38bdf805] border border-[#38bdf822] flex items-center justify-center"
                  animate={{
                    borderRadius: [
                      "40% 60% 60% 40% / 50% 30% 70% 50%",
                      "60% 40% 30% 70% / 60% 50% 40% 50%",
                      "30% 70% 60% 40% / 50% 70% 30% 60%",
                      "40% 60% 60% 40% / 50% 30% 70% 50%",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-6xl select-none">👩‍💻</span>
                </motion.div>
                {/* Orbiting dot */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-[#38bdf8]"
                  style={{ top: "50%", left: "50%", marginTop: -6, marginLeft: -6 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  transformTemplate={(_vals, generated) =>
                    generated.replace(/rotate\(([^)]+)\)/, (_, r) =>
                      `rotate(${r}) translateX(80px) rotate(-${r})`
                    )
                  }
                />
              </div>

              {/* Fact cards */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {FACTS.map((fact) => (
                  <motion.div
                    key={fact.label}
                    variants={fadeUp}
                    className="p-4 rounded-xl border border-[#1a3248] bg-[#0d1e30] card-hover"
                  >
                    <p className="font-mono text-[10px] text-[#555] tracking-[0.2em] uppercase mb-1">
                      {fact.label}
                    </p>
                    <p className="text-[#e2eaf4] font-semibold text-sm">{fact.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Activities */}
              <motion.div
                variants={fadeUp}
                className="p-4 rounded-xl border border-[#1a3248] bg-[#0d1e30]"
              >
                <p className="font-mono text-[10px] text-[#555] tracking-[0.2em] uppercase mb-2">
                  Activities
                </p>
                <div className="flex flex-wrap gap-2">
                    {["IEEE", "SWE", "AI Club", "Competitive Programming", "Startup Club"].map((a) => (
                    <span key={a} className="tag-pill">{a}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const SKILL_GROUPS = [
  {
    category: "Languages",
    icon: "{ }",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    category: "Frameworks & Tools",
    icon: "⚙",
    skills: ["React", "Node.js", "Unity", "Git", "Linux", "REST APIs", "MATLAB"],
  },
  {
    category: "Systems & Databases",
    icon: "⚡",
    skills: ["Data Structures & Algorithms", "Networking Protocols", "SQL", "OS Internals"],
  },
  {
    category: "Specialized",
    icon: "◈",
    skills: ["YANG", "ConfD", "Babeltrace 2", "OAuth2", "AR Development", "MCP"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {/* Header */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[#38bdf8] text-sm tracking-[0.25em] uppercase">
              04. Skills
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#38bdf833] to-transparent" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#e2eaf4] mb-4 leading-tight"
          >
            What I <span className="text-[#38bdf8]">work with</span>.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6b8ba4] text-lg mb-14 max-w-xl">
            Technologies, tools, and concepts I&apos;ve used in production or studied deeply.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-6">
            {SKILL_GROUPS.map((group) => (
              <motion.div
                key={group.category}
                variants={fadeUp}
                className="p-6 rounded-2xl border border-[#1a3248] bg-[#0d1e30] card-hover"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-[#38bdf8] text-lg w-8 text-center">{group.icon}</span>
                  <h3 className="text-[#e2eaf4] font-bold">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag-pill">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education callout */}
          <motion.div
            variants={fadeUp}
            className="mt-10 p-6 rounded-2xl border border-[#38bdf822] bg-[#38bdf808] flex flex-col sm:flex-row items-start gap-5"
          >
            <div className="shrink-0 w-12 h-12 rounded-xl bg-[#38bdf815] border border-[#38bdf833] flex items-center justify-center text-xl">
              🎓
            </div>
            <div>
              <p className="font-mono text-[#38bdf8] text-xs tracking-[0.2em] uppercase mb-1">Education</p>
              <h3 className="text-[#e2eaf4] font-bold text-lg">
                B.S. Computer Engineering — University of Minnesota
              </h3>
              <p className="text-[#6b8ba4] text-sm mt-1">
                College of Science and Engineering · Minneapolis, MN · Expected May 2028
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

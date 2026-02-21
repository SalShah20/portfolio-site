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

const EXPERIENCES = [
  {
    role: "Software Engineering Intern",
    company: "Arrcus Networking Systems",
    period: "June 2025 – August 2025",
    location: "San Jose, CA",
    bullets: [
      "Reduced trace decoding runtime by 9x by replacing a Python decoder with a C Babeltrace 2 plugin for inline IPv4/IPv6/MAC address decoding, significantly accelerating debugging workflows.",
      "Enhanced IS-IS, RIB, and FIB modules by adding last-update-time and failure reason attributes, standardizing YANG models and improving root-cause analysis of routing delays.",
      "Collaborated with senior engineers to design, test, and integrate enhancements across ArcOS, reducing CPU overhead and strengthening reliability in large-scale enterprise deployments.",
    ],
    tags: ["C", "Babeltrace 2", "ConfD/YANG", "IS-IS", "RIB/FIB", "IPv4/v6"],
  },
  {
    role: "Teaching Assistant",
    company: "University of Minnesota",
    period: "September 2025 – Present",
    location: "Minneapolis, MN",
    bullets: [
      "Led weekly lab sessions for 14 students across core electrical and computer engineering courses (EE 1301 & EE 2301), supporting hands-on experimentation and problem-solving.",
      "Guided students through circuit concepts, debugging techniques, and lab instrumentation while reinforcing lecture material.",
      "Graded assignments and exams for the full course, providing detailed feedback and held regular office hours for one-on-one support.",
    ],
    tags: ["EE 1301", "EE 2301", "Circuit Design", "Mentorship", "Teaching"],
  },
  {
    role: "Student Partner",
    company: "Moonpreneur",
    period: "April 2025 – Present",
    location: "Minneapolis, MN",
    bullets: [
      "Architected comprehensive programming curriculum teaching software development fundamentals to K-8 students.",
      "Created hands-on project modules covering debugging techniques and computational problem-solving.",
    ],
    tags: ["Curriculum Design", "STEM Education", "Robotics", "Mentorship"],
  },
  {
    role: "Mechanical / Machining Director",
    company: "FRC Robotics Team 1072",
    period: "September 2020 – April 2024",
    location: "San Jose, CA",
    bullets: [
      "Orchestrated a team of 20 members in designing and fabricating competition-ready robot parts using Fusion 360 and CNC tools.",
      "Collaborated on control algorithms and hardware-software integration for autonomous operations.",
    ],
    tags: ["Fusion 360", "CNC", "Hardware", "Autonomous Systems", "Leadership"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {/* Header */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[#38bdf8] text-sm tracking-[0.25em] uppercase">
              02. Experience
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#38bdf833] to-transparent" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#e2eaf4] mb-14 leading-tight"
          >
            Where I&apos;ve <span className="text-[#38bdf8]">worked</span>.
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-[#38bdf833] via-[#38bdf822] to-transparent" />

            <div className="flex flex-col gap-10">
              {EXPERIENCES.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0.5 top-2 w-6 h-6 rounded-full border-2 border-[#38bdf844] bg-[#07111f] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                  </div>

                  <div className="p-6 rounded-2xl border border-[#1a3248] bg-[#0d1e30] card-hover glow-border">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-[#e2eaf4] font-bold text-lg">{exp.role}</h3>
                        <p className="text-[#38bdf8] font-medium text-sm mt-0.5">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[#555] text-xs">{exp.period}</p>
                        <p className="font-mono text-[#444] text-xs mt-0.5">{exp.location}</p>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-[#6b8ba4] text-sm leading-relaxed">
                          <span className="text-[#38bdf8] mt-1.5 shrink-0">▹</span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

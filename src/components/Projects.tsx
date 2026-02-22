"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { GitHubRepo } from "@/lib/github";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

// Manually curated featured projects — rich descriptions, stay as-is.
const FEATURED_PROJECTS = [
  {
    title: "Google Classroom MCP Server",
    description:
      "Model Context Protocol server enabling AI assistants to integrate with Google Classroom API for educational workflow automation. Configured OAuth2 with Google Cloud Platform, architected a TypeScript API wrapper supporting 8+ operations including course management, assignment creation, and submission monitoring.",
    tags: ["TypeScript", "MCP", "Google Classroom API", "OAuth2", "Node.js", "GCP"],
    github: "https://github.com/SalShah20/classroom_mcp",
    number: "01",
  },
  {
    title: "Chasing Stars — AR Productivity App",
    description:
      "Pioneered an AR mobile app for task management with interactive 3D elements using Unity and C# in a 48-hour hackathon. Spearheaded a team of 4 developers, delivered MVP, and secured a $1,000 development grant through a pitch to industry judges.",
    tags: ["Unity", "C#", "AR Development", "Mobile", "Hackathon"],
    github: "https://github.com/SalShah20",
    number: "02",
  },
];

// Manually curated "other" projects — shown first in the grid, above GitHub repos.
const MANUAL_OTHER_PROJECTS = [
  {
    title: "AI-Powered Job Application Assistant",
    description:
      "Automation tool using OpenAI API and Selenium to generate personalized cold emails for startup applications from VC portfolio websites. Excel-based tracking with 100+ startup data extraction and automated ChromeDriver integration.",
    tags: ["Python", "OpenAI API", "Selenium", "Automation", "Web Scraping"],
    github: "https://github.com/SalShah20",
  },
  {
    title: "PASCAL to MIPS Assembly Compiler",
    description:
      "Compiler translating PASCAL source code to MIPS assembly with full lexical analysis, parsing, and code generation stages. Optimized parsing logic for improved compilation efficiency and robust error handling.",
    tags: ["C", "Compilers", "MIPS", "PASCAL", "Systems Programming"],
    github: "https://github.com/SalShah20/atcs-compilers",
  },
  {
    title: "Babeltrace 2 C Filter Plugin",
    description:
      "High-performance C filter plugin for Babeltrace 2 replacing a legacy Python decoder, enabling inline IPv4/IPv6/MAC address decoding with a 9x reduction in trace processing runtime.",
    tags: ["C", "Babeltrace 2", "Networking", "Performance", "ArcOS"],
    github: "https://github.com/SalShah20",
  },
  {
    title: "Robotic Arm",
    description:
      "Programmed a robotic arm for precise motion control using inverse kinematics. Integrated real-time sensor feedback to continuously refine movement accuracy during operation.",
    tags: ["Robotics", "Inverse Kinematics", "Sensors", "Embedded Systems"],
    github: "https://github.com/SalShah20/atcs-kinematics",
  },
  {
    title: "Image Recognition Neural Network",
    description:
      "Implemented an N-layer neural network from scratch for hand gesture recognition using backpropagation. Improved model accuracy by tuning activation functions and layer configurations.",
    tags: ["Python", "Neural Networks", "Backpropagation", "Machine Learning"],
    github: "https://github.com/SalShah20/atcs-neuralnetworks",
  },
  {
    title: "Smart Plant Monitoring System",
    description:
      "Embedded system using a PIC24 microcontroller to measure soil moisture, light (TSL2561), and temperature/humidity (DHT11) and compute a \"Plant Comfort Index.\" Real-time feedback via RGB LEDs and an OLED display indicates optimal, moderate, or poor plant conditions. In progress.",
    tags: ["PIC24", "Embedded C", "I2C", "OLED", "Sensors", "Analog/Digital"],
    github: "https://github.com/SalShah20",
  },
  {
    title: "4-bit Computer",
    description:
      "Designed and simulated a 4-bit computer from scratch with a full ALU, registers, control unit, and memory interface. Implemented and tested arithmetic operations and basic instruction execution.",
    tags: ["Computer Architecture", "ALU", "Vivado", "Digital Logic", "FPGA"],
  },
];

// Repo names already featured manually — exclude from auto-populated list
const FEATURED_REPO_NAMES = new Set([
  "classroom_mcp",
  "atcs-kinematics",
  "atcs-neuralnetworks",
  "atcs-compilers",
]);

// Repos to hide even if public (forks, boilerplate, etc.)
const REPO_DENYLIST = new Set([
  "SalShah20",       // profile readme repo
  "portfolio-site",  // redundant — visitor is already on it
  "apcsds",
]);

interface ProjectsProps {
  githubRepos?: GitHubRepo[];
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2H2v12h12v-4M10 2h4v4M14 2L8 8" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface OtherProject {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  isLive?: boolean;
}

function OtherProjectCard({ project }: { project: OtherProject }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group p-6 rounded-2xl border border-[#1a3248] bg-[#0d1e30] card-hover flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="rgba(56,189,248,0.08)" />
          <path d="M10 18h16M18 10v16" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#555] hover:text-[#38bdf8] transition-colors"
            aria-label={project.isLive ? "View on GitHub" : "GitHub"}
          >
            <ExternalIcon />
          </a>
        )}
      </div>
      <div>
        <h3 className="text-[#e2eaf4] font-bold mb-2">{project.title}</h3>
        <p className="text-[#6b8ba4] text-sm leading-relaxed">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-pill">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects({ githubRepos = [] }: ProjectsProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Build list of manual other project titles for dedup
  const manualTitles = new Set(
    MANUAL_OTHER_PROJECTS.map((p) => p.title.toLowerCase())
  );

  // Auto-populated repos from GitHub: exclude featured, denylisted, and manual ones
  const autoRepos = githubRepos
    .filter(
      (repo) =>
        !FEATURED_REPO_NAMES.has(repo.name) &&
        !REPO_DENYLIST.has(repo.name) &&
        repo.description // only repos with a description
    )
    .filter((repo) => !manualTitles.has(repo.name.toLowerCase()))
    .slice(0, 6); // cap at 6 auto repos

  const autoProjects: OtherProject[] = autoRepos.map((repo) => ({
    title: repo.name
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    description: repo.description ?? "",
    tags: [
      ...(repo.language ? [repo.language] : []),
      ...repo.topics.slice(0, 3),
    ],
    github: repo.html_url,
    isLive: true,
  }));

  const otherProjects: OtherProject[] = [...MANUAL_OTHER_PROJECTS, ...autoProjects];

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          {/* Header */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[#38bdf8] text-sm tracking-[0.25em] uppercase">
              03. Projects
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#38bdf833] to-transparent" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-[#e2eaf4] mb-4 leading-tight"
          >
            Things I&apos;ve <span className="text-[#38bdf8]">built</span>.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6b8ba4] text-lg mb-14 max-w-xl">
            A selection of projects spanning systems programming, AI tooling, AR, and web development.
          </motion.p>

          {/* Featured projects */}
          <div className="flex flex-col gap-8 mb-12">
            {FEATURED_PROJECTS.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className="relative group p-8 rounded-2xl border border-[#1a3248] bg-[#0d1e30] card-hover overflow-hidden"
              >
                {/* Number watermark */}
                <div className="absolute top-4 right-6 font-mono text-6xl font-bold text-[#ffffff06] select-none pointer-events-none">
                  {project.number}
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="font-mono text-[#38bdf8] text-xs tracking-[0.2em] uppercase">
                        Featured Project
                      </span>
                      <h3 className="text-[#e2eaf4] text-2xl font-bold mt-1">{project.title}</h3>
                    </div>
                    <div className="flex gap-3 mt-1">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888] hover:text-[#38bdf8] transition-colors"
                        aria-label="GitHub"
                      >
                        <GitHubIcon />
                      </a>
                    </div>
                  </div>

                  <p className="text-[#6b8ba4] leading-relaxed mb-6">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(56,189,248,0.04) 0%, transparent 60%)" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Other projects grid */}
          <motion.p
            variants={fadeUp}
            className="font-mono text-[#555] text-sm tracking-[0.15em] uppercase mb-6"
          >
            Other Noteworthy Projects
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((project) => (
              <OtherProjectCard key={project.title} project={project} />
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div variants={fadeUp} className="text-center mt-14">
            <a
              href="https://github.com/SalShah20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#38bdf8] font-mono text-sm hover:text-[#7dd3fc] transition-colors underline-draw"
            >
              <GitHubIcon />
              See more on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about", number: "01" },
  { label: "Experience", href: "#experience", number: "02" },
  { label: "Projects", href: "#projects", number: "03" },
  { label: "Skills", href: "#skills", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(7,17,31,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(26,50,72,0.8)" : "1px solid transparent",
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="font-mono font-bold text-[#38bdf8] text-lg tracking-tight hover:opacity-80 transition-opacity">
            SS<span className="text-[#e2eaf4]">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1.5 text-[#888] hover:text-[#e2eaf4] transition-colors duration-200 text-sm font-medium"
              >
                <span className="font-mono text-[#38bdf8] text-xs">{item.number}.</span>
                {item.label}
              </a>
            ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 rounded-full border border-[#38bdf844] text-[#38bdf8] text-sm font-mono hover:bg-[#38bdf811] transition-all duration-200 inline-flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v8M5 7l3 3 3-3M3 13h10" />
                </svg>
                Resume
              </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-[#888] hover:text-[#38bdf8] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current rounded-full"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden flex flex-col pt-20 px-8 pb-8"
        style={{ background: "rgba(7,17,31,0.97)", backdropFilter: "blur(16px)" }}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? "0%" : "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        pointerEvents={menuOpen ? "auto" : "none"}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-[#e2eaf4] text-2xl font-bold"
              initial={{ opacity: 0, x: 30 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
            >
              <span className="font-mono text-[#38bdf8] text-base">{item.number}.</span>
              {item.label}
            </motion.a>
          ))}
        </nav>
          <div className="mt-auto flex gap-5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38bdf8] hover:text-[#7dd3fc] transition-colors font-mono text-sm inline-flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8M5 7l3 3 3-3M3 13h10" />
              </svg>
              Resume
            </a>
            <a
              href="https://github.com/SalShah20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#38bdf8] transition-colors font-mono text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/saloni-shah-74a687221/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#38bdf8] transition-colors font-mono text-sm"
            >
              LinkedIn
            </a>
          </div>
      </motion.div>
    </>
  );
}

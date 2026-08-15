"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const getTechIconPath = (techName: string): string => {
  const lower = techName.toLowerCase();
  if (lower.includes("next")) return "/icons/next.js.png";
  if (lower.includes("node")) return "/icons/node.png";
  if (lower.includes("react")) return "/icons/react.png";
  if (lower.includes("typescript") || lower.includes("ts")) return "/icons/typescript.png";
  if (lower.includes("javascript") || lower.includes("js")) return "/icons/javascript.png";
  if (lower.includes("html")) return "/icons/html.png";
  if (lower.includes("css")) return "/icons/css.png";
  if (lower.includes("git")) return "/icons/git.png";
  if (lower.includes("supabase")) return "/icons/supabase.png";
  if (lower.includes("tailwind")) return "/icons/tailwindcss.png";
  if (lower.includes("postgres") || lower.includes("sql") || lower.includes("plpgsql")) return "/icons/postgres.png";
  if (lower.includes("vercel")) return "/icons/vercel.png";
  
  return `/icons/${lower}.png`;
};

export default function ProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track the scroll progress of the project section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamically map scroll progress [0, 1] to the active project index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const totalProjects = projects.length;
      const step = 1 / totalProjects;
      
      // Calculate active index based on scroll position bounds
      for (let i = 0; i < totalProjects; i++) {
        if (latest <= (i + 1) * step) {
          setActiveIndex(i);
          break;
        }
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Spring animation variants for the details transition
  const infoVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut" as const
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.25,
        ease: "easeIn" as const
      }
    }
  };

  return (
    <section id="work" className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24 border-b border-border-subtle">
      {/* Eyebrow and Header */}
      <div className="mb-8 sm:mb-12 md:mb-16">
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
          Code Meets Creativity
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2">
          Crafted Projects
        </h2>
      </div>

      {/* 1. Desktop: Interactive Sticky Split Scroll Layout */}
      <div ref={containerRef} className="relative h-[250vh] w-full hidden lg:block">
        <div className="sticky top-24 h-[600px] flex items-center justify-between gap-16 w-full overflow-hidden">
          
          {/* Left Column: Vertical Stack of Thumbnail Cards */}
          <div className="w-[600px] h-[564px] overflow-hidden relative">
            <motion.div
              animate={{ y: -activeIndex * (564 + 24) }} // Translate stack upward based on active index
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="flex flex-col gap-6"
            >
              {projects.map((project, idx) => (
                <div
                  key={project.slug}
                  className={`w-full h-[564px] py-8 px-6 flex flex-col justify-between overflow-hidden relative shadow-md transition-all duration-300 border rounded-2xl ${
                    idx === activeIndex
                      ? "opacity-100 scale-100 border-border-subtle bg-bg-surface/40"
                      : "opacity-20 scale-95 border-transparent bg-bg-surface/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-display text-lg font-bold text-text-primary">
                      {project.title}
                    </h4>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-bg-surface-raised border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`Visit live site for ${project.title}`}
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <div className="flex-1 relative rounded-lg overflow-hidden bg-bg-canvas/40 border border-border-subtle/35 flex items-center justify-center">
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} Screenshot`}
                      className="w-full h-full object-cover object-top absolute inset-0"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Sticky Project Information Card */}
          <div className="w-[600px] h-[558.4px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={infoVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full h-full p-8 flex flex-col justify-between absolute inset-0"
              >
                <div>
                  {/* Title Row with accent indicator line */}
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-accent rounded-full shrink-0" />
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                      {projects[activeIndex].title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-4">
                    {projects[activeIndex].description}
                  </p>

                  {/* Highlights List */}
                  <ul className="flex flex-col gap-3.5 mt-6">
                    {projects[activeIndex].highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-text-primary text-sm sm:text-base leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="text-accent font-bold shrink-0 font-mono">+</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills at the Bottom */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {projects[activeIndex].stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full bg-bg-surface border border-border-subtle font-mono font-medium text-text-secondary select-none justify-center shrink-0 px-3 py-1 text-xs sm:text-sm min-w-[90px] h-8"
                    >
                      <span 
                        style={{ width: "18px", height: "18px" }}
                        className="flex items-center justify-center shrink-0 overflow-hidden"
                      >
                        <img
                          src={getTechIconPath(tech)}
                          alt={tech}
                          className="w-full h-full object-contain p-0.5"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget.parentElement?.querySelector(".fallback-dot");
                            if (fallback) fallback.classList.remove("hidden");
                          }}
                        />
                        <span className="fallback-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0 hidden" />
                      </span>
                      <span className="truncate">{tech}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 2. Mobile/Tablet: Standard Stack Layout for Responsiveness */}
      <div className="flex flex-col gap-8 sm:gap-12 w-full lg:hidden">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex flex-col items-center gap-6 sm:gap-8 w-full py-8 sm:py-12 border-b border-border-subtle/30 last:border-b-0"
          >
            {/* Thumbnail Card */}
            <div className="w-full bg-bg-surface/40 border border-border-subtle rounded-2xl py-6 sm:py-8 px-4 sm:px-6 flex flex-col justify-between overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display text-base sm:text-lg font-bold text-text-primary">
                  {project.title}
                </h4>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-bg-surface-raised border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`Visit live site for ${project.title}`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                )}
              </div>
              <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-bg-canvas/40 border border-border-subtle/35 flex items-center justify-center">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} Screenshot`}
                  className="w-full h-full object-cover object-top absolute inset-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Info Card */}
            <div className="w-full p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-accent rounded-full shrink-0" />
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                    {project.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-3 sm:mt-4">
                  {project.description}
                </p>
                <ul className="flex flex-col gap-2.5 sm:gap-3 mt-4 sm:mt-6">
                  {project.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className="text-text-primary text-xs sm:text-sm md:text-base leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="text-accent font-bold shrink-0 font-mono">+</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full bg-bg-surface border border-border-subtle font-mono font-medium text-text-secondary select-none justify-center shrink-0 px-3 py-1 text-xs sm:text-sm min-w-[80px] h-7 sm:h-8"
                  >
                    <span 
                      style={{ width: "16px", height: "16px" }}
                      className="flex items-center justify-center shrink-0 overflow-hidden"
                    >
                      <img
                        src={getTechIconPath(tech)}
                        alt={tech}
                        className="w-full h-full object-contain p-0.5"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.parentElement?.querySelector(".fallback-dot");
                          if (fallback) fallback.classList.remove("hidden");
                        }}
                      />
                      <span className="fallback-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0 hidden" />
                    </span>
                    <span className="truncate">{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects under updation status indicator label */}
      <div className="mt-12 sm:mt-16 flex justify-center px-4">
        <div className="inline-flex items-center text-center gap-2 px-4 sm:px-5 py-2.5 bg-bg-surface/30 border border-border-subtle/80 rounded-full shadow-sm text-text-secondary text-xs sm:text-sm font-sans tracking-wide">
          <span>Projects are under updation</span>
        </div>
      </div>

    </section>
  );
}

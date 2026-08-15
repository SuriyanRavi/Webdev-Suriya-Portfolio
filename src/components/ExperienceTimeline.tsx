"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { experiences } from "@/content/experience";
import Card from "./ui/Card";

const getTechIconPath = (techName: string): string => {
  const lower = techName.toLowerCase();
  if (lower.includes("next")) return "/icons/next.js.png";
  if (lower.includes("react")) return "/icons/react.png";
  if (lower.includes("typescript") || lower.includes("ts")) return "/icons/typescript.png";
  if (lower.includes("javascript") || lower.includes("js")) return "/icons/javascript.png";
  if (lower.includes("html")) return "/icons/html.png";
  if (lower.includes("css")) return "/icons/css.png";
  if (lower.includes("github")) return "/icons/github.png";
  if (lower.includes("git")) return "/icons/git.png";
  if (lower.includes("node")) return "/icons/node.png";
  if (lower.includes("supabase")) return "/icons/supabase.png";
  if (lower.includes("tailwind")) return "/icons/tailwindcss.png";
  if (lower.includes("postgres") || lower.includes("sql") || lower.includes("plpgsql")) return "/icons/postgres.png";
  if (lower.includes("vercel")) return "/icons/vercel.png";
  if (lower.includes("npm")) return "/icons/npm.png";
  if (lower.includes("figma")) return "/icons/figma.png";
  
  return `/icons/${lower}.png`;
};

export default function ExperienceTimeline() {
  const shouldReduceMotion = useReducedMotion();
  // Expanded states: desktop starts with first expanded (index 0)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "exp-1": true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24 border-b border-border-subtle">
      {/* Header */}
      <div className="mb-8 sm:mb-12 md:mb-16">
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
          Career Path
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2">
          Experience History
        </h2>
      </div>

      {/* Accordion List (Design.md §2 & §5) */}
      <div className="flex flex-col gap-4 sm:gap-6 max-w-[900px]">
        {experiences.map((exp) => {
          const isExpanded = !!expandedIds[exp.id];

          return (
            <Card
              key={exp.id}
              className={`border transition-all duration-300 p-4 sm:p-6 ${
                isExpanded ? "border-accent/20 bg-bg-surface-raised" : "border-border-subtle hover:border-accent/10"
              }`}
            >
              {/* Header block (clickable trigger) */}
              <button
                onClick={() => toggleExpand(exp.id)}
                className="w-full text-left flex items-start justify-between gap-4 sm:gap-6 cursor-pointer focus-visible:outline-none min-h-[48px]"
                aria-expanded={isExpanded}
                aria-controls={`exp-content-${exp.id}`}
              >
                <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-text-primary">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-accent font-semibold flex items-center gap-1.5 sm:text-right shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.dateRange}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-text-secondary">
                    <span className="font-semibold text-text-primary">{exp.company}</span>
                    <span className="text-text-tertiary">|</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                <div className="pt-1.5">
                  <ChevronDown
                    className={`h-5 w-5 text-text-secondary transition-transform duration-200 shrink-0 ${
                      isExpanded ? "transform rotate-180 text-accent" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`exp-content-${exp.id}`}
                    initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-border-subtle/50 flex flex-col gap-5 sm:gap-6">
                      {/* Metric highlights */}
                      {exp.metrics && exp.metrics.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {exp.metrics.map((metric, i) => (
                            <div key={i} className="bg-bg-canvas/50 border border-border-subtle p-3 sm:p-3.5 rounded-md flex flex-col gap-0.5 sm:gap-1">
                              <span className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-accent">
                                {metric.value}
                              </span>
                              <span className="font-mono text-[10px] uppercase text-text-secondary tracking-wider">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Responsibilities list */}
                      <div className="flex flex-col gap-2.5 sm:gap-3">
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                          Key Achievements &amp; Contributions
                        </h4>
                        <ul className="flex flex-col gap-2 list-none pl-0">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-xs sm:text-sm text-text-primary leading-relaxed flex items-start gap-2.5">
                              <span className="text-accent font-bold shrink-0 font-mono">+</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Used (chips) */}
                      <div className="flex flex-col gap-2.5 sm:gap-3">
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                          Tools &amp; Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 rounded-full bg-bg-surface border border-border-subtle font-mono text-xs font-medium text-text-secondary px-3 py-1.5 select-none shrink-0 hover:border-accent/30 hover:text-text-primary transition-colors duration-150"
                            >
                              <span className="w-4 h-4 flex items-center justify-center shrink-0 overflow-hidden">
                                <img
                                  src={getTechIconPath(t)}
                                  alt={t}
                                  className="w-full h-full object-contain p-0.5"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    const fallback = e.currentTarget.parentElement?.querySelector(".fallback-dot");
                                    if (fallback) fallback.classList.remove("hidden");
                                  }}
                                />
                                <span className="fallback-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0 hidden" />
                              </span>
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { experiences } from "@/content/experience";
import Card from "./ui/Card";
import Chip from "./ui/Chip";

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
    <section id="experience" className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 border-b border-border-subtle">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
          Career Path
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2">
          Experience History
        </h2>
      </div>

      {/* Accordion List (Design.md §2 & §5) */}
      <div className="flex flex-col gap-6 max-w-[900px]">
        {experiences.map((exp) => {
          const isExpanded = !!expandedIds[exp.id];

          return (
            <Card
              key={exp.id}
              className={`border transition-all duration-300 ${
                isExpanded ? "border-accent/20 bg-bg-surface-raised" : "border-border-subtle hover:border-accent/10"
              }`}
            >
              {/* Header block (clickable trigger) */}
              <button
                onClick={() => toggleExpand(exp.id)}
                className="w-full text-left flex items-start justify-between gap-6 cursor-pointer focus-visible:outline-none"
                aria-expanded={isExpanded}
                aria-controls={`exp-content-${exp.id}`}
              >
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-accent font-semibold flex items-center gap-1.5 sm:text-right shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.dateRange}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                    <span className="font-semibold text-text-primary">{exp.company}</span>
                    <span className="text-text-tertiary">|</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
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
                    <div className="pt-6 mt-6 border-t border-border-subtle/50 flex flex-col gap-6">
                      {/* Metric highlights (Design.md §2: metrics rendered as small stat grid) */}
                      {exp.metrics && exp.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          {exp.metrics.map((metric, i) => (
                            <div key={i} className="bg-bg-canvas/50 border border-border-subtle p-3.5 rounded-md flex flex-col gap-1">
                              <span className="font-mono text-xl md:text-2xl font-bold text-accent">
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
                      <div className="flex flex-col gap-3">
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                          Key Achievements &amp; Contributions
                        </h4>
                        <ul className="flex flex-col gap-2 list-none pl-0">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-text-primary leading-relaxed flex items-start gap-2.5">
                              <span className="text-accent font-mono text-[11px] mt-1 shrink-0">{"//"}</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Used (chips) */}
                      <div className="flex flex-col gap-3">
                        <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                          Tools &amp; Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <Chip key={t} label={t} variant="accent" />
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

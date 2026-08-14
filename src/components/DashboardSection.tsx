"use client";

import React, { useRef, useEffect } from "react";
import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import Card from "./ui/Card";
import { Globe } from "./ui/globe";

type BehindTheScenesItem = {
  title: string;
  desc: string;
};

const behindTheScenesItems: BehindTheScenesItem[] = [
  {
    title: "Project Planning & Strategy",
    desc: "I work closely with clients to define clear goals and develop a strategic roadmap for each project.",
  },
  {
    title: "Design & User Experience",
    desc: "I create intuitive and aesthetically pleasing designs that focus on user-centered experiences.",
  },
  {
    title: "Custom Development",
    desc: "I write clean, efficient code to build custom solutions tailored to the specific needs of the project.",
  },
  {
    title: "API Integration",
    desc: "I integrate third-party services and APIs to enhance functionality and improve user experience.",
  },
  {
    title: "Testing & Optimization",
    desc: "I conduct rigorous testing to ensure functionality, performance, and security across all platforms.",
  },
  {
    title: "Continuous Support & Maintenance",
    desc: "I provide ongoing support and maintenance to ensure the project remains relevant and fully functional over time.",
  },
];

// Duplicate items for infinite marquee scrolling effect
const duplicatedItems = [...behindTheScenesItems, ...behindTheScenesItems];

// Tech stack helper mapper function for respective PNG icons
const getTechIconPath = (techName: string): string => {
  const lower = techName.toLowerCase();
  if (lower.includes("next")) return "/icons/next.js.png";
  if (lower.includes("react")) return "/icons/react.png";
  if (lower.includes("typescript") || lower.includes("ts")) return "/icons/typescript.png";
  if (lower.includes("javascript") || lower.includes("js")) return "/icons/javascript.png";
  if (lower.includes("html")) return "/icons/html.png";
  if (lower.includes("css")) return "/icons/css.png";
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

// All skills from Skills & Technologies section (except Responsive, Web Accessibility, NPM, and Figma)
const skillsList = [
  { name: "React", x: "8%", y: "10%", delay: 0 },
  { name: "Next.js", x: "60%", y: "16%", delay: 0.4 },
  { name: "TypeScript", x: "36%", y: "28%", delay: 0.2 },
  { name: "JavaScript", x: "8%", y: "36%", delay: 0.6 },
  { name: "HTML5", x: "65%", y: "46%", delay: 0.3 },
  { name: "CSS3", x: "38%", y: "54%", delay: 0.8 },
  { name: "Tailwind CSS", x: "6%", y: "64%", delay: 0.5 },
  { name: "PostgreSQL", x: "60%", y: "72%", delay: 0.1 },
  { name: "Git", x: "36%", y: "80%", delay: 0.7 },
  { name: "Supabase", x: "8%", y: "86%", delay: 0.3 },
  { name: "Vercel", x: "65%", y: "92%", delay: 0.9 },
];

export default function DashboardSection() {
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.4; // pixels per frame
    let scrollLeft = container.scrollLeft;

    const step = () => {
      // Pause scroll on hover
      if (container.matches(":hover")) {
        scrollLeft = container.scrollLeft;
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      scrollLeft += speed;
      const halfWidth = container.scrollWidth / 2;
      
      if (scrollLeft >= halfWidth) {
        scrollLeft -= halfWidth;
      }
      
      container.scrollLeft = scrollLeft;
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-16">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full justify-center">
        
        {/* Card 2: Let's Work Together (Col Span 4) */}
        <div className="lg:col-span-4 flex justify-center">
          <Card className="bg-bg-surface/50 w-full lg:w-[403.74px] lg:h-[254.4px] flex flex-col justify-between items-center text-center p-6 md:p-6">
            <div className="flex flex-col gap-0.5 w-full">
              <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
                Let&apos;s work together
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary">
                on your next project
              </h3>
            </div>

            {/* Monogram circle graphic */}
            <div className="w-16 h-16 rounded-full bg-accent text-accent-contrast-text font-display text-xl font-bold flex items-center justify-center shadow-md select-none relative my-3 hover:scale-105 transition-transform duration-200">
              {profile.shortName}
            </div>

            {/* Contact Email Button */}
            <a
              href={`mailto:${profile.email}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-bg-surface-raised border border-border-subtle hover:border-accent/40 rounded-md text-text-secondary hover:text-text-primary text-xs font-mono transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Mail className="h-3.5 w-3.5 text-accent shrink-0" />
              <span>{profile.email}</span>
            </a>
          </Card>
        </div>

        {/* Card 3: Remote Location (Col Span 4) */}
        <div className="lg:col-span-4 flex justify-center">
          <Card className="bg-bg-surface/50 w-full lg:w-[403.74px] lg:h-[254.4px] flex flex-col justify-between overflow-hidden p-6 md:p-6 relative group">
            <div className="flex flex-col gap-0.5 z-10">
              <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
                Remote
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary">
                India
              </h3>
              <p className="text-[11px] text-text-secondary leading-normal">
                I&apos;m very flexible with time zone communications.
              </p>
            </div>

            {/* Interactive 3D Globe */}
            <div className="w-full flex-1 flex items-center justify-center pt-2 select-none">
              <div className="w-[130px] h-[130px] flex items-center justify-center">
                <Globe className="w-[130px] h-[130px]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Card 1: Tech Enthusiast (Col Span 4, Row Span 2 vertically, placed on the right) */}
        <div className="lg:col-span-4 lg:row-span-2 flex justify-center">
          <Card className="bg-bg-surface/50 w-full lg:w-[403.73px] lg:h-[564px] flex flex-col justify-between relative overflow-hidden group">
            <div className="flex flex-col gap-2 z-10">
              <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold text-left">
                Tech Enthusiast
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary leading-snug text-left">
                Always excited to build cool stuff with the latest tech.
              </h3>
            </div>

            {/* Interactive floating skills cloud container */}
            <div className="flex-1 w-full relative min-h-[380px] select-none mt-4">
              {skillsList.map((skill, index) => (
                <motion.span
                  key={index}
                  style={{
                    position: "absolute",
                    left: skill.x,
                    top: skill.y,
                  }}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [0, -10, 0],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: skill.delay,
                  }}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-[11px] bg-bg-surface-raised border border-border-subtle text-text-secondary px-2 py-1 rounded-md shadow-sm hover:border-accent hover:text-accent transition-colors duration-150 shrink-0 cursor-default"
                >
                  <img
                    src={getTechIconPath(skill.name)}
                    alt={skill.name}
                    className="w-3 h-3 object-contain shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span>{skill.name}</span>
                </motion.span>
              ))}
            </div>
          </Card>
        </div>

        {/* Card 4: Behind the Scenes (Col Span 8 on the left) */}
        <div className="lg:col-span-8 flex justify-center">
          <Card className="bg-bg-surface/50 w-full lg:w-[825.06px] lg:h-[292px] flex flex-col gap-4 overflow-hidden justify-between p-6 md:p-6">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold text-left">
                Behind the scenes
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-text-primary text-left">
                My Workflow &amp; Approach
              </h3>
            </div>

            {/* Process Steps scroll view */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-none select-none"
            >
              {duplicatedItems.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[200px] flex-1 bg-bg-surface-raised/40 border border-border-subtle/50 rounded-lg p-4 flex flex-col gap-1.5 text-left"
                >
                  <span className="font-mono text-[10px] text-accent font-bold">
                    0{(index % behindTheScenesItems.length) + 1}
                  </span>
                  <h4 className="font-display text-xs sm:text-sm font-semibold text-text-primary">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-text-secondary leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}

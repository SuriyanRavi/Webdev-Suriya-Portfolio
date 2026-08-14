"use client";

import React from "react";
import { profile } from "@/content/profile";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "PostgreSQL",
  "Git",
  "Supabase",
  "Vercel",
  "NPM",
  "Figma",
  "Responsive Design",
  "Web Accessibility (a11y)",
];

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

export default function About() {
  return (
    <section id="about" className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 border-b border-border-subtle">
      
      {/* Row 1: About Me layout (Avatar on Left, Bio + Socials on Right) */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full">
        
        {/* Left Column: Avatar Photo Frame */}
        <div className="w-full md:w-[350px] lg:w-[400px] shrink-0">
          <div className="p-1.5 bg-gradient-to-tr from-accent to-accent/30 rounded-[32px] overflow-hidden aspect-[4/5] shadow-lg">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-full h-full object-cover rounded-[28px] select-none"
              onError={(e) => {
                // If avatar doesn't exist, display a premium monogram placeholder
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(".avatar-fallback");
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
            <div className="avatar-fallback w-full h-full rounded-[28px] bg-bg-surface flex items-center justify-center font-display text-6xl font-bold text-accent hidden">
              {profile.shortName}
            </div>
          </div>
        </div>

        {/* Right Column: Bio Paragraphs + Socials + status badges */}
        <div className="flex-grow flex flex-col gap-6 text-left">
          <div>
            <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
              More About Me
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mt-2">
              Hi there! I&apos;m <span className="text-accent">{profile.fullName.split(" ")[0]}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-text-secondary text-sm sm:text-base leading-relaxed font-sans">
            <p>
              I&apos;m {profile.fullName}, a passionate frontend developer based in India, dedicated to building impactful and user-friendly web interfaces. I specialize in React, Next.js, and modern frontend technologies, focusing on writing clean, semantic, and highly interactive code.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m brainstorming new ideas, learning emerging tech, or helping others grow. I believe in consistency, curiosity, and leveling up every day.
            </p>
            <p>
              I wake up each day excited to build something meaningful and work towards becoming a top developer!
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 mt-2">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-150"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-150"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-text-secondary hover:text-accent transition-colors duration-150"
              aria-label="Email Contact"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-5 py-2.5 rounded-full border border-border-subtle text-sm font-medium text-text-secondary select-none">
              I Lift
            </span>
            <span className="px-5 py-2.5 rounded-full border border-accent bg-accent/10 text-accent text-sm font-medium select-none">
              I Code
            </span>
            <span className="px-5 py-2.5 rounded-full border border-border-subtle text-sm font-medium text-text-secondary select-none">
              I Vibin&apos;
            </span>
          </div>

        </div>

      </div>

      {/* Row 2: Skills & Technologies Tech Stack (Displayed below) */}
      <div className="mt-24 pt-16 border-t border-border-subtle/30 w-full text-center">
        <div>
          <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent block">
            Skills &amp; Technologies
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary mt-2">
            Tech Stack
          </h3>
        </div>

        {/* Tech Stack Badge List */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          {skills.map((skill) => (
            <span
              key={skill}
              style={{ width: "120px", height: "36px", fontSize: "14px", padding: "6px 12px" }}
              className="inline-flex items-center gap-2 rounded-full bg-bg-surface border border-border-subtle font-mono font-medium text-white select-none justify-center shrink-0 hover:border-accent/30 transition-colors duration-150"
            >
              {/* Icon / Fallback Dot container without outer circle background */}
              <span 
                style={{ width: "20px", height: "20px" }}
                className="flex items-center justify-center shrink-0 overflow-hidden"
              >
                <img
                  src={getTechIconPath(skill)}
                  alt={skill}
                  className="w-full h-full object-contain p-0.5"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement?.querySelector(".fallback-dot");
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <span className="fallback-dot w-1.5 h-1.5 rounded-full bg-accent shrink-0 hidden" />
              </span>
              <span className="truncate">{skill}</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}

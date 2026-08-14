"use client";

import React from "react";
import { ArrowRight, Mail, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import Button from "./ui/Button";
import { fadeInUp } from "@/lib/motion";

export default function Hero() {
  const handleScrollToContact = () => {
    const target = document.querySelector("#contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden max-w-[1280px] mx-auto px-6 md:px-12"
    >
      {/* Decorative Grid Line Accents */}
      <div className="absolute inset-0 grid grid-cols-12 gap-6 pointer-events-none opacity-[0.02] border-x border-border-subtle" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-full border-r border-border-subtle last:border-0" />
        ))}
      </div>

      {/* Main Content Layout */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="flex flex-col items-center justify-center text-center z-10 w-full"
      >
        {/* Centered Column */}
        <div className="flex flex-col items-center gap-6 md:gap-8 max-w-[800px]">
          {/* Custom Project Launched Badge (Design updated per user specs) */}
          <motion.div variants={fadeInUp}>
            <a
              href="https://personal-tracker-app-delta.vercel.app"
              style={{ height: "56.6px" }}
              className="inline-flex items-center gap-3.5 bg-bg-surface border border-border-subtle hover:border-accent/30 px-5 rounded-full transition-all duration-200 group/pill"
            >
              <span className="bg-accent text-accent-contrast-text font-mono text-[12px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shrink-0">
                New
              </span>
              <span className="text-text-secondary group-hover/pill:text-text-primary flex items-center gap-1.5 font-mono text-[18px] uppercase tracking-wider font-semibold">
                Project Launched
                <ChevronRight className="h-4 w-4 text-accent group-hover/pill:translate-x-0.5 transition-transform duration-150 shrink-0" />
              </span>
            </a>
          </motion.div>

          {/* Headline (Design.md §2 & §3: display-xl fluid font, tight line-height, bold) */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-[40px] sm:text-[56px] md:text-[80px] lg:text-[84px] font-bold leading-[1.02] tracking-tighter text-text-primary text-center"
          >
            Turning thoughts into{" "}
            <span className="text-accent relative inline-block">
              beautiful web stories
            </span>
          </motion.h1>

          {/* Stylized Identity Row layout - placed right below heroHeadline */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap text-lg sm:text-2xl font-semibold text-text-primary mt-2"
          >
            <span className="font-display font-medium text-white">Hello, I&apos;m</span>
            
            <span className="bg-accent text-accent-contrast-text px-4 py-1.5 transform -skew-x-12 inline-flex items-center rounded-[2px] shadow-sm">
              <span className="transform skew-x-12 inline-block font-display font-bold">
                {profile.fullName}
              </span>
            </span>

            <div className="relative w-12 h-12 rounded-full border-2 border-accent overflow-hidden bg-bg-surface-raised flex items-center justify-center shrink-0 shadow-md mx-1 select-none">
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-text-secondary bg-bg-surface-raised">
                {profile.shortName}
              </div>
              <img
                src={profile.avatarUrl}
                alt={`${profile.fullName} Avatar`}
                className="absolute inset-0 w-full h-full object-cover z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <span className="font-display font-medium text-white">A {profile.tagline}</span>
          </motion.div>

          {/* Positioning statement */}
          {profile.heroSubtext && (
            <motion.p
              variants={fadeInUp}
              className="font-sans text-base sm:text-lg md:text-xl text-text-secondary max-w-[640px] leading-relaxed text-center"
            >
              {profile.heroSubtext}
            </motion.p>
          )}

          {/* Centered Dual-Action: Connect Button + Email Link */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 w-full sm:w-auto"
          >
            <Button
              variant="primary"
              onClick={handleScrollToContact}
              className="group !rounded-full !px-6 !py-3 flex items-center gap-3 text-sm font-sans"
            >
              <span>Let&apos;s Connect</span>
              <span className="bg-accent-contrast-text text-accent rounded-full p-1 group-hover:scale-110 transition-transform duration-150">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Button>
            
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 text-text-secondary hover:text-accent font-mono text-sm transition-colors duration-150 py-2 focus-visible:outline-2 focus-visible:outline-accent outline-offset-4"
            >
              <Mail className="h-4.5 w-4.5" />
              {profile.email}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

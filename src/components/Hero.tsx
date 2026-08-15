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
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
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
        <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 max-w-[840px] w-full">
          {/* Custom Project Launched Badge */}
          <motion.div variants={fadeInUp}>
            <a
              href="https://personal-tracker-app-delta.vercel.app"
              className="inline-flex items-center gap-3 bg-bg-surface border border-border-subtle hover:border-accent/30 px-4 sm:px-5 py-2.5 min-h-[48px] sm:min-h-[52px] rounded-full transition-all duration-200 group/pill shadow-sm"
            >
              <span className="bg-accent text-accent-contrast-text font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shrink-0">
                New
              </span>
              <span className="text-text-secondary group-hover/pill:text-text-primary flex items-center gap-1.5 font-mono text-sm sm:text-base uppercase tracking-wider font-semibold">
                Project Launched
                <ChevronRight className="h-4 w-4 text-accent group-hover/pill:translate-x-0.5 transition-transform duration-150 shrink-0" />
              </span>
            </a>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[76px] xl:text-[82px] font-bold leading-[1.1] sm:leading-[1.08] md:leading-[1.04] tracking-tight text-text-primary text-center max-w-[960px] mx-auto px-2"
          >
            <span className="inline-block">Turning thoughts into</span>{" "}
            <span className="text-accent relative inline-block">
              beautiful web stories
            </span>
          </motion.h1>

          {/* Stylized Identity Row layout */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mt-2 px-2"
          >
            <span className="font-display font-medium text-white">Hello, I&apos;m</span>
            
            <span className="bg-accent text-accent-contrast-text px-3.5 sm:px-4 py-1.5 transform -skew-x-12 inline-flex items-center rounded-[2px] shadow-sm">
              <span className="transform skew-x-12 inline-block font-display font-bold">
                {profile.fullName}
              </span>
            </span>

            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-accent overflow-hidden bg-bg-surface-raised flex items-center justify-center shrink-0 shadow-md mx-0.5 select-none">
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
              className="font-sans text-base sm:text-lg md:text-xl text-text-secondary max-w-[640px] leading-relaxed text-center px-4"
            >
              {profile.heroSubtext}
            </motion.p>
          )}

          {/* Centered Dual-Action: Connect Button + Email Link */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-5 w-full sm:w-auto px-4"
          >
            <Button
              variant="primary"
              onClick={handleScrollToContact}
              className="group !rounded-full !px-8 !py-4 flex items-center justify-center gap-3 text-base font-semibold font-sans w-full sm:w-auto min-h-[52px]"
            >
              <span>Let&apos;s Connect</span>
              <span className="bg-accent-contrast-text text-accent rounded-full p-1 group-hover:scale-110 transition-transform duration-150">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
            
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center gap-2.5 text-text-secondary hover:text-accent font-mono text-sm sm:text-base transition-colors duration-150 py-2.5 px-4 focus-visible:outline-2 focus-visible:outline-accent outline-offset-4 min-h-[48px]"
            >
              <Mail className="h-5 w-5 shrink-0" />
              <span>{profile.email}</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

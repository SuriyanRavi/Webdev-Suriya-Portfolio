"use client";

import React from "react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/content/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-bg-canvas border-t border-border-subtle overflow-hidden shrink-0 mt-auto">
      
      {/* Repeating Marquee (Outlined/low-opacity name & role) */}
      <div
        className="w-full border-b border-border-subtle py-6 select-none bg-bg-surface/30 overflow-hidden relative"
        aria-hidden="true"
      >
        <div className="flex w-[200%] whitespace-nowrap animate-marquee">
          {/* Slide 1 */}
          <div className="flex justify-around min-w-full text-[10vw] font-display font-bold uppercase tracking-tighter text-text-primary/5">
            <span>{profile.fullName}</span>
            <span>&bull;</span>
            <span>{profile.tagline}</span>
            <span>&bull;</span>
          </div>
          {/* Slide 2 */}
          <div className="flex justify-around min-w-full text-[10vw] font-display font-bold uppercase tracking-tighter text-text-primary/5">
            <span>{profile.fullName}</span>
            <span>&bull;</span>
            <span>{profile.tagline}</span>
            <span>&bull;</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content Directory */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">
        
        {/* Col 1: Identity & Trustpilot */}
        <div className="md:col-span-4 flex flex-col gap-4 items-start text-left">
          {/* Name: 24px */}
          <span style={{ fontSize: "24px" }} className="font-display font-bold tracking-tight text-white leading-tight">
            {profile.fullName}
          </span>
          {/* Description: 16px */}
          <p style={{ fontSize: "16px" }} className="text-text-secondary max-w-[320px] font-sans leading-relaxed">
            Building web solutions where clean design and powerful functionality work in harmony.
          </p>
          
          {/* Social Row */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-150"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/917604889657"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-150"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436.002 9.858-4.395 9.861-9.81.002-2.624-1.02-5.09-2.885-6.958-1.864-1.867-4.343-2.894-6.969-2.895-5.437 0-9.86 4.397-9.863 9.814-.001 1.716.452 3.39 1.309 4.866L1.87 21.03l4.777-1.249zm11.238-6.903c-.29-.145-1.72-.848-1.986-.944-.266-.096-.46-.145-.653.145-.193.29-.748.944-.917 1.138-.17.194-.339.218-.63.073-.29-.145-1.223-.45-2.33-1.439-.86-.767-1.442-1.716-1.611-2.007-.17-.29-.018-.447.127-.591.13-.13.29-.339.435-.508.145-.17.193-.29.29-.484.097-.193.048-.363-.024-.508-.073-.145-.653-1.573-.895-2.153-.235-.564-.476-.488-.653-.497-.169-.008-.363-.01-.557-.01-.193 0-.508.073-.774.363-.266.29-1.016.992-1.016 2.42 0 1.427 1.04 2.806 1.185 3.001.145.193 2.046 3.125 4.957 4.38.692.298 1.233.477 1.654.61.695.22 1.33.19 1.83.115.558-.084 1.72-.702 1.962-1.38.242-.678.242-1.258.17-1.38-.073-.122-.266-.194-.556-.339z" />
              </svg>
            </a>
          </div>

          {/* Trustpilot Badge */}
          <div className="mt-6 flex self-start">
            <a
              href="https://www.trustpilot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#00b67a] rounded-[4px] text-black font-sans font-bold text-[11px] transition-colors duration-150 select-none shadow-sm"
            >
              <span className="text-[#191919]">Review us on</span>
              <span className="flex items-center gap-0.5 text-[#00b67a]">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                Trustpilot
              </span>
            </a>
          </div>
        </div>

        {/* Col 2: The Website Sitemap */}
        <div className="md:col-span-2 flex flex-col gap-4 items-start text-left">
          {/* Header: 18px */}
          <h4 style={{ fontSize: "18px" }} className="font-display font-bold text-white uppercase tracking-wider">
            The Website
          </h4>
          {/* Points: 16px */}
          <ul style={{ fontSize: "16px" }} className="flex flex-col gap-2.5 font-sans">
            <li>
              <a href="#home" className="text-text-secondary hover:text-accent transition-colors duration-150">
                Home
              </a>
            </li>
            <li>
              <a href="#work" className="text-text-secondary hover:text-accent transition-colors duration-150">
                Projects
              </a>
            </li>
            <li>
              <a href="#about" className="text-text-secondary hover:text-accent transition-colors duration-150">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="text-text-secondary hover:text-accent transition-colors duration-150">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Projects list */}
        <div className="md:col-span-2 flex flex-col gap-4 items-start text-left">
          {/* Header: 18px */}
          <h4 style={{ fontSize: "18px" }} className="font-display font-bold text-white uppercase tracking-wider">
            Projects
          </h4>
          {/* Points: 16px */}
          <ul style={{ fontSize: "16px" }} className="flex flex-col gap-2.5 font-sans">
            <li>
              <a
                href="https://personal-tracker-app-delta.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-150"
              >
                Personal-Tracker-App
              </a>
            </li>
            <li>
              <a
                href="https://aznav-technologies-software.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-150"
              >
                Aznav Technologies
              </a>
            </li>
            <li>
              <a
                href="https://shanthi-contruction.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-150"
              >
                Shanthi Construction
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Bio / Call to action */}
        <div className="md:col-span-4 flex flex-col gap-4 items-start text-left">
          {/* Description: 16px */}
          <p style={{ fontSize: "16px" }} className="text-text-secondary leading-relaxed font-sans">
            I&apos;m open to freelance projects, full-time roles, or collaborative ideas. Connect and build something meaningful together.
          </p>
          
          {/* Direct contacts */}
          <div className="flex flex-col gap-2 mt-2 w-full">
            {/* Email: 16px */}
            <a
              href={`mailto:${profile.email}`}
              style={{ fontSize: "16px" }}
              className="inline-flex items-center gap-2 text-[#00a8ff] hover:text-accent transition-colors duration-150 font-mono"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>{profile.email}</span>
            </a>
            {/* Phone: 16px */}
            <a
              href="tel:+917604889657"
              style={{ fontSize: "16px" }}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-150 font-mono"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>+91 7604889657</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Horizontal Bar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <span className="text-xs text-text-secondary font-sans text-left">
          Copyright &copy; {currentYear} {profile.fullName}. All rights reserved.
        </span>

        {/* Back to Top */}
        <button
          onClick={handleBackToTop}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-accent outline-offset-4 cursor-pointer"
          aria-label="Scroll back to top"
        >
          Back to Top <ArrowUp className="h-3 w-3" />
        </button>
      </div>

    </footer>
  );
}

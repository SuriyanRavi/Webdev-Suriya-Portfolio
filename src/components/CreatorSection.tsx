"use client";

import React from "react";
import { profile } from "@/content/profile";

export default function CreatorSection() {
  return (
    <section id="creator" className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24 border-b border-border-subtle">
      {/* Section Eyebrow, Heading and Subtext */}
      <div className="mb-8 sm:mb-12 md:mb-16">
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
          Beyond Roles
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2">
          Creator
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm mt-2 font-sans">
          Leading my own agency and building community with premium content.
        </p>
      </div>

      {/* Centered Content Creator Card Container */}
      <div className="flex justify-center w-full">
        <div
          className="w-full max-w-[680px] min-h-[380px] sm:min-h-[410px] bg-[#1a1424]/40 border border-[#442c5c]/40 rounded-2xl p-5 sm:p-8 flex flex-col justify-between gap-5 sm:gap-6 shadow-lg relative overflow-hidden group hover:border-[#6a4294]/50 transition-all duration-300"
        >
          
          {/* Subtle Pink/Purple Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

          {/* Header row: Avatar + Badge + Title */}
          <div className="flex items-start gap-3.5 sm:gap-4 z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-[#442c5c]/60 overflow-hidden shrink-0 select-none bg-bg-surface-raised">
              <img
                src={profile.avatarUrl}
                alt="Creator Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.parentElement?.querySelector(".avatar-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="avatar-fallback w-full h-full flex items-center justify-center font-display text-lg sm:text-xl font-bold text-[#d8b4fe] hidden">
                {profile.shortName}
              </div>
            </div>

            <div className="flex flex-col gap-1 items-start text-left">
              <span className="inline-flex px-2 sm:px-2.5 py-0.5 rounded-full bg-[#3b0764]/40 border border-[#6b21a8]/40 text-[9px] sm:text-[10px] font-mono font-bold text-[#d8b4fe] uppercase tracking-wider select-none">
                Creator
              </span>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                Content Creator
              </h3>
              <p className="text-xs text-text-secondary font-sans">
                Sharing dev, startup, and build-in-public content weekly.
              </p>
            </div>
          </div>

          {/* 3 Metric Info Boxes (Grid columns) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 z-10">
            {/* Box 1 */}
            <div className="bg-[#120d1a]/55 border border-[#3b2552]/40 p-2.5 sm:p-3.5 md:p-4 rounded-xl flex flex-col gap-0.5 sm:gap-1 text-left">
              <span className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                2.2k+
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-text-secondary font-medium leading-tight font-sans">
                Instagram followers
              </span>
            </div>
            {/* Box 2 */}
            <div className="bg-[#120d1a]/55 border border-[#3b2552]/40 p-2.5 sm:p-3.5 md:p-4 rounded-xl flex flex-col gap-0.5 sm:gap-1 text-left">
              <span className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                Weekly
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-text-secondary font-medium leading-tight font-sans">
                Reels &amp; carousels
              </span>
            </div>
            {/* Box 3 */}
            <div className="bg-[#120d1a]/55 border border-[#3b2552]/40 p-2.5 sm:p-3.5 md:p-4 rounded-xl flex flex-col gap-0.5 sm:gap-1 text-left">
              <span className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                Deep dives
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] text-text-secondary font-medium leading-tight font-sans">
                Playbooks &amp; wins
              </span>
            </div>
          </div>

          {/* Detailed Paragraph */}
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed text-left z-10 font-sans">
            Documenting builds, sharing system design breakdowns, and highlighting lessons from shipping products and running an agency.
          </p>

          {/* Action Link Button (Instagram Gradient theme) */}
          <a
            href="https://www.instagram.com/flim_myself"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto sm:min-w-[238px] px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-150 shadow-md select-none z-10 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DD2476] min-h-[44px]"
          >
            <span>View Instagram profile</span>
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
}

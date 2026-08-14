"use client";

import React from "react";
import { profile } from "@/content/profile";

export default function CreatorSection() {
  return (
    <section id="creator" className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 border-b border-border-subtle">
      {/* Section Eyebrow, Heading and Subtext */}
      <div className="mb-12 md:mb-16">
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
          Beyond Roles
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2">
          Creator
        </h2>
        <p className="text-text-secondary text-sm mt-2 font-sans">
          Leading my own agency and building community with premium content.
        </p>
      </div>

      {/* Centered Content Creator Card Container */}
      <div className="flex justify-center w-full">
        <div
          style={{ width: "100%", maxWidth: "680px", minHeight: "410px" }}
          className="bg-[#1a1424]/40 border border-[#442c5c]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-lg relative overflow-hidden group hover:border-[#6a4294]/50 transition-all duration-300"
        >
          
          {/* Subtle Pink/Purple Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

          {/* Header row: Avatar + Badge + Title */}
          <div className="flex items-start gap-4 z-10">
            <div className="w-14 h-14 rounded-xl border border-[#442c5c]/60 overflow-hidden shrink-0 select-none bg-bg-surface-raised">
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
              <div className="avatar-fallback w-full h-full flex items-center justify-center font-display text-xl font-bold text-[#d8b4fe] hidden">
                {profile.shortName}
              </div>
            </div>

            <div className="flex flex-col gap-1 items-start text-left">
              <span className="inline-flex px-2.5 py-0.5 rounded-full bg-[#3b0764]/40 border border-[#6b21a8]/40 text-[10px] font-mono font-bold text-[#d8b4fe] uppercase tracking-wider select-none">
                Creator
              </span>
              <h3 className="font-display text-xl font-bold text-white leading-tight">
                Content Creator
              </h3>
              <p className="text-xs text-text-secondary font-sans">
                Sharing dev, startup, and build-in-public content weekly.
              </p>
            </div>
          </div>

          {/* 3 Metric Info Boxes (Grid columns) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 z-10">
            {/* Box 1 */}
            <div className="bg-[#120d1a]/55 border border-[#3b2552]/40 p-3 sm:p-4 rounded-xl flex flex-col gap-1 text-left">
              <span className="font-display text-base sm:text-lg md:text-xl font-bold text-white">
                2.1k+
              </span>
              <span className="text-[9px] sm:text-[10px] text-text-secondary font-medium leading-tight font-sans">
                Instagram followers
              </span>
            </div>
            {/* Box 2 */}
            <div className="bg-[#120d1a]/55 border border-[#3b2552]/40 p-3 sm:p-4 rounded-xl flex flex-col gap-1 text-left">
              <span className="font-display text-base sm:text-lg md:text-xl font-bold text-white">
                Weekly
              </span>
              <span className="text-[9px] sm:text-[10px] text-text-secondary font-medium leading-tight font-sans">
                Reels &amp; carousels
              </span>
            </div>
            {/* Box 3 */}
            <div className="bg-[#120d1a]/55 border border-[#3b2552]/40 p-3 sm:p-4 rounded-xl flex flex-col gap-1 text-left">
              <span className="font-display text-base sm:text-lg md:text-xl font-bold text-white">
                Deep dives
              </span>
              <span className="text-[9px] sm:text-[10px] text-text-secondary font-medium leading-tight font-sans">
                Playbooks &amp; wins
              </span>
            </div>
          </div>

          {/* Detailed Paragraph */}
          <p className="text-sm text-text-secondary leading-relaxed text-left z-10 font-sans">
            Documenting builds, sharing system design breakdowns, and highlighting lessons from shipping products and running an agency.
          </p>

          {/* Action Link Button (Instagram Gradient theme) with custom width */}
          <a
            href="https://www.instagram.com/flim_myself"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: "238.34px" }}
            className="self-start py-3 rounded-xl bg-gradient-to-r from-[#FF512F] to-[#DD2476] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-150 shadow-md select-none z-10 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DD2476]"
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

"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/content/projects";
import Card from "./ui/Card";
import Chip from "./ui/Chip";

type ProjectCardProps = {
  project: Project;
  onOpenDetails: (project: Project) => void;
};

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  // Determine if we should display the real image or the abstract mockup fallback
  const hasRealThumbnail = project.thumbnail && 
                           project.thumbnail !== "" && 
                           !project.thumbnail.includes("placeholder");

  return (
    <Card
      interactive
      onClick={() => onOpenDetails(project)}
      className="group flex flex-col justify-between h-full !p-0"
      as="article"
    >
      {/* Thumbnail / Graphic Section */}
      <div className="relative aspect-video w-full bg-bg-surface-raised border-b border-border-subtle overflow-hidden flex items-center justify-center select-none">
        {/* Dynamic ambient hover glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,255,61,0.03),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(198,255,61,0.06),transparent_70%)] transition-colors duration-200 z-10 pointer-events-none" />
        
        {hasRealThumbnail ? (
          /* Render ONLY the image. Fallback mockup is completely omitted to avoid overlay leak */
          <img
            src={project.thumbnail}
            alt={`${project.title} Thumbnail`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-300 ease-out z-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          /* Render the premium code mockup ONLY if no real thumbnail is present */
          <div className="font-mono text-[10px] md:text-xs text-text-secondary/20 group-hover:text-accent/30 transition-colors duration-200 p-4 w-full h-full flex flex-col justify-between absolute inset-0 z-0">
            <div className="flex items-center justify-between border-b border-border-subtle/30 pb-2">
              <span>index.tsx</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success/60" />
            </div>
            <div className="flex-1 flex items-center justify-center py-4 font-bold text-center">
              &lt;{project.title} /&gt;
            </div>
            <div className="text-right text-[8px] text-text-tertiary/40">
              {project.stack.join(" + ")}
            </div>
          </div>
        )}

        {/* Diagonal border stripe */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-accent/5 border-t border-l border-border-subtle/30 transform rotate-45 translate-x-4 translate-y-4 z-10 pointer-events-none" />
      </div>

      {/* Description / Information Section */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors duration-150">
              {project.title}
            </h3>
            <span className="text-text-secondary group-hover:text-accent transition-colors duration-150 shrink-0">
              <ArrowUpRight className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Chip key={tech} label={tech} variant="default" />
          ))}
          {project.stack.length > 4 && (
            <Chip label={`+${project.stack.length - 4} more`} variant="default" />
          )}
        </div>
      </div>
    </Card>
  );
}

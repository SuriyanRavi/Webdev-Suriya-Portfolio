"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "article" | "section" | "a";
  href?: string;
  target?: string;
  rel?: string;
  interactive?: boolean;
};

export default function Card({
  children,
  className = "",
  onClick,
  as = "div",
  href,
  target,
  rel,
  interactive = false,
}: CardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = as;

  // Base and interactive styles according to Design.md §5
  // Tailwind v4 uses --radius-lg for rounded-lg, which is defined as 16px in globals.css
  const baseStyles = "bg-bg-surface border border-border-subtle rounded-lg p-6 md:p-8 overflow-hidden transition-colors duration-200 ease-out";
  const interactiveStyles = interactive
    ? "cursor-pointer hover:border-accent/30 focus-visible:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas shadow-card hover:shadow-card-hover"
    : "";

  const hoverAnimation = interactive && !shouldReduceMotion
    ? { y: -4 }
    : {};

  if (as === "a" || href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`${baseStyles} ${interactiveStyles} block ${className}`}
        onClick={onClick}
        whileHover={hoverAnimation}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.a>
    );
  }

  if (interactive) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={hoverAnimation}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`${baseStyles} ${interactiveStyles} ${className}`}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Tag className={`${baseStyles} ${className}`}>
      {children}
    </Tag>
  );
}

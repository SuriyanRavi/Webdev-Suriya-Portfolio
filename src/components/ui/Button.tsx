"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  // Baseline styles following Design.md specifications
  const baseStyles = "inline-flex items-center justify-center font-mono text-[13px] tracking-[0.04em] uppercase font-medium rounded-md px-6 py-3 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors duration-150";

  let variantStyles = "";
  if (variant === "primary") {
    variantStyles = "bg-accent text-accent-contrast-text hover:bg-accent/90 active:bg-accent/95 shadow-card";
  } else if (variant === "secondary") {
    variantStyles = "border border-border-subtle text-text-primary bg-transparent hover:border-accent hover:text-accent";
  } else if (variant === "ghost") {
    variantStyles = "border-none bg-transparent text-text-primary hover:text-accent p-0 normal-case tracking-normal font-sans font-normal inline-flex items-center gap-1 group";
  }

  const hoverAnimation = shouldReduceMotion || variant === "ghost"
    ? {}
    : { scale: 1.02, filter: "brightness(1.08)" };

  const tapAnimation = shouldReduceMotion || variant === "ghost"
    ? {}
    : { scale: 0.98 };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </motion.button>
  );
}

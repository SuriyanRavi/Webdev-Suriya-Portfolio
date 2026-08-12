import React from "react";

type ChipProps = {
  label: string;
  variant?: "default" | "accent" | "status";
  icon?: React.ReactNode;
  className?: string;
};

export default function Chip({
  label,
  variant = "default",
  icon,
  className = "",
}: ChipProps) {
  let styleClasses = "inline-flex items-center gap-1.5 font-mono text-[11px] md:text-[12px] tracking-[0.04em] uppercase font-medium px-3 py-1 rounded-full border transition-colors duration-150";

  if (variant === "default") {
    styleClasses += " bg-bg-surface-raised border-border-subtle text-text-secondary hover:text-text-primary";
  } else if (variant === "accent") {
    styleClasses += " bg-accent-muted border-accent/20 text-accent";
  } else if (variant === "status") {
    styleClasses += " bg-bg-surface border-border-subtle text-text-primary rounded-full";
  }

  return (
    <span className={`${styleClasses} ${className}`}>
      {variant === "status" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}

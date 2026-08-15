import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  id: string;
};

export default function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="font-mono text-[12px] tracking-[0.04em] uppercase text-text-secondary">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={`bg-bg-surface border border-border-subtle rounded-md px-4 py-3.5 text-text-primary text-base md:text-sm font-sans focus:border-accent focus:ring-3 focus:ring-accent-muted outline-none transition-all duration-150 placeholder:text-text-tertiary/60 resize-y ${
          error ? "border-danger focus:border-danger focus:ring-danger/20" : ""
        } ${className}`}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="text-xs text-danger font-mono mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  icon?: string;
  details?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  onItemClick?: (item: CarouselItem, index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;
const RADIUS_X = 220;
const RADIUS_Y = 100;

function getItemPosition(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * RADIUS_X;
  const y = -Math.cos(angle) * RADIUS_Y;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  onItemClick,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex] || items[0];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-8 outline-none w-full max-w-full overflow-hidden py-4",
        className,
      )}
    >
      {/* Circular track */}
      <div className="relative h-[290px] sm:h-[310px] w-full max-w-[560px] mx-auto flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total);
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  if (isActive && onItemClick) {
                    onItemClick(item, i);
                  } else {
                    goTo(i);
                    if (onItemClick) {
                      onItemClick(item, i);
                    }
                  }
                }}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-36 w-48 sm:w-52 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 p-4 backdrop-blur-md transition-all duration-300 text-left",
                  isActive
                    ? "border-accent/40 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] ring-1 ring-accent/30 bg-gradient-to-b from-zinc-800/95 to-zinc-950/95"
                    : "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] hover:border-white/20",
                )}
                style={{ transformOrigin: "center center" }}
              >
                <div className="flex items-center justify-between w-full gap-2">
                  {item.icon && (
                    <span className="text-xl sm:text-2xl select-none leading-none">
                      {item.icon}
                    </span>
                  )}
                  {item.tag && (
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider transition-colors",
                      isActive
                        ? "bg-accent/15 text-accent border border-accent/20"
                        : "bg-white/10 text-white/70"
                    )}>
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <h3
                    className={cn(
                      "font-display font-semibold leading-tight transition-colors duration-300",
                      isActive
                        ? "text-white text-sm sm:text-base font-bold"
                        : "text-white/80 text-xs sm:text-sm",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 text-[11px] sm:text-xs leading-relaxed transition-colors duration-300 font-sans",
                      isActive ? "text-text-secondary" : "text-white/40",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Center content counter */}
      <motion.div
        key={activeItem?.id || activeIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-8"
      >
        <span className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-white/90">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="mt-0.5 text-[11px] font-mono uppercase tracking-wider text-text-tertiary">
          of {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border-subtle bg-bg-surface-raised/80 text-text-secondary backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === activeIndex
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Next item"
          className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border-subtle bg-bg-surface-raised/80 text-text-secondary backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;

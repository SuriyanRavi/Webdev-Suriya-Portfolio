"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services, Service } from "@/content/services";
import Card from "./ui/Card";

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Ref and state for high-fidelity lerp-based smooth drag scrolling
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const targetScrollLeft = useRef(0);
  const currentScrollLeft = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Smooth linear-interpolation (lerp) animation loop
  const smoothScrollLoop = () => {
    if (!scrollRef.current) return;
    
    const diff = targetScrollLeft.current - currentScrollLeft.current;
    if (Math.abs(diff) > 0.5) {
      // 0.08 multiplier makes it feel slow, controlled, and extremely damp/premium
      currentScrollLeft.current += diff * 0.08;
      scrollRef.current.scrollLeft = currentScrollLeft.current;
      animationFrameId.current = requestAnimationFrame(smoothScrollLoop);
    } else {
      currentScrollLeft.current = targetScrollLeft.current;
      scrollRef.current.scrollLeft = targetScrollLeft.current;
      animationFrameId.current = null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    startX.current = e.pageX - container.offsetLeft;
    scrollLeftStart.current = container.scrollLeft;
    targetScrollLeft.current = container.scrollLeft;
    currentScrollLeft.current = container.scrollLeft;
    setDragDistance(0);
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;
    
    const x = e.pageX - container.offsetLeft;
    // 0.8 multiplier keeps the tracking slow, precise and comfortable
    const walk = (x - startX.current) * 0.8;
    targetScrollLeft.current = scrollLeftStart.current - walk;
    
    // Clamp targets within container bounds
    const maxScroll = container.scrollWidth - container.clientWidth;
    targetScrollLeft.current = Math.max(0, Math.min(targetScrollLeft.current, maxScroll));
    
    setDragDistance(Math.abs(x - startX.current));

    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(smoothScrollLoop);
    }
  };

  const handleCardClick = (service: Service) => {
    // Prevent opening popups if the user was performing a drag motion
    if (dragDistance < 6) {
      setSelectedService(service);
    }
  };

  return (
    <section id="services" className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24 border-b border-border-subtle overflow-hidden">
      {/* Header with scroll animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 sm:mb-12 md:mb-16 text-center flex flex-col items-center justify-center"
      >
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
          Capabilities
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2">
          What I <span className="text-accent">Provide</span>
        </h2>
      </motion.div>

      {/* Horizontal Scroll Services container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 sm:gap-6 overflow-x-auto py-4 sm:py-6 -my-4 sm:-my-6 pb-6 sm:pb-8 scrollbar-none w-full select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            // Lift zIndex to 10 on hover to prevent neighboring cards from overlapping borders
            whileHover={{ scale: 1.03, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            onClick={() => handleCardClick(service)}
            className="snap-start shrink-0 w-[260px] sm:w-[300px] md:w-[340px] relative"
          >
            <Card
              interactive={false} // Disable default card green hover outlines
              className="flex flex-col justify-between h-[270px] sm:h-[280px] bg-bg-surface/30 group hover:bg-bg-surface/60 cursor-pointer select-none p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Icon Container */}
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg bg-bg-surface-raised border border-border-subtle flex items-center justify-center text-xl sm:text-2xl select-none transition-colors duration-200">
                  {service.icon}
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <h3 className="font-display text-base sm:text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-150">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Learn More link */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border-subtle/30 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary group-hover:text-white transition-colors duration-150">
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transform transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Popup Box Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#131316] border border-[#2a2a2f] rounded-2xl w-full max-w-[500px] p-6 sm:p-8 shadow-2xl relative z-10 text-left overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-text-secondary hover:text-white hover:bg-bg-surface transition-colors duration-150 cursor-pointer focus-visible:outline-none"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon */}
              <div className="text-3xl sm:text-4xl pb-3 sm:pb-4 select-none leading-none">
                {selectedService.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight pb-3 sm:pb-4 pr-8">
                {selectedService.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans pb-4 sm:pb-6">
                {selectedService.description}
              </p>

              {/* Divider */}
              <div className="w-full border-t border-[#2a2a2f] mb-4 sm:mb-6" />

              {/* Details Header */}
              <h4 className="font-display text-base sm:text-lg font-semibold text-white pb-2 sm:pb-3">
                Details
              </h4>

              {/* Details Content */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                {selectedService.details}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

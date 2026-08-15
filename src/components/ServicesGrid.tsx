"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services, Service } from "@/content/services";
import { CircularCarousel, CarouselItem } from "@/components/ui/circular-carousel";

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleItemClick = (item: CarouselItem) => {
    const matched = services.find((s) => s.id === item.id);
    if (matched) {
      setSelectedService(matched);
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
        <p className="text-text-secondary text-xs sm:text-sm mt-3 max-w-md font-sans">
          Click or navigate through the services to explore my core skill sets.
        </p>
      </motion.div>

      {/* 3D Circular Carousel showcasing Services Content */}
      <div className="w-full flex items-center justify-center py-4 sm:py-8">
        <CircularCarousel
          items={services}
          onItemClick={handleItemClick}
          autoPlay={true}
          autoPlayInterval={3500}
        />
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

              {/* Title & Tag */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight pr-6">
                  {selectedService.title}
                </h3>
                {selectedService.tag && (
                  <span className="rounded-full bg-accent/15 border border-accent/30 text-accent px-2.5 py-0.5 text-[10px] font-mono uppercase font-semibold">
                    {selectedService.tag}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans pb-4 sm:pb-6">
                {selectedService.description}
              </p>

              {/* Divider */}
              <div className="w-full border-t border-[#2a2a2f] mb-4 sm:mb-6" />

              {/* Details Header */}
              <h4 className="font-display text-base sm:text-lg font-semibold text-white pb-2 sm:pb-3">
                Overview &amp; Deliverables
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

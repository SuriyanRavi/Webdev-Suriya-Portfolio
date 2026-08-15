"use client";

import React, { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services, Service } from "@/content/services";
import CircularCarousel from "./ui/circular-carousel";
import Button from "./ui/Button";

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const carouselItems = services.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    tag: s.tag,
    icon: s.icon,
    details: s.details,
  }));

  const activeService = services[activeIdx] || services[0];

  return (
    <section id="services" className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24 border-b border-border-subtle overflow-hidden">
      {/* Header with scroll animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 sm:mb-12 text-center flex flex-col items-center justify-center"
      >
        <span className="font-mono text-[11px] tracking-[0.04em] uppercase text-accent font-semibold">
          Capabilities
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-text-primary mt-2">
          What I <span className="text-accent">Provide</span>
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm max-w-[500px] mt-2 font-sans">
          Interactive solutions crafted with modern architectures, performance optimization, and refined aesthetics.
        </p>
      </motion.div>

      {/* Circular Carousel Component Integration */}
      <div className="relative w-full flex flex-col items-center justify-center my-4">
        <CircularCarousel
          items={carouselItems}
          activeIndex={activeIdx}
          onActiveChange={(idx) => setActiveIdx(idx)}
          onItemClick={(item) => {
            const matched = services.find((s) => s.id === item.id);
            if (matched) {
              setSelectedService(matched);
            }
          }}
          autoPlay={true}
          autoPlayInterval={4500}
        />

        {/* Action button to explore active service details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-center"
        >
          <Button
            variant="secondary"
            onClick={() => setSelectedService(activeService)}
            className="group !py-2.5 !px-5 !rounded-full text-xs font-mono flex items-center gap-2 border-border-subtle hover:border-accent"
          >
            <span>Learn more about {activeService.title}</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform duration-150" />
          </Button>
        </motion.div>
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
              className="bg-[#131316] border border-[#2a2a2f] rounded-2xl w-full max-w-[520px] p-6 sm:p-8 shadow-2xl relative z-10 text-left overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-text-secondary hover:text-white hover:bg-bg-surface transition-colors duration-150 cursor-pointer focus-visible:outline-none"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Tag & Icon header */}
              <div className="flex items-center gap-3 pb-3 sm:pb-4">
                <span className="text-3xl sm:text-4xl select-none leading-none">
                  {selectedService.icon}
                </span>
                {selectedService.tag && (
                  <span className="rounded-full px-3 py-0.5 text-xs font-mono font-medium uppercase tracking-wider bg-accent/15 text-accent border border-accent/20">
                    {selectedService.tag}
                  </span>
                )}
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
                Approach &amp; Delivery
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

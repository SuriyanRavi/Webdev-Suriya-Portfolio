"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Button from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const menuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for header background blur (Design.md §2: translucent after ~40px)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active link detection
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement | null;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trap focus inside mobile menu when open
  useEffect(() => {
    if (mobileMenuOpen && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll(
        'a, button, [tabindex="0"]'
      );
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              last.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleTab);
      return () => window.removeEventListener("keydown", handleTab);
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
      {/* Navbar Container */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
          scrolled
            ? "bg-bg-surface/80 border-b border-border-subtle backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Monogram Logo (Design.md §2: monospace, bold) */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="font-mono text-xl md:text-2xl font-bold tracking-tight text-text-primary focus-visible:outline-2 focus-visible:outline-accent outline-offset-4"
          aria-label="SR Monogram Home"
        >
          SR<span className="text-accent">.</span>
        </a>

        {/* Desktop Links (Design.md §2: 4-5 text links, active-link underline draw) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative py-2 font-mono text-xs md:text-sm uppercase tracking-wider transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                  isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border-subtle hover:border-accent hover:text-accent text-text-secondary focus-visible:ring-2 focus-visible:ring-accent outline-none transition-all duration-150 cursor-pointer"
            aria-label={`Toggle theme (currently ${theme})`}
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Primary CTA (Design.md §2: visually distinct from links) */}
          <Button variant="primary" onClick={() => {
            const target = document.querySelector("#contact");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}>
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Theme Toggler for Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-border-subtle text-text-secondary focus-visible:ring-2 focus-visible:ring-accent outline-none cursor-pointer"
            aria-label={`Toggle theme`}
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 rounded-full text-text-primary border border-border-subtle hover:border-accent outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu (Design.md §5: full-viewport overlay menu, large links) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.98 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg-canvas px-6 py-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Close controls */}
            <div className="flex items-center justify-between h-[72px] shrink-0">
              <span className="font-mono text-xl font-bold text-text-primary">SR.</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full text-text-primary border border-border-subtle outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 flex flex-col justify-center items-center gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25, ease: "easeOut" }}
                  className="font-display text-2xl md:text-3xl font-semibold text-text-primary hover:text-accent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent outline-offset-8"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.04, duration: 0.25 }}
                className="mt-6 w-full max-w-[200px]"
              >
                <Button
                  variant="primary"
                  className="w-full text-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const target = document.querySelector("#contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Let&apos;s Talk
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

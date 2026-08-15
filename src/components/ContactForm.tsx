"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { profile } from "@/content/profile";
import { LinkedinIcon } from "@/components/ui/Icons";
import Card from "./ui/Card";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus("error");
      setStatusMessage("Form has errors. Please check the fields below.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus("error");
      setStatusMessage("Failed to send message: EmailJS environment variables are not configured.");
      console.error("EmailJS Error: Missing environment variables. Please check your .env.local configuration.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Call EmailJS to send the form directly
    emailjs.sendForm(
      serviceId,
      templateId,
      formRef.current!,
      publicKey
    )
    .then(
      () => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setStatusMessage("Thank you! Your message has been sent successfully.");
        // Reset form inputs
        setFormData({ name: "", email: "", message: "" });
      },
      (error) => {
        const errorDetail = error?.text || (typeof error === "object" ? JSON.stringify(error) : error);
        console.error("EmailJS Error:", errorDetail);
        setIsSubmitting(false);
        setSubmitStatus("error");
        setStatusMessage("Failed to send your message. Please try again.");
      }
    );
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      {/* 2-Column Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 sm:gap-12 lg:gap-12 w-full max-w-full">
        
        {/* Left Column: Let's Connect (Outer Card Wrapper) */}
        <div className="w-full max-w-full lg:w-[329.33px] lg:h-[524.8px] flex justify-center shrink-0">
          <Card className="w-full h-full min-h-[460px] lg:h-[524.8px] bg-[#131316]/50 border border-border-subtle p-5 sm:p-6 flex flex-col justify-between text-left shrink-0">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-accent">
                Let&apos;s Connect
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed mt-2 font-sans">
                Ready to start your project? Reach out through any of these channels.
              </p>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/917604889657"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[56px] flex items-center gap-3.5 bg-bg-surface/50 border border-border-subtle px-4 py-2.5 rounded-xl hover:border-accent/30 transition-all duration-200 cursor-pointer shrink-0"
            >
              <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.747 1.451 5.436.002 9.858-4.395 9.861-9.81.002-2.624-1.02-5.09-2.885-6.958-1.864-1.867-4.343-2.894-6.969-2.895-5.437 0-9.86 4.397-9.863 9.814-.001 1.716.452 3.39 1.309 4.866L1.87 21.03l4.777-1.249zm11.238-6.903c-.29-.145-1.72-.848-1.986-.944-.266-.096-.46-.145-.653.145-.193.29-.748.944-.917 1.138-.17.194-.339.218-.63.073-.29-.145-1.223-.45-2.33-1.439-.86-.767-1.442-1.716-1.611-2.007-.17-.29-.018-.447.127-.591.13-.13.29-.339.435-.508.145-.17.193-.29.29-.484.097-.193.048-.363-.024-.508-.073-.145-.653-1.573-.895-2.153-.235-.564-.476-.488-.653-.497-.169-.008-.363-.01-.557-.01-.193 0-.508.073-.774.363-.266.29-1.016.992-1.016 2.42 0 1.427 1.04 2.806 1.185 3.001.145.193 2.046 3.125 4.957 4.38.692.298 1.233.477 1.654.61.695.22 1.33.19 1.83.115.558-.084 1.72-.702 1.962-1.38.242-.678.242-1.258.17-1.38-.073-.122-.266-.194-.556-.339z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white leading-tight truncate">WhatsApp</span>
                <span className="text-[10px] text-text-secondary mt-0.5 font-mono truncate">+91 7604889657</span>
              </div>
            </a>

            {/* Follow Me Substack */}
            <div className="flex flex-col gap-2">
              <h4 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider mb-1">
                Follow Me
              </h4>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/flim_myself?igsh=cmNidmFiMDJuY3Jp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[56px] flex items-center gap-3.5 bg-bg-surface/50 border border-border-subtle px-4 py-2.5 rounded-xl hover:border-accent/30 transition-all duration-200 cursor-pointer shrink-0 mb-2"
              >
                <div className="w-9 h-9 rounded-lg bg-bg-surface-raised border border-border-subtle flex items-center justify-center text-text-secondary shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white leading-tight truncate">Instagram</span>
                  <span className="text-[10px] text-text-secondary mt-0.5 font-sans truncate">Follow my journey</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[56px] flex items-center gap-3.5 bg-bg-surface/50 border border-border-subtle px-4 py-2.5 rounded-xl hover:border-accent/30 transition-all duration-200 cursor-pointer shrink-0 mb-2"
              >
                <div className="w-9 h-9 rounded-lg bg-bg-surface-raised border border-border-subtle flex items-center justify-center text-text-secondary shrink-0">
                  <LinkedinIcon className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white leading-tight truncate">LinkedIn</span>
                  <span className="text-[10px] text-text-secondary mt-0.5 font-sans truncate">Professional network</span>
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@flim_myself"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[56px] flex items-center gap-3.5 bg-bg-surface/50 border border-border-subtle px-4 py-2.5 rounded-xl hover:border-accent/30 transition-all duration-200 cursor-pointer shrink-0"
              >
                <div className="w-9 h-9 rounded-lg bg-bg-surface-raised border border-border-subtle flex items-center justify-center text-text-secondary shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white leading-tight truncate">YouTube</span>
                  <span className="text-[10px] text-text-secondary mt-0.5 font-sans truncate">Watch my content</span>
                </div>
              </a>
            </div>
          </Card>
        </div>

        {/* Right Column: Send a Message Form */}
        <div className="w-full max-w-full lg:w-[648.68px] lg:h-[524.8px] shrink-0">
          <Card className="w-full h-full min-h-[460px] lg:h-[524.8px] bg-[#131316]/50 border border-border-subtle p-5 sm:p-7 flex flex-col justify-between">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-accent text-left mb-2">
              Send a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3.5 flex-1 justify-between">
              {/* Status banner */}
              <div
                aria-live="polite"
                className={`role-status sr-only ${submitStatus !== "idle" ? "not-sr-only" : ""}`}
              >
                {submitStatus === "success" && (
                  <div className="bg-transparent border border-border-subtle/50 text-white text-xs font-sans p-3 rounded-md flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--success)" }} />
                    <span>{statusMessage}</span>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-transparent border border-border-subtle/50 text-white text-xs font-sans p-3 rounded-md flex items-center gap-2 mb-1">
                    <span className="font-sans font-bold shrink-0" style={{ color: "var(--danger)" }}>[!]</span>
                    <span>{statusMessage}</span>
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5 items-start text-left">
                <label htmlFor="name" className="text-xs font-mono font-semibold uppercase text-text-secondary tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0c] border border-border-subtle hover:border-text-tertiary focus:border-accent text-white placeholder-text-tertiary text-base md:text-sm rounded-lg px-4 py-2.5 outline-none transition-colors duration-150 font-sans"
                  disabled={isSubmitting}
                  required
                />
                {errors.name && <span className="text-xs text-danger font-mono mt-0.5">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 items-start text-left">
                <label htmlFor="email" className="text-xs font-mono font-semibold uppercase text-text-secondary tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0c] border border-border-subtle hover:border-text-tertiary focus:border-accent text-white placeholder-text-tertiary text-base md:text-sm rounded-lg px-4 py-2.5 outline-none transition-colors duration-150 font-sans"
                  disabled={isSubmitting}
                  required
                />
                {errors.email && <span className="text-xs text-danger font-mono mt-0.5">{errors.email}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 items-start text-left">
                <label htmlFor="message" className="text-xs font-mono font-semibold uppercase text-text-secondary tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0c] border border-border-subtle hover:border-text-tertiary focus:border-accent text-white placeholder-text-tertiary text-base md:text-sm rounded-lg px-4 py-2.5 outline-none transition-colors duration-150 resize-none font-sans"
                  disabled={isSubmitting}
                  required
                />
                {errors.message && <span className="text-xs text-danger font-mono mt-0.5">{errors.message}</span>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1 py-3 min-h-[46px] bg-accent hover:brightness-110 active:scale-[0.99] text-accent-contrast-text font-bold rounded-lg text-sm transition-all duration-150 select-none shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-80"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Card>
        </div>

      </div>
    </motion.section>
  );
}

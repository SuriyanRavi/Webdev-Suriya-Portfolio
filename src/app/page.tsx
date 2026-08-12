import React from "react";
import Hero from "@/components/Hero";
import DashboardSection from "@/components/DashboardSection";
import ProjectGrid from "@/components/ProjectGrid";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import CreatorSection from "@/components/CreatorSection";
import ServicesGrid from "@/components/ServicesGrid";
import ContactForm from "@/components/ContactForm";


export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <Hero />

      {/* Dashboard Section */}
      <DashboardSection />

      {/* Project Grid */}
      <ProjectGrid />

      {/* About Section */}
      <About />

      {/* Experience Accordion Timeline */}
      <ExperienceTimeline />

      {/* Content Creator Card Section */}
      <CreatorSection />

      {/* Services Grid */}
      <ServicesGrid />

      {/* Contact Form & Info */}
      <ContactForm />
    </div>
  );
}

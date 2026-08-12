export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  thumbnail: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "personal-tracker-app",
    title: "Personal-Tracker-App",
    summary: "Personal Tracker which helps you track consistency and productivity.",
    description: "A comprehensive consistency and productivity tracking platform. Designed to help users set goals, log daily activities, receive reminders, and visualize their productivity through dynamic analytics and detailed activity reports.",
    highlights: [
      "Designed and developed a interactive daily activity logger and tracker dashboard.",
      "Implemented intelligent status indicators and scheduling for daily reminders.",
      "Created visual analytics charts and auto-generated weekly activity reports.",
      "Developed robust backend queries using PLpgSQL to aggregate productivity metrics."
    ],
    stack: ["React", "JavaScript", "PLpgSQL", "HTML", "CSS","Supabase"],
    liveUrl: "https://personal-tracker-app-delta.vercel.app",
    repoUrl: "https://github.com/SuriyanRavi/[TODO:personal-tracker-repo]",
    thumbnail: "/projects/personal-tracker.png",
    featured: true,
  },
  {
    slug: "placeholder-project-2",
    title: "Aznav Technologies",
    summary: "The website represents a software development company offering end-to-end digital solutions for startups, SMEs, and enterprises.",
    description: "A modern software development company website that showcases full-stack engineering capabilities, digital transformation services, and enterprise software solutions.",
    highlights: [
      "Comprehensive Software Services",
      "Professional Business-Oriented Design",
      "Enterprise-Focused Development"
    ],
    stack: ["Next.js", "TypeScript", "CSS","Vercel"],
    liveUrl: "https://aznav-technologies-software.vercel.app",
    repoUrl: "https://github.com/SuriyanRavi",
    thumbnail: "/projects/aznav-technologies.png",
    featured: false,
  },
  {
    slug: "placeholder-project-3",
    title: "Shanthi Construction",
    summary: "Shanthi Construction is a business portfolio website built for a construction company to showcase its services, completed projects, company profile, and contact information.",
    description: "A modern, responsive construction company website designed to showcase infrastructure and construction services, completed projects, industry expertise, and company credibility. The website combines a clean UI, service-oriented architecture, and responsive design to generate leads and provide a professional online presence for the business.",
    highlights: [
      "Professional Business Portfolio",
      "Responsive Modern UI",
      "Service & Project Showcase",
      "Lead Generation Focus"
    ],
    stack: ["React.js","Next.js","Tailwind CSS","TypeScript","Vercel"],
    liveUrl: "https://shanthi-contruction.vercel.app",
    repoUrl: "https://github.com/SuriyanRavi",
    thumbnail: "/projects/shanthi-contruction.png",
    featured: false,
  }
];

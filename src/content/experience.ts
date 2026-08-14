export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  location: string;
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  tech: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    id: "exp-1",
    company: "Freelancing",
    role: "Frontend Developer",
    dateRange: "June 2025 - Present",
    location: "Remote",
    summary: "Building modern responsive user interfaces and optimizing web applications.",
    highlights: [
      "Collaborated with clients and designers to build pixel-perfect frontend experiences.",
      "Improved performance and load speeds of primary application dashboards.",
      "Refactored styling code to utilize reusable design token custom variables."
    ],
    metrics: [
      { label: "Performance Increase", value: "35%" },
      { label: "Components Built", value: "10+" }
    ],
    tech: ["React", "Next.js", "javaScript", "CSS","Html","Tailwind CSS","vercel","Github"],
  }
];

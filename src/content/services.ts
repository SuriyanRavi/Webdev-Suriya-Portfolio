export type Service = {
  id: string;
  icon: string; // Emoji glyph or icon name
  title: string;
  description: string;
  tag?: string;
  details: string; // Rich detail content for popups
};

export const services: Service[] = [
  {
    id: "serv-1",
    icon: "💻",
    title: "Website Development",
    tag: "Full-Stack",
    description: "Custom-built websites tailored to your vision.",
    details: "I build fast, secure, and modern websites from scratch using React, Next.js, and TypeScript, structured with clean code architectures and seamless API integrations.",
  },
  {
    id: "serv-2",
    icon: "🔎",
    title: "SEO Optimized",
    tag: "Visibility",
    description: "Engineered for better visibility and higher rankings.",
    details: "I follow SEO best practices like semantic HTML, optimized metadata, clean URL structures, and fast-loading pages to improve your website's search engine visibility and drive organic traffic.",
  },
  {
    id: "serv-3",
    icon: "🎨",
    title: "Modern Design",
    tag: "UI / UX",
    description: "Clean, contemporary UI that reflects your brand.",
    details: "Creating polished visual aesthetics, fluid micro-interactions, dark/light themes, and delightful user journeys that make your brand stand out.",
  },
  {
    id: "serv-4",
    icon: "📱",
    title: "Responsive",
    tag: "Cross-Device",
    description: "Perfect experience across all devices and screen sizes.",
    details: "Flawless mobile-first responsive design ensuring seamless usability across phones, tablets, laptops, and ultra-wide desktop monitors.",
  },
  {
    id: "serv-5",
    icon: "⚡",
    title: "Landing Pages",
    tag: "Conversion",
    description: "High-converting pages built for impact and speed.",
    details: "Conversion-optimized marketing and product launch pages designed to capture leads, showcase value propositions, and convert visitors into customers.",
  }
];

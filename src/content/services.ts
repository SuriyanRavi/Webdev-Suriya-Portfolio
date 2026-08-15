export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: string;
  tag?: string;
};

export const services: Service[] = [
  {
    id: "serv-1",
    icon: "💻",
    title: "Website Development",
    description: "Custom-built websites tailored to your vision.",
    tag: "Web Dev",
    details: "Custom, scalable web applications built from scratch using React, Next.js, and modern TypeScript architectures. Every build follows clean code principles, semantic HTML, and lightning-fast page loading performance.",
  },
  {
    id: "serv-2",
    icon: "🔎",
    title: "SEO Optimized",
    description: "Engineered for better visibility and higher rankings.",
    tag: "Search",
    details: "I follow SEO best practices like semantic HTML, optimized metadata, clean URL structures, and fast-loading pages to improve your website's search engine visibility. This helps drive organic traffic and boosts your online presence effectively.",
  },
  {
    id: "serv-3",
    icon: "🎨",
    title: "Modern Design",
    description: "Clean, contemporary UI that reflects your brand.",
    tag: "UI / UX",
    details: "Crafting sleek, high-conversion user interfaces with fluid animations, micro-interactions, dark modes, and intuitive visual hierarchies that elevate your brand's digital presence.",
  },
  {
    id: "serv-4",
    icon: "📱",
    title: "Responsive",
    description: "Perfect experience across all devices and screen sizes.",
    tag: "Adaptive",
    details: "Mobile-first, fully responsive layouts engineered to adapt seamlessly from compact smartphones to ultra-wide desktop monitors without layout shifts or horizontal overflows.",
  },
  {
    id: "serv-5",
    icon: "⚡",
    title: "Landing Pages",
    description: "High-converting pages built for impact and speed.",
    tag: "Speed",
    details: "High-converting, performance-tuned landing pages designed to capture leads, showcase product value, and deliver exceptional user experiences with optimal Core Web Vitals.",
  }
];

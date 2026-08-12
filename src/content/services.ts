export type Service = {
  id: string;
  icon: string; // Emoji glyph or icon name
  title: string;
  description: string;
  details: string; // Rich detail content for popups
};

export const services: Service[] = [
  {
    id: "serv-1",
    icon: "💻",
    title: "Website Development",
    description: "Custom-built websites tailored to your vision.",
    details: "I follow SEO best practices like semantic HTML, optimized metadata, clean URL structures, and fast-loading pages to improve your website's search engine visibility. This helps drive organic traffic and boosts your online presence effectively.",
  },
  {
    id: "serv-2",
    icon: "🔎",
    title: "SEO Optimized",
    description: "Engineered for better visibility and higher rankings.",
    details: "I follow SEO best practices like semantic HTML, optimized metadata, clean URL structures, and fast-loading pages to improve your website's search engine visibility. This helps drive organic traffic and boosts your online presence effectively.",
  },
  {
    id: "serv-3",
    icon: "🎨",
    title: "Modern Design",
    description: "Clean, contemporary UI that reflects your brand.",
    details: "I follow SEO best practices like semantic HTML, optimized metadata, clean URL structures, and fast-loading pages to improve your website's search engine visibility. This helps drive organic traffic and boosts your online presence effectively.",
  },
  {
    id: "serv-4",
    icon: "📱",
    title: "Responsive",
    description: "Perfect experience across all devices and screen sizes.",
    details: "I follow SEO best practices like semantic HTML, optimized metadata, clean URL structures, and fast-loading pages to improve your website's search engine visibility. This helps drive organic traffic and boosts your online presence effectively.",
  },
  {
    id: "serv-5",
    icon: "⚡",
    title: "Landing Pages",
    description: "High-converting pages built for impact and speed.",
    details: "I follow SEO best practices like semantic HTML, optimized metadata, clean URL structures, and fast-loading pages to improve your website's search engine visibility. This helps drive organic traffic and boosts your online presence effectively.",
  }
];

export type Profile = {
  fullName: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtext: string;
  bio: string[];
  location: string;
  availability: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  avatarUrl: string;
  resumeUrl?: string;
};

export const profile: Profile = {
  fullName: "Suriyan R",
  shortName: "SR",
  tagline: "Frontend Developer",
  heroHeadline: "Turning thoughts into beautiful web stories",
  heroSubtext: "",
  bio: [
    "Hello! I'm Suriyan R, a frontend developer based in India. I love to design and build interfaces that make users' lives simpler and more delightful.",
    "My focus is on writing semantic, clean, and maintainable code, leveraging technologies like React, Next.js, TypeScript, and modern CSS. I pay close attention to responsive design, accessibility, and micro-interactions that elevate the overall user experience.",
    "I believe that code and design should go hand-in-hand. By working closely with design systems, tokens, and layouts, I aim to transform static canvases into lively and responsive digital experiences.",
  ],
  location: "India (Flexible Timezone)",
  availability: "Open to freelance, full-time, and collaborative ideas.",
  email: "suriyanwebdev@gmail.com",
  githubUrl: "https://github.com/SuriyanRavi",
  linkedinUrl: "https://www.linkedin.com/in/suriyan04/",
  avatarUrl: "/avatar.png",
};

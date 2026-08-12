import { Variants } from "framer-motion";

export const transitionFast = {
  duration: 0.12,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const transitionBase = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const transitionSlow = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSlow,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitionBase,
  },
};

export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionBase,
  },
};

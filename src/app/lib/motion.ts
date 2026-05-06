import type { Transition, Variants } from "motion/react";

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outCinematic: [0.22, 1, 0.36, 1] as const,
};

export const duration = {
  fast: 0.2,
  base: 0.35,
  slow: 0.7,
  hero: 1.0,
} as const;

export const transitions = {
  base: { duration: duration.base, ease: ease.outExpo } satisfies Transition,
  cinematic: { duration: duration.slow, ease: ease.outCinematic } satisfies Transition,
  hero: { duration: duration.hero, ease: ease.outCinematic } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.cinematic },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.slow, ease: ease.outCinematic } },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

/* Cinematic blur-fade-up — for hero entrances */
export const blurFadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.hero, ease: ease.outCinematic },
  },
};

/* Word-by-word stagger for headlines */
export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

export const wordItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: ease.outCinematic },
  },
};

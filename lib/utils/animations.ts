import { Variants } from 'framer-motion';

/**
 * Standard animation variants for AcademySphere.
 * These ensure consistent transitions across the platform without over-animating.
 * Respects `prefers-reduced-motion` at the OS level when used with framer-motion's <MotionConfig>.
 */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] } // Custom cubic-bezier for a snappy but smooth feel
  }
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] } // Slight spring effect
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const listItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

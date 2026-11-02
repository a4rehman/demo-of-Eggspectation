import { motion, Variants } from "framer-motion";

import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  /** Optional delay for staggered reveal */
  delay?: number;
  /** Optional custom className for the wrapper */
  className?: string;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: custom },
  }),
};

export function SectionReveal({ children, delay = 0, className = "" }: SectionRevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref as any}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

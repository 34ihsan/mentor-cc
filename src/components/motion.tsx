"use client";
import { motion, AnimatePresence } from "framer-motion";

export const StaggerContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeInUp = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

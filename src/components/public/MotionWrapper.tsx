'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export default function MotionWrapper({ children, delay = 0, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.0, // Slow & Organic
        delay: delay,
        ease: [0.65, 0, 0.35, 1], // Custom Bezier for premium feel
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

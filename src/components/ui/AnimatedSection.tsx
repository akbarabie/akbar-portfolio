"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }} // ganti y:40 -> y:-40 kalau mau efek "drop dari atas"
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // trigger sedikit sebelum section masuk viewport penuh; once:true = gak re-trigger tiap scroll bolak-balik
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
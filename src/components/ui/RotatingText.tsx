"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  roles: string[];
  intervalMs?: number;
  className?: string;
}

export function RotatingText({ roles, intervalMs = 2500, className }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || roles.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [roles.length, intervalMs, prefersReducedMotion]);

  // User dengan OS-level "reduce motion" dapat teks statis, bukan animasi dipaksa mati manual
  if (prefersReducedMotion) {
    return <span className={className}>{roles[0]}</span>;
  }

  return (
    <span className="relative inline-grid">
      {roles.map((role, i) => (
        <motion.span
          key={role}
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : i < index ? -8 : 8,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={cn("col-start-1 row-start-1", className)}
        >
          {role}
        </motion.span>
      ))}
      {/* Fallback untuk screen reader: dibaca sekali, bukan tiap rotasi */}
      <span className="sr-only">{roles.join(", ")}</span>
    </span>
  );
}
"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TimelineItemProps {
  period: string;
  title: string;
  description: string;
  institution: string;
  index: number;
}

export function TimelineItem({
  period,
  title,
  description,
  institution,
  index,
}: TimelineItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
      <span
        className="timeline-node absolute left-[7px] md:left-1/2 top-1.5 -translate-x-1/2"
        aria-hidden="true"
      />

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: isEven ? -24 : 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
        className={`pl-10 md:pl-0 pb-12 ${
          isEven
            ? "md:col-start-1 md:text-right md:pr-16"
            : "md:col-start-2 md:pl-16"
        }`}
      >
        <span className="text-sm font-medium text-accent">{period}</span>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-text-muted">{institution}</p>
        <p className="mt-2 text-sm text-text-muted leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
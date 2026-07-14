"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface PhotoFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Tailwind aspect utility. Sesuaikan dengan rasio asli foto agar minim ruang kosong. */
  aspectRatio?: string;
}

const MAX_TILT = 10;

export function PhotoFrame({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 24rem, 60vw",
  className = "",
  aspectRatio = "aspect-[4/5]", // rasio portrait standar foto profesional (mendekati full-body seated shot)
}: PhotoFrameProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [`${MAX_TILT}deg`, `-${MAX_TILT}deg`]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [`-${MAX_TILT}deg`, `${MAX_TILT}deg`]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className={`[perspective:1200px]`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
        className={cn(
          "group relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl shadow-black/40 transition-shadow duration-300 will-change-transform hover:shadow-accent/20",
          aspectRatio,
          className)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain transform-gpu transition-transform duration-300 group-hover:scale-115"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-white/5"
        />
      </motion.div>
    </div>
  );
}
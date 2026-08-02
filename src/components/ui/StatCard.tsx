"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
} from "framer-motion";
import { useLocale } from "next-intl";

interface StatCardProps {
  value: string;
  label: string;
}

/**
 * Pisahin string kayak "IDR 350M", "15,000+", "97%" jadi 3 bagian:
 * prefix (teks sebelum angka), target (angka murni buat di-animate),
 * suffix (teks setelah angka). Cuma bagian angkanya yang di-animate,
 * prefix/suffix tetap statis.
 *
 * Regex-nya sengaja terima "," MAUPUN "." sebagai thousand-separator,
 * karena locale ID pakai titik ("15.000+") sementara locale EN pakai
 * koma ("15,000+") buat angka yang sama — lihat messages/id.json vs
 * messages/en.json. Separator asli di-buang, angka di-format ulang
 * sesuai locale aktif pas render (bukan ikut karakter di string asal).
 */
function parseStatValue(value: string) {
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) return null;

  const [, prefix, numberPart, suffix] = match;
  const target = Number(numberPart.replace(/[.,]/g, ""));
  if (Number.isNaN(target)) return null;

  return { prefix, target, suffix };
}

export function StatCard({ value, label }: StatCardProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const locale = useLocale();

  const parsed = parseStatValue(value);
  const count = useMotionValue(0);
  const formatted = useTransform(count, (latest) =>
    new Intl.NumberFormat(locale).format(Math.round(latest))
  );

  useEffect(() => {
    if (!parsed || !isInView) return;

    // Reduced motion: begitu masuk viewport, langsung tampilin angka
    // final, gak ada count-up.
    if (prefersReducedMotion) {
      count.set(parsed.target);
      return;
    }

    const controls = animate(count, parsed.target, {
      duration: 1.5,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, parsed, prefersReducedMotion, count]);

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 text-center shadow-lg shadow-black/20">
      <p
        ref={ref}
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        {parsed ? (
          <>
            {parsed.prefix}
            <motion.span>{formatted}</motion.span>
            {parsed.suffix}
          </>
        ) : (
          value
        )}
      </p>
      <p className="mt-1 text-sm text-text-muted">{label}</p>
    </div>
  );
}
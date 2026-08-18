"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useLocale } from "next-intl";
import { Award, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types/certificate";

interface CertificateGalleryLabels {
  issued: string;
  credentialId: string;
  viewLarger: string;
  close: string;
  previous: string;
  next: string;
  dragHint: string;
}

interface CertificateGalleryProps {
  certificates: Certificate[];
  labels: CertificateGalleryLabels;
}

// Jarak swipe minimum (px) sebelum dianggap "geser", bukan cuma tap/klik.
const SWIPE_THRESHOLD = 50;

/**
 * Ubah selisih index mentah jadi offset terpendek di array melingkar.
 * Contoh 4 item, active=0, index=3 -> offset -1 (bukan +3), biar kartu
 * "sebelumnya" selalu nongol di kiri walau posisi array-nya di ujung.
 */
function getWrappedOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function getCardStyle(offset: number) {
  const abs = Math.abs(offset);
  const direction = Math.sign(offset);

  if (abs === 0) {
    return { x: "-50%", scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
  }
  if (abs === 1) {
    return {
      x: `calc(-50% + ${direction * 68}%)`,
      scale: 0.82,
      rotate: -direction * 8,
      opacity: 0.55,
      zIndex: 20,
    };
  }
  if (abs === 2) {
    return {
      x: `calc(-50% + ${direction * 122}%)`,
      scale: 0.68,
      rotate: -direction * 14,
      opacity: 0.25,
      zIndex: 10,
    };
  }
  return {
    x: `calc(-50% + ${direction * 160}%)`,
    scale: 0.6,
    rotate: -direction * 14,
    opacity: 0,
    zIndex: 0,
  };
}

export function CertificateGallery({ certificates, labels }: CertificateGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const locale = useLocale();
  const total = certificates.length;

  const formatIssuedDate = useCallback(
    (isoDate: string) =>
      new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
        new Date(isoDate)
      ),
    [locale]
  );

  function goTo(index: number) {
    setActiveIndex(((index % total) + total) % total);
  }

  function handlePanEnd(_event: PointerEvent, info: PanInfo) {
    if (info.offset.x <= -SWIPE_THRESHOLD) goTo(activeIndex + 1);
    else if (info.offset.x >= SWIPE_THRESHOLD) goTo(activeIndex - 1);
  }

  const activeCertificate = certificates[activeIndex];
  const lightboxCertificate = lightboxIndex !== null ? certificates[lightboxIndex] : null;

  return (
    <div>
      <p className="mb-6 text-center text-sm text-text-muted/70">{labels.dragHint}</p>

      {/* Stack area — kartu absolute-positioned di tengah, offset dihitung dari activeIndex */}
      <motion.div
        className="relative h-[300px] overflow-hidden cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[360px] lg:h-[400px]"
        onPanEnd={handlePanEnd}
      >
        {certificates.map((certificate, index) => {
          const offset = getWrappedOffset(index, activeIndex, total);
          const style = getCardStyle(offset);
          const isActive = offset === 0;

          return (
            <motion.button
              key={certificate.id}
              type="button"
              onClick={() => (isActive ? setLightboxIndex(index) : goTo(index))}
              aria-label={
                isActive ? `${certificate.name} — ${labels.viewLarger}` : certificate.name
              }
              animate={{
                x: style.x,
                scale: style.scale,
                rotate: style.rotate,
                opacity: style.opacity,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={{ zIndex: style.zIndex, pointerEvents: style.opacity === 0 ? "none" : "auto" }}
              className="absolute left-1/2 top-0 w-[78%] max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/40 sm:w-[420px]"
            >
              <div className="relative aspect-[4/3] w-full bg-background">
                <Image
                  src={certificate.image}
                  alt={certificate.name}
                  fill
                  sizes="(min-width: 640px) 420px, 78vw"
                  className="object-cover object-top"
                  priority={isActive}
                />
                {isActive && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                    <ZoomIn className="size-3.5" aria-hidden="true" />
                    {labels.viewLarger}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Caption kartu aktif */}
      <div className="mt-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCertificate.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wide text-accent">
              <Award className="size-3.5" aria-hidden="true" />
              {activeCertificate.category}
            </div>
            <h3 className="mt-2 text-xl font-bold text-foreground">{activeCertificate.name}</h3>
            <p className="mt-1 text-sm text-text-muted">{activeCertificate.issuer}</p>
            <p className="mt-1 text-xs text-text-muted/70">
              {labels.issued} {formatIssuedDate(activeCertificate.issuedDate)}
            </p>
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label={labels.previous}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2">
              {certificates.map((certificate, index) => (
                <button
                  key={certificate.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={certificate.name}
                  aria-current={index === activeIndex}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "w-6 bg-accent" : "w-2 bg-text-muted/30 hover:bg-text-muted/50"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label={labels.next}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-card text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      <Dialog
        open={lightboxCertificate !== null}
        onOpenChange={(open) => !open && setLightboxIndex(null)}
        ariaLabel={lightboxCertificate?.name}
        className="max-w-3xl"
      >
        {lightboxCertificate && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label={labels.close}
              className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-foreground hover:bg-background"
            >
              <X className="size-4" />
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((current) =>
                      current === null ? current : (current - 1 + total) % total
                    )
                  }
                  aria-label={labels.previous}
                  className="absolute left-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-background"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((current) => (current === null ? current : (current + 1) % total))
                  }
                  aria-label={labels.next}
                  className="absolute right-3 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground hover:bg-background"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}

            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={lightboxCertificate.image}
                alt={lightboxCertificate.name}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-contain"
              />
            </div>

            <div className="space-y-1 border-t border-border p-5">
              <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-accent">
                <Award className="size-3.5" aria-hidden="true" />
                {lightboxCertificate.category}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{lightboxCertificate.name}</h3>
              <p className="text-sm text-text-muted">{lightboxCertificate.issuer}</p>
              <p className="text-xs text-text-muted/70">
                {labels.issued} {formatIssuedDate(lightboxCertificate.issuedDate)}
                {lightboxCertificate.credentialId && (
                  <>
                    {" · "}
                    {labels.credentialId}: {lightboxCertificate.credentialId}
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
import type { HTMLAttributes } from "react";
import Image, { type ImageProps } from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Root ──────────────────────────────────────────────
const cardVariants = cva(
  "rounded-xl border border-border bg-card text-foreground overflow-hidden transition-all duration-300",
  {
    variants: {
      interactive: {
        true: "hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
);

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

function Card({ className, interactive, ...props }: CardProps) {
  return <div className={cn(cardVariants({ interactive, className }))} {...props} />;
}

// ── Image ─────────────────────────────────────────────
type CardImageProps = Omit<ImageProps, "fill" | "className"> & {
  className?: string;
};

function CardImage({
  className,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  ...props
}: CardImageProps) {
  return (
    <div className={cn("relative aspect-video w-full overflow-hidden bg-background", className)}>
      <Image fill sizes={sizes} alt={alt} className="object-cover" {...props} />
    </div>
  );
}

// ── Header ────────────────────────────────────────────
function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-5", className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold tracking-tight", className)} {...props} />
  );
}

function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-text-muted", className)} {...props} />;
}

// ── Content & Footer ──────────────────────────────────
function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2 px-5 pb-5 pt-0", className)} {...props} />;
}

export { Card, CardImage, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
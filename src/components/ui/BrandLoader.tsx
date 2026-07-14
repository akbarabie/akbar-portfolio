// src/components/ui/BrandLoader.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLoaderProps {
  size?: number;
  className?: string;
}

export function BrandLoader({ size = 40, className }: BrandLoaderProps) {
  return (
    <Image
      src="/images/mas_icon.png"
      alt="Loading"
      width={size}
      height={size}
      className={cn("animate-pulse rounded-full", className)}
      priority
    />
  );
}
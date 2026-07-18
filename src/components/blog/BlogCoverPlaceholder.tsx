// src/components/blog/BlogCoverPlaceholder.tsx
import { cn } from "@/lib/utils";

interface BlogCoverPlaceholderProps {
  title: string;
  className?: string;
}

// Sengaja pakai warna default Tailwind (blue-500, dst), BUKAN custom token
// (--color-accent) — biar nggak kena pola bug Tailwind v4 "utility custom
// token silently gagal ke-generate" yang udah beberapa kali kejadian di
// project ini (lihat globals.css untuk custom token yang perlu CSS langsung).
export function BlogCoverPlaceholder({ title, className }: BlogCoverPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/25 to-violet-500/10",
        className
      )}
      aria-hidden="true"
    >
      <span className="px-6 text-center text-sm font-medium text-text-muted">{title}</span>
    </div>
  );
}

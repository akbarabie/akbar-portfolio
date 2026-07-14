// src/components/ui/ProjectCoverPlaceholder.tsx
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/project";

// Sengaja pakai warna default Tailwind (blue-500, dst), BUKAN custom token
// (--color-accent) — biar nggak kena pola bug Tailwind v4 "utility custom
// token silently gagal ke-generate" yang udah 3x kejadian di project ini.
const categoryGradient: Record<ProjectCategory, string> = {
  "data-analyst": "from-blue-500/25 to-cyan-500/10",
  "data-scientist": "from-violet-500/25 to-blue-500/10",
  "data-engineer": "from-emerald-500/25 to-blue-500/10",
};

interface ProjectCoverPlaceholderProps {
  category: ProjectCategory;
  title: string;
  className?: string;
}

export function ProjectCoverPlaceholder({
  category,
  title,
  className,
}: ProjectCoverPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        categoryGradient[category],
        className
      )}
      aria-hidden="true"
    >
      <span className="px-6 text-center text-sm font-medium text-text-muted">
        {title}
      </span>
    </div>
  );
}

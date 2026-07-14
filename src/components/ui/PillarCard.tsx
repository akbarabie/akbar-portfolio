import { Badge } from "@/components/ui/Badge";

interface PillarCardProps {
  role: string;
  description: string;
}

export function PillarCard({ role, description }: PillarCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-accent/40">
      <Badge variant="outline" className="mb-3">
        {role}
      </Badge>
      <p className="text-sm leading-relaxed text-text-muted">{description}</p>
    </div>
  );
}
interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6 text-center shadow-lg shadow-black/20">
      <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-sm text-text-muted">{label}</p>
    </div>
  );
}
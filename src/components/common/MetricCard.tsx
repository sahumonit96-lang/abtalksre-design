import type { ReactNode } from "react";

export function MetricCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="card-surface p-4 transition-colors hover:border-primary/30 sm:p-5">
      <p className="text-[10px] font-bold tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 flex min-w-0 items-center gap-2 text-2xl font-extrabold tracking-tight">
        {icon}
        <span className="truncate">{value}</span>
      </p>
      {hint && <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
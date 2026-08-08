import { CURRENT_DAY, TOTAL_DAYS, progressPercent, daysRemaining } from "@/data/mockData";

export function ProgressCard() {
  return (
    <section className="card-surface p-5">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-widest text-muted-foreground">
            JOURNEY PROGRESS
          </p>
          <p className="mt-2 text-2xl font-extrabold">
            {CURRENT_DAY} <span className="text-muted-foreground">/ {TOTAL_DAYS}</span>
          </p>
        </div>
        <p className="shrink-0 text-2xl font-extrabold text-primary">{progressPercent}%</p>
      </div>
      <div
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="60-day challenge progress"
        className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-elevated"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{daysRemaining} days remaining</p>
    </section>
  );
}
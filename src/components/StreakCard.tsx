import { weekDays, STREAK } from "@/data/mockData";

export function StreakCard() {
  return (
    <section className="card-surface animate-fade-up p-5">
      <div className="flex items-center gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-soft text-2xl">
          🔥
        </span>
        <div className="min-w-0">
          <p className="text-4xl font-extrabold leading-none">{STREAK}</p>
          <p className="mt-1 text-[11px] font-bold tracking-widest text-muted-foreground">
            DAY STREAK
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">You&apos;re building momentum.</p>
      <ul className="mt-5 grid grid-cols-7 gap-1.5">
        {weekDays.map((d, i) => (
          <li key={i} className="text-center">
            <p className="text-[10px] font-bold tracking-wider text-muted-foreground">{d.label}</p>
            <div
              className={`mt-1.5 grid aspect-square place-items-center rounded-xl border text-xs font-bold ${
                d.done
                  ? "border-primary/40 bg-primary-soft text-primary"
                  : "border-border bg-elevated text-muted-foreground"
              }`}
            >
              {d.done ? "✓" : "•"}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
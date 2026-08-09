import { Link } from "@tanstack/react-router";
import type { DailyProgress } from "@/data/types";

const styles: Record<string, string> = {
  completed: "border-primary/40 bg-primary-soft text-primary",
  today: "border-primary bg-primary text-primary-foreground shadow-glow animate-pop",
  upcoming: "border-border bg-elevated text-muted-foreground/40",
  missed: "border-flame/40 bg-flame/10 text-flame",
};

const labels: Record<string, string> = {
  completed: "completed",
  today: "current",
  upcoming: "locked",
  missed: "missed",
};

export function DayGrid({ progress }: { progress: DailyProgress[] }) {
  return (
    <>
      <ul className="grid grid-cols-10 gap-1.5 sm:gap-2">
        {progress.map((d) => {
          const openable = d.status === "completed" || d.status === "today";
          const content = d.status === "completed" ? "✓" : d.status === "today" ? d.day : d.day;
          const base = `grid aspect-square w-full place-items-center rounded-full border text-[9px] font-bold ${styles[d.status]}`;

          return (
            <li key={d.day} className="min-w-0">
              {openable ? (
                <Link
                  to="/day/$day"
                  params={{ day: String(d.day) }}
                  title={`Day ${d.day} — ${labels[d.status]}`}
                  aria-label={`Open day ${d.day} (${labels[d.status]})`}
                  className={`${base} transition-transform hover:scale-110`}
                >
                  {content}
                </Link>
              ) : (
                <span
                  title={`Day ${d.day} — ${labels[d.status]}`}
                  aria-label={`Day ${d.day} ${labels[d.status]}`}
                  className={base}
                >
                  {d.status === "upcoming" ? "" : d.day}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold tracking-widest text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-soft ring-1 ring-primary/40" />
          COMPLETED
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" /> CURRENT
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-flame/40" /> MISSED
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-elevated ring-1 ring-border" /> LOCKED
        </li>
      </ul>
    </>
  );
}

import type { DailyProgress } from "@/data/types";

const styles: Record<string, string> = {
  completed: "border-primary/40 bg-primary-soft text-primary",
  today: "border-primary bg-primary text-primary-foreground shadow-glow animate-pop",
  upcoming: "border-border bg-elevated text-muted-foreground/40",
  missed: "border-flame/40 bg-flame/10 text-flame",
};

export function DayGrid({ progress }: { progress: DailyProgress[] }) {
  return (
    <ul className="grid grid-cols-10 gap-1.5 sm:gap-2">
      {progress.map((d) => (
        <li
          key={d.day}
          title={`Day ${d.day} — ${d.status}`}
          className={`grid aspect-square place-items-center rounded-full border text-[9px] font-bold ${styles[d.status]}`}
        >
          {d.status === "completed" ? "✓" : d.status === "today" ? d.day : ""}
        </li>
      ))}
    </ul>
  );
}
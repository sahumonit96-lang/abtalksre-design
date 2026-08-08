import { days, type DayStatus } from "@/data/mockData";

const styles: Record<DayStatus, string> = {
  completed: "border-primary/30 bg-primary-soft text-primary",
  today: "border-primary bg-primary text-primary-foreground shadow-glow",
  upcoming: "border-border bg-elevated text-muted-foreground/70",
  missed: "border-flame/40 bg-flame/10 text-flame",
};

const labels: Record<DayStatus, string> = {
  completed: "completed",
  today: "today",
  upcoming: "upcoming",
  missed: "recovery",
};

export function JourneyGrid({ title = "YOUR 60-DAY JOURNEY" }: { title?: string }) {
  return (
    <section className="card-surface p-5">
      <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">{title}</h2>
      <ol className="mt-4 grid grid-cols-10 gap-1.5">
        {days.map((d) => (
          <li key={d.day}>
            <div
              title={`Day ${d.day} — ${labels[d.status]}`}
              className={`grid aspect-square place-items-center rounded-md border text-[9px] font-bold ${styles[d.status]}`}
            >
              {d.status === "completed" ? "✓" : d.day}
            </div>
          </li>
        ))}
      </ol>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold tracking-wide text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary-soft ring-1 ring-primary/40" />
          COMPLETED
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
          TODAY
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-flame/40" />
          RECOVERY
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-elevated ring-1 ring-border" />
          UPCOMING
        </li>
      </ul>
    </section>
  );
}
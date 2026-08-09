import type { Achievement } from "@/data/types";

export function AchievementsGrid({ achievements }: { achievements: Achievement[] }) {
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <section className="card-surface p-5 sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="min-w-0 text-[11px] font-bold tracking-widest text-muted-foreground">
          ACHIEVEMENTS
        </h2>
        <p className="shrink-0 text-[11px] font-bold tracking-widest text-primary">
          {unlocked} / {achievements.length}
        </p>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {achievements.map((a) => (
          <li
            key={a.id}
            className={`rounded-2xl border p-4 transition-colors ${
              a.unlocked
                ? "border-primary/35 bg-primary-soft"
                : "border-border bg-elevated opacity-60"
            }`}
          >
            <span className="text-xl" aria-hidden="true">
              {a.icon}
            </span>
            <p
              className={`mt-2 text-sm font-extrabold leading-tight ${a.unlocked ? "text-primary" : ""}`}
            >
              {a.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

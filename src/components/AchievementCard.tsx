import { achievements } from "@/data/mockData";

export function AchievementCard() {
  return (
    <section>
      <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">ACHIEVEMENTS</h2>
      <ul className="mt-3 grid grid-cols-2 gap-3">
        {achievements.map((a) => (
          <li
            key={a.title}
            className={`rounded-2xl border p-4 ${
              a.unlocked ? "border-border bg-card" : "border-border/60 bg-card/40 opacity-70"
            }`}
          >
            <span className="text-lg" aria-hidden="true">
              {a.icon}
            </span>
            <p className="mt-2 text-sm font-bold leading-tight">{a.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
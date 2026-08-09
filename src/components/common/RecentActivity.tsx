import { BadgeCheck, Flame, Layers, Target, Trophy, Zap } from "lucide-react";
import type { ActivityItem } from "@/data/types";

const icons = {
  proof: BadgeCheck,
  challenge: Target,
  streak: Flame,
  achievement: Trophy,
  track: Layers,
} as const;

export function RecentActivity({ items, limit = 6 }: { items: ActivityItem[]; limit?: number }) {
  const shown = items.slice(0, limit);

  return (
    <section className="card-surface p-5 sm:p-6">
      <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
        RECENT ACTIVITY
      </h2>
      {shown.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Nothing yet. Submit today&apos;s proof and it will show up here.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((a) => {
            const Icon = icons[a.kind];
            return (
              <li key={a.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{a.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.detail} · {a.at}
                  </p>
                </div>
                {a.xp ? (
                  <p className="flex shrink-0 items-center gap-1 text-xs font-extrabold text-primary">
                    <Zap className="h-3.5 w-3.5" aria-hidden="true" /> +{a.xp}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

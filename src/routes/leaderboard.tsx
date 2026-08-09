import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { buildLeaderboard, demoUser } from "@/data/demoData";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "60-Day Builder Leaderboard — ABTalks" },
      {
        name: "description",
        content:
          "Rankings that reward consistent verified building: streaks, days completed, projects shipped.",
      },
      { property: "og:title", content: "60-Day Builder Leaderboard — ABTalks" },
      { property: "og:description", content: "Consistency, ranked by verified proof of work." },
    ],
  }),
  component: LeaderboardPage,
});

const tabs = ["Weekly", "Monthly", "All Time"] as const;

function LeaderboardPage() {
  const { streak, daysCompleted, projectsShipped, xp } = useAppState();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All Time");

  const scale = tab === "Weekly" ? 0.18 : tab === "Monthly" ? 0.55 : 1;
  const rows = buildLeaderboard({ streak, daysCompleted, projects: projectsShipped, xp })
    .map((r) => ({
      ...r,
      xp: Math.round(r.xp * scale),
      daysCompleted: Math.max(1, Math.round(r.daysCompleted * scale)),
      streak: Math.max(1, Math.round(r.streak * scale)),
    }))
    .sort((a, b) => b.xp - a.xp)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  return (
    <AppShell title="Leaderboard">
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            60-Day Builder Leaderboard
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Ranked by XP: consistency, completed challenges and shipped proof.
          </p>
        </header>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Leaderboard range">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`min-h-10 rounded-full border px-4 text-xs font-bold tracking-widest transition-colors ${
                tab === t
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {rows.map((r) => (
            <li
              key={`${r.builderId}-${r.rank}`}
              className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-4 transition-colors ${
                r.isCurrentUser
                  ? "border-primary/50 bg-primary-soft shadow-glow"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className="w-8 shrink-0 text-sm font-extrabold tabular-nums text-muted-foreground">
                {r.rank}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold tracking-tight">
                  {r.name}
                  {r.isCurrentUser && <span className="text-primary"> · you</span>}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {r.daysCompleted} / 60 days · {r.projects} projects
                </p>
                <p className="mt-0.5 flex items-center gap-1 truncate text-xs font-extrabold text-primary">
                  <Zap className="h-3 w-3 shrink-0" aria-hidden="true" /> {r.xp.toLocaleString()} XP
                </p>
              </div>
              <p className="flex shrink-0 items-center gap-1.5 text-sm font-extrabold text-flame">
                <Flame className="h-4 w-4" aria-hidden="true" /> {r.streak}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
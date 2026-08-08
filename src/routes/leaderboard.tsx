import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Flame } from "lucide-react";
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

const tabs = ["Global", "College", "Friends"] as const;

function LeaderboardPage() {
  const { streak, daysCompleted, projectsShipped } = useAppState();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Global");

  const all = buildLeaderboard({ streak, daysCompleted, projects: projectsShipped });
  const rows =
    tab === "College"
      ? all.filter((r) => r.college === demoUser.college)
      : tab === "Friends"
        ? all.filter((r) => r.isCurrentUser || r.rank <= 4)
        : all;

  return (
    <AppShell title="Leaderboard">
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            60-Day Builder Leaderboard
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Rankings reward consistent verified building — not just check-ins.
          </p>
        </header>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Leaderboard scope">
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
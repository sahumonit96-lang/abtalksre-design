import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Clock, Lock, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { getTrackChallenges } from "@/data/tracks";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/challenges")({
  head: () => ({
    meta: [
      { title: "All 60 Challenges — ABTalks" },
      {
        name: "description",
        content:
          "Browse all 60 daily challenges in your track, see what's completed, what's current and what's still locked.",
      },
      { property: "og:title", content: "All 60 Challenges — ABTalks" },
      {
        property: "og:description",
        content: "Every daily challenge in your 60-day track, with status and XP.",
      },
    ],
  }),
  component: ChallengesPage,
});

const filters = ["All", "Completed", "Current", "Locked"] as const;

function ChallengesPage() {
  const { trackId, track, currentDay, isDayCompleted, daysCompleted, totalDays } = useAppState();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const all = getTrackChallenges(trackId).map((c) => {
    const status = isDayCompleted(c.day)
      ? "Completed"
      : c.day === currentDay
        ? "Current"
        : c.day < currentDay
          ? "Missed"
          : "Locked";
    return { ...c, status };
  });

  const rows =
    filter === "All"
      ? all
      : all.filter((c) => (filter === "Locked" ? c.status !== "Completed" && c.status !== "Current" : c.status === filter));

  return (
    <AppShell title="Challenges">
      <div className="animate-fade-up space-y-6">
        <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Challenges</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {track.name} track · {daysCompleted} of {totalDays} complete
            </p>
          </div>
          <Link
            to="/tracks"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border bg-card px-4 text-xs font-bold tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            CHANGE TRACK
          </Link>
        </header>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Challenge filter">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-10 rounded-full border px-4 text-xs font-bold tracking-widest transition-colors ${
                filter === f
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="card-surface p-6 text-sm text-muted-foreground">
            Nothing here yet. Complete today&apos;s challenge to fill this list.
          </p>
        ) : (
          <ul className="grid gap-3 lg:grid-cols-2">
            {rows.map((c) => {
              const openable = c.status === "Completed" || c.status === "Current";
              const body = (
                <>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <p className="min-w-0 text-[11px] font-bold tracking-widest text-muted-foreground">
                      DAY {c.day}
                    </p>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest ${
                        c.status === "Completed"
                          ? "bg-primary-soft text-primary"
                          : c.status === "Current"
                            ? "bg-primary text-primary-foreground"
                            : c.status === "Missed"
                              ? "bg-flame/15 text-flame"
                              : "border border-border text-muted-foreground"
                      }`}
                    >
                      {c.status === "Completed" && <Check className="h-3 w-3" strokeWidth={3} />}
                      {c.status === "Locked" && <Lock className="h-3 w-3" />}
                      {c.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-base font-extrabold leading-tight tracking-tight">
                    {c.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {c.description}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold tracking-widest">
                    <li className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                      {c.difficulty.toUpperCase()}
                    </li>
                    <li className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                      <Clock className="h-3 w-3" aria-hidden="true" /> {c.minutes} MIN
                    </li>
                    <li className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-primary">
                      <Zap className="h-3 w-3" aria-hidden="true" /> +{c.xp} XP
                    </li>
                  </ul>
                </>
              );

              return (
                <li key={c.id} className="min-w-0">
                  {openable ? (
                    <Link
                      to="/day/$day"
                      params={{ day: String(c.day) }}
                      className="block h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="h-full rounded-2xl border border-border bg-card/50 p-5 opacity-70">
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AppShell>
  );
}

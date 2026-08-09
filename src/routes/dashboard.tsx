import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Flame, Layers, Target, Trophy, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/common/MetricCard";
import { TodayChallengeCard } from "@/components/common/TodayChallengeCard";
import { SubmitProofModal } from "@/components/proof/SubmitProofModal";
import { DayGrid } from "@/components/common/DayGrid";
import { RecentActivity } from "@/components/common/RecentActivity";
import { GithubDisconnectedNotice } from "@/components/common/States";
import { Scratchpad } from "@/components/Scratchpad";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ABTalks 60-Day Coding Challenge" },
      {
        name: "description",
        content:
          "Track your streak, XP, today's challenge and your full 60-day build calendar on the ABTalks dashboard.",
      },
      { property: "og:title", content: "Dashboard — ABTalks 60-Day Coding Challenge" },
      {
        property: "og:description",
        content: "Streak, XP, today's challenge and 60-day progress in one place.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    user,
    track,
    streak,
    xp,
    currentDay,
    totalDays,
    daysCompleted,
    rank,
    progressPercent,
    daysRemaining,
    progress,
    githubConnected,
    todaySubmitted,
    nextChallenge,
    activities,
  } = useAppState();

  return (
    <AppShell>
      <div className="animate-fade-up space-y-6">
        <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              Keep building, {user.name}.
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {todaySubmitted
                ? `Day ${currentDay} is complete. Your streak is safe.`
                : `You're on a ${streak}-day streak. One more day keeps it alive.`}
            </p>
          </div>
          <Link
            to="/tracks"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-4 text-xs font-bold tracking-widest text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground lg:self-auto"
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            {track.name.toUpperCase()} · CHANGE TRACK
          </Link>
        </header>

        <section className="card-surface p-5 sm:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold tracking-widest text-muted-foreground">
                DAY {currentDay} OF {totalDays}
              </p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight">
                {daysCompleted} <span className="text-muted-foreground">/ {totalDays} done</span>
              </p>
            </div>
            <p className="shrink-0 text-3xl font-extrabold text-primary">{progressPercent}%</p>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="60-day challenge progress"
            className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-elevated"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{daysRemaining} days remaining</p>
        </section>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="CURRENT STREAK"
            value={`${streak} days`}
            icon={<Flame className="h-5 w-5 shrink-0 text-flame" aria-hidden="true" />}
          />
          <MetricCard
            label="TOTAL XP"
            value={xp.toLocaleString()}
            icon={<Zap className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
          />
          <MetricCard
            label="CHALLENGES DONE"
            value={`${daysCompleted} / ${totalDays}`}
            hint={`${progressPercent}% complete`}
            icon={<Target className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
          />
          <MetricCard
            label="RANK"
            value={`#${rank}`}
            hint="Global leaderboard"
            icon={<Trophy className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
          />
        </div>

        {!githubConnected && <GithubDisconnectedNotice />}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <TodayChallengeCard onSubmitProof={() => setModalOpen(true)} />
            <section className="card-surface p-5 sm:p-6">
              <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                NEXT CHALLENGE · DAY {nextChallenge.day}
              </h2>
              <p className="mt-3 text-base font-extrabold tracking-tight">{nextChallenge.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {nextChallenge.difficulty} · {nextChallenge.minutes} min · +{nextChallenge.xp} XP
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Unlocks after you complete day {currentDay}.
              </p>
            </section>
            <section className="card-surface p-5 sm:p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                  YOUR 60-DAY CALENDAR
                </h2>
                <Link
                  to="/challenges"
                  className="shrink-0 text-[11px] font-bold tracking-widest text-primary"
                >
                  ALL DAYS
                </Link>
              </div>
              <div className="mt-4">
                <DayGrid progress={progress} />
              </div>
              <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
                Tap a completed or current day to open its challenge.
              </p>
            </section>
          </div>
          <div className="space-y-6">
            <RecentActivity items={activities} />
            <section className="card-surface p-5 sm:p-6">
              <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                KEEP GOING
              </h2>
              <Link
                to="/leaderboard"
                className="mt-4 flex min-h-12 items-center justify-between gap-2 rounded-xl border border-border bg-elevated px-4 text-sm font-bold transition-colors hover:border-primary/40"
              >
                See the leaderboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/profile"
                className="mt-2 flex min-h-12 items-center justify-between gap-2 rounded-xl border border-border bg-elevated px-4 text-sm font-bold transition-colors hover:border-primary/40"
              >
                View achievements <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
            <Scratchpad />
          </div>
        </div>
      </div>
      <SubmitProofModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  );
}

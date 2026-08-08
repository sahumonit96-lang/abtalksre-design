import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Flame } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard } from "@/components/common/MetricCard";
import { TodayChallengeCard } from "@/components/common/TodayChallengeCard";
import { SubmitProofModal } from "@/components/proof/SubmitProofModal";
import { DayGrid } from "@/components/common/DayGrid";
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
          "Track your streak, today's challenge, and your 60-day build journey on the ABTalks dashboard.",
      },
      { property: "og:title", content: "Dashboard — ABTalks 60-Day Coding Challenge" },
      {
        property: "og:description",
        content: "Your streak, today's challenge, and 60-day progress in one place.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    user,
    streak,
    currentDay,
    totalDays,
    daysCompleted,
    projectsShipped,
    rank,
    progressPercent,
    daysRemaining,
    progress,
    githubConnected,
    todaySubmitted,
  } = useAppState();

  return (
    <AppShell>
      <div className="animate-fade-up space-y-6">
        <header className="min-w-0">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            Keep building, {user.name}.
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {todaySubmitted
              ? `Day ${currentDay} is verified. Your streak is safe.`
              : `You're on a ${streak}-day streak. One more day keeps the streak alive.`}
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            label="CURRENT STREAK"
            value={`${streak} days`}
            icon={<Flame className="h-5 w-5 shrink-0 text-flame" aria-hidden="true" />}
          />
          <MetricCard label="DAYS COMPLETED" value={`${daysCompleted} / ${totalDays}`} hint={`${progressPercent}% complete`} />
          <MetricCard label="PROJECTS SHIPPED" value={String(projectsShipped)} />
          <MetricCard label="RANK" value={`#${rank}`} hint="Global leaderboard" />
        </div>

        {!githubConnected && <GithubDisconnectedNotice />}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <TodayChallengeCard onSubmitProof={() => setModalOpen(true)} />
          <div className="space-y-6">
            <section className="card-surface p-5 sm:p-6">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                  YOUR 60-DAY RUN
                </h2>
                <p className="shrink-0 text-[11px] font-bold tracking-widest text-primary">
                  {progressPercent}%
                </p>
              </div>
              <div className="mt-4">
                <DayGrid progress={progress} />
              </div>
              <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
                {daysCompleted} days completed · {daysRemaining} days remaining
              </p>
            </section>
            <Scratchpad />
          </div>
        </div>
      </div>
      <SubmitProofModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  );
}
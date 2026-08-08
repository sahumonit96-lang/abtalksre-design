import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { TodayChallengeCard } from "@/components/common/TodayChallengeCard";
import { SubmitProofModal } from "@/components/proof/SubmitProofModal";
import { DayGrid } from "@/components/common/DayGrid";
import { GithubDisconnectedNotice } from "@/components/common/States";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/challenge")({
  head: () => ({
    meta: [
      { title: "Today's Challenge — ABTalks" },
      {
        name: "description",
        content:
          "Day 12 of the ABTalks 60-day build challenge: ship one feature a real user could experience, then verify it.",
      },
      { property: "og:title", content: "Today's Challenge — ABTalks" },
      {
        property: "og:description",
        content: "Ship something meaningful today, then prove it with verified GitHub activity.",
      },
    ],
  }),
  component: ChallengePage,
});

function ChallengePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, githubConnected, challenge, currentDay, totalDays } = useAppState();

  return (
    <AppShell title={`Day ${currentDay} of ${totalDays}`}>
      <div className="animate-fade-up mx-auto w-full max-w-3xl space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Today's Challenge</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {challenge.track} track · Day {currentDay} of {totalDays}
          </p>
        </header>
        {!githubConnected && <GithubDisconnectedNotice />}
        <TodayChallengeCard onSubmitProof={() => setModalOpen(true)} showViewLink={false} />
        <section className="card-surface p-5 sm:p-6">
          <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
            YOUR 60-DAY RUN
          </h2>
          <div className="mt-4">
            <DayGrid progress={progress} />
          </div>
        </section>
      </div>
      <SubmitProofModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { StreakCard } from "@/components/StreakCard";
import { ChallengeCard } from "@/components/ChallengeCard";
import { ProgressCard } from "@/components/ProgressCard";
import { AchievementCard } from "@/components/AchievementCard";
import { JourneyGrid } from "@/components/JourneyGrid";
import { Scratchpad } from "@/components/Scratchpad";
import { StandingCard } from "@/components/StandingCard";
import { BottomNav } from "@/components/BottomNav";
import { CURRENT_DAY, TOTAL_DAYS, TRACK, USER_NAME } from "@/data/mockData";

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
  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="animate-fade-up mx-auto w-full max-w-lg px-4 pt-8 sm:px-6">
        <header className="min-w-0">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight">
            Good evening, {USER_NAME} 👋
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Day {CURRENT_DAY} of {TOTAL_DAYS} · {TRACK}
          </p>
        </header>

        <div className="mt-6 space-y-6">
          <StreakCard />
          <ChallengeCard />
          <ProgressCard />
          <AchievementCard />
          <StandingCard />
          <JourneyGrid />
          <Scratchpad />
          <Link
            to="/"
            className="block pb-2 text-center text-xs font-semibold tracking-widest text-muted-foreground"
          >
            ABTALKS · BUILD IN PUBLIC
          </Link>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
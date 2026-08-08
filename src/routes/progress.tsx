import { createFileRoute } from "@tanstack/react-router";
import { JourneyGrid } from "@/components/JourneyGrid";
import { ProgressCard } from "@/components/ProgressCard";
import { StreakCard } from "@/components/StreakCard";
import { RecoveryCard } from "@/components/StateCards";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — ABTalks 60-Day Coding Challenge" },
      {
        name: "description",
        content: "See your streak, completion rate, and full 60-day build map.",
      },
      { property: "og:title", content: "Progress — ABTalks" },
      { property: "og:description", content: "Your streak and full 60-day build map." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="animate-fade-up mx-auto w-full max-w-lg space-y-6 px-4 pt-8 sm:px-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Progress</h1>
        <ProgressCard />
        <StreakCard />
        <RecoveryCard />
        <JourneyGrid />
      </main>
      <BottomNav />
    </div>
  );
}
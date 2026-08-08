import { createFileRoute } from "@tanstack/react-router";
import { EmptyProfileCard, FirstDayCard } from "@/components/StateCards";
import { AchievementCard } from "@/components/AchievementCard";
import { StandingCard } from "@/components/StandingCard";
import { BottomNav } from "@/components/BottomNav";
import { TRACK, USER_NAME } from "@/data/mockData";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — ABTalks 60-Day Coding Challenge" },
      {
        name: "description",
        content: "Your builder profile: achievements, standing, and shipped projects.",
      },
      { property: "og:title", content: "Profile — ABTalks" },
      { property: "og:description", content: "Achievements, standing, and shipped projects." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="animate-fade-up mx-auto w-full max-w-lg space-y-6 px-4 pt-8 sm:px-6">
        <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-lg font-extrabold text-primary">
            M
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight">{USER_NAME}</h1>
            <p className="text-sm text-muted-foreground">{TRACK} track</p>
          </div>
        </header>
        <EmptyProfileCard />
        <FirstDayCard />
        <AchievementCard />
        <StandingCard />
      </main>
      <BottomNav />
    </div>
  );
}
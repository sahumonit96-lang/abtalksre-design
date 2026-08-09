import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TrackPicker } from "@/components/common/TrackPicker";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/tracks")({
  head: () => ({
    meta: [
      { title: "Choose Your Track — ABTalks 60-Day Challenge" },
      {
        name: "description",
        content:
          "Pick a 60-day track: Web Development, Python, C++, JavaScript or AI/ML. Each track has its own daily challenges and progress.",
      },
      { property: "og:title", content: "Choose Your Track — ABTalks" },
      {
        property: "og:description",
        content: "Five 60-day tracks, each with its own daily challenges and progress.",
      },
    ],
  }),
  component: TracksPage,
});

function TracksPage() {
  const navigate = useNavigate();
  const { track } = useAppState();

  return (
    <AppShell title="Tracks">
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Choose your track</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Your track decides your 60 daily challenges. You can switch any time — progress stays.
          </p>
        </header>

        <TrackPicker onSelected={() => navigate({ to: "/dashboard" })} />

        <div className="card-surface grid gap-3 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
          <p className="min-w-0 text-sm text-muted-foreground">
            Currently building on the <span className="font-bold text-foreground">{track.name}</span>{" "}
            track.
          </p>
          <Link
            to="/challenges"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            Browse challenges <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

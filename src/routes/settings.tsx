import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — ABTalks" },
      {
        name: "description",
        content: "Manage your GitHub connection, challenge goal, and demo data on ABTalks.",
      },
      { property: "og:title", content: "Settings — ABTalks" },
      { property: "og:description", content: "GitHub connection and challenge preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, githubConnected, setGithubConnected, goal, resetDemo } = useAppState();

  return (
    <AppShell title="Settings">
      <div className="animate-fade-up mx-auto w-full max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Settings</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Signed in as {user.name} · {user.college}
          </p>
        </header>

        <section className="card-surface p-5 sm:p-6">
          <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
            GITHUB CONNECTION
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            GitHub helps ABTalks verify your daily building. Read-only commit activity, nothing else.
          </p>
          <p className="mt-3 text-sm font-bold">
            {githubConnected ? `Connected as @${user.githubUsername}` : "Not connected"}
          </p>
          <button
            type="button"
            onClick={() => setGithubConnected(!githubConnected)}
            className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            {githubConnected ? "Disconnect GitHub" : "Connect GitHub"}
          </button>
        </section>

        <section className="card-surface p-5 sm:p-6">
          <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">YOUR GOAL</h2>
          <p className="mt-3 text-sm font-bold">{goal ?? "Not set yet"}</p>
        </section>

        <section className="card-surface p-5 sm:p-6">
          <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">DEMO DATA</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Reset the run back to Day 12 with an 11-day streak — useful before a live demo.
          </p>
          <button
            type="button"
            onClick={resetDemo}
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-elevated px-5 text-sm font-bold transition-colors hover:border-primary/40"
          >
            Reset demo state
          </button>
        </section>
      </div>
    </AppShell>
  );
}
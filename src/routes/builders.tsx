import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { builders } from "@/data/demoData";

export const Route = createFileRoute("/builders")({
  head: () => ({
    meta: [
      { title: "Builders — ABTalks" },
      {
        name: "description",
        content: "College builders shipping verified work every single day on ABTalks.",
      },
      { property: "og:title", content: "Builders — ABTalks" },
      { property: "og:description", content: "People who build every day." },
    ],
  }),
  component: BuildersPage,
});

function BuildersPage() {
  return (
    <AppShell title="Builders">
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            People who build every day.
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {builders.length} builders currently mid-run.
          </p>
        </header>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {builders.map((b) => (
            <li key={b.id} className="card-surface p-5 transition-colors hover:border-primary/30">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-sm font-extrabold text-primary">
                  {b.avatarInitials}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-extrabold tracking-tight">{b.name}</h2>
                  <p className="truncate text-xs text-muted-foreground">{b.college}</p>
                </div>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-extrabold text-flame">
                <Flame className="h-4 w-4 shrink-0" aria-hidden="true" /> {b.streak} day streak
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {b.daysCompleted} / 60 days · {b.projectsShipped} projects shipped
              </p>
              <Link
                to="/profile"
                className="mt-4 flex min-h-11 items-center justify-center rounded-xl border border-border bg-elevated px-4 text-xs font-bold tracking-widest transition-colors hover:border-primary/40"
              >
                VIEW PROFILE
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
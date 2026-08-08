import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { demoProjects } from "@/data/demoData";
import { EmptyState } from "@/components/common/States";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — ABTalks" },
      {
        name: "description",
        content: "Shipped projects from the ABTalks 60-day build challenge, with repos and demos.",
      },
      { property: "og:title", content: "Projects — ABTalks" },
      { property: "og:description", content: "Shipped work with live demos and repositories." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <AppShell title="Projects">
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Projects</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {demoProjects.length} projects shipped during this run.
          </p>
        </header>
        {demoProjects.length === 0 ? (
          <EmptyState
            title="Your shipped work will appear here."
            detail="Submit a proof with a live deployment and it becomes a project."
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {demoProjects.map((p) => (
              <li
                key={p.id}
                className="card-surface flex flex-col p-5 transition-colors hover:border-primary/30"
              >
                <h2 className="text-base font-extrabold tracking-tight">{p.name}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-elevated px-2.5 py-1 text-[10px] font-bold tracking-widest text-muted-foreground"
                    >
                      {s.toUpperCase()}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">{p.daysBuilt} days built</p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-elevated px-3 text-xs font-bold transition-colors hover:border-primary/40"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
                  </a>
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-elevated px-3 text-xs font-bold transition-colors hover:border-primary/40"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Live demo
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
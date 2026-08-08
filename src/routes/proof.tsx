import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, ExternalLink, Flame, Github } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/common/States";
import { ProofCard } from "@/components/proof/ProofCard";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/proof")({
  head: () => ({
    meta: [
      { title: "My Proof — ABTalks" },
      {
        name: "description",
        content:
          "Every verified build day in one timeline: GitHub activity, live deployments, and streaks.",
      },
      { property: "og:title", content: "My Proof — ABTalks" },
      { property: "og:description", content: "A timeline of verified daily builds." },
    ],
  }),
  component: ProofPage,
});

const filters = ["All", "Verified", "Projects", "Challenges"] as const;

function ProofPage() {
  const { proofs, totalDays, streak, currentDay } = useAppState();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "Verified") return proofs.filter((p) => p.verified);
    if (filter === "Projects") return proofs.filter((p) => p.kind === "project");
    if (filter === "Challenges") return proofs.filter((p) => p.kind === "challenge");
    return proofs;
  }, [proofs, filter]);

  const latest = proofs[0];

  return (
    <AppShell title="My Proof">
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">My Proof</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {proofs.length} verified build days · Day {currentDay} of {totalDays}
          </p>
        </header>

        {latest && (
          <div className="max-w-xl">
            <ProofCard proof={latest} totalDays={totalDays} streak={streak} compact />
          </div>
        )}

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Proof filters">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-10 rounded-full border px-4 text-xs font-bold tracking-widest transition-colors ${
                filter === f
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title="Your first proof is waiting."
            detail="Build something today and make it count."
            action={
              <Link
                to="/challenge"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                Open today's challenge
              </Link>
            }
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p) => (
              <li
                key={p.id}
                className="card-surface flex flex-col p-5 transition-colors hover:border-primary/30"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <p className="min-w-0 text-[11px] font-bold tracking-widest text-primary">
                    DAY {p.day}
                  </p>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary">
                    <BadgeCheck className="h-3 w-3" aria-hidden="true" /> VERIFIED
                  </span>
                </div>
                <h2 className="mt-2 text-base font-extrabold tracking-tight">{p.title}</h2>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-flame">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Streak:{" "}
                  {p.streakAtSubmission}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{p.date}</p>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-elevated px-3 text-xs font-bold transition-colors hover:border-primary/40"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" /> Repo
                  </a>
                  <a
                    href={p.deploymentUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-elevated px-3 text-xs font-bold transition-colors hover:border-primary/40"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Live
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
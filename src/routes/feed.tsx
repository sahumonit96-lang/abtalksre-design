import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Heart, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { posts } from "@/data/demoData";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Build in public — ABTalks Feed" },
      {
        name: "description",
        content: "A live feed of verified daily builds from college builders on ABTalks.",
      },
      { property: "og:title", content: "Build in public — ABTalks Feed" },
      { property: "og:description", content: "Verified daily builds, shared publicly." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  const [liked, setLiked] = useState<string[]>([]);
  const [openComments, setOpenComments] = useState<string | null>(null);

  return (
    <AppShell title="Feed">
      <div className="animate-fade-up mx-auto w-full max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Build in public.</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Every post below is backed by verified activity.
          </p>
        </header>
        <ul className="space-y-3">
          {posts.map((p) => {
            const isLiked = liked.includes(p.id);
            return (
              <li key={p.id} className="card-surface p-5 transition-colors hover:border-primary/30">
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-xs font-extrabold text-primary">
                    {p.avatarInitials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold tracking-tight">{p.builderName}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.postedAt}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1.5 text-[10px] font-bold tracking-widest text-primary">
                    🔥 DAY {p.day}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/90">{p.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.githubVerified && (
                    <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-1.5 text-[10px] font-bold tracking-widest text-muted-foreground">
                      <BadgeCheck className="h-3 w-3 text-primary" aria-hidden="true" /> GITHUB
                      VERIFIED
                    </li>
                  )}
                  {p.deploymentVerified && (
                    <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated px-3 py-1.5 text-[10px] font-bold tracking-widest text-muted-foreground">
                      <BadgeCheck className="h-3 w-3 text-primary" aria-hidden="true" /> DEPLOYMENT
                      VERIFIED
                    </li>
                  )}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  <button
                    type="button"
                    aria-pressed={isLiked}
                    onClick={() =>
                      setLiked((prev) =>
                        prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id],
                      )
                    }
                    className={`inline-flex min-h-10 items-center gap-1.5 rounded-xl border px-3 text-xs font-bold transition-colors ${
                      isLiked
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border bg-elevated text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Heart className="h-3.5 w-3.5" aria-hidden="true" /> {p.likes + (isLiked ? 1 : 0)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenComments(openComments === p.id ? null : p.id)}
                    aria-expanded={openComments === p.id}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-elevated px-3 text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> {p.comments}
                  </button>
                  <Link
                    to="/proof"
                    className="inline-flex min-h-10 items-center rounded-xl border border-border bg-elevated px-3 text-xs font-bold transition-colors hover:border-primary/40"
                  >
                    View proof
                  </Link>
                </div>
                {openComments === p.id && (
                  <p className="animate-fade-up mt-3 rounded-xl bg-elevated p-3 text-xs text-muted-foreground">
                    {p.comments} builders replied. Comment threads arrive with accounts — for now,
                    every post links to its verified proof.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </AppShell>
  );
}
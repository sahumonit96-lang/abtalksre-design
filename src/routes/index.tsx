import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import {
  days,
  howItWorks,
  whyABTalks,
  CURRENT_DAY,
  TOTAL_DAYS,
  STREAK,
  progressPercent,
} from "@/data/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABTalks — 60-Day Coding Challenge" },
      {
        name: "description",
        content:
          "Turn 60 days of consistent building into real proof of work. Build daily, ship to GitHub, share on LinkedIn.",
      },
      { property: "og:title", content: "ABTalks — 60-Day Coding Challenge" },
      {
        property: "og:description",
        content: "Build daily. Ship to GitHub. Share your progress on LinkedIn.",
      },
    ],
  }),
  component: Landing,
});

const dotStyles: Record<string, string> = {
  completed: "border-primary/30 bg-primary-soft text-primary",
  today: "border-primary bg-primary text-primary-foreground",
  upcoming: "border-border bg-elevated text-muted-foreground/50",
  missed: "border-flame/40 bg-flame/10 text-flame",
};

function RunCard() {
  return (
    <aside className="rounded-2xl border border-border bg-card p-5 shadow-glow sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-widest text-muted-foreground">
            YOUR 60-DAY RUN
          </p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight">
            DAY {CURRENT_DAY} <span className="text-muted-foreground">/ {TOTAL_DAYS}</span>
          </p>
          <p className="mt-1 text-xs font-bold tracking-widest text-primary">
            {progressPercent}% COMPLETE
          </p>
        </div>
        <p className="shrink-0 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
          🔥 {STREAK} DAY STREAK
        </p>
      </div>
      <div className="mt-5 grid grid-cols-10 gap-1.5">
        {days.map((d) => (
          <div
            key={d.day}
            className={`grid aspect-square place-items-center rounded-md border text-[9px] font-bold ${dotStyles[d.status]}`}
          >
            {d.status === "completed" ? "✓" : d.status === "today" ? d.day : ""}
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
        Proof of work builds one day at a time.
      </p>
    </aside>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="animate-fade-up min-w-0">
              <p className="text-[11px] font-bold tracking-widest text-primary">
                60-DAY CODING CHALLENGE · BUILD IN PUBLIC
              </p>
              <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                Build every day.
                <br />
                <span className="text-primary">Prove your progress.</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
                Turn 60 days of consistent building into verifiable proof of work, a public
                portfolio, and a reputation that compounds.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
                >
                  Start the challenge <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-bold text-foreground transition-colors hover:border-primary/40"
                >
                  See how it works
                </a>
              </div>
            </div>
            <RunCard />
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
        >
          <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
            HOW IT WORKS
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) => (
              <li key={s.step} className="card-surface p-5">
                <p className="text-xs font-bold text-primary">{s.step}</p>
                <h3 className="mt-3 text-sm font-extrabold tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
            WHY ABTALKS
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {whyABTalks.map((c) => (
              <li key={c.title} className="rounded-2xl border border-border bg-elevated p-6">
                <h3 className="text-sm font-extrabold tracking-widest text-primary">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-6">
          <div className="rounded-2xl border border-primary/25 bg-card p-8 text-center shadow-glow sm:p-12">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Your next 60 days can look different.
            </h2>
            <Link
              to="/dashboard"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              Start building <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-xs text-muted-foreground sm:px-6">
          <p>ABTalks · 60-Day Coding Challenge</p>
          <p>Build in public.</p>
        </div>
      </footer>
    </div>
  );
}

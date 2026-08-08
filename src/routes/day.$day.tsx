import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Checklist } from "@/components/Checklist";
import { ProofForm } from "@/components/ProofForm";
import { RecoveryCard } from "@/components/StateCards";
import { todayChallenge, TOTAL_DAYS, STREAK } from "@/data/mockData";

export const Route = createFileRoute("/day/$day")({
  head: () => ({
    meta: [
      { title: "Day 12 Challenge — ABTalks 60-Day Coding Challenge" },
      {
        name: "description",
        content:
          "Build a responsive landing page in 45 minutes, then submit your GitHub and LinkedIn proof of work.",
      },
      { property: "og:title", content: "Day 12 Challenge — ABTalks" },
      {
        property: "og:description",
        content: "Today's challenge: build a responsive landing page and ship the proof.",
      },
    ],
  }),
  component: ChallengeDay,
});

function ChallengeDay() {
  const { day } = Route.useParams();
  const navigate = useNavigate();
  const [done, setDone] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const dayNumber = Number(day) || todayChallenge.day;

  const toggle = (id: string) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  if (complete) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-4 py-12 sm:px-6">
        <div className="animate-fade-up rounded-2xl border border-primary/30 bg-elevated p-6 text-center shadow-glow">
          <span className="animate-pop mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-7 w-7" strokeWidth={3} />
          </span>
          <h1 className="mt-5 text-lg font-extrabold tracking-widest text-primary">
            ✓ DAY {dayNumber} COMPLETE
          </h1>
          <p className="mt-2 text-base font-semibold">Another day shipped.</p>
          <p className="mt-4 text-sm text-muted-foreground">
            🔥 Streak updated to {dayNumber} days
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {dayNumber} / {TOTAL_DAYS} challenges complete
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            Back to Dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <main className="animate-fade-up mx-auto w-full max-w-lg px-4 pt-6 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/dashboard"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <p className="shrink-0 text-[11px] font-bold tracking-widest text-muted-foreground">
            CHALLENGE · DAY {dayNumber} / {TOTAL_DAYS}
          </p>
        </div>

        <header className="mt-6">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight">
            {todayChallenge.title}
          </h1>
          <p className="mt-2 text-[11px] font-bold tracking-widest text-primary">
            {todayChallenge.minutes} MIN · {todayChallenge.track.toUpperCase()} ·{" "}
            {todayChallenge.difficulty.toUpperCase()}
          </p>
        </header>

        <div className="mt-6 space-y-6">
          <section className="card-surface p-5">
            <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
              TODAY&apos;S GOAL
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{todayChallenge.goal}</p>
          </section>

          {STREAK < dayNumber - 1 && <RecoveryCard />}

          <Checklist done={done} onToggle={toggle} />
          <ProofForm onSuccess={() => setComplete(true)} />
        </div>
      </main>
    </div>
  );
}
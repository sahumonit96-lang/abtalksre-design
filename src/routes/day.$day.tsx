import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, Check, Clock, ExternalLink, Lock, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SubmitProofModal } from "@/components/proof/SubmitProofModal";
import { useAppState } from "@/state/AppState";

export const Route = createFileRoute("/day/$day")({
  head: () => ({
    meta: [
      { title: "Daily Challenge — ABTalks 60-Day Coding Challenge" },
      {
        name: "description",
        content:
          "Read the problem statement, work through the requirements, then submit your proof of work for the day.",
      },
      { property: "og:title", content: "Daily Challenge — ABTalks" },
      {
        property: "og:description",
        content: "Problem statement, requirements, resources and proof submission for the day.",
      },
    ],
  }),
  component: ChallengeDay,
});

function ChallengeDay() {
  const { day } = Route.useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const {
    currentDay,
    totalDays,
    challengeForDay,
    isDayCompleted,
    checklistForDay,
    toggleChecklistItem,
    proofs,
  } = useAppState();

  const dayNumber = Math.min(totalDays, Math.max(1, Number(day) || currentDay));
  const challenge = challengeForDay(dayNumber);
  const completed = isDayCompleted(dayNumber);
  const locked = dayNumber > currentDay;
  const done = checklistForDay(dayNumber);
  const proof = proofs.find((p) => p.day === dayNumber);

  return (
    <AppShell title={`Day ${dayNumber} of ${totalDays}`}>
      <div className="animate-fade-up mx-auto w-full max-w-3xl space-y-6">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/challenges" })}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All challenges
          </button>
          <p className="min-w-0 truncate text-right text-[11px] font-bold tracking-widest text-muted-foreground">
            DAY {dayNumber} / {totalDays}
          </p>
        </div>

        <header>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <p className="min-w-0 text-[11px] font-bold tracking-widest text-primary">
              {challenge.track.toUpperCase()}
            </p>
            {completed && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[10px] font-bold tracking-widest text-primary">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> COMPLETED
              </span>
            )}
            {locked && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[10px] font-bold tracking-widest text-muted-foreground">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> LOCKED
              </span>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            {challenge.title}
          </h1>
          <ul className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold tracking-widest">
            <li className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
              {challenge.difficulty.toUpperCase()}
            </li>
            <li className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-muted-foreground">
              <Clock className="h-3 w-3" aria-hidden="true" /> {challenge.minutes} MIN
            </li>
            <li className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-primary">
              <Zap className="h-3 w-3" aria-hidden="true" /> +{challenge.xp} XP
            </li>
            {challenge.skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border px-2.5 py-1 text-muted-foreground"
              >
                {s.toUpperCase()}
              </li>
            ))}
          </ul>
        </header>

        {locked ? (
          <section className="card-surface p-5 sm:p-6">
            <p className="text-sm text-muted-foreground">
              This challenge unlocks on day {dayNumber}. Finish day {currentDay} first.
            </p>
            <Link
              to="/day/$day"
              params={{ day: String(currentDay) }}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground"
            >
              Go to today&apos;s challenge
            </Link>
          </section>
        ) : (
          <>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                {started || completed ? "Challenge in progress" : "Start challenge"}
              </button>
              <a
                href="#instructions"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-border bg-elevated px-4 text-sm font-bold transition-colors hover:border-primary/40"
              >
                View instructions
              </a>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-border bg-elevated px-4 text-sm font-bold transition-colors hover:border-primary/40"
              >
                {completed ? "View proof" : "Submit proof"}
              </button>
            </div>

            <section id="instructions" className="card-surface scroll-mt-24 p-5 sm:p-6">
              <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                PROBLEM STATEMENT
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {challenge.problemStatement}
              </p>
            </section>

            <section className="card-surface p-5 sm:p-6">
              <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                REQUIREMENTS
              </h2>
              <ul className="mt-4 space-y-2">
                {challenge.checklist.map((item) => {
                  const checked = done.includes(item.id) || completed;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleChecklistItem(item.id, dayNumber)}
                        aria-pressed={checked}
                        className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-border bg-elevated px-3 py-2 text-left text-sm font-semibold transition-colors hover:border-primary/40"
                      >
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                            checked
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input text-transparent"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span
                          className={`min-w-0 ${checked ? "text-muted-foreground line-through" : ""}`}
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                {challenge.requirements.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span aria-hidden="true" className="text-primary">
                      ·
                    </span>
                    <span className="min-w-0">{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-surface p-5 sm:p-6">
              <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                EXPECTED OUTCOME
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{challenge.outcome}</p>
            </section>

            <section className="card-surface p-5 sm:p-6">
              <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                HELPFUL RESOURCES
              </h2>
              <ul className="mt-4 space-y-2">
                {challenge.resources.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border bg-elevated px-3 text-sm font-semibold transition-colors hover:border-primary/40"
                    >
                      <span className="min-w-0 truncate">{r.label}</span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-surface p-5 sm:p-6">
              <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
                COMPLETION STATUS
              </h2>
              {completed && proof ? (
                <div className="mt-3 space-y-2 text-sm">
                  <p className="font-bold text-primary">Completed · proof submitted</p>
                  <p className="text-muted-foreground">{proof.summary}</p>
                  <a
                    href={proof.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary"
                  >
                    View repository <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Not completed yet. Work through the requirements, then submit your proof to earn +
                  {challenge.xp} XP and keep your streak.
                </p>
              )}
            </section>
          </>
        )}
      </div>
      <SubmitProofModal open={modalOpen} onClose={() => setModalOpen(false)} day={dayNumber} />
    </AppShell>
  );
}

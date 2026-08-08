import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Check } from "lucide-react";
import { useAppState } from "@/state/AppState";

export function TodayChallengeCard({
  onSubmitProof,
  showViewLink = true,
}: {
  onSubmitProof: () => void;
  showViewLink?: boolean;
}) {
  const { challenge, currentDay, checklist, toggleChecklistItem, todaySubmitted } = useAppState();

  return (
    <section className="rounded-3xl border border-primary/25 bg-card p-5 shadow-glow sm:p-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <p className="min-w-0 text-[11px] font-bold tracking-widest text-primary">
          DAY {currentDay} · {challenge.minutes} MIN · {challenge.difficulty.toUpperCase()}
        </p>
        {todaySubmitted && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[10px] font-bold tracking-widest text-primary">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> VERIFIED
          </span>
        )}
      </div>
      <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight">
        {challenge.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{challenge.description}</p>

      <ul className="mt-5 space-y-2">
        {challenge.checklist.map((item) => {
          const done = checklist.includes(item.id) || todaySubmitted;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggleChecklistItem(item.id)}
                aria-pressed={done}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-border bg-elevated px-3 text-left text-sm font-semibold transition-colors hover:border-primary/40"
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                    done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input text-transparent"
                  }`}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className={`min-w-0 truncate ${done ? "text-muted-foreground line-through" : ""}`}>
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onSubmitProof}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
        >
          {todaySubmitted ? "View today's proof" : "Submit today's proof"}
          <ArrowRight className="h-4 w-4" />
        </button>
        {showViewLink && (
          <Link
            to="/challenge"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-border bg-elevated px-4 text-sm font-bold transition-colors hover:border-primary/40"
          >
            View challenge
          </Link>
        )}
      </div>
    </section>
  );
}